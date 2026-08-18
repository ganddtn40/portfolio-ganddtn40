"use client";

import dynamic from "next/dynamic";

const MagneticCursor = dynamic(
  () =>
    import("@/components/ui/magnetic-cursor").then((m) => m.MagneticCursor),
  { ssr: false },
);

export function CursorLayer() {
  return <MagneticCursor cursorSize={28} blendMode="exclusion" />;
}