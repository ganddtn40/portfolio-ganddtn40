"use client";

import { m } from "framer-motion";
import { RefObject, useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "#fff",
  pathWidth = 1,
  pathOpacity = 0.2,
  gradientStartColor = "#fff",
  gradientStopColor = "#fff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [path, setPath] = useState<{
    d: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;

      const containerRect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const startX =
        fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY =
        fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX =
        toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY =
        toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const midX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;

      setPath({
        d: `M ${startX},${startY} Q ${midX},${controlY} ${endX},${endY}`,
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    compute();

    const frame = requestAnimationFrame(compute);
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!path) return null;

  return (
    <svg
      fill="none"
      width={path.width}
      height={path.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-0 z-[2]",
        className,
      )}
      viewBox={`0 0 ${path.width} ${path.height}`}
      aria-hidden="true"
    >
      <path
        d={path.d}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={path.d}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <m.linearGradient
          className="rotate-90"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: reverse ? "100%" : "0%",
            x2: reverse ? "0%" : "100%",
            y1: reverse ? "100%" : "0%",
            y2: reverse ? "0%" : "100%",
          }}
          transition={{
            delay,
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </m.linearGradient>
      </defs>
    </svg>
  );
};