"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import { EASE } from "@/lib/easing";

function FloatingPaths({
  position,
  animated,
}: {
  position: number;
  animated: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const active = animated && !reduceMotion;

  const paths = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.05,
        opacity: 0.04 + i * 0.015,
      })),
    [position],
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full text-white"
      viewBox="0 0 696 316"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          initial={{ pathOffset: 0, opacity: path.opacity * 0.4 }}
          animate={
            active
              ? {
                  pathOffset: [0, 1, 0],
                  opacity: [
                    path.opacity * 0.4,
                    path.opacity,
                    path.opacity * 0.4,
                  ],
                }
              : { pathOffset: 0, opacity: path.opacity * 0.4 }
          }
          transition={
            active
              ? {
                  duration: 20 + (path.id % 5) * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }
              : { duration: 0 }
          }
        />
      ))}
    </svg>
  );
}

export function BackgroundPaths({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "160px" });

  return (
    <div
      ref={containerRef}
      className={`relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <FloatingPaths position={1} animated={inView} />
        <FloatingPaths position={-1} animated={inView} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}