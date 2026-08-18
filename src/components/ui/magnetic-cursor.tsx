"use client";

import React, { useEffect, useRef, useState } from "react";

interface MagneticCursorProps {
  children?: React.ReactNode;
  hoverAttribute?: string;
  cursorSize?: number;
  cursorColor?: string;
  blendMode?: "difference" | "exclusion" | "normal" | "screen" | "overlay";
  shape?: "circle" | "square" | "rounded-square";
  magneticFactor?: number;
  lerpAmount?: number;
  speedMultiplier?: number;
  disableOnTouch?: boolean;
  cursorClassName?: string;
}

export const MagneticCursor: React.FC<MagneticCursorProps> = ({
  children,
  hoverAttribute = "data-magnetic",
  cursorSize = 26,
  cursorColor = "#ffffff",
  blendMode = "exclusion",
  shape = "circle",
  magneticFactor = 0.2,
  lerpAmount = 0.16,
  speedMultiplier = 0.02,
  disableOnTouch = true,
  cursorClassName = "",
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100, tx: -100, ty: -100 });
  const [isTouch] = useState<boolean>(() =>
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0),
  );

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    if (disableOnTouch && isTouch) {
      el.style.display = "none";
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const loop = () => {
      const p = posRef.current;
      const k = reduced ? 1 : lerpAmount;
      const dx = p.tx - p.x;
      const dy = p.ty - p.y;
      p.x += dx * k;
      p.y += dy * k;
      const speed = Math.min(Math.hypot(dx, dy) * speedMultiplier, 0.35);
      const sx = 1 + speed;
      const sy = 1 - speed * 0.5;
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${sx}, ${sy})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onPointerMove = (event: PointerEvent) => {
      const p = posRef.current;
      p.tx = event.clientX;
      p.ty = event.clientY;
      const inViewport =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;
      el.style.opacity = inViewport ? "1" : "0";
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        `[${hoverAttribute}]`,
      );
      if (!target) return;
      target.dataset.magnetHover = "true";
      el.classList.add("cursor-magnet");
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        `[${hoverAttribute}]`,
      );
      if (!target) return;
      delete target.dataset.magnetHover;
      target.style.transform = "";
      el.classList.remove("cursor-magnet");
    };

    const onPointerMoveTarget = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        `[${hoverAttribute}]`,
      );
      if (!target || target.dataset.magnetHover !== "true") return;
      const rect = target.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      target.style.transform = `translate3d(${dx * magneticFactor}px, ${
        dy * magneticFactor
      }px, 0)`;
      target.style.willChange = "transform";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointermove", onPointerMoveTarget, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointermove", onPointerMoveTarget);
    };
  }, [
    isTouch,
    disableOnTouch,
    hoverAttribute,
    lerpAmount,
    speedMultiplier,
    magneticFactor,
  ]);

  const styles: React.CSSProperties = {
    background: cursorColor,
    mixBlendMode: blendMode,
    width: cursorSize,
    height: cursorSize,
    borderRadius: shape === "circle" ? "50%" : shape === "square" ? "0" : "8px",
    ["--cursor-size" as string]: `${cursorSize}px`,
  };

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`magnetic-cursor ${cursorClassName}`}
        style={styles}
      />
      {children}
    </>
  );
};