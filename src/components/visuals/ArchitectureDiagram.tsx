"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { ArchitectureLayer } from "@/data/portfolio";

interface ArchitectureDiagramProps {
  layers: ArchitectureLayer[];
}

export function ArchitectureDiagram({ layers }: ArchitectureDiagramProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {layers.map((layer, i) => (
        <div key={layer.name} className="flex w-full max-w-lg flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-full rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-foreground/15"
          >
            <p className="text-sm font-semibold">{layer.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {layer.description}
            </p>
          </motion.div>
          {i < layers.length - 1 && (
            <ArrowDown
              className="my-2 h-4 w-4 text-muted-foreground/40"
              strokeWidth={1.5}
            />
          )}
        </div>
      ))}
    </div>
  );
}
