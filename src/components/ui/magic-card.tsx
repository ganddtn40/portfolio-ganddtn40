"use client";

import { useRef } from "react";
import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

export function MagicCard({ children, className }: MagicCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const glow = useMotionTemplate`radial-gradient(240px at ${mx}px ${my}px, rgba(255,255,255,0.09), transparent 70%)`;

  return (
    <div
      ref={ref}
      className={cn("group relative border border-neutral-900 bg-black", className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-300);
        my.set(-300);
      }}
    >
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}