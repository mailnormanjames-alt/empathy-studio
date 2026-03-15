import type { Metadata }         from 'next'
import { notFound }              from 'next/navigation'
import Image                     from 'next/image'
import Link                      from 'next/link'
import { getAllWork, getWorkBySlug } from '@/lib/mdx'
import MarkdownBody              from '@/components/ui/MarkdownBody'
import styles                    from './case-study.module.css'

// ── Static params: build a page for every .md file ──────────
export async function generateStaticParams() {
  return getAllWork().map(p => ({ slug: p.slug }))
}

// ── Per-page metadata from frontmatter ──────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getWorkBySlug(params.slug)
  if (!post) return {}
  return { title: post.frontmatter.title }
}

// ── Page ─────────────────────────────────────────────────────
export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getWorkBySlug(params.slug)
  if (!post) notFound()

  const { frontmatter: fm, content } = post

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src={fm.coverImage}
            alt={fm.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <Link href="/work" className={styles.back}>← Work</Link>
          <div className={styles.heroMeta}>
            {fm.categories.map(c => (
              <span key={c} className={styles.tag}>{c}</span>
            ))}
          </div>
          <h1 className={styles.heroTitle}>{fm.title}</h1>
          <div className={styles.heroDetails}>
            <span>{fm.client}</span>
            <span className={styles.dot}>✦</span>
            <span>{fm.year}</span>
            <span className={styles.dot}>✦</span>
            <span>{fm.timeline}</span>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      {fm.stats?.length > 0 && (
        <div className={styles.stats}>
          {fm.stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
              {s.sub && <span className={styles.statSub}>{s.sub}</span>}
            </div>
          ))}
        </div>
      )}

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Services</div>
            {fm.services.map(s => (
              <div key={s} className={styles.sideItem}>{s}</div>
            ))}
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Year</div>
            <div className={styles.sideItem}>{fm.year}</div>
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Timeline</div>
            <div className={styles.sideItem}>{fm.timeline}</div>
          </div>
        </aside>

        {/* Prose — renders your .md content */}
        <article className={styles.prose}>
          <MarkdownBody content={content} />
        </article>
      </div>

      {/* ── Project images ── */}
      {fm.images?.length > 1 && (
        <div className={styles.gallery}>
          {fm.images.slice(1).map((src, i) => (
            <div key={i} className={styles.galleryItem}>
              <Image
                src={src}
                alt={`${fm.title} — image ${i + 2}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Next project ── */}
      <Link href="/work" className={styles.nextProject}>
        <span className={styles.nextLabel}>Next project</span>
        <span className={styles.nextArrow}>↗</span>
      </Link>
    </>
  )
}
