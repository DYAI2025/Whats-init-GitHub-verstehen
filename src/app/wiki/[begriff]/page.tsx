import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ begriff: string }>;
}

// Static wiki entries — extend as needed
const WIKI: Record<string, { title: string; description: string; html: string; related: string[] }> = {
  mcp: {
    title: "MCP — Model Context Protocol",
    description: "Was ist MCP? Das Model Context Protocol verbindet KI-Modelle mit externen Datenquellen und Tools.",
    html: `
<h2>Was ist das Model Context Protocol?</h2>
<p>Das <strong>Model Context Protocol (MCP)</strong> ist ein offener Standard von Anthropic, der es KI-Modellen ermöglicht, sicher mit externen Datenquellen, APIs und Tools zu kommunizieren. Es definiert ein einheitliches Protokoll zwischen dem KI-Modell (Client) und den Datenquellen (Server).</p>

<h2>Warum existiert MCP?</h2>
<p>Vor MCP war jede KI-Integration eine Insellösung: Jedes Tool, jede API, jede Datenbank brauchte eine eigene, maßgeschneiderte Anbindung. Das führte zu fragmentierten Implementierungen, die schwer zu warten und zu erweitern waren. MCP löst dieses Problem durch Standardisierung.</p>

<h3>Das Client-Server-Modell</h3>
<p>MCP trennt zwei Verantwortlichkeiten klar voneinander:</p>
<ul>
  <li><strong>MCP Host</strong> — das KI-Interface (z.B. Claude Desktop, Cursor, VS Code mit Claude)</li>
  <li><strong>MCP Server</strong> — ein Dienst, der Daten oder Aktionen bereitstellt (z.B. GitHub, Notion, deine Datenbank)</li>
</ul>

<h2>Welche Fähigkeiten bieten MCP-Server?</h2>
<p>Ein MCP-Server kann drei Arten von Fähigkeiten bereitstellen: <strong>Resources</strong> (Lesezugriff auf Daten), <strong>Tools</strong> (ausführbare Aktionen) und <strong>Prompts</strong> (vordefinierte Anweisungsvorlagen).</p>

<h2>Sicherheitsaspekte bei MCP</h2>
<p>Da MCP-Server Zugriff auf externe Systeme haben, ist eine sorgfältige Konfiguration entscheidend. Jeder MCP-Server erweitert den Kontext des Modells — und damit potenziell auch seine Angriffsfläche. Prüfe genau, welche Berechtigungen ein MCP-Server anfordert, bevor du ihn installierst.</p>

<h3>Token-Budget beachten</h3>
<p>MCP-Server können Resources bereitstellen, die automatisch in den Kontext des Modells geladen werden. Große Dateiinhalte oder viele gleichzeitig aktive Server können das Token-Budget erheblich belasten — und damit die Kosten pro Anfrage steigern.</p>
    `,
    related: ["claude-desktop", "anthropic-api", "llm", "agent"],
  },
  "claude-desktop": {
    title: "Claude Desktop",
    description: "Claude Desktop ist die lokale App von Anthropic für macOS und Windows mit MCP-Unterstützung.",
    html: `
<h2>Was ist Claude Desktop?</h2>
<p><strong>Claude Desktop</strong> ist die native Desktop-Anwendung von Anthropic für macOS und Windows. Im Gegensatz zur Web-Version von claude.ai bietet Claude Desktop native Integration mit dem Betriebssystem und volle Unterstützung für MCP-Server.</p>

<h2>MCP-Server in Claude Desktop einrichten</h2>
<p>Claude Desktop liest seine MCP-Konfiguration aus einer JSON-Datei. Auf macOS liegt diese unter <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>, auf Windows unter <code>%APPDATA%\\Claude\\claude_desktop_config.json</code>.</p>

<h3>Beispielkonfiguration</h3>
<pre><code>{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}</code></pre>

<h2>Wann Claude Desktop statt claude.ai?</h2>
<p>Claude Desktop ist die bessere Wahl, wenn du MCP-Server nutzen oder lokale Dateien direkt in Gespräche einbinden möchtest. Für einfache Konversationen ist die Web-Version ausreichend.</p>
    `,
    related: ["mcp", "anthropic-api"],
  },
  npm: {
    title: "npm — Node Package Manager",
    description: "npm ist der Standard-Paketmanager für JavaScript und Node.js.",
    html: `
<h2>Was ist npm?</h2>
<p><strong>npm</strong> (Node Package Manager) ist der Standard-Paketmanager für das JavaScript-Ökosystem. Er ist in Node.js integriert und ermöglicht das Installieren, Verwalten und Veröffentlichen von Paketen aus dem npm-Registry.</p>

<h2>Lokal vs. Global installieren</h2>
<p>Der wichtigste Unterschied bei npm ist die Unterscheidung zwischen lokaler und globaler Installation:</p>
<ul>
  <li><strong>Lokal</strong> (<code>npm install paket</code>) — Das Paket wird nur im aktuellen Projekt installiert, in <code>node_modules/</code>. Es steht nur diesem Projekt zur Verfügung.</li>
  <li><strong>Global</strong> (<code>npm install -g paket</code>) — Das Paket wird systemweit installiert und steht als CLI-Befehl überall zur Verfügung.</li>
</ul>

<h3>Wann global installieren?</h3>
<p>CLI-Tools wie <code>typescript</code>, <code>eslint</code> oder MCP-Server werden häufig global installiert, wenn du sie nicht als Projektabhängigkeit führen möchtest. Für reproduzierbare Builds ist eine lokale Installation mit fixer Version in <code>package.json</code> vorzuziehen.</p>

<h2>npx — ohne Installation ausführen</h2>
<p><code>npx</code> führt ein npm-Paket direkt aus, ohne es zu installieren. Das ist nützlich für einmalige Befehle oder für MCP-Server (<code>npx -y @modelcontextprotocol/server-github</code>).</p>
    `,
    related: ["node-js", "pnpm", "bun"],
  },
  agent: {
    title: "Autonomer Agent",
    description: "Was ist ein KI-Agent? Autonome Agenten führen mehrstufige Aufgaben selbstständig aus.",
    html: `
<h2>Was ist ein autonomer KI-Agent?</h2>
<p>Ein <strong>autonomer Agent</strong> ist ein KI-System, das selbstständig Entscheidungen trifft und Aktionen ausführt, um ein definiertes Ziel zu erreichen — ohne für jeden Schritt menschliche Eingabe zu benötigen. Im Gegensatz zu einfachen Chatbots können Agenten Tools nutzen, Code ausführen, auf das Dateisystem zugreifen und externe APIs aufrufen.</p>

<h2>Wie funktionieren Agenten?</h2>
<p>Agenten arbeiten in einem sogenannten <strong>ReAct-Loop</strong>: Sie beobachten (Reason), entscheiden sich für eine Aktion (Act) und nutzen das Ergebnis für den nächsten Schritt. Dieser Zyklus wiederholt sich, bis das Ziel erreicht ist oder der Agent stoppt.</p>

<h3>Typische Fähigkeiten eines Agenten</h3>
<ul>
  <li>Code schreiben und ausführen</li>
  <li>Dateien lesen und schreiben</li>
  <li>Web-Suche und URL-Abruf</li>
  <li>Shell-Befehle ausführen</li>
  <li>APIs aufrufen (GitHub, Notion, etc.)</li>
</ul>

<h2>Sicherheit und Deployment</h2>
<p>Autonome Agenten mit Shell- oder Dateizugriff sollten nicht unbeaufsichtigt auf dem eigenen Rechner laufen. Empfohlen wird der Betrieb auf einem isolierten VPS (Virtual Private Server) mit eingeschränkten Berechtigungen, Logging und klaren Grenzen für Ressourcennutzung. So behältst du die Kontrolle, ohne die Produktivität einzuschränken.</p>
    `,
    related: ["mcp", "llm", "claude-desktop"],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { begriff } = await params;
  const entry = WIKI[decodeURIComponent(begriff)];
  if (!entry) return { title: "Begriff nicht gefunden" };

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: `${entry.title} | What's in it? Lexikon`,
      description: entry.description,
    },
  };
}

export default async function WikiPage({ params }: PageProps) {
  const { begriff } = await params;
  const slug = decodeURIComponent(begriff);
  const entry = WIKI[slug];

  if (!entry) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
        <a href="/" className="hover:text-slate-400 transition-colors">What&apos;s in it?</a>
        <span>/</span>
        <a href="/wiki/mcp" className="hover:text-slate-400 transition-colors">Lexikon</a>
        <span>/</span>
        <span className="text-slate-400">{slug}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
          bg-blue-500/15 text-blue-400 border-blue-500/30 mb-4">
          Lexikon
        </div>
        <h1 className="text-3xl font-bold text-slate-100 mb-3">{entry.title}</h1>
        <p className="text-lg text-slate-400 leading-relaxed">{entry.description}</p>
      </header>

      {/* Content */}
      <div
        className="prose-dark"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />

      {/* Related terms */}
      {entry.related.length > 0 && (
        <section className="mt-12 pt-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-600 uppercase tracking-wide mb-3">Verwandte Begriffe</p>
          <div className="flex flex-wrap gap-2">
            {entry.related.map((rel) => (
              <a
                key={rel}
                href={`/wiki/${encodeURIComponent(rel)}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm
                  bg-slate-800/60 text-slate-400 border border-slate-700/60
                  hover:bg-slate-700/60 hover:text-slate-200 hover:border-slate-600
                  transition-all"
              >
                {rel}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Back CTA */}
      <div className="mt-12 p-6 rounded-xl bg-slate-800/30 border border-slate-700/60 text-center">
        <p className="text-sm text-slate-400 mb-4">Analysiere ein Repository direkt</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          Repository analysieren →
        </a>
      </div>
    </div>
  );
}
