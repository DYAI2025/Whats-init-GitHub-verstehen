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

export function searchTerms(query: string, limit = 6): SearchTerm[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_TERMS
    .map((term) => {
      const hay = [term.title, term.description, ...term.keywords]
        .join(" ")
        .toLowerCase();
      const score = hay.includes(q) ? (term.title.toLowerCase().includes(q) ? 2 : 1) : 0;
      return { term, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.term);
}
