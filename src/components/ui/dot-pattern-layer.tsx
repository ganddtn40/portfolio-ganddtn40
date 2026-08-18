"use client";

import dynamic from "next/dynamic";

const DotPattern = dynamic(
  () => import("@/components/ui/dot-pattern").then((m) => m.DotPattern),
  { ssr: false },
);

export function DotPatternLayer() {
  return (
    <DotPattern className="fixed inset-0 -z-10 h-full w-full fill-[#262626] opacity-60" />
  );
}