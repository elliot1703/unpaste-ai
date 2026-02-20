import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const routes = [
  "/",
  "/assessment",
  "/solutions",
  "/about",
  "/book",
  "/privacy",
  "/terms",
];

async function prerender() {
  const template = readFileSync(
    resolve(root, "dist/public/index.html"),
    "utf-8"
  );
  const { render } = await import(
    resolve(root, "dist/server/entry-server.js")
  );

  for (const route of routes) {
    const { html, helmet } = render(route);
    let page = template;

    // Inject rendered HTML into the root div
    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // Inject Helmet head tags (per-page title, meta, etc.)
    if (helmet) {
      // Replace the default <title> with Helmet's per-page title
      if (helmet.title) {
        page = page.replace(/<title>[^<]*<\/title>/, helmet.title.toString());
      }

      // Replace the default meta description with Helmet's per-page description
      if (helmet.meta) {
        const metaStr = helmet.meta.toString();
        // Extract just the description meta from helmet output
        const descMatch = metaStr.match(
          /<meta[^>]*name="description"[^>]*\/?>|<meta[^>]*name="description"[^>]*>[^<]*<\/meta>/
        );
        if (descMatch) {
          page = page.replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            descMatch[0]
          );
        }
      }

      // Add link tags (canonical URLs) before </head>
      if (helmet.link) {
        const linkStr = helmet.link.toString();
        if (linkStr) {
          page = page.replace("</head>", `  ${linkStr}\n</head>`);
        }
      }

      // Add script tags (JSON-LD structured data) before </head>
      if (helmet.script) {
        const scriptStr = helmet.script.toString();
        if (scriptStr) {
          page = page.replace("</head>", `  ${scriptStr}\n</head>`);
        }
      }
    }

    // Write to correct path (e.g., /solutions → dist/public/solutions/index.html)
    const filePath =
      route === "/"
        ? resolve(root, "dist/public/index.html")
        : resolve(root, `dist/public${route}/index.html`);

    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, page);
    console.log(
      `  Prerendered: ${route} → ${filePath.replace(root + "/", "")}`
    );
  }

  console.log(`\n✓ Prerendered ${routes.length} routes`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
