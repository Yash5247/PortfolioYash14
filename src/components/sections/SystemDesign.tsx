"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

const architectureLayers = portfolioData.architectureLayers;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SystemDesign() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    const layers = diagramRef.current.querySelectorAll(".arch-layer");
    gsap.fromTo(
      layers,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      }
    );

    const arrows = diagramRef.current.querySelectorAll(".arch-arrow");
    gsap.fromTo(
      arrows,
      { opacity: 0 },
      {
        opacity: 1,
        stagger: 0.15,
        duration: 0.4,
        delay: 0.3,
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="architecture" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Architecture"
          title="System Architecture"
          description="How I design scalable, maintainable systems from frontend to deployment."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div ref={diagramRef} className="flex flex-col items-center">
            {architectureLayers.map((layer, i) => (
              <div key={layer.name} className="flex flex-col items-center">
                <motion.div
                  className="arch-layer w-full max-w-sm rounded-2xl border border-border bg-card/80 p-6 text-center backdrop-blur-sm transition-all hover:border-foreground/20 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold">{layer.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {layer.tech}
                  </p>
                </motion.div>
                {i < architectureLayers.length - 1 && (
                  <ChevronDown className="arch-arrow my-2 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Frontend Layer",
                desc: "React/Next.js with server components, optimized for performance and SEO.",
              },
              {
                title: "API Layer",
                desc: "RESTful APIs with Express.js, authentication, and rate limiting.",
              },
              {
                title: "Data Layer",
                desc: "SQL databases with Supabase for real-time features and auth.",
              },
              {
                title: "Infrastructure",
                desc: "Docker containers, CI/CD pipelines, and Vercel edge deployments.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border p-6 transition-all hover:border-foreground/20"
              >
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
