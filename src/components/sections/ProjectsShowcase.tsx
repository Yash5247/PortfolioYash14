"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

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
              const accent = projectAccents[project.id] ?? "#a78bfa";

              return (
                <Card
                  key={project.id}
                  className="project-swap-card overflow-hidden !border-0 !bg-transparent p-0"
                  style={{ width: 400, height: 460 }}
                >
                  <div className="readable-card flex h-[460px] w-[400px] flex-col overflow-hidden rounded-xl">
                    <div
                      className="shrink-0 px-6 py-5"
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
                      <h3 className="mt-2 text-xl font-bold leading-snug text-white text-shadow-sm">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-5">
                      <p className="text-sm font-medium leading-relaxed text-white/90">
                        {project.tagline}
                      </p>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/75">
                        {cs.problem}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => {
                          const tech = getTechIcon(t);
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2 py-1 text-[11px] font-medium text-white/90"
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
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/15 text-white hover:bg-white/25"
                            asChild
                          >
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
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                          asChild
                        >
                          <Link href={`/case-studies/${project.caseStudySlug}`}>
                            Case Study
                          </Link>
                        </Button>
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
