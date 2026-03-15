import type { Metadata }                      from 'next'
import Link                                   from 'next/link'
import Image                                  from 'next/image'
import { getAllJournal, getFeaturedJournal }  from '@/lib/mdx'
import styles                                 from './journal.module.css'

export const metadata: Metadata = { title: 'Journal' }

export default function JournalPage() {
  const posts    = getAllJournal()
  const featured = getFeaturedJournal()

  return (
    <>
      <section className={styles.hero}>
        <p className="eyebrow">The Empathy Journal</p>
        <h1 className={styles.headline}>
          Thoughts on design,<br />craft, and <em>feeling.</em>
        </h1>
        <p className={styles.sub}>
          Essays and observations from inside the studio.
          No content marketing. Just things we actually think.
        </p>
      </section>

      {/* Featured post */}
      {featured && (
        <div className={styles.featured}>
          <Link href={`/journal/${featured.slug}`} className={styles.featImage}>
            <Image
              src={featured.frontmatter.coverImage}
              alt={featured.frontmatter.title}
              fill
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </Link>
          <div className={styles.featContent}>
            <p className={styles.featLabel}>✦ Featured essay</p>
            <Link href={`/journal/${featured.slug}`} className={styles.featTitle}>
              {featured.frontmatter.title}
            </Link>
            <p className={styles.featExcerpt}>{featured.frontmatter.excerpt}</p>
            <div className={styles.featMeta}>
              <span>{featured.frontmatter.author}</span>
              <span className={styles.dot}>✦</span>
              <span>{new Date(featured.frontmatter.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
              <span className={styles.dot}>✦</span>
              <span>{featured.frontmatter.readTime} min read</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {posts.filter(p => !p.frontmatter.featured).map(post => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className={styles.card}
          >
            <p className={styles.cardCat}>{post.frontmatter.category}</p>
            <h3 className={styles.cardTitle}>{post.frontmatter.title}</h3>
            <p className={styles.cardExcerpt}>{post.frontmatter.excerpt}</p>
            <div className={styles.cardMeta}>
              <span>{new Date(post.frontmatter.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
              <span>{post.frontmatter.readTime} min ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
