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
    <section id="projects" className="relative min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Production systems I&apos;ve built — hover to pause rotation, click a
            card for details.
          </p>
        </div>

        <div className="projects-card-swap relative mx-auto min-h-[620px] max-w-4xl">
          <CardSwap
            width={420}
            height={480}
            cardDistance={55}
            verticalDistance={65}
            delay={5000}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
          >
            {projects.map((project) => {
              const cs = project.caseStudy;
              return (
                <Card
                  key={project.id}
                  className="flex flex-col overflow-hidden p-0"
                  style={{ width: 420, height: 480 }}
                >
                  <div className="relative h-36 bg-gradient-to-br from-violet-900/40 to-black p-6">
                    <p className="text-xs uppercase tracking-widest text-violet-300">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-white/70">{project.tagline}</p>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-white/50">
                      {cs.problem}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 4).map((t) => {
                        const tech = getTechIcon(t);
                        return (
                          <span
                            key={t}
                            className="flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/80"
                          >
                            {tech && (
                              <Image
                                src={tech.icon}
                                alt=""
                                width={12}
                                height={12}
                                className="h-3 w-3 dark:invert"
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
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
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
                </Card>
              );
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
