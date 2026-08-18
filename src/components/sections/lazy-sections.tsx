"use client";

import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/ui/section-loader";

const Technologies = dynamic(
  () =>
    import("@/components/sections/technologies").then((m) => m.Technologies),
  {
    ssr: false,
    loading: () => <SectionLoader className="min-h-[80vh]" />,
  },
);

const Networking = dynamic(
  () => import("@/components/sections/networking").then((m) => m.Networking),
  {
    ssr: false,
    loading: () => <SectionLoader className="min-h-[70vh]" />,
  },
);

const Stats = dynamic(
  () => import("@/components/sections/stats").then((m) => m.Stats),
  {
    ssr: false,
    loading: () => <SectionLoader className="min-h-[50vh]" />,
  },
);

const Bucket = dynamic(
  () => import("@/components/ui/bucket").then((m) => m.default),
  {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse bg-neutral-900" />,
  },
);

export function LazyTechnologies() {
  return <Technologies />;
}

export function LazyNetworking() {
  return <Networking />;
}

export function LazyStats() {
  return <Stats />;
}

export function LazyBucket() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <Bucket />
    </div>
  );
}