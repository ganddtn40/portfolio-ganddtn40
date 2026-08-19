"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, m } from "framer-motion";

import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello";
import { EASE } from "@/lib/easing";

export function IntroLoader({
  children,
  onDone,
}: {
  children: React.ReactNode;
  onDone?: () => void;
}) {
  const [helloDone, setHelloDone] = useState(false);
  const [exitStarted, setExitStarted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!helloDone) return;
    const t = setTimeout(() => setExitStarted(true), 450);
    return () => clearTimeout(t);
  }, [helloDone]);

  useEffect(() => {
    if (!ready) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [ready]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    onDone?.();
  }, [ready, onDone]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setReady(true)}>
        {!exitStarted && (
          <m.div
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <AppleHelloEnglishEffect
              className="h-16 text-white md:h-24"
              onAnimationComplete={() => setHelloDone(true)}
            />
            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-500 md:text-xs">
              <span className="text-white">ganddtn40</span>
              <span className="mx-3 text-neutral-700">/</span>
              full stack web developer
              <span className="ml-1 animate-blink text-white">_</span>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-700">
              loading soul
            </div>
          </m.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
