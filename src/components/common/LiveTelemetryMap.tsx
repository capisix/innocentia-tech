"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, Globe } from "../../lib/icons";

export interface TelemetryNode {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  x: number; // Percentage on world map (0 - 100)
  y: number; // Percentage on world map (0 - 100)
  mxX?: number; // Coordinates when zoomed to Mexico
  mxY?: number;
  color: string;
  activeUsers: number;
  latency: string;
  status: "active" | "standby";
}

const DEFAULT_GLOBAL_NODES: TelemetryNode[] = [
  // México (Nodos Centrales)
  { id: "cdmx", name: "Ciudad de México", country: "México", countryCode: "🇲🇽", x: 23, y: 56, mxX: 53, mxY: 68, color: "#8A2BE2", activeUsers: 1, latency: "10ms", status: "active" },
  { id: "mty", name: "Monterrey, N.L.", country: "México", countryCode: "🇲🇽", x: 22, y: 51, mxX: 48, mxY: 35, color: "#00E5FF", activeUsers: 1, latency: "12ms", status: "active" },
  { id: "mid", name: "Mérida, Yuc.", country: "México", countryCode: "🇲🇽", x: 26, y: 55, mxX: 83, mxY: 63, color: "#FF3858", activeUsers: 0, latency: "16ms", status: "standby" },
  { id: "gdl", name: "Guadalajara, Jal.", country: "México", countryCode: "🇲🇽", x: 21, y: 55, mxX: 41, mxY: 60, color: "#00D1FF", activeUsers: 0, latency: "14ms", status: "standby" },
  { id: "qro", name: "Querétaro, Qro.", country: "México", countryCode: "🇲🇽", x: 23, y: 54, mxX: 50, mxY: 61, color: "#FF8800", activeUsers: 0, latency: "11ms", status: "standby" },

  // Estados Unidos (Tráfico Internacional detectado en GA4)
  { id: "usa_tx", name: "Austin / Dallas, TX", country: "Estados Unidos", countryCode: "🇺🇸", x: 23, y: 44, color: "#00E5FF", activeUsers: 1, latency: "24ms", status: "active" },
  { id: "usa_ca", name: "Silicon Valley, CA", country: "Estados Unidos", countryCode: "🇺🇸", x: 16, y: 41, color: "#38BDF8", activeUsers: 0, latency: "38ms", status: "standby" },
  { id: "usa_fl", name: "Miami, FL", country: "Estados Unidos", countryCode: "🇺🇸", x: 28, y: 48, color: "#A855F7", activeUsers: 0, latency: "28ms", status: "standby" },
  { id: "usa_ny", name: "New York, NY", country: "Estados Unidos", countryCode: "🇺🇸", x: 30, y: 39, color: "#60A5FA", activeUsers: 0, latency: "32ms", status: "standby" },

  // Canadá & Europa
  { id: "can_tor", name: "Toronto", country: "Canadá", countryCode: "🇨🇦", x: 28, y: 36, color: "#EF4444", activeUsers: 0, latency: "42ms", status: "standby" },
  { id: "esp_mad", name: "Madrid", country: "España", countryCode: "🇪🇸", x: 49, y: 39, color: "#F59E0B", activeUsers: 0, latency: "115ms", status: "standby" },
];

interface LiveTelemetryMapProps {
  variant?: "compact" | "full" | "public_hud";
  showStats?: boolean;
  className?: string;
}

export default function LiveTelemetryMap({
  variant = "full",
  showStats = true,
  className = "",
}: LiveTelemetryMapProps) {
  const [viewMode, setViewMode] = useState<"global" | "mexico">("global");
  const [nodes, setNodes] = useState<TelemetryNode[]>(DEFAULT_GLOBAL_NODES);
  const [activeUsersCount, setActiveUsersCount] = useState<number>(2);
  const [hoveredNode, setHoveredNode] = useState<TelemetryNode | null>(null);

  // Fetch telemetry from API with periodic heartbeat
  useEffect(() => {
    let isSubscribed = true;

    const fetchTelemetry = async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (!res.ok) return;
        const data = await res.json();
        if (isSubscribed && data?.telemetry) {
          if (data.telemetry.activeUsers) setActiveUsersCount(data.telemetry.activeUsers);
          if (data.telemetry.nodes) {
            // Merge active counts with global node registry
            setNodes((prev) =>
              prev.map((n) => {
                const apiNode = data.telemetry.nodes.find((an: any) => an.id === n.id);
                if (apiNode) {
                  return {
                    ...n,
                    activeUsers: apiNode.activeUsers,
                    status: apiNode.status,
                    latency: apiNode.latency,
                  };
                }
                return n;
              })
            );
          }
        }
      } catch {}
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  const displayedNodes = viewMode === "mexico"
    ? nodes.filter((n) => n.country === "México")
    : nodes;

  const totalActiveNodes = nodes.filter((n) => n.activeUsers > 0).length || 1;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-black/80 border border-white/15 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl ${className}`}>
      {/* Header Info & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 z-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div>
            <span className="text-xs font-bold text-white block leading-none font-mono">
              {viewMode === "global" ? "RED GLOBAL DE NODOS & TRÁFICO" : "RED DE NODOS • MÉXICO"}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {viewMode === "global" ? "🇲🇽 México • 🇺🇸 Estados Unidos • 🇨🇦 Canadá • 🇪🇸 Europa" : "Monterrey • CDMX • Mérida • GDL • QRO"}
            </span>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="p-0.5 rounded-xl bg-black/70 border border-white/10 flex items-center gap-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setViewMode("global")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "global"
                  ? "bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>🌎 Global (Mundial)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mexico")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "mexico"
                  ? "bg-[#00D1FF] text-black shadow-[0_0_12px_rgba(0,209,255,0.4)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>🇲🇽 México</span>
            </button>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold whitespace-nowrap">
            {activeUsersCount} activos ({totalActiveNodes} nodos)
          </span>
        </div>
      </div>

      {/* Futuristic Map Canvas */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.2/1] my-3 flex items-center justify-center overflow-hidden rounded-2xl bg-[#03060C]">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00D1FF15_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

        {viewMode === "global" ? (
          /* ========================================================================= */
          /* 1. HIGH-TECH GLOBAL WORLD MAP SVG */
          /* ========================================================================= */
          <svg
            viewBox="0 0 100 60"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,209,255,0.15)]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Equator & Latitudinal Grid Lines */}
            <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1,2" />
            <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" strokeDasharray="1,3" />
            <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" strokeDasharray="1,3" />

            {/* Continent Silhouettes (Stylized Cyber Vector Paths) */}
            {/* North America */}
            <path
              d="M 12 14 L 20 12 L 32 14 L 35 22 L 31 34 L 28 38 L 24 50 L 22 55 L 18 53 L 14 38 L 11 26 Z"
              fill="rgba(0, 209, 255, 0.05)"
              stroke="rgba(0, 209, 255, 0.25)"
              strokeWidth="0.4"
            />
            {/* South America */}
            <path
              d="M 28 44 L 34 46 L 36 54 L 33 66 L 30 72 L 27 64 L 26 50 Z"
              fill="rgba(255, 255, 255, 0.02)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.3"
            />
            {/* Europe */}
            <path
              d="M 46 22 L 56 20 L 58 30 L 52 38 L 47 36 L 45 28 Z"
              fill="rgba(255, 255, 255, 0.03)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.3"
            />
            {/* Africa */}
            <path
              d="M 48 34 L 58 35 L 61 46 L 56 60 L 50 56 L 47 42 Z"
              fill="rgba(255, 255, 255, 0.02)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.3"
            />
            {/* Asia */}
            <path
              d="M 58 18 L 75 16 L 85 24 L 88 38 L 78 44 L 66 38 L 60 28 Z"
              fill="rgba(255, 255, 255, 0.02)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.3"
            />
            {/* Australia */}
            <path
              d="M 80 50 L 90 48 L 92 58 L 82 60 Z"
              fill="rgba(255, 255, 255, 0.02)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.3"
            />

            {/* Inter-Continental Cyber Connection Arcs to CDMX/MTY */}
            <path d="M 23 44 Q 23 50 23 56" fill="none" stroke="rgba(0, 209, 255, 0.4)" strokeWidth="0.5" strokeDasharray="1,1" />
            <path d="M 16 41 Q 20 48 23 56" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.4" strokeDasharray="1,2" />
            <path d="M 28 36 Q 26 46 23 56" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="0.4" strokeDasharray="1,2" />
            <path d="M 49 39 Q 36 40 23 56" fill="none" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="0.4" strokeDasharray="2,2" />

            {/* Nodes Render */}
            {displayedNodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              const hasActiveUsers = node.activeUsers > 0;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer Radar Ripple for Active Nodes */}
                  {hasActiveUsers && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.4"
                      className="animate-ping opacity-75"
                      style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: "2.2s" }}
                    />
                  )}

                  {/* Node Halo */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? "2.5" : hasActiveUsers ? "1.8" : "1.2"}
                    fill={node.color}
                    fillOpacity={hasActiveUsers ? "0.35" : "0.15"}
                  />

                  {/* Center Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? "1.4" : hasActiveUsers ? "1.0" : "0.7"}
                    fill={node.color}
                    stroke="#ffffff"
                    strokeWidth="0.3"
                  />

                  {/* Country Flag / Label */}
                  <text
                    x={node.x}
                    y={node.y - 2.5}
                    textAnchor="middle"
                    fill={hasActiveUsers ? "#FFFFFF" : "#9CA3AF"}
                    fontSize="2"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  >
                    {node.countryCode} {node.name.split(",")[0].split("/")[0].trim()}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          /* ========================================================================= */
          /* 2. REGIONAL MEXICO DETAILED MAP SVG */
          /* ========================================================================= */
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M 12 18 L 26 22 L 32 30 L 45 32 L 54 28 L 65 34 L 74 48 L 84 56 L 92 62 L 95 68 L 86 74 L 75 70 L 60 76 L 48 78 L 38 72 L 28 60 L 20 48 L 14 32 Z"
              fill="rgba(0, 209, 255, 0.04)"
              stroke="rgba(0, 209, 255, 0.3)"
              strokeWidth="0.75"
              strokeDasharray="2,2"
            />

            {/* Connection Lines */}
            <line x1="48" y1="35" x2="53" y2="68" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="0.6" strokeDasharray="1,2" />
            <line x1="53" y1="68" x2="83" y2="63" stroke="rgba(255, 56, 88, 0.3)" strokeWidth="0.6" strokeDasharray="1,2" />
            <line x1="41" y1="60" x2="53" y2="68" stroke="rgba(138, 43, 226, 0.3)" strokeWidth="0.6" strokeDasharray="1,2" />

            {displayedNodes.map((node) => {
              const nx = node.mxX || node.x;
              const ny = node.mxY || node.y;
              const isHovered = hoveredNode?.id === node.id;
              const hasActiveUsers = node.activeUsers > 0;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {hasActiveUsers && (
                    <circle
                      cx={nx}
                      cy={ny}
                      r="6"
                      fill="none"
                      stroke={node.color}
                      strokeWidth="0.5"
                      className="animate-ping opacity-60"
                      style={{ transformOrigin: `${nx}px ${ny}px`, animationDuration: "2.2s" }}
                    />
                  )}

                  <circle cx={nx} cy={ny} r={isHovered ? "4" : "2.8"} fill={node.color} fillOpacity="0.25" />
                  <circle cx={nx} cy={ny} r={isHovered ? "2.2" : "1.5"} fill={node.color} stroke="#ffffff" strokeWidth="0.4" />

                  <text
                    x={nx}
                    y={ny - 3.5}
                    textAnchor="middle"
                    fill={hasActiveUsers ? "#FFFFFF" : "#9CA3AF"}
                    fontSize="3"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  >
                    {node.name.split(",")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div
            className="absolute z-20 pointer-events-none px-3 py-2 rounded-xl bg-black/95 border border-white/30 text-white font-mono text-[10px] shadow-2xl backdrop-blur-md transition-all"
            style={{
              left: `${viewMode === "global" ? hoveredNode.x : hoveredNode.mxX || hoveredNode.x}%`,
              top: `${Math.max(12, (viewMode === "global" ? hoveredNode.y : hoveredNode.mxY || hoveredNode.y) - 16)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-bold flex items-center gap-1.5" style={{ color: hoveredNode.color }}>
              <span>{hoveredNode.countryCode}</span>
              <span>{hoveredNode.name}</span>
            </div>
            <div className="text-gray-300 text-[9px] flex items-center justify-between gap-3 mt-1 pt-1 border-t border-white/10">
              <span>{hoveredNode.activeUsers > 0 ? `${hoveredNode.activeUsers} sesiones activas` : "Standby (Listo)"}</span>
              <span className="text-emerald-400 font-bold">{hoveredNode.latency}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Country Breakdown Row */}
      {showStats && (
        <div className="pt-2.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 space-y-0.5">
            <span className="text-gray-400 block text-[9px] uppercase">🇲🇽 México</span>
            <span className="font-bold text-[#00E5FF]">88% Tráfico</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 space-y-0.5">
            <span className="text-gray-400 block text-[9px] uppercase">🇺🇸 Estados Unidos</span>
            <span className="font-bold text-[#38BDF8]">8% Tráfico</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 space-y-0.5">
            <span className="text-gray-400 block text-[9px] uppercase">🇨🇦 Canadá / LATAM</span>
            <span className="font-bold text-purple-400">4% Tráfico</span>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 space-y-0.5">
            <span className="text-gray-400 block text-[9px] uppercase">Latencia Global</span>
            <span className="font-bold text-emerald-400">&lt; 25ms Edge</span>
          </div>
        </div>
      )}
    </div>
  );
}
