"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 18, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => ({
        left: `${(i * 37 + 11) % 97}%`,
        delay: `${(i * 1.7) % 9}s`,
        duration: `${3.5 + ((i * 13) % 45) / 10}s`,
      })),
    [number]
  );

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={
            {
              left: m.left,
              "--delay": m.delay,
              "--duration": m.duration,
              opacity: 0.25 + ((i * 7) % 50) / 100,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}