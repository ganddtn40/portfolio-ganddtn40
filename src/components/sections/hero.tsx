"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { SiGithub, SiInstagram, SiTiktok } from "react-icons/si";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Magnetic } from "@/components/ui/magnetic";
import { MorphText } from "@/components/ui/morph-text";
import { Spotlight } from "@/components/ui/spotlight";
import { Typewriter } from "@/components/ui/typewriter";
import { useLoaderDone } from "@/components/ui/loader-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { SITE } from "@/lib/site";

const BackgroundPaths = dynamic(
  () =>
    import("@/components/ui/background-paths").then((m) => m.BackgroundPaths),
  { ssr: false },
);

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => m.SplineScene),
  { ssr: false },
);

const Sparkles = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.Sparkles),
  { ssr: false },
);

const SOCIALS = [
  { href: "https://github.com/ganddtn40", icon: SiGithub, label: "GitHub" },
  { href: "https://www.instagram.com/", icon: SiInstagram, label: "Instagram" },
  { href: "https://www.tiktok.com/", icon: SiTiktok, label: "TikTok" },
];

const WORDS = ["FULL", "STACK", "WEB", "DEVELOPER", "IN", "THE", "WORLD"];

const ROLES = [
  "Full Stack Web Developer",
  "TypeScript Architect",
  "SQL Schema Shepherd",
  "Backend Engineer",
];

function ScrollWord({
  progress,
  index,
  total,
  word,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  word: string;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [-30, 0]);

  return (
    <span
      className="inline-block leading-none"
      style={{ willChange: "opacity, transform", WebkitTransform: "translateZ(0)" }}
    >
      <m.span style={{ opacity, y }} className="inline-block leading-none">
        {word}
      </m.span>
    </span>
  );
}

function ViewWord({ word, index }: { word: string; index: number }) {
  return (
    <span
      className="inline-block leading-none"
      style={{ willChange: "opacity, transform", WebkitTransform: "translateZ(0)" }}
    >
      <m.span
        initial={{ opacity: 0.1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
        className="inline-block leading-none"
      >
        {word}
      </m.span>
    </span>
  );
}

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const isLoaderDone = useLoaderDone();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <BackgroundPaths />
          <div className="absolute inset-0 [contain:layout_paint]">
            {!isMobile && (
              <ErrorBoundary>
                <Sparkles density={100} />
              </ErrorBoundary>
            )}
          </div>
        </ErrorBoundary>
      </div>

      <div className="relative z-10">
        <div
          ref={headlineRef}
          className="mx-auto h-[120vh] w-full max-w-6xl px-4 md:h-[200vh] md:px-8"
        >
          <div className="sticky top-24 relative z-50 mt-16 flex items-start justify-center [transform:translate3d(0,0,0)] [will-change:transform] md:top-1/3 md:mt-24 md:items-center">
            <m.h1
              className="flex flex-col items-center text-center font-gothic text-2xl font-black uppercase leading-none text-white -tracking-widest drop-shadow-[0_10px_10px_rgba(255,255,255,0.2)] sm:text-4xl md:text-6xl lg:text-7xl"
            >
              {WORDS.map((word, i) =>
                isMobile ? (
                  <ViewWord key={word} word={word} index={i} />
                ) : (
                  <ScrollWord
                    key={word}
                    progress={scrollYProgress}
                    index={i}
                    total={WORDS.length}
                    word={word}
                  />
                ),
              )}
            </m.h1>
          </div>
          <p className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600">
              scroll to explore
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-neutral-500" />
          </p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-24 [transform:translateZ(0)] [will-change:transform,opacity]"
        >
          <Image
            src={SITE.avatar}
            alt={SITE.name}
            width={96}
            height={96}
            priority
            className="h-20 w-20 rounded-full border border-neutral-700 object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-24 md:w-24"
          />
          <h2 className="mt-8 text-center font-mono text-xl font-semibold tracking-tight text-white md:text-4xl">
            lyhsjaa@
            <span className="mx-3 text-neutral-700">|</span>
            <MorphText words={ROLES} className="text-neutral-400" />
          </h2>
          <p className="mt-6 max-w-md text-center font-mono text-xs leading-relaxed text-neutral-600 md:text-sm">
            <span className="text-neutral-500">
              <Typewriter text="$ cat profile.md" speed={55} />
            </span>
            <br />
            {SITE.role} — reliable, fast web systems from SQL schemas to
            pixels.
          </p>
          <div className="mt-8 flex items-center gap-8">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <Magnetic key={label} strength={0.35}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                >
                  <Icon className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-white" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-700 transition-colors duration-300 group-hover:text-neutral-400">
                    {label}
                  </span>
                </a>
              </Magnetic>
            ))}
          </div>
          {isLoaderDone && (
            <div className="mt-10 flex w-full justify-center [transform:translate3d(0,0,0)] [will-change:transform,opacity]">
              <div className="h-[28vh] min-h-[220px] w-full max-w-lg opacity-70 [contain:layout_paint] md:h-[36vh]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          <Spotlight className="z-20" size={520} opacity={0.09} />
        </m.div>
      </div>
    </section>
  );
}