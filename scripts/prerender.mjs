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
  "/training",
  "/claude-code-training",
  "/workshops",
  "/workshops/booked",
  "/workshops/start",
  "/workshops/beyond-chat",
  "/workshops/systems",
  "/coaching",
  "/quick-wins",
  "/resources",
  "/claude-and-coffee",
  "/pricing",
  "/styles",
  "/privacy",
  "/terms",
];

async function prerender() {
  const rawTemplate = readFileSync(
    resolve(root, "dist/public/index.html"),
    "utf-8"
  );

  // Strip helmet-managed default meta tags from the template so per-page
  // values from react-helmet-async don't end up as duplicates (crawlers
  // typically honor the first occurrence). Preserves charset, viewport,
  // and google-site-verification.
  const template = rawTemplate
    .replace(/[\t ]*<meta\s+name="description"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+name="keywords"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+name="robots"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+name="title"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+property="og:[^"]*"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+property="twitter:[^"]*"[^>]*\/?>\n?/gi, "")
    .replace(/[\t ]*<meta\s+name="twitter:[^"]*"[^>]*\/?>\n?/gi, "");

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

    // Inject Helmet head tags (per-page title, meta, link, script)
    if (helmet) {
      if (helmet.title) {
        page = page.replace(/<title>[^<]*<\/title>/, helmet.title.toString());
      }

      const metaStr = helmet.meta?.toString() ?? "";
      if (metaStr) {
        page = page.replace("</head>", `  ${metaStr}\n</head>`);
      }

      const linkStr = helmet.link?.toString() ?? "";
      if (linkStr) {
        page = page.replace("</head>", `  ${linkStr}\n</head>`);
      }

      const scriptStr = helmet.script?.toString() ?? "";
      if (scriptStr) {
        page = page.replace("</head>", `  ${scriptStr}\n</head>`);
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

  // Sitemap is generated from the same route list so it cannot drift from
  // what is actually prerendered. Routes that are noindex or utility pages
  // are excluded here; keep this list in sync with the pages' noIndex props.
  // /workshops/* are the booked page and the noindex H1 variants (ads only).
  const sitemapExclude = new Set(["/styles", "/workshops/booked"]);
  const isExcluded = (r) => sitemapExclude.has(r) || r.startsWith("/workshops/");
  // Static pages under client/public that are not React routes but should be indexed.
  const sitemapExtra = ["/brand/template"];
  const today = new Date().toISOString().slice(0, 10);
  const included = [...routes.filter((r) => !isExcluded(r)), ...sitemapExtra];
  const urls = included
    .map((r) => {
      const priority = r === "/" ? "1.0" : r.split("/").length > 2 ? "0.6" : "0.8";
      return `  <url>\n    <loc>https://unpaste.ai${r === "/" ? "" : r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  writeFileSync(
    resolve(root, "dist/public/sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  console.log(`  Sitemap: ${included.length} URLs → dist/public/sitemap.xml`);

  console.log(`\n✓ Prerendered ${routes.length} routes`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
