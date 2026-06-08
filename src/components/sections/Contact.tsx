"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Contact"
          title="Get in touch"
          description="Open to collaborations, internships, and engineering conversations."
          align="left"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <SocialLinks
            variant="cards"
            platforms={[
              "email",
              "phone",
              "linkedin",
              "github",
              "codolio",
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pro-card overflow-hidden rounded-xl p-1"
          >
            <div className="rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Send className="h-5 w-5 text-green-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold">Message sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    I&apos;ll reply at {portfolioData.personal.email}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      required
                      className="border-white/10 bg-white/5"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      required
                      className="border-white/10 bg-white/5"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      required
                      className="border-white/10 bg-white/5"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
