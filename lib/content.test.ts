import { describe, expect, it } from "vitest";
import { getAlternateLocale, getEnglishPathFromSpanish, getLocalizedPath, getProject, getProjects } from "./content";

describe("portfolio content", () => {
  it("keeps the four case studies available in both locales", () => {
    expect(getProjects("en")).toHaveLength(4);
    expect(getProjects("es")).toHaveLength(4);
    expect(getProject("en", "e-grua")?.title).toBe("E‑Grúa");
    expect(getProject("es", "e-grua")?.title).toBe("E‑Grúa");
  });

  it("maps equivalent language routes", () => {
    expect(getLocalizedPath("es", "/")).toBe("/es/");
    expect(getLocalizedPath("es", "/work/rust-dashboard/")).toBe("/es/proyectos/rust-dashboard/");
    expect(getEnglishPathFromSpanish("/es/proyectos/rust-dashboard/")).toBe("/work/rust-dashboard/");
    expect(getEnglishPathFromSpanish("/es/sobre-mi/")).toBe("/about/");
  });

  it("exposes only the two supported locales", () => {
    expect(getAlternateLocale("en")).toBe("es");
    expect(getAlternateLocale("es")).toBe("en");
  });
});
