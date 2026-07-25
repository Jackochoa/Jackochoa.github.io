"use client";

import { Fragment, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import type { HelixBase, HelixRung } from "@/lib/helix";

/* Constant background: a real double helix rendered as 2D-projected 3D math
 * (cos/sin per base, z-depth driving scale/opacity) rather than CSS 3D
 * transforms — that's what makes it read as an actual rotating molecule
 * instead of collapsing into a flat tangle. Base pairs are real stack icons,
 * colored per category, resolved server-side in `lib/helix.ts` and handed in
 * as props. It spins continuously on its own; scrolling adds extra turn AND
 * shifts the helix vertically, so different base pairs drift through view as
 * you read the page — scroll changes what you see, not just whether it moves.
 * Static render (one frame) under prefers-reduced-motion. */

const TWIST_PER_RUNG = (34.3 * Math.PI) / 180; // real B-DNA twist
const SPIN_SPEED = 0.00022; // rad/ms, idle rotation
const VERTICAL_SPACING = 46;
const HELIX_ICON_SCALE = 0.72; // keep the 24-unit brand path inside the r=13 badge
const BADGE_RADIUS = 16; // r=13 badge at its largest z-scale, plus stroke
const MIN_GUTTER = 96; // narrower than this and there is no room beside the text
const EDGE_RADIUS = 42; // sliver that runs along the margin when there is no gutter

// The stack is repeated a few times so the helix reads as one long, continuous
// strand instead of running out after a single pass.
const REPEAT_COUNT = 4;

// The value never changes after hydration, so there is nothing to subscribe to.
const subscribeNever = () => () => {};

export function TechHelix({ basePairs }: { basePairs: HelixRung[] }) {
  const rungs = useMemo(
    () => Array.from({ length: REPEAT_COUNT }, () => basePairs).flat(),
    [basePairs]
  );
  /* Every base pair is positioned from `useEffect`, so a server-rendered helix
   * is just a pile of icons in the corner until hydration — and ~230 KB of
   * inline SVG in every page's HTML. Render it after mount instead. */
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  const svgRef = useRef<SVGSVGElement>(null);
  const strandARef = useRef<SVGPathElement>(null);
  const strandBRef = useRef<SVGPathElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const badgeARefs = useRef<(SVGGElement | null)[]>([]);
  const badgeBRefs = useRef<(SVGGElement | null)[]>([]);
  const layerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!mounted) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0;
    let raf = 0;
    let last = performance.now();

    /* Reading scrollHeight forces a layout, so it is measured on resize rather
     * than every frame. Page height is otherwise stable: case-study images
     * reserve their space through aspect-ratio before they load. */
    let height = 0;
    let centerX = 0;
    let radius = 0;
    let maxScroll = 0;
    /* The helix is decoration, so it must never sit under the text. Measure the
     * real content column and take whatever gutter is left beside it: a full
     * strand when there is room, a sliver along the margin when there is not. */
    const measure = () => {
      const width = window.innerWidth;
      height = window.innerHeight;
      maxScroll = document.documentElement.scrollHeight - height;

      const shell = document.querySelector(".shell");
      const contentRight = shell ? shell.getBoundingClientRect().right : width * 0.92;
      const gutter = width - contentRight;

      if (gutter >= MIN_GUTTER) {
        centerX = contentRight + gutter / 2;
        radius = Math.min(gutter / 2 - BADGE_RADIUS, 90);
      } else {
        // Anchored past the right edge so only the near strand stays on screen.
        centerX = width - 4;
        radius = EDGE_RADIUS;
      }
      svgRef.current?.classList.toggle("tech-helix__svg--edge", gutter < MIN_GUTTER);
    };
    measure();

    // Reused across frames so a 60fps loop does not allocate two points per rung.
    const pointsA = rungs.map(() => ({ x: 0, y: 0 }));
    const pointsB = rungs.map(() => ({ x: 0, y: 0 }));
    // Last known depth order per rung; a swap only happens when this flips.
    const aWasInFront: (boolean | undefined)[] = rungs.map(() => undefined);

    const render = (spinAngle: number) => {
      const svg = svgRef.current;
      if (!svg) return;

      const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const span = (rungs.length - 1) * VERTICAL_SPACING;
      const verticalOffset = (scrollRatio - 0.5) * span * 0.85;
      const centerY = height * 0.5 + verticalOffset;
      const totalAngle = spinAngle + scrollRatio * Math.PI * 2;

      rungs.forEach((rung, i) => {
        const y = centerY + (i - (rungs.length - 1) / 2) * VERTICAL_SPACING;
        const a = i * TWIST_PER_RUNG + totalAngle;
        const xA = centerX + Math.cos(a) * radius;
        const zA = Math.sin(a);
        const xB = centerX + Math.cos(a + Math.PI) * radius;
        const zB = Math.sin(a + Math.PI);
        pointsA[i].x = xA; pointsA[i].y = y;
        pointsB[i].x = xB; pointsB[i].y = y;

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
        /* Reorder so the nearer base of the pair paints on top. Each pair spends
         * most of its rotation on the same side, so this fires on a handful of
         * rungs per frame instead of moving every node. */
        if (badgeA && badgeB && aWasInFront[i] !== aInFront) {
          aWasInFront[i] = aInFront;
          if (aInFront) badgeB.after(badgeA);
          else badgeA.after(badgeB);
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

    const onResize = () => {
      measure();
      // The animation loop picks the new values up on its own; a static render
      // has to be told to redraw.
      if (reduceMotion) render(0);
    };
    window.addEventListener("resize", onResize, { passive: true });

    if (reduceMotion) {
      render(0);
      return () => window.removeEventListener("resize", onResize);
    }

    const loop = (now: number) => {
      angle += SPIN_SPEED * (now - last);
      last = now;
      render(angle);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [rungs, mounted]);

  if (!mounted) return <div className="tech-helix" aria-hidden="true" />;

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
        {/* Each pair is emitted adjacent so depth ordering is a swap between two
            siblings rather than a re-append of the whole layer. */}
        <g ref={layerRef}>
          {rungs.map((rung, i) => (
            <Fragment key={`pair-${i}-${rung.left.name}`}>
              <HelixBadge
                refCb={(el) => { badgeARefs.current[i] = el; }}
                base={rung.left}
                color={rung.color}
              />
              {rung.right ? (
                <HelixBadge
                  refCb={(el) => { badgeBRefs.current[i] = el; }}
                  base={rung.right}
                  color={rung.color}
                />
              ) : null}
            </Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
}

function HelixBadge({ refCb, base, color }: { refCb: (el: SVGGElement | null) => void; base: HelixBase; color: string }) {
  return (
    <g ref={refCb} className="tech-helix__badge">
      <circle r="13" style={{ stroke: color }} />
      {base.path ? (
        <g transform={`scale(${HELIX_ICON_SCALE}) translate(-12, -12)`}>
          <path d={base.path} style={{ fill: color }} />
        </g>
      ) : base.asset ? (
        <image href={base.asset} x="-10" y="-10" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
      ) : (
        <text x="0" y="0" textAnchor="middle" dominantBaseline="central" style={{ fill: color }}>{base.label}</text>
      )}
    </g>
  );
}
