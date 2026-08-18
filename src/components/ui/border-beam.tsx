"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
}

export function BorderBeam({ className, duration = 8 }: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("border-beam pointer-events-none absolute inset-0", className)}
      style={{ animationDuration: `${duration}s` }}
    />
  );
}