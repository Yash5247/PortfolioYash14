import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  portfolioData,
  getProjectBySlug,
  isValidUrl,
} from "@/data/portfolio";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ slug: p.caseStudySlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: `${project.title} | Case Study — ${portfolioData.personal.name}`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-8 flex gap-3">
          {isValidUrl(project.live) && (
            <Button variant="outline" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {isValidUrl(project.github) && (
            <Button variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>

        <div className="prose prose-invert mt-12 max-w-none">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            This project demonstrates end-to-end software development — from
            architecture design and implementation to deployment and monitoring.
            Built with modern technologies and best practices for scalability
            and maintainability.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Key Features</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            {project.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                {f}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-semibold">Technical Approach</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The application follows a modular architecture with clear separation
            of concerns. The frontend leverages server-side rendering for
            performance, while the backend provides robust API endpoints with
            proper error handling and validation. Database design prioritizes
            data integrity and query optimization.
          </p>

          <h2 className="mt-10 text-2xl font-semibold">Results</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Successfully deployed to production with automated CI/CD pipelines,
            serving users with high availability and performance. The project
            showcases practical application of full-stack development, DevOps
            practices, and modern software engineering principles.
          </p>
        </div>
      </div>
    </main>
  );
}
