"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PlexusField } from "@/components/effects/PlexusField";

const FluidGlass = dynamic(() => import("@/components/effects/FluidGlass"), {
  ssr: false,
});

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
          className="relative overflow-hidden rounded-2xl border border-border bg-violet-950/20"
        >
          <FluidGlass
            className="h-[480px] w-full"
            mode="cube"
            cubeProps={{
              scale: 0.18,
              ior: 1.2,
              thickness: 3,
              chromaticAberration: 0.12,
              transmission: 1,
              roughness: 0,
            }}
          >
            <PlexusField />
          </FluidGlass>

          <div className="border-t border-border bg-background/90 px-6 py-5 backdrop-blur-md">
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
              Drag the glass cube · Data flows through the plexus network behind
              it
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
