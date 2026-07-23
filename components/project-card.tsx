import Link from "next/link";
import { getLocalizedPath, type Locale, type ProjectCase } from "@/lib/content";

export function ProjectCard({ project, locale, featured = false }: { project: ProjectCase; locale: Locale; featured?: boolean }) {
  const path = getLocalizedPath(locale, `/work/${project.slug}/`);
  return (
    <article className={`project-card project-card--${project.accent} ${featured ? "project-card--featured" : ""}`}>
      <div className="project-card__visual" aria-hidden="true">
        <div className="project-card__visual-orbit" />
        <div className="project-card__visual-core"><span>{project.visualLabel}</span><strong>{project.visualDetail}</strong></div>
        <div className="project-card__visual-line" />
      </div>
      <div className="project-card__body">
        <div className="project-card__meta"><span>{project.eyebrow}</span><span>{project.year}</span></div>
        <h3><Link href={path} data-umami-event="case_open">{project.title}<span aria-hidden="true">↗</span></Link></h3>
        <p>{project.summary}</p>
        <div className="tag-row">{project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </article>
  );
}
