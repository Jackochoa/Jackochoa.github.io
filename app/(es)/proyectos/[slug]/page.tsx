import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/case-page";
import { getProject, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() { return getProjects("es").map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject("es", slug);
    return project
      ? pageMetadata({
          locale: "es",
          title: project.title,
          description: project.summary,
          englishPath: `/en/work/${slug}/`,
          spanishPath: `/proyectos/${slug}/`,
        })
      : {};
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProject("es", slug)) notFound();
  return <CasePage locale="es" slug={slug} />;
}
