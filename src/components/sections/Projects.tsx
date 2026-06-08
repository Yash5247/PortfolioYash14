"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Projects() {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Projects"
          title="Systems I've built"
          description="Production software with documented architecture, workflows, and engineering decisions. Each project has a full case study."
        />

        <div className="space-y-8">
          {portfolioData.projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-border transition-colors hover:border-foreground/15"
            >
              <div className="grid lg:grid-cols-2">
                <div className="border-b border-border p-8 lg:border-b-0 lg:border-r">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {project.category === "ai"
                      ? "AI System"
                      : project.category === "automation"
                        ? "Automation Platform"
                        : "Full Stack Platform"}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{project.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {isValidUrl(project.live) && (
                      <Button size="sm" asChild>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="pointer"
                        >
                          View Live
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" strokeWidth={1.5} />
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/case-studies/${project.caseStudySlug}`}
                        data-cursor="pointer"
                      >
                        <FileText className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                        Read Case Study
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/10 p-8">
                  <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Workflow
                  </p>
                  <FlowDiagram
                    steps={project.caseStudy.workflow.slice(0, 5)}
                    direction="vertical"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
