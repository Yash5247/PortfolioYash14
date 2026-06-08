"use client";

import Image from "next/image";
import { Download, ArrowUpRight } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Footer } from "@/components/layout/Footer";
import { Typewriter } from "@/components/shared/Typewriter";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { HYPERSPEED_OPTIONS } from "@/lib/hyperspeed-options";
import Hyperspeed from "@/components/effects/HyperspeedClient";
import LogoLoop from "@/components/effects/LogoLoopClient";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { ExperienceCards } from "@/components/sections/ExperienceCards";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Contact } from "@/components/sections/Contact";
import { LanyardSection } from "@/components/sections/LanyardSection";

const { personal, resume, socials } = portfolioData;

const heroLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", title: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", title: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", title: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", title: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", alt: "Supabase", title: "Supabase" },
  { src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", alt: "OpenAI", title: "OpenAI" },
];

export function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="h-full w-full">
          <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </div>

      <div className="pointer-events-auto relative z-10">
        <SiteNavbar />

        <main>
          {/* Hero */}
          <section
            id="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">
              Hello, It&apos;s me
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
              {personal.name}
            </h1>
            <p className="mt-6 text-xl sm:text-2xl">
              I&apos;m a{" "}
              <Typewriter
                phrases={personal.typewriterPhrases}
                className="text-violet-300"
              />
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60">
              {personal.summary}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Hire Me</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href={resume.downloadUrl} download>
                  <Download className="mr-1.5 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="relative mt-16 h-48 w-48 overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl shadow-violet-500/20 sm:h-56 sm:w-56">
              <Image src="/profile.png" alt={personal.name} fill className="object-cover" priority />
            </div>

            <p className="mt-6 text-sm text-white/40">
              Hold click on the road to speed up the hyperspeed effect
            </p>

            <div className="mt-12 w-full max-w-5xl">
              <LogoLoop
                logos={heroLogos}
                speed={60}
                direction="left"
                logoHeight={36}
                gap={40}
                hoverSpeed={0}
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technologies"
              />
            </div>
          </section>

          {/* About */}
          <section id="about" className="relative py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl font-bold">About me</h2>
                <p className="mt-6 leading-relaxed text-white/70">{personal.summary}</p>
                <div className="mt-8 space-y-3 text-sm text-white/60">
                  <p>{personal.email}</p>
                  <p>{personal.phone}</p>
                  <p>{personal.location}</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <p className="mt-2 text-white/70">B.Tech Computer Science & Engineering</p>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/10">
                <Image src="/profile.png" alt={personal.name} fill className="object-cover" />
              </div>
            </div>
          </section>

          <SkillsMarquee />
          <ExperienceCards />
          <ProjectsShowcase />

          <section className="relative py-12 text-center">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/60 transition-colors hover:text-white"
            >
              View GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </section>

          <Contact />
          <LanyardSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
