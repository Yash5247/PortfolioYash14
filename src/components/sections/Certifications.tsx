"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const certifications = portfolioData.certifications;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Credentials"
          title="Certifications"
          description="Industry-recognized certifications and academic achievements."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group h-full transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    {cert.year}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
