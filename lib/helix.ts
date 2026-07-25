import { stackGroups, type StackEntry } from "./content";
import { iconPath } from "./icons";

/* Base pairs for the background helix, resolved on the server. The client
 * component receives finished SVG path strings so `simple-icons` stays out of
 * the browser bundle. */

const CATEGORY_VAR: Record<string, string> = {
  Languages: "var(--cat-lang)",
  "Web foundations": "var(--cat-web)",
  Frontend: "var(--cat-frontend)",
  Backend: "var(--cat-backend)",
  Data: "var(--cat-data)",
  "Delivery / collaboration": "var(--cat-delivery)",
  "Cloud / Infra": "var(--cat-cloud)",
};

export type HelixBase = { name: string; path: string | null; asset?: string; label: string };
export type HelixRung = { left: HelixBase; right: HelixBase | null; color: string };

function toBase(entry: StackEntry): HelixBase {
  return {
    name: entry.name,
    path: iconPath(entry.icon),
    asset: entry.asset,
    label: entry.badge ?? entry.name.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 4),
  };
}

/* One pass through the stack. The component repeats it to form a long strand —
 * repeating here instead would serialize the same icon paths four times into
 * every page's payload. */
export function buildBasePairs(): HelixRung[] {
  const pairs: HelixRung[] = [];
  for (const group of stackGroups) {
    const items = group.items;
    const color = CATEGORY_VAR[group.label.en] ?? "var(--accent)";
    for (let i = 0; i < items.length; i += 2) {
      pairs.push({ left: toBase(items[i]), right: items[i + 1] ? toBase(items[i + 1]) : null, color });
    }
  }
  return pairs;
}
