"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute left-4 top-0 z-10 h-full w-px bg-white/10 md:left-8" />
      <motion.div
        className="pointer-events-none absolute left-4 top-0 z-10 h-full w-px origin-top bg-gradient-to-b from-transparent via-white/80 to-transparent md:left-8"
        style={{ scaleY }}
      />
      <motion.div
        className="pointer-events-none absolute left-4 top-0 z-10 h-1.5 w-1.5 -translate-x-[2.5px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] md:left-8"
        style={{ top: dotTop }}
      />
      <div className="pl-10 md:pl-16">{children}</div>
    </div>
  );
}