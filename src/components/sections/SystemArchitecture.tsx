"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { GridScan } from "@/components/effects/section-backgrounds";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { SectionHeader } from "@/components/shared/SectionHeader";

const ModelViewer = dynamic(
  () =>
    import("@/components/effects/ModelViewer").then((m) => m.ModelViewer),
  { ssr: false, loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-border bg-card/40">
      <p className="text-sm text-muted-foreground">Loading 3D model…</p>
    </div>
  ) }
);

const { nodes, description } = portfolioData.systemArchitecture;

export function SystemArchitecture() {
  return (
    <section id="architecture" className="relative px-6 py-28">
      <GridScan className="pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          label="Architecture"
          title="Interactive system model"
          description={description}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm"
          >
            <ModelViewer className="h-[420px] w-full sm:h-[480px]" />
            <div className="flex flex-wrap justify-center gap-4 border-t border-border px-6 py-4">
              {nodes.map((n) => (
                <div key={n.id} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: n.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {n.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Data flow
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Drag the 3D model to explore each layer. Data flows from client
                through the API layer to backend services, persists in the database,
                and deploys to production.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/30 p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Request lifecycle
              </p>
              <FlowDiagram
                steps={[
                  { label: "Client Request", description: "User action triggers API call" },
                  { label: "API Gateway", description: "Validation and routing" },
                  { label: "Backend Logic", description: "Business rules and orchestration" },
                  { label: "Database", description: "Persist and query data" },
                  { label: "Deploy", description: "Vercel edge delivery" },
                ]}
                direction="vertical"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
