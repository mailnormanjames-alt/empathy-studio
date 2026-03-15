'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './contact.module.css'

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.hero-eye'),{opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.35})
    el.querySelectorAll<HTMLElement>('.hero-ln').forEach((ln,i)=>{
      gsap.fromTo(ln,{y:'105%'},{y:'0%',duration:1.1,ease:'power4.out',delay:.4+i*.12})
    })
    gsap.to(el.querySelector('.hero-ghost'),{y:-60,ease:'none',scrollTrigger:{trigger:el.querySelector('.c-hero'),start:'top top',end:'bottom top',scrub:1.2}})
    el.querySelectorAll<HTMLElement>('.reveal').forEach(r=>{
      gsap.fromTo(r,{opacity:0,y:22},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:r,start:'top 88%'}})
    })
  }, [])

  return (
    <div ref={ref}>
      <section className={`c-hero ${styles.hero}`}>
        <div className={styles.heroBg}/>
        <div className={`hero-ghost ${styles.ghost}`}>C</div>
        <p className={`hero-eye eyebrow ${styles.eyebrow}`}>Get in touch</p>
        <h1 className={styles.headline}>
          {['We\'d love to','hear from <em>you.</em>'].map((ln,i)=>(
            <div key={i} className={styles.lnWrap}><span className={`hero-ln ${styles.ln}`} dangerouslySetInnerHTML={{__html:ln}}/></div>
          ))}
        </h1>
        <p className={`reveal ${styles.heroSub}`}>Whether you have a project in mind, a question, or you just want to say hello — our inbox is always open.</p>
      </section>

      <div className={styles.contactGrid}>
        {/* Info column */}
        <div className={styles.infoCol}>
          {[
            {label:'Email',val:'hello@empathy.studio',sub:'For project enquiries, press, and general questions.',href:'mailto:hello@empathy.studio'},
            {label:'Location',val:'Remote-first, based in the UK',sub:'We work with clients across Europe, the US, and beyond.'},
            {label:'Response time',val:'Within 24 hours',sub:'We read every message carefully before we reply. You\'ll never get an automated response.'},
          ].map(b=>(
            <div key={b.label} className={`reveal ${styles.infoBlock}`}>
              <div className={styles.infoLabel}>{b.label}</div>
              <div className={styles.infoVal}>{b.href?<a href={b.href}>{b.val}</a>:b.val}</div>
              <div className={styles.infoSub}>{b.sub}</div>
            </div>
          ))}

          <div className={`reveal ${styles.infoBlock}`}>
            <div className={styles.infoLabel}>Follow</div>
            <div className={styles.socials}>
              {[['Instagram','@empathy.studio'],['Twitter / X','@empathystudio'],['Dribbble','empathy-studio'],['LinkedIn','Empathy Studio']].map(([n,h])=>(
                <a key={n} href="#" className={styles.social}>
                  <span className={styles.socialName}>{n}</span>
                  <span className={styles.socialHandle}>{h}</span>
                  <span className={styles.socialArrow}>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className={`reveal ${styles.availBadge}`}>
            <span className={styles.availDot}/>
            Currently accepting projects
          </div>
        </div>

        {/* Form column */}
        <div className={styles.formCol}>
          {sent ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✦</div>
              <h2 className={styles.successHl}>Message sent.</h2>
              <p className={styles.successBody}>We'll get back to you within 24 hours with honest thoughts.</p>
            </div>
          ) : (
            <>
              <h2 className={`reveal ${styles.formHl}`}>Send us a <em>message.</em></h2>
              <div className={`reveal ${styles.formRow}`}>
                <div className={styles.fg}>
                  <label className={styles.fl}>First name</label>
                  <input type="text" className="form-input" placeholder="James"/>
                </div>
                <div className={styles.fg}>
                  <label className={styles.fl}>Last name</label>
                  <input type="text" className="form-input" placeholder="Wren"/>
                </div>
              </div>
              <div className={`reveal ${styles.fg}`}>
                <label className={styles.fl}>Email address</label>
                <input type="email" className="form-input" placeholder="james@aura.health"/>
              </div>
              <div className={`reveal ${styles.fg}`}>
                <label className={styles.fl}>Subject</label>
                <select className="form-select form-input" style={{appearance:'none'}}>
                  <option value="" disabled>Select a topic</option>
                  <option>New project enquiry</option>
                  <option>Existing project</option>
                  <option>Press / media</option>
                  <option>Just saying hello</option>
                </select>
              </div>
              <div className={`reveal ${styles.fg}`}>
                <label className={styles.fl}>Message</label>
                <textarea className="form-textarea form-input" style={{minHeight:130}} placeholder="Tell us what's on your mind."/>
              </div>
              <button className={`reveal btn-fill ${styles.sendBtn}`} onClick={()=>setSent(true)}>
                Send message ✦
              </button>
            </>
          )}
        </div>

        {/* Bottom art strip */}
        <div className={styles.artStrip}>
          <svg width="100%" height="100%" viewBox="0 0 800 120" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="60" x2="800" y2="60" stroke="rgba(212,180,114,.15)" strokeWidth="1"/>
            {[100,200,300,400,500,600,700].map(x=>(
              <circle key={x} cx={x} cy="60" r={x===400?8:4} fill={`rgba(212,180,114,${x===400?.4:.2})`}/>
            ))}
            <path d="M0,60 Q200,20 400,60 Q600,100 800,60" stroke="rgba(212,180,114,.1)" strokeWidth="1" fill="none"/>
            <path d="M0,60 Q200,100 400,60 Q600,20 800,60" stroke="rgba(212,180,114,.06)" strokeWidth="1" fill="none"/>
          </svg>
          <div className={styles.artQuote}>"Good work begins with a <em>good conversation.</em>"</div>
        </div>
      </div>
    </div>
  )
}
