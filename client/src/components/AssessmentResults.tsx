import { motion } from "framer-motion";
import { Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import type { AssessmentData } from "./Assessment";

interface AssessmentResultsProps {
  data: AssessmentData;
  onClose: () => void;
  onBookWorkshop: () => void;
}

// Scoring logic
function calculateScore(data: AssessmentData): number {
  let score = 100;

  // Time waste penalties (Q1, Q5, Q9)
  score -= Math.min(data.manualDataEntryHours * 1.5, 30); // Max -30
  score -= Math.min(data.quotesReportsHours * 1, 15); // Max -15
  score -= Math.min(data.invoicingHours * 0.5, 10); // Max -10

  // Slipped follow-ups penalty (Q3)
  const slippedPenalty: Record<string, number> = {
    never: 0,
    rarely: 5,
    sometimes: 10,
    often: 15,
    daily: 20,
  };
  score -= slippedPenalty[data.slippedFollowUps] || 0;

  // Response time penalty (Q4)
  const responsePenalty: Record<string, number> = {
    minutes: 0,
    hours: 3,
    "same-day": 6,
    "next-day": 10,
    days: 15,
  };
  score -= responsePenalty[data.responseTime] || 0;

  // Weekend work penalty (Q7)
  const weekendPenalty: Record<string, number> = {
    never: 0,
    rarely: 3,
    sometimes: 8,
    often: 12,
    daily: 15,
  };
  score -= weekendPenalty[data.weekendWorkFrequency] || 0;

  // Lost customer penalty (Q8)
  if (data.lostCustomerDueToSpeed === "yes") score -= 10;
  if (data.lostCustomerDueToSpeed === "unsure") score -= 5;

  // Tools integration penalty (Q10)
  const integrationPenalty: Record<string, number> = {
    automatic: 0,
    "mostly-manual": 10,
    "all-manual": 20,
  };
  score -= integrationPenalty[data.toolsIntegration] || 0;

  // Automation experience bonus (Q11)
  if (data.triedAutomation === "yes") score += 5;

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

// Calculate estimated hours recoverable
function calculateRecoverableHours(data: AssessmentData): number {
  let hours = 0;

  // Direct time waste
  hours += data.manualDataEntryHours * 0.7; // 70% recoverable
  hours += data.quotesReportsHours * 0.6; // 60% recoverable
  hours += (data.invoicingHours / 4) * 0.5; // Monthly to weekly, 50% recoverable

  // Indirect time waste based on process issues
  if (data.toolsIntegration === "all-manual") hours += 3;
  if (data.toolsIntegration === "mostly-manual") hours += 1.5;

  if (data.slippedFollowUps === "often" || data.slippedFollowUps === "daily") hours += 2;
  if (data.slippedFollowUps === "sometimes") hours += 1;

  return Math.round(hours);
}

// Identify top bottlenecks
function identifyBottlenecks(data: AssessmentData): Array<{ title: string; severity: "high" | "medium" | "low"; hours?: number }> {
  const bottlenecks: Array<{ title: string; severity: "high" | "medium" | "low"; hours?: number; score: number }> = [];

  // Manual data entry
  if (data.manualDataEntryHours >= 10) {
    bottlenecks.push({
      title: "Excessive manual data entry",
      severity: "high",
      hours: data.manualDataEntryHours,
      score: data.manualDataEntryHours,
    });
  } else if (data.manualDataEntryHours >= 5) {
    bottlenecks.push({
      title: "Manual data entry between systems",
      severity: "medium",
      hours: data.manualDataEntryHours,
      score: data.manualDataEntryHours,
    });
  }

  // Tools not integrated
  if (data.toolsIntegration === "all-manual") {
    bottlenecks.push({
      title: "No tool integration - everything is manual",
      severity: "high",
      score: 20,
    });
  } else if (data.toolsIntegration === "mostly-manual") {
    bottlenecks.push({
      title: "Limited tool integration",
      severity: "medium",
      score: 10,
    });
  }

  // Slipped follow-ups
  if (data.slippedFollowUps === "daily" || data.slippedFollowUps === "often") {
    bottlenecks.push({
      title: "Customer follow-ups falling through cracks",
      severity: "high",
      score: 18,
    });
  } else if (data.slippedFollowUps === "sometimes") {
    bottlenecks.push({
      title: "Occasional missed follow-ups",
      severity: "medium",
      score: 10,
    });
  }

  // Slow response time
  if (data.responseTime === "days") {
    bottlenecks.push({
      title: "Slow response time (2+ days)",
      severity: "high",
      score: 15,
    });
  } else if (data.responseTime === "next-day") {
    bottlenecks.push({
      title: "Response time could be faster",
      severity: "medium",
      score: 8,
    });
  }

  // Weekend work
  if (data.weekendWorkFrequency === "daily" || data.weekendWorkFrequency === "often") {
    bottlenecks.push({
      title: "Regularly working evenings/weekends on admin",
      severity: "high",
      score: 14,
    });
  }

  // Quotes and reports
  if (data.quotesReportsHours >= 10) {
    bottlenecks.push({
      title: "Time-consuming quote/proposal creation",
      severity: "high",
      hours: data.quotesReportsHours,
      score: data.quotesReportsHours,
    });
  } else if (data.quotesReportsHours >= 5) {
    bottlenecks.push({
      title: "Manual quote and report creation",
      severity: "medium",
      hours: data.quotesReportsHours,
      score: data.quotesReportsHours,
    });
  }

  // Sort by score (severity) and take top 3
  return bottlenecks
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ title, severity, hours }) => ({ title, severity, hours }));
}

// Get score interpretation
function getScoreInterpretation(score: number): { label: string; color: string; message: string } {
  if (score >= 80) {
    return {
      label: "EXCELLENT",
      color: "text-green-600",
      message: "Your operations are well-optimized. There may still be opportunities to improve.",
    };
  }
  if (score >= 60) {
    return {
      label: "GOOD",
      color: "text-blue-600",
      message: "Your business runs reasonably well, but there's clear room for automation.",
    };
  }
  if (score >= 40) {
    return {
      label: "FAIR",
      color: "text-amber-600",
      message: "Significant time is being lost to manual processes. Automation would have major impact.",
    };
  }
  return {
    label: "NEEDS ATTENTION",
    color: "text-primary",
    message: "Your operations have substantial inefficiencies. Automation could transform your business.",
  };
}

export function AssessmentResults({ data, onClose, onBookWorkshop }: AssessmentResultsProps) {
  const score = calculateScore(data);
  const recoverableHours = calculateRecoverableHours(data);
  const bottlenecks = identifyBottlenecks(data);
  const interpretation = getScoreInterpretation(score);

  // Calculate annual value
  const hourlyValue = parseInt(data.hourSavingsValue) / 10 || 100;
  const annualValue = Math.round(recoverableHours * hourlyValue * 52);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center border-b border-border pb-6">
          <span className="section-tag">[RESULTS]</span>
          <h2 className="text-xl font-bold tracking-tight mt-1">YOUR EFFICIENCY SCORE</h2>
        </div>

        {/* Score Display - Brutalist Style */}
        <div className="text-center">
          <div className="relative inline-flex flex-col items-center">
            {/* Large Score Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="text-8xl md:text-9xl font-bold tracking-tighter leading-none">
                {score}
              </div>
              <div className="absolute -bottom-2 right-0 text-xl font-mono text-muted-foreground">
                /100
              </div>
            </motion.div>

            {/* Score Bar */}
            <div className="w-full mt-6">
              <div className="h-3 w-64 bg-border relative">
                <motion.div
                  className="h-full bg-primary absolute left-0 top-0"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Interpretation Label */}
            <div className={`mt-4 font-mono text-sm font-bold tracking-widest ${interpretation.color}`}>
              {interpretation.label}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto font-mono">
            {interpretation.message}
          </p>
        </div>

        {/* Key Metrics - Brutalist Grid */}
        <div className="stats-grid grid-cols-2">
          <div className="p-6 text-center">
            <Clock className="h-5 w-5 text-primary mx-auto mb-3" />
            <div className="display-number text-4xl">{recoverableHours}h</div>
            <div className="mono-label mt-2">RECOVERABLE/WEEK</div>
          </div>
          <div className="p-6 text-center">
            <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-3" />
            <div className="display-number text-4xl">${annualValue.toLocaleString()}</div>
            <div className="mono-label mt-2">ANNUAL VALUE</div>
          </div>
        </div>

        {/* Top Bottlenecks */}
        {bottlenecks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <span className="mono-label text-foreground">TOP TIME DRAINS IDENTIFIED</span>
            </div>
            <div className="space-y-2">
              {bottlenecks.map((bottleneck, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 border-2 border-border"
                >
                  <div
                    className={`h-3 w-3 ${
                      bottleneck.severity === "high"
                        ? "bg-primary"
                        : bottleneck.severity === "medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <span className="flex-1 font-mono text-sm uppercase">{bottleneck.title}</span>
                  {bottleneck.hours && (
                    <span className="font-mono text-sm font-bold">{bottleneck.hours}H</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* What they want to automate */}
        {data.automateFirst && (
          <div className="p-6 border-2 border-primary bg-primary/5">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="mono-label text-foreground">YOUR #1 AUTOMATION PRIORITY</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground">"{data.automateFirst}"</p>
          </div>
        )}

        {/* CTA - Brutalist Style */}
        <div className="space-y-6 pt-6 border-t-2 border-foreground">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight mb-2">READY TO RECLAIM YOUR TIME?</h3>
            <p className="font-mono text-sm text-muted-foreground">
              Book a free 30-minute workshop to review these results and get your custom automation roadmap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBookWorkshop}
              className="brutalist-button flex-1 flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              BOOK FREE WORKSHOP
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="brutalist-button-outline flex-1"
            >
              CLOSE
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
