"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlitchText } from "@/components/ui/glitch-text";
import { Meteors } from "@/components/ui/meteors";
import { WobbleCard } from "@/components/ui/wobble-card";
import { useLoaderDone } from "@/components/ui/loader-provider";
import { EASE } from "@/lib/easing";
import { SITE } from "@/lib/site";

const GithubCalendar = dynamic(
  () =>
    import("@/components/ui/retro-space-shooter-git-hub-calendar").then(
      (m) => m.GithubCalendar,
    ),
  {
    ssr: false,
    loading: () => <div className="h-40 w-full animate-pulse bg-neutral-900" />,
  },
);

function ParallaxGif({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  );
}

export function Stats() {
  const isLoaderDone = useLoaderDone();

  return (
    <section id="stats" className="relative mx-auto max-w-6xl overflow-visible px-6 py-32">
      <Meteors number={14} className="hidden md:block inset-x-[-20vw] -top-40" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: EASE }}
        className="border-b border-white/20 pb-6"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="min-w-0 font-mono text-base font-semibold text-neutral-300 md:text-xl">
            <span className="text-white">{`>`}</span>{" "}
            <GlitchText text="./github_contributions.sh" />
          </h2>
          <span className="hidden shrink-0 font-mono text-xs text-neutral-600 sm:block">
            one year · real data
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mt-16 grid grid-cols-1 items-start gap-16 md:grid-cols-[minmax(0,1fr)_240px]"
      >
        <div className="w-full max-w-[100vw] overflow-x-auto pb-4 scrollbar-thin">
          <div className="min-w-max">
            {isLoaderDone && <GithubCalendar username={SITE.name} />}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-[240px] md:block">
          <ParallaxGif>
            <WobbleCard className="w-full max-w-[240px]">
              <div className="relative h-[320px] min-h-[250px] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/chain.gif"
                  alt="Chain"
                  width={240}
                  height={320}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            </WobbleCard>
          </ParallaxGif>
        </div>
      </motion.div>
    </section>
  );
}