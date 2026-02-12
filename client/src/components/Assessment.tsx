import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { AssessmentResults } from "./AssessmentResults";

export interface AssessmentData {
  // Section 1: Current Operations
  manualDataEntryHours: number;
  softwareToolsCount: number;
  slippedFollowUps: string;
  responseTime: string;
  quotesReportsHours: number;

  // Section 2: Pain Points
  frustratingProcess: string;
  weekendWorkFrequency: string;
  lostCustomerDueToSpeed: string;
  invoicingHours: number;
  toolsIntegration: string;

  // Section 3: Readiness
  triedAutomation: string;
  automationToolsUsed: string;
  biggestBottleneck: string;
  automateFirst: string;
  hourSavingsValue: string;
  industry: string;

  // Contact (captured before results)
  contactName: string;
  contactEmail: string;
  contactBusiness: string;
}

const initialData: AssessmentData = {
  manualDataEntryHours: 5,
  softwareToolsCount: 5,
  slippedFollowUps: "",
  responseTime: "",
  quotesReportsHours: 5,
  frustratingProcess: "",
  weekendWorkFrequency: "",
  lostCustomerDueToSpeed: "",
  invoicingHours: 5,
  toolsIntegration: "",
  triedAutomation: "",
  automationToolsUsed: "",
  biggestBottleneck: "",
  automateFirst: "",
  hourSavingsValue: "",
  industry: "",
  contactName: "",
  contactEmail: "",
  contactBusiness: "",
};

const frequencyOptions = [
  { value: "never", label: "Never" },
  { value: "rarely", label: "Rarely (once a month)" },
  { value: "sometimes", label: "Sometimes (weekly)" },
  { value: "often", label: "Often (several times a week)" },
  { value: "daily", label: "Daily" },
];

const responseTimeOptions = [
  { value: "minutes", label: "Under 1 hour" },
  { value: "hours", label: "1-4 hours" },
  { value: "same-day", label: "Same day" },
  { value: "next-day", label: "Next business day" },
  { value: "days", label: "2+ days" },
];

const toolsIntegrationOptions = [
  { value: "automatic", label: "Fully automatic - tools sync themselves" },
  { value: "mostly-manual", label: "Mostly manual with some automation" },
  { value: "all-manual", label: "All manual - I copy/paste everything" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

const savingsValueOptions = [
  { value: "500", label: "$500 - $1,000" },
  { value: "1500", label: "$1,000 - $2,500" },
  { value: "3500", label: "$2,500 - $5,000" },
  { value: "7500", label: "$5,000+" },
];

interface AssessmentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Assessment({ open, onOpenChange }: AssessmentProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const [data, setData] = useState<AssessmentData>(initialData);
  const [showResults, setShowResults] = useState(false);

  const updateData = <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canProceedSection1 =
    data.slippedFollowUps !== "" &&
    data.responseTime !== "";

  const canProceedSection2 =
    data.frustratingProcess.trim() !== "" &&
    data.weekendWorkFrequency !== "" &&
    data.lostCustomerDueToSpeed !== "" &&
    data.toolsIntegration !== "";

  const canProceedSection3 =
    data.triedAutomation !== "" &&
    data.biggestBottleneck.trim() !== "" &&
    data.automateFirst.trim() !== "" &&
    data.hourSavingsValue !== "" &&
    data.industry.trim() !== "";

  const canProceedSection4 =
    data.contactName.trim() !== "" &&
    data.contactEmail.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail);

  const handleNext = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
    } else {
      // Submit lead data before showing results
      submitAssessmentLead(data);
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setCurrentSection(1);
      setData(initialData);
      setShowResults(false);
    }, 300);
  };

  const sections = [
    { num: 1, title: "OPERATIONS", tag: "001" },
    { num: 2, title: "PAIN POINTS", tag: "002" },
    { num: 3, title: "READINESS", tag: "003" },
    { num: 4, title: "YOUR RESULTS", tag: "004" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-foreground p-0 shadow-[8px_8px_0_0_var(--foreground)]"
        showCloseButton={false}
        aria-label="Efficiency Score Assessment"
      >
        {showResults ? (
          <AssessmentResults data={data} onClose={handleClose} onBookWorkshop={handleClose} />
        ) : (
          <>
            {/* Header with close button */}
            <DialogHeader className="p-6 pb-0 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <span className="section-tag">[AUDIT]</span>
                  <DialogTitle className="text-xl font-bold tracking-tight mt-1">
                    EFFICIENCY SCORE
                  </DialogTitle>
                </div>
                <button
                  onClick={handleClose}
                  className="h-10 w-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DialogHeader>

            {/* Progress Bar - Brutalist Style */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                {sections.map((section, i) => (
                  <div key={section.num} className="flex items-center">
                    <div
                      className={`flex flex-col items-center transition-colors ${
                        currentSection >= section.num
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`h-10 w-10 flex items-center justify-center border-2 font-mono text-sm font-bold transition-all ${
                          currentSection >= section.num
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-background"
                        }`}
                      >
                        {section.tag}
                      </div>
                      <span className="mono-label mt-2 hidden sm:block">{section.title}</span>
                    </div>
                    {i < sections.length - 1 && (
                      <div
                        className={`h-0.5 w-12 md:w-20 mx-2 md:mx-4 transition-colors ${
                          currentSection > section.num ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 sm:hidden">
                <span className="mono-label">
                  [{sections[currentSection - 1].tag}] {sections[currentSection - 1].title}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {currentSection === 1 && (
                    <Section1
                      data={data}
                      updateData={updateData}
                    />
                  )}
                  {currentSection === 2 && (
                    <Section2
                      data={data}
                      updateData={updateData}
                    />
                  )}
                  {currentSection === 3 && (
                    <Section3
                      data={data}
                      updateData={updateData}
                    />
                  )}
                  {currentSection === 4 && (
                    <SectionContact
                      data={data}
                      updateData={updateData}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation - Brutalist Buttons */}
            <div className="p-6 pt-0 flex justify-between border-t border-border">
              <button
                onClick={handleBack}
                disabled={currentSection === 1}
                className={`brutalist-button-outline flex items-center gap-2 ${
                  currentSection === 1 ? "invisible" : ""
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                BACK
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (currentSection === 1 && !canProceedSection1) ||
                  (currentSection === 2 && !canProceedSection2) ||
                  (currentSection === 3 && !canProceedSection3) ||
                  (currentSection === 4 && !canProceedSection4)
                }
                className="brutalist-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentSection === 4 ? "SEE MY SCORE" : "NEXT"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Section 1: Current Operations
function Section1({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Q1: Manual data entry hours */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOURS/WEEK ON MANUAL DATA ENTRY OR COPY-PASTING BETWEEN SYSTEMS
        </Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.manualDataEntryHours]}
            onValueChange={(v) => updateData("manualDataEntryHours", v[0])}
            min={0}
            max={40}
            step={1}
            className="flex-1"
          />
          <span className="w-20 text-right font-mono text-lg font-bold">
            {data.manualDataEntryHours}h
          </span>
        </div>
      </div>

      {/* Q2: Software tools count */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          NUMBER OF SOFTWARE TOOLS USED DAILY
        </Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.softwareToolsCount]}
            onValueChange={(v) => updateData("softwareToolsCount", v[0])}
            min={1}
            max={20}
            step={1}
            className="flex-1"
          />
          <span className="w-20 text-right font-mono text-lg font-bold">
            {data.softwareToolsCount}
          </span>
        </div>
      </div>

      {/* Q3: Slipped follow-ups */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOW OFTEN DO CUSTOMER INQUIRIES SLIP THROUGH THE CRACKS?
        </Label>
        <RadioGroup
          value={data.slippedFollowUps}
          onValueChange={(v) => updateData("slippedFollowUps", v)}
          className="space-y-2"
        >
          {frequencyOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 border-2 transition-all cursor-pointer ${
                data.slippedFollowUps === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground"
              }`}
            >
              <RadioGroupItem value={option.value} id={`slipped-${option.value}`} />
              <Label htmlFor={`slipped-${option.value}`} className="flex-1 cursor-pointer font-mono text-sm">
                {option.label.toUpperCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Q4: Response time */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          AVERAGE RESPONSE TIME TO NEW CUSTOMER INQUIRIES
        </Label>
        <Select value={data.responseTime} onValueChange={(v) => updateData("responseTime", v)}>
          <SelectTrigger className="w-full border-2 border-border bg-background font-mono text-sm h-12 hover:border-foreground transition-colors">
            <SelectValue placeholder="SELECT RESPONSE TIME" />
          </SelectTrigger>
          <SelectContent className="border-2 border-foreground">
            {responseTimeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="font-mono text-sm">
                {option.label.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q5: Quotes/reports hours */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOURS/WEEK CREATING QUOTES, PROPOSALS, OR REPORTS
        </Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.quotesReportsHours]}
            onValueChange={(v) => updateData("quotesReportsHours", v[0])}
            min={0}
            max={20}
            step={1}
            className="flex-1"
          />
          <span className="w-20 text-right font-mono text-lg font-bold">
            {data.quotesReportsHours}h
          </span>
        </div>
      </div>
    </div>
  );
}

// Section 2: Pain Points
function Section2({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Q6: Frustrating process */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          WHICH MANUAL PROCESS FRUSTRATES YOU THE MOST?
        </Label>
        <Textarea
          value={data.frustratingProcess}
          onChange={(e) => updateData("frustratingProcess", e.target.value)}
          placeholder="Describe the process that takes too much time or causes the most headaches..."
          className="min-h-[100px] border-2 border-border bg-background font-mono text-sm focus:border-primary transition-colors"
        />
      </div>

      {/* Q7: Weekend work frequency */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOW OFTEN DO YOU WORK EVENINGS/WEEKENDS TO CATCH UP?
        </Label>
        <RadioGroup
          value={data.weekendWorkFrequency}
          onValueChange={(v) => updateData("weekendWorkFrequency", v)}
          className="space-y-2"
        >
          {frequencyOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 border-2 transition-all cursor-pointer ${
                data.weekendWorkFrequency === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground"
              }`}
            >
              <RadioGroupItem value={option.value} id={`weekend-${option.value}`} />
              <Label htmlFor={`weekend-${option.value}`} className="flex-1 cursor-pointer font-mono text-sm">
                {option.label.toUpperCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Q8: Lost customer */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          EVER LOST A CUSTOMER DUE TO SLOW RESPONSE OR MISSED FOLLOW-UP?
        </Label>
        <RadioGroup
          value={data.lostCustomerDueToSpeed}
          onValueChange={(v) => updateData("lostCustomerDueToSpeed", v)}
          className="grid grid-cols-3 gap-3"
        >
          {yesNoOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center justify-center p-4 border-2 transition-all cursor-pointer ${
                data.lostCustomerDueToSpeed === option.value
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:border-foreground"
              }`}
            >
              <RadioGroupItem value={option.value} id={`lost-${option.value}`} className="sr-only" />
              <Label
                htmlFor={`lost-${option.value}`}
                className="cursor-pointer font-mono text-sm font-bold"
              >
                {option.label.toUpperCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Q9: Invoicing hours */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOURS/MONTH ON INVOICING AND PAYMENT CHASING
        </Label>
        <div className="flex items-center gap-4">
          <Slider
            value={[data.invoicingHours]}
            onValueChange={(v) => updateData("invoicingHours", v[0])}
            min={0}
            max={40}
            step={1}
            className="flex-1"
          />
          <span className="w-20 text-right font-mono text-lg font-bold">
            {data.invoicingHours}h
          </span>
        </div>
      </div>

      {/* Q10: Tools integration */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          DO YOUR TOOLS TALK TO EACH OTHER AUTOMATICALLY?
        </Label>
        <RadioGroup
          value={data.toolsIntegration}
          onValueChange={(v) => updateData("toolsIntegration", v)}
          className="space-y-2"
        >
          {toolsIntegrationOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-3 p-4 border-2 transition-all cursor-pointer ${
                data.toolsIntegration === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground"
              }`}
            >
              <RadioGroupItem value={option.value} id={`tools-${option.value}`} />
              <Label htmlFor={`tools-${option.value}`} className="flex-1 cursor-pointer font-mono text-sm">
                {option.label.toUpperCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

// Section 3: Readiness
function Section3({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Q11: Tried automation */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HAVE YOU TRIED AUTOMATION TOOLS BEFORE? (ZAPIER, MAKE, ETC.)
        </Label>
        <RadioGroup
          value={data.triedAutomation}
          onValueChange={(v) => updateData("triedAutomation", v)}
          className="grid grid-cols-2 gap-3"
        >
          <div
            className={`flex items-center justify-center p-4 border-2 transition-all cursor-pointer ${
              data.triedAutomation === "yes"
                ? "border-primary bg-primary text-white"
                : "border-border hover:border-foreground"
            }`}
          >
            <RadioGroupItem value="yes" id="tried-yes" className="sr-only" />
            <Label
              htmlFor="tried-yes"
              className="cursor-pointer font-mono text-sm font-bold"
            >
              YES
            </Label>
          </div>
          <div
            className={`flex items-center justify-center p-4 border-2 transition-all cursor-pointer ${
              data.triedAutomation === "no"
                ? "border-primary bg-primary text-white"
                : "border-border hover:border-foreground"
            }`}
          >
            <RadioGroupItem value="no" id="tried-no" className="sr-only" />
            <Label
              htmlFor="tried-no"
              className="cursor-pointer font-mono text-sm font-bold"
            >
              NO
            </Label>
          </div>
        </RadioGroup>
        {data.triedAutomation === "yes" && (
          <Textarea
            value={data.automationToolsUsed}
            onChange={(e) => updateData("automationToolsUsed", e.target.value)}
            placeholder="Which tools have you used?"
            className="min-h-[60px] border-2 border-border bg-background font-mono text-sm focus:border-primary transition-colors"
          />
        )}
      </div>

      {/* Q12: Biggest bottleneck */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          WHAT'S YOUR BIGGEST OPERATIONAL BOTTLENECK RIGHT NOW?
        </Label>
        <Textarea
          value={data.biggestBottleneck}
          onChange={(e) => updateData("biggestBottleneck", e.target.value)}
          placeholder="The one thing that slows everything else down..."
          className="min-h-[80px] border-2 border-border bg-background font-mono text-sm focus:border-primary transition-colors"
        />
      </div>

      {/* Q13: Automate first */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          IF YOU COULD AUTOMATE ONE THING TOMORROW, WHAT WOULD IT BE?
        </Label>
        <Textarea
          value={data.automateFirst}
          onChange={(e) => updateData("automateFirst", e.target.value)}
          placeholder="The task you'd love to never do manually again..."
          className="min-h-[80px] border-2 border-border bg-background font-mono text-sm focus:border-primary transition-colors"
        />
      </div>

      {/* Q14: Savings value */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          HOW MUCH WOULD SAVING 10 HOURS/WEEK BE WORTH TO YOUR BUSINESS?
        </Label>
        <Select value={data.hourSavingsValue} onValueChange={(v) => updateData("hourSavingsValue", v)}>
          <SelectTrigger className="w-full border-2 border-border bg-background font-mono text-sm h-12 hover:border-foreground transition-colors">
            <SelectValue placeholder="SELECT ESTIMATED VALUE" />
          </SelectTrigger>
          <SelectContent className="border-2 border-foreground">
            {savingsValueOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="font-mono text-sm">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Q15: Industry */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          WHAT INDUSTRY OR TYPE OF BUSINESS ARE YOU IN?
        </Label>
        <Textarea
          value={data.industry}
          onChange={(e) => updateData("industry", e.target.value)}
          placeholder="e.g., Professional services, E-commerce, Healthcare, Construction..."
          className="min-h-[60px] border-2 border-border bg-background font-mono text-sm focus:border-primary transition-colors"
        />
      </div>
    </div>
  );
}

// Section 4: Contact Details (email capture)
function SectionContact({
  data,
  updateData,
}: {
  data: AssessmentData;
  updateData: <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="border-2 border-primary bg-primary/5 p-6">
        <p className="font-mono text-sm text-foreground leading-relaxed">
          Your Efficiency Score is ready. Enter your details below to see your personalised results — including your score, top bottlenecks, and estimated annual cost of manual work.
        </p>
      </div>

      {/* Name */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          YOUR NAME
        </Label>
        <input
          type="text"
          value={data.contactName}
          onChange={(e) => updateData("contactName", e.target.value)}
          placeholder="First and last name"
          className="w-full h-12 px-4 border-2 border-border bg-background font-mono text-sm focus:border-primary focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          EMAIL ADDRESS
        </Label>
        <input
          type="email"
          value={data.contactEmail}
          onChange={(e) => updateData("contactEmail", e.target.value)}
          placeholder="you@yourbusiness.com"
          className="w-full h-12 px-4 border-2 border-border bg-background font-mono text-sm focus:border-primary focus:outline-none transition-colors"
        />
        <p className="font-mono text-xs text-muted-foreground">
          We'll send a copy of your results to this address. No spam, no newsletters.
        </p>
      </div>

      {/* Business name (optional) */}
      <div className="space-y-4">
        <Label className="mono-label text-foreground">
          BUSINESS NAME <span className="text-muted-foreground">(OPTIONAL)</span>
        </Label>
        <input
          type="text"
          value={data.contactBusiness}
          onChange={(e) => updateData("contactBusiness", e.target.value)}
          placeholder="Your company or trading name"
          className="w-full h-12 px-4 border-2 border-border bg-background font-mono text-sm focus:border-primary focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

// Submit assessment lead data
async function submitAssessmentLead(data: AssessmentData) {
  try {
    // Send to server endpoint — will store or forward to Google Sheet / email
    await fetch("/api/assessment-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.contactName,
        email: data.contactEmail,
        business: data.contactBusiness,
        industry: data.industry,
        manualDataEntryHours: data.manualDataEntryHours,
        softwareToolsCount: data.softwareToolsCount,
        biggestBottleneck: data.biggestBottleneck,
        automateFirst: data.automateFirst,
        hourSavingsValue: data.hourSavingsValue,
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Silently fail — don't block the user from seeing their results
    console.warn("Failed to submit assessment lead — results still shown.");
  }
}
