"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Level = 0 | 1 | 2 | 3 | 4;

type DayData = { level: Level; count: number };

type Contributions = Record<string, DayData>;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const THEME: Record<`level${Level}`, string> = {
  level0: "#0a0a0a",
  level1: "#1f1f1f",
  level2: "#3f3f3f",
  level3: "#8a8a8a",
  level4: "#fafafa",
};

function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatTooltipDate(value: string): string {
  const date = parseDate(value);
  return `${MONTHS_FULL[date.getMonth()]} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`;
}

async function fetchContributions(username: string): Promise<Contributions> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}`,
  );
  if (!res.ok) {
    throw new Error(
      `Could not fetch contributions for "${username}" (${res.status})`,
    );
  }
  const json = (await res.json()) as {
    contributions: { date: string; level: number; count: number }[];
  };
  const map: Contributions = {};
  for (const item of json.contributions) {
    const level = Math.min(4, Math.max(0, item.level)) as Level;
    map[item.date] = {
      level,
      count: item.count,
    };
  }
  return map;
}

function buildGrid(startDate: string, endDate: string, startsOnSunday: boolean) {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const firstWeekday = startsOnSunday ? 0 : 1;
  const offset = (start.getDay() - firstWeekday + 7) % 7;
  const gridStart = formatDate(addDays(start, -offset));

  const weeks: (string | null)[][] = [];
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let cursor = parseDate(gridStart);
  let weekIndex = 0;
  let lastMonth = -1;

  while (cursor <= end || (weeks.length > 0 && weeks[weeks.length - 1].length < 7)) {
    const week: (string | null)[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = formatDate(cursor);
      const inRange = cursor >= start && cursor <= end;
      week.push(inRange ? dateStr : null);
      if (inRange && cursor.getMonth() !== lastMonth) {
        lastMonth = cursor.getMonth();
        monthLabels.push({ label: MONTHS[cursor.getMonth()], weekIndex });
      }
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
    weekIndex++;
  }

  return { weeks, monthLabels, gridStart };
}

export interface GithubCalendarProps {
  username?: string;
  data?: Contributions | null;
  startDate?: string;
  endDate?: string;
  startsOnSunday?: boolean;
  cellSize?: number;
  cellGap?: number;
  cellShape?: "square" | "circle";
  showMonthLabels?: boolean;
  showStats?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function GithubCalendar({
  username,
  data: initialData,
  startDate,
  endDate,
  startsOnSunday = true,
  cellSize = 11,
  cellGap = 3,
  cellShape = "square",
  showMonthLabels = true,
  showStats = true,
  showLegend = true,
  className,
}: GithubCalendarProps) {
  const id = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<Contributions | null>(initialData ?? null);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState(false);
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    fetchContributions(username)
      .then((contributions) => {
        if (cancelled) return;
        setData(contributions);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const loading = Boolean(username) && data === null && error === null;

  const endDateStr = useMemo(() => endDate ?? formatDate(new Date()), [endDate]);

  const startDateStr = useMemo(() => {
    if (startDate) return startDate;
    const d = parseDate(endDateStr);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return formatDate(d);
  }, [startDate, endDateStr]);

  const { weeks, monthLabels, gridStart } = useMemo(
    () => buildGrid(startDateStr, endDateStr, startsOnSunday),
    [startDateStr, endDateStr, startsOnSunday],
  );

  const stats = useMemo(() => {
    const entries = Object.entries(data ?? {});
    let total = 0;
    let activeDays = 0;
    for (const [, day] of entries) {
      total += day.count;
      if (day.level > 0) activeDays++;
    }
    let maxStreak = 0;
    let streak = 0;
    const sorted = entries
      .filter(([, day]) => day.level > 0)
      .map(([date]) => parseDate(date))
      .sort((a, b) => a.getTime() - b.getTime());
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) {
        streak = 1;
        maxStreak = 1;
        continue;
      }
      const diff =
        (sorted[i].getTime() - sorted[i - 1].getTime()) / 86_400_000;
      if (diff === 1) {
        streak++;
        maxStreak = Math.max(maxStreak, streak);
      } else {
        streak = 1;
      }
    }
    return { total, activeDays, maxStreak };
  }, [data]);

  const cell = cellSize + cellGap;
  const monthLabelHeight = showMonthLabels ? 20 : 0;
  const gridWidth = weeks.length * cell - cellGap;
  const gridHeight = monthLabelHeight + 7 * cell - cellGap;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  useEffect(() => {
    if (!game) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = gridWidth;
    const height = gridHeight + 80;
    canvas.width = width;
    canvas.height = height;

    const levels = new Map<string, Level>();
    weeks.forEach((week) => {
      week.forEach((date) => {
        if (!date) return;
        levels.set(date, data?.[date]?.level ?? 0);
        const el = document.getElementById(`cell-${id}-${date}`);
        if (el) {
          const level = levels.get(date) ?? 0;
          if (level === 0) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
          } else {
            el.style.opacity = "1";
            el.style.pointerEvents = "auto";
          }
        }
      });
    });

    const ship = {
      x: width / 2 - 15,
      y: height - 25,
      width: 30,
      height: 20,
      speed: 4,
      direction: 1,
      color: "#e5e5e5",
    };
    const lasers: {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
    }[] = [];
    let lastShot = 0;
    const SHOOT_INTERVAL = 140;
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.4 + 0.1,
      size: Math.random() * 1.2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));
    const explosions: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
    }[] = [];

    const shoot = () => {
      lasers.push({
        x: ship.x + ship.width / 2 - 1.5,
        y: ship.y - 4,
        width: 3,
        height: 8,
        color: "#a3a3a3",
      });
    };

    const explode = (x: number, y: number, color: string) => {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 1.2;
        explosions.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          size: Math.random() * 2 + 1,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 15 + 15,
        });
      }
    };

    const syncCell = (date: string) => {
      const el = document.getElementById(`cell-${id}-${date}`);
      const level = levels.get(date) ?? 0;
      if (!el) return;
      el.setAttribute("fill", THEME[`level${level}`]);
      if (level === 0) {
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      } else {
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
      }
    };

    const update = () => {
      let firstWeek: number | null = null;
      let lastWeek: number | null = null;
      weeks.forEach((week, wi) => {
        week.forEach((date) => {
          if (date && (levels.get(date) ?? 0) > 0) {
            firstWeek = firstWeek === null ? wi : Math.min(firstWeek, wi);
            lastWeek = lastWeek === null ? wi : Math.max(lastWeek, wi);
          }
        });
      });

      let minX = 0;
      let maxX = width - ship.width;
      if (firstWeek !== null && lastWeek !== null) {
        minX = firstWeek * cell;
        maxX = Math.max(minX, Math.min(maxX, (lastWeek + 1) * cell - ship.width));
      }
      ship.x += ship.speed * ship.direction;
      if (ship.x >= maxX) {
        ship.x = maxX;
        ship.direction = -1;
      }
      if (ship.x <= minX) {
        ship.x = minX;
        ship.direction = 1;
      }

      const now = Date.now();
      if (now - lastShot >= SHOOT_INTERVAL) {
        shoot();
        lastShot = now;
      }

      let anyActive = false;
      levels.forEach((level) => {
        if (level > 0) anyActive = true;
      });
      if (!anyActive) {
        weeks.forEach((week) => {
          week.forEach((date) => {
            if (!date) return;
            levels.set(date, data?.[date]?.level ?? 0);
            syncCell(date);
          });
        });
      }

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].y += -6;
        if (lasers[i].y < 0) lasers.splice(i, 1);
      }
      for (const e of explosions) {
        e.x += e.vx;
        e.y += e.vy;
        e.life++;
        e.alpha = Math.max(0, 1 - e.life / e.maxLife);
      }
      for (let i = explosions.length - 1; i >= 0; i--) {
        if (explosions[i].life >= explosions[i].maxLife) explosions.splice(i, 1);
      }

      for (let li = lasers.length - 1; li >= 0; li--) {
        const laser = lasers[li];
        let hit = false;
        weeks.forEach((week, wi) => {
          if (hit) return;
          week.forEach((date, di) => {
            if (hit || !date) return;
            const level = levels.get(date) ?? 0;
            if (level === 0) return;
            const cellX = wi * cell;
            const cellY = monthLabelHeight + di * cell;
            if (
              laser.x < cellX + cellSize &&
              laser.x + laser.width > cellX &&
              laser.y < cellY + cellSize &&
              laser.y + laser.height > cellY
            ) {
              hit = true;
              levels.set(date, (level - 1) as Level);
              syncCell(date);
              explode(
                cellX + cellSize / 2,
                cellY + cellSize / 2,
                THEME[`level${level}`],
              );
            }
          });
        });
        if (hit) lasers.splice(li, 1);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      for (const star of stars) {
        ctx.globalAlpha = star.alpha;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }
      ctx.globalAlpha = 1;
      for (const laser of lasers) {
        ctx.fillStyle = laser.color;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      }
      for (const e of explosions) {
        ctx.globalAlpha = e.alpha;
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.size, e.size);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = ship.color;
      ctx.shadowColor = ship.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width / 2, ship.y);
      ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
      ctx.lineTo(ship.x + ship.width * 0.7, ship.y + ship.height * 0.75);
      ctx.lineTo(ship.x + ship.width * 0.3, ship.y + ship.height * 0.75);
      ctx.lineTo(ship.x, ship.y + ship.height);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(update);
    };

    let raf = 0;
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [game, data, weeks, gridWidth, gridHeight, cell, cellSize, monthLabelHeight, id]);

  if (loading) {
    return (
      <div
        className={cn(
          "w-full rounded-sm border border-neutral-800 bg-black p-3",
          className,
        )}
      >
        <div className="h-40 w-full animate-pulse bg-neutral-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "mx-auto w-fit px-4 py-3 font-mono text-xs text-neutral-500",
          className,
        )}
      >
        {error}
      </div>
    );
  }

  const endDateDate = parseDate(endDateStr);
  const renderedMonthLabels = showMonthLabels
    ? (() => {
        const kept: { weekIndex: number; label: string }[] = [];
        monthLabels.forEach(({ label, weekIndex }, i) => {
          const next = monthLabels[i + 1];
          if (i === 0 && next && next.weekIndex - weekIndex < 3) return;
          const prev = kept[kept.length - 1];
          if (prev && weekIndex - prev.weekIndex < 3) return;
          kept.push({ weekIndex, label });
        });
        return kept;
      })()
    : [];

  return (
    <div
      className={cn(
        "w-max shrink-0 rounded-sm border border-neutral-800 bg-black",
        className,
      )}
    >
      <div className="flex w-fit max-w-full flex-col gap-3 p-3">
        <div
          ref={scrollRef}
          className="relative overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <svg
            width={gridWidth}
            height={gridHeight}
            viewBox={`0 0 ${gridWidth} ${gridHeight}`}
            className="block"
          >
            {renderedMonthLabels.map(({ weekIndex, label }) => (
              <text
                key={`${label}-${weekIndex}`}
                x={weekIndex * cell}
                y={10}
                fontSize={14}
                fill="#808080"
                fontFamily="inherit"
              >
                {label}
              </text>
            ))}
            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const futureCell = !date &&
                  parseDate(
                    formatDate(
                      addDays(parseDate(gridStart), wi * 7 + di),
                    ),
                  ) > endDateDate;
                if (futureCell) return null;
                const level = date ? (data?.[date]?.level ?? 0) : 0;
                const x = wi * cell;
                const y = monthLabelHeight + di * cell;
                const hidden = game && (level === 0 || !date);
                return (
                  <rect
                    key={`${wi}-${di}`}
                    id={date ? `cell-${id}-${date}` : undefined}
                    x={x}
                    y={y}
                    width={cellSize}
                    height={cellSize}
                    rx={cellShape === "circle" ? cellSize / 2 : cellSize * 0.2}
                    fill={THEME[`level${level}`]}
                    style={{
                      transition: "opacity 0.1s",
                      opacity: hidden ? 0 : 1,
                      pointerEvents: hidden ? "none" : "auto",
                    }}
                    onMouseEnter={() => {
                      if (!date || game) return;
                      setTooltip({ date, count: data?.[date]?.count ?? 0, x, y });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              }),
            )}
          </svg>
          {game && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-10 cursor-crosshair"
              style={{ width: gridWidth, height: gridHeight + 80 }}
            />
          )}
          {tooltip && (
            <div
              className="pointer-events-none absolute z-50 whitespace-nowrap rounded border border-neutral-700/40 bg-[#171717] px-2.5 py-1 text-[11px] text-neutral-100"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, calc(-100% - 6px))",
              }}
            >
              {tooltip.count > 0
                ? `${tooltip.count} contribution${tooltip.count !== 1 ? "s" : ""} on ${formatTooltipDate(tooltip.date)}.`
                : `No contributions on ${formatTooltipDate(tooltip.date)}.`}
              <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-neutral-700/40 bg-[#171717]" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {showLegend && (
            <div className="flex shrink-0 flex-wrap items-center gap-4 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="select-none">less</span>
                {([0, 1, 2, 3, 4] as Level[]).map((lvl) => (
                  <svg key={lvl} width={cellSize} height={cellSize}>
                    <rect
                      width={cellSize}
                      height={cellSize}
                      rx={cellShape === "circle" ? cellSize / 2 : cellSize * 0.2}
                      fill={THEME[`level${lvl}`]}
                    />
                  </svg>
                ))}
                <span className="select-none">more</span>
              </div>
              <div className="flex items-center gap-2 border-l border-neutral-800 pl-4">
                <span className="select-none text-[11px] text-neutral-500">
                  game mode
                </span>
                <button
                  onClick={() => setGame((g) => !g)}
                  aria-label="toggle game mode"
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                    game ? "bg-neutral-100" : "bg-neutral-800",
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full ring-0 transition duration-200",
                      game
                        ? "translate-x-4 bg-black"
                        : "translate-x-0 bg-white",
                    )}
                  />
                </button>
              </div>
            </div>
          )}
          {showStats && username && (
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex flex-1 flex-wrap justify-end font-sans text-sm tracking-wide"
            >
              <span className="flex items-center gap-x-1 text-neutral-400 select-none">
                <span className="font-semibold text-neutral-200">
                  {username}
                </span>
                <span>contributed</span>
                <span className="font-bold text-white">
                  {stats.total.toLocaleString()}
                </span>
                <span>this year on</span>
                <span className="font-semibold text-neutral-200 underline underline-offset-4">
                  GitHub
                </span>
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
