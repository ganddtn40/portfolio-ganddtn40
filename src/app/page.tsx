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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans text-white">
      <TerminalNavbar />
      <main className="flex-1">
        <Hero />
        <TracingBeam>
          <Whoami />
          <LazyTechnologies />
          <Projects />
          <LazyStats />
          <LazyBucket />
          <LazyNetworking />
          <Footer />
        </TracingBeam>
      </main>
    </div>
  );
}