"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const LAND_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

let cachedLand: Promise<unknown> | null = null;
function getLand(): Promise<unknown> {
  cachedLand ??= fetch(LAND_URL).then((r) => r.json());
  return cachedLand;
}

export type DottedGlobeProps = {
  width: number;
  height: number;
};

function RotatingEarth({
  width,
  height,
  globeRef,
}: DottedGlobeProps & { globeRef?: React.Ref<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const autoRotateRef = useRef(0);
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const scaleFactor = window.innerWidth < 768 ? 0.55 : 1;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const graticule = d3.geoGraticule10();
    const geoOrthographic = d3
      .geoOrthographic()
      .translate([width / 2, height / 2])
      .scale((width / 2 - 5) * scaleFactor)
      .clipAngle(90);

    const geoPath = d3.geoPath(geoOrthographic, ctx);
    const sphere = { type: "Sphere" } as const;

    let landData: unknown = null;
    getLand().then((data) => {
      landData = data;
    });

    let last = performance.now();

    const draw = () => {
      if (document.hidden) return;

      const now = performance.now();
      if (!reducedMotionRef.current) {
        autoRotateRef.current += (now - last) / 40000;
      }
      last = now;

      const tilt = mouseTiltRef.current;
      const rotationDeg = autoRotateRef.current * 360;

      geoOrthographic.rotate([rotationDeg, tilt.y * 40, tilt.x * 40]);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.fillStyle = "rgba(255,255,255,0.04)";

      geoPath(sphere);
      ctx.stroke();

      geoPath(graticule);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, (width / 2 - 2) * scaleFactor, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (landData) {
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.fillStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 0.9;
        geoPath(landData as never);
        ctx.stroke();
        ctx.fill();
      }
    };

    const intervalId = setInterval(draw, 33);
    return () => clearInterval(intervalId);
  }, [width, height]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseTiltRef.current = {
      x: (y - rect.height / 2) / rect.height,
      y: (x - rect.width / 2) / rect.width,
    };
  };

  return (
    <div
      ref={globeRef}
      onMouseMove={handleMouseMove}
      className="flex aspect-square w-full items-center justify-center"
    >
      <canvas ref={canvasRef} className="mx-auto" style={{ width, height }} />
    </div>
  );
}

export function WireframeDottedGlobe({
  globeRef,
}: {
  globeRef?: React.Ref<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(320);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      setSize(Math.max(0, Math.min(Math.round(w), 600)));
    };

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center">
      <RotatingEarth width={size} height={size} globeRef={globeRef} />
    </div>
  );
}