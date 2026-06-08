"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagnifyLens } from "@/components/effects/MagnifyLens";
import {
  techEcosystem,
  getConnections,
  type TechItem,
} from "@/lib/tech-ecosystem";
import { cn } from "@/lib/utils";

const loopItems = [
  "react",
  "nextjs",
  "javascript",
  "typescript",
  "nodejs",
  "express",
  "supabase",
  "openai",
  "docker",
  "git",
  "github",
  "vercel",
  "linux",
  "sql",
  "python",
  "tailwind",
] as const;

interface LogoLoopProps {
  className?: string;
  speed?: number;
}

export function LogoLoop({ className, speed = 45 }: LogoLoopProps) {
  const [hovered, setHovered] = useState<TechItem | null>(null);
  const items = loopItems
    .map((id) => techEcosystem.find((t) => t.id === id))
    .filter((t): t is TechItem => !!t);

  const doubled = [...items, ...items];
  const connections = hovered ? getConnections(hovered.id) : [];

  return (
    <div className={cn("relative", className)}>
      <MagnifyLens className="overflow-hidden rounded-2xl border border-border/60 bg-card/20 py-10 backdrop-blur-md">
        <div
          className="flex w-max gap-12 px-6"
          style={{ animation: `marquee ${speed}s linear infinite` }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {doubled.map((tech, i) => (
            <button
              key={`${tech.id}-${i}`}
              type="button"
              className="group flex shrink-0 flex-col items-center gap-3 outline-none"
              onMouseEnter={() => setHovered(tech)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(tech)}
              onBlur={() => setHovered(null)}
            >
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-background/40 transition-all duration-300",
                  hovered?.id === tech.id &&
                    "scale-125 border-violet-500/40 shadow-lg shadow-violet-500/20"
                )}
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain dark:invert"
                  unoptimized
                />
                {hovered?.id === tech.id && (
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-violet-500/25 blur-xl" />
                )}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                {tech.name}
              </span>
            </button>
          ))}
        </div>
      </MagnifyLens>

      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute bottom-4 left-1/2 z-30 w-[min(92vw,28rem)] -translate-x-1/2 rounded-2xl border border-white/10 bg-background/90 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <Image
                src={hovered.icon}
                alt={hovered.name}
                width={32}
                height={32}
                className="h-8 w-8 dark:invert"
                unoptimized
              />
              <div>
                <p className="font-semibold">{hovered.name}</p>
                <p className="text-xs text-muted-foreground">{hovered.years}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {hovered.context}
            </p>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Used in {hovered.projects.length} project
              {hovered.projects.length !== 1 ? "s" : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {hovered.projects.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border px-2 py-0.5 text-[10px]"
                >
                  {p}
                </span>
              ))}
            </div>
            {connections.length > 0 && (
              <div className="mt-4 space-y-1.5 border-t border-border pt-3">
                {connections.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <ArrowRight
                      className="h-3 w-3 text-violet-400"
                      strokeWidth={1.5}
                    />
                    <span>
                      {hovered.name} → {c.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
