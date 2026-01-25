#!/usr/bin/env node

/**
 * Unpaste.ai Social Media Image Generator
 *
 * Generates branded social media images from HTML templates
 * using Puppeteer to render and screenshot.
 *
 * Usage:
 *   npm run generate              # Generate all posts from content/posts.json
 *   npm run generate -- --type=stats    # Generate only stats posts
 *   npm run generate -- --all           # Generate all template types
 *   npm run generate -- --type=stats --index=0  # Generate specific post
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  templatesDir: path.join(__dirname, 'templates'),
  contentFile: path.join(__dirname, 'content', 'posts.json'),
  outputDir: path.join(__dirname, 'output'),
  formats: {
    square: { width: 1080, height: 1080 },
    landscape: { width: 1200, height: 628 },
    story: { width: 1080, height: 1920 }
  }
};

// Template configurations
const TEMPLATES = {
  'stats': {
    file: 'stats.html',
    format: 'square',
    fields: ['sectionTag', 'statValue', 'statLabel', 'subtext']
  },
  'pain-point': {
    file: 'pain-point.html',
    format: 'square',
    fields: ['sectionTag', 'headline', 'subtext', 'cta']
  },
  'testimonial': {
    file: 'testimonial.html',
    format: 'square',
    fields: ['sectionTag', 'quote', 'authorName', 'authorTitle', 'metricValue', 'metricLabel']
  },
  'cta': {
    file: 'cta.html',
    format: 'square',
    fields: ['sectionTag', 'headline', 'buttonText', 'subtext']
  },
  'service': {
    file: 'service.html',
    format: 'square',
    fields: ['sectionTag', 'serviceNumber', 'icon', 'serviceTitle', 'serviceDescription']
  },
  'process': {
    file: 'process.html',
    format: 'square',
    fields: ['sectionTag', 'mainTitle', 'step1Title', 'step1Description', 'step1Time',
             'step2Title', 'step2Description', 'step2Time',
             'step3Title', 'step3Description', 'step3Time', 'cta']
  },
  'philosophy': {
    file: 'philosophy.html',
    format: 'square',
    fields: ['sectionTag', 'statement', 'word', 'pronunciation', 'wordType', 'definition']
  },
  'story': {
    file: 'story.html',
    format: 'story',
    fields: ['sectionTag', 'headline', 'subtext', 'buttonText']
  },
  'og-image': {
    file: 'og-image.html',
    format: 'landscape',
    fields: ['sectionTag', 'headline', 'subtext', 'tagline']
  }
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    type: null,
    index: null,
    all: false,
    format: 'png',
    quality: 100
  };

  for (const arg of args) {
    if (arg.startsWith('--type=')) {
      options.type = arg.split('=')[1];
    } else if (arg.startsWith('--index=')) {
      options.index = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--all') {
      options.all = true;
    } else if (arg.startsWith('--format=')) {
      options.format = arg.split('=')[1];
    } else if (arg.startsWith('--quality=')) {
      options.quality = parseInt(arg.split('=')[1], 10);
    }
  }

  return options;
}

/**
 * Load content from JSON file
 */
async function loadContent() {
  try {
    const data = await fs.readFile(CONFIG.contentFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading content file:', error.message);
    console.log('Creating sample content file...');
    await createSampleContent();
    const data = await fs.readFile(CONFIG.contentFile, 'utf-8');
    return JSON.parse(data);
  }
}

/**
 * Create sample content file if it doesn't exist
 */
async function createSampleContent() {
  const sampleContent = {
    stats: [
      { sectionTag: '[001] RESULTS', statValue: '97%', statLabel: 'TIME SAVED ON ONBOARDING', subtext: 'Our clients see dramatic improvements in operational efficiency within the first month.' },
      { sectionTag: '[001] RESULTS', statValue: '10+', statLabel: 'HOURS SAVED EVERY WEEK', subtext: 'Stop doing repetitive tasks. Let automation handle the busy work.' },
      { sectionTag: '[001] RESULTS', statValue: '$0', statLabel: 'COST TO GET STARTED', subtext: 'Take our free efficiency assessment and discover your biggest time-wasters.' }
    ],
    'pain-point': [
      { sectionTag: '[001] THE PROBLEM', headline: 'STILL COPY-PASTING BETWEEN APPS?', subtext: 'Every manual data transfer is a signal that your systems aren\'t connected. Time to fix that.', cta: 'TAKE THE FREE ASSESSMENT' },
      { sectionTag: '[001] THE PROBLEM', headline: 'YOUR TOOLS AREN\'T TALKING.', subtext: 'Disconnected software means disconnected workflows. And that means wasted hours every week.', cta: 'DISCOVER YOUR EFFICIENCY SCORE' },
      { sectionTag: '[001] THE PROBLEM', headline: 'DROWNING IN ADMIN?', subtext: 'If you\'re working weekends just to catch up on paperwork, something is broken.', cta: 'GET YOUR FREE AUDIT' }
    ],
    testimonial: [
      { sectionTag: '[006] RESULTS', quote: 'We went from 36 hours of client onboarding down to just 1. The automation handles everything.', authorName: 'Sarah Chen', authorTitle: 'Operations Director', metricValue: '97%', metricLabel: 'TIME SAVED' },
      { sectionTag: '[006] RESULTS', quote: 'Response time dropped from 4 hours to 3 minutes. We close deals faster now.', authorName: 'James Mitchell', authorTitle: 'Founder, Brisbane Property Co', metricValue: '85%', metricLabel: 'AUTO-HANDLED' },
      { sectionTag: '[006] RESULTS', quote: 'I was drowning in admin. Now I leave at 5pm and the business runs smoother than ever.', authorName: 'Emma Rodriguez', authorTitle: 'Creative Director', metricValue: '25hrs', metricLabel: 'SAVED WEEKLY' }
    ],
    cta: [
      { sectionTag: '[008] GET STARTED', headline: 'READY TO GET YOUR <span class="highlight">TIME</span> BACK?', buttonText: 'TAKE FREE ASSESSMENT', subtext: '5 MINUTES · 15 QUESTIONS · INSTANT RESULTS' },
      { sectionTag: '[008] GET STARTED', headline: 'STOP <span class="highlight">DROWNING</span> IN ADMIN.', buttonText: 'START YOUR AUDIT', subtext: 'FREE · NO COMMITMENT · IMMEDIATE INSIGHTS' },
      { sectionTag: '[008] GET STARTED', headline: 'DISCOVER YOUR <span class="highlight">EFFICIENCY</span> SCORE', buttonText: 'BEGIN NOW', subtext: 'JOIN 100+ BRISBANE BUSINESSES' }
    ],
    service: [
      { sectionTag: '[004] SERVICES', serviceNumber: '01', icon: '✦', serviceTitle: 'AI ASSISTANTS', serviceDescription: 'Automated responses, quote generation, and customer follow-ups that work around the clock.' },
      { sectionTag: '[004] SERVICES', serviceNumber: '02', icon: '⚡', serviceTitle: 'WORKFLOW AUTOMATION', serviceDescription: 'Connect your scattered tools so information flows automatically. No more copy-paste.' },
      { sectionTag: '[004] SERVICES', serviceNumber: '03', icon: '◈', serviceTitle: 'PROCESS DESIGN', serviceDescription: 'We map how your business runs, find the bottlenecks, and design workflows that work.' },
      { sectionTag: '[004] SERVICES', serviceNumber: '04', icon: '✧', serviceTitle: 'CUSTOM SOLUTIONS', serviceDescription: 'When off-the-shelf doesn\'t fit, we build exactly what you need. Bespoke automation.' }
    ],
    process: [
      {
        sectionTag: '[005] THE METHOD',
        mainTitle: 'FROM OVERWHELMED TO <span class="highlight">OPTIMISED.</span>',
        step1Title: 'TAKE THE ASSESSMENT', step1Description: 'Answer 15 questions about how your business runs.', step1Time: '5 MIN',
        step2Title: 'BOOK YOUR WORKSHOP', step2Description: 'Free 30-minute call to review your results.', step2Time: '30 MIN',
        step3Title: 'GET YOUR ROADMAP', step3Description: 'Clear action plan for what to automate first.', step3Time: 'INSTANT',
        cta: 'START YOUR ASSESSMENT'
      }
    ],
    philosophy: [
      {
        sectionTag: '[002] PHILOSOPHY',
        statement: 'COPY-PASTE IS A <span class="highlight">SIGNAL</span> THAT YOUR TOOLS AREN\'T TALKING.',
        word: 'UNPASTE',
        pronunciation: '/ʌnˈpeɪst/',
        wordType: 'verb',
        definition: 'To remove the need for manual data transfer by connecting your tools with automation—freeing humans to do higher-value work.'
      }
    ],
    story: [
      { sectionTag: '[001] FREE AUDIT', headline: 'STOP <span class="highlight">COPY-PASTING.</span>', subtext: 'Discover your biggest operational bottleneck in 5 minutes.', buttonText: 'TAKE FREE ASSESSMENT' },
      { sectionTag: '[006] RESULTS', headline: '<span class="highlight">97%</span> TIME SAVED', subtext: 'See what automation can do for your Brisbane business.', buttonText: 'GET YOUR SCORE' }
    ]
  };

  await fs.writeFile(CONFIG.contentFile, JSON.stringify(sampleContent, null, 2));
  console.log('✓ Created sample content file at content/posts.json');
}

/**
 * Load and process HTML template
 */
async function loadTemplate(templateName) {
  const templateConfig = TEMPLATES[templateName];
  if (!templateConfig) {
    throw new Error(`Unknown template: ${templateName}`);
  }

  const templatePath = path.join(CONFIG.templatesDir, templateConfig.file);
  const html = await fs.readFile(templatePath, 'utf-8');

  return { html, config: templateConfig };
}

/**
 * Replace template variables with content
 */
function populateTemplate(html, content) {
  let result = html;

  for (const [key, value] of Object.entries(content)) {
    const placeholder = `{{${key}}}`;
    result = result.replaceAll(placeholder, value || '');
  }

  return result;
}

/**
 * Generate image from HTML template
 */
async function generateImage(browser, templateName, content, index, options) {
  const { html, config } = await loadTemplate(templateName);
  const populatedHtml = populateTemplate(html, content);
  const format = CONFIG.formats[config.format];

  const page = await browser.newPage();

  // Set viewport to match template size
  await page.setViewport({
    width: format.width,
    height: format.height,
    deviceScaleFactor: 1
  });

  // Load the HTML with base path for CSS
  const basePath = `file://${CONFIG.templatesDir}/`;
  const htmlWithBase = populatedHtml.replace('<head>', `<head><base href="${basePath}">`);

  await page.setContent(htmlWithBase, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluateHandle('document.fonts.ready');

  // Generate filename
  const timestamp = Date.now();
  const filename = `${templateName}-${index}-${timestamp}.${options.format}`;
  const outputPath = path.join(CONFIG.outputDir, filename);

  // Take screenshot
  const screenshotOptions = {
    path: outputPath,
    type: options.format === 'jpg' ? 'jpeg' : 'png',
    fullPage: false,
    clip: {
      x: 0,
      y: 0,
      width: format.width,
      height: format.height
    }
  };

  if (options.format === 'jpg') {
    screenshotOptions.quality = options.quality;
  }

  await page.screenshot(screenshotOptions);
  await page.close();

  return { filename, outputPath };
}

/**
 * Main generation function
 */
async function generate() {
  const options = parseArgs();
  const content = await loadContent();

  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  console.log('\n🎨 Unpaste.ai Social Media Generator\n');
  console.log('━'.repeat(50));

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  try {
    // Determine which templates to generate
    let templatesToGenerate = [];

    if (options.all) {
      templatesToGenerate = Object.keys(TEMPLATES);
    } else if (options.type) {
      if (!TEMPLATES[options.type]) {
        console.error(`Unknown template type: ${options.type}`);
        console.log(`Available types: ${Object.keys(TEMPLATES).join(', ')}`);
        process.exit(1);
      }
      templatesToGenerate = [options.type];
    } else {
      // Generate from all content in posts.json
      templatesToGenerate = Object.keys(content);
    }

    for (const templateName of templatesToGenerate) {
      const templateContent = content[templateName];

      if (!templateContent || templateContent.length === 0) {
        console.log(`⚠ No content found for template: ${templateName}`);
        continue;
      }

      console.log(`\n📄 Generating ${templateName} posts...`);

      // Filter by index if specified
      const postsToGenerate = options.index !== null
        ? [templateContent[options.index]].filter(Boolean)
        : templateContent;

      for (let i = 0; i < postsToGenerate.length; i++) {
        const post = postsToGenerate[i];
        const actualIndex = options.index !== null ? options.index : i;

        try {
          const result = await generateImage(browser, templateName, post, actualIndex, options);
          results.push(result);
          console.log(`   ✓ ${result.filename}`);
        } catch (error) {
          console.error(`   ✗ Error generating ${templateName}-${actualIndex}: ${error.message}`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  console.log('\n' + '━'.repeat(50));
  console.log(`\n✅ Generated ${results.length} images in ./output/\n`);

  return results;
}

// Run generator
generate().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
