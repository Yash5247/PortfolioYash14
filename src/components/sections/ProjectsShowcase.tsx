"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const categoryLabels: Record<string, string> = {
  fullstack: "Full Stack",
  ai: "AI / ML",
  automation: "Automation",
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
          title="Selected Projects"
          description="Production systems built end-to-end — scroll to explore each project."
        />

        <div className="relative -mx-6 px-6">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-black/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-black/80 to-transparent" />

          <div className="projects-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {projects.map((project, index) => {
              const cs = project.caseStudy;

              return (
                <ScrollReveal
                  key={project.id}
                  delay={index * 0.08}
                  direction="right"
                  className="w-[min(340px,85vw)] shrink-0 snap-center"
                >
                  <article className="pro-card group flex h-full flex-col overflow-hidden rounded-xl">
                    <div className="border-b border-white/8 bg-white/[0.03] px-6 py-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70">
                          {categoryLabels[project.category] ?? project.category}
                        </span>
                        <span className="font-mono text-xs text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold leading-snug text-white">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-5">
                      <p className="text-sm leading-relaxed text-white/75">
                        {project.tagline}
                      </p>
                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/50">
                        {cs.problem}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.slice(0, 5).map((t) => {
                          const tech = getTechIcon(t);
                          return (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-white/70"
                            >
                              {tech && (
                                <Image
                                  src={tech.icon}
                                  alt=""
                                  width={12}
                                  height={12}
                                  className="h-3 w-3 opacity-80"
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
                            className="bg-white/10 hover:bg-white/15"
                            asChild
                          >
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-white/15" asChild>
                          <Link href={`/case-studies/${project.caseStudySlug}`}>
                            Case Study
                            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-white/35">
            Scroll horizontally to view all projects
          </p>
        </div>
      </div>
    </section>
  );
}
