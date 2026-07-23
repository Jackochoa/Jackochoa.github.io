import Link from "next/link";
import { getLocalizedPath, getProject, getProjects, type Locale } from "@/lib/content";
import { EmailCta } from "./email-cta";
import { PageShell } from "./page-shell";

export function CasePage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(locale, slug);
  if (!project) return null;
  const projects = getProjects(locale);
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const path = locale === "en" ? `/work/${slug}/` : `/es/proyectos/${slug}/`;
  return <PageShell locale={locale} currentPath={path}>
    <article>
      <header className="case-hero"><div className="shell"><div className="case-hero__grid"><div><p className="eyebrow"><span aria-hidden="true">✳</span>{project.eyebrow}</p><h1>{project.title}</h1><p className="case-hero__summary">{project.summary}</p></div><div className={`case-hero__visual project-card--${project.accent}`}><div className="project-card__visual" aria-hidden="true"><div className="project-card__visual-orbit" /><div className="project-card__visual-core"><span>{project.visualLabel}</span><strong>{project.visualDetail}</strong></div><div className="project-card__visual-line" /></div></div></div><dl className="case-meta"><div><dt>{locale === "es" ? "Alcance" : "Scope"}</dt><dd>{project.scope}</dd></div><div><dt>{locale === "es" ? "Rol" : "Role"}</dt><dd>{project.role}</dd></div><div><dt>{locale === "es" ? "Stack" : "Stack"}</dt><dd>{project.stack.join(" · ")}</dd></div></dl></div></header>
      <section className="section"><div className="shell case-content"><aside className="case-content__aside"><strong>{project.outcome}</strong><p>{locale === "es" ? "Caso sanitizado para mostrar criterio, arquitectura y proceso sin exponer material privado." : "Sanitized case study showing judgment, architecture, and process without exposing private material."}</p></aside><div><CaseSection title={locale === "es" ? "El problema" : "The problem"} body={project.problem} /><CaseList title={locale === "es" ? "Decisiones" : "Decisions"} items={project.decisions} /><CaseList title={locale === "es" ? "Evidencia" : "Evidence"} items={project.evidence} /><CaseList title={locale === "es" ? "Lo que aprendí" : "What I learned"} items={project.lessons} /><div className="contact-panel" style={{ marginTop: "4rem" }}><p className="eyebrow"><span aria-hidden="true">✳</span>{locale === "es" ? "¿Seguimos?" : "Keep going?"}</p><h2>{locale === "es" ? "Hablemos del problema real." : "Let’s talk about the real problem."}</h2><EmailCta locale={locale} label={locale === "es" ? "Hablemos" : "Start a conversation"} /></div><div className="next-case" style={{ marginTop: "4rem" }}><div><span className="next-case__label">{locale === "es" ? "Siguiente caso" : "Next case"}</span><br /><Link className="next-case__link" href={getLocalizedPath(locale, `/work/${next.slug}/`)}>{next.title}<span aria-hidden="true">↗</span></Link></div><Link className="text-link" href={getLocalizedPath(locale, "/work/")}>{locale === "es" ? "Todos" : "All work"}<span aria-hidden="true">↗</span></Link></div></div></div></section>
    </article>
  </PageShell>;
}

function CaseSection({ title, body }: { title: string; body: string }) { return <section className="case-content__section"><h2>{title}</h2><p>{body}</p></section>; }
function CaseList({ title, items }: { title: string; items: string[] }) { return <section className="case-content__section"><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>; }
