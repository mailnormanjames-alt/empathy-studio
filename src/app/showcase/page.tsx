'use client'

import Link    from 'next/link'
import Image   from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './showcase.module.css'

const ITEMS = [
  { n:'01', title:'Aura — Wellness Platform',    tags:['UI/UX','Development'],       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(212,180,114,.15)' },
  { n:'02', title:'Forma — Architecture Studio', tags:['Branding','Graphic Design'], year:'2024', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(180,100,60,.12)'  },
  { n:'03', title:'Orbit — SaaS Dashboard',      tags:['UI/UX','Motion'],            year:'2024', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(80,140,200,.12)'  },
  { n:'04', title:'Project Four — Coming Soon',  tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(120,180,120,.10)' },
  { n:'05', title:'Project Five — Coming Soon',  tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(160,100,200,.10)' },
  { n:'06', title:'Project Six — Coming Soon',   tags:['TBD'],                       year:'2025', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(200,160,80,.10)'  },
  { n:'07', title:'Project Seven — Coming Soon', tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(212,180,114,.10)' },
  { n:'08', title:'Project Eight — Coming Soon', tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(80,140,200,.10)'  },
  { n:'09', title:'Project Nine — Coming Soon',  tags:['TBD'],                       year:'2025', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(180,100,60,.10)'  },
  { n:'10', title:'Project Ten — Coming Soon',   tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(120,180,120,.10)' },
  { n:'11', title:'Project Eleven — Coming Soon',tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(160,100,200,.10)' },
  { n:'12', title:'Project Twelve — Coming Soon',tags:['TBD'],                       year:'2025', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(200,160,80,.10)'  },
  { n:'13', title:'Project 13 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(212,180,114,.10)' },
  { n:'14', title:'Project 14 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(80,140,200,.10)'  },
  { n:'15', title:'Project 15 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(180,100,60,.10)'  },
  { n:'16', title:'Project 16 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(120,180,120,.10)' },
  { n:'17', title:'Project 17 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(160,100,200,.10)' },
  { n:'18', title:'Project 18 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/orbit/cover.jpg', slug:'orbit', color:'rgba(200,160,80,.10)'  },
  { n:'19', title:'Project 19 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/aura/cover.jpg',  slug:'aura',  color:'rgba(212,180,114,.10)' },
  { n:'20', title:'Project 20 — Coming Soon',    tags:['TBD'],                       year:'2025', image:'/images/work/forma/cover.jpg', slug:'forma', color:'rgba(80,140,200,.10)'  },
]

export default function ShowcasePage() {
  const ref         = useRef<HTMLDivElement>(null)
  const topImgRefs  = useRef<(HTMLDivElement|null)[]>([])
  const botImgRefs  = useRef<(HTMLDivElement|null)[]>([])
  const topInfoRef  = useRef<HTMLDivElement>(null)
  const botInfoRef  = useRef<HTMLDivElement>(null)
  const [topActive, setTopActive] = useState(0)
  const [botActive, setBotActive] = useState(0)
  const [topBusy,   setTopBusy]   = useState(false)
  const [botBusy,   setBotBusy]   = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Entrance
    const tl = gsap.timeline({ defaults:{ ease:'power3.out' } })
    tl.fromTo('.sc-eyebrow', { opacity:0, y:16 }, { opacity:1, y:0, duration:.7 }, .2)
      .fromTo('.sc-hl-ln',   { y:'105%' },         { y:'0%', duration:1.1, ease:'power4.out', stagger:.1 }, .3)
      .fromTo('.sc-num',     { opacity:0, y:10 },  { opacity:1, y:0, duration:.5, stagger:.05 }, .5)
      .fromTo('.sc-name',    { opacity:0, x:-10 }, { opacity:1, x:0, duration:.5, stagger:.05 }, .55)
      .fromTo(topImgRefs.current[0], { opacity:0 }, { opacity:1, duration:1.4 }, .2)
      .fromTo('.sc-top-info', { opacity:0, y:14 }, { opacity:1, y:0, duration:.7 }, .7)

    // Grid cards
    gsap.utils.toArray<HTMLElement>('.sc-gc').forEach((c,i) => {
      gsap.fromTo(c, { opacity:0, y:36 }, { opacity:1, y:0, duration:.8, delay:i*.08,
        scrollTrigger:{ trigger:c, start:'top 88%' } })
    })

    // Bottom viewer
    gsap.fromTo('.sc-bot-side', { opacity:0, x:20 },
      { opacity:1, x:0, duration:.7, stagger:.05,
        scrollTrigger:{ trigger:'.sc-bot-viewer', start:'top 82%' } })
    gsap.fromTo('.sc-bot-img-wrap', { opacity:0 },
      { opacity:1, duration:1.2,
        scrollTrigger:{ trigger:'.sc-bot-viewer', start:'top 82%' } })
  }, [])

  const goTop = useCallback((i:number) => {
    if (i === topActive || topBusy) return
    setTopBusy(true)
    const out  = topImgRefs.current[topActive]
    const inn  = topImgRefs.current[i]
    const info = topInfoRef.current!
    gsap.to(info, { opacity:0, y:8, duration:.25, ease:'power2.in' })
    gsap.to(out,  { opacity:0, duration:.4, ease:'power2.in', onComplete:() => {
      setTopActive(i); setTopBusy(false)
      gsap.fromTo(inn,  { opacity:0, scale:1.03 }, { opacity:1, scale:1, duration:.7, ease:'power2.out' })
      gsap.fromTo(info, { opacity:0, y:12 }, { opacity:1, y:0, duration:.6, ease:'power3.out', delay:.15 })
    }})
  }, [topActive, topBusy])

  const goBot = useCallback((i:number) => {
    if (i === botActive || botBusy) return
    setBotBusy(true)
    const out  = botImgRefs.current[botActive]
    const inn  = botImgRefs.current[i]
    const info = botInfoRef.current!
    gsap.to(info, { opacity:0, y:8, duration:.25, ease:'power2.in' })
    gsap.to(out,  { opacity:0, duration:.4, ease:'power2.in', onComplete:() => {
      setBotActive(i); setBotBusy(false)
      gsap.fromTo(inn,  { opacity:0, scale:1.03 }, { opacity:1, scale:1, duration:.7, ease:'power2.out' })
      gsap.fromTo(info, { opacity:0, y:12 }, { opacity:1, y:0, duration:.6, ease:'power3.out', delay:.15 })
    }})
  }, [botActive, botBusy])

  return (
    <div ref={ref} className={styles.wrap}>

      {/* ── HERO HEADER ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <p className={`sc-eyebrow eyebrow ${styles.eyebrow}`}>✦ Selected showcase</p>
        <h1 className={styles.headline}>
          {['Work that', 'makes people', '<em>stop.</em>'].map((ln,i) => (
            <div key={i} className={styles.lnWrap}>
              <span className={`sc-hl-ln ${styles.ln}`} dangerouslySetInnerHTML={{ __html: ln }} />
            </div>
          ))}
        </h1>
      </section>

      {/* ── TOP VIEWER: Left sidebar + Image right ── */}
      <div className={`${styles.viewer} ${styles.viewerTop}`}>

        {/* Left sidebar — projects 01–10 */}
        <aside className={styles.sidebarL}>
          {ITEMS.slice(0,10).map((item,i) => (
            <button key={i} onClick={()=>goTop(i)}
              className={`sc-num sc-name ${styles.sideItem} ${topActive===i ? styles.sideActive:''}`}>
              <span className={styles.sideN}>{item.n}</span>
              <div className={styles.sideMid}>
                <span className={styles.sideName}>{item.title}</span>
                <span className={`sc-yr ${styles.sideYr}`}>{item.year}</span>
              </div>
              <div className={`${styles.sideBarL} ${topActive===i?styles.sideBarOn:''}`}/>
            </button>
          ))}
        </aside>

        {/* Image — right */}
        <div className={styles.imgWrap}>
          <Link href="/work" className={styles.viewAll}>View all work ↗</Link>
          {ITEMS.map((item,i) => (
            <div key={i} ref={el=>{topImgRefs.current[i]=el}}
              className={styles.imgSlide} style={{opacity:i===0?1:0}}>
              <Image src={item.image} alt={item.title} fill priority={i===0}
                sizes="75vw" style={{objectFit:'cover'}}/>
              <div className={styles.overlayL}/>
              <div className={styles.overlayB}/>
              <div className={styles.accent} style={{background:`radial-gradient(ellipse 65% 55% at 50% 50%,${item.color},transparent)`}}/>
            </div>
          ))}
          <div ref={topInfoRef} className={`sc-top-info ${styles.imgInfo}`}>
            <div className={styles.iTags}>
              {ITEMS[topActive].tags.map((t,ti)=>(
                <span key={t}>
                  <span className={styles.iTag}>{t}</span>
                  {ti<ITEMS[topActive].tags.length-1&&<span className={styles.iDot}> · </span>}
                </span>
              ))}
            </div>
            <Link href={`/work/${ITEMS[topActive].slug}`} className={styles.iTitle}>
              {ITEMS[topActive].title}
            </Link>
            <span className={styles.iYear}>{ITEMS[topActive].year}</span>
          </div>
          <div className={styles.dots}>
            {ITEMS.map((_,i)=>(
              <button key={i} onClick={()=>goTop(i)}
                className={`${styles.dot} ${topActive===i?styles.dotOn:''}`}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6-CARD GRID ── */}
      <section className={styles.grid}>
        <div className={styles.gridHdr}>
          <p className="eyebrow">✦ All projects</p>
        </div>
        <div className={styles.gridItems}>
          {ITEMS.map((item,i)=>(
            <Link key={i} href={`/work/${item.slug}`} className={`sc-gc ${styles.gCard}`}>
              <div className={styles.gImg}>
                <Image src={item.image} alt={item.title} fill
                  sizes="(max-width:900px) 100vw, 33vw" style={{objectFit:'cover'}}/>
                <div className={styles.gOverlay}/>
                <div className={styles.gAccent} style={{background:`radial-gradient(ellipse 70% 60% at 50% 60%,${item.color},transparent)`}}/>
              </div>
              <div className={styles.gStrip}>
                <div>
                  <div className={styles.gTags}>
                    {item.tags.map(t=><span key={t} className={styles.gTag}>{t}</span>)}
                  </div>
                  <h3 className={styles.gTitle}>{item.title}</h3>
                </div>
                <div className={styles.gRight}>
                  <span className={styles.gYear}>{item.year}</span>
                  <span className={styles.gArrow}>↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BOTTOM VIEWER: Image left + Right sidebar ── */}
      <div className={`sc-bot-viewer ${styles.viewer} ${styles.viewerBot}`}>

        {/* Image — left */}
        <div className={`sc-bot-img-wrap ${styles.imgWrap}`}>
          {ITEMS.map((item,i) => (
            <div key={i} ref={el=>{botImgRefs.current[i]=el}}
              className={styles.imgSlide} style={{opacity:i===0?1:0}}>
              <Image src={item.image} alt={item.title} fill
                sizes="75vw" style={{objectFit:'cover'}}/>
              <div className={styles.overlayR}/>
              <div className={styles.overlayB}/>
              <div className={styles.accent} style={{background:`radial-gradient(ellipse 65% 55% at 50% 50%,${item.color},transparent)`}}/>
            </div>
          ))}
          <div ref={botInfoRef} className={styles.imgInfo}>
            <div className={styles.iTags}>
              {ITEMS[botActive].tags.map((t,ti)=>(
                <span key={t}>
                  <span className={styles.iTag}>{t}</span>
                  {ti<ITEMS[botActive].tags.length-1&&<span className={styles.iDot}> · </span>}
                </span>
              ))}
            </div>
            <Link href={`/work/${ITEMS[botActive].slug}`} className={styles.iTitle}>
              {ITEMS[botActive].title}
            </Link>
            <span className={styles.iYear}>{ITEMS[botActive].year}</span>
          </div>
          <div className={styles.dots}>
            {ITEMS.map((_,i)=>(
              <button key={i} onClick={()=>goBot(i)}
                className={`${styles.dot} ${botActive===i?styles.dotOn:''}`}/>
            ))}
          </div>
        </div>

        {/* Right sidebar — projects 11–20 */}
        <aside className={`sc-bot-side ${styles.sidebarR}`}>
          {ITEMS.slice(10,20).map((item,i) => (
            <button key={i} onClick={()=>goBot(i+10)}
              className={`${styles.sideItem} ${botActive===i+10 ? styles.sideActive:''}`}>
              <span className={styles.sideN}>{item.n}</span>
              <div className={styles.sideMid}>
                <span className={styles.sideName}>{item.title}</span>
                <span className={styles.sideYr}>{item.year}</span>
              </div>
              <div className={`${styles.sideBarR} ${botActive===i?styles.sideBarOn:''}`}/>
            </button>
          ))}
        </aside>

      </div>

      {/* ── VIEW ALL ROW ── */}
      <Link href="/work" className={styles.viewAllRow}>
        <span>View all work</span>
        <span className={styles.viewAllArrow}>↗</span>
      </Link>

    </div>
  )
}
