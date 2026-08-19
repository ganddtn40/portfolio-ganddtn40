"use client";

import { m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { WireframeDottedGlobe } from "@/components/ui/wireframe-globe";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { HyperText } from "@/components/ui/hyper-text";
import { useLoaderDone } from "@/components/ui/loader-provider";
import { EASE } from "@/lib/easing";

const nodes = [
  { ref: "node-0", label: "api-gateway", sub: "edge Â· nginx", x: "left-[2%] top-[34%] sm:left-[3%]" },
  { ref: "node-1", label: "worker-pool", sub: "queue Â· redis", x: "right-[2%] top-[12%] sm:right-[2%]" },
  { ref: "node-2", label: "data-tomb", sub: "postgres", x: "right-[2%] bottom-[8%] sm:right-[4%]" },
  { ref: "node-3", label: "cache-layer", sub: "redis", x: "left-[2%] bottom-[14%] sm:left-[4%]" },
];

export function Networking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement | null>(null);
  const isLoaderDone = useLoaderDone();
  const [nodeEls, setNodeEls] = useState<Record<string, HTMLDivElement | null>>(
    {},
  );
  const [beamOffsets, setBeamOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [beamsReady, setBeamsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBeamsReady(true), 250);
    return () => clearTimeout(t);
  }, []);

  const registerNode = useCallback((ref: string, el: HTMLDivElement | null) => {
    if (el) {
      setNodeEls((prev) => {
        if (prev[ref] === el) return prev;
        return { ...prev, [ref]: el };
      });
    }
  }, []);

  const allNodesReady =
    beamsReady && nodes.every((n) => nodeEls[n.ref] != null);

  useEffect(() => {
    const container = containerRef.current;
    const globe = globeRef.current;
    if (!allNodesReady || !container || !globe) return;

    const compute = () => {
      const containerRect = container.getBoundingClientRect();
      const globeRect = globe.getBoundingClientRect();
      const gcx = globeRect.left - containerRect.left + globeRect.width / 2;
      const gcy = globeRect.top - containerRect.top + globeRect.height / 2;
      const radius = globeRect.width / 2 - 6;

      const next: Record<string, { x: number; y: number }> = {};
      nodes.forEach((n) => {
        const el = nodeEls[n.ref];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left - containerRect.left + rect.width / 2;
        const cy = rect.top - containerRect.top + rect.height / 2;
        const dx = cx - gcx;
        const dy = cy - gcy;
        const len = Math.hypot(dx, dy) || 1;
        next[n.ref] = { x: (dx / len) * radius, y: (dy / len) * radius };
      });
      setBeamOffsets(next);
    };

    compute();
    const frame = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", compute);
    };
  }, [allNodesReady, nodeEls]);

  return (
    <section id="network" className="relative mx-auto w-full max-w-6xl px-4 py-32 md:px-8">
      <div className="mx-auto max-w-6xl px-0">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: EASE }}
          className="border-b border-white/10 pb-6"
        >
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="min-w-0">
              <HyperText
                text="03 — NETWORK"
                className="text-3xl font-bold uppercase tracking-tight text-white md:text-5xl"
              />
            </h2>
            <span className="hidden shrink-0 font-mono text-xs text-neutral-600 sm:block">
              topology
            </span>
          </div>
        </m.div>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-8 max-w-lg font-mono text-sm leading-relaxed text-neutral-500 md:text-base"
        >
          The world, wired. Every request travels along the white beams — from
          the gateway through the queue to the tomb of data. Move your mouse to
          tilt the globe.
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative mx-auto mt-10 max-w-6xl px-0"
      >
        <div
          ref={containerRef}
          className="relative h-[420px] overflow-hidden border border-neutral-900 bg-neutral-950/50 md:h-[600px]"
        >
          <div className="gothic-grid absolute inset-0 z-0 opacity-60" />

          <div className="absolute inset-0 z-[1] flex w-full max-w-full items-center justify-center overflow-hidden px-2 py-6">
            <div className="mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center overflow-hidden [contain:layout_paint] [transform:translateZ(0)] [will-change:transform] sm:max-w-[480px] md:max-w-[600px]">
              {isLoaderDone && (
                <ErrorBoundary>
                  <WireframeDottedGlobe globeRef={globeRef} />
                </ErrorBoundary>
              )}
            </div>
          </div>

          {nodes.map((n) => (
            <div
              key={n.ref}
              ref={(el) => registerNode(n.ref, el)}
              className={`absolute z-[3] ${n.x}`}
            >
              <div className="flex items-center gap-2.5 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2.5 md:px-4 md:py-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <div className="min-w-0">
                  <div className="truncate font-mono text-[11px] font-semibold text-white md:text-xs">
                    {n.label}
                  </div>
                  <div className="truncate font-mono text-[9px] text-neutral-600 md:text-[10px]">
                    {n.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {allNodesReady &&
            nodes.slice(1).map((n, idx) => {
              const offset = beamOffsets["node-0"];
              if (!offset) return null;
              return (
                <AnimatedBeam
                  key={`beam-${n.ref}`}
                  containerRef={containerRef}
                  fromRef={globeRef}
                  toRef={
                    { current: nodeEls[n.ref] } as React.RefObject<HTMLDivElement>
                  }
                  startXOffset={offset.x}
                  startYOffset={offset.y}
                  curvature={70 + idx * 30}
                  pathColor="#ffffff"
                  pathWidth={1}
                  pathOpacity={0.1}
                  gradientStartColor="#ffffff"
                  gradientStopColor="#ffffff"
                  duration={5}
                />
              );
            })}
        </div>
      </m.div>
    </section>
  );
}