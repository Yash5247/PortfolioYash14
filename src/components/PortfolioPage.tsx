"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { Footer } from "@/components/layout/Footer";
import { Typewriter } from "@/components/shared/Typewriter";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
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

const { personal, resume } = portfolioData;

export function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="h-full w-full">
          <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/72" />
      </div>

      <div className="pointer-events-auto relative z-10">
        <SiteNavbar />

        <main>
          {/* Hero */}
          <section
            id="hero"
            className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 pt-24 text-center"
          >
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Hello, It&apos;s me
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-shadow-sm sm:text-6xl md:text-7xl">
                {personal.name}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 text-lg sm:text-xl">
                <span className="font-medium text-white/90">I&apos;m a</span>
                <Typewriter
                  phrases={personal.typewriterPhrases}
                  className="inline-block min-w-[14ch] text-left font-semibold text-white"
                />
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {personal.summary}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-transparent text-white hover:bg-white/5"
                  asChild
                >
                  <a href="#projects">View Projects</a>
                </Button>
                <Button size="lg" variant="ghost" className="text-white/70" asChild>
                  <a href={resume.downloadUrl} download>
                    <Download className="mr-1.5 h-4 w-4" />
                    Resume
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </section>

          {/* Tech marquee above About */}
          <section className="relative py-8">
            <ScrollReveal>
              <div className="mx-auto max-w-5xl px-6">
                <div className="readable-card rounded-xl py-5">
                  <LogoLoop
                    logos={techMarqueeLogos}
                    speed={50}
                    direction="left"
                    logoHeight={32}
                    gap={40}
                    hoverSpeed={0}
                    fadeOut
                    fadeOutColor="rgba(8,8,10,0.98)"
                    ariaLabel="Technologies"
                  />
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* About */}
          <section id="about" className="relative py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
              <ScrollReveal>
                <div className="readable-card rounded-xl p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                    About
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-white text-shadow-sm">About me</h2>
                  <p className="mt-6 leading-relaxed text-white/85">{personal.summary}</p>
                  <div className="mt-8 space-y-2.5 text-sm font-medium text-white/80">
                    <p>{personal.email}</p>
                    <p>{personal.phone}</p>
                    <p>{personal.location}</p>
                  </div>
                  <div className="mt-8 border-t border-white/12 pt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/65">
                      Education
                    </h3>
                    <p className="mt-2 text-white/85">
                      B.Tech Computer Science & Engineering — SKIT Jaipur
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12} direction="right">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-white/10">
                  <Image src="/profile.png" alt={personal.name} fill className="object-cover" />
                </div>
              </ScrollReveal>
            </div>
          </section>

          <SkillsMarquee />
          <ExperienceCards />
          <ProjectsShowcase />
          <Contact />
          <LanyardSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
