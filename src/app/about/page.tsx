'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './about.module.css'

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.hero-eye'),{opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.35})
    el.querySelectorAll<HTMLElement>('.hero-ln').forEach((ln,i)=>{
      gsap.fromTo(ln,{y:'105%'},{y:'0%',duration:1.1,ease:'power4.out',delay:.4+i*.12})
    })
    gsap.to(el.querySelector('.hero-ghost'),{y:-60,ease:'none',scrollTrigger:{trigger:el.querySelector('.a-hero'),start:'top top',end:'bottom top',scrub:1.2}})
    el.querySelectorAll<HTMLElement>('.reveal').forEach(r=>{
      gsap.fromTo(r,{opacity:0,y:22},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:r,start:'top 88%'}})
    })
    el.querySelectorAll<HTMLElement>('.stat-item').forEach((s,i)=>{
      gsap.fromTo(s,{opacity:0,y:20},{opacity:1,y:0,duration:.7,delay:i*.1,scrollTrigger:{trigger:s,start:'top 88%'}})
    })
  }, [])

  return (
    <div ref={ref}>
      <section className={`a-hero ${styles.hero}`}>
        <div className={styles.heroBg}/>
        <div className={`hero-ghost ${styles.ghost}`}>A</div>
        <p className={`hero-eye eyebrow ${styles.eyebrow}`}>About the studio</p>
        <h1 className={styles.headline}>
          {['We exist to make','brands people','<em>remember feeling.</em>'].map((ln,i)=>(
            <div key={i} className={styles.lnWrap}><span className={`hero-ln ${styles.ln}`} dangerouslySetInnerHTML={{__html:ln}}/></div>
          ))}
        </h1>
      </section>

      <section className={styles.story}>
        <div className={`reveal ${styles.storyLeft}`}>
          <h2 className={styles.storyHl}>A small studio that does<br/><em>big, careful work.</em></h2>
        </div>
        <div className={`reveal ${styles.storyRight}`}>
          <p>Empathy was founded on a single belief: that the difference between a brand people remember and one they forget isn't strategy or budget. It's whether it made them feel something.</p>
          <p>We're remote-first. We keep the team deliberately small — every project is touched by the people who actually know what they're doing, not handed to junior staff the moment the brief is signed.</p>
          <p>We work with startups building their first brand, established companies who've outgrown their visual identity, and founders who need someone who will be honest with them when it matters.</p>
        </div>
      </section>

      <div className={styles.statsRow}>
        {[{v:'4+',l:'Years operating'},{v:'60+',l:'Projects completed'},{v:'12',l:'Award nominations'},{v:'100%',l:'Remote-first'}].map(s=>(
          <div key={s.l} className={`stat-item ${styles.stat}`}>
            <span className={styles.statVal}>{s.v}</span>
            <span className={styles.statLbl}>{s.l}</span>
          </div>
        ))}
      </div>

      <section className={styles.philoSection}>
        <p className={`eyebrow reveal ${styles.secEye}`}>What drives us</p>
        <div className={styles.philoGrid}>
          {[
            {t:'Design is communication',b:'Everything we make is trying to say something. If we don\'t know what it\'s saying, we start again.'},
            {t:'Brief before beauty',b:'The most beautiful solution to the wrong problem is still wrong. We spend time getting the brief right.'},
            {t:'Restraint is a skill',b:'Knowing what to leave out is harder than knowing what to put in. We practice it deliberately.'},
          ].map(c=>(
            <div key={c.t} className={`reveal ${styles.philoCard}`}>
              <h3 className={styles.philoTitle}>{c.t}</h3>
              <p className={styles.philoBody}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={`reveal ${styles.valuesHl}`}>Six things we believe<br/>about <em>good work.</em></h2>
        <div className={styles.valuesGrid}>
          {[
            {n:'01',t:'Empathy over assumption',b:'We listen before we speak. We understand before we design.'},
            {n:'02',t:'Quality over speed',b:'We\'d rather take another week than ship something we\'re not proud of.'},
            {n:'03',t:'Honesty over comfort',b:'We tell you what we actually think, not what you want to hear.'},
            {n:'04',t:'Restraint over excess',b:'We remove things until only the essential remains.'},
            {n:'05',t:'Craft over trend',b:'We make things that will still feel right in five years.'},
            {n:'06',t:'Outcome over output',b:'We judge our work by what it achieves, not how many pages it has.'},
          ].map(v=>(
            <div key={v.n} className={`reveal ${styles.valueRow}`}>
              <span className={styles.valueN}>{v.n}</span>
              <div>
                <div className={styles.valueTitle}>{v.t}</div>
                <div className={styles.valueBody}>{v.b}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGlow}/>
        <p className={`eyebrow reveal`} style={{marginBottom:20}}>✦ Work with us</p>
        <h2 className={`reveal ${styles.ctaHl}`}>Tell us what you're<br/>building. We'll tell you<br/><em>how we'd approach it.</em></h2>
        <Link href="/start" className={`reveal btn-fill`}>Start a project ↗</Link>
      </section>
    </div>
  )
}
