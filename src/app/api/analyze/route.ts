import { NextRequest, NextResponse } from "next/server";
import { analyzeRepo } from "@/lib/analyze";

export async function POST(req: NextRequest) {
  try {
    const { owner, repo } = await req.json();
    if (!owner || !repo) {
      return NextResponse.json({ error: "owner and repo required" }, { status: 400 });
    }

    const analysis = await analyzeRepo(owner, repo);
    return NextResponse.json(analysis);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";

    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
    }
    if (message.includes("GitHub API error: 404")) {
      return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }
    if (message.includes("GitHub API error: 403")) {
      return NextResponse.json({ error: "GitHub rate limit exceeded" }, { status: 429 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
