# Unpaste.ai Social Media Image Generator

A bulk image generator for creating branded social media assets that match the Unpaste.ai Swiss brutalist design system.

## Features

- **8 Post Templates**: Stats, pain points, testimonials, CTAs, services, process, philosophy, stories
- **Pixel-Perfect Branding**: Matches Unpaste.ai's Swiss brutalist design exactly
- **Bulk Generation**: Generate dozens of images from a single JSON file
- **Multiple Formats**: Square (1080x1080), Landscape (1200x628), Story (1080x1920)
- **Easy Customization**: Edit content in `content/posts.json`

## Quick Start

```bash
# Install dependencies
npm install

# Generate all images
npm run generate

# Generate specific template type
npm run generate:stats
npm run generate:testimonial
npm run generate:cta
```

## Installation

```bash
cd social-media-generator
npm install
```

## Usage

### Generate All Posts

```bash
npm run generate
```

This reads all content from `content/posts.json` and generates images for each entry.

### Generate by Template Type

```bash
# Stats posts (big numbers)
npm run generate:stats

# Pain point posts (problem statements)
npm run generate:pain

# Testimonial posts (dark background quotes)
npm run generate:testimonial

# CTA posts (call to action)
npm run generate:cta

# Service posts (4 pillars)
npm run generate:service

# Process posts (3-step method)
npm run generate:process

# Philosophy posts (brand definition)
npm run generate:philosophy
```

### Generate a Specific Post

```bash
# Generate only the first stats post (index 0)
npm run generate -- --type=stats --index=0

# Generate the third pain point post
npm run generate -- --type=pain-point --index=2
```

### Generate All Template Types

```bash
npm run generate:all
```

### Output Format

```bash
# PNG (default, best quality)
npm run generate -- --format=png

# JPG (smaller file size)
npm run generate -- --format=jpg --quality=90
```

## Content Structure

Edit `content/posts.json` to customize your posts. Each template type has its own array of content objects.

### Stats Posts

```json
{
  "stats": [
    {
      "sectionTag": "[001] RESULTS",
      "statValue": "97%",
      "statLabel": "TIME SAVED ON ONBOARDING",
      "subtext": "Description text here."
    }
  ]
}
```

### Pain Point Posts

```json
{
  "pain-point": [
    {
      "sectionTag": "[001] THE PROBLEM",
      "headline": "STILL COPY-PASTING BETWEEN APPS?",
      "subtext": "Supporting text explaining the problem.",
      "cta": "TAKE THE FREE ASSESSMENT"
    }
  ]
}
```

### Testimonial Posts

```json
{
  "testimonial": [
    {
      "sectionTag": "[006] RESULTS",
      "quote": "The quote text here.",
      "authorName": "Sarah Chen",
      "authorTitle": "Operations Director",
      "metricValue": "97%",
      "metricLabel": "TIME SAVED"
    }
  ]
}
```

### CTA Posts

```json
{
  "cta": [
    {
      "sectionTag": "[008] GET STARTED",
      "headline": "READY TO GET YOUR <span class=\"highlight\">TIME</span> BACK?",
      "buttonText": "TAKE FREE ASSESSMENT",
      "subtext": "5 MINUTES · 15 QUESTIONS · INSTANT RESULTS"
    }
  ]
}
```

Use `<span class="highlight">TEXT</span>` to make words red.

### Service Posts

```json
{
  "service": [
    {
      "sectionTag": "[004] SERVICES",
      "serviceNumber": "01",
      "icon": "✦",
      "serviceTitle": "AI ASSISTANTS",
      "serviceDescription": "Service description here."
    }
  ]
}
```

### Process Posts

```json
{
  "process": [
    {
      "sectionTag": "[005] THE METHOD",
      "mainTitle": "FROM OVERWHELMED TO <span class=\"highlight\">OPTIMISED.</span>",
      "step1Title": "TAKE THE ASSESSMENT",
      "step1Description": "Step 1 description.",
      "step1Time": "5 MIN",
      "step2Title": "BOOK YOUR WORKSHOP",
      "step2Description": "Step 2 description.",
      "step2Time": "30 MIN",
      "step3Title": "GET YOUR ROADMAP",
      "step3Description": "Step 3 description.",
      "step3Time": "INSTANT",
      "cta": "START YOUR ASSESSMENT"
    }
  ]
}
```

### Philosophy Posts

```json
{
  "philosophy": [
    {
      "sectionTag": "[002] PHILOSOPHY",
      "statement": "COPY-PASTE IS A <span class=\"highlight\">SIGNAL</span>...",
      "word": "UNPASTE",
      "pronunciation": "/ʌnˈpeɪst/",
      "wordType": "verb",
      "definition": "Definition text here."
    }
  ]
}
```

### Story Posts (9:16 vertical)

```json
{
  "story": [
    {
      "sectionTag": "[001] FREE AUDIT",
      "headline": "STOP <span class=\"highlight\">COPY-PASTING.</span>",
      "subtext": "Supporting text here.",
      "buttonText": "TAKE FREE ASSESSMENT"
    }
  ]
}
```

## Output

Generated images are saved to the `output/` directory with filenames like:

```
stats-0-1706234567890.png
testimonial-2-1706234567891.png
cta-0-1706234567892.png
```

## Clean Output

```bash
npm run clean
```

## Template Customization

Templates are in the `templates/` directory:

- `base.css` - Shared styles and brand tokens
- `stats.html` - Big number statistics
- `pain-point.html` - Problem statement cards
- `testimonial.html` - Dark background quotes
- `cta.html` - Call to action posts
- `service.html` - Service feature cards
- `process.html` - 3-step method layout
- `philosophy.html` - Split brand definition
- `story.html` - Vertical story format

## Brand Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Primary | #DC2626 | #EF4444 |
| Background | #FAFAFA | #09090B |
| Foreground | #09090B | #FAFAFA |
| Muted | #71717A | #A1A1AA |
| Border | #E4E4E7 | #27272A |

## Troubleshooting

### Fonts not loading

The generator uses Google Fonts (Inter and Space Mono). Ensure you have internet connectivity during generation.

### Puppeteer installation issues

On Linux, you may need additional dependencies:

```bash
sudo apt-get install -y libgbm-dev gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Images are blank

Ensure all template files exist in `templates/` and the CSS file is properly linked.

## License

MIT - Unpaste.ai
