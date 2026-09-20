import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRestQuery } from "../../../../lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const now = new Date().toISOString();
  const config = getSupabaseConfig();
  const projectId = "ckqbxgntxpalwanfkusq";

  const results: Record<string, any> = {
    timestamp: now,
    projectId,
    status: "ok",
    pings: {},
  };

  try {
    // 1. Direct Ping to Supabase Root / REST endpoint to register network activity
    const endpointsToPing = [
      `${config.url}/rest/v1/`,
      `${config.url}/auth/v1/health`,
    ];

    for (const endpoint of endpointsToPing) {
      try {
        const headers: Record<string, string> = {};
        if (config.anonKey) {
          headers["apikey"] = config.anonKey;
          headers["Authorization"] = `Bearer ${config.anonKey}`;
        }
        const res = await fetch(endpoint, {
          method: "GET",
          headers,
          cache: "no-store",
        });
        results.pings[endpoint] = {
          status: res.status,
          ok: res.ok || res.status === 401 || res.status === 400 || res.status === 200,
        };
      } catch (e: any) {
        results.pings[endpoint] = { error: e.message };
      }
    }

    // 2. Query Supabase Table if configured
    if (config.anonKey) {
      const { data, error } = await supabaseRestQuery<any[]>("leads", {
        params: { select: "id", limit: "1" },
      });
      results.databaseQuery = {
        success: !error,
        leadsSample: data ? data.length : 0,
        error: error || null,
      };
    }

    return NextResponse.json({
      success: true,
      message: "Supabase Keep-Alive ping executed successfully to prevent project auto-pause.",
      details: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to execute keepalive ping",
        timestamp: now,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  return GET(req);
}
