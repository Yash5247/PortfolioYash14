"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Wrench,
  Layers,
  TrendingUp,
  Box,
  type LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ExperienceTimeline } from "@/components/visuals/ExperienceTimeline";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { Badge } from "@/components/ui/badge";

const experience = portfolioData.experience;

const ExperienceCube = dynamic(
  () =>
    import("@/components/effects/ExperienceCube").then((m) => m.ExperienceCube),
  { ssr: false }
);

export function Experience() {
  const [activeId, setActiveId] = useState(experience[0].id);
  const active = experience.find((e) => e.id === activeId) ?? experience[0];
  const activeIndex = experience.findIndex((e) => e.id === activeId);

  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Work"
          title="Experience"
          description="Detailed breakdown of roles, systems built, and engineering decisions — not bullet-point summaries."
        />

        <div className="mb-12 flex justify-center">
          <ExperienceCube
            experiences={experience}
            activeIndex={activeIndex}
            className="h-[280px] w-full max-w-md"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[300px_1fr]">
          <ExperienceTimeline
            items={experience}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div>
                <p className="text-sm text-muted-foreground">{active.period}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                  {active.role}
                </h3>
                <p className="mt-1 text-lg text-muted-foreground">
                  {active.company}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {active.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <DetailBlock
                icon={Target}
                title="Challenges"
                items={active.challenges}
              />
              <DetailBlock
                icon={Wrench}
                title="Responsibilities"
                items={active.responsibilities}
              />

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Box className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <h4 className="font-semibold">Systems Built</h4>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {active.systemsBuilt.map((system) => (
                    <div
                      key={system.name}
                      className="rounded-xl border border-border p-4"
                    >
                      <p className="text-sm font-medium">{system.name}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {system.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <DetailBlock
                icon={TrendingUp}
                title="Impact"
                items={active.impact}
              />

              <div>
                <div className="mb-6 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <h4 className="font-semibold">Process Flow</h4>
                </div>
                <FlowDiagram
                  steps={active.processFlow}
                  direction={active.id === "oshvik" ? "horizontal" : "vertical"}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
