"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind? I'd love to hear from you."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <SocialLinks
            variant="cards"
            platforms={[
              "email",
              "phone",
              "linkedin",
              "github",
              "codolio",
              "leetcode",
              "codeforces",
              "hackerrank",
              "twitter",
              "instagram",
            ]}
          />

          <Card>
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[300px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Send className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold">Message Sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you at{" "}
                    {portfolioData.personal.email} soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input type="email" placeholder="you@email.com" required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
