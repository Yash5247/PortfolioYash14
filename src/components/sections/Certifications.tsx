"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/shared/SectionHeader";

const certifications = portfolioData.certifications;

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          description="Verified academic and industry credentials."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border p-6 transition-colors hover:border-foreground/15"
            >
              <Award
                className="h-5 w-5 text-muted-foreground"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-semibold">{cert.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {cert.issuer}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {cert.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
