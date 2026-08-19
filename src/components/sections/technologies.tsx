"use client";

import { m } from "framer-motion";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { HackerText } from "@/components/ui/hacker-text";
import { HyperText } from "@/components/ui/hyper-text";
import { EASE } from "@/lib/easing";

const ICON_SLUGS = [
  "typescript",
  "sqlite",
  "php",
  "dart",
  "html5",
  "css3",
  "javascript",
  "nextdotjs",
];

const SKILLS = [
  { name: "TypeScript", use: "everything that ships" },
  { name: "SQL", use: "the ground truth" },
  { name: "PHP", use: "legacy ground, still solid" },
  { name: "Dart", use: "when it must run anywhere" },
  { name: "HTML5", use: "the bones" },
  { name: "CSS3", use: "the skin and the soul" },
  { name: "JS", use: "the spark in every page" },
];

export function Technologies() {
  return (
    <section id="stack" className="relative mx-auto w-full max-w-6xl px-4 py-32 md:px-8">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: EASE }}
        className="border-b border-white/10 pb-6"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="min-w-0">
            <HyperText
              text="01 — STACK"
              className="text-3xl font-bold uppercase tracking-tight text-white md:text-5xl"
            />
          </h2>
          <span className="hidden shrink-0 font-mono text-xs text-neutral-600 sm:block">
            <HackerText text="step_01 — the arsenal" />
          </span>
        </div>
      </m.div>

      <div className="mt-16 flex flex-col items-center gap-16">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="w-full max-w-2xl"
        >
          <ul>
            {SKILLS.map((s, i) => (
              <li
                key={s.name}
                className="flex items-baseline gap-4 border-b border-neutral-900 py-4 font-mono text-base first:border-t md:text-lg"
              >
                <span className="text-xs text-neutral-800">{`0${i + 1}`}</span>
                <span className="font-semibold text-white">{s.name}</span>
                <span className="ml-auto text-xs leading-relaxed text-neutral-600 md:text-sm">
                  {s.use}
                </span>
              </li>
            ))}
          </ul>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="relative min-h-[420px] w-full overflow-hidden border-none bg-transparent shadow-none outline-none [contain:layout_paint] [transform:translate3d(0,0,0)] [will-change:transform]"
        >
          <ErrorBoundary>
            <IconCloud iconSlugs={ICON_SLUGS} />
          </ErrorBoundary>
        </m.div>
      </div>
    </section>
  );
}