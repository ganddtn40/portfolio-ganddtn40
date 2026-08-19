"use client";

import { Suspense, lazy, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [12, -12]), {
    stiffness: 60,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [-9, 9]), {
    stiffness: 60,
    damping: 16,
  });

  if (isMobile) {
    return (
      <div
        className={`${className ?? ""} flex h-full w-full items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-neutral-700">
          <span className="text-5xl">✝</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">
            robot_offline
          </span>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600 animate-blink">
            loading scene_
          </span>
        </div>
      }
    >
      <div
        ref={containerRef}
        className="h-full w-full [perspective:900px]"
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set((e.clientX - rect.left) / rect.width);
          my.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="h-full w-full grayscale contrast-125"
        >
          <Spline scene={scene} className={className} renderOnDemand />
        </motion.div>
      </div>
    </Suspense>
  );
}