"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const blogPosts = portfolioData.blogPosts;
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Blog() {
  return (
    <section id="blog" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Blog"
          title="Writing"
          description="Thoughts on software engineering, DevOps, and AI automation."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/blog">
                <Card className="group h-full transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-4 text-xs">
                      {post.date}
                    </Badge>
                    <h3 className="text-lg font-semibold group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      Read more
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
