"use client";

import { useEffect, useMemo, useRef } from "react";
import * as icons from "simple-icons";
import { stackGroups, type StackEntry } from "@/lib/content";

/* Constant background: a real double helix rendered as 2D-projected 3D math
 * (cos/sin per base, z-depth driving scale/opacity) rather than CSS 3D
 * transforms — that's what makes it read as an actual rotating molecule
 * instead of collapsing into a flat tangle. Base pairs are real stack icons
 * (simple-icons), colored per category. It spins continuously on its own;
 * scrolling adds extra turn AND shifts the helix vertically, so different
 * base pairs drift through view as you read the page — scroll changes what
 * you see, not just whether it moves. Static render (one frame) under
 * prefers-reduced-motion. */

const CATEGORY_VAR: Record<string, string> = {
  Languages: "var(--cat-lang)",
  Frontend: "var(--cat-frontend)",
  Backend: "var(--cat-backend)",
  Data: "var(--cat-data)",
  "Cloud / Infra": "var(--cat-cloud)",
  Tooling: "var(--cat-tooling)",
};

type Rung = { left: StackEntry; right: StackEntry | null; color: string };

// Repeated a few times so the helix reads as one long, continuous strand
// instead of running out after one pass through the stack.
const REPEAT_COUNT = 4;

function buildRungs(): Rung[] {
  const single: Rung[] = [];
  for (const group of stackGroups) {
    const items = group.items.filter((item) => item.icon);
    const color = CATEGORY_VAR[group.label.en] ?? "var(--accent)";
    for (let i = 0; i < items.length; i += 2) {
      single.push({ left: items[i], right: items[i + 1] ?? null, color });
    }
  }
  const rungs: Rung[] = [];
  for (let cycle = 0; cycle < REPEAT_COUNT; cycle++) rungs.push(...single);
  return rungs;
}

const TWIST_PER_RUNG = (34.3 * Math.PI) / 180; // real B-DNA twist
const SPIN_SPEED = 0.00022; // rad/ms, idle rotation
const VERTICAL_SPACING = 46;
const HELIX_ICON_SCALE = 0.72; // keep the 24-unit brand path inside the r=13 badge

function iconPath(slug: string | null): string | null {
  if (!slug) return null;
  return (icons as Record<string, { path: string } | undefined>)[slug]?.path ?? null;
}

export function TechHelix() {
  const rungs = useMemo(() => buildRungs(), []);
  const svgRef = useRef<SVGSVGElement>(null);
  const strandARef = useRef<SVGPathElement>(null);
  const strandBRef = useRef<SVGPathElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const badgeARefs = useRef<(SVGGElement | null)[]>([]);
  const badgeBRefs = useRef<(SVGGElement | null)[]>([]);
  const layerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0;
    let raf = 0;
    let last = performance.now();

    const render = (spinAngle: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width > 900 ? width * 0.8 : width * 0.5;
      const radius = Math.min(width * 0.09, 90);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const span = (rungs.length - 1) * VERTICAL_SPACING;
      const verticalOffset = (scrollRatio - 0.5) * span * 0.85;
      const centerY = height * 0.5 + verticalOffset;
      const totalAngle = spinAngle + scrollRatio * Math.PI * 2;

      const pointsA: { x: number; y: number }[] = [];
      const pointsB: { x: number; y: number }[] = [];

      rungs.forEach((rung, i) => {
        const y = centerY + (i - (rungs.length - 1) / 2) * VERTICAL_SPACING;
        const a = i * TWIST_PER_RUNG + totalAngle;
        const xA = centerX + Math.cos(a) * radius;
        const zA = Math.sin(a);
        const xB = centerX + Math.cos(a + Math.PI) * radius;
        const zB = Math.sin(a + Math.PI);
        pointsA.push({ x: xA, y });
        pointsB.push({ x: xB, y });

        const scaleA = 0.75 + (zA + 1) * 0.2;
        const scaleB = 0.75 + (zB + 1) * 0.2;
        const opA = 0.35 + (zA + 1) * 0.325;
        const opB = 0.35 + (zB + 1) * 0.325;
        const aInFront = zA > zB;

        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x1", String(xA));
          line.setAttribute("y1", String(y));
          line.setAttribute("x2", String(xB));
          line.setAttribute("y2", String(y));
          line.setAttribute("opacity", String(Math.max(opA, opB) * 0.6));
        }

        const badgeA = badgeARefs.current[i];
        if (badgeA) {
          badgeA.setAttribute("transform", `translate(${xA} ${y}) scale(${scaleA})`);
          badgeA.setAttribute("opacity", String(opA));
        }
        const badgeB = badgeBRefs.current[i];
        if (badgeB) {
          badgeB.setAttribute("transform", `translate(${xB} ${y}) scale(${scaleB})`);
          badgeB.setAttribute("opacity", String(opB));
        }
        // Reorder so the nearer base pair paints on top.
        const layer = layerRef.current;
        if (layer && badgeA && badgeB) {
          if (aInFront) layer.append(badgeB, badgeA);
          else layer.append(badgeA, badgeB);
        }
      });

      const smooth = (points: { x: number; y: number }[]) => {
        if (!points.length) return "";
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          d += ` Q ${points[i].x} ${points[i].y}, ${midX} ${midY}`;
        }
        const lastPoint = points[points.length - 1];
        d += ` L ${lastPoint.x} ${lastPoint.y}`;
        return d;
      };
      strandARef.current?.setAttribute("d", smooth(pointsA));
      strandBRef.current?.setAttribute("d", smooth(pointsB));
    };

    if (reduceMotion) {
      render(0);
      return;
    }

    const loop = (now: number) => {
      angle += SPIN_SPEED * (now - last);
      last = now;
      render(angle);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [rungs]);

  return (
    <div className="tech-helix" aria-hidden="true">
      <svg ref={svgRef} className="tech-helix__svg">
        <path ref={strandARef} className="tech-helix__strand" />
        <path ref={strandBRef} className="tech-helix__strand" />
        <g>
          {rungs.map((rung, i) => (
            <line
              key={`rung-${i}-${rung.left.name}`}
              ref={(el) => { lineRefs.current[i] = el; }}
              className="tech-helix__bond"
              style={{ stroke: rung.color }}
            />
          ))}
        </g>
        <g ref={layerRef}>
          {rungs.map((rung, i) => (
            <HelixBadge
              key={`a-${i}-${rung.left.name}`}
              refCb={(el) => { badgeARefs.current[i] = el; }}
              entry={rung.left}
              color={rung.color}
            />
          ))}
          {rungs.map((rung, i) =>
            rung.right ? (
              <HelixBadge
                key={`b-${i}-${rung.right.name}`}
                refCb={(el) => { badgeBRefs.current[i] = el; }}
                entry={rung.right}
                color={rung.color}
              />
            ) : null
          )}
        </g>
      </svg>
    </div>
  );
}

function HelixBadge({ refCb, entry, color }: { refCb: (el: SVGGElement | null) => void; entry: StackEntry; color: string }) {
  const path = iconPath(entry.icon);
  return (
    <g ref={refCb} className="tech-helix__badge">
      <circle r="13" style={{ stroke: color }} />
      {path ? (
        <g transform={`scale(${HELIX_ICON_SCALE}) translate(-12, -12)`}>
          <path d={path} style={{ fill: color }} />
        </g>
      ) : null}
    </g>
  );
}
