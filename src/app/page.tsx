import { TerminalNavbar } from "@/components/ui/terminal-navbar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Footer } from "@/components/ui/footer-section";
import { GlowLine, SpecStrip } from "@/components/ui/spec-strip";
import { Hero } from "@/components/sections/hero";
import { Whoami } from "@/components/sections/whoami";
import { Projects } from "@/components/sections/projects";
import {
  LazyTechnologies,
  LazyStats,
  LazyBucket,
  LazyNetworking,
} from "@/components/sections/lazy-sections";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start overflow-x-clip bg-black text-white">
      <TerminalNavbar />
      <div className="w-full">
        <Hero />
        <TracingBeam>
          <GlowLine />
          <div className="py-10">
            <SpecStrip />
          </div>
          <Whoami />
          <GlowLine />
          <LazyTechnologies />
          <GlowLine />
          <Projects />
          <GlowLine />
          <div className="py-10">
            <SpecStrip />
          </div>
          <LazyStats />
          <GlowLine />
          <LazyBucket />
          <GlowLine />
          <div className="py-10">
            <SpecStrip />
          </div>
          <LazyNetworking />
          <GlowLine />
          <Footer />
        </TracingBeam>
      </div>
    </main>
  );
}