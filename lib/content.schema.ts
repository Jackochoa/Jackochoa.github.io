import { z } from "zod";
import type { ProjectCase } from "./content";

/* Validation for the static content in `content.ts`. It lives here, and is only
 * loaded by the test suite, so Zod never reaches the client bundle. */

export const ProjectSchema = z.object({
  slug: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  outcome: z.string().min(1),
  category: z.string().min(1),
  stack: z.array(z.string()).min(1),
  accent: z.enum(["moss", "clay", "sun", "sage"]),
  scope: z.string().min(1),
  status: z.string().min(1),
  projectType: z.string().min(1),
  role: z.string().min(1),
  services: z.array(z.string()).min(1),
  proof: z.array(z.string()).min(1),
  media: z.array(z.object({
    path: z.string().min(1),
    type: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().min(1),
    aspectRatio: z.string().min(1),
  })),
  architectureSummary: z.string().min(1),
  privacyNotes: z.string().min(1),
  year: z.string().min(1),
  problem: z.string().min(1),
  decisions: z.array(z.string()).min(2),
  evidence: z.array(z.string()).min(2),
  lessons: z.array(z.string()).min(2),
  visualLabel: z.string().min(1),
  visualDetail: z.string().min(1),
});

/* Compile-time guard so the hand-written ProjectCase type and this schema
 * cannot drift apart. Fails `tsc --noEmit` if either side changes alone. */
type Assert<T extends true> = T;
type Mutual<A, B> = A extends B ? (B extends A ? true : false) : false;
export type SchemaMatchesProjectCase = Assert<Mutual<z.infer<typeof ProjectSchema>, ProjectCase>>;
