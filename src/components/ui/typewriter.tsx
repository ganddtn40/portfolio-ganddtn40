"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

export function Typewriter({ text, className, speed = 45, startDelay = 400 }: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (timer) clearInterval(timer);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={cn("inline-block", className)}>
      {text.slice(0, count)}
      <span className="animate-blink text-white">▊</span>
    </span>
  );
}