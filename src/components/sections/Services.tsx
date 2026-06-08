"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Monitor,
  Server,
  Cloud,
  Bot,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const services = portfolioData.services;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Monitor,
  Server,
  Cloud,
  Bot,
  Palette,
};

export function Services() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Services"
          title="What I Offer"
          description="End-to-end development services from concept to production deployment."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
