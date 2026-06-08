"use client";

import LogoLoop from "@/components/effects/LogoLoopClient";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { portfolioData } from "@/data/portfolio";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const logoItems = [
  "react",
  "nextjs",
  "javascript",
  "typescript",
  "nodejs",
  "express",
  "supabase",
  "openai",
  "docker",
  "git",
  "github",
  "vercel",
  "linux",
  "sql",
  "python",
  "tailwind",
]
  .map((id) => {
    const tech = techEcosystem.find((t) => t.id === id);
    return tech ? { src: tech.icon, alt: tech.name, title: tech.name } : null;
  })
  .filter(Boolean) as { src: string; alt: string; title: string }[];

export function SkillsMarquee() {
  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Expertise"
          title="Skills & Technologies"
          description="Tools and frameworks I use to build production software."
        />

        <ScrollReveal>
          <div className="readable-card relative overflow-hidden rounded-xl py-5">
            <LogoLoop
              logos={logoItems}
              speed={45}
              direction="left"
              logoHeight={36}
              gap={44}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="rgba(8,8,10,0.98)"
              ariaLabel="Technology stack"
            />
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(portfolioData.tools).map(([category, items], index) => (
            <ScrollReveal key={category} delay={index * 0.06}>
              <div className="readable-card rounded-xl p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/75">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
