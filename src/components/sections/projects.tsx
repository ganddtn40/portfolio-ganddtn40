"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { GlitchText } from "@/components/ui/glitch-text";
import { HackerText } from "@/components/ui/hacker-text";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { EASE } from "@/lib/easing";
import { SITE } from "@/lib/site";

const Lamp = dynamic(
  () => import("@/components/ui/lamp").then((m) => m.Lamp),
  { ssr: false },
);

const BEAM_WORDS = ["socialitea", "socialitea", "socialitea", "socialitea"];

function MockupScreen() {
  const [mockupBroken, setMockupBroken] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex h-full w-full flex-col bg-neutral-950 gothic-grid">
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 font-mono text-xs text-neutral-500">
          <span className="text-white">socialitea</span>
          <div className="hidden gap-6 sm:flex">
            {["menu", "about", "contact"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="h-3 w-40 rounded-full bg-neutral-800" />
          <span className="h-2 w-64 rounded-full bg-neutral-800/70" />
          <span className="h-10 w-36 rounded border border-neutral-800" />
        </div>
        <div className="grid grid-cols-3 gap-4 px-6 pb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-neutral-900" />
          ))}
        </div>
      </div>

      {!mockupBroken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/socialitea-mockup.png"
          alt="socialitea mockup"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setMockupBroken(true)}
        />
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl overflow-visible px-6 py-32">
      <div className="pointer-events-none absolute inset-x-[-40vw] top-0 z-0 -rotate-2 opacity-20 select-none mask-fade-x">
        <Marquee duration={36} pauseOnHover>
          {BEAM_WORDS.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="whitespace-nowrap font-mono text-6xl font-bold uppercase text-transparent text-outline md:text-8xl"
            >
              {w}
              <span className="mx-10 inline-block text-neutral-900">✝</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative z-10">
        <div className="relative">
          <Lamp className="absolute -top-32 left-1/2 w-[140vw] max-w-none -translate-x-1/2" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE }}
            className="border-b border-white/20 pb-6"
          >
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
                <GlitchText text="02 — projects" />
              </h2>
              <span className="hidden shrink-0 font-mono text-xs text-neutral-600 sm:block">
                one at a time
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mt-16"
        >
          <BorderBeam duration={7} />
          <div className="border-l-4 border-white pl-6 md:pl-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              <HackerText text="project_01" />
            </p>
            <h3 className="mt-4 font-mono text-4xl font-bold uppercase tracking-tight text-white md:text-7xl">
              {SITE.project}
            </h3>
            <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-neutral-500 md:text-base">
              {SITE.projectDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SITE.projectStack.map((s) => (
                <span
                  key={s}
                  className="border border-white/30 px-3 py-1 font-mono text-xs font-semibold text-white"
                >
                  {s}
                </span>
              ))}
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                status:{" "}
                <HackerText text={SITE.projectStatus.toLowerCase()} />
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-5">
              <Magnetic strength={0.25}>
                <a
                  href={SITE.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white px-8 py-3 font-mono uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={SITE.projectRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white px-8 py-3 font-mono uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <span className="inline-flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Source Code
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="px-6 text-left">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-600">
                scroll for the artifact
              </p>
            </div>
          }
        >
          <MockupScreen />
        </ContainerScroll>
      </div>
    </section>
  );
}