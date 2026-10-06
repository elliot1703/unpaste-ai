// Tools the workshop connects an agent to. Logos in /images/logos are the
// official current marks: Wikimedia Commons SVGs for seven, App Store icons
// (PNG) for ServiceM8 and Canva. Order is the order on the page.

export type Tool = { key: string; name: string; logo: string };

export const TOOLS: Tool[] = [
  { key: "servicem8", name: "ServiceM8", logo: "/images/logos/servicem8.png" },
  { key: "shopify", name: "Shopify", logo: "/images/logos/shopify.svg" },
  { key: "hubspot", name: "HubSpot", logo: "/images/logos/hubspot.svg" },
  { key: "instagram", name: "Instagram", logo: "/images/logos/instagram.svg" },
  { key: "googleads", name: "Google Ads", logo: "/images/logos/googleads.svg" },
  { key: "meta", name: "Meta Ads", logo: "/images/logos/meta.svg" },
  { key: "gmail", name: "Gmail", logo: "/images/logos/gmail.svg" },
  { key: "googledrive", name: "Google Drive", logo: "/images/logos/googledrive.svg" },
  { key: "canva", name: "Canva", logo: "/images/logos/canva.png" },
];

export const toolByKey = (key: string): Tool => TOOLS.find((t) => t.key === key)!;

/** What you ask, and what the agent does across the tools. Framed as what
 *  you can set up, never as a result someone already got. */
export type Example = {
  ask: string;
  steps: { text: string; tool: string }[];
  result: string;
};

export const EXAMPLES: Example[] = [
  {
    ask: "Quote the Henderson job from the site photos and send it before 5.",
    steps: [
      { text: "Reads the job and photos", tool: "servicem8" },
      { text: "Prices it from your rate card in Drive", tool: "googledrive" },
      { text: "Sends the quote from your inbox", tool: "gmail" },
    ],
    result: "Quote sent · 4:12pm",
  },
  {
    ask: "Draft this week's posts from the three product photos and get them ready to go.",
    steps: [
      { text: "Pulls the products and prices", tool: "shopify" },
      { text: "Lays out the posts in your brand kit", tool: "canva" },
      { text: "Stages three posts with captions for approval", tool: "instagram" },
    ],
    result: "3 posts waiting for your OK",
  },
  {
    ask: "What did the ads do last week, and who should I call today?",
    steps: [
      { text: "Pulls spend and leads from both accounts", tool: "meta" },
      { text: "Checks the Google side too", tool: "googleads" },
      { text: "Lists the new leads with notes", tool: "hubspot" },
    ],
    result: "Monday brief · 7:02am",
  },
];
