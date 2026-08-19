"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
    <div
      ref={containerRef}
      className={`${className ?? ""} relative h-full w-full [contain:layout_paint]`}
    >
      <ErrorBoundary>
        {inView ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600 animate-blink">
                  loading scene_
                </span>
              </div>
            }
          >
            <Spline scene={scene} renderOnDemand />
          </Suspense>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-700 animate-blink">
              booting scene_
            </span>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}