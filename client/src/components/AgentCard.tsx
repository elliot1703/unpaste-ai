"use client";

import { useState } from "react";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: "online" | "learning" | "offline";
  description: string;
  tools: string[];
  metrics: {
    efficiency: number;
    accuracy: number;
    uptime: number;
    satisfaction: number;
  };
  activity: {
    time: string;
    action: string;
  }[];
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusColor = agent.status === "online" ? "#22C55E" : agent.status === "learning" ? "#F59E0B" : "#71717A";

  return (
    <div
      className={`relative bg-[#FAFAFA] transition-all duration-300 ${isHovered ? "translate-y-[-4px]" : ""}`}
      style={{
        border: "2px dashed #DC2626",
        backgroundImage: `
          linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#DC2626]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#DC2626]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#DC2626]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#DC2626]" />

      {/* Header */}
      <div className="px-5 py-4 border-b border-dashed border-[#DC2626]/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold tracking-widest text-[#09090B] font-mono">
              {agent.name}-{agent.id} <span className="text-[#71717A] font-normal">// {agent.role.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 relative"
              style={{
                border: `1px solid ${statusColor}`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: statusColor }}
                />
              </div>
              {/* Crosshair lines */}
              <div className="absolute top-1/2 -left-2 w-1.5 h-px -translate-y-1/2" style={{ backgroundColor: statusColor }} />
              <div className="absolute top-1/2 -right-2 w-1.5 h-px -translate-y-1/2" style={{ backgroundColor: statusColor }} />
              <div className="absolute -top-2 left-1/2 w-px h-1.5 -translate-x-1/2" style={{ backgroundColor: statusColor }} />
              <div className="absolute -bottom-2 left-1/2 w-px h-1.5 -translate-x-1/2" style={{ backgroundColor: statusColor }} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-mono" style={{ color: statusColor }}>
              {agent.status}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Description with annotation line */}
        <div className="relative pl-6">
          <div className="absolute left-0 top-2 w-4 border-t border-[#DC2626]/50" />
          <div className="absolute left-4 top-2 w-px h-full border-l border-[#DC2626]/50" />
          <p className="text-xs text-[#09090B]/70 leading-relaxed font-mono">
            {agent.description}
          </p>
        </div>

        {/* Tools - hexagonal style */}
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool, i) => (
            <div
              key={i}
              className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-[#DC2626]/5 text-[#DC2626] border border-[#DC2626]/30 font-mono"
              style={{
                clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)",
              }}
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Metrics - Circular gauges */}
        <div className="grid grid-cols-4 gap-3">
          {Object.entries(agent.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="relative w-12 h-12 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E4E4E7"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeDasharray={`${value}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#09090B]">{value}</span>
                </div>
              </div>
              <div className="text-[8px] uppercase tracking-wider text-[#71717A] mt-1 font-mono">
                {key}
              </div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="border-t border-dashed border-[#DC2626]/30 pt-3 space-y-1">
          {agent.activity.map((log, i) => (
            <div key={i} className="text-[10px] text-[#09090B]/60 font-mono">
              <span className="text-[#DC2626]">{log.time}</span> — {log.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
