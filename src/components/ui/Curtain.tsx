'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/work': 'Work',
  '/approach': 'Approach',
  '/journal': 'Journal',
  '/contact': 'Contact',
  '/start': "Let's go",
  '/showcase': 'Showcase',
  '/privacy': 'Privacy',
  '/disclaimer': 'Disclaimer',
  '/cancellation': 'Cancellation',
}

export default function Curtain() {
  const curtainRef = useRef<HTMLDivElement | null>(null)
  const wordRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    const curtain = curtainRef.current
    const word = wordRef.current

    if (!curtain || !word) return

    const tl = gsap.timeline()

    const disablePointer = () => {
      gsap.set(curtain, { pointerEvents: 'none' })
    }

    if (isFirst.current) {
      isFirst.current = false

      gsap.set(curtain, {
        clipPath: 'inset(0% 0 0% 0)',
        pointerEvents: 'none',
      })

      tl.to(word, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
      }).to(
        curtain,
        {
          clipPath: 'inset(0% 0 100% 0)',
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: disablePointer,
        },
        '-=0.1'
      )

      return
    }

    const label = PAGE_LABELS[pathname] ?? ''
    word.textContent = label

    tl.set(curtain, {
      clipPath: 'inset(0% 0 100% 0)',
      pointerEvents: 'all',
    })
      .to(curtain, {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 0.65,
        ease: 'power3.inOut',
      })
      .fromTo(
        word,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      )
      .to(
        word,
        { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' },
        '+=0.15'
      )
      .to(
        curtain,
        {
          clipPath: 'inset(0% 0 100% 0)',
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: disablePointer,
        },
        '-=0.1'
      )
  }, [pathname])

  return (
    <div ref={curtainRef} className="curtain">
      <div ref={wordRef} className="curtain-word" />
    </div>
  )
}