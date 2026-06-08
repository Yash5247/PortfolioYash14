"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import type { FlowStep } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function FlowDiagram({
  steps,
  direction = "horizontal",
  className,
}: FlowDiagramProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "flex gap-2",
        isHorizontal
          ? "flex-wrap items-center justify-center"
          : "flex-col items-stretch",
        className
      )}
    >
      {steps.map((step, i) => (
        <div
          key={step.label}
          className={cn(
            "flex items-center",
            isHorizontal ? "flex-row" : "flex-col"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: isHorizontal ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="min-w-[140px] rounded-xl border border-border bg-card/60 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-sm font-medium">{step.label}</p>
            {step.description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {step.description}
              </p>
            )}
          </motion.div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "flex shrink-0 items-center justify-center text-muted-foreground/50",
                isHorizontal ? "mx-1" : "my-1"
              )}
            >
              {isHorizontal ? (
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
