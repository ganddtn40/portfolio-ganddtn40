"use client";

import { cn } from "@/lib/utils";

interface LampProps {
  className?: string;
}

export function Lamp({ className }: LampProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative z-0 flex w-full flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 bg-white/[0.045] blur-[110px]" />
      <div className="absolute left-1/2 top-0 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-white/15 blur-[90px] animate-pulse" />
      <div className="absolute left-1/2 top-0 h-[1px] w-[760px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="absolute left-1/2 top-0 h-[160px] w-[1px] -translate-x-1/2 bg-gradient-to-b from-white/50 to-transparent" />
    </div>
  );
}