export interface SearchTerm {
  title: string;
  description: string;
  url: string;
  category: "Lexikon" | "Academy";
  keywords: string[];
}

export const SEARCH_TERMS: SearchTerm[] = [
  {
    title: "Model Context Protocol (MCP)",
    description: "Offener Standard von Anthropic, der KI-Modelle mit Tools verbindet.",
    url: "/wiki/mcp",
    category: "Lexikon",
    keywords: ["mcp", "model context protocol", "anthropic", "tools"],
  },
  {
    title: "Claude Desktop",
    description: "Die native App von Anthropic mit MCP-Unterstützung.",
    url: "/wiki/claude-desktop",
    category: "Lexikon",
    keywords: ["claude", "desktop", "anthropic", "app"],
  },
  {
    title: "npm — Node Package Manager",
    description: "Der Standard-Paketmanager für JavaScript und Node.js.",
    url: "/wiki/npm",
    category: "Lexikon",
    keywords: ["npm", "node", "package manager", "javascript"],
  },
  {
    title: "Autonomer Agent",
    description: "KI-Systeme, die selbstständig mehrstufige Aufgaben ausführen.",
    url: "/wiki/agent",
    category: "Lexikon",
    keywords: ["agent", "autonom", "ki", "ai"],
  },
  {
    title: "Academy — Überblick",
    description: "Alle Lernthemen auf einen Blick.",
    url: "/lernen",
    category: "Academy",
    keywords: ["academy", "lernen", "kurse", "tutorials"],
  },
];

const SYNONYMS: Record<string, string[]> = {
  ai: ["ki", "künstliche intelligenz"],
  ki: ["ai", "artificial intelligence"],
  tutorial: ["anleitung", "guide", "lernen"],
  lernen: ["tutorial", "academy", "kurs"],
  paketmanager: ["package manager", "npm"],
  agenten: ["agent", "autonom"],
};

function normalizeText(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenize(input: string): string[] {
  return normalizeText(input)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function buildQueryVariants(tokens: string[]): string[] {
  const variants = new Set(tokens);

  for (const token of tokens) {
    for (const synonym of SYNONYMS[token] ?? []) {
      variants.add(normalizeText(synonym));
    }
  }

  return [...variants];
}

export function searchTerms(query: string, limit = 6): SearchTerm[] {
  const normalizedQuery = normalizeText(query.trim());
  if (!normalizedQuery) return [];

  const queryTokens = tokenize(normalizedQuery);
  const queryVariants = buildQueryVariants(queryTokens);

  return SEARCH_TERMS
    .map((term) => {
      const title = normalizeText(term.title);
      const description = normalizeText(term.description);
      const keywordBlob = normalizeText(term.keywords.join(" "));
      const searchable = [title, description, keywordBlob].join(" ");
      const searchableTokens = new Set(tokenize(searchable));

      let score = 0;

      // Klassischer Volltreffer (Substring)
      if (searchable.includes(normalizedQuery)) {
        score += 15;
      }
      if (title.includes(normalizedQuery)) {
        score += 12;
      }

      // Semantik-light: Token- und Synonym-Überlappung
      for (const token of queryVariants) {
        if (searchableTokens.has(token)) {
          score += title.includes(token) ? 6 : 4;
        } else if (searchable.includes(token)) {
          score += 2;
        }
      }

      // Prefix-Bonus verbessert Tippgefühl bei angefangenen Begriffen
      for (const token of queryTokens) {
        if (token.length < 2) continue;
        if (title.split(/\s+/).some((word) => word.startsWith(token))) {
          score += 3;
        }
      }

      return { term, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.term);
}
