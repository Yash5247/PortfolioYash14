"use client";

import Image from "next/image";
import { Download, ArrowUpRight } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Footer } from "@/components/layout/Footer";
import { Typewriter } from "@/components/shared/Typewriter";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio";
import { HYPERSPEED_OPTIONS } from "@/lib/hyperspeed-options";
import { techMarqueeLogos } from "@/lib/tech-marquee-logos";
import Hyperspeed from "@/components/effects/HyperspeedClient";
import LogoLoop from "@/components/effects/LogoLoopClient";
import { SkillsMarquee } from "@/components/sections/SkillsMarquee";
import { ExperienceCards } from "@/components/sections/ExperienceCards";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Contact } from "@/components/sections/Contact";
import { LanyardSection } from "@/components/sections/LanyardSection";

const { personal, resume, socials } = portfolioData;

export function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="h-full w-full">
          <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
      </div>

      <div className="pointer-events-auto relative z-10">
        <SiteNavbar />

        <main>
          {/* Hero */}
          <section
            id="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-white/60 drop-shadow-md">
              Hello, It&apos;s me
            </p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight drop-shadow-lg sm:text-7xl md:text-8xl">
              {personal.name}
            </h1>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-xl sm:text-2xl">
              <span className="text-white/90">I&apos;m a</span>
              <Typewriter
                phrases={personal.typewriterPhrases}
                className="inline-block min-w-[14ch] text-left font-semibold text-violet-300"
              />
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 drop-shadow">
              {personal.summary}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Hire Me</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-black/30 backdrop-blur-sm" asChild>
                <a href="#projects">View My Work</a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href={resume.downloadUrl} download>
                  <Download className="mr-1.5 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="relative mt-16 h-48 w-48 overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl shadow-violet-500/30 sm:h-56 sm:w-56">
              <Image src="/profile.png" alt={personal.name} fill className="object-cover" priority />
            </div>

            <p className="mt-6 text-sm text-white/50">
              Hold click on the road to speed up the hyperspeed effect
            </p>
          </section>

          {/* Tech marquee above About */}
          <section className="relative py-10">
            <div className="mx-auto max-w-5xl px-6">
              <div className="glass-panel rounded-2xl py-6">
                <LogoLoop
                  logos={techMarqueeLogos}
                  speed={70}
                  direction="left"
                  logoHeight={40}
                  gap={44}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="rgba(8,8,12,0.95)"
                  ariaLabel="Technologies"
                />
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="relative py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
              <div className="glass-panel rounded-3xl p-8 lg:p-10">
                <h2 className="text-4xl font-bold text-white">About me</h2>
                <p className="mt-6 leading-relaxed text-white/80">{personal.summary}</p>
                <div className="mt-8 space-y-3 text-sm text-white/70">
                  <p>{personal.email}</p>
                  <p>{personal.phone}</p>
                  <p>{personal.location}</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white">Education</h3>
                  <p className="mt-2 text-white/75">
                    B.Tech Computer Science & Engineering — SKIT Jaipur
                  </p>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
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
              className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
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
