"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { SectionHeading } from "@/components/shared/SectionHeading";

const CARD_W = 380;
const CARD_H = 440;

const CardSwap = dynamic(
  () => import("@/components/components/CardSwapClient").then((m) => m.default),
  { ssr: false }
);
const Card = dynamic(
  () => import("@/components/components/CardSwapClient").then((m) => m.Card),
  { ssr: false }
);

const categoryLabels: Record<string, string> = {
  fullstack: "Full Stack",
  ai: "AI / ML",
  automation: "Automation",
};

const projectAccents: Record<string, string> = {
  "mrv-system": "#60a5fa",
  "ai-chatbot": "#c084fc",
  shortsos: "#7df9ff",
};

function getTechIcon(name: string) {
  const n = name.toLowerCase().replace(/\s+/g, "");
  const map: Record<string, string> = {
    react: "react",
    nextjs: "nextjs",
    nodejs: "nodejs",
    "node.js": "nodejs",
    javascript: "javascript",
    supabase: "supabase",
    openai: "openai",
    vercel: "vercel",
    python: "python",
  };
  const id = map[n];
  return techEcosystem.find((t) => t.id === id);
}

export function ProjectsShowcase() {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Portfolio"
          title="Projects"
          description="Production systems I've built — hover to pause the card rotation."
        />

        <div
          className="projects-card-swap relative mx-auto flex items-center justify-center overflow-hidden"
          style={{ width: CARD_W + 80, height: CARD_H + 100, maxWidth: "100%" }}
        >
          <CardSwap
            className="card-swap-centered"
            width={CARD_W}
            height={CARD_H}
            cardDistance={42}
            verticalDistance={48}
            delay={5000}
            pauseOnHover
            skewAmount={3}
            easing="linear"
          >
            {projects.map((project) => {
              const cs = project.caseStudy;
              const accent = projectAccents[project.id] ?? "#a78bfa";

              return (
                <Card
                  key={project.id}
                  className="project-swap-card !border-0 !bg-transparent p-0"
                >
                  <div className="readable-card flex h-full w-full flex-col overflow-hidden rounded-xl">
                    <div
                      className="shrink-0 px-5 py-4"
                      style={{
                        background: `linear-gradient(135deg, ${accent}40 0%, rgba(4,4,8,0.95) 65%)`,
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: accent }}
                      >
                        {categoryLabels[project.category] ?? project.category}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-white text-shadow-sm">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col px-5 py-4">
                      <p className="text-sm font-medium leading-relaxed text-white/90">
                        {project.tagline}
                      </p>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/75">
                        {cs.problem}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => {
                          const tech = getTechIcon(t);
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/90"
                            >
                              {tech && (
                                <Image
                                  src={tech.icon}
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="h-3 w-3"
                                  unoptimized
                                />
                              )}
                              {t}
                            </span>
                          );
                        })}
                      </div>

                      <div className="mt-auto space-y-3 pt-4">
                        {isValidUrl(project.live) && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                            style={{
                              borderColor: `${accent}80`,
                              background: `linear-gradient(135deg, ${accent}55 0%, rgba(4,4,8,0.9) 100%)`,
                              boxShadow: `0 0 20px ${accent}30`,
                            }}
                          >
                            <span className="truncate">
                              Visit Live Site
                            </span>
                            <ArrowUpRight
                              className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              style={{ color: accent }}
                            />
                          </a>
                        )}
                        <Link
                          href={`/case-studies/${project.caseStudySlug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          Read case study
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
