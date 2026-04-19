"use client";

import Image from "next/image";
import { AnalysisResult } from "@/types/analysis";
import CopyButton from "./CopyButton";

const CATEGORY_COLORS: Record<string, string> = {
  Library:        "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Framework:      "bg-violet-500/15 text-violet-400 border-violet-500/30",
  CLI:            "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Agent:          "bg-red-500/15 text-red-400 border-red-500/30",
  MCP:            "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Design System":"bg-pink-500/15 text-pink-400 border-pink-500/30",
  Template:       "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Web App":      "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Toolkit:        "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

interface CodeBoxProps {
  label: string;
  command: string;
  sublabel?: string;
}

function CodeBox({ label, command, sublabel }: CodeBoxProps) {
  return (
    <div className="rounded-lg border border-slate-700/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60 border-b border-slate-700/60">
        <div>
          <span className="text-xs font-medium text-slate-300">{label}</span>
          {sublabel && (
            <span className="ml-2 text-xs text-slate-500">{sublabel}</span>
          )}
        </div>
        <CopyButton text={command} />
      </div>
      <pre className="px-4 py-3 text-sm text-sky-300 font-mono overflow-x-auto bg-slate-900/40">
        <code>{command}</code>
      </pre>
    </div>
  );
}

interface AnalysisCardProps {
  data: AnalysisResult;
  owner: string;
  repo: string;
  stars: number;
  avatarUrl: string;
}

function ClaudeCommandBox({ label, prompt }: { label: string; prompt: string }) {
  return (
    <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-violet-500/10 border-b border-violet-500/20">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="text-xs font-medium text-violet-300">{label}</span>
        </div>
        <CopyButton text={prompt} />
      </div>
      <pre className="px-4 py-3 text-sm text-violet-200 font-mono whitespace-pre-wrap bg-violet-950/20">
        <code>{prompt}</code>
      </pre>
    </div>
  );
}

export default function AnalysisCard({ data, owner, repo, stars, avatarUrl }: AnalysisCardProps) {
  const categoryClass = CATEGORY_COLORS[data.category] ?? "bg-slate-500/15 text-slate-400 border-slate-500/30";

  return (
    <article className="space-y-10">

      {/* ── Header ── */}
      <section id="overview">
        <div className="flex flex-wrap items-start gap-3 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryClass}`}>
            {data.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
            </svg>
            {stars.toLocaleString("de-DE")} — <span className="text-slate-400">{data.starsInterpretation}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <Image
            src={avatarUrl}
            alt={`${owner} Logo`}
            width={56}
            height={56}
            className="rounded-xl border border-slate-700/60 shrink-0"
            unoptimized
          />
          <h1 className="text-3xl font-bold text-slate-100">
            {data.repoName}
          </h1>
        </div>
        <p className="text-lg text-slate-300 leading-relaxed">{data.coreBenefit}</p>

        <a
          href={`https://github.com/${owner}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
          {owner}/{repo} auf GitHub
        </a>
      </section>

      {/* ── Smart Recommendation (only for agents) ── */}
      {data.smartRecommendation && (
        <section id="recommendation"
          className="flex gap-3 p-4 rounded-lg bg-amber-500/8 border border-amber-500/25"
        >
          <span className="text-amber-400 mt-0.5 shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-amber-300 mb-1">Deployment-Empfehlung</p>
            <p className="text-sm text-amber-200/80 leading-relaxed">{data.smartRecommendation}</p>
          </div>
        </section>
      )}

      {/* ── Installation ── */}
      <section id="installation">
        <h2 className="text-xl font-semibold text-slate-100 mb-1">Installation</h2>
        <p className="text-sm text-slate-500 mb-4">Claude-Befehl zum direkten Einsetzen oder Terminal-Befehl</p>
        <div className="space-y-6">
          {data.installation.local && (
            <div className="space-y-2">
              <ClaudeCommandBox
                label="Claude-Befehl"
                prompt={`Installiere ${data.repoName} lokal in meinem aktuellen Projekt.`}
              />
              <CodeBox
                label="Lokal (Terminal)"
                command={data.installation.local}
                sublabel="nur für dieses Projekt"
              />
            </div>
          )}
          {data.installation.global && (
            <div className="space-y-2">
              <ClaudeCommandBox
                label="Claude-Befehl"
                prompt={`Installiere ${data.repoName} global auf meinem System.`}
              />
              <CodeBox
                label="Global (Terminal)"
                command={data.installation.global}
                sublabel="systemweit verfügbar"
              />
            </div>
          )}
          {data.installation.clone && (
            <div className="space-y-2">
              <ClaudeCommandBox
                label="Claude-Befehl"
                prompt={`Klone das Repository ${owner}/${repo} in den aktuellen Ordner und öffne es.`}
              />
              <CodeBox
                label="Repository klonen (Terminal)"
                command={data.installation.clone}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── AI Prompts ── */}
      {data.aiPrompts?.length > 0 && (
        <section id="ai-prompts">
          <h2 className="text-xl font-semibold text-slate-100 mb-1">KI-Befehle</h2>
          <p className="text-sm text-slate-500 mb-4">Direkt in Claude oder Cursor eingeben</p>
          <div className="grid gap-3">
            {data.aiPrompts.map((p, i) => (
              <div key={i} className="rounded-lg border border-slate-700/60 bg-slate-800/30 p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                    {p.intent}
                  </span>
                  <CopyButton text={p.prompt} />
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{p.prompt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Deep Dive ── */}
      {data.seoDeepDiveHtml && (
        <section id="deep-dive">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Deep Dive</h2>
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: data.seoDeepDiveHtml }}
          />
        </section>
      )}

      {/* ── Internal Links ── */}
      {data.keywordsForInternalLinking?.length > 0 && (
        <section id="related-topics" className="pt-4 border-t border-slate-800/60">
          <p className="text-xs text-slate-600 uppercase tracking-wide mb-3">Verwandte Begriffe</p>
          <div className="flex flex-wrap gap-2">
            {data.keywordsForInternalLinking.map((keyword) => (
              <a
                key={keyword}
                href={`/wiki/${encodeURIComponent(keyword.toLowerCase().replace(/\s+/g, "-"))}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm
                  bg-slate-800/60 text-slate-400 border border-slate-700/60
                  hover:bg-slate-700/60 hover:text-slate-200 hover:border-slate-600
                  transition-all"
              >
                {keyword}
              </a>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
