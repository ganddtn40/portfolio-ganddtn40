"use client";

import { Suspense, lazy, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ErrorBoundary } from "@/components/ui/error-boundary";

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
  const rotateY = useSpring(useTransform(mx, [0, 1], [86, -86]), {
    stiffness: 160,
    damping: 18,
    mass: 0.5,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [40, -40]), {
    stiffness: 160,
    damping: 18,
    mass: 0.5,
  });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, mx, my]);

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
    <ErrorBoundary>
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
          className="h-full w-full [perspective:900px] [transform:translate3d(0,0,0)] [will-change:transform]"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="h-full w-full grayscale contrast-125"
          >
            <Spline scene={scene} className={className} renderOnDemand />
          </motion.div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}