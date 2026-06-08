"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Cpu,
  Layout,
  ChevronDown,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { TimelineGlow } from "@/components/effects/section-backgrounds";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";

const experience = portfolioData.experience;

const companyMeta: Record<
  string,
  {
    icon: LucideIcon;
    narrative: string;
    lessons: string[];
    architecture: { name: string; description: string }[];
  }
> = {
  pramana15: {
    icon: Building2,
    narrative:
      "As co-founder, I own the full technical stack — from database schemas and REST APIs to AI integrations and production deployments across multiple live products.",
    lessons: [
      "Small teams ship faster when architecture decisions are made upfront.",
      "AI products need extraction logic separated from generation logic.",
      "Reusable API patterns across products reduce iteration cost.",
    ],
    architecture: [
      { name: "React Frontends", description: "Dashboards and user-facing apps" },
      { name: "Node.js APIs", description: "REST orchestration and automation" },
      { name: "Supabase", description: "Auth, storage, and structured data" },
      { name: "OpenAI Layer", description: "LLM integration for automation" },
    ],
  },
  "tata-power": {
    icon: Cpu,
    narrative:
      "Worked in the operational data domain — processing field records, identifying transformer faults, and mapping consumer impact through validation-heavy backend workflows.",
    lessons: [
      "Operational data requires validation before any downstream processing.",
      "Inconsistent field formats need normalization pipelines.",
      "Fault identification logic must account for edge cases in real records.",
    ],
    architecture: [
      { name: "Data Ingestion", description: "Field record intake and parsing" },
      { name: "Validation Engine", description: "Format checks and business rules" },
      { name: "Fault Analysis", description: "Transformer fault identification" },
      { name: "Consumer Mapping", description: "Impact analysis on end users" },
    ],
  },
  oshvik: {
    icon: Layout,
    narrative:
      "Focused on frontend engineering — building reusable component systems, responsive layouts, and performance-optimized interfaces for client production sites.",
    lessons: [
      "Component libraries reduce duplication across client projects.",
      "Responsive architecture decisions affect long-term maintainability.",
      "Performance optimization is a feature, not an afterthought.",
    ],
    architecture: [
      { name: "Component System", description: "Reusable UI building blocks" },
      { name: "Layout Engine", description: "Responsive grid and breakpoint logic" },
      { name: "Asset Pipeline", description: "Optimized images and lazy loading" },
      { name: "Cross-browser QA", description: "Compatibility validation workflows" },
    ],
  },
};

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(
    experience[0].id
  );
  const activeIndex = experience.findIndex((e) => e.id === expandedId);

  return (
    <section id="experience" className="relative px-6 py-28">
      <TimelineGlow
        activeIndex={activeIndex >= 0 ? activeIndex : 0}
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeader
          label="Work"
          title="Experience timeline"
          description="Each company expands into a case study — responsibilities, systems built, architecture, and lessons learned."
        />

        <div className="relative mt-16">
          <div
            className="absolute bottom-0 left-[1.65rem] top-0 w-px bg-border"
            aria-hidden
          />

          <div className="space-y-4">
            {experience.map((exp, index) => {
              const isOpen = expandedId === exp.id;
              const meta = companyMeta[exp.id];

              return (
                <div key={exp.id} className="relative pl-14">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isOpen ? null : exp.id)
                    }
                    className={`absolute left-0 top-5 flex h-[3.3rem] w-[3.3rem] items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-500 ${
                      isOpen
                        ? "border-violet-400 bg-violet-500/20 text-foreground shadow-lg shadow-violet-500/20"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>

                  <motion.article
                    layout
                    className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                      isOpen
                        ? "border-violet-500/25 bg-card/70 shadow-xl shadow-violet-500/5"
                        : "border-border bg-card/40 hover:border-foreground/15"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isOpen ? null : exp.id)
                      }
                      className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8"
                    >
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {exp.period}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
                          {exp.role}
                        </h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                        {!isOpen && (
                          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground/80">
                            {exp.summary}
                          </p>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="mt-2 shrink-0 rounded-full border border-border p-2"
                      >
                        <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border px-6 pb-8 sm:px-8">
                            <p className="pt-6 text-sm leading-relaxed text-muted-foreground">
                              {meta.narrative}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {exp.techStack.map((t) => (
                                <Badge key={t} variant="outline" className="text-xs">
                                  {t}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                              <StoryBlock
                                title="Responsibilities"
                                items={exp.responsibilities}
                              />
                              <StoryBlock
                                title="Challenges"
                                items={exp.challenges}
                              />
                              <StoryBlock title="Impact" items={exp.impact} />
                              <div>
                                <p className="mb-4 font-semibold">Systems Built</p>
                                <div className="space-y-3">
                                  {exp.systemsBuilt.map((sys) => (
                                    <div
                                      key={sys.name}
                                      className="rounded-xl border border-border p-4"
                                    >
                                      <p className="font-medium">{sys.name}</p>
                                      <p className="mt-1.5 text-sm text-muted-foreground">
                                        {sys.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                              <div>
                                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                  Architecture
                                </p>
                                <ArchitectureDiagram layers={meta.architecture} />
                              </div>
                              <div>
                                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                  Process flow
                                </p>
                                <FlowDiagram
                                  steps={exp.processFlow}
                                  direction="vertical"
                                />
                              </div>
                            </div>

                            <div className="mt-8 rounded-xl border border-border bg-muted/20 p-5">
                              <div className="mb-3 flex items-center gap-2">
                                <BookOpen
                                  className="h-4 w-4 text-muted-foreground"
                                  strokeWidth={1.5}
                                />
                                <p className="font-semibold">Lessons Learned</p>
                              </div>
                              <ul className="space-y-2">
                                {meta.lessons.map((l) => (
                                  <li
                                    key={l}
                                    className="flex gap-2 text-sm text-muted-foreground"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                                    {l}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-4 font-semibold">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
