# How to Add Images to Empathy Studio

## Folder structure

All images live inside `/public/`. Next.js serves this folder
at the root URL automatically — no import needed.

```
public/
└── images/
    ├── work/
    │   ├── aura/
    │   │   ├── cover.jpg       ← main card image
    │   │   ├── brand-01.jpg    ← case study gallery
    │   │   ├── brand-02.jpg
    │   │   └── web-01.jpg
    │   ├── forma/
    │   │   ├── cover.jpg
    │   │   └── ...
    │   └── orbit/
    │       └── cover.jpg
    ├── journal/
    │   └── feel-first/
    │       └── cover.jpg
    └── team/
        └── nj.jpg
```

---

## Step 1 — Drop your image into the right folder

For a work project called `aura`:
- Put `cover.jpg` at `public/images/work/aura/cover.jpg`
- Put any extra shots at `public/images/work/aura/web-01.jpg` etc.

For a journal post called `feel-first`:
- Put the cover at `public/images/journal/feel-first/cover.jpg`

---

## Step 2 — Reference it in the .md frontmatter

```yaml
# content/work/aura.md
---
coverImage: "/images/work/aura/cover.jpg"
images:
  - "/images/work/aura/cover.jpg"
  - "/images/work/aura/brand-01.jpg"
  - "/images/work/aura/web-01.jpg"
---
```

```yaml
# content/journal/feel-first.md
---
coverImage: "/images/journal/feel-first/cover.jpg"
---
```

The path starts with `/` — that maps directly to your `public/` folder.

---

## Step 3 — Using Next.js Image component (automatic)

The pages already use `<Image>` from `next/image`. It handles:
- **Lazy loading** automatically
- **WebP conversion** on the fly
- **Responsive sizes** via the `sizes` prop
- **Blur placeholder** (optional, see below)

You never have to write `<img>` tags. Use `<Image>` everywhere.

### Basic usage (already done in the pages):

```tsx
import Image from 'next/image'

// Fill mode — for a container with position:relative + known size
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/images/work/aura/cover.jpg"
    alt="Aura brand identity"
    fill
    sizes="(max-width: 900px) 100vw, 50vw"
    style={{ objectFit: 'cover' }}
  />
</div>

// Fixed size mode
<Image
  src="/images/team/nj.jpg"
  alt="NJ — Founder"
  width={400}
  height={500}
  style={{ objectFit: 'cover' }}
/>
```

---

## Blur placeholder (polished loading experience)

Generate a base64 blur data URL for each image.
Install the tool once:

```bash
npm install plaiceholder sharp
```

Then generate:

```bash
npx plaiceholder public/images/work/aura/cover.jpg
```

It outputs a `blurDataURL` string. Add it to your component:

```tsx
<Image
  src="/images/work/aura/cover.jpg"
  alt="Aura"
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/..."
  style={{ objectFit: 'cover' }}
/>
```

For a production site, generate these for every image and store
them in the .md frontmatter:

```yaml
coverImage: "/images/work/aura/cover.jpg"
coverBlur: "data:image/jpeg;base64,/9j/..."
```

---

## External images (Unsplash, Cloudinary, etc.)

Add the domain to `next.config.js`:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
},
```

Then use the full URL as `src`:

```tsx
<Image
  src="https://images.unsplash.com/photo-..."
  alt="..."
  fill
  sizes="100vw"
  style={{ objectFit: 'cover' }}
/>
```

---

## Recommended image sizes and formats

| Use case          | Size          | Format  |
|-------------------|---------------|---------|
| Work cover card   | 1200 × 900    | JPG/WebP|
| Case study hero   | 1920 × 1080   | JPG/WebP|
| Gallery image     | 1600 × 1000   | JPG/WebP|
| Journal cover     | 1200 × 700    | JPG/WebP|
| Team photo        | 800 × 1000    | JPG/WebP|
| Logo / icon       | any           | SVG     |

Keep JPGs at 80–85% quality. WebP at 75–80%.
Aim for under 300kb per image — Next.js will compress further.

---

## Adding an image inside a .md article body

To embed images inside your markdown content, use standard
markdown syntax:

```markdown
![Alt text describing the image](/images/work/aura/brand-01.jpg)
```

The `MarkdownBody` component needs one small addition to handle
`![...]()` syntax. Add this to `src/components/ui/MarkdownBody.tsx`:

```tsx
// In the parseInline function, add:
.replace(
  /!\[([^\]]*)\]\(([^)]+)\)/g,
  '<img src="$2" alt="$1" style="width:100%;height:auto;margin:32px 0;" />'
)
```

Or for proper Next.js Image handling, install `remark` and use
`next-mdx-remote` — the package is already in package.json.

---

## Quick checklist for a new project

- [ ] Create folder `public/images/work/your-slug/`
- [ ] Add `cover.jpg` (1200×900, under 300kb)
- [ ] Add extra images named `01.jpg`, `02.jpg` etc.
- [ ] Update `content/work/your-slug.md` frontmatter
- [ ] Set `coverImage: "/images/work/your-slug/cover.jpg"`
- [ ] Add paths to `images: []` array for gallery
- [ ] Run `npm run dev` and check `/work/your-slug`
