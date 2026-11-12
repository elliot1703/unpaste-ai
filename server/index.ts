// Local `pnpm start` only. Vercel serves dist/public and the functions in api/;
// nothing in this file runs in production, so an endpoint defined here does not
// exist on unpaste.ai. Put endpoints in api/.

import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // First-notice capture for the next Brisbane workshop. This deliberately
  // records interest rather than pretending an undated session is bookable.
  app.post("/api/workshop-interest", async (req, res) => {
    try {
      const lead = req.body;
      if (
        typeof lead?.name !== "string" ||
        !lead.name.trim() ||
        typeof lead?.email !== "string" ||
        !lead.email.includes("@")
      ) {
        return res.status(400).json({ ok: false });
      }
      console.log("[WORKSHOP INTEREST]", JSON.stringify(lead));

      const webhookUrl =
        process.env.WORKSHOP_INTEREST_WEBHOOK_URL ||
        process.env.ASSESSMENT_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "workshop-interest", ...lead }),
        }).catch((err: unknown) =>
          console.error("[WORKSHOP INTEREST WEBHOOK ERROR]", err)
        );
      }

      res.status(202).json({ ok: true });
    } catch {
      res.status(500).json({ ok: false });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
