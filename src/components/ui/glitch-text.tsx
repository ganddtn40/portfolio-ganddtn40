"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  interval?: number;
  burst?: number;
}

export function GlitchText({ text, className, interval = 4500, burst = 500 }: GlitchTextProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const timer = setInterval(() => {
      setActive(true);
      timeout = setTimeout(() => setActive(false), burst);
    }, interval);
    return () => {
      clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [interval, burst]);

  return (
    <span
      data-text={text}
      className={cn("glitch-text", active && "glitch-text--on", className)}
    >
      {text}
    </span>
  );
}