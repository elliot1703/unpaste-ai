"use client";

import { motion } from "framer-motion";
import { AgentCard, Agent } from "./AgentCard";

const agents: Agent[] = [
  {
    id: "001",
    name: "QUOTE",
    role: "Sales Assistant",
    status: "online",
    description: "Generates instant quotes for prospects based on inquiry details. Pulls pricing from your database, applies business rules, and delivers professional quotes in seconds.",
    tools: ["CRM", "Pricing API", "Email"],
    metrics: {
      efficiency: 94,
      accuracy: 98,
      uptime: 99,
      satisfaction: 96,
    },
    activity: [
      { time: "2m ago", action: "Generated quote for commercial cleaning inquiry" },
      { time: "15m ago", action: "Sent follow-up to pending quote #4521" },
    ],
  },
  {
    id: "002",
    name: "INTAKE",
    role: "Client Onboarding",
    status: "online",
    description: "Handles initial client inquiries 24/7. Qualifies leads, collects requirements, schedules discovery calls, and routes to the right team member.",
    tools: ["Calendar", "Forms", "Slack"],
    metrics: {
      efficiency: 91,
      accuracy: 95,
      uptime: 99,
      satisfaction: 93,
    },
    activity: [
      { time: "5m ago", action: "Scheduled discovery call for new lead" },
      { time: "22m ago", action: "Qualified inbound inquiry from website" },
    ],
  },
  {
    id: "003",
    name: "REPORT",
    role: "Analytics Builder",
    status: "online",
    description: "Creates automated SEO audits, performance reports, and client deliverables. Pulls data from multiple sources and synthesizes into actionable insights.",
    tools: ["Analytics", "SEMrush", "Sheets"],
    metrics: {
      efficiency: 89,
      accuracy: 97,
      uptime: 98,
      satisfaction: 94,
    },
    activity: [
      { time: "1h ago", action: "Generated monthly SEO report for client" },
      { time: "3h ago", action: "Compiled competitor analysis data" },
    ],
  },
  {
    id: "004",
    name: "SCHEDULER",
    role: "Calendar Manager",
    status: "online",
    description: "Books meetings, manages calendar conflicts, sends reminders, and handles rescheduling. Syncs across all your calendar apps and team members.",
    tools: ["Google Cal", "Zoom", "SMS"],
    metrics: {
      efficiency: 96,
      accuracy: 99,
      uptime: 99,
      satisfaction: 97,
    },
    activity: [
      { time: "8m ago", action: "Rescheduled client meeting to Thursday" },
      { time: "45m ago", action: "Sent reminder for upcoming workshop" },
    ],
  },
  {
    id: "005",
    name: "CONTENT",
    role: "Social Media Creator",
    status: "learning",
    description: "Generates on-brand social media posts, captions, and content calendars. Learns your voice, follows your style guide, and maintains consistent messaging.",
    tools: ["Canva", "Buffer", "ChatGPT"],
    metrics: {
      efficiency: 87,
      accuracy: 92,
      uptime: 97,
      satisfaction: 91,
    },
    activity: [
      { time: "30m ago", action: "Created 5 LinkedIn posts for next week" },
      { time: "2h ago", action: "Generated Instagram carousel content" },
    ],
  },
  {
    id: "006",
    name: "VIDEO",
    role: "E-commerce Producer",
    status: "learning",
    description: "Produces product videos from images and descriptions. Creates scroll-stopping content for TikTok, Instagram Reels, and product pages automatically.",
    tools: ["Runway", "CapCut", "Shopify"],
    metrics: {
      efficiency: 84,
      accuracy: 90,
      uptime: 95,
      satisfaction: 88,
    },
    activity: [
      { time: "1h ago", action: "Generated 3 product videos for new collection" },
      { time: "4h ago", action: "Created TikTok ad variant for A/B test" },
    ],
  },
];

export function AgentsSection() {
  return (
    <section id="agents" className="py-24 md:py-32 bg-background">
      <div className="container">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-4"
          >
            [004] MEET THE AGENTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl max-w-2xl leading-tight mb-6"
          >
            YOUR 24/7 WORKFORCE.{" "}
            <span className="text-muted-foreground">ALWAYS ON. NEVER TIRED.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed"
          >
            AI agents that handle the repetitive work so you can focus on what matters.
            Each agent is trained on your processes and works within your existing tools.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">●</span> ONLINE = Production Ready &nbsp;&nbsp;
            <span className="text-amber-500">●</span> LEARNING = In Development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
