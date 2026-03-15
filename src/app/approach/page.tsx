'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './approach.module.css'

const PHASES = [
  { n:'01', cat:'Phase one', title:'Discover &\nDefine', tagline:'We can\'t design for a feeling we don\'t understand. Before anything gets made, we need to know what success actually looks like.', duration:'Typically 1–2 weeks',
    steps:[
      {t:'Stakeholder interviews',b:'We sit with your team and ask the questions most agencies skip. What are you afraid of? What does your best customer say about you?'},
      {t:'Audience research',b:'Who are we designing for, really? We go beyond demographics into psychographics — what do your users value, fear, aspire to?'},
      {t:'Competitive landscape',b:'Where is the gap in the market? We map the space to find the position that\'s both true to you and genuinely uncrowded.'},
      {t:'Creative brief sign-off',b:'This phase ends when we all agree in writing on what we\'re making and why. No brief, no design.'},
    ]},
  { n:'02', cat:'Phase two', title:'Strategise &\nFrame', tagline:'Research is raw material. Strategy is what turns it into direction. This is where we make the decisions that everything downstream depends on.', duration:'Typically 1–2 weeks',
    steps:[
      {t:'Brand positioning',b:'Where do you sit in your market? What\'s the single feeling you need to own? We define this with precision before anyone opens a design tool.'},
      {t:'Tone of voice',b:'How does the brand speak? We write tone guidelines with real examples — not adjectives, but actual sentences in the brand\'s voice.'},
      {t:'Visual direction',b:'Moodboards that show the emotional territory — not what the brand will look like, but what it needs to feel like.'},
      {t:'UX architecture',b:'For web projects: full site map, user flows, and wireframe skeleton. The logic of the experience, before the beauty of it.'},
    ]},
  { n:'03', cat:'Phase three', title:'Create &\nRefine', tagline:'This is where the studio goes deep. Design, motion, copy, code — all built with intent, reviewed with obsession.', duration:'Typically 3–5 weeks',
    steps:[
      {t:'Initial concepts',b:'We present 2 fully resolved concepts — not half-baked sketches. Each is shown in real-world context so you can judge it properly.'},
      {t:'Structured feedback rounds',b:'We use a feedback framework — not "I don\'t like it" but "this doesn\'t achieve X because Y." It keeps revision rounds fast.'},
      {t:'Motion & interaction design',b:'Every animation is specified, every interaction designed, before a line of code is written.'},
      {t:'Development',b:'Pixel-precise build. GSAP for animation, Lenis for scroll, Next.js for performance. QA\'d across 12 device/browser combinations.'},
    ]},
  { n:'04', cat:'Phase four', title:'Launch &\nBeyond', tagline:'Launch day is not the end. It\'s the beginning of the project\'s real life. We stay close through go-live.', duration:'Ongoing',
    steps:[
      {t:'Staged launch',b:'We don\'t flip a switch. We stage the launch, monitor for 48 hours, and stand by for any critical fixes.'},
      {t:'Asset handoff',b:'Complete brand asset libraries, font licenses, source Figma files, exported guidelines, and documented code.'},
      {t:'30-day check-in',b:'One month after launch we review analytics together and agree on any optimisations. Included in every project.'},
      {t:'Ongoing retainer',b:'Monthly retainer options for clients who want a long-term creative partner. From £2,000/month.'},
    ]},
]

const FAQS = [
  {q:'How long does a typical project take?',a:'Brand identity projects typically take 3–5 weeks. Full brand + web projects take 6–10 weeks. Complex builds with custom animation can take 10–14 weeks. Every project is scoped individually.'},
  {q:'Do you work with early-stage startups?',a:'Yes — some of our best work has been with founders at the very beginning, before they had product-market fit. We\'re comfortable working in ambiguity.'},
  {q:'What do you need from us to get started?',a:'A willingness to be honest about what\'s working and what isn\'t, some time for the discovery conversation, and a clear decision-maker on your side.'},
  {q:'Do you offer ongoing design retainers?',a:'Yes. After a project is complete, many clients move into a monthly retainer for ongoing design, development updates, and new campaign work. From £2,000/month.'},
  {q:'Can you work with our existing brand?',a:'Absolutely. We frequently work within established brand systems — building new pages, campaigns, or products that extend what already exists.'},
  {q:'What happens if we don\'t like the direction?',a:'That\'s what the strategy phase is for. If the creative direction is wrong, it means the brief was wrong — and we go back to the brief.'},
]

export default function ApproachPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = ref.current!
    gsap.fromTo(el.querySelector('.hero-eye'),{opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.35})
    el.querySelectorAll<HTMLElement>('.hero-ln').forEach((ln,i)=>{
      gsap.fromTo(ln,{y:'105%'},{y:'0%',duration:1.1,ease:'power4.out',delay:.4+i*.12})
    })
    gsap.to(el.querySelector('.hero-ghost'),{y:-60,ease:'none',scrollTrigger:{trigger:el.querySelector('.ap-hero'),start:'top top',end:'bottom top',scrub:1.2}})
    el.querySelectorAll<HTMLElement>('.reveal').forEach(r=>{
      gsap.fromTo(r,{opacity:0,y:22},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:r,start:'top 88%'}})
    })
    PHASES.forEach((_,i)=>{
      ScrollTrigger.create({
        trigger:`#phase${i}`,start:'top 55%',end:'bottom 55%',
        onEnter:()=>setActivePhase(i),onEnterBack:()=>setActivePhase(i),
      })
    })
  },[])

  return (
    <div ref={ref}>
      <section className={`ap-hero ${styles.hero}`}>
        <div className={styles.heroBg}/>
        <div className={`hero-ghost ${styles.ghost}`}>P</div>
        <p className={`hero-eye eyebrow ${styles.eyebrow}`}>How we work</p>
        <h1 className={styles.headline}>
          {['Process is just the','word we use for','<em>thinking.</em>'].map((ln,i)=>(
            <div key={i} className={styles.lnWrap}><span className={`hero-ln ${styles.ln}`} dangerouslySetInnerHTML={{__html:ln}}/></div>
          ))}
        </h1>
      </section>

      <section className={`reveal ${styles.intro}`}>
        <h2 className={styles.introHl}>We don't have a process. We have a <em>way of thinking</em> that produces one.</h2>
        <div className={styles.introBody}>
          <p>Every project is different. Every client has different needs, different timelines, different levels of ambiguity. A rigid process can't hold all of that.</p>
          <p>What we do have are four consistent phases — Discovery, Strategy, Creation, and Launch — that give every project a shape without giving it a straitjacket.</p>
        </div>
      </section>

      {/* Phase panels */}
      <div className={styles.phasesWrap}>
        <div className={styles.spineWrap}>
          <div className={styles.spineTrack}/>
          <div className={styles.spineFill} style={{height:`${activePhase/(PHASES.length-1)*100}%`}}/>
          {PHASES.map((_,i)=>(
            <div key={i} className={`${styles.spineDot} ${i<=activePhase?styles.dotActive:''}`} style={{top:`${i/(PHASES.length-1)*100}%`}}/>
          ))}
        </div>

        {PHASES.map((ph,i)=>(
          <div key={ph.n} id={`phase${i}`} className={styles.phasePanel}>
            <div className={styles.phaseLeft} style={{'--phase-i':i} as React.CSSProperties}>
              <div className={styles.phaseGhost}>{ph.n}</div>
              <p className="eyebrow" style={{marginBottom:14}}>{ph.cat}</p>
              <h2 className={styles.phaseTitle}>{ph.title.split('\n').map((l,j)=><span key={j}>{l}{j===0&&<br/>}</span>)}</h2>
              <p className={styles.phaseTagline}>{ph.tagline}</p>
              <div className={styles.phaseDur}><div className={styles.phaseDurLine}/>{ph.duration}</div>
            </div>
            <div className={styles.phaseRight}>
              {ph.steps.map(s=>(
                <div key={s.t} className={styles.phStep}>
                  <span className={styles.phStepDash}>—</span>
                  <div>
                    <div className={styles.phStepTitle}>{s.t}</div>
                    <div className={styles.phStepBody}>{s.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Principles */}
      <section className={styles.principles}>
        <h2 className={`reveal ${styles.prinHl}`}>What we believe<br/>about <em>good work.</em></h2>
        <div className={styles.prinGrid}>
          {[
            {t:'Understand before designing',b:'A beautiful solution to the wrong problem is still wrong. We spend more time in the research phase than most agencies.'},
            {t:'Restraint is a craft skill',b:'Adding things is easy. Removing things is hard. The most powerful designs we\'ve made all involved saying no to good ideas.'},
            {t:'Honesty before politeness',b:'We will tell you when something isn\'t working. Great creative relationships are built on productive disagreement.'},
            {t:'Details are the whole point',b:'The difference between good and extraordinary lives in the last 10% — the micro-interaction no one consciously notices.'},
          ].map(p=>(
            <div key={p.t} className={`reveal ${styles.prinCard}`}>
              <div className={styles.prinTitle}>{p.t}</div>
              <p className={styles.prinBody}>{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2 className={`reveal ${styles.faqHl}`}>Common <em>questions.</em></h2>
        {FAQS.map((f,i)=>(
          <div key={i} className={styles.faqItem}>
            <button className={styles.faqQ} onClick={()=>setOpenFaq(openFaq===i?null:i)}>
              {f.q}<span className={styles.faqIcon} style={{transform:openFaq===i?'rotate(45deg)':'none'}}>+</span>
            </button>
            <div className={styles.faqA} style={{maxHeight:openFaq===i?300:0}}>{f.a}</div>
          </div>
        ))}
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGlow}/>
        <p className={`eyebrow reveal`} style={{marginBottom:20}}>✦ Sound like a fit?</p>
        <h2 className={`reveal ${styles.ctaHl}`}>Tell us what you're<br/>building. We'll tell you <em>how we'd approach it.</em></h2>
        <Link href="/start" className={`reveal btn-fill`}>Start a project ↗</Link>
      </section>
    </div>
  )
}
