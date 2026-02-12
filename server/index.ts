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

  // Assessment lead capture endpoint
  app.post("/api/assessment-lead", async (req, res) => {
    try {
      const lead = req.body;
      // Log lead for now — replace with Google Sheet, email, or DB integration
      console.log("[LEAD]", JSON.stringify(lead));

      // If a webhook URL is configured, forward the lead data
      const webhookUrl = process.env.ASSESSMENT_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        }).catch((err: unknown) => console.error("[LEAD WEBHOOK ERROR]", err));
      }

      res.json({ ok: true });
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
