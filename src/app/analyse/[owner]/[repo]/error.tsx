"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AnalyseError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error tracking service in production
  }, [error]);

  const isApiKeyMissing = error.message?.includes("ANTHROPIC_API_KEY");
  const isGitHubError = error.message?.includes("GitHub API error");

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
        <svg className="w-6 h-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-slate-100 mb-3">
        {isApiKeyMissing ? "API-Key fehlt" : isGitHubError ? "Repository nicht gefunden" : "Analyse fehlgeschlagen"}
      </h1>

      <p className="text-slate-500 mb-6 leading-relaxed">
        {isApiKeyMissing
          ? "Bitte trage deinen Anthropic API-Key in die .env.local Datei ein."
          : isGitHubError
          ? "Dieses Repository existiert nicht oder ist privat."
          : "Die Analyse konnte nicht abgeschlossen werden. Bitte versuche es erneut."}
      </p>

      {isApiKeyMissing && (
        <div className="text-left mb-6 rounded-lg bg-slate-800/60 border border-slate-700/60 p-4">
          <pre className="text-sm text-sky-300 font-mono">
            ANTHROPIC_API_KEY=sk-ant-...
          </pre>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
