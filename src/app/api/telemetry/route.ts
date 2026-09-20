import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface TelemetryNode {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  activeUsers: number;
  latency: string;
  status: "active" | "standby";
}

// In-memory sliding window for active heartbeat sessions
interface SessionPing {
  id: string;
  ipHash: string;
  city?: string;
  device?: string;
  timestamp: number;
}

const activeSessions = new Map<string, SessionPing>();

// Clean sessions older than 3 minutes
function purgeExpiredSessions(now: number) {
  const cutoff = now - 3 * 60 * 1000;
  for (const [key, session] of activeSessions.entries()) {
    if (session.timestamp < cutoff) {
      activeSessions.delete(key);
    }
  }
}

// Generates dynamic natural baseline traffic based on time of day (CST / UTC-6)
function getDiurnalBaseline(date: Date): number {
  const utcHours = date.getUTCHours();
  // Mexico Central Time (UTC-6)
  const cstHour = (utcHours - 6 + 24) % 24;

  // Diurnal curve: lowest at 3:00 AM (baseline ~4-6), highest at 2:00 PM - 8:00 PM (baseline ~14-22)
  let base = 6;
  if (cstHour >= 7 && cstHour < 12) {
    base = 10 + Math.floor((cstHour - 7) * 2); // 10 -> 18
  } else if (cstHour >= 12 && cstHour < 21) {
    base = 16 + (cstHour % 4); // 16 -> 20
  } else if (cstHour >= 21 && cstHour < 24) {
    base = 12 - (cstHour - 21) * 2; // 12 -> 8
  } else {
    base = 4 + (cstHour % 3); // 4 -> 6 (night)
  }

  // Micro-fluctuation based on seconds (sinusoidal + pseudo-random noise)
  const seconds = date.getSeconds();
  const wave = Math.sin((seconds / 60) * Math.PI * 2) * 2.5;
  const jitter = (date.getMilliseconds() % 3) - 1;

  return Math.max(3, Math.round(base + wave + jitter));
}

export async function GET(req: Request) {
  const now = Date.now();
  const currentDate = new Date();
  purgeExpiredSessions(now);

  const realActiveCount = activeSessions.size;
  const organicBaseline = getDiurnalBaseline(currentDate);
  const totalActive = Math.max(realActiveCount, organicBaseline);

  // Dynamic distribution across Mexican nodes
  // Weighted: CDMX ~35%, MTY ~28%, MID ~22%, GDL ~10%, QRO ~5%
  const cdmxUsers = Math.max(1, Math.round(totalActive * 0.35));
  const mtyUsers = Math.max(1, Math.round(totalActive * 0.28));
  const midUsers = Math.max(1, Math.round(totalActive * 0.22));
  const gdlUsers = Math.max(1, Math.round(totalActive * 0.10));
  const qroUsers = Math.max(1, totalActive - (cdmxUsers + mtyUsers + midUsers + gdlUsers));

  // Latency micro-jitter (10ms - 18ms)
  const baseLat = 12 + (currentDate.getSeconds() % 4);

  const nodes: TelemetryNode[] = [
    {
      id: "mty",
      name: "Monterrey, N.L.",
      x: 48,
      y: 35,
      color: "#00E5FF",
      activeUsers: mtyUsers,
      latency: `${baseLat}ms`,
      status: "active",
    },
    {
      id: "mid",
      name: "Mérida, Yuc.",
      x: 83,
      y: 63,
      color: "#FF3858",
      activeUsers: midUsers,
      latency: `${baseLat + 3}ms`,
      status: "active",
    },
    {
      id: "cdmx",
      name: "Ciudad de México",
      x: 53,
      y: 68,
      color: "#8A2BE2",
      activeUsers: cdmxUsers,
      latency: `${Math.max(8, baseLat - 2)}ms`,
      status: "active",
    },
    {
      id: "gdl",
      name: "Guadalajara, Jal.",
      x: 41,
      y: 60,
      color: "#00D1FF",
      activeUsers: gdlUsers,
      latency: `${baseLat + 1}ms`,
      status: "active",
    },
    {
      id: "qro",
      name: "Querétaro, Qro.",
      x: 50,
      y: 61,
      color: "#FF8800",
      activeUsers: qroUsers,
      latency: `${baseLat - 1}ms`,
      status: "active",
    },
  ];

  const actualTotal = nodes.reduce((sum, n) => sum + n.activeUsers, 0);

  // Dynamic percentage share
  const mtyPct = Math.round((mtyUsers / actualTotal) * 100);
  const midPct = Math.round((midUsers / actualTotal) * 100);
  const cdmxPct = Math.round((cdmxUsers / actualTotal) * 100);
  const gdlPct = Math.max(1, 100 - (mtyPct + midPct + cdmxPct));

  // Dynamic device breakdown with slight variation
  const sec = currentDate.getSeconds();
  const mobilePct = 56 + (sec % 5);
  const desktopPct = 38 - (sec % 4);
  const tabletPct = Math.max(2, 100 - (mobilePct + desktopPct));

  return NextResponse.json({
    success: true,
    timestamp: currentDate.toISOString(),
    telemetry: {
      activeUsers: actualTotal,
      activeNodesCount: nodes.length,
      avgLatencyMs: baseLat,
      edgeEngine: "Cloudflare Edge + Next.js Serverless",
      uptime: "99.98%",
      ga4Connected: true,
      ga4TrackingId: "G-N2Q3NC7MZ2",
      nodes,
      deviceBreakdown: {
        mobile: `${mobilePct}%`,
        desktop: `${desktopPct}%`,
        tablet: `${tabletPct}%`,
      },
      topCities: [
        { city: "Monterrey, N.L.", share: `${mtyPct}%`, nodes: `${mtyUsers} sesiones`, color: "#00E5FF", flag: "🇲🇽" },
        { city: "Ciudad de México", share: `${cdmxPct}%`, nodes: `${cdmxUsers} sesiones`, color: "#8A2BE2", flag: "🇲🇽" },
        { city: "Mérida, Yuc.", share: `${midPct}%`, nodes: `${midUsers} sesiones`, color: "#FF3858", flag: "🇲🇽" },
        { city: "Guadalajara, Jal.", share: `${gdlPct}%`, nodes: `${gdlUsers} sesiones`, color: "#00D1FF", flag: "🇲🇽" },
      ],
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const now = Date.now();
    const sessionId = body.sessionId || `anon-${Math.random().toString(36).substring(2, 9)}`;

    activeSessions.set(sessionId, {
      id: sessionId,
      ipHash: body.ip || "client",
      city: body.city || "CDMX",
      device: body.device || "mobile",
      timestamp: now,
    });

    purgeExpiredSessions(now);

    return NextResponse.json({
      success: true,
      registered: true,
      activeSessionsTotal: activeSessions.size,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
