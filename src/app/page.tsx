import { TerminalNavbar } from "@/components/ui/terminal-navbar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Footer } from "@/components/ui/footer-section";
import { Hero } from "@/components/sections/hero";
import { Whoami } from "@/components/sections/whoami";
import { Projects } from "@/components/sections/projects";
import {
  LazyTechnologies,
  LazyStats,
  LazyBucket,
  LazyNetworking,
} from "@/components/sections/lazy-sections";

function GlowLine() {
  return (
    <div className="relative mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-clip bg-black text-white">
      <TerminalNavbar />
      <div className="w-full">
        <Hero />
        <TracingBeam>
          <GlowLine />
          <Whoami />
          <GlowLine />
          <LazyTechnologies />
          <GlowLine />
          <Projects />
          <GlowLine />
          <LazyStats />
          <GlowLine />
          <LazyBucket />
          <GlowLine />
          <LazyNetworking />
          <GlowLine />
          <Footer />
        </TracingBeam>
      </div>
    </main>
  );
}