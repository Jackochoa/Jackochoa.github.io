"use client";

import { useEffect, useRef } from "react";
import * as icons from "simple-icons";
import { stackGroups } from "@/lib/content";

/* Constant background: a real double helix that spins continuously (like the
 * molecule itself), each base pair an icon from the stack — no text needed,
 * the icon carries the meaning. Bases are tinted per category, echoing
 * ATCG base-pair coloring but mapped to this site's own palette (frontend,
 * backend, data, cloud, language, tooling) instead of borrowing anyone
 * else's colors. A continuous CSS spin gives it the "always turning"
 * molecule feel; scroll adds extra turn on top so it still reacts. Static
 * under prefers-reduced-motion. */
const CATEGORY_VARS: Record<string, string> = {
  Languages: "var(--cat-lang)",
  Lenguajes: "var(--cat-lang)",
  Frontend: "var(--cat-frontend)",
  Backend: "var(--cat-backend)",
  Data: "var(--cat-data)",
  Datos: "var(--cat-data)",
  "Cloud / Infra": "var(--cat-cloud)",
  Tooling: "var(--cat-tooling)",
};

const BASES = stackGroups.flatMap((group) =>
  group.items
    .filter((item) => item.icon)
    .map((item) => ({ ...item, color: CATEGORY_VARS[group.label.en] ?? "var(--accent)" }))
);

export function TechHelix() {
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spine = spineRef.current;
    if (!spine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      spine.style.setProperty("--rot", `${window.scrollY * 0.1}deg`);
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
      <div className="tech-helix__turntable">
        <div className="tech-helix__spine" ref={spineRef}>
          {BASES.map((item, i) => {
            const icon = (icons as Record<string, { path: string } | undefined>)[item.icon as string];
            return (
              <div
                className="tech-helix__rung"
                key={item.name}
                style={{ "--i": i - mid, "--base": item.color } as React.CSSProperties}
              >
                <span className="tech-helix__node" />
                <span className="tech-helix__brick">
                  {icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} /></svg> : null}
                </span>
                <span className="tech-helix__node" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
