import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone } from "lucide-react";

type StyleOption = "A" | "B" | "C" | "D";
type ViewMode = "desktop" | "mobile";

const styleNames: Record<StyleOption, { name: string; vibe: string }> = {
  A: { name: "Swiss Brutalist", vibe: "Bauhaus meets tech startup" },
  B: { name: "Midnight Luxury", vibe: "Aesop meets Stripe" },
  C: { name: "Paper & Ink", vibe: "The New Yorker meets Y Combinator" },
  D: { name: "Neon Terminal", vibe: "Cyberpunk meets Bloomberg Terminal" },
};

export default function StyleExplorer() {
  const [activeStyle, setActiveStyle] = useState<StyleOption>("A");
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  return (
    <div className="min-h-screen bg-[#18181B] p-6 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl md:text-2xl font-medium text-white mb-1 tracking-tight">
            Unpaste.ai — Style Direction
          </h1>
          <p className="text-[#71717A] text-sm">
            Four distinct aesthetic directions. Click to explore.
          </p>
        </motion.div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Style Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["A", "B", "C", "D"] as StyleOption[]).map((style, i) => (
              <motion.button
                key={style}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveStyle(style)}
                className={`group relative px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeStyle === style
                    ? "text-white"
                    : "text-[#71717A] hover:text-white"
                }`}
              >
                <span className="relative z-10">{styleNames[style].name}</span>
                {activeStyle === style && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#27272A] rounded-lg"
                    style={{ zIndex: 0 }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#27272A] rounded-lg p-1">
            <button
              onClick={() => setViewMode("desktop")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "desktop"
                  ? "bg-[#3F3F46] text-white"
                  : "text-[#71717A] hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "mobile"
                  ? "bg-[#3F3F46] text-white"
                  : "text-[#71717A] hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Style Boards */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeStyle === "A" && <StyleA key="A" viewMode={viewMode} />}
          {activeStyle === "B" && <StyleB key="B" viewMode={viewMode} />}
          {activeStyle === "C" && <StyleC key="C" viewMode={viewMode} />}
          {activeStyle === "D" && <StyleD key="D" viewMode={viewMode} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface StyleProps {
  viewMode: ViewMode;
}

// Mobile frame wrapper
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Phone bezel */}
        <div className="bg-[#1C1C1E] rounded-[3rem] p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-[375px] h-[812px] rounded-[2.5rem] overflow-hidden bg-black relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-50" />
            {/* Content */}
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// OPTION A: Swiss Brutalist
// ============================================
function StyleA({ viewMode }: StyleProps) {
  const content = (
    <div
      className="min-h-full"
      style={{
        backgroundColor: "#FAFAFA",
        backgroundImage: `
          linear-gradient(90deg, #E4E4E7 1px, transparent 1px),
          linear-gradient(180deg, #E4E4E7 1px, transparent 1px)
        `,
        backgroundSize: viewMode === "mobile" ? "40px 40px" : "60px 60px",
      }}
    >
      <div className={viewMode === "mobile" ? "p-5 pt-12" : "p-8 md:p-16"}>
        {/* Nav */}
        <div className={`flex items-center justify-between ${viewMode === "mobile" ? "mb-10" : "mb-16"}`}>
          <div className="flex items-center gap-2">
            <div className={`bg-[#DC2626] rounded-sm ${viewMode === "mobile" ? "w-6 h-6" : "w-8 h-8"}`} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: viewMode === "mobile" ? "12px" : "14px",
              fontWeight: "700",
              color: "#09090B",
              letterSpacing: "-0.02em",
            }}>
              UNPASTE
            </span>
          </div>
          {viewMode === "desktop" && (
            <div className="flex items-center gap-6">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#71717A" }}>
                METHOD
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#71717A" }}>
                SERVICES
              </span>
              <button style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                backgroundColor: "#09090B",
                color: "#FAFAFA",
                padding: "8px 16px",
              }}>
                START AUDIT
              </button>
            </div>
          )}
          {viewMode === "mobile" && (
            <button style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              backgroundColor: "#09090B",
              color: "#FAFAFA",
              padding: "6px 12px",
            }}>
              AUDIT
            </button>
          )}
        </div>

        {/* Hero */}
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: viewMode === "mobile" ? "10px" : "11px",
            color: "#DC2626",
            letterSpacing: "0.1em",
            marginBottom: viewMode === "mobile" ? "16px" : "24px",
          }}>
            [001] FREE EFFICIENCY AUDIT
          </div>

          <h1 style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: viewMode === "mobile" ? "42px" : "clamp(40px, 6vw, 72px)",
            fontWeight: "800",
            lineHeight: "0.95",
            color: "#09090B",
            letterSpacing: "-0.04em",
            marginBottom: viewMode === "mobile" ? "20px" : "32px",
          }}>
            STOP<br />
            COPY-<br />
            PASTING.
          </h1>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: viewMode === "mobile" ? "12px" : "14px",
            color: "#52525B",
            lineHeight: "1.8",
            maxWidth: "380px",
            marginBottom: viewMode === "mobile" ? "24px" : "40px",
          }}>
            Discover your biggest operational bottleneck in 5 minutes.
            See where automation can give you back 10+ hours every week.
          </p>

          <button style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: viewMode === "mobile" ? "11px" : "12px",
            fontWeight: "700",
            backgroundColor: "#DC2626",
            color: "white",
            padding: viewMode === "mobile" ? "14px 24px" : "16px 32px",
            letterSpacing: "0.05em",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            width: viewMode === "mobile" ? "100%" : "auto",
            justifyContent: "center",
          }}>
            TAKE FREE ASSESSMENT
            <span style={{ fontSize: "18px" }}>→</span>
          </button>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 gap-px bg-[#E4E4E7] ${viewMode === "mobile" ? "mt-10" : "mt-16 max-w-md"}`}>
          {[
            { num: "10+", label: "Hours saved weekly" },
            { num: "5", label: "Minute assessment" },
            { num: "0", label: "Cost to start" },
            { num: "∞", label: "Scalability" },
          ].map((stat, i) => (
            <div key={i} className={`bg-[#FAFAFA] ${viewMode === "mobile" ? "p-4" : "p-6"}`}>
              <div style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: viewMode === "mobile" ? "28px" : "36px",
                fontWeight: "800",
                color: "#09090B",
                letterSpacing: "-0.03em",
              }}>
                {stat.num}
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: viewMode === "mobile" ? "9px" : "10px",
                color: "#71717A",
                letterSpacing: "0.05em",
                marginTop: "4px",
              }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Style Board */}
      <div className="bg-[#27272A] rounded-xl p-6 border border-[#3F3F46]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-[#71717A] uppercase tracking-widest">Direction A</span>
              <span className="h-px flex-1 bg-[#3F3F46]" />
            </div>
            <h2 className="text-xl text-white font-medium mb-2">Swiss Brutalist</h2>
            <p className="text-[#A1A1AA] text-sm max-w-md">
              Bauhaus meets tech startup. Grid-based layouts, bold industrial typography,
              stark contrast. The visual language of Teenage Engineering and Nothing.
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Palette</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded bg-[#FAFAFA]" />
                <div className="w-10 h-10 rounded bg-[#09090B]" />
                <div className="w-10 h-10 rounded bg-[#DC2626]" />
                <div className="w-10 h-10 rounded bg-[#E4E4E7]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Typography</span>
              <div className="text-white text-sm">
                <div>Space Mono</div>
                <div className="text-[#71717A]">+ System UI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {viewMode === "desktop" ? (
        <div className="rounded-xl overflow-hidden">
          {content}
        </div>
      ) : (
        <MobileFrame>{content}</MobileFrame>
      )}
    </motion.div>
  );
}

// ============================================
// OPTION B: Midnight Luxury
// ============================================
function StyleB({ viewMode }: StyleProps) {
  const content = (
    <div
      className="min-h-full relative"
      style={{ backgroundColor: "#0C0A09" }}
    >
      {/* Gradient orb */}
      <div
        className="absolute top-0 right-0 opacity-30"
        style={{
          width: viewMode === "mobile" ? "300px" : "600px",
          height: viewMode === "mobile" ? "300px" : "600px",
          background: "radial-gradient(circle at center, #D4AF37 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <div className={`relative ${viewMode === "mobile" ? "p-5 pt-12" : "p-8 md:p-16"}`}>
        {/* Nav */}
        <div className={`flex items-center justify-between ${viewMode === "mobile" ? "mb-12" : "mb-20"}`}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: viewMode === "mobile" ? "18px" : "20px",
            fontWeight: "500",
            color: "#F5F5F4",
            letterSpacing: "-0.01em",
          }}>
            unpaste
          </span>
          {viewMode === "desktop" && (
            <div className="flex items-center gap-8">
              <span style={{ fontSize: "13px", color: "#78716C" }}>Method</span>
              <span style={{ fontSize: "13px", color: "#78716C" }}>Services</span>
              <span style={{ fontSize: "13px", color: "#78716C" }}>Results</span>
              <button style={{
                fontSize: "13px",
                color: "#D4AF37",
                padding: "8px 0",
                borderBottom: "1px solid #D4AF37",
              }}>
                Begin Assessment
              </button>
            </div>
          )}
          {viewMode === "mobile" && (
            <button style={{
              fontSize: "12px",
              color: "#D4AF37",
              padding: "6px 0",
              borderBottom: "1px solid #D4AF37",
            }}>
              Begin
            </button>
          )}
        </div>

        {/* Hero */}
        <div className="max-w-3xl">
          <div style={{
            fontSize: viewMode === "mobile" ? "10px" : "12px",
            color: "#D4AF37",
            letterSpacing: "0.15em",
            marginBottom: viewMode === "mobile" ? "20px" : "32px",
            textTransform: "uppercase",
          }}>
            Operational Excellence
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: viewMode === "mobile" ? "36px" : "clamp(42px, 5.5vw, 68px)",
            fontWeight: "400",
            lineHeight: "1.1",
            color: "#F5F5F4",
            letterSpacing: "-0.02em",
            marginBottom: viewMode === "mobile" ? "20px" : "32px",
          }}>
            The hours you spend on repetitive tasks{" "}
            <span style={{ color: "#D4AF37", fontStyle: "italic" }}>belong to you.</span>
          </h1>

          <p style={{
            fontSize: viewMode === "mobile" ? "14px" : "17px",
            color: "#A8A29E",
            lineHeight: "1.8",
            maxWidth: "480px",
            marginBottom: viewMode === "mobile" ? "28px" : "48px",
          }}>
            Our complimentary efficiency assessment reveals your operational
            bottlenecks in five minutes. Discover where intelligent automation
            can reclaim your most valuable resource.
          </p>

          <div className={`flex ${viewMode === "mobile" ? "flex-col gap-4" : "items-center gap-6"}`}>
            <button style={{
              fontSize: viewMode === "mobile" ? "13px" : "14px",
              fontWeight: "500",
              backgroundColor: "#D4AF37",
              color: "#0C0A09",
              padding: viewMode === "mobile" ? "14px 28px" : "16px 32px",
              borderRadius: "2px",
              width: viewMode === "mobile" ? "100%" : "auto",
            }}>
              Take the Assessment
            </button>
            <span style={{ fontSize: viewMode === "mobile" ? "12px" : "13px", color: "#57534E", textAlign: viewMode === "mobile" ? "center" : "left" }}>
              5 minutes · No cost · Instant results
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className={`border-t border-[#292524] grid grid-cols-3 gap-4 ${viewMode === "mobile" ? "mt-12 pt-8" : "mt-24 pt-12 gap-8"}`}>
          {[
            { num: "10+", label: "Hours recovered weekly" },
            { num: "$52k", label: "Average annual value" },
            { num: "89%", label: "Automation opportunity" },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: viewMode === "mobile" ? "24px" : "32px",
                color: "#F5F5F4",
                marginBottom: viewMode === "mobile" ? "4px" : "8px",
              }}>
                {stat.num}
              </div>
              <div style={{
                fontSize: viewMode === "mobile" ? "9px" : "12px",
                color: "#78716C",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Style Board */}
      <div className="bg-[#27272A] rounded-xl p-6 border border-[#3F3F46]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-[#71717A] uppercase tracking-widest">Direction B</span>
              <span className="h-px flex-1 bg-[#3F3F46]" />
            </div>
            <h2 className="text-xl text-white font-medium mb-2">Midnight Luxury</h2>
            <p className="text-[#A1A1AA] text-sm max-w-md">
              Aesop meets Stripe. Rich dark backgrounds with warm champagne accents.
              Refined typography with confident restraint. Feels premium without shouting.
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Palette</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded bg-[#0C0A09]" />
                <div className="w-10 h-10 rounded bg-[#1C1917]" />
                <div className="w-10 h-10 rounded bg-[#D4AF37]" />
                <div className="w-10 h-10 rounded bg-[#F5F5F4]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Typography</span>
              <div className="text-white text-sm">
                <div>Playfair Display</div>
                <div className="text-[#71717A]">+ Inter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {viewMode === "desktop" ? (
        <div className="rounded-xl overflow-hidden">
          {content}
        </div>
      ) : (
        <MobileFrame>{content}</MobileFrame>
      )}
    </motion.div>
  );
}

// ============================================
// OPTION C: Paper & Ink
// ============================================
function StyleC({ viewMode }: StyleProps) {
  const content = (
    <div
      className="min-h-full"
      style={{ backgroundColor: "#FAF9F7" }}
    >
      <div className={viewMode === "mobile" ? "p-5 pt-12" : "p-8 md:p-16"}>
        {/* Nav */}
        <div className={`flex items-center justify-between ${viewMode === "mobile" ? "mb-10" : "mb-20"}`}>
          <span style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: viewMode === "mobile" ? "18px" : "22px",
            fontWeight: "600",
            color: "#1A1A1A",
            letterSpacing: "-0.02em",
          }}>
            Unpaste
          </span>
          {viewMode === "desktop" && (
            <div className="flex items-center gap-8">
              <span style={{ fontSize: "14px", color: "#78716C" }}>How it works</span>
              <span style={{ fontSize: "14px", color: "#78716C" }}>Services</span>
              <span style={{ fontSize: "14px", color: "#78716C" }}>Case studies</span>
              <button style={{
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "#1A1A1A",
                color: "#FAF9F7",
                padding: "10px 20px",
                borderRadius: "6px",
              }}>
                Free Assessment
              </button>
            </div>
          )}
          {viewMode === "mobile" && (
            <button style={{
              fontSize: "12px",
              fontWeight: "500",
              backgroundColor: "#1A1A1A",
              color: "#FAF9F7",
              padding: "8px 16px",
              borderRadius: "6px",
            }}>
              Assess
            </button>
          )}
        </div>

        {/* Hero */}
        <div>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: viewMode === "mobile" ? "13px" : "15px",
            fontStyle: "italic",
            color: "#2563EB",
            marginBottom: viewMode === "mobile" ? "16px" : "24px",
          }}>
            The five-minute assessment that finds your hidden hours.
          </p>

          <h1 style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: viewMode === "mobile" ? "28px" : "clamp(36px, 4.5vw, 56px)",
            fontWeight: "400",
            lineHeight: "1.15",
            color: "#1A1A1A",
            letterSpacing: "-0.02em",
            marginBottom: viewMode === "mobile" ? "20px" : "28px",
          }}>
            Most businesses lose 10+ hours a week to tasks that could run themselves.
          </h1>

          <div style={{
            fontSize: viewMode === "mobile" ? "14px" : "17px",
            color: "#57534E",
            lineHeight: "1.75",
            maxWidth: "520px",
          }}>
            <p style={{ marginBottom: "16px" }}>
              You're not lazy. You're not inefficient. You're just doing work
              that software should be doing for you.
            </p>
            <p>
              Our free assessment identifies exactly where the time goes—and
              shows you how to get it back.
            </p>
          </div>

          <div className={`flex ${viewMode === "mobile" ? "flex-col gap-3 mt-8" : "items-center gap-4 mt-10"}`}>
            <button style={{
              fontSize: viewMode === "mobile" ? "14px" : "15px",
              fontWeight: "500",
              backgroundColor: "#2563EB",
              color: "white",
              padding: viewMode === "mobile" ? "14px 24px" : "14px 28px",
              borderRadius: "8px",
              width: viewMode === "mobile" ? "100%" : "auto",
            }}>
              Take the Assessment →
            </button>
            <span style={{ fontSize: "13px", color: "#A8A29E", textAlign: viewMode === "mobile" ? "center" : "left" }}>
              Takes 5 minutes
            </span>
          </div>
        </div>

        {/* Quote + Stats */}
        <div className={`border-t border-[#E7E5E4] ${viewMode === "mobile" ? "mt-10 pt-8" : "mt-16 pt-10"}`}>
          <blockquote style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: viewMode === "mobile" ? "18px" : "24px",
            fontStyle: "italic",
            color: "#1A1A1A",
            lineHeight: "1.4",
            marginBottom: "12px",
          }}>
            "We found 12 hours a week of manual work that didn't need to exist."
          </blockquote>
          <div style={{ fontSize: viewMode === "mobile" ? "12px" : "13px", color: "#78716C" }}>
            — Operations Director, Brisbane logistics company
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 ${viewMode === "mobile" ? "mt-8" : "mt-10"}`}>
            {[
              { num: "847", label: "Assessments" },
              { num: "10.3hrs", label: "Avg recovered" },
              { num: "94%", label: "Find opportunities" },
            ].map((stat, i) => (
              <div key={i}>
                <span style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: viewMode === "mobile" ? "20px" : "28px",
                  fontWeight: "600",
                  color: "#1A1A1A",
                }}>
                  {stat.num}
                </span>
                <div style={{ fontSize: viewMode === "mobile" ? "10px" : "13px", color: "#78716C", marginTop: "2px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Style Board */}
      <div className="bg-[#27272A] rounded-xl p-6 border border-[#3F3F46]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-[#71717A] uppercase tracking-widest">Direction C</span>
              <span className="h-px flex-1 bg-[#3F3F46]" />
            </div>
            <h2 className="text-xl text-white font-medium mb-2">Paper & Ink</h2>
            <p className="text-[#A1A1AA] text-sm max-w-md">
              The New Yorker meets Y Combinator. Literary refinement with startup efficiency.
              Cream paper, crisp ink, thoughtful hierarchy. Intelligent without pretension.
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Palette</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded bg-[#FAF9F7]" />
                <div className="w-10 h-10 rounded bg-[#1A1A1A]" />
                <div className="w-10 h-10 rounded bg-[#2563EB]" />
                <div className="w-10 h-10 rounded bg-[#E7E5E4]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Typography</span>
              <div className="text-white text-sm">
                <div>Source Serif 4</div>
                <div className="text-[#71717A]">+ Inter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {viewMode === "desktop" ? (
        <div className="rounded-xl overflow-hidden">
          {content}
        </div>
      ) : (
        <MobileFrame>{content}</MobileFrame>
      )}
    </motion.div>
  );
}

// ============================================
// OPTION D: Neon Terminal
// ============================================
function StyleD({ viewMode }: StyleProps) {
  const content = (
    <div
      className="min-h-full relative"
      style={{
        backgroundColor: "#030712",
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)
        `,
      }}
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #10B981 0px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
        }}
      />

      <div className={`relative ${viewMode === "mobile" ? "p-5 pt-12" : "p-8 md:p-16"}`}>
        {/* Terminal header */}
        <div className={`flex items-center justify-between ${viewMode === "mobile" ? "mb-8" : "mb-12"}`}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: viewMode === "mobile" ? "10px" : "13px",
              color: "#6B7280",
            }}>
              {viewMode === "mobile" ? "unpaste" : "unpaste — efficiency_audit.sh"}
            </span>
          </div>
          <button style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: viewMode === "mobile" ? "10px" : "12px",
            color: "#10B981",
            padding: viewMode === "mobile" ? "4px 8px" : "6px 12px",
            border: "1px solid #10B981",
            borderRadius: "4px",
          }}>
            run
          </button>
        </div>

        {/* Content */}
        <div className={viewMode === "mobile" ? "mb-8" : "mb-12"}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: viewMode === "mobile" ? "11px" : "13px",
            color: "#6B7280",
            marginBottom: "8px",
          }}>
            <span style={{ color: "#10B981" }}>$</span> ./analyze-workflow --verbose
          </div>

          <h1 style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: viewMode === "mobile" ? "28px" : "clamp(32px, 5vw, 56px)",
            fontWeight: "700",
            lineHeight: "1.1",
            color: "#F9FAFB",
            letterSpacing: "-0.03em",
            marginBottom: viewMode === "mobile" ? "16px" : "24px",
          }}>
            Find the <span style={{ color: "#10B981" }}>10+ hours</span><br />
            hiding in your ops stack.
          </h1>

          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: viewMode === "mobile" ? "12px" : "14px",
            color: "#9CA3AF",
            lineHeight: "1.8",
            maxWidth: "500px",
            marginBottom: viewMode === "mobile" ? "20px" : "32px",
          }}>
            // Manual processes = technical debt.<br />
            // Our 5-min assessment finds them.<br />
            // Then we help you automate them.
          </p>

          <div className={`flex ${viewMode === "mobile" ? "flex-col gap-3" : "items-center gap-4"}`}>
            <button style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: viewMode === "mobile" ? "12px" : "13px",
              fontWeight: "500",
              backgroundColor: "#10B981",
              color: "#030712",
              padding: viewMode === "mobile" ? "12px 20px" : "14px 24px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: viewMode === "mobile" ? "100%" : "auto",
            }}>
              <span>▶</span> start assessment
            </button>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: viewMode === "mobile" ? "10px" : "12px",
              color: "#6B7280",
              textAlign: viewMode === "mobile" ? "center" : "left",
            }}>
              ~5min | no login required
            </span>
          </div>
        </div>

        {/* Data readout */}
        <div
          className={`rounded-lg ${viewMode === "mobile" ? "p-4" : "p-6"}`}
          style={{
            backgroundColor: "#111827",
            border: "1px solid #1F2937",
          }}
        >
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: viewMode === "mobile" ? "9px" : "11px",
            color: "#6B7280",
            marginBottom: viewMode === "mobile" ? "12px" : "16px",
          }}>
            SYSTEM_METRICS.stdout
          </div>
          <div className={`grid ${viewMode === "mobile" ? "grid-cols-2 gap-4" : "grid-cols-4 gap-6"}`}>
            {[
              { label: "avg_hours_saved", value: "10.3", unit: "hrs/wk" },
              { label: "assessments_run", value: "847", unit: "total" },
              { label: "automation_rate", value: "94", unit: "%" },
              { label: "avg_roi", value: "312", unit: "%" },
            ].map((metric, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: viewMode === "mobile" ? "9px" : "11px",
                  color: "#6B7280",
                  marginBottom: "4px",
                }}>
                  {metric.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: viewMode === "mobile" ? "20px" : "28px",
                    fontWeight: "600",
                    color: "#10B981",
                  }}>
                    {metric.value}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: viewMode === "mobile" ? "10px" : "12px",
                    color: "#6B7280",
                  }}>
                    {metric.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Style Board */}
      <div className="bg-[#27272A] rounded-xl p-6 border border-[#3F3F46]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-[#71717A] uppercase tracking-widest">Direction D</span>
              <span className="h-px flex-1 bg-[#3F3F46]" />
            </div>
            <h2 className="text-xl text-white font-medium mb-2">Neon Terminal</h2>
            <p className="text-[#A1A1AA] text-sm max-w-md">
              Cyberpunk meets Bloomberg Terminal. Dark canvas with electric green accents,
              monospace typography, data-rich displays. Appeals to technical founders.
            </p>
          </div>
          <div className="flex gap-8">
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Palette</span>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded bg-[#030712]" />
                <div className="w-10 h-10 rounded bg-[#111827]" />
                <div className="w-10 h-10 rounded bg-[#10B981]" />
                <div className="w-10 h-10 rounded bg-[#F9FAFB]" />
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#71717A] uppercase tracking-widest block mb-3">Typography</span>
              <div className="text-white text-sm">
                <div>JetBrains Mono</div>
                <div className="text-[#71717A]">+ Inter</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {viewMode === "desktop" ? (
        <div className="rounded-xl overflow-hidden">
          {content}
        </div>
      ) : (
        <MobileFrame>{content}</MobileFrame>
      )}
    </motion.div>
  );
}
