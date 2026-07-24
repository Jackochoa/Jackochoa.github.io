import { describe, expect, it } from "vitest";
import { getAlternateLocale, getEnglishPathFromSpanish, getLocalizedPath, getProject, getProjects, stackGroups, stackProof } from "./content";
import type { ProjectCase } from "./content";

describe("portfolio content", () => {
  it("keeps ordered, equivalent case studies in both locales", () => {
    const expectedSlugs = ["e-grua", "briquette-lms", "rust-dashboard", "mitocircos-studio"];
    const enProjects = getProjects("en");
    const esProjects = getProjects("es");

    expect(enProjects.map((project) => project.slug)).toEqual(expectedSlugs);
    expect(esProjects.map((project) => project.slug)).toEqual(expectedSlugs);

    for (const enProject of enProjects) {
      const esProject = esProjects.find((project) => project.slug === enProject.slug);

      expect(esProject).toBeDefined();
      expect(enProject.services).toHaveLength(esProject!.services.length);
      expect(enProject.proof).toHaveLength(esProject!.proof.length);
      expect(enProject.media).toHaveLength(esProject!.media.length);
    }
  });

  it("provides complete, safe commercial case-study metadata", () => {
    for (const project of [...getProjects("en"), ...getProjects("es")]) {
      for (const field of [
        project.status,
        project.projectType,
        project.role,
        project.architectureSummary,
        project.privacyNotes,
      ]) {
        expect(field.trim()).not.toBe("");
      }

      expect(project.services.length).toBeGreaterThan(0);
      expect(project.proof.length).toBeGreaterThan(0);
      expect(project.services.every((service) => service.trim().length > 0)).toBe(true);
      expect(project.proof.every((item) => item.trim().length > 0)).toBe(true);

      const mediaItems: ProjectCase["media"] = project.media;
      for (const media of mediaItems) {
        expect(media).toMatchObject({
          path: expect.any(String),
          type: expect.any(String),
          alt: expect.any(String),
          caption: expect.any(String),
          aspectRatio: expect.any(String),
        });
        expect(media.path).toMatch(/^\/(?!\/)/);
        expect(media.path).not.toMatch(/https?:\/\//i);
        expect(media.path).not.toContain("..");
        expect(media.path).not.toMatch(/@|\b(?:\d{1,3}\.){3}\d{1,3}\b/i);
        expect(media.path).not.toMatch(/(?:token|api[_-]?key|secret|password|credential)[=:]/i);
      }
    }
  });

  it("keeps the expanded stack represented in the DNA and evidence map", () => {
    const items = stackGroups.flatMap((group) => group.items);
    const names = new Set(items.map((item) => item.name));

    expect([...names]).toEqual(expect.arrayContaining([
      "GitHub", "GitLab", "Conda", "Mamba", "Snakemake", "Perl", "R", "Biopython", "HTML", "CSS", "JavaScript",
    ]));
    expect(items.filter((item) => item.icon === null).every((item) => Boolean(item.badge))).toBe(true);
    expect(stackProof).toHaveLength(6);
    expect(stackProof.filter((proof) => proof.slug)).toHaveLength(4);
  });

  it("maps equivalent language routes", () => {
    expect(getLocalizedPath("es", "/")).toBe("/");
    expect(getLocalizedPath("es", "/work/rust-dashboard/")).toBe("/proyectos/rust-dashboard/");
    expect(getLocalizedPath("es", "/en/work/rust-dashboard/")).toBe("/proyectos/rust-dashboard/");
    expect(getLocalizedPath("en", "/work/rust-dashboard/")).toBe("/en/work/rust-dashboard/");
    expect(getLocalizedPath("en", "/en/work/rust-dashboard/")).toBe("/en/work/rust-dashboard/");
    expect(getEnglishPathFromSpanish("/proyectos/rust-dashboard/")).toBe("/en/work/rust-dashboard/");
    expect(getEnglishPathFromSpanish("/es/proyectos/rust-dashboard/")).toBe("/en/work/rust-dashboard/");
    expect(getEnglishPathFromSpanish("/es/sobre-mi/")).toBe("/en/about/");
  });

  it("exposes only the two supported locales", () => {
    expect(getAlternateLocale("en")).toBe("es");
    expect(getAlternateLocale("es")).toBe("en");
  });
});
