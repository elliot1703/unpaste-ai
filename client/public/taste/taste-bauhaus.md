# DESIGN TASTE — BAUHAUS

> Vibe: Form follows function. Geometry is the language, primaries are the voice.
> Best for: studios, education, product brands, anything that wants 1919 confidence with modern discipline.

## How to install

Save this file at the root of your project as `DESIGN-TASTE.md`, then tell your agent:

> Read DESIGN-TASTE.md. Every visual decision in this project — fonts, colours, spacing, motion — follows it. If my request conflicts with the file, follow the file and tell me about the conflict.

---

## Core principle

Form follows function. Every shape, colour and letterform exists because it does a job. Geometry — circle, square, triangle — is not decoration; it is the layout system.

## Typography

- **Display:** Jost (the Futura revival), 700–800. Geometric, clean, no serifs, no quirks.
- **Body:** Inter, 400–500, 16–18px, line-height 1.5–1.6. Neutral against the geometric display.
- Headlines may run **all-lowercase** — a deliberate Bauhaus move (Herbert Bayer's universal typeface abolished capitals). If lowercase, commit to it everywhere; never mix cases randomly.
- Letter-spacing near zero. The geometry carries the personality, not the tracking.
- Hierarchy by size jumps and weight, exactly two families, nothing else.

## Colour

- Paper `#F5F1E8` (warm, gallery white). Ink `#101010`.
- Three primaries, used structurally: red `#DA291C`, blue `#0057B8`, yellow `#FFC72C`.
- **One primary per composition**, plus black and paper. Primaries fill shapes and blocks — they are structure, not accents sprinkled on top.
- Yellow is the only primary allowed as a background for black text; red and blue get white text or sit as shapes.
- No gradients, no tints, no pastels. Flat, confident, printed-ink feel.

## Shape & layout

- Circle, square, triangle, half-circle arches and thick rules (4–8px) are layout elements. A headline can sit on a yellow square; a photo can live in a circle.
- Strict grid underneath, **asymmetric balance** on top. Nothing centred-by-default; compositions are weighted, not mirrored.
- Rectangles stay sharp (0 radius). Circles are perfect circles. No in-between rounded corners.
- Generous paper space around compositions — the grid needs air to read as order.
- Content max-width 1200px. 8px spacing grid. Section padding 80px+ desktop.

## Motion

- Elements move like machine parts: straight translations, rotations on a fixed axis, linear or precise cubic-bezier(0.65, 0, 0.35, 1) easing.
- Shapes may rotate 90°/180° as transitions. Nothing wobbles, nothing floats.
- Hovers: colour swaps (primary ↔ ink), not shadows.

## Never

- Serifs. Gradients. Drop shadows. Glassmorphism. Texture or grain.
- More than one primary colour per composition.
- Soft rounded corners on rectangles. Centre-everything layouts.
- Bounce, elastic, or "playful squish" easing — playful comes from geometry, not motion.
