"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export function Spotlight({ className, size = 640, opacity = 0.12 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 120, damping: 25 });
  const sy = useSpring(my, { stiffness: 120, damping: 25 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, rgba(255,255,255,${opacity}), transparent 65%)`;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
    />
  );
}