import type { Metadata }                          from 'next'
import { notFound }                               from 'next/navigation'
import Image                                      from 'next/image'
import Link                                       from 'next/link'
import { getAllJournal, getJournalBySlug }        from '@/lib/mdx'
import MarkdownBody                               from '@/components/ui/MarkdownBody'
import styles                                     from './post.module.css'

export async function generateStaticParams() {
  return getAllJournal().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getJournalBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

export default function JournalPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getJournalBySlug(params.slug)
  if (!post) notFound()

  const { frontmatter: fm, content } = post
  const dateStr = new Date(fm.date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroArt}>
          <Image
            src={fm.coverImage}
            alt={fm.title}
            fill
            priority
            sizes="45vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumb}>
            <Link href="/journal">Journal</Link>
            <span>/</span>
            <span>{fm.category}</span>
          </div>
          <p className="eyebrow">{fm.category} · {fm.readTime} min read</p>
          <h1 className={styles.title}>{fm.title}</h1>
          <div className={styles.meta}>
            <span>{fm.author}</span>
            <span className={styles.dot}>✦</span>
            <span>{dateStr}</span>
            <span className={styles.dot}>✦</span>
            <span>{fm.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className={styles.body}>
        <article className={styles.prose}>
          <MarkdownBody content={content} />
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Written by</div>
            <div className={styles.sideVal}>{fm.author}</div>
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Published</div>
            <div className={styles.sideVal}>{dateStr}</div>
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Reading time</div>
            <div className={styles.sideVal}>{fm.readTime} minutes</div>
          </div>
          <div className={styles.sideBlock}>
            <div className={styles.sideLabel}>Tags</div>
            <div className={styles.tags}>
              {fm.tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
          <div className={styles.sideBlock}>
            <Link href="/start" className="btn-fill">
              Start a project ↗
            </Link>
          </div>
        </aside>
      </div>

      {/* Back to journal */}
      <div className={styles.backRow}>
        <Link href="/journal" className="btn-ghost">← All essays</Link>
      </div>
    </>
  )
}
