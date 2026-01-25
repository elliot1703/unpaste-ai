import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Calendar,
  FileText,
  Database,
  MessageSquare,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Bot,
  Workflow
} from "lucide-react";

interface AgentTrait {
  label: string;
  value: number;
  maxValue?: number;
}

interface AgentActivity {
  action: string;
  time: string;
}

interface Agent {
  name: string;
  role: string;
  description: string;
  status: "online" | "offline" | "learning";
  icon: React.ComponentType<{ className?: string }>;
  tools: string[];
  traits: AgentTrait[];
  recentActivity: AgentActivity[];
}

const agents: Agent[] = [
  {
    name: "ATLAS",
    role: "Voice Agent",
    description: "Handles inbound calls, qualifies leads, and schedules appointments 24/7 without missing a beat.",
    status: "online",
    icon: Phone,
    tools: ["Phone System", "CRM", "Calendar"],
    traits: [
      { label: "Call Handling", value: 94 },
      { label: "Response Time", value: 98 },
      { label: "Lead Qualification", value: 89 },
      { label: "Uptime", value: 99.9, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Qualified lead from Melbourne", time: "5m ago" },
      { action: "Scheduled 3 appointments", time: "1h ago" },
      { action: "Handled after-hours inquiry", time: "3h ago" },
    ],
  },
  {
    name: "NOVA",
    role: "Email Assistant",
    description: "Manages inbox, drafts responses, and ensures no client inquiry goes unanswered.",
    status: "online",
    icon: Mail,
    tools: ["Gmail", "Outlook", "CRM"],
    traits: [
      { label: "Email Accuracy", value: 96 },
      { label: "Response Time", value: 92 },
      { label: "Spam Detection", value: 99 },
      { label: "Uptime", value: 99.5, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Processed 47 emails", time: "Today" },
      { action: "Flagged urgent request", time: "2h ago" },
      { action: "Auto-replied to inquiry", time: "4h ago" },
    ],
  },
  {
    name: "CHRONOS",
    role: "Scheduler",
    description: "Coordinates meetings, manages calendars, and eliminates the back-and-forth of booking.",
    status: "online",
    icon: Calendar,
    tools: ["Google Calendar", "Zoom", "Teams"],
    traits: [
      { label: "Booking Accuracy", value: 97 },
      { label: "Conflict Resolution", value: 91 },
      { label: "Time Optimization", value: 88 },
      { label: "Uptime", value: 99.8, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Scheduled team sync", time: "30m ago" },
      { action: "Rescheduled client call", time: "Yesterday" },
      { action: "Optimized weekly calendar", time: "Yesterday" },
    ],
  },
  {
    name: "SCRIBE",
    role: "Document Processor",
    description: "Extracts data from invoices, contracts, and forms—then routes it to the right systems.",
    status: "learning",
    icon: FileText,
    tools: ["Google Drive", "Dropbox", "Accounting"],
    traits: [
      { label: "Data Extraction", value: 93 },
      { label: "Processing Speed", value: 95 },
      { label: "Accuracy Rate", value: 97 },
      { label: "Uptime", value: 99.2, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Processed 12 invoices", time: "1h ago" },
      { action: "Extracted contract terms", time: "3h ago" },
      { action: "Updated client records", time: "Today" },
    ],
  },
  {
    name: "NEXUS",
    role: "Data Sync",
    description: "Keeps your tools in sync. When data changes in one place, it updates everywhere.",
    status: "online",
    icon: Database,
    tools: ["Zapier", "Make", "APIs"],
    traits: [
      { label: "Sync Accuracy", value: 99 },
      { label: "Speed", value: 96 },
      { label: "Error Recovery", value: 94 },
      { label: "Uptime", value: 99.9, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Synced 1,240 records", time: "10m ago" },
      { action: "Resolved data conflict", time: "2h ago" },
      { action: "Connected new integration", time: "Yesterday" },
    ],
  },
  {
    name: "ECHO",
    role: "Chat Assistant",
    description: "Answers customer questions on your website instantly, capturing leads while you sleep.",
    status: "online",
    icon: MessageSquare,
    tools: ["Website", "WhatsApp", "Messenger"],
    traits: [
      { label: "Response Quality", value: 91 },
      { label: "Lead Capture", value: 87 },
      { label: "Resolution Rate", value: 84 },
      { label: "Uptime", value: 99.7, maxValue: 100 },
    ],
    recentActivity: [
      { action: "Captured 8 new leads", time: "Today" },
      { action: "Resolved product query", time: "1h ago" },
      { action: "Escalated complex issue", time: "3h ago" },
    ],
  },
];

function StatusIndicator({ status }: { status: Agent["status"] }) {
  const statusConfig = {
    online: { color: "bg-green-500", label: "ONLINE" },
    offline: { color: "bg-muted-foreground", label: "OFFLINE" },
    learning: { color: "bg-primary", label: "LEARNING" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 ${config.color} animate-pulse`} />
      <span className="mono-label">{config.label}</span>
    </div>
  );
}

function TraitBar({ trait }: { trait: AgentTrait }) {
  const maxValue = trait.maxValue || 100;
  const percentage = (trait.value / maxValue) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="mono-label w-32 truncate">{trait.label}</span>
      <div className="flex-1 h-2 bg-border relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-primary"
        />
      </div>
      <span className="font-mono text-xs font-bold w-16 text-right">
        {trait.value}{trait.maxValue ? "%" : "/100"}
      </span>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const Icon = agent.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="brutalist-card p-6 md:p-8 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-foreground flex items-center justify-center">
            <Icon className="h-6 w-6 text-background" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg tracking-tight">{agent.name}</h3>
              <span className="text-muted-foreground font-mono text-sm">|</span>
              <span className="font-mono text-sm text-muted-foreground">{agent.role}</span>
            </div>
            <StatusIndicator status={agent.status} />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="font-mono text-sm text-muted-foreground mb-6 leading-relaxed">
        {agent.description}
      </p>

      {/* Tools */}
      <div className="mb-6">
        <div className="mono-label mb-3 flex items-center gap-2">
          <Zap className="h-3 w-3" />
          INTEGRATIONS
        </div>
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool, i) => (
            <span
              key={i}
              className="font-mono text-xs bg-secondary px-3 py-1.5 border border-border"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Traits */}
      <div className="mb-6">
        <div className="mono-label mb-3 flex items-center gap-2">
          <TrendingUp className="h-3 w-3" />
          PERFORMANCE
        </div>
        <div className="space-y-3">
          {agent.traits.map((trait, i) => (
            <TraitBar key={i} trait={trait} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-auto pt-6 border-t border-border">
        <div className="mono-label mb-3 flex items-center gap-2">
          <Clock className="h-3 w-3" />
          RECENT ACTIVITY
        </div>
        <div className="space-y-2">
          {agent.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground truncate pr-4">
                {activity.action}
              </span>
              <span className="mono-label whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface AgentShowcaseProps {
  onCtaClick?: () => void;
}

export function AgentShowcase({ onCtaClick }: AgentShowcaseProps) {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest mb-4">
            [005] AI EMPLOYEES
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-4xl md:text-5xl leading-tight">
              YOUR 24/7 <span className="text-primary">WORKFORCE</span>
            </h2>
            <p className="font-mono text-sm text-background/70 max-w-md leading-relaxed">
              Purpose-built AI agents that handle the repetitive work so your team can focus on what matters.
              Each agent learns your processes and improves over time.
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/20 mb-16">
          {[
            { icon: Bot, label: "AUTONOMOUS", value: "100%" },
            { icon: Shield, label: "SECURE", value: "SOC2" },
            { icon: Workflow, label: "INTEGRATED", value: "200+" },
            { icon: Zap, label: "RESPONSE", value: "<1s" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-foreground p-6 text-center"
            >
              <feature.icon className="h-5 w-5 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold mb-1">{feature.value}</div>
              <div className="mono-label text-background/50">{feature.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Agent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/20">
          {agents.map((agent, i) => (
            <div key={i} className="bg-foreground">
              <AgentCard agent={agent} index={i} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-sm text-background/70 mb-6">
            Not sure which agents you need? Take our free assessment to find out.
          </p>
          <button
            onClick={onCtaClick}
            className="brutalist-button inline-flex items-center gap-3"
          >
            Discover Your AI Team
          </button>
        </motion.div>
      </div>
    </section>
  );
}
