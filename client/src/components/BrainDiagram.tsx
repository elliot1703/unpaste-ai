/**
 * The AI-brain, drawn.
 *
 * Explains the product faster than a paragraph: your operating knowledge sits
 * in one file, the AI reads it before every task, and correcting the output
 * writes back into the file. The feedback arrow is the point — it's what makes
 * this an asset that improves rather than a subscription that doesn't.
 *
 * Inline SVG on purpose: it inherits currentColor, so it works on either
 * background and needs no extra network request.
 */
export function BrainDiagram() {
  return (
    <svg
      className="brain-diagram"
      viewBox="0 0 720 400"
      role="img"
      aria-label="Your CLAUDE.md file holds how you work, your never-list and your voice. The AI reads it before every job — the weekly document, the inbox, quotes and proposals — and every correction you make is written back into the file."
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ---- the file ---- */}
      <rect x="200" y="24" width="320" height="118" className="bd-box bd-box--primary" />
      <text x="216" y="52" className="bd-kicker">
        YOUR CLAUDE.MD
      </text>
      <text x="216" y="82" className="bd-title">
        THE BRAIN
      </text>
      <text x="216" y="106" className="bd-body">
        how you work · your voice
      </text>
      <text x="216" y="126" className="bd-body">
        your standards · the never-list
      </text>

      {/* ---- trunk down to the split ---- */}
      <line x1="360" y1="142" x2="360" y2="186" className="bd-line" />
      <line x1="120" y1="186" x2="600" y2="186" className="bd-line" />
      <line x1="120" y1="186" x2="120" y2="214" className="bd-line" />
      <line x1="360" y1="186" x2="360" y2="214" className="bd-line" />
      <line x1="600" y1="186" x2="600" y2="214" className="bd-line" />

      <text x="372" y="172" className="bd-edge">
        read before every job
      </text>

      {/* ---- the jobs ---- */}
      <rect x="40" y="214" width="160" height="76" className="bd-box" />
      <text x="56" y="244" className="bd-job">
        THE WEEKLY
      </text>
      <text x="56" y="264" className="bd-job">
        DOCUMENT
      </text>
      <text x="56" y="282" className="bd-body">
        drafts itself
      </text>

      <rect x="280" y="214" width="160" height="76" className="bd-box" />
      <text x="296" y="244" className="bd-job">
        THE INBOX
      </text>
      <text x="296" y="264" className="bd-body">
        triaged, drafted,
      </text>
      <text x="296" y="282" className="bd-body">
        waiting for you
      </text>

      <rect x="520" y="214" width="160" height="76" className="bd-box" />
      <text x="536" y="244" className="bd-job">
        QUOTES &amp;
      </text>
      <text x="536" y="264" className="bd-job">
        PROPOSALS
      </text>
      <text x="536" y="282" className="bd-body">
        in your wording
      </text>

      {/* ---- the loop back: out of the jobs, round the outside, into the file ---- */}
      <path
        d="M 700 252 L 700 330 L 20 330 L 20 83 L 188 83"
        className="bd-line bd-line--accent"
        fill="none"
      />
      <line x1="680" y1="252" x2="700" y2="252" className="bd-line bd-line--accent" />
      <polygon points="200,83 188,77 188,89" className="bd-arrow" />

      <text x="360" y="356" className="bd-edge bd-edge--accent" textAnchor="middle">
        every correction you make is written back into the file
      </text>
      <text x="360" y="378" className="bd-body" textAnchor="middle">
        which is why it gets better, and a subscription doesn't
      </text>
    </svg>
  );
}
