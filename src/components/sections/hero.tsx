"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
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

const WORDS = "FULL STACK WEB DEVELOPER IN THE WORLD".split(" ");

const ROLES = [
  "Full Stack Web Developer",
  "TypeScript Architect",
  "SQL Schema Shepherd",
  "Backend Engineer",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const REVEAL_EASE: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9];

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: REVEAL_EASE },
  },
};

export function Hero() {
  const isLoaderDone = useLoaderDone();
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundPaths />
        <div className="absolute inset-0">
          {!isMobile && <Sparkles density={100} />}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center [transform:translateZ(0)] [will-change:transform,opacity]">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 overflow-hidden">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="flex flex-wrap justify-center text-center font-mono text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            {WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="inline-block whitespace-nowrap px-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.5em] text-neutral-700">
            full stack web developer
            <span className="ml-2 inline-block animate-blink text-white">▌</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col items-center justify-center px-6"
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
    </section>
  );
}