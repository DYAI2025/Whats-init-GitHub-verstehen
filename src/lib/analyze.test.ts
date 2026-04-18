import { describe, expect, it } from "vitest";
import { isValidGitHubIdentifier, parseAnalysisResult } from "./analyze";

describe("isValidGitHubIdentifier", () => {
  it("accepts valid GitHub owner/repo names", () => {
    expect(isValidGitHubIdentifier("vercel")).toBe(true);
    expect(isValidGitHubIdentifier("next-js")).toBe(true);
  });

  it("rejects unsafe values", () => {
    expect(isValidGitHubIdentifier("../etc/passwd")).toBe(false);
    expect(isValidGitHubIdentifier("hello/world")).toBe(false);
    expect(isValidGitHubIdentifier("space repo")).toBe(false);
  });
});

describe("parseAnalysisResult", () => {
  it("parses valid JSON", () => {
    const payload = JSON.stringify({
      repoName: "owner/repo",
      starsInterpretation: "Wächst schnell",
      category: "Library",
      coreBenefit: "Hilft beim Testen",
      smartRecommendation: null,
      installation: {
        local: "npm i demo",
        global: null,
        clone: "git clone https://github.com/owner/repo.git",
      },
      aiPrompts: [{ intent: "Installieren", prompt: "Hilf mir bei der Installation." }],
      seoDeepDiveHtml: "<h2>Deep Dive</h2><p>Inhalt</p>",
      keywordsForInternalLinking: ["mcp", "npm", "agent"],
    });

    const result = parseAnalysisResult(payload);
    expect(result.repoName).toBe("owner/repo");
    expect(result.aiPrompts).toHaveLength(1);
  });

  it("extracts JSON from wrapped model output", () => {
    const output = `Hier ist die Analyse:\n{"repoName":"owner/repo","starsInterpretation":"ok","category":"CLI","coreBenefit":"Nutzen","smartRecommendation":null,"installation":{"local":null,"global":"npm i -g demo","clone":"git clone https://github.com/owner/repo.git"},"aiPrompts":[{"intent":"Start","prompt":"Zeig mir den Einstieg"}],"seoDeepDiveHtml":"<h2>Deep Dive</h2><p>Text</p>","keywordsForInternalLinking":["mcp"]}`;

    const result = parseAnalysisResult(output);
    expect(result.category).toBe("CLI");
  });

  it("throws for malformed shape", () => {
    expect(() => parseAnalysisResult('{"repoName":"owner/repo"}')).toThrow(
      "LLM returned malformed analysis"
    );
  });
});
