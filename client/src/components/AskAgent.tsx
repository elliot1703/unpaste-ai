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
type Mood = "idle" | "thinking" | "happy" | "oops";

/**
 * The Unpaste square, sheet 5 (7 Oct 2026): hard corners, the face is cut
 * out of the red so the card shows through. Pupils follow the pointer, it
 * blinks on a timer, looks up with a starburst while thinking, grins when an
 * answer lands, and goes half-lidded on "oops". No limbs. Inline SVG; the
 * holes are a mask so they're true cut-outs on any background.
 */
function Mascot({ mood, look, small }: { mood: Mood; look: { x: number; y: number }; small?: boolean }) {
  const id = small ? "mk-s" : "mk";
  const px = mood === "thinking" ? -2.5 : look.x * 3;
  const py = mood === "thinking" ? -3.5 : look.y * 2.4;
  const lidded = mood === "oops";
  return (
    <svg className={`mascot mascot-${mood}${small ? " mascot-small" : ""}`} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#fff" />
          {mood === "happy" ? (
            <>
              {/* closed happy eyes: curved slits */}
              <path d="M14 29q7-9 14 0" stroke="#000" strokeWidth="3.4" fill="none" strokeLinecap="round" />
              <path d="M36 29q7-9 14 0" stroke="#000" strokeWidth="3.4" fill="none" strokeLinecap="round" />
              {/* grin notch cut from the bottom edge */}
              <path d="M22 62a10 10 0 0 1 20 0z" fill="#000" />
            </>
          ) : lidded ? (
            <>
              <rect x="13" y="26" width="16" height="5" fill="#000" />
              <rect x="35" y="26" width="16" height="5" fill="#000" />
              <rect x="25" y="46" width="14" height="3" fill="#000" />
            </>
          ) : (
            <>
              <ellipse cx="22" cy="28" rx="7" ry="9" fill="#000" />
              <ellipse cx="42" cy="28" rx="7" ry="9" fill="#000" />
              {/* blink lid: a red rect that drops over the holes (height animated in CSS) */}
              <rect className="mascot-lid" x="12" y="17" width="40" height="0" fill="#fff" />
              {mood === "thinking" && (
                <g stroke="#000" strokeWidth="2.6" strokeLinecap="round" transform="translate(53 11)">
                  <path d="M0-6V6M-6 0H6M-4.2-4.2l8.4 8.4M-4.2 4.2l8.4-8.4" />
                </g>
              )}
              {mood === "idle" && <path d="M44 62h8l-4-6z" fill="#000" />}
            </>
          )}
        </mask>
      </defs>
      <rect className="mascot-body" x="2" y="2" width="60" height="60" fill="#DC2626" mask={`url(#${id})`} />
      {!lidded && mood !== "happy" && (
        <g className="mascot-pupils">
          <circle cx={22 + px} cy={28 + py} r="3.8" fill="#0a0a0a" />
          <circle cx={42 + px} cy={28 + py} r="3.8" fill="#0a0a0a" />
        </g>
      )}
      {lidded && (
        <>
          <circle cx="24" cy="28.5" r="2.2" fill="#0a0a0a" />
          <circle cx="46" cy="28.5" r="2.2" fill="#0a0a0a" />
        </>
      )}
    </svg>
  );
}

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
  const cardRef = useRef<HTMLElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0.3 });
  const [happy, setHappy] = useState(false);
  const [oops, setOops] = useState(false);
  const asked = turns.filter((t) => t.role === "user").length;
  const mood: Mood = busy ? "thinking" : happy ? "happy" : oops ? "oops" : "idle";

  // Eyes follow the pointer / finger across the card; while typing they watch the input.
  function track(clientX: number, clientY: number) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((clientX - r.left) / r.width - 0.2) * 2));
    const y = Math.max(-1, Math.min(1, ((clientY - r.top) / r.height - 0.2) * 2));
    setLook({ x, y });
  }

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
      setHappy(true);
      window.setTimeout(() => setHappy(false), 1400);
    } catch {
      setTurns([...next, { role: "assistant", content: "The agent dropped out for a second. Try again, or apply on this page and Elliot will answer you directly." }]);
      setOops(true);
      window.setTimeout(() => setOops(false), 2200);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <aside
      className="ask"
      role="dialog"
      aria-label="Ask the agent that built this page"
      ref={cardRef}
      onMouseMove={(e) => track(e.clientX, e.clientY)}
      onTouchMove={(e) => { const t = e.touches[0]; if (t) track(t.clientX, t.clientY); }}
    >
      <button type="button" className="ask-close" onClick={() => setOpen(false)} aria-label="Close">
        <X />
      </button>
      <div className="ask-head">
        <Mascot mood={mood} look={look} />
        <div>
          <p className="ask-kicker">You scrolled past the end.</p>
          <h2>Hi. I built this page.</h2>
        </div>
      </div>
      <p className="ask-lede">
        The page, the form, the emails and the ads, with Claude Code and Elliot, in two days. Ask me anything about the {offer.slug === "workshop" ? "workshop" : offer.slug === "team" ? "team training" : "1:1 day"}.
      </p>

      {turns.length > 0 && (
        <div className="ask-thread" ref={threadRef}>
          {turns.map((t, i) => (
            t.role === "user"
              ? <p key={i} className="ask-q">{t.content}</p>
              : <div key={i} className="ask-row"><Mascot mood="idle" look={{ x: 0.4, y: 0.2 }} small /><p className="ask-a">{t.content}</p></div>
          ))}
          {busy && <div className="ask-row"><Mascot mood="thinking" look={look} small /><p className="ask-a ask-busy"><span /><span /><span /></p></div>}
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
            onChange={(e) => { setInput(e.target.value); setLook({ x: -0.6, y: 0.9 }); }}
            onFocus={() => setLook({ x: -0.6, y: 0.9 })}
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
