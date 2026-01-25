# Design Brief: Agent Card Concepts for Unpaste AI

## Project Context

**Website:** Unpaste AI - AI automation services for Australian small businesses
**Design Style:** Swiss Brutalist
**Current Branch:** `claude/agent-dashboard-component-q0z4C`

## Brand Guidelines

### Colors
- **Primary:** `#DC2626` (bold red)
- **Background Light:** `#FAFAFA` (off-white)
- **Background Dark:** `#09090B` (near-black)
- **Foreground:** `#09090B` (text on light) / `#FAFAFA` (text on dark)
- **Muted:** `#71717A` (secondary text)
- **Border:** `#E4E4E7`

### Typography
- **Headings:** System UI, 800 weight, -0.04em letter-spacing
- **Body/Labels:** "Space Mono" (monospace), uppercase for labels
- **Section Tags:** 11px, primary color, 0.1em letter-spacing, format: `[001] SECTION NAME`

### Design Rules
- **Border Radius:** 0 (zero) on everything - pure rectangles
- **Shadows:** Hard offset shadows (no blur), typically 4-6px offset
- **Hover Effects:** Shadow expands, element lifts/translates

---

## Component to Design: Agent Cards

Each card represents an AI agent/employee with:
- **Name & Role** (e.g., "ATLAS | Voice Agent")
- **Status Indicator** (Online/Offline/Learning)
- **Description** (1-2 sentences)
- **Integrations/Tools** (3-4 badge pills)
- **Performance Metrics** (4 horizontal progress bars with values like 94/100)
- **Recent Activity** (3 timestamped log entries)

**Card Grid:** 3 columns on desktop, 2 on tablet, 1 on mobile
**Section Background:** Dark (`#09090B`) with light text

---

## Concept A: "Terminal / Command Line"

### Visual Style
- Mimics a hacker terminal or system monitor
- Dark card backgrounds with monospace text throughout
- Green (`#22C55E`) or amber (`#F59E0B`) accent option instead of red

### Card Elements
- **Header:** Agent name with blinking cursor animation after it: `ATLAS_`
- **Status:** Displayed as terminal text: `STATUS: [ONLINE]` or `STATUS: [LEARNING...]`
- **Border:** 1px solid with slight glow effect on online cards
- **Description:** Prefixed with `>` like command output
- **Tools:** Displayed as inline code: `$ gmail` `$ crm` `$ calendar`
- **Metrics:** ASCII-style progress bars: `[████████░░] 84%`
- **Activity:** Timestamped logs: `[14:32:05] Qualified lead from Melbourne`

### Animations
1. **Typewriter effect** - Text types out character by character on scroll reveal
2. **Blinking cursor** - Consistent 1s blink interval
3. **Glitch effect on hover** - Brief 100ms horizontal offset with color channel split
4. **Scanline overlay** - Subtle horizontal lines moving down (optional)

### Mockup Notes
- Show cards on dark background
- Include one card mid-animation (text partially typed)
- Show hover state with glitch effect

---

## Concept B: "Blueprint / Technical Drawing"

### Visual Style
- Engineering schematic aesthetic
- Dashed borders like cut/fold lines
- Technical annotation style

### Card Elements
- **Border:** 2px dashed, primary color
- **Corner Markers:** L-shaped brackets in each corner (like crop marks)
- **Background:** Faint grid pattern (20px squares, very low opacity)
- **Header:** Agent name with technical ID: `ATLAS-001 // VOICE AGENT`
- **Status:** Circular indicator with crosshair: `◎ ONLINE`
- **Metrics:** Circular gauge dials instead of bars (like speedometers)
- **Labels:** Connected to content with thin lines and right-angle connectors
- **Tools:** Hexagonal badge shapes

### Animations
1. **Draw-in effect** - Borders draw from corners inward on scroll
2. **Gauge needles** - Animate from 0 to value position
3. **Crosshair cursor** - Subtle crosshair follows mouse inside card
4. **Line connectors** - Draw themselves when card enters view

### Mockup Notes
- Show card with annotation lines pointing to sections
- Include circular gauge close-up
- Light background option to show blueprint feel

---

## Concept C: "Stacked Layers / Depth"

### Visual Style
- Multiple offset rectangles creating depth
- Paper stack / card deck aesthetic
- Tactile, physical feel

### Card Elements
- **Shadow Layers:** 3 rectangles stacked behind main card
  - Layer 1 (closest): 4px offset, `#DC2626` (primary)
  - Layer 2: 8px offset, `#71717A` (muted)
  - Layer 3 (furthest): 12px offset, `#27272A` (dark)
- **Main Card:** White/light background, thick 2px border
- **Left Accent:** 6px thick primary color bar on left edge (like a tab)
- **Content:** Standard layout but with more generous padding

### Animations
1. **Layer spread on hover** - Layers fan out (increase offset by 2-4px each)
2. **Card lift** - Main card translates -4px up and left
3. **Spring physics** - Bouncy easing on hover (damping: 0.6, stiffness: 300)
4. **Staggered entrance** - Each layer animates in sequence (50ms delay each)

### Mockup Notes
- Show default state and hover state side by side
- Highlight the 3 shadow layers with different colors
- Show the "lift" effect clearly

---

## Concept D: "Data Dashboard / Live Metrics"

### Visual Style
- Mission control / monitoring dashboard
- Real-time data visualization feel
- Active, alive system

### Card Elements
- **Pulsing Border:** Online cards have animated border glow (subtle pulse)
- **Status LED:** Actual dot that blinks (not just static)
  - Online: Green, slow pulse
  - Learning: Amber, faster pulse
  - Offline: Gray, no pulse
- **Metrics:** Horizontal bar charts with value labels at end
- **Sparklines:** Mini line graphs (50px wide) showing activity trend
- **Activity Feed:** Rolling list style with fade-out at bottom
- **Header Badge:** Small live indicator dot next to name

### Animations
1. **Progress bar fill** - Animate from 0 to value with easeOut
2. **Sparkline draw** - Line draws left to right like a heartbeat monitor
3. **Pulse effect** - Border glows in/out on 2s interval for online cards
4. **Expand on hover** - Card grows slightly, reveals hidden stats row
5. **Number count-up** - Metric values count from 0 to final number

### Mockup Notes
- Show sparkline graph examples
- Highlight the pulsing border effect
- Show expanded hover state with extra stats

---

## Concept E: "Brutalist Maximalist"

### Visual Style
- Bold, aggressive, unapologetic
- Oversized elements
- High contrast, no subtlety

### Card Elements
- **Border:** 4px solid black
- **Shadow:** Massive 12px offset, solid primary color
- **Alternating Cards:** Every other card inverted (dark bg, light text)
- **Watermark Numbers:** Huge faded "01", "02" etc. behind content (30% opacity)
- **Header:** Extra large, all caps, tight letter-spacing
- **Diagonal Stripes:** Header section has 45° stripe pattern (primary/dark)
- **Tools:** Large rectangular blocks, not small pills

### Animations
1. **Slam entrance** - Cards fly in from off-screen (x: -100 or 100), quick duration (0.3s)
2. **Shadow shift on hover** - Shadow moves dramatically (to 16px offset)
3. **Shake/jitter** - Micro-shake animation on status change (optional)
4. **Border color cycle** - On hover, border cycles through: black → primary → back

### Mockup Notes
- Show alternating light/dark cards
- Highlight the massive shadow
- Show the diagonal stripe pattern detail
- Include watermark number example

---

## Deliverables Requested

Please create visual mockups/previews for each of the 5 concepts showing:

1. **Single card** in default state
2. **Single card** in hover state (where applicable)
3. **Grid of 3 cards** showing how they work together
4. **Animation storyboard** (2-3 frames showing key animation states)

Format: Static images or annotated wireframes are fine. Focus on communicating the visual direction clearly.

---

## Additional Notes

- The current implementation uses Framer Motion for animations
- Cards are displayed on a dark (`#09090B`) section background
- Mobile responsiveness is important (cards should stack)
- The CTA button at the bottom uses `.brutalist-button` class (uppercase, monospace, 4px shadow)

Feel free to suggest modifications or hybrid approaches based on what looks best visually.
