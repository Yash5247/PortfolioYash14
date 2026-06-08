"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
  const [opened, setOpened] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Yash,\n\n${message}\n\n— ${name}\n${email}`
    );

    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    setOpened(true);
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
            className="readable-card overflow-hidden rounded-xl p-1"
          >
            <div className="rounded-xl p-6 sm:p-8">
              {opened ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <Send className="h-5 w-5 text-green-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Email client opened</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/70">
                    Your message was prepared in your email app. Hit send there to reach me at{" "}
                    <span className="font-medium text-white">{portfolioData.personal.email}</span>.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-6 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setOpened(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-sm text-white/70">
                    Fill out the form below — it opens your email app with your message ready to send. No account or backend required.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-white">
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white">
                        Message
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell me about your project..."
                        required
                        rows={5}
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Mail className="h-4 w-4" />
                      Open in Email App
                    </Button>
                  </form>
                  <p className="mt-4 text-center text-xs text-white/50">
                    Prefer direct contact?{" "}
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="font-medium text-white/80 underline-offset-2 hover:text-white hover:underline"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
