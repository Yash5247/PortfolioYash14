import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";
import { isValidUrl } from "@/data/portfolio";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { FlowDiagram } from "@/components/visuals/FlowDiagram";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CaseStudyContentProps {
  project: PortfolioProject;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-border pt-12">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const { caseStudy: cs } = project;

  return (
    <article className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Projects
        </Link>

        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Case Study
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {isValidUrl(project.live) && (
            <Button asChild>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live
                <ArrowUpRight className="ml-1 h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          )}
          {isValidUrl(project.github) && (
            <Button variant="outline" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-2 h-4 w-4" />
                Source Code
              </a>
            </Button>
          )}
        </div>

        <Section title="Overview">
          <p className="text-base leading-relaxed text-muted-foreground">
            {cs.overview}
          </p>
        </Section>

        <Section title="Problem Statement">
          <p className="text-base leading-relaxed text-muted-foreground">
            {cs.problem}
          </p>
        </Section>

        <Section title="Solution">
          <p className="text-base leading-relaxed text-muted-foreground">
            {cs.solution}
          </p>
        </Section>

        <Section title="Architecture">
          <ArchitectureDiagram layers={cs.architecture} />
        </Section>

        <Section title="System Workflow">
          <FlowDiagram steps={cs.workflow} direction="vertical" />
        </Section>

        <Section title="Features">
          <div className="grid gap-4 sm:grid-cols-2">
            {cs.featureDetails.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border p-5"
              >
                <h3 className="font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Results">
          <ul className="space-y-3">
            {cs.results.map((result) => (
              <li
                key={result}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                {result}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Lessons Learned">
          <ul className="space-y-3">
            {cs.lessonsLearned.map((lesson) => (
              <li
                key={lesson}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                {lesson}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </article>
  );
}
