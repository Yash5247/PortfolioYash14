"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Loading
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {portfolioData.personal.name}
            </h1>
          </motion.div>
          <div className="mt-8 h-[1px] w-48 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-foreground"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
