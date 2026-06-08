"use client";

import { motion } from "framer-motion";
import type { DetailedExperience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  items: DetailedExperience[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ExperienceTimeline({
  items,
  activeId,
  onSelect,
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[19px] top-0 w-px bg-border" />
      <div className="space-y-1">
        {items.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelect(item.id)}
              className={cn(
                "relative flex w-full items-start gap-4 rounded-xl p-4 text-left transition-all",
                isActive ? "bg-muted" : "hover:bg-muted/50"
              )}
              data-cursor="pointer"
            >
              <div
                className={cn(
                  "relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="font-semibold">{item.company}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.period}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
