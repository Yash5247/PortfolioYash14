"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SystemNetworkGraph } from "@/components/effects/SystemNetworkGraph";

const { nodes, description } = portfolioData.systemArchitecture;

export function SystemArchitecture() {
  return (
    <section id="architecture" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Architecture"
          title="How systems connect"
          description={description}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-border bg-muted/10"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60" />
          <SystemNetworkGraph
            className="h-[420px] w-full sm:h-[480px]"
            interactive
          />

          <div className="border-t border-border bg-background/80 px-6 py-5 backdrop-blur-sm">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground/70">
              Animated data flow between layers — the architecture behind every
              product I build
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
