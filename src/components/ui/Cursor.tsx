'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    gsap.set(dot,  { xPercent: -50, yPercent: -50 })
    gsap.set(ring, { xPercent: -50, yPercent: -50 })

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' })
    }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      gsap.set(ring, { x: rx, y: ry })
      requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    loop()

    // Expand ring on interactive elements
    const enter = () => {
      gsap.to(ring, { width: 58, height: 58, borderColor: 'rgba(212,180,114,.6)', duration: 0.3 })
      gsap.to(dot,  { width: 3,  height: 3,  duration: 0.3 })
    }
    const leave = () => {
      gsap.to(ring, { width: 38, height: 38, borderColor: 'rgba(212,180,114,.45)', duration: 0.3 })
      gsap.to(dot,  { width: 6,  height: 6,  duration: 0.3 })
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    addListeners()

    // Re-bind after route changes
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
