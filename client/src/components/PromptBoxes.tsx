// Three "what you'll actually say" boxes for the workshop page, each in a
// chat idiom the reader already knows — deliberately NOT in the site's
// brutalist style. Familiarity is the point: the reader should think "I know
// that box" before they think anything else. The mono outcome tag underneath
// is the one on-brand touch tying each back to the page.
//
// One box per idiom, used once each at different points on the page — the
// same visual won't land with everyone, so the page rotates through them.

/** Unpaste-mono caption grounding a chat box in a concrete result. */
function OutcomeTag({ after, result }: { after: string; result: string }) {
  return (
    <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
      &rarr; <span className="font-bold text-primary">{after}:</span> {result}
    </p>
  );
}

/**
 * B — the Claude Desktop composer, mid-type with a blinking caret. The only
 * one of the three that's literally true to the product: this is the box the
 * workshop puts on their laptop.
 */
export function ComposerBox({
  prompt,
  after,
  result,
}: {
  prompt: string;
  after: string;
  result: string;
}) {
  return (
    <div className="max-w-md">
      <div className="rounded-[20px] border border-[#E8E6DC] bg-[#FAF9F5] p-5">
        <div className="rounded-2xl border border-[#DEDCD1] bg-white p-3.5 pb-2.5 shadow-sm">
          <p className="min-h-11 text-[14.5px] leading-normal text-[#1F1E1D]">
            {prompt}
            <span className="prompt-caret ml-px inline-block h-[1.1em] w-0.5 translate-y-[3px] bg-[#D97757]" />
          </p>
          <div className="mt-3 flex items-center">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#DEDCD1] text-base font-light text-[#6E6D66]">
              +
            </span>
            <span className="ml-auto mr-2.5 text-xs text-[#6E6D66]">Claude</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D97757] text-sm text-white">
              &uarr;
            </span>
          </div>
        </div>
      </div>
      <OutcomeTag after={after} result={result} />
    </div>
  );
}

/**
 * C — a sent message inside a Claude chat, with Claude starting on the job.
 * The reply line name-drops the brain ("your brand voice file") on purpose.
 */
export function ClaudeConvo({
  prompt,
  reply,
  after,
  result,
}: {
  prompt: string;
  reply: string;
  after: string;
  result: string;
}) {
  return (
    <div className="max-w-md">
      <div className="rounded-[20px] border border-[#E8E6DC] bg-[#FAF9F5] p-5">
        <p className="mb-3.5 ml-12 rounded-xl bg-[#F0EEE6] px-4 py-3 text-[14.5px] leading-normal text-[#1F1E1D]">
          {prompt}
        </p>
        <div className="flex items-start gap-2.5">
          <span className="text-[15px] leading-normal text-[#D97757]">✱</span>
          <p className="text-sm leading-relaxed text-[#3D3D3A]">
            {reply}
            <span className="tracking-widest text-[#A8A69D]">…</span>
          </p>
        </div>
      </div>
      <OutcomeTag after={after} result={result} />
    </div>
  );
}

/**
 * A — an iMessage thread with the work coming back done. The most familiar
 * shape of the three; illustrative rather than literal (nobody texts Claude
 * Code), which is why the reply bubble carries the proof.
 */
export function IMessageThread({
  messages,
  reply,
  after,
  result,
}: {
  /** One or two blue sent bubbles. */
  messages: string[];
  reply: string;
  after: string;
  result: string;
}) {
  return (
    <div className="max-w-md">
      <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
        <p className="mb-3 text-center text-[11px] font-medium text-[#8E8E93]">
          Today 9:12 AM
        </p>
        {messages.map((m) => (
          <div key={m} className="mb-2 flex justify-end">
            <p className="max-w-[78%] rounded-[18px] rounded-br-[5px] bg-gradient-to-b from-[#3D9BFF] to-[#0A7CFF] px-3.5 py-2 text-[14.5px] leading-snug text-white">
              {m}
            </p>
          </div>
        ))}
        <div className="mb-1 flex">
          <p className="max-w-[78%] rounded-[18px] rounded-bl-[5px] bg-[#E9E9EB] px-3.5 py-2 text-[14.5px] leading-snug text-[#111111]">
            {reply}
          </p>
        </div>
        <p className="pr-1.5 text-right text-[10.5px] text-[#8E8E93]">Delivered</p>
      </div>
      <OutcomeTag after={after} result={result} />
    </div>
  );
}
