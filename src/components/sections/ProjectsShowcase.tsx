"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { Button } from "@/components/ui/button";

const CardSwap = dynamic(
  () => import("@/components/components/CardSwapClient").then((m) => m.default),
  { ssr: false }
);
const Card = dynamic(
  () => import("@/components/components/CardSwapClient").then((m) => m.Card),
  { ssr: false }
);
const ElectricBorder = dynamic(
  () => import("@/components/effects/ElectricBorderClient"),
  { ssr: false }
);

const projectColors: Record<string, string> = {
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
    "openaiapi": "openai",
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
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Production systems I&apos;ve built — hover to pause rotation.
          </p>
        </div>

        <div className="projects-card-swap relative mx-auto flex min-h-[560px] w-full max-w-lg items-center justify-center">
          <CardSwap
            width={400}
            height={460}
            cardDistance={50}
            verticalDistance={55}
            delay={5000}
            pauseOnHover
            skewAmount={4}
            easing="elastic"
          >
            {projects.map((project) => {
              const cs = project.caseStudy;
              const accent = projectColors[project.id] ?? "#7df9ff";

              return (
                <Card
                  key={project.id}
                  className="project-swap-card overflow-hidden !border-0 !bg-transparent p-0"
                  style={{ width: 400, height: 460 }}
                >
                  <ElectricBorder
                    color={accent}
                    speed={1}
                    chaos={0.08}
                    borderRadius={16}
                    style={{ borderRadius: 16, width: "100%", height: "100%" }}
                  >
                    <div className="glass-panel flex h-[460px] w-[400px] flex-col overflow-hidden">
                      <div
                        className="shrink-0 p-6"
                        style={{
                          background: `linear-gradient(135deg, ${accent}33 0%, rgba(0,0,0,0.85) 70%)`,
                        }}
                      >
                        <p
                          className="text-xs font-semibold uppercase tracking-widest"
                          style={{ color: accent }}
                        >
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-xl font-bold leading-snug text-white">
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-sm text-white/80">{project.tagline}</p>
                        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/60">
                          {cs.problem}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((t) => {
                            const tech = getTechIcon(t);
                            return (
                              <span
                                key={t}
                                className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/85"
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
                        <div className="mt-auto flex gap-2 pt-6">
                          {isValidUrl(project.live) && (
                            <Button size="sm" variant="secondary" asChild>
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Live
                                <ArrowUpRight className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/case-studies/${project.caseStudySlug}`}>
                              Case Study
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ElectricBorder>
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
