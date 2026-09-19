"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2 } from "../../lib/icons";

export interface TelemetryNode {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  activeUsers: number;
  latency: string;
  status: "active" | "standby";
}

const DEFAULT_NODES: TelemetryNode[] = [
  { id: "mty", name: "Monterrey, N.L.", x: 48, y: 35, color: "#00E5FF", activeUsers: 3, latency: "12ms", status: "active" },
  { id: "mid", name: "Mérida, Yuc.", x: 83, y: 63, color: "#FF3858", activeUsers: 2, latency: "16ms", status: "active" },
  { id: "cdmx", name: "Ciudad de México", x: 53, y: 68, color: "#8A2BE2", activeUsers: 4, latency: "10ms", status: "active" },
  { id: "gdl", name: "Guadalajara, Jal.", x: 41, y: 60, color: "#00D1FF", activeUsers: 2, latency: "14ms", status: "active" },
  { id: "qro", name: "Querétaro, Qro.", x: 50, y: 61, color: "#FF8800", activeUsers: 1, latency: "11ms", status: "active" },
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
  const [nodes, setNodes] = useState<TelemetryNode[]>(DEFAULT_NODES);
  const [activeUsersCount, setActiveUsersCount] = useState<number>(12);
  const [hoveredNode, setHoveredNode] = useState<TelemetryNode | null>(null);
  const [isLive, setIsLive] = useState<boolean>(true);

  // Fetch telemetry from API with periodic heartbeat
  useEffect(() => {
    let isSubscribed = true;

    const fetchTelemetry = async () => {
      try {
        const res = await fetch("/api/telemetry");
        if (!res.ok) return;
        const data = await res.json();
        if (isSubscribed && data?.telemetry) {
          if (data.telemetry.nodes) setNodes(data.telemetry.nodes);
          if (data.telemetry.activeUsers) setActiveUsersCount(data.telemetry.activeUsers);
          setIsLive(true);
        }
      } catch {
        // Fallback gracefully to default
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black/80 border border-white/15 p-4 flex flex-col justify-between backdrop-blur-xl ${className}`}>
      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div>
            <span className="text-xs font-bold text-white block leading-none font-mono">
              RED DE NODOS EN VIVO
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              Monterrey • Mérida • CDMX
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            {activeUsersCount} activos
          </span>
        </div>
      </div>

      {/* Futuristic Map Canvas */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] my-2 flex items-center justify-center">
        {/* Subtle Cyber Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* SVG Stylized Mexico & Node Network */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,229,255,0.15)]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle stylized coastline / polygonal boundary */}
          <path
            d="M 12 18 L 26 22 L 32 30 L 45 32 L 54 28 L 65 34 L 74 48 L 84 56 L 92 62 L 95 68 L 86 74 L 75 70 L 60 76 L 48 78 L 38 72 L 28 60 L 20 48 L 14 32 Z"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.75"
            strokeDasharray="2,2"
          />

          {/* Connection Lines between Hubs */}
          <line x1="48" y1="35" x2="53" y2="68" stroke="rgba(0, 229, 255, 0.25)" strokeWidth="0.6" strokeDasharray="1,2" />
          <line x1="53" y1="68" x2="83" y2="63" stroke="rgba(255, 56, 88, 0.25)" strokeWidth="0.6" strokeDasharray="1,2" />
          <line x1="41" y1="60" x2="53" y2="68" stroke="rgba(138, 43, 226, 0.25)" strokeWidth="0.6" strokeDasharray="1,2" />
          <line x1="48" y1="35" x2="83" y2="63" stroke="rgba(255, 122, 0, 0.2)" strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Pulsing Coordinates Nodes */}
          {nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer Radar Ripple */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.5"
                  className="animate-ping opacity-60"
                  style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: "2.5s" }}
                />

                {/* Medium Glow Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? "4" : "2.8"}
                  fill={node.color}
                  fillOpacity="0.25"
                />

                {/* Center Core Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? "2.2" : "1.5"}
                  fill={node.color}
                  stroke="#ffffff"
                  strokeWidth="0.4"
                />

                {/* City Label */}
                <text
                  x={node.x}
                  y={node.y - 3.5}
                  textAnchor="middle"
                  fill="#E5E7EB"
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

        {/* Hover Tooltip Overlay */}
        {hoveredNode && (
          <div
            className="absolute z-20 pointer-events-none px-2.5 py-1.5 rounded-lg bg-black/95 border border-white/30 text-white font-mono text-[10px] shadow-2xl backdrop-blur-md transition-all"
            style={{
              left: `${hoveredNode.x}%`,
              top: `${Math.max(10, hoveredNode.y - 20)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-bold flex items-center gap-1" style={{ color: hoveredNode.color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
              {hoveredNode.name}
            </div>
            <div className="text-gray-300 text-[9px] flex items-center justify-between gap-2 mt-0.5">
              <span>{hoveredNode.activeUsers} sesiones</span>
              <span className="text-emerald-400 font-bold">{hoveredNode.latency}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Node Badges Row */}
      {showStats && (
        <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
          <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-gray-400 block text-[8px] uppercase">Monterrey</span>
            <span className="font-bold text-[#00E5FF]">3 Nodos</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-gray-400 block text-[8px] uppercase">Mérida</span>
            <span className="font-bold text-[#FF3858]">2 Nodos</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/5">
            <span className="text-gray-400 block text-[8px] uppercase">Latencia</span>
            <span className="font-bold text-emerald-400">&lt; 15ms</span>
          </div>
        </div>
      )}
    </div>
  );
}
