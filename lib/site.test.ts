import { describe, expect, it } from "vitest";
import { mailto, pageMetadata, site } from "./site";

describe("contact link", () => {
  it("uses the approved public mailbox and localized subject", () => {
    expect(mailto("en")).toContain(`mailto:${site.email}`);
    expect(mailto("en")).toContain("A%20conversation%20about%20a%20web%20product");
    expect(mailto("es")).toContain("Conversaci%C3%B3n%20sobre%20un%20producto%20web");
  });
});

describe("localized metadata", () => {
  it("keeps canonical and alternate routes paired", () => {
    const metadata = pageMetadata({
      locale: "es",
      title: "Proyectos seleccionados",
      description: "Casos sanitizados.",
      englishPath: "/en/work/",
      spanishPath: "/proyectos/",
    });

    expect(metadata.alternates?.canonical).toBe("https://jacksonochoa.page/proyectos/");
    expect(metadata.alternates?.languages?.en).toBe("https://jacksonochoa.page/en/work/");
    expect(metadata.alternates?.languages?.es).toBe("https://jacksonochoa.page/proyectos/");
    expect(metadata.openGraph?.url).toBe("https://jacksonochoa.page/proyectos/");
  });
});
