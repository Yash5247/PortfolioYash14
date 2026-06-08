"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GradualBlurProps {
  children: ReactNode;
  className?: string;
}

export function GradualBlur({ children, className }: GradualBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [14, 6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.35, 0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      <motion.div style={{ filter }}>{children}</motion.div>
    </motion.div>
  );
}

export function SectionTransition() {
  return (
    <div className="pointer-events-none relative h-20 w-full" aria-hidden>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(9,9,11,0.6) 50%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />
    </div>
  );
}
