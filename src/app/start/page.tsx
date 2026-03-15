'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './start.module.css'

const SERVICES = [
  {val:'branding',icon:'◎',name:'Brand Identity',desc:'Logo, color, type, guidelines'},
  {val:'web',icon:'⬡',name:'Web Design',desc:'Design + development'},
  {val:'uiux',icon:'△',name:'UI / UX Design',desc:'Apps, dashboards, products'},
  {val:'motion',icon:'◈',name:'3D & Motion',desc:'Animation, renders, film'},
  {val:'graphic',icon:'□',name:'Graphic Design',desc:'Campaign, print, editorial'},
  {val:'all',icon:'✦',name:'Full Studio',desc:'Brand + web + motion'},
]
const BUDGETS = [
  {val:'starter',  label:'Starter',    range:'Under £3,000'},
  {val:'mid',      label:'Mid-range',  range:'£3,000 – £8,000'},
  {val:'studio',   label:'Studio',     range:'£8,000 – £20,000'},
  {val:'enterprise',label:'Enterprise',range:'£20,000+'},
  {val:'unknown',  label:'Not sure',   range:'Let\'s talk'},
]

export default function StartPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep]         = useState(1)
  const [services, setServices] = useState<string[]>([])
  const [budget, setBudget]     = useState('')
  const [done, setDone]         = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current!.querySelector('.start-hl'), {opacity:0,y:24},{opacity:1,y:0,duration:.9,delay:.4,ease:'power3.out'})
    gsap.fromTo(ref.current!.querySelector('.start-sub'), {opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.6})
    gsap.fromTo(ref.current!.querySelector('.start-promises'), {opacity:0,y:16},{opacity:1,y:0,duration:.7,delay:.8})
    gsap.fromTo(ref.current!.querySelector('.form-progress'), {opacity:0,y:12},{opacity:1,y:0,duration:.6,delay:.5})
  }, [])

  const toggleService = (val: string) =>
    setServices(s => s.includes(val) ? s.filter(x=>x!==val) : [...s,val])

  const progress = ((step-1)/3)*100

  return (
    <div ref={ref} className={styles.wrap}>
      {/* Left panel */}
      <div className={styles.left}>
        <div className={styles.leftBg}/>
        <div className={styles.leftArt}>
          <svg viewBox="0 0 400 400" fill="none">
            {[180,130,80,35].map((r,i)=>(
              <circle key={r} cx="200" cy="200" r={r} stroke={`rgba(212,180,114,${.06+i*.03})`} strokeWidth="1"/>
            ))}
            <circle cx="200" cy="200" r="35" fill="rgba(212,180,114,.08)" stroke="rgba(212,180,114,.2)" strokeWidth="1"/>
            <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(212,180,114,.04)" strokeWidth="1"/>
            <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(212,180,114,.04)" strokeWidth="1"/>
            <circle cx="200" cy="20" r="5" fill="rgba(212,180,114,.4)">
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="14s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <div className={styles.leftContent}>
          <h1 className={`start-hl ${styles.startHl}`}>Let's build something<br/><em>worth feeling.</em></h1>
          <p className={`start-sub ${styles.startSub}`}>Tell us about your project. We'll get back to you within 24 hours with honest thoughts on how we'd approach it.</p>
        </div>
        <div className={`start-promises ${styles.promises}`}>
          {['Response within 24 hours','No obligation, no pressure','Honest advice, even if we\'re not the right fit','Fixed pricing, agreed upfront'].map(p=>(
            <div key={p} className={styles.promise}><span className={styles.promiseDot}/>{p}</div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.right}>
        {done ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✦</div>
            <h2 className={styles.successHl}>We've got<br/>your <em>note.</em></h2>
            <p className={styles.successBody}>Thank you for reaching out. We read every enquiry carefully and will get back to you within 24 hours.</p>
            <Link href="/work" className="btn-fill" style={{marginTop:8}}>See our work ↗</Link>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className={`form-progress ${styles.progress}`}>
              {[{n:1,l:'Services'},{n:2,l:'Budget'},{n:3,l:'Details'},{n:4,l:'Contact'}].map((s,i)=>(
                <div key={s.n} className={styles.progressSteps}>
                  {i>0&&<div className={`${styles.progressLine} ${step>i?styles.lineDone:''}`}/>}
                  <div className={`${styles.progressStep} ${step===s.n?styles.stepActive:''} ${step>s.n?styles.stepDone:''}`}>
                    <div className={styles.stepNum}>{s.n}</div>
                    <span>{s.l}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {step===1&&(
              <div className={styles.stepContent}>
                <p className={`eyebrow ${styles.stepEye}`}>Step 01</p>
                <h2 className={styles.stepHl}>What are you<br/>looking for <em>help with?</em></h2>
                <div className={styles.selGrid}>
                  {SERVICES.map(s=>(
                    <div key={s.val} className={`${styles.selCard} ${services.includes(s.val)?styles.selActive:''}`} onClick={()=>toggleService(s.val)}>
                      <span className={styles.selIcon}>{s.icon}</span>
                      <div className={styles.selName}>{s.name}</div>
                      <div className={styles.selDesc}>{s.desc}</div>
                      {services.includes(s.val)&&<div className={styles.selCheck}>✓</div>}
                    </div>
                  ))}
                </div>
                <div className={styles.stepNav}>
                  <span className={styles.stepCount}>01 / 04</span>
                  <button className="btn-fill" onClick={()=>setStep(2)}>Next ↗</button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step===2&&(
              <div className={styles.stepContent}>
                <p className={`eyebrow ${styles.stepEye}`}>Step 02</p>
                <h2 className={styles.stepHl}>What's your<br/>approximate <em>budget?</em></h2>
                <div className={styles.budgetList}>
                  {BUDGETS.map(b=>(
                    <div key={b.val} className={`${styles.budgetOpt} ${budget===b.val?styles.budgetActive:''}`} onClick={()=>setBudget(b.val)}>
                      <div><div className={styles.budgetLabel}>{b.label}</div><div className={styles.budgetRange}>{b.range}</div></div>
                      <div className={`${styles.budgetDot} ${budget===b.val?styles.dotGold:''}`}/>
                    </div>
                  ))}
                </div>
                <div className={styles.stepNav}>
                  <button className={styles.btnBack} onClick={()=>setStep(1)}>← Back</button>
                  <span className={styles.stepCount}>02 / 04</span>
                  <button className="btn-fill" onClick={()=>setStep(3)}>Next ↗</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step===3&&(
              <div className={styles.stepContent}>
                <p className={`eyebrow ${styles.stepEye}`}>Step 03</p>
                <h2 className={styles.stepHl}>Tell us about<br/>your <em>project.</em></h2>
                <div className={styles.fg}><label className={styles.fl}>Company / Project name</label><input type="text" className="form-input" placeholder="Aura Health"/></div>
                <div className={styles.fg}><label className={styles.fl}>What are you building?</label><textarea className="form-textarea form-input" style={{minHeight:100}} placeholder="Tell us what you're making, who it's for, and why now."/></div>
                <div className={styles.fg}><label className={styles.fl}>Timeline</label><input type="text" className="form-input" placeholder="e.g. Launch in June 2025"/></div>
                <div className={styles.stepNav}>
                  <button className={styles.btnBack} onClick={()=>setStep(2)}>← Back</button>
                  <span className={styles.stepCount}>03 / 04</span>
                  <button className="btn-fill" onClick={()=>setStep(4)}>Next ↗</button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step===4&&(
              <div className={styles.stepContent}>
                <p className={`eyebrow ${styles.stepEye}`}>Step 04</p>
                <h2 className={styles.stepHl}>Last step —<br/><em>how do we reach you?</em></h2>
                <div className={styles.formRow}>
                  <div className={styles.fg}><label className={styles.fl}>First name</label><input type="text" className="form-input" placeholder="James"/></div>
                  <div className={styles.fg}><label className={styles.fl}>Last name</label><input type="text" className="form-input" placeholder="Wren"/></div>
                </div>
                <div className={styles.fg}><label className={styles.fl}>Email address</label><input type="email" className="form-input" placeholder="james@aura.health"/></div>
                <div className={styles.fg}><label className={styles.fl}>How did you find us?</label><input type="text" className="form-input" placeholder="Awwwards, referral, Instagram..."/></div>
                <div className={styles.stepNav}>
                  <button className={styles.btnBack} onClick={()=>setStep(3)}>← Back</button>
                  <span className={styles.stepCount}>04 / 04</span>
                  <button className="btn-fill" onClick={()=>setDone(true)}>Send enquiry ✦</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
