import Link from "next/link";
import { getLocalizedPath, getProject, getProjects, type Locale, type ProjectCase } from "@/lib/content";
import { ContactCta } from "./contact-cta";
import { PageShell } from "./page-shell";

export function CasePage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(locale, slug);
  if (!project) return null;
  const projects = getProjects(locale);
  const next = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length];
  const labels = locale === "es" ? {
    scope: "Alcance", status: "Estado", type: "Tipo de proyecto", role: "Rol", stack: "Stack", services: "Servicios", proof: "Pruebas", architecture: "Arquitectura", privacy: "Privacidad", problem: "El problema", decisions: "Decisiones", evidence: "Evidencia", learning: "Lo que aprendí", media: "Material aprobado", pending: "Las capturas y demos se agregarán cuando exista material público aprobado.", next: "Siguiente caso", all: "Todos", keep: "¿Seguimos?", talk: "Hablemos del problema real.", contact: "Hablemos",
  } : {
    scope: "Scope", status: "Status", type: "Project type", role: "Role", stack: "Stack", services: "Services", proof: "Proof", architecture: "Architecture", privacy: "Privacy", problem: "The problem", decisions: "Decisions", evidence: "Evidence", learning: "What I learned", media: "Approved material", pending: "Screenshots and demos will be added when approved public material is available.", next: "Next case", all: "All work", keep: "Keep going?", talk: "Let’s talk about the real problem.", contact: "Start a conversation",
  };

  return <PageShell locale={locale} currentPath={getLocalizedPath(locale, `/work/${slug}/`)}>
    <article>
      <header className="case-hero"><div className="shell"><div className="case-hero__grid"><div><p className="eyebrow"><span aria-hidden="true">✳</span>{project.eyebrow}</p><h1>{project.title}</h1><p className="case-hero__summary">{project.summary}</p></div><ArchitectureDiagram label={project.visualLabel} /></div>
        <dl className="case-meta"><Meta label={labels.status} value={project.status} /><Meta label={labels.type} value={project.projectType} /><Meta label={labels.role} value={project.role} /><Meta label={labels.scope} value={project.scope} /><Meta label={labels.stack} value={project.stack.join(" · ")} /></dl>
      </div></header>
      <section className="section"><div className="shell case-content"><aside className="case-content__aside"><strong>{project.outcome}</strong><p>{locale === "es" ? "Caso sanitizado: muestra criterio, arquitectura y proceso sin exponer material privado." : "Sanitized case study: it shows judgment, architecture, and process without exposing private material."}</p></aside><div>
        <CaseSection title={labels.problem} body={project.problem} />
        <CaseList title={labels.decisions} items={project.decisions} />
        <CaseList title={labels.evidence} items={project.evidence} />
        <CaseList title={labels.services} items={project.services} />
        <CaseList title={labels.proof} items={project.proof} />
        <CaseSection title={labels.architecture} body={project.architectureSummary} />
        <MediaGallery project={project} title={labels.media} pending={labels.pending} />
        <CaseSection title={labels.privacy} body={project.privacyNotes} />
        <CaseList title={labels.learning} items={project.lessons} />
        <div className="contact-panel" style={{ marginTop: "4rem" }}><p className="eyebrow"><span aria-hidden="true">✳</span>{labels.keep}</p><h2>{labels.talk}</h2><ContactCta locale={locale} label={labels.contact} /></div>
        <div className="next-case" style={{ marginTop: "4rem" }}><div><span className="next-case__label">{labels.next}</span><br /><Link className="next-case__link" href={getLocalizedPath(locale, `/work/${next.slug}/`)}>{next.title}<span aria-hidden="true">↗</span></Link></div><Link className="text-link" href={getLocalizedPath(locale, "/work/")}>{labels.all}<span aria-hidden="true">↗</span></Link></div>
      </div></div></section>
    </article>
  </PageShell>;
}

function Meta({ label, value }: { label: string; value: string }) { return <div><dt>{label}</dt><dd>{value}</dd></div>; }
function CaseSection({ title, body }: { title: string; body: string }) { return <section className="case-content__section"><h2>{title}</h2><p>{body}</p></section>; }
function CaseList({ title, items }: { title: string; items: string[] }) { return <section className="case-content__section"><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>; }
function MediaGallery({ project, title, pending }: { project: ProjectCase; title: string; pending: string }) { return <section className="case-content__section"><h2>{title}</h2>{project.media.length ? <div className="case-media">{project.media.map((media) => <figure key={media.path}><CaseImage media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div> : <p className="case-media__pending">{pending}</p>}</section>; }

/* images.unoptimized is on for static export, so next/image would only wrap a
 * plain <img> here. The declared aspect ratio reserves the space instead, which
 * is what next/image's width/height would have bought us. */
function CaseImage({ media }: { media: ProjectCase["media"][number] }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.path} alt={media.alt} style={{ aspectRatio: media.aspectRatio }} loading="lazy" decoding="async" />;
}
function ArchitectureDiagram({ label }: { label: string }) { return <div className="case-architecture" aria-label={label}><svg viewBox="0 0 400 260" role="img" aria-hidden="true"><path d="M70 130H170M230 130H330M200 55V205" /><path className="case-architecture__flow" d="M95 102L170 102M230 158L305 158" /><circle cx="70" cy="130" r="18" /><circle cx="200" cy="55" r="18" /><circle cx="200" cy="130" r="28" /><circle cx="200" cy="205" r="18" /><circle cx="330" cy="130" r="18" /></svg><span>{label}</span></div>; }
