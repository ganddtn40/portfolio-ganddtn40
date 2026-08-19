"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GlitchText } from "@/components/ui/glitch-text";
import { HackerText } from "@/components/ui/hacker-text";
import { Marquee } from "@/components/ui/marquee";
import { WobbleCard } from "@/components/ui/wobble-card";
import { EASE } from "@/lib/easing";
import { SITE } from "@/lib/site";

const SEPARATOR_WORDS = [
  "whoami",
  "ganddtn40",
  "full stack",
  "web developer",
];

function ParallaxGif({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <m.div
      ref={ref}
      style={{ y }}
      className="relative [transform:translateZ(0)] [will-change:transform]"
    >
      {children}
    </m.div>
  );
}

const INFO_ROWS: Array<[string, string]> = [
  ["role", SITE.role],
  ["origin", SITE.origin],
  ["mode", "terminal"],
  ["status", "open to work"],
];

function MacTerminal() {
  return (
    <div className="mt-10 w-full max-w-xl overflow-hidden rounded-md border border-neutral-800 bg-black font-mono shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-[#1e1e1e] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 truncate text-xs text-neutral-500">
          {SITE.name} â€” zsh â€” portfolio
        </span>
      </div>
      <div className="px-5 py-5">
        <p className="text-sm text-neutral-400">
          <span className="text-neutral-300">
            {SITE.name}@macbook:~/portfolio$
          </span>{" "}
          <span className="text-white">cat info.txt</span>
        </p>
        <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          â”€â”€ info.txt â”€â”€
        </p>
        <dl className="mt-2 divide-y divide-neutral-900 text-sm">
          {INFO_ROWS.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-6 py-2.5">
              <dt className="w-20 shrink-0 text-neutral-600">{k}</dt>
              <dd className="leading-relaxed text-white">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-neutral-400">
          <span className="text-neutral-300">
            {SITE.name}@macbook:~/portfolio$
          </span>{" "}
          <span className="inline-block h-4 w-2 animate-blink bg-white/80 align-middle" />
        </p>
      </div>
    </div>
  );
}

export function Whoami() {
  return (
    <section id="whoami" className="relative mx-auto w-full max-w-6xl px-4 py-32 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: EASE }}
        className="border-b border-white/10 pb-6"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
            <GlitchText text="00 â€” whoami" />
          </h2>
          <span className="hidden font-mono text-xs text-neutral-600 sm:block">
            {SITE.name}
          </span>
        </div>
      </m.div>

      <div className="mt-16 grid grid-cols-1 items-start gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="w-full"
        >
          <div className="inline-block border-2 border-white/25 p-2">
            <Image
              src={SITE.avatar}
              alt={`${SITE.name} avatar`}
              width={96}
              height={96}
              className="h-24 w-24 object-cover grayscale"
            />
          </div>

          <p className="mt-10 max-w-xl font-mono text-sm leading-relaxed text-neutral-500 md:text-base">
            <span className="text-neutral-400">
              <HackerText text="$ cat /etc/passwd | grep ganddtn40" />
            </span>
            <br />
            <br />
            {SITE.role} from {SITE.origin}. TypeScript, SQL, PHP, Dart, HTML5,
            CSS3, JS â€” and nothing else. Recently shipped{" "}
            <span className="text-white">{SITE.project}</span>, a static
            landing site for a tea & coffee cafe.
          </p>

          <MacTerminal />
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: EASE }}
          className="w-full"
        >
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <ParallaxGif>
              <WobbleCard className="w-full max-w-md">
                <div className="relative h-[300px] min-h-[250px] w-full md:h-[420px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/gothic-cross.gif"
                    alt="Cross"
                    width={420}
                    height={420}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
              </WobbleCard>
            </ParallaxGif>
          </div>
        </m.div>
      </div>

      <div className="mt-32 mask-fade-x">
        <Marquee duration={24} pauseOnHover>
          {SEPARATOR_WORDS.map((w) => (
            <span
              key={w}
              className="whitespace-nowrap font-mono text-3xl font-bold uppercase text-transparent text-outline transition-colors duration-500 hover:text-white md:text-5xl"
            >
              {w}
              <span className="mx-6 inline-block text-neutral-800">âœ</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}