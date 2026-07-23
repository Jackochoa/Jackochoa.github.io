import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case-page";
import { getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() { return getProjects("en").map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject("en", slug);
    return project
      ? pageMetadata({
          locale: "en",
          title: project.title,
          description: project.summary,
          englishPath: `/work/${slug}/`,
          spanishPath: `/es/proyectos/${slug}/`,
        })
      : {};
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProject("en", slug)) notFound();
  return <CasePage locale="en" slug={slug} />;
}
