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

const WORDS = ["FULL", "STACK", "WEB", "DEVELOPER", "IN THE", "WORLD"];
const FRAMES = WORDS.length + 1;

const ROLES = [
  "Full Stack Web Developer",
  "TypeScript Architect",
  "SQL Schema Shepherd",
  "Backend Engineer",
];

function WordLayer({
  progress,
  index,
  frameCount,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  frameCount: number;
  children: React.ReactNode;
}) {
  const start = index / frameCount;
  const end = (index + 1) / frameCount;
  const fadeIn = start + 0.02;
  const fadeOut = end - 0.02;

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, fadeIn, fadeOut, end], [90, 0, 0, -90]);
  const scale = useTransform(progress, [start, fadeIn, fadeOut, end], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      className="absolute inset-0 grid place-items-center"
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isLoaderDone = useLoaderDone();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const endStart = (FRAMES - 1) / FRAMES;
  const endOpacity = useTransform(
    scrollYProgress,
    [endStart + 0.03, endStart + 0.14],
    [0, 1],
  );
  const endY = useTransform(
    scrollYProgress,
    [endStart + 0.03, endStart + 0.14],
    [70, 0],
  );

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <h1 className="sr-only">FULL STACK WEB DEVELOPER IN THE WORLD</h1>
      <div className="sticky top-0 h-screen overflow-hidden">
        <BackgroundPaths>
          <div className="relative h-screen w-full">
            <div className="absolute inset-0">
              {!isMobile && <Sparkles density={100} />}
            </div>

            {WORDS.map((word, i) => (
              <WordLayer
                key={word}
                progress={scrollYProgress}
                index={i}
                frameCount={FRAMES}
              >
                <div className="relative flex flex-col items-center">
                  <span className="absolute -top-16 font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-700 md:-top-24">
                    {`0${i + 1}`}
                    <span className="mx-3 text-neutral-900">/</span>
                    {`0${FRAMES - 1}`}
                  </span>
                  <div className="px-4 text-center font-mono text-[15vw] font-bold uppercase leading-none tracking-tight text-white md:text-[8rem] lg:text-[11rem]">
                    {word}
                  </div>
                  <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-700">
                    ✝
                  </span>
                </div>
              </WordLayer>
            ))}

            <motion.div
              style={{ opacity: endOpacity, y: endY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6"
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
            </motion.div>

            <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-600">
                  scroll to explore
                </span>
                <ChevronDown className="h-4 w-4 animate-bounce text-neutral-500" />
              </div>

            <Spotlight className="z-20" size={520} opacity={0.09} />
          </div>
        </BackgroundPaths>
      </div>
    </section>
  );
}