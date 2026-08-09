import {
  GmailColourIcon,
  ShopifyColourIcon,
  MetaColourIcon,
  XeroColourIcon,
  HubSpotColourIcon,
  GoogleSheetsColourIcon,
} from "@/components/BrandIcons";

/**
 * Three layers: any agent, one folder of rules, all your tools.
 *
 * The middle layer is the product. The top layer is why it isn't a lock-in —
 * the rules are plain markdown in a folder, so whichever agent you point at it
 * reads the same rules. The bottom layer is what makes it useful rather than
 * tidy: the agent is the link between systems that were never going to
 * integrate with each other.
 *
 * HTML rather than SVG so the tool row uses the real brand components, and so
 * it reflows properly on a phone instead of scaling to unreadable.
 */

const AGENTS = ["Claude Code", "Codex", "Hermes", "OpenClaw"];

const TOOLS = [
  { name: "Gmail", Icon: GmailColourIcon },
  { name: "Shopify", Icon: ShopifyColourIcon },
  { name: "Meta Ads", Icon: MetaColourIcon },
  { name: "Xero", Icon: XeroColourIcon },
  { name: "HubSpot", Icon: HubSpotColourIcon },
  { name: "Sheets", Icon: GoogleSheetsColourIcon },
];

export function BrainDiagram() {
  return (
    <div className="brain-stack">
      {/* ---- any agent ---- */}
      <div className="brain-row">
        <span className="mono-label brain-row__label">
          Bring whichever agent you use
        </span>
        <div className="brain-agents">
          {AGENTS.map((a) => (
            <span key={a} className="brain-agent">
              {a}
            </span>
          ))}
        </div>
      </div>

      <Connector label="all read the same rules" />

      {/* ---- the folder ---- */}
      <div className="brain-core">
        <span className="section-tag">YOUR BUSINESS FOLDER</span>
        <h3 className="brain-core__title">THE RULES, WRITTEN DOWN ONCE</h3>
        <p className="brain-core__body">
          How you word things · what you never do · who gets a call not an email
          · your standards, your voice, your exceptions
        </p>
        <span className="mono-label">
          Plain markdown. Yours. Portable. Not locked to any vendor.
        </span>
      </div>

      <Connector label="the agent is the link between them" accent />

      {/* ---- your tools ---- */}
      <div className="brain-row">
        <span className="mono-label brain-row__label">
          Connected to what you already run
        </span>
        <div className="brain-tools">
          {TOOLS.map(({ name, Icon }) => (
            <span key={name} className="brain-tool">
              <Icon className="h-6 w-6" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Connector({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`brain-connector${accent ? " brain-connector--accent" : ""}`}>
      <span className="brain-connector__line" aria-hidden="true" />
      <span className="brain-connector__label">{label}</span>
      <span className="brain-connector__line" aria-hidden="true" />
    </div>
  );
}
