import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  portfolioData,
  getProjectBySlug,
} from "@/data/portfolio";
import { CaseStudyContent } from "@/components/case-study/CaseStudyContent";

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
    description: project.caseStudy.overview,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <CaseStudyContent project={project} />;
}
