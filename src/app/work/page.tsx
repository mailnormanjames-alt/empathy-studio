import type { Metadata } from 'next'
import Link            from 'next/link'
import Image           from 'next/image'
import { getAllWork }   from '@/lib/mdx'
import styles          from './work.module.css'

export const metadata: Metadata = { title: 'Work' }

export default function WorkPage() {
  const posts = getAllWork()

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <p className="eyebrow">Selected work</p>
        <h1 className={styles.headline}>
          Things we've<br />made that <em>matter.</em>
        </h1>
      </section>

      {/* Grid */}
      <div className={styles.grid}>
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/work/${post.slug}`}
            className={`${styles.card} ${styles[post.frontmatter.size]}`}
          >
            {/* Cover image */}
            <div className={styles.cardImage}>
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                /* placeholder="blur" blurDataURL="..." — add once you have real images */
              />
            </div>

            {/* Overlay */}
            <div className={styles.cardOverlay}>
              <div className={styles.cardMeta}>
                {post.frontmatter.tags.map(t => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>

            {/* Bottom strip — always visible */}
            <div className={styles.cardStrip}>
              <span className={styles.cardTitle}>{post.frontmatter.title}</span>
              <span className={styles.cardYear}>{post.frontmatter.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
