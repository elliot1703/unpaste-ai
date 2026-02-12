"use client";

import { motion } from "framer-motion";
import { AgentCard, Agent } from "./AgentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const agents: Agent[] = [
  {
    id: "001",
    name: "QUOTE",
    role: "Sales Assistant",
    status: "online",
    description: "Generates instant quotes for prospects based on inquiry details. Pulls pricing from your database, applies business rules, and delivers professional quotes in seconds.",
    tools: ["CRM", "Pricing API", "Email"],
    metrics: {
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Auto-generates quotes from inquiry form data" },
      { time: "Capability", action: "Sends follow-up sequences to pending quotes" },
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
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Qualifies inbound leads and books calls" },
      { time: "Capability", action: "Routes inquiries by service type" },
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
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Generates SEO audits and performance reports" },
      { time: "Capability", action: "Compiles multi-source competitor analysis" },
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
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Manages bookings across calendars" },
      { time: "Capability", action: "Sends automated reminders and follow-ups" },
    ],
  },
  {
    id: "005",
    name: "CONTENT",
    role: "Social Media Creator",
    status: "learning",
    description: "Generates on-brand social media posts, captions, and content calendars. Learns your voice, follows your style guide, and maintains consistent messaging.",
    tools: ["Canva", "Buffer", "AI"],
    metrics: {
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Creates platform-native social content" },
      { time: "Capability", action: "Builds content calendars from brand voice" },
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
      efficiency: 0,
      accuracy: 0,
      uptime: 0,
      satisfaction: 0,
    },
    activity: [
      { time: "Capability", action: "Generates product videos from images" },
      { time: "Capability", action: "Creates short-form video for social platforms" },
    ],
  },
];

const growthAgents = agents.filter((a) => ["001", "005", "006"].includes(a.id));
const opsAgents = agents.filter((a) => ["002", "003", "004"].includes(a.id));

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
            className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            Select a department to see who's available.
          </motion.p>

          <Tabs defaultValue="growth" className="w-full">
            <div className="flex justify-start mb-8">
              <TabsList className="bg-muted/50 p-1 rounded-none border border-border h-auto">
                <TabsTrigger
                  value="growth"
                  className="font-mono text-xs uppercase tracking-wider rounded-none data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent px-6 py-2"
                >
                  Growth & Sales
                </TabsTrigger>
                <TabsTrigger
                  value="ops"
                  className="font-mono text-xs uppercase tracking-wider rounded-none data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-primary border border-transparent px-6 py-2"
                >
                  Operations & Admin
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="growth">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {growthAgents.map((agent, i) => (
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
            </TabsContent>

            <TabsContent value="ops">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opsAgents.map((agent, i) => (
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
            </TabsContent>
          </Tabs>
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
