export interface AnalysisResult {
  repoName: string;
  starsInterpretation: string;
  category: string;
  coreBenefit: string;
  smartRecommendation: string | null;
  installation: {
    local: string | null;
    global: string | null;
    clone: string;
  };
  aiPrompts: Array<{
    intent: string;
    prompt: string;
  }>;
  seoDeepDiveHtml: string;
  keywordsForInternalLinking: string[];
}

export interface GitHubRepo {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  html_url: string;
  clone_url: string;
  homepage: string | null;
  license: { name: string } | null;
  updated_at: string;
}
