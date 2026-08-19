"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { SiGithub, SiInstagram, SiTiktok } from "react-icons/si";
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

function HeroWord({
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
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [15, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-3 md:mr-5"
    >
      {word}
    </motion.span>
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
        <BackgroundPaths />
        <div className="absolute inset-0">
          {!isMobile && <Sparkles density={100} />}
        </div>
      </div>

      <div className="relative z-10">
        <div
          ref={headlineRef}
          className="mx-auto h-[140vh] w-full max-w-6xl px-4 md:h-[180vh] md:px-8"
        >
          <div className="sticky top-24 mt-16 flex items-start justify-center md:top-1/3 md:mt-24 md:items-center">
            <motion.h1
              className="flex flex-wrap justify-center text-center font-mono text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl"
            >
              {WORDS.map((word, i) => (
                <HeroWord
                  key={word}
                  progress={scrollYProgress}
                  index={i}
                  total={WORDS.length}
                  word={word}
                />
              ))}
            </motion.h1>
          </div>
          <p className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600">
              scroll to explore
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-neutral-500" />
          </p>
        </div>

        <motion.div
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
            <div className="pointer-events-none mt-10 flex w-full justify-center">
              <div className="h-[28vh] min-h-[220px] w-full max-w-lg opacity-70 md:h-[36vh]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          <Spotlight className="z-20" size={520} opacity={0.09} />
        </motion.div>
      </div>
    </section>
  );
}