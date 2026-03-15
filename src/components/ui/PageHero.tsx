'use client'

import dynamic from 'next/dynamic'
import Link    from 'next/link'
import Image   from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap }              from 'gsap'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'
import styles from './home.module.css'

const OrbCanvas = dynamic(() => import('@/components/ui/OrbCanvas'), { ssr: false })

function Loader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!
    const word    = el.querySelector<HTMLElement>('.ld-word')!
    const tagline = el.querySelector<HTMLElement>('.ld-tagline')!
    const bar     = el.querySelector<HTMLElement>('.ld-bar')!
    const counter = el.querySelector<HTMLElement>('.ld-counter')!

    const tl = gsap.timeline({
      onComplete: () => {
        // Hold at 100% for 2 seconds before dismissing
        gsap.delayedCall(2, () => {
          gsap.to([word, tagline], { opacity: 0, y: -20, duration: 0.4, stagger: 0.06,
            onComplete: () => {
              gsap.to(el, {
                clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power3.inOut',
                onComplete: () => { el.style.display = 'none'; onDone() },
              })
            }
          })
        })
      },
    })

    tl.fromTo(word,    { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      .fromTo(tagline, { opacity: 0 },         { opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(bar,     { scaleX: 0 },          { scaleX: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: 'left' }, '-=0.2')

    const obj = { val: 0 }
    tl.to(obj, {
      val: 100, duration: 1.4, ease: 'power2.inOut',
      onUpdate: () => { counter.textContent = String(Math.floor(obj.val)).padStart(3, '0') },
    }, '<')
  }, [onDone])

  return (
    <div ref={ref} className={styles.loader}>
      <div className={styles.loaderInner}>
        <div className={`ld-word ${styles.ldWord}`}>Empathy</div>
        <div className={`ld-tagline ${styles.ldTagline}`}>Emotion-led design studio</div>
        <div className={styles.ldTrack}><div className={`ld-bar ${styles.ldBar}`} /></div>
        <div className={`ld-counter ${styles.ldCounter}`}>000</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  const startPage = () => {
    gsap.registerPlugin(ScrollTrigger)
    const el = pageRef.current
    if (!el) return
    gsap.fromTo('.hero-icon', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: 'back.out(1.7)' })
    el.querySelectorAll<HTMLElement>('.hero-ln').forEach((ln, i) => {
      gsap.fromTo(ln, { y: '105%' }, { y: '0%', duration: 1.1, ease: 'power4.out', delay: 0.2 + i * 0.12 })
    })
    gsap.fromTo('.hero-cta', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7 })
  }

  return (
    <div ref={pageRef}>
      <Loader onDone={startPage} />

      <section className={styles.hero}>
        <OrbCanvas />
        <div className={styles.heroBg} />

        {/* ✦ icon replacing eyebrow text */}
        <span className={`hero-icon ${styles.heroIcon}`}>✦</span>

        <h1 className={styles.headline}>
          {['We design for', 'how things', '<em>feel.</em>'].map((ln, i) => (
            <div key={i} className={styles.lnWrap}>
              <span className={`hero-ln ${styles.ln}`} dangerouslySetInnerHTML={{ __html: ln }} />
            </div>
          ))}
        </h1>
        <div className={`hero-cta ${styles.heroCta}`} style={{ opacity: 0 }}>
          <Link href="/work" className="btn-ghost">See our work</Link>
          <Link href="/start" className="btn-fill">Start a project ↗</Link>
        </div>
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      <div className="mq-wrap">
        <div className="mq-track">
          {Array(2).fill(null).map((_, rep) =>
            ['Brand Identity','Web Design','UI/UX','3D & Motion','Graphic Design','Art Direction'].map(s => (
              <span key={`${rep}-${s}`} className="mq-item">{s} <span className="mq-dot">✦</span> </span>
            ))
          )}
        </div>
      </div>

      <PhilosophySection />
      <ServicesListSection />
      <StatsSection />
      <ShowcaseSection />
      <CtaSection />
      <BackToTop />
    </div>
  )
}

function PhilosophySection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.ph-hl'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 82%' } })
    el.querySelectorAll<HTMLElement>('.ph-card').forEach((c, i) => {
      gsap.fromTo(c, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, delay: i * 0.12, scrollTrigger: { trigger: el, start: 'top 78%' } })
    })
  }, [])
  const cards = [
    { n: '01', t: 'Emotion first', b: 'Before strategy, before aesthetics — we start by asking how we want people to feel. That question drives everything.' },
    { n: '02', t: 'No decoration', b: 'Every element earns its place. If it doesn\'t communicate, it doesn\'t exist.' },
    { n: '03', t: 'Honest craft', b: 'We make things properly. The detail nobody notices consciously is the detail that makes someone stay.' },
  ]
  return (
    <section ref={ref} className={styles.philosophy}>
      <h2 className={`ph-hl ${styles.phHl}`}>Design that makes<br />people <em>feel something.</em></h2>
      <div className={styles.phGrid}>
        {cards.map(c => (
          <div key={c.n} className={`ph-card ${styles.phCard}`}>
            <span className={styles.phNum}>{c.n}</span>
            <h3 className={styles.phTitle}>{c.t}</h3>
            <p className={styles.phBody}>{c.b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ServicesListSection() {
  const ref = useRef<HTMLElement>(null)
  const services = [
    { n: '01', name: 'Brand Identity', desc: 'Logo, color, type, language, guidelines' },
    { n: '02', name: 'Web Design & Dev', desc: 'Design + Next.js build, GSAP animation' },
    { n: '03', name: 'UI / UX Design', desc: 'Apps, dashboards, product design' },
    { n: '04', name: '3D & Motion', desc: 'Animation, renders, film titles' },
    { n: '05', name: 'Graphic Design', desc: 'Campaign, print, editorial' },
  ]
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ref.current!.querySelectorAll<HTMLElement>('.svc-row').forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.65, delay: i * 0.08, scrollTrigger: { trigger: row, start: 'top 88%' } })
    })
  }, [])
  return (
    <section ref={ref} className={styles.servicesList}>
      <p className={`eyebrow ${styles.slEye}`}>What we do</p>
      {services.map(s => (
        <div key={s.n} className={`svc-row ${styles.svcRow}`}>
          <span className={styles.svcN}>{s.n}</span>
          <span className={styles.svcName}>{s.name}</span>
          <span className={styles.svcDesc}>{s.desc}</span>
          <Link href="/services" className={styles.svcArrow}>↗</Link>
        </div>
      ))}
    </section>
  )
}

function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const stats = [
    { val: '60+', lbl: 'Projects delivered' },
    { val: '4',   lbl: 'Years operating' },
    { val: '12',  lbl: 'Awwwards nominations' },
    { val: '100%',lbl: 'Remote-first' },
  ]
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ref.current!.querySelectorAll<HTMLElement>('.stat-item').forEach((s, i) => {
      gsap.fromTo(s, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, scrollTrigger: { trigger: ref.current!, start: 'top 85%' } })
    })
  }, [])
  return (
    <section ref={ref} className={styles.statsRow}>
      {stats.map(s => (
        <div key={s.lbl} className={`stat-item ${styles.stat}`}>
          <span className={styles.statVal}>{s.val}</span>
          <span className={styles.statLbl}>{s.lbl}</span>
        </div>
      ))}
    </section>
  )
}

/* ── SHOWCASE SECTION (homepage teaser) ── */
const SHOWCASE_ITEMS = [
  {
    title: 'Aura — Wellness Platform',
    tags: ['UI/UX', 'Development'],
    year: '2025',
    image: '/images/work/aura/cover.jpg',
    slug: 'aura',
  },
  {
    title: 'Forma — Architecture Studio',
    tags: ['Branding', 'Graphic Design'],
    year: '2024',
    image: '/images/work/forma/cover.jpg',
    slug: 'forma',
  },
  {
    title: 'Orbit — SaaS Dashboard',
    tags: ['UI/UX', 'Motion'],
    year: '2024',
    image: '/images/work/orbit/cover.jpg',
    slug: 'orbit',
  },
]

function ShowcaseSection() {
  const ref        = useRef<HTMLElement>(null)
  const activeRef  = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.sc-viewall'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.7, scrollTrigger: { trigger: el, start: 'top 85%' } })
    el.querySelectorAll<HTMLElement>('.sc-dot').forEach((d, i) => {
      gsap.fromTo(d, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.4, delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 80%' } })
    })
  }, [])

  return (
    <section ref={ref} className={styles.showcase}>
      {/* Top bar */}
      <div className={styles.scTopBar}>
        <p className={`eyebrow`}>Featured work</p>
        <Link href="/showcase" className={`sc-viewall ${styles.scViewAll}`}>View all ↗</Link>
      </div>

      {/* Main card */}
      <div className={styles.scMain}>
        {SHOWCASE_ITEMS.map((item, i) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className={`${styles.scCard} ${active === i ? styles.scCardActive : ''}`}
          >
            <div className={styles.scImage}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.scOverlay} />
            </div>
            <div className={styles.scInfo}>
              <div className={styles.scTags}>
                {item.tags.map((t, ti) => (
                  <span key={t}>
                    <span className={styles.scTag}>{t}</span>
                    {ti < item.tags.length - 1 && <span className={styles.scTagDot}> · </span>}
                  </span>
                ))}
              </div>
              <h3 className={styles.scTitle}>{item.title}</h3>
              <span className={styles.scYear}>{item.year}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Dots nav */}
      <div className={styles.scDots}>
        {SHOWCASE_ITEMS.map((_, i) => (
          <button
            key={i}
            className={`sc-dot ${styles.scDot} ${active === i ? styles.scDotActive : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Show project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      onClick={scrollUp}
      data-cursor
      className={`${styles.backToTop} ${visible ? styles.backToTopVisible : ''}`}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

function CtaSection() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelectorAll('.cta-ani'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 82%' } })
  }, [])
  return (
    <section ref={ref} className={styles.cta}>
      <div className={styles.ctaGlow} />
      <p className={`eyebrow cta-ani`}>✦ Let's create something</p>
      <h2 className={`cta-ani ${styles.ctaHl}`}>Got a vision?<br />We'll make it <em>breathe.</em></h2>
      <div className={`cta-ani ${styles.ctaBtns}`}>
        <Link href="/start" className="btn-fill">Start a project ↗</Link>
        <Link href="/work" className="btn-ghost">See our work</Link>
      </div>
    </section>
  )
}
