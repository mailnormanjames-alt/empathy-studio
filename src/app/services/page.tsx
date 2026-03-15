'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './services.module.css'

const SERVICES = [
  {
    id:'branding', n:'01', name:'Brand Identity',
    tagline:'The feeling that precedes the thought.',
    desc:'We build brand identities that communicate before they\'re read. From strategy to final assets, every decision is made in service of a feeling.',
    steps:['Brand strategy & positioning','Visual identity & wordmark','Color, type & motion systems','Brand guidelines & asset library'],
    deliverables:['Logo suite (SVG/PDF)','Brand book PDF','Figma component library','Font licences'],
    accent:'rgba(212,180,114,.5)',
  },
  {
    id:'web', n:'02', name:'Web Design & Development',
    tagline:'The internet\'s most permanent first impression.',
    desc:'We design and build websites in Next.js with GSAP animation, Lenis smooth scroll, and obsessive attention to detail. Performant, accessible, and memorable.',
    steps:['UX architecture & wireframes','Visual design in Figma','Motion & interaction design','Next.js development & QA'],
    deliverables:['Figma design files','Next.js codebase','Sanity CMS setup','Performance report'],
    accent:'rgba(80,160,200,.5)',
  },
  {
    id:'uiux', n:'03', name:'UI / UX Design',
    tagline:'Products that feel as good as they work.',
    desc:'Interface design for web apps, mobile products, and dashboards. We design systems, not screens — so your product can grow without losing coherence.',
    steps:['User research & flows','Information architecture','Component design system','Prototype & usability testing'],
    deliverables:['Figma design system','Interactive prototype','Handoff-ready specs','Component documentation'],
    accent:'rgba(160,100,200,.5)',
  },
  {
    id:'motion', n:'04', name:'3D & Motion',
    tagline:'The second before cognition.',
    desc:'Motion work for brand films, product launches, website animations, and social content. We use GSAP, After Effects, Cinema 4D, and Spline.',
    steps:['Motion brief & storyboard','Style frames & approval','Animation production','Export & delivery'],
    deliverables:['Master files (AE/C4D)','Exported MP4/WebM','Looping variants','Social format cuts'],
    accent:'rgba(200,100,60,.5)',
  },
  {
    id:'graphic', n:'05', name:'Graphic Design',
    tagline:'Print still matters. We do it properly.',
    desc:'Campaign design, editorial, packaging, environmental graphics. Physical things made with the same care we bring to digital.',
    steps:['Creative concept','Design & iteration','Print-ready production','Supplier coordination'],
    deliverables:['Print-ready PDFs','Source files (Illustrator/InDesign)','Supplier specifications','Digital variants'],
    accent:'rgba(80,180,120,.5)',
  },
]

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.hero-eye'),{opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.35})
    el.querySelectorAll<HTMLElement>('.hero-ln').forEach((ln,i)=>{
      gsap.fromTo(ln,{y:'105%'},{y:'0%',duration:1.1,ease:'power4.out',delay:.4+i*.12})
    })
    gsap.to(el.querySelector('.hero-ghost'),{y:-60,ease:'none',scrollTrigger:{trigger:el.querySelector('.s-hero'),start:'top top',end:'bottom top',scrub:1.2}})
    el.querySelectorAll<HTMLElement>('.reveal').forEach(r=>{
      gsap.fromTo(r,{opacity:0,y:20},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:r,start:'top 88%'}})
    })
  }, [])

  return (
    <div ref={ref}>
      <section className={`s-hero ${styles.hero}`}>
        <div className={styles.heroBg}/>
        <div className={`hero-ghost ${styles.ghost}`}>S</div>
        <p className={`hero-eye eyebrow ${styles.eyebrow}`}>What we offer</p>
        <h1 className={styles.headline}>
          {['Five disciplines,','one point of','<em>view.</em>'].map((ln,i)=>(
            <div key={i} className={styles.lnWrap}><span className={`hero-ln ${styles.ln}`} dangerouslySetInnerHTML={{__html:ln}}/></div>
          ))}
        </h1>
      </section>

      {SERVICES.map((svc,idx)=>(
        <section key={svc.id} id={svc.id} className={`${styles.svcPanel} ${idx%2===1?styles.svcFlip:''}`}>
          <div className={styles.svcLeft} style={{'--accent':svc.accent} as React.CSSProperties}>
            <span className={`eyebrow reveal`}>{svc.n} / {svc.name}</span>
            <h2 className={`reveal ${styles.svcHl}`}>{svc.tagline}</h2>
            <p className={`reveal ${styles.svcDesc}`}>{svc.desc}</p>
            <div className={`reveal ${styles.svcDelivs}`}>
              <p className={styles.delivLabel}>Deliverables</p>
              <div className={styles.delivChips}>
                {svc.deliverables.map(d=><span key={d} className={styles.chip}>{d}</span>)}
              </div>
            </div>
          </div>
          <div className={styles.svcRight}>
            {svc.steps.map((step,si)=>(
              <div key={step} className={`reveal ${styles.step}`}>
                <span className={styles.stepN}>{String(si+1).padStart(2,'0')}</span>
                <span className={styles.stepText}>{step}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section className={styles.pricing}>
        <p className={`eyebrow reveal`} style={{marginBottom:20,display:'block'}}>Investment</p>
        <h2 className={`reveal ${styles.pricingHl}`}>Transparent pricing.<br/><em>No surprises.</em></h2>
        <div className={styles.pricingGrid}>
          {[
            {name:'Essentials',price:'From £2,500',items:['Brand identity','2 rounds of revisions','Final file export','7-day delivery'],featured:false},
            {name:'Studio',price:'From £8,000',items:['Full brand + web design','Development included','Unlimited revisions','Priority support','4-week timeline'],featured:true},
            {name:'Full Studio',price:'Custom',items:['Brand + web + motion','Ongoing retainer option','Dedicated project lead','Custom timeline','Everything included'],featured:false},
          ].map(p=>(
            <div key={p.name} className={`reveal ${styles.pricingCard} ${p.featured?styles.featured:''}`}>
              <div className={styles.pricingName}>{p.name}</div>
              <div className={styles.pricingPrice}>{p.price}</div>
              <ul className={styles.pricingItems}>
                {p.items.map(i=><li key={i}>{i}</li>)}
              </ul>
              <Link href="/start" className={p.featured?'btn-fill':'btn-ghost'}>Get started ↗</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGlow}/>
        <p className={`eyebrow reveal`} style={{marginBottom:20}}>✦ Not sure what you need?</p>
        <h2 className={`reveal ${styles.ctaHl}`}>Tell us what you're<br/>trying to achieve.<br/><em>We'll figure it out together.</em></h2>
        <Link href="/contact" className={`reveal btn-fill`}>Get in touch ↗</Link>
      </section>
    </div>
  )
}
