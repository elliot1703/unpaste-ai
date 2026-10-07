import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import type { Offer } from "@/lib/offers";
import { trackMetaCustom } from "@/lib/metaPixel";

// Easter egg: scroll past the end of an offer page and a card slides up
// inviting the visitor to ask the agent that built the page about the offer.
// Answers come from /api/ask. Shown once per visitor (localStorage).
//
// Off unless VITE_ASK_AGENT_ENABLED=1. `?askagent=1` on the URL previews it
// regardless, so it can be checked on production before the flag is flipped.

const ENABLED = import.meta.env.VITE_ASK_AGENT_ENABLED === "1";
const SEEN_KEY = "unpaste-ask-agent-seen";
const MAX_QUESTIONS = 5;
const MAX_INPUT = 300;

const STARTERS = ["What do I need to bring?", "Is it for beginners?", "What's the price?", "Who's Elliot?"];

type Turn = { role: "user" | "assistant"; content: string };

function previewForced(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("askagent") === "1";
}

function seen(): boolean {
  try { return localStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
}
function markSeen(): void {
  try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* private mode: show again next time, fine */ }
}

export function AskAgent({ offer }: { offer: Offer }) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const asked = turns.filter((t) => t.role === "user").length;

  // Trigger: already at the bottom of the page, and the visitor scrolls down again.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const forced = previewForced();
    if (!(ENABLED || forced)) return;
    if (!forced && seen()) return;

    let fired = false;
    let touchY = 0;
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const fire = () => {
      if (fired) return;
      fired = true;
      markSeen();
      setOpen(true);
      trackMetaCustom("AskAgentOpened", { offer: offer.slug });
      cleanup();
    };
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 0 && atBottom()) fire(); };
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0]?.clientY ?? 0; };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (touchY - y > 24 && atBottom()) fire();
    };
    const cleanup = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return cleanup;
  }, [offer.slug]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy]);

  async function ask(question: string) {
    const q = question.trim().slice(0, MAX_INPUT);
    if (!q || busy || asked >= MAX_QUESTIONS) return;
    const next: Turn[] = [...turns, { role: "user", content: q }];
    setTurns(next);
    setInput("");
    setBusy(true);
    trackMetaCustom("AskAgentQuestion", { offer: offer.slug });
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ offer: offer.slug, messages: next }),
      });
      const data = (await res.json()) as { answer?: string };
      setTurns([...next, { role: "assistant", content: data.answer || "Apply on this page and Elliot will answer that one directly." }]);
    } catch {
      setTurns([...next, { role: "assistant", content: "The agent dropped out for a second. Try again, or apply on this page and Elliot will answer you directly." }]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <aside className="ask" role="dialog" aria-label="Ask the agent that built this page">
      <button type="button" className="ask-close" onClick={() => setOpen(false)} aria-label="Close">
        <X />
      </button>
      <p className="ask-kicker">You scrolled past the end.</p>
      <h2>Ask the agent that built this page.</h2>
      <p className="ask-lede">
        This page, the form, the emails and the ads were built with Claude Code in two days. Ask it anything about the {offer.slug === "workshop" ? "workshop" : offer.slug === "team" ? "team training" : "1:1 day"}.
      </p>

      {turns.length > 0 && (
        <div className="ask-thread" ref={threadRef}>
          {turns.map((t, i) => (
            <p key={i} className={t.role === "user" ? "ask-q" : "ask-a"}>{t.content}</p>
          ))}
          {busy && <p className="ask-a ask-busy">Thinking.</p>}
        </div>
      )}

      {turns.length === 0 && (
        <div className="ask-starters">
          {STARTERS.map((s) => (
            <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
          ))}
        </div>
      )}

      {asked < MAX_QUESTIONS ? (
        <form
          className="ask-form"
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
        >
          <input
            type="text"
            value={input}
            maxLength={MAX_INPUT}
            placeholder={offer.slug === "workshop" ? "Ask about the workshop" : "Ask about the day"}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            aria-label="Your question"
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
            <Send />
          </button>
        </form>
      ) : (
        <p className="ask-done">That's five. Apply on this page and Elliot answers the rest himself.</p>
      )}
    </aside>
  );
}
