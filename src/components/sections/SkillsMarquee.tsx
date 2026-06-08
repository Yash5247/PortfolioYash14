"use client";

import LogoLoop from "@/components/effects/LogoLoopClient";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { portfolioData } from "@/data/portfolio";

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
].map((id) => {
  const tech = techEcosystem.find((t) => t.id === id);
  return tech
    ? { src: tech.icon, alt: tech.name, title: tech.name }
    : null;
}).filter(Boolean) as { src: string; alt: string; title: string }[];

export function SkillsMarquee() {
  return (
    <section id="skills" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          Tech Stack
        </h2>
        <p className="mb-10 text-center text-3xl font-semibold tracking-tight text-white">
          What I Know
        </p>
        <div className="relative h-[88px] overflow-hidden">
          <LogoLoop
            logos={logoItems}
            speed={80}
            direction="left"
            logoHeight={44}
            gap={48}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology stack"
          />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(portfolioData.tools).map(([category, items]) => (
            <div key={category} className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-white">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
