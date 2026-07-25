"use client";

import { useSyncExternalStore } from "react";
import type { HelixBase, HelixRung } from "@/lib/helix";

const subscribeMobile = (onStoreChange: () => void) => {
  const mql = window.matchMedia("(max-width: 900px)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 900px)").matches;
const getMobileServerSnapshot = () => false;

const HELIX_ICON_SCALE = 0.72;

export function HelixBand({ basePairs, locale }: { basePairs: HelixRung[]; locale: "es" | "en" }) {
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServerSnapshot);

  if (!isMobile) return null;

  const rungs = basePairs.slice(0, 14);
  const numRungs = rungs.length;

  const width = 600;
  const height = 120;
  const centerY = 60;
  const amp = 34;

  const pointsA: { x: number; y: number; z: number }[] = [];
  const pointsB: { x: number; y: number; z: number }[] = [];

  for (let i = 0; i < numRungs; i++) {
    const t = i / (numRungs - 1);
    const x = 30 + t * 540;
    const angle = t * 3.2 * Math.PI;
    const sinA = Math.sin(angle);
    const cosA = Math.cos(angle);

    pointsA.push({ x, y: centerY + amp * sinA, z: cosA });
    pointsB.push({ x, y: centerY - amp * sinA, z: -cosA });
  }

  const buildSmoothPath = (pts: { x: number; y: number }[]) => {
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx.toFixed(1)} ${p0.y.toFixed(1)}, ${cx.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  };

  const strandAPath = buildSmoothPath(pointsA);
  const strandBPath = buildSmoothPath(pointsB);

  type BadgeItem = {
    x: number;
    y: number;
    z: number;
    base: HelixBase;
    color: string;
    key: string;
  };

  const badgeItems: BadgeItem[] = [];
  rungs.forEach((rung, i) => {
    badgeItems.push({
      x: pointsA[i].x,
      y: pointsA[i].y,
      z: pointsA[i].z,
      base: rung.left,
      color: rung.color,
      key: `left-${i}`,
    });
    if (rung.right) {
      badgeItems.push({
        x: pointsB[i].x,
        y: pointsB[i].y,
        z: pointsB[i].z,
        base: rung.right,
        color: rung.color,
        key: `right-${i}`,
      });
    }
  });

  badgeItems.sort((a, b) => a.z - b.z);

  return (
    <section className="motif-band helix-band" aria-hidden="true">
      <div className="shell motif-band__inner">
        <div className="helix-band__visual">
          <svg viewBox={`0 0 ${width} ${height}`} className="helix-band__svg">
            {rungs.map((rung, i) => (
              <line
                key={`bond-${i}`}
                x1={pointsA[i].x.toFixed(1)}
                y1={pointsA[i].y.toFixed(1)}
                x2={pointsB[i].x.toFixed(1)}
                y2={pointsB[i].y.toFixed(1)}
                className="tech-helix__bond"
                style={{ stroke: rung.color }}
              />
            ))}
            <path d={strandAPath} className="tech-helix__strand" />
            <path d={strandBPath} className="tech-helix__strand" />
            {badgeItems.map((item) => {
              const scale = 0.75 + 0.25 * ((item.z + 1) / 2);
              const opacity = 0.6 + 0.4 * ((item.z + 1) / 2);
              return (
                <g
                  key={item.key}
                  transform={`translate(${item.x.toFixed(1)}, ${item.y.toFixed(1)}) scale(${scale.toFixed(2)})`}
                  opacity={opacity.toFixed(2)}
                  className="tech-helix__badge"
                >
                  <circle r="13" style={{ stroke: item.color }} />
                  {item.base.path ? (
                    <g transform={`scale(${HELIX_ICON_SCALE}) translate(-12, -12)`}>
                      <path d={item.base.path} style={{ fill: item.color }} />
                    </g>
                  ) : item.base.asset ? (
                    <image href={item.base.asset} x="-10" y="-10" width="20" height="20" preserveAspectRatio="xMidYMid meet" />
                  ) : (
                    <text x="0" y="0" textAnchor="middle" dominantBaseline="central" style={{ fill: item.color }}>
                      {item.base.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <p className="motif-band__note">
          {locale === "es" ? "Stack & Arquitectura — Hélice Tecnológica" : "Stack & Architecture — Tech Helix"}
        </p>
      </div>
    </section>
  );
}
