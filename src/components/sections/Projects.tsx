"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Target,
  Lightbulb,
  TrendingUp,
  X,
  ExternalLink,
} from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { techEcosystem } from "@/lib/tech-ecosystem";
import { DataFlowBg } from "@/components/effects/section-backgrounds";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/icons/brand-icons";

const CardSwap = dynamic(() => import("@/components/effects/CardSwap"), {
  ssr: false,
});

function getTechIcon(techName: string) {
  const normalized = techName.toLowerCase().replace(/\s+/g, "");
  const map: Record<string, string> = {
    react: "react",
    nextjs: "nextjs",
    "next.js": "nextjs",
    nodejs: "nodejs",
    "node.js": "nodejs",
    javascript: "javascript",
    supabase: "supabase",
    openai: "openai",
    "openaiapi": "openai",
    vercel: "vercel",
    python: "python",
    sql: "sql",
    tailwindcss: "tailwind",
    "tailwind css": "tailwind",
    express: "express",
    "express.js": "express",
  };
  const id = map[normalized] ?? map[techName.toLowerCase()];
  return techEcosystem.find((t) => t.id === id);
}

export function Projects() {
  const projects = portfolioData.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const active = projects[activeIndex];

  return (
    <section
      id="projects"
      className="relative min-h-[140vh] overflow-hidden px-6 py-32"
    >
      <DataFlowBg className="pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/85 to-background" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Projects"
          title="Production systems I've shipped"
          description="The largest section on this portfolio — because recruiters spend the most time here. Rotate through products, then expand any card into a full case study."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <CardSwap
              height={520}
              delay={5000}
              onActiveChange={(i) => {
                setActiveIndex(i);
                setExpanded(false);
              }}
              className="mx-auto"
            >
              {projects.map((project) => {
                const cs = project.caseStudy;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/80 text-left shadow-2xl backdrop-blur-xl transition-colors hover:border-violet-500/30"
                  >
                    <div className="relative h-44 overflow-hidden border-b border-border bg-muted/30 sm:h-52">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <FlowDiagram
                          steps={cs.workflow.slice(0, 4)}
                          direction="horizontal"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-violet-400">
                        {project.category === "ai"
                          ? "AI System"
                          : project.category === "automation"
                            ? "Automation"
                            : "Full Stack"}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        {project.tagline}
                      </p>
                      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
                        {cs.problem}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-2 pt-6">
                        {project.tech.slice(0, 5).map((t) => {
                          const tech = getTechIcon(t);
                          return (
                            <div
                              key={t}
                              className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1"
                            >
                              {tech && (
                                <Image
                                  src={tech.icon}
                                  alt={t}
                                  width={14}
                                  height={14}
                                  className="h-3.5 w-3.5 dark:invert"
                                  unoptimized
                                />
                              )}
                              <span className="text-[10px]">{t}</span>
                            </div>
                          );
                        })}
                      </div>

                      <p className="mt-4 text-xs text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Click to expand full case study →
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardSwap>

            <div className="mt-6 flex justify-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setExpanded(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-violet-400"
                      : "w-3 bg-muted-foreground/30"
                  }`}
                  aria-label={`Show ${p.title}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Active project
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{active.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {active.caseStudy.solution}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {active.caseStudy.results.map((r, i) => (
                  <div
                    key={r}
                    className="rounded-xl border border-border bg-muted/20 p-3"
                  >
                    <p className="font-mono text-lg font-semibold text-violet-400">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                      {r}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {isValidUrl(active.live) && (
                  <Button size="sm" asChild>
                    <a
                      href={active.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                    </a>
                  </Button>
                )}
                {isValidUrl(active.github) && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon className="mr-1.5 h-3.5 w-3.5" />
                      GitHub
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpanded(true)}
                >
                  Expand Case Study
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/30 p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Architecture preview
              </p>
              <ArchitectureDiagram
                layers={active.caseStudy.architecture.slice(0, 3)}
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end justify-center bg-black/70 p-4 backdrop-blur-md sm:items-center sm:p-8"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-background shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-6 py-4 backdrop-blur-xl sm:px-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-violet-400">
                    Case Study
                  </p>
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-full border border-border p-2"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-2">
                <div className="space-y-8">
                  <CaseBlock
                    icon={Target}
                    title="Problem"
                    text={active.caseStudy.problem}
                  />
                  <CaseBlock
                    icon={Lightbulb}
                    title="Solution"
                    text={active.caseStudy.solution}
                  />
                  <CaseBlock
                    icon={TrendingUp}
                    title="Results"
                    list={active.caseStudy.results}
                  />
                </div>
                <div className="space-y-8">
                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      System architecture
                    </p>
                    <ArchitectureDiagram
                      layers={active.caseStudy.architecture}
                    />
                  </div>
                  <div>
                    <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      Data workflow
                    </p>
                    <FlowDiagram
                      steps={active.caseStudy.workflow}
                      direction="vertical"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border px-6 py-6 sm:px-8">
                {active.tech.map((t) => {
                  const tech = getTechIcon(t);
                  return (
                    <div
                      key={t}
                      className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5"
                    >
                      {tech && (
                        <Image
                          src={tech.icon}
                          alt={t}
                          width={16}
                          height={16}
                          className="h-4 w-4 dark:invert"
                          unoptimized
                        />
                      )}
                      <span className="text-xs">{t}</span>
                    </div>
                  );
                })}
                <div className="ml-auto flex gap-2">
                  {isValidUrl(active.live) && (
                    <Button size="sm" asChild>
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/case-studies/${active.caseStudySlug}`}>
                      <FileText className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                      Full Case Study
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CaseBlock({
  icon: Icon,
  title,
  text,
  list,
}: {
  icon: typeof Target;
  title: string;
  text?: string;
  list?: string[];
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      {text && (
        <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
      )}
      {list && (
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
