# Anudeep Samaiya's Personal Blog & Portfolio

[![Deploy Status](https://github.com/anudeepsamaiya/anudeepsamaiya.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/anudeepsamaiya/anudeepsamaiya.github.io/actions/workflows/deploy.yml)

Personal blog and portfolio site built with Astro, TypeScript, and TailwindCSS. Live at [anudeepsamaiya.github.io](https://anudeepsamaiya.github.io/).

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Content Management](#-content-management)
- [Deployment](#-deployment)
- [Tech Stack](#-tech-stack)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/anudeepsamaiya/anudeepsamaiya.github.io.git
cd anudeepsamaiya.github.io

# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Type-check TypeScript and build for production |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run Astro type checking without building |

---

## 📁 Project Structure

```
anudeepsamaiya.github.io/
├── src/
│   ├── components/          # React components
│   │   ├── BadgeGrid.tsx    # Skill badges display
│   │   └── ThemeToggle.tsx  # Dark mode toggle
│   ├── content/             # Content collections
│   │   ├── blog/            # Blog posts (.md files)
│   │   └── config.ts        # Content schema definitions
│   ├── data/                # Static data
│   │   └── skills.ts        # Skills and badge URLs
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro     # Base layout with nav/footer
│   ├── pages/               # File-based routes
│   │   ├── index.astro      # Homepage (/)
│   │   ├── about.astro      # About page (/about/)
│   │   ├── reading.astro    # Reading list (/reading/)
│   │   └── blog/            # Blog pages
│   │       ├── index.astro  # Blog listing (/blog/)
│   │       └── [slug].astro # Blog post pages (/blog/post-slug/)
│   └── config.ts            # Site configuration
├── public/                  # Static assets (favicons, images)
├── .github/workflows/       # GitHub Actions CI/CD
├── astro.config.mjs         # Astro configuration
├── tailwind.config.cjs      # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── CLAUDE.md                # Comprehensive development docs
└── package.json             # Dependencies and scripts
```

---

## 🛠️ Development Workflow

### 1. Configuration

All site-wide settings are centralized in `src/config.ts`:

```typescript
export const SITE = {
  title: "Anudeep Samaiya",
  description: "Technical and not-so-technical writings.",
  author: "Anudeep Samaiya",
  locale: "en-US",
  baseUrl: "https://anudeepsamaiya.github.io",
};

export const SOCIALS = {
  github: "https://github.com/anudeepsamaiya",
  twitter: "https://twitter.com/anudeepsamaiya",
  linkedin: "https://www.linkedin.com/in/anudeepsamaiya/",
  stackoverflow: "https://stackoverflow.com/users/2079692/anudeep-samaiya",
  leetcode: "https://leetcode.com/anudeepsamaiya/",
};

export const COPYRIGHT = {
  // Auto-updates copyright year
  notice: "© 2018-2025 Anudeep Samaiya. All rights reserved.",
};
```

### 2. Creating Components

Components use React with TypeScript. Example:

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

Usage in Astro pages:

```astro
---
import MyComponent from "@components/MyComponent";
---
<MyComponent title="Hello" client:load />
```

### 3. Dark Mode

Dark mode is implemented with:
- **TailwindCSS class strategy** (`darkMode: 'class'`)
- **ThemeToggle component** with localStorage persistence
- **No-flash inline script** in `Layout.astro` head

Use dark mode variants in your components:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

---

## 📝 Content Management

### Creating Blog Posts

1. **Create new file** in `src/content/blog/` (e.g., `my-post.md`)

2. **Add frontmatter:**

```markdown
---
title: "My First Blog Post"
description: "A brief description for SEO and previews"
pubDate: 2025-01-06
tags: ["python", "django", "web-development"]
draft: false  # Set to true to hide from production
---

Your blog post content goes here in Markdown...
```

3. **Write content** using standard Markdown

4. **Commit and push** to master branch - GitHub Actions deploys automatically

### Content Schema

Blog posts are validated with Zod schemas in `src/content/config.ts`:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

### Modifying Static Pages

- **Homepage**: Edit `src/pages/index.astro`
- **About**: Edit `src/pages/about.astro`
- **Reading**: Edit `src/pages/reading.astro`
- **Skills**: Edit `src/data/skills.ts`

---

## 🚢 Deployment

### Automatic Deployment

The site automatically deploys to GitHub Pages when you push to the `master` branch:

1. **GitHub Actions** workflow triggers (`.github/workflows/deploy.yml`)
2. Installs dependencies and builds the site
3. Deploys to GitHub Pages using `actions/deploy-pages@v4`

### Manual Deployment

If needed, trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy Astro to GitHub Pages** workflow
3. Click **Run workflow** > **Run workflow**

### Local Build Testing

Always test builds locally before pushing:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4321` to verify the production build.

---

## 🧰 Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Astro** | 4.x | Static site generator with islands architecture |
| **TypeScript** | 5.x | Type safety and developer experience |
| **React** | 18.x | Interactive components |
| **TailwindCSS** | 3.x | Utility-first styling with dark mode |
| **Zod** | 3.x | Content schema validation |

### Integrations & Tools

- **@astrojs/react** - React component support
- **@astrojs/tailwind** - TailwindCSS integration
- **@astrojs/sitemap** - Automatic sitemap generation
- **@tailwindcss/typography** - Rich text styling
- **GitHub Actions** - CI/CD pipeline

### Development Tools

- **TypeScript strict mode** - Maximum type safety
- **ESM modules** - Modern JavaScript modules
- **Path aliases** - Clean imports with `@/` prefix

---

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

If `npm run dev` fails with port error:

```bash
# Kill process on port 4321
npx kill-port 4321

# Or use a different port
npm run dev -- --port 3000
```

#### TypeScript Errors

```bash
# Clear Astro cache
rm -rf .astro/

# Reinstall dependencies
rm -rf node_modules/
npm install

# Re-run type check
npm run check
```

#### Build Warnings

**"Collection 'blog' is empty"** - This is normal if you haven't created any blog posts yet. The build will still succeed.

#### Dark Mode Flash

If you see a white flash on page load in dark mode, verify the inline script in `src/layouts/Layout.astro` runs before the `<body>` tag.

### Getting Help

- **Development documentation**: See [CLAUDE.md](./CLAUDE.md)
- **Astro docs**: https://docs.astro.build
- **Report issues**: [GitHub Issues](https://github.com/anudeepsamaiya/anudeepsamaiya.github.io/issues)

---

## 📄 License

This project uses **dual licensing**:

### 🔧 Code - MIT License

All source code is licensed under the **MIT License** ([LICENSE](./LICENSE)).

**Copyright (c) 2018-present Anudeep Samaiya**

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, subject to including the copyright notice.
```

### 📝 Content - CC BY 4.0

All blog posts and written content are licensed under **Creative Commons Attribution 4.0 International** ([LICENSE-CONTENT](./LICENSE-CONTENT)).

**What you can do:**
- ✅ Share and adapt content
- ✅ Use commercially
- ⚠️ Must give appropriate credit
- ⚠️ Must indicate changes

### Third-Party Licenses

See [NOTICE](./NOTICE) for third-party library attributions.
