"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub, SiInstagram, SiTiktok } from "react-icons/si";
import { TextRoll } from "@/components/ui/animated-menu";
import { SITE } from "@/lib/site";

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: string;
}) => {
  return (
    <a href={href} className="flex h-5 items-center text-sm">
      <TextRoll
        className="text-neutral-400 [&>div:first-child]:text-neutral-400 [&>div:last-child]:text-white"
      >
        {children}
      </TextRoll>
    </a>
  );
};

export function TerminalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full");
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (next) {
      setHeaderShapeClass("rounded-xl");
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full");
      }, 350);
    }
  };

  useEffect(() => {
    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, []);

  const navLinksData = [
    { label: "whoami", href: "#whoami" },
    { label: "stack", href: "#stack" },
    { label: "projects", href: "#projects" },
    { label: "network", href: "#network" },
  ];

  const socialLinks = [
    {
      href: SITE.github,
      label: "github",
      icon: SiGithub,
    },
    {
      href: "https://www.instagram.com/",
      label: "instagram",
      icon: SiInstagram,
    },
    {
      href: "https://www.tiktok.com/",
      label: "tiktok",
      icon: SiTiktok,
    },
  ];

  const socialPill = (
    <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950 px-2 py-1.5">
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors duration-200 hover:bg-neutral-900 hover:text-white"
        >
          <s.icon
            className="h-4 w-4"
            style={{ filter: "grayscale(100%) contrast(120%)" }}
          />
        </a>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40
                 flex flex-col items-center
                 pl-4 pr-4 py-3
                 ${headerShapeClass}
                 border border-neutral-800 bg-neutral-950
                 w-[calc(100%-2rem)] sm:w-auto
                 transition-[border-radius] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      <div className="flex items-center justify-between w-full gap-x-5 sm:gap-x-8">
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.avatar}
            alt={SITE.name}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border border-neutral-700 object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <span className="font-mono text-sm text-white">{SITE.name}</span>
        </a>

        <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {socialPill}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-neutral-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            className="sm:hidden flex flex-col items-center w-full overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col items-center space-y-4 text-base w-full pt-4">
              {navLinksData.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-300 hover:text-white transition-colors w-full text-center"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-4 w-full pb-2">
              {socialPill}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}