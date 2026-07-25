import * as icons from "simple-icons";

/* simple-icons is indexed dynamically by slug, which defeats tree-shaking and
 * pulls all ~3.4k icons into whatever bundle imports it. Keep this module out
 * of every client component's import graph: resolve paths on the server and
 * pass the resulting strings down as props. */
export function iconPath(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return (icons as Record<string, { path: string } | undefined>)[slug]?.path ?? null;
}
