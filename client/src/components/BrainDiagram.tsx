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

      {/* ---- the folder, shown rather than described ---- */}
      <div className="brain-core">
        <span className="section-tag">YOUR BUSINESS FOLDER</span>
        <h3 className="brain-core__title">THE RULES, WRITTEN DOWN ONCE</h3>
        <FolderTree />
        <span className="mono-label">
          Plain files on your computer. Yours. Not locked to any vendor.
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

/**
 * The folder, drawn as a folder — a rendered tree beats any sentence about
 * "your rules in plain text". Annotations say what each part is for in words
 * a first-timer already has.
 */
const TREE: { depth: 0 | 1; name: string; note?: string; accent?: boolean }[] = [
  { depth: 0, name: "my-business/" },
  { depth: 1, name: "RULES.md", note: "how you work · the never-list", accent: true },
  { depth: 1, name: "clients/", note: "one folder per client" },
  { depth: 1, name: "quotes/" },
  { depth: 1, name: "invoices/" },
  { depth: 1, name: "skills/", note: "jobs it has learned to do" },
  { depth: 1, name: "inbox/", note: "drop things here, it sorts them" },
];

function FolderTree() {
  return (
    <div className="folder-tree" role="img" aria-label="Your business folder: a RULES file holding how you work and the never-list, plus folders for clients, quotes, invoices, learned skills, and an inbox it sorts for you">
      {TREE.map((row, i) => (
        <div key={row.name} className="folder-tree__row">
          <span className="folder-tree__branch" aria-hidden="true">
            {row.depth === 0 ? "" : i === TREE.length - 1 ? "└─ " : "├─ "}
          </span>
          <span className={`folder-tree__name${row.accent ? " folder-tree__name--accent" : ""}`}>
            {row.name}
          </span>
          {row.note && <span className="folder-tree__note">← {row.note}</span>}
        </div>
      ))}
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
