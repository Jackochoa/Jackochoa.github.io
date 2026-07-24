"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProjects, type Locale } from "@/lib/content";
import { ProjectCard } from "./project-card";

/* Horizontal project carousel — native scroll-snap for touch/keyboard, with
 * arrow buttons and dots wired to the same scroll position. A tilted SVG helix
 * sits behind it as a decorative side accent. */
export function ProjectCarousel({ locale }: { locale: Locale }) {
  const projects = getProjects(locale);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return first ? first.offsetWidth + gap : track.clientWidth;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setActive(Math.round(track.scrollLeft / step()));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [step]);

  const go = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    track.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  const t = locale === "es"
    ? { prev: "Proyecto anterior", next: "Proyecto siguiente", dot: (n: string) => `Ir a ${n}` }
    : { prev: "Previous project", next: "Next project", dot: (n: string) => `Go to ${n}` };

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef}>
        {projects.map((project) => (
          <div className="carousel__item" key={project.slug}>
            <ProjectCard project={project} locale={locale} />
          </div>
        ))}
      </div>
      <div className="carousel__controls">
        <div className="carousel__arrows">
          <button type="button" className="carousel__arrow" aria-label={t.prev} onClick={() => go(active - 1)} disabled={active === 0}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="carousel__arrow" aria-label={t.next} onClick={() => go(active + 1)} disabled={active === projects.length - 1}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="carousel__dots" role="tablist">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              className={`carousel__dot${i === active ? " is-active" : ""}`}
              aria-label={t.dot(project.title)}
              aria-current={i === active}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
