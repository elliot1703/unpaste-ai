# Unpaste.ai Website

**Stack:** Vite + React 19 + TypeScript + Tailwind v4
**Hosting:** Vercel (auto-deploy on push to main; the live project is `unpaste-ai-d8qr`, the older `unpaste-ai` project has no domain)
**Repo:** `elliot1703/unpaste-ai`

## Project Context

Marketing website for Unpaste: AI workshops, 1:1 setup days and team training in Brisbane. The three offer pages are the funnel. A short form reveals the price and posts the lead to Klaviyo through `api/apply.ts`.

## Key Routes

- `/`: home (hero, then the three offers)
- `/workshops`, `/one-on-one`, `/team-training`: offer pages, one template (`client/src/pages/OfferPage.tsx`), facts in `client/src/lib/offers.ts`
- `/claude-and-coffee`, `/resources`, `/reviews`, `/book`
- Retired, redirected in `vercel.json`: `/coaching`, `/training`, `/assessment` (the 15-question quiz, removed 12 Nov 2026)

## Server Code

- Only `api/*` runs in production, as Vercel functions.
- `server/index.ts` is for local `pnpm start` and never runs on Vercel. An endpoint defined only there returns 404 on unpaste.ai. The assessment quiz posted to one for nine months and every lead was dropped without an error.
- After adding or moving an endpoint, request it on the preview URL before merging.

## Development Notes

- Tailwind v4 (CSS-first config, not tailwind.config.js)
- React 19 with new features (use, useFormStatus, etc.)
- Routes are prerendered at build (`scripts/prerender.mjs`); the sitemap is generated from the indexable ones
- Vercel Web Analytics is enabled and collecting (dashboard only on the Hobby plan, the query API is not available)

## Deploy

Push to `main` triggers auto-deploy. Verify with `curl -sI https://unpaste.ai | grep "HTTP/2 200"`.
