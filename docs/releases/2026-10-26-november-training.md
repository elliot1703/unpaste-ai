# November one-on-one landing page

Approved for publication by Elliot on 26 October 2026.

- Campaign URL: https://unpaste.ai/one-on-one/november
- Source: client/public/november-training; private resources: private/starter-kit.
- Offer: three hours, one project, discovery-call CTAs, four weeks of WhatsApp support.
- Includes the approved workshop photo and Meet your trainer section immediately before the possibilities.
- Built from production commit 051b7ef4490f2712d527ec2502f1c70e167ab585, separate from unpublished work on one-on-one/grand-slam.

## Email capture

POST /api/starter-kit creates or updates a Klaviyo profile in Unpaste (public site ID XwRedj), with workspace_starter_kit_* properties. It does not subscribe to marketing or send an email. After API acceptance, a signed seven-day cookie unlocks resources on this site. Klaviyo profile visibility is asynchronous; the preview QA profile and source properties were verified through the connected Klaviyo account after processing.

STARTER_KIT_SIGNING_SECRET is stored as a sensitive Vercel environment variable for production and preview, never in source. Downloads require the signed cookie and use an explicit filename whitelist. The API fails closed on upstream errors.

## Checks

- Full production build and protected Vercel preview: successful.
- Three endpoint tests: persistence/gated downloads, upstream failure, invalid input/cross-origin/forged cookie.
- Hosted preview: campaign, workshop image, email capture, gated toolkit, worksheet and ZIP successful.
- Trainer layout checked in browser. Existing other site pages unchanged except the privacy notice explaining resource-request capture.
- Savings calculator uses labelled illustrative assumptions, not guaranteed outcomes.
- Existing Meta pixel configuration is reused in production only. DiscoveryCallClick indicates a link click, not a completed booking. Lead fires only after successful resource capture.

## Release and rollback

Vercel project unpaste-ai-d8qr deploys main. Previous production deployment: dpl_2JxcejpeXXruWsKTcKZGuwRoRzHu. Roll back to that deployment if this release causes a production regression, then revert the release commit through normal Git history. Do not force-push main.
