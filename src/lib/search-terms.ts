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

function addToSetMap(map: Map<string, Set<string>>, key: string, value: string): void {
  const existing = map.get(key);
  if (existing) {
    existing.add(value);
    return;
  }

  map.set(key, new Set([value]));
}

function buildSynonymMaps(): {
  direct: Map<string, Set<string>>;
  tokenToTerms: Map<string, Set<string>>;
} {
  const direct = new Map<string, Set<string>>();
  const tokenToTerms = new Map<string, Set<string>>();

  for (const [key, values] of Object.entries(SYNONYMS)) {
    const terms = new Set([normalizeText(key), ...values.map((value) => normalizeText(value))]);

    for (const term of terms) {
      for (const other of terms) {
        if (other !== term) {
          addToSetMap(direct, term, other);
        }
      }

      for (const token of tokenize(term)) {
        for (const relatedTerm of terms) {
          addToSetMap(tokenToTerms, token, relatedTerm);
        }
      }
    }
  }

  return { direct, tokenToTerms };
}

const SYNONYM_MAPS = buildSynonymMaps();

function buildQueryVariants(normalizedQuery: string, tokens: string[]): string[] {
  const variants = new Set([normalizedQuery, ...tokens]);
  const queue = [...variants];

  while (queue.length > 0) {
    const candidate = queue.shift();
    if (!candidate) continue;

    const expansions = [
      ...(SYNONYM_MAPS.direct.get(candidate) ?? []),
      ...(SYNONYM_MAPS.tokenToTerms.get(candidate) ?? []),
    ];

    for (const expansion of expansions) {
      if (variants.has(expansion)) continue;
      variants.add(expansion);
      queue.push(expansion);
    }
  }

  return [...variants];
}

export function searchTerms(query: string, limit = 6): SearchTerm[] {
  const normalizedQuery = normalizeText(query.trim());
  if (!normalizedQuery) return [];

  const queryTokens = tokenize(normalizedQuery);
  const queryVariants = buildQueryVariants(normalizedQuery, queryTokens);

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
