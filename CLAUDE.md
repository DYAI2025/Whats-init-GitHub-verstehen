# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This App Does

**What's in it?** is a German-language Next.js web app that analyzes GitHub repositories using the Anthropic Claude API. Users paste a GitHub URL, the app fetches repo metadata + README via GitHub API, sends it to Claude (`claude-sonnet-4-6`), and renders structured analysis (category, core benefit, installation commands, AI prompts, SEO deep-dive HTML).

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite exists yet.

## Environment Setup

```bash
cp .env.local.example .env.local
# Required: ANTHROPIC_API_KEY
# Optional: GITHUB_TOKEN (raises rate limit from 60 to 5000 req/h)
```

## Architecture

### Data Flow

1. User submits GitHub URL → Server Action in `src/app/page.tsx` redirects to `/analyse/[owner]/[repo]`
2. Analysis page (`src/app/analyse/[owner]/[repo]/page.tsx`) calls `analyzeRepo()` and `fetchGitHubMeta()` in parallel
3. `src/lib/analyze.ts` — core logic: fetches GitHub API + README, calls Anthropic API, parses JSON response, caches result in memory (24h TTL)
4. `POST /api/analyze` also exposes this as an API route (for client-side use if needed)

### Key Design Decisions

**In-memory cache** in `src/lib/analyze.ts`: `Map<string, { data, ts }>` with 24h TTL. Comment in code says "replace with Redis/Vercel KV in production."

**LLM response format**: Claude is prompted to return strict JSON (no markdown wrapper). The parser tries `JSON.parse()` directly, falls back to regex extraction `/{[\s\S]+}/`.

**`smartRecommendation` field**: Only populated for known autonomous agents with shell/code execution. Should be `null` for 95% of repos (libraries, frameworks, CLIs). This is a deliberate product decision — don't change this behavior.

**Language**: The entire UI and LLM system prompt are in German. AI prompts returned by Claude are also in German.

### Routes

| Route | Purpose |
|---|---|
| `/` | Home — URL input form |
| `/analyse/[owner]/[repo]` | Analysis result page (SSR) |
| `/wiki/[begriff]` | Tech glossary (static entries in-file) |
| `/lernen` | Academy overview page (static content) |
| `POST /api/analyze` | API endpoint wrapping `analyzeRepo()` |

### Component Structure

- `AnalysisCard` — client component rendering the full analysis (category badge, stars, installation code boxes, AI prompts, SEO HTML via `dangerouslySetInnerHTML`)
- `CopyButton` — client component for clipboard copy
- `Sidebar` — sticky sidebar on analysis pages (30% column)

### Types

`src/types/analysis.ts` defines `AnalysisResult` (LLM output shape) and `GitHubRepo` (GitHub API response shape). The LLM JSON schema must stay in sync with `AnalysisResult`.

## Adding Wiki Entries

Wiki entries are hardcoded in `src/app/wiki/[begriff]/page.tsx` in the `WIKI` constant. Add new entries there — no database needed.

## Extending Analysis Categories

The `category` field in `AnalysisResult` maps to color classes in `src/components/AnalysisCard.tsx` (`CATEGORY_COLORS`). If adding a new category to the LLM prompt, add the corresponding Tailwind class mapping there.
