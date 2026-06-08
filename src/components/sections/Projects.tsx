"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Layers } from "lucide-react";
import { portfolioData, isValidUrl } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SwapCard } from "@/components/effects/CardSwap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CardSwap = dynamic(() => import("@/components/effects/CardSwap"), {
  ssr: false,
});

function ProjectCardContent({
  project,
}: {
  project: (typeof portfolioData.projects)[0];
}) {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-violet-400">
        <Layers className="h-3.5 w-3.5" strokeWidth={1.5} />
        {project.category === "ai"
          ? "AI System"
          : project.category === "automation"
            ? "Automation"
            : "Full Stack"}
      </div>

      <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-400">{project.tagline}</p>
      <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-500">
        {project.caseStudy.overview.slice(0, 160)}…
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="border-zinc-700 text-[10px] text-zinc-400"
          >
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {isValidUrl(project.live) && (
          <Button size="sm" className="h-8 text-xs" asChild>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Live
              <ArrowUpRight className="ml-1 h-3 w-3" strokeWidth={1.5} />
            </a>
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-zinc-700 text-xs"
          asChild
        >
          <Link
            href={`/case-studies/${project.caseStudySlug}`}
            onClick={(e) => e.stopPropagation()}
          >
            <FileText className="mr-1 h-3 w-3" strokeWidth={1.5} />
            Case Study
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          label="Projects"
          title="Systems I've built"
          description="Hover to pause · Click cards to explore. Each project ships to production with full case study documentation."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {portfolioData.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border p-5 transition-colors hover:border-foreground/15"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  0{i + 1} — {project.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.caseStudy.problem.slice(0, 140)}…
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.caseStudy.results.slice(0, 2).map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {r.slice(0, 50)}…
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex min-h-[420px] items-center justify-center"
          >
            <CardSwap
              width={400}
              height={360}
              cardDistance={55}
              verticalDistance={65}
              delay={4500}
              pauseOnHover
            >
              {portfolioData.projects.map((project) => (
                <SwapCard key={project.id}>
                  <ProjectCardContent project={project} />
                </SwapCard>
              ))}
            </CardSwap>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
