"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

const { devOpsCards, pipelineSteps } = portfolioData;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const terminalLines = [
  "$ git push origin main",
  "→ Running CI/CD pipeline...",
  "✓ Tests passed (24/24)",
  "✓ Building Docker image...",
  "✓ Deploying to Vercel...",
  "✓ Production deployment successful",
  "→ https://app.vercel.app [200 OK]",
];

export function DevOps() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pipelineRef.current) {
      gsap.fromTo(
        pipelineRef.current.querySelectorAll(".pipeline-step"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: "top 80%",
          },
        }
      );
    }

    if (terminalRef.current) {
      const lines = terminalRef.current.querySelectorAll(".terminal-line");
      gsap.fromTo(
        lines,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.4,
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section id="devops" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Infrastructure"
          title="Infrastructure & DevOps"
          description="Building reliable deployment pipelines and production-grade infrastructure."
        />

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {devOpsCards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="group h-full transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{card.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div ref={pipelineRef} className="mb-16">
          <h3 className="mb-8 text-center text-lg font-medium">
            Deployment Pipeline
          </h3>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
            {pipelineSteps.map((step, i) => (
              <div key={step} className="flex flex-col items-center sm:flex-row">
                <motion.div
                  className="pipeline-step rounded-xl border border-border bg-card/80 px-6 py-3 text-sm font-medium backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {step}
                </motion.div>
                {i < pipelineSteps.length - 1 && (
                  <ChevronDown className="my-1 h-5 w-5 rotate-0 text-muted-foreground sm:mx-2 sm:rotate-[-90deg]" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={terminalRef}
          className="overflow-hidden rounded-2xl border border-border bg-[#0d1117] font-mono text-sm shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-white/50">deploy.sh</span>
          </div>
          <div className="space-y-2 p-6">
            {terminalLines.map((line, i) => (
              <p
                key={i}
                className={`terminal-line ${
                  line.startsWith("✓")
                    ? "text-green-400"
                    : line.startsWith("→")
                      ? "text-blue-400"
                      : "text-white/80"
                }`}
              >
                {line}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-green-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
