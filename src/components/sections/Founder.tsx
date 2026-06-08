"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Lightbulb,
  Rocket,
  Target,
  type LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";

const founder = portfolioData.founder;

export function Founder() {
  return (
    <section id="founder" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Founder"
          title={founder.headline}
          description={founder.origin}
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <Block
              icon={Target}
              title="Problems Being Solved"
              items={founder.problems}
            />
            <Block
              icon={Lightbulb}
              title="Technical Challenges"
              items={founder.technicalChallenges}
            />
            <Block icon={Rocket} title="Growth Journey" items={founder.growth} />
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 font-semibold">Products Built</h3>
              <div className="space-y-3">
                {founder.products.map((product, i) => (
                  <motion.a
                    key={product.name}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group block rounded-xl border border-border p-5 transition-colors hover:border-foreground/15"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium">{product.name}</p>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <h3 className="font-semibold">Future Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {founder.vision}
              </p>
              <a
                href={portfolioData.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-muted-foreground"
              >
                Visit Pramana15
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Journey Timeline
          </h3>
          <FlowDiagram steps={founder.milestones} direction="horizontal" />
        </div>
      </div>
    </section>
  );
}

function Block({
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
        <h3 className="font-semibold">{title}</h3>
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
