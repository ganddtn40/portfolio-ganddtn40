"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

interface HackerTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function HackerText({ text, className, speed = 24 }: HackerTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  const scramble = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;
    const total = text.length;
    const chars: string[] = text.split("");

    const tick = () => {
      frameRef.current += 1;
      const revealed = Math.floor((frameRef.current * speed) / 16);
      let done = true;
      for (let i = 0; i < total; i++) {
        const target = text[i];
        if (target === " ") {
          chars[i] = " ";
          continue;
        }
        if (i < revealed || frameRef.current > total + 18) {
          chars[i] = target;
        } else {
          done = false;
          chars[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(chars.join(""));
      if (!done) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return (
    <span
      onMouseEnter={scramble}
      onMouseLeave={() => setDisplay(text)}
      className={cn("inline-block cursor-default", className)}
    >
      {display}
    </span>
  );
}