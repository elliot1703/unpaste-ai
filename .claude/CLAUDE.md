# Unpaste.ai Website

**Stack:** Vite + React 19 + TypeScript + Tailwind v4
**Hosting:** Vercel (auto-deploy on push to main)
**Repo:** `elliot1703/unpaste-ai`

## Project Context

Marketing website for Unpaste.ai automation consultancy. Core feature is the 15-question efficiency assessment funnel that leads to workshop bookings.

## Key Routes

- `/` — Landing page (hero + value prop + assessment CTA)
- `/assessment` — 15-question efficiency score quiz
- `/results` — Score display + workshop booking CTA

## Development Notes

- Tailwind v4 (CSS-first config, not tailwind.config.js)
- React 19 with new features (use, useFormStatus, etc.)
- Assessment state managed client-side
- Vercel analytics enabled

## Deploy

Push to `main` triggers auto-deploy. Verify with `curl -sI https://unpaste.ai | grep "HTTP/2 200"`.
