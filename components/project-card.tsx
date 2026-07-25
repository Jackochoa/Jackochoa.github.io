import Link from "next/link";
import { getLocalizedPath, type Locale, type ProjectCase } from "@/lib/content";
import { CircosArcs } from "./motifs";

/* The card leads with the product itself. The drawn motif and its caption are
 * the fallback for a project with no approved material yet, not the default —
 * over a screenshot that caption only repeats what the heading and summary
 * already say, and fights whatever pixels happen to sit behind it. The image is
 * decorative here, so it stays inside the aria-hidden wrapper with empty alt. */
export function ProjectCard({ project, locale, featured = false }: { project: ProjectCase; locale: Locale; featured?: boolean }) {
  const path = getLocalizedPath(locale, `/work/${project.slug}/`);
  const isCircos = project.slug === "mitocircos-studio";
  /* Prefer an actual product screenshot: the card is selling the thing that was
   * built, and a brand or cover asset shows the wrapper instead. The case-study
   * gallery keeps its own order regardless. */
  const cover = project.media.find((media) => media.type === "screenshot") ?? project.media[0];
  return (
    <article className={`project-card project-card--${project.accent} ${featured ? "project-card--featured" : ""}`}>
      <div className={`project-card__visual${cover ? " project-card__visual--media" : ""}`} aria-hidden="true">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element -- images.unoptimized is on for static export; next/image would only add a wrapper.
          <img
            className="project-card__cover"
            src={cover.path}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <>
            {isCircos ? <CircosArcs /> : <div className="project-card__visual-orbit" />}
            {isCircos ? null : <div className="project-card__visual-line" />}
            <div className="project-card__visual-core"><span>{project.visualLabel}</span><strong>{project.visualDetail}</strong></div>
          </>
        )}
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
