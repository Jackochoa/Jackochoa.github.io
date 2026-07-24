"use client";

import dynamic from "next/dynamic";
import { DnaHelix } from "./motifs";

/* Client wrapper: lazy-loads the WebGL helix (ssr:false is only allowed in a
 * client component) with the SVG helix as the loading / no-JS fallback. */
export const DnaHero = dynamic(() => import("./dna-helix-3d").then((m) => m.DnaHelix3D), {
  ssr: false,
  loading: () => <DnaHelix />,
});
