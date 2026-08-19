"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Frame, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SITE } from "@/lib/site";

const Meteors = dynamic(
  () => import("@/components/ui/meteors").then((m) => m.Meteors),
  { ssr: false },
);

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface FooterColumn {
  label: string;
  links: FooterLink[];
}

const FOOTER_LINKS: FooterColumn[] = [
  {
    label: "navigate",
    links: [
      { title: "whoami", href: "#whoami" },
      { title: "stack", href: "#stack" },
      { title: "projects", href: "#projects" },
      { title: "network", href: "#network" },
    ],
  },
  {
    label: "connect",
    links: [
      { title: "GitHub", href: SITE.github },
      { title: "LinkedIn", href: "https://www.linkedin.com/" },
      { title: "Email", href: `mailto:${SITE.email}` },
    ],
  },
  {
    label: "stack",
    links: [
      { title: "TypeScript", href: "#stack" },
      { title: "SQL", href: "#stack" },
      { title: "PHP", href: "#stack" },
      { title: "JS", href: "#stack" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "GitHub", href: SITE.github, icon: <SiGithub className="me-1 size-4" /> },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/",
        icon: (
          <svg viewBox="0 0 24 24" className="me-1 size-4 fill-current" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        ),
      },
      {
        title: "Email",
        href: `mailto:${SITE.email}`,
        icon: <Mail className="me-1 size-4" />,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)] px-6 py-12 lg:py-16">
      <Meteors number={10} className="hidden md:block" />
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Frame className="size-8" />
          <p className="text-muted-foreground mt-8 text-sm md:mt-0">
            © 2026 {SITE.name} (lyhsjaa). Built with Next.js.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {FOOTER_LINKS.map((column, i) => (
            <AnimatedContainer key={column.label} delay={0.1 + i * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs">{column.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && link.icon}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}