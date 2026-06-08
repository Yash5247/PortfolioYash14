import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: `Blog — ${portfolioData.personal.name}`,
  description: "Articles on software engineering, DevOps, and AI automation.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Articles coming soon. Stay tuned for insights on software
          engineering, DevOps, and AI automation.
        </p>

        <div className="mt-12 space-y-6">
          {portfolioData.blogPosts.map((post) => (
            <Card key={post.slug}>
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  {post.date}
                </Badge>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
