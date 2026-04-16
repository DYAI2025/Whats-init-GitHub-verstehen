import { Metadata } from "next";
import { notFound } from "next/navigation";
import { analyzeRepo, fetchGitHubMeta } from "@/lib/analyze";
import AnalysisCard from "@/components/AnalysisCard";
import Sidebar from "@/components/Sidebar";

interface PageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { owner, repo } = await params;
  return {
    title: `${owner}/${repo} — Analyse`,
    description: `Was macht ${owner}/${repo}? Kategorisierung, Installation und KI-Befehle auf einen Blick.`,
    openGraph: {
      title: `${owner}/${repo} | What's in it?`,
      description: `Verstehe ${repo} in 30 Sekunden: Kategorie, Kern-Nutzen und fertige KI-Prompts.`,
    },
  };
}

export default async function AnalysePage({ params }: PageProps) {
  const { owner, repo } = await params;

  // Fetch GitHub meta + run analysis in parallel where possible
  let analysis, ghData;
  try {
    [analysis, ghData] = await Promise.all([
      analyzeRepo(owner, repo),
      fetchGitHubMeta(owner, repo),
    ]);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unbekannter Fehler";
    if (message.includes("404") || message.includes("GitHub API error: 404")) {
      notFound();
    }
    // Surface the error to the error boundary
    throw err;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-600 mb-8">
        <a href="/" className="hover:text-slate-400 transition-colors">What&apos;s in it?</a>
        <span>/</span>
        <a
          href={`https://github.com/${owner}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-400 transition-colors"
        >
          {owner}
        </a>
        <span>/</span>
        <span className="text-slate-400">{repo}</span>
      </nav>

      {/* 70/30 Grid */}
      <div className="flex gap-8 items-start">
        {/* Main content — 70% */}
        <div className="flex-1 min-w-0">
          <AnalysisCard
            data={analysis}
            owner={owner}
            repo={repo}
            stars={ghData.stargazers_count}
          />
        </div>

        {/* Sidebar — 30%, sticky */}
        <div className="hidden lg:block shrink-0 w-[300px] sticky top-20">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
