"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function AnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -80,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        autoRaf: true,
      }}
    >
      <AnchorHandler />
      {children}
    </ReactLenis>
  );
}