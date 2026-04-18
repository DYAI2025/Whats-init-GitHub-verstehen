import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academy — Git & Open Source verstehen",
  description: "Lerne Git-Befehle, verstehe Open-Source-Konzepte und werde sicherer im Umgang mit GitHub-Repositories.",
};

const TOPICS = [
  {
    slug: "was-ist-ein-repository",
    icon: "📦",
    title: "Was ist ein Repository?",
    teaser: "Ein Repository ist der zentrale Speicherort für deinen Code — inklusive aller Versionen, Branches und Commit-Historie.",
    readTime: "3 min",
    category: "Grundlagen",
  },
  {
    slug: "git-clone-erklaert",
    icon: "🔗",
    title: "git clone erklärt",
    teaser: "Mit git clone lädst du eine vollständige Kopie eines Repositories herunter — inklusive aller Branches und der gesamten Historie.",
    readTime: "4 min",
    category: "Git-Befehle",
  },
  {
    slug: "npm-install-lokal-vs-global",
    icon: "📦",
    title: "npm install: lokal vs. global",
    teaser: "Was passiert wenn du npm install ohne -g ausführst? Und wann brauchst du das -g Flag? Der entscheidende Unterschied erklärt.",
    readTime: "5 min",
    category: "Node.js",
  },
  {
    slug: "was-ist-mcp",
    icon: "🔌",
    title: "Was ist das Model Context Protocol?",
    teaser: "MCP ist der Standard, der KI-Modelle mit externen Tools verbindet. Warum es existiert und wie du MCP-Server sicher einsetzt.",
    readTime: "6 min",
    category: "KI-Tools",
  },
  {
    slug: "github-stars-bedeutung",
    icon: "⭐",
    title: "Was sagen GitHub Stars wirklich aus?",
    teaser: "10.000 Stars klingen gut — aber bedeutet das auch, dass du das Projekt nutzen solltest? Stars im Kontext richtig einordnen.",
    readTime: "4 min",
    category: "GitHub",
  },
  {
    slug: "open-source-lizenzen",
    icon: "📄",
    title: "Open-Source-Lizenzen verstehen",
    teaser: "MIT, Apache, GPL — welche Lizenz erlaubt was? Eine klare Übersicht der wichtigsten Open-Source-Lizenzen und ihre Auswirkungen.",
    readTime: "7 min",
    category: "Grundlagen",
  },
];

const CATEGORIES = [...new Set(TOPICS.map((t) => t.category))];

const CATEGORY_COLORS: Record<string, string> = {
  Grundlagen: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Git-Befehle": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Node.js": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "KI-Tools": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  GitHub: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export default function LernenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <header className="mb-12">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
          bg-blue-500/15 text-blue-400 border-blue-500/30 mb-4">
          Academy
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          GitHub & Open Source verstehen
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Konzepte, Befehle und Hintergründe — damit du Repositories schneller einschätzen,
          besser einsetzen und sicherer entscheiden kannst.
        </p>
      </header>

      {/* Category Filter (static, no JS needed for basic display) */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm
          bg-blue-600 text-white font-medium">
          Alle
        </span>
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm border cursor-pointer
              hover:opacity-80 transition-opacity ${CATEGORY_COLORS[cat] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30"}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Topic Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOPICS.map((topic) => (
          <Link
            key={topic.slug}
            href={`/lernen/${topic.slug}`}
            className="group flex flex-col p-5 rounded-xl border border-slate-700/60 bg-slate-800/20
              hover:bg-slate-800/50 hover:border-slate-600/60 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-2xl">{topic.icon}</span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border
                ${CATEGORY_COLORS[topic.category] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30"}`}>
                {topic.category}
              </span>
            </div>
            <h2 className="text-base font-semibold text-slate-200 mb-2 group-hover:text-white transition-colors leading-snug">
              {topic.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
              {topic.teaser}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6.5" />
                <path d="M8 5v3.5l2 2" strokeLinecap="round" />
              </svg>
              {topic.readTime} Lesezeit
            </div>
          </Link>
        ))}
      </div>

      {/* Lexikon CTA */}
      <div className="mt-16 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10
        border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-slate-200 font-semibold mb-1">Noch mehr Begriffe im Lexikon</h3>
          <p className="text-sm text-slate-500">
            MCP, npm, Agents, Forks — alle wichtigen Konzepte kurz erklärt.
          </p>
        </div>
        <Link
          href="/wiki/mcp"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            border border-blue-500/40 text-blue-400 hover:bg-blue-500/10
            text-sm font-medium transition-colors"
        >
          Zum Lexikon →
        </Link>
      </div>
    </div>
  );
}
