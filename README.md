# Empathy Studio — Next.js

Dark, dramatic creative agency site. Next.js 14 App Router, GSAP, Lenis, Canvas 2D orb.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project structure

```
empathy/
├── content/
│   ├── work/          ← one .md per project
│   └── journal/       ← one .md per article
├── public/
│   └── images/
│       ├── work/      ← project images (cover.jpg, ...)
│       └── journal/   ← article covers
├── src/
│   ├── app/           ← Next.js App Router pages
│   │   ├── page.tsx            → /
│   │   ├── work/
│   │   │   ├── page.tsx        → /work
│   │   │   └── [slug]/page.tsx → /work/aura
│   │   ├── journal/
│   │   │   ├── page.tsx        → /journal
│   │   │   └── [slug]/page.tsx → /journal/feel-first
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── approach/page.tsx
│   │   ├── contact/page.tsx
│   │   └── start/page.tsx
│   ├── components/
│   │   ├── layout/    ← Nav
│   │   ├── sections/  ← HeroSection, WorkGrid, etc.
│   │   └── ui/        ← Cursor, Curtain, MarkdownBody
│   ├── lib/
│   │   └── mdx.ts     ← reads .md files, parses frontmatter
│   └── styles/
│       └── globals.css
└── IMAGES.md          ← full guide to adding images
```

## Adding a new project

1. Create `content/work/my-project.md`
2. Fill in the frontmatter (copy from `content/work/aura.md`)
3. Add images to `public/images/work/my-project/`
4. It appears on `/work` and gets its own page at `/work/my-project`

## Adding a journal post

1. Create `content/journal/my-post.md`
2. Fill in frontmatter (copy from `content/journal/feel-first.md`)
3. Add cover image to `public/images/journal/my-post/cover.jpg`
4. It appears on `/journal` and gets its own page at `/journal/my-post`

## Tech stack

| Tool | Purpose |
|---|---|
| Next.js 14 | Framework, App Router, Image optimisation |
| GSAP | All animations, ScrollTrigger |
| Lenis | Smooth scroll |
| gray-matter | Parses .md frontmatter |
| CSS Modules | Component-scoped styles |

## Image guide

See `IMAGES.md` for the full image workflow including blur placeholders,
external image domains, and recommended sizes.

## Deployment

```bash
npm run build   # check for errors
npm run start   # test production build locally
```

Push to GitHub → deploy on Vercel. Zero config needed.
