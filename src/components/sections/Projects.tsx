"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "AI", value: "ai" },
];

export function Projects() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Work"
          title="Featured Projects"
          description="A selection of projects showcasing full-stack development, AI integration, and system design."
        />

        <div className="mb-8 flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                filter === f.value
                  ? "bg-foreground text-background"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
              data-cursor="pointer"
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:shadow-xl",
                i === 0 && filtered.length >= 3 && "md:col-span-2 md:row-span-2"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-50",
                  project.gradient
                )}
              />
              <div className="relative flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-muted/80 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {isValidUrl(project.live) && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {isValidUrl(project.github) && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                      >
                        <GitHubIcon className="mr-1 h-3 w-3" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={`/case-studies/${project.caseStudySlug}`}
                      data-cursor="pointer"
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Case Study
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
