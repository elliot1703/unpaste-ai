# Unpaste.ai - Claude Guidelines

## Communication Style

**Use plain English.** The user (Elliot) is learning technical workflows, so:

- Explain technical terms when you use them
- Provide step-by-step instructions, not just commands
- When using jargon like "push", "pull", "commit", "branch" - explain what they mean in parentheses
- Assume no prior knowledge of Git/GitHub workflows
- Be patient and thorough with explanations

## Project Overview

**Unpaste.ai** is an AI automation consultancy for Brisbane SMBs. The website uses a Swiss brutalist design style.

### Key Brand Elements
- Colors: Red (#DC2626), Off-white (#FAFAFA), Near-black (#09090B)
- Typography: Bold uppercase headlines, monospace labels
- Style: Sharp edges, grid backgrounds, offset shadows

### Project Structure
```
unpaste-ai/
├── client/                    # Website frontend (React)
├── social-media-generator/    # Bulk image generator tool
│   ├── templates/             # HTML templates for posts
│   ├── content/posts.json     # Content to generate
│   └── output/                # Generated images go here
├── social-media-prompts.md    # Nano Banana prompts
└── CLAUDE.md                  # This file
```

---

## GitHub Workflow (Plain English)

### Where Your Files Live

```
┌─────────────────────────────────────────────────────────────┐
│                         GITHUB                               │
│              (Cloud storage for your code)                   │
│              github.com/elliot1703/unpaste-ai                │
└─────────────────────────────────────────────────────────────┘
                         ↑       ↓
                     "Push"    "Pull"
                    (Upload)  (Download)
                         ↑       ↓
┌──────────────────────────┐    ┌──────────────────────────┐
│      CLAUDE CODE         │    │       YOUR MAC           │
│    (Remote Server)       │    │    (Local Computer)      │
│                          │    │                          │
│  Where Claude makes      │    │  Where you use files     │
│  changes to your code    │    │  day-to-day              │
└──────────────────────────┘    └──────────────────────────┘
```

### Common Terms Explained

| Term | Plain English |
|------|---------------|
| **Push** | Upload your changes to GitHub (like saving to Google Drive) |
| **Pull** | Download the latest changes from GitHub to your computer |
| **Commit** | Save a snapshot of your changes with a note about what you changed |
| **Branch** | A separate copy of the code to work on without affecting the main version |
| **Clone** | Download a project from GitHub for the first time |
| **Repo** | Short for "repository" - just means your project folder on GitHub |

### How to Get Updates (After Claude Makes Changes)

1. Open **GitHub Desktop** on your Mac
2. Make sure "unpaste-ai" is selected in the top-left dropdown
3. Click **"Fetch origin"** (checks if there are updates)
4. If updates exist, click **"Pull origin"** (downloads them)
5. Your local files are now up to date!

---

## Obsidian Vault

Elliot's Obsidian vault is at:
```
/Users/elliot/Library/Mobile Documents/iCloud~md~obsidian/Documents/Elliot-OS/
```

To copy files to Obsidian after pulling updates:
1. Open Finder
2. Go to your local unpaste-ai folder
3. Find the .md file you want (e.g., `social-media-prompts.md`)
4. Drag it into your Obsidian vault folder

---

## Social Media Generator

Located at `social-media-generator/`. To use:

```bash
cd social-media-generator
npm install              # First time only - installs dependencies
npm run generate         # Creates all images
npm run generate:stats   # Creates only stats images
npm run generate:og      # Creates OG/link preview images
```

Generated images appear in `social-media-generator/output/`

---

## Useful Commands Reference

| What you want | Command |
|---------------|---------|
| Generate all social images | `npm run generate` |
| Generate OG image for link previews | `npm run generate:og` |
| See what branch you're on | `git branch` |
| See what's changed | `git status` |
