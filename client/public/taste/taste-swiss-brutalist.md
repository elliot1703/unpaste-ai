# DESIGN TASTE — SWISS BRUTALIST

> Vibe: Bauhaus meets tech startup. Engineering confidence, zero decoration.
> Best for: consultants, tools, agencies, anything that sells precision.

## How to install

Save this file at the root of your project as `DESIGN-TASTE.md`, then tell your agent:

> Read DESIGN-TASTE.md. Every visual decision in this project — fonts, colours, spacing, motion — follows it. If my request conflicts with the file, follow the file and tell me about the conflict.

---

## Core principle

Precision is the aesthetic. Every element looks engineered, not decorated. If a visual choice doesn't guide the eye or carry meaning, it's decoration — remove it.

## Typography

- **Display:** system-ui (San Francisco / Segoe UI), weight 800, UPPERCASE, letter-spacing -0.04em, line-height 0.95–1.0. The absence of a custom display face IS the statement.
- **Body:** Inter, 400–600, 16px base, line-height 1.6, antialiased.
- **Data / labels:** Space Mono, uppercase, 10–12px, letter-spacing 0.05–0.1em. Use for section tags, buttons, metadata — `[001] SECTION NAME` pattern.
- Maximum two families plus the mono. H1 is 2.5–3x body size. Jumps, not steps.
- Emphasis is ONE tool: a single word in red, or weight. Never bold + italic + colour together.

## Colour

- Background `#FAFAFA` (warm white — never pure #fff). Ink `#09090B` (never pure #000).
- One accent: `#DC2626` red — interactive elements, emphasis words, structural dividers ONLY. Never large background areas.
- Muted text `#71717A`. Borders `#E4E4E7`.
- Dark sections invert the palette for rhythm (testimonials, calculators).
- WCAG AA on every pairing. High contrast always — no gray-on-gray.

## Shape & surface

- **Border radius 0px everywhere. Non-negotiable.** Sharp corners are the identity.
- 1px solid borders. Cards: white, 1px border; hover adds a 4px solid ink shadow offset bottom-right and shifts the card -2px.
- Shadows are hard, solid, offset — never soft, never blurred. Container shadow always deeper than its children's.
- No gradients. No glassmorphism. No textures stronger than 5% opacity.

## Layout & spacing

- 8px spacing grid. Content max-width 1280px. Section padding 80–96px desktop, 48px mobile.
- Optional visible grid overlay at 5% opacity (60px desktop / 40px mobile).
- Dividers: 2px solid red for major breaks, 1px dashed muted for soft ones. Never a plain gray line.
- Left-align by default. Centre only short headings and CTAs. Never centre body text.

## Motion

- Slide-up + fade, 0.6s, cubic-bezier(0.16, 1, 0.3, 1), staggered 0.1s.
- Marquee ticker 25s linear for proof strips. Hovers 0.2–0.3s on shadow + transform.
- Mechanical and precise. Respect prefers-reduced-motion.

## Never

- Rounded corners. Soft shadows. Gradients. Bounce or elastic easing.
- More than two typeface families plus the mono.
- Stock "AI" imagery — floating polygons, neural nets, handshakes.
- Pure #fff or #000. Centre-aligned paragraphs. Consultant-speak ("seamless", "cutting-edge").
