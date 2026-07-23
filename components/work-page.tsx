import { getCopy, getProjects, type Locale } from "@/lib/content";
import { PageShell } from "./page-shell";
import { ProjectCard } from "./project-card";

export function WorkPage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return <PageShell locale={locale} currentPath={locale === "en" ? "/work/" : "/es/proyectos/"}>
    <section className="page-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true">✳</span>{copy.work.kicker}</p><h1>{copy.work.title}</h1><p className="page-hero__intro">{copy.work.intro}</p></div></section>
    <section className="section"><div className="shell"><div className="work-grid">{getProjects(locale).map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div></div></section>
  </PageShell>;
}
