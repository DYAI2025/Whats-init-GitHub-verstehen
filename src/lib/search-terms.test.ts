import { describe, expect, it } from "vitest";
import { searchTerms } from "./search-terms";

describe("searchTerms", () => {
  it("returns exact matches first", () => {
    const results = searchTerms("mcp");
    expect(results[0]?.url).toBe("/wiki/mcp");
  });

  it("supports semantik-light synonym matches", () => {
    const results = searchTerms("künstliche intelligenz agent");
    expect(results.some((result) => result.url === "/wiki/agent")).toBe(true);
  });

  it("supports prefix based typing", () => {
    const results = searchTerms("pack");
    expect(results.some((result) => result.url === "/wiki/npm")).toBe(true);
  });
});
