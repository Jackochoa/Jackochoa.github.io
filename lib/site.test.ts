import { describe, expect, it } from "vitest";
import { mailto, site } from "./site";

describe("contact link", () => {
  it("uses the approved public mailbox and localized subject", () => {
    expect(mailto("en")).toContain(`mailto:${site.email}`);
    expect(mailto("en")).toContain("A%20conversation%20about%20a%20web%20product");
    expect(mailto("es")).toContain("Conversaci%C3%B3n%20sobre%20un%20producto%20web");
  });
});
