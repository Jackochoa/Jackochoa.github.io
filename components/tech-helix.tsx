"use client";

import { useEffect, useRef } from "react";
import * as icons from "simple-icons";
import { stackGroups } from "@/lib/content";

/* Constant scroll-reactive background: a DNA double helix whose base pairs are
 * the languages and frameworks in use, each rung built from real brand icons
 * (modular "brick" nodes) — an organic form assembled from blocks, echoing
 * Briquette's concept without borrowing its palette. Pure CSS 3D so labels
 * stay real text; a throttled scroll listener drives the rotation. The twist
 * per rung is kept small so the whole shape stays legible instead of folding
 * into itself. Decorative, positioned off to the side. Static under
 * prefers-reduced-motion. */
const BASES = stackGroups.flatMap((group) => group.items).filter((item) => item.icon);

export function TechHelix() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      spine.style.setProperty("--rot", `${window.scrollY * 0.05}deg`);
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
        {BASES.map((item, i) => {
          const icon = (icons as Record<string, { path: string } | undefined>)[item.icon as string];
          return (
            <div className="tech-helix__rung" key={item.name} style={{ "--i": i - mid } as React.CSSProperties}>
              <span className="tech-helix__brick">
                {icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : null}
              </span>
              <span className="tech-helix__label">{item.name}</span>
              <span className="tech-helix__brick">
                {icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
