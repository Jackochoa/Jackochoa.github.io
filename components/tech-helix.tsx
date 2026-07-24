"use client";

import { useEffect, useRef } from "react";

/* Constant scroll-reactive background: a DNA double helix whose base pairs are
 * the languages and frameworks in use, built from modular "brick" nodes — an
 * organic form assembled from blocks (a nod to Briquette's concept, not its
 * palette). Pure CSS 3D so the labels stay real text; a throttled scroll
 * listener drives the rotation. Decorative and subtle; content stays readable.
 * Static under prefers-reduced-motion. */
const BASES = [
  "TypeScript", "React", "Next.js", "Rust", "Axum", "Svelte", "Python", "D3",
  "NestJS", "Express", "PostgreSQL", "Redis", "SQLite", "Prisma", "Drizzle",
  "Zod", "Vite", "Tokio", "Socket.io", "Docker", "Bash", "Git",
];

export function TechHelix() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      spine.style.setProperty("--rot", `${window.scrollY * 0.12}deg`);
      spine.style.setProperty("--drift", `${window.scrollY * -0.02}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mid = (BASES.length - 1) / 2;
  return (
    <div className="tech-helix" aria-hidden="true">
      <div className="tech-helix__spine" ref={spineRef}>
        {BASES.map((name, i) => (
          <div className="tech-helix__rung" key={name} style={{ "--i": i - mid } as React.CSSProperties}>
            <span className="tech-helix__brick" />
            <span className="tech-helix__label">{name}</span>
            <span className="tech-helix__brick" />
          </div>
        ))}
      </div>
    </div>
  );
}
