'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './OrbCanvas.module.css'

export default function OrbCanvas() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current!
    const canvas = canvasRef.current!
    const dpr    = Math.min(devicePixelRatio || 1, 2)

    // Guard: wait until the element has real dimensions
    const S = wrap.offsetWidth || 600
    if (!S || S <= 0) return

    canvas.width  = S * dpr
    canvas.height = S * dpr

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const cx = S / 2, cy = S / 2, R = S * 0.43

    let hmx = cx - R * 0.15, hmy = cy - R * 0.25

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      if (!r.width || !r.height) return
      hmx = (e.clientX - r.left) * (S / r.width)
      hmy = (e.clientY - r.top)  * (S / r.height)
    }
    window.addEventListener('mousemove', onMove)

    // fBm noise
    const h  = (n: number) => (Math.abs(Math.sin(n * 127.1 + 311.7) * 43758.5453)) % 1
    const n2 = (x: number, y: number) => {
      const ix = Math.floor(x), iy = Math.floor(y)
      const fx = x - ix, fy = y - iy
      const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
      return h(ix + iy * 57)               * (1 - ux) * (1 - uy)
           + h(ix + 1 + iy * 57)           * ux       * (1 - uy)
           + h(ix + (iy + 1) * 57)         * (1 - ux) * uy
           + h(ix + 1 + (iy + 1) * 57)     * ux       * uy
    }
    const fbm = (x: number, y: number) => {
      let v = 0, a = 0.5, f = 1
      for (let i = 0; i < 4; i++) {
        v += n2(x * f + i * 3.7, y * f + i * 2.3) * a
        a *= 0.5; f *= 2.1
      }
      return v
    }

    const NP = 160
    let t = 0
    let raf: number

    const draw = () => {
      // Guard: skip frame if dimensions are invalid
      if (!S || !isFinite(cx) || !isFinite(cy) || !isFinite(R) || R <= 0) {
        raf = requestAnimationFrame(draw)
        return
      }

      t += 0.005
      ctx.clearRect(0, 0, S, S)

      // outer glow halo
      const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.55)
      halo.addColorStop(0,   'rgba(200,155,60,.12)')
      halo.addColorStop(0.6, 'rgba(150,100,20,.05)')
      halo.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, S, S)

      // morphing blob
      const pts: { x: number; y: number }[] = []
      for (let i = 0; i < NP; i++) {
        const a  = (i / NP) * Math.PI * 2
        const nx = Math.cos(a) * 1.3 + t * 0.8
        const ny = Math.sin(a) * 1.3 + t * 0.6
        const d  = R * (0.86 + fbm(nx, ny) * 0.2)
        pts.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d })
      }

      ctx.beginPath()
      ctx.moveTo((pts[0].x + pts[NP - 1].x) / 2, (pts[0].y + pts[NP - 1].y) / 2)
      for (let i = 0; i < NP; i++) {
        const c  = pts[i]
        const nx = pts[(i + 1) % NP]
        ctx.quadraticCurveTo(c.x, c.y, (c.x + nx.x) / 2, (c.y + nx.y) / 2)
      }
      ctx.closePath()
      ctx.save()
      ctx.clip()

      // base fill
      ctx.fillStyle = '#0b0805'
      ctx.fillRect(0, 0, S, S)

      // animated lava blobs
      const blobs: [number,number,number,number,number,number,string][] = [
        [.9,  .7,  .36, .28, .72, .55, 'rgba(175,108,18,.6)' ],
        [.65, .85, 1.3, .24, .3,  .60, 'rgba(215,148,38,.5)' ],
        [1.1, .55, 2.6, .20, .32, .48, 'rgba(130,55,8,.55)'  ],
        [.7,  .95, 4.1, .26, .18, .42, 'rgba(235,185,65,.38)'],
        [.45, 1.15,3.4, .16, .30, .36, 'rgba(255,210,95,.28)'],
      ]
      blobs.forEach(([f1, f2, ph, rx2, ry2, r2, c0]) => {
        const ox = Math.sin(t * f1 + ph) * R * rx2
        const oy = Math.cos(t * f2 + ph) * R * ry2
        const bx = cx + ox, by = cy + oy
        if (!isFinite(bx) || !isFinite(by) || !isFinite(R * r2)) return
        const g  = ctx.createRadialGradient(bx, by, 0, bx, by, R * r2)
        g.addColorStop(0, c0)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, S, S)
      })

      // mouse highlight
      const hx = cx + (hmx - cx) * 0.38
      const hy = cy + (hmy - cy) * 0.38
      if (isFinite(hx) && isFinite(hy) && isFinite(R * 0.65)) {
        const mg = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.65)
        mg.addColorStop(0,    'rgba(255,235,150,.20)')
        mg.addColorStop(0.55, 'rgba(220,170,60,.07)')
        mg.addColorStop(1,    'rgba(0,0,0,0)')
        ctx.fillStyle = mg
        ctx.fillRect(0, 0, S, S)

        // specular
        const sx = hx - R * .16, sy = hy - R * .16
        if (isFinite(sx) && isFinite(sy) && isFinite(R * .25)) {
          const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * .25)
          sg.addColorStop(0,   'rgba(255,248,215,.5)')
          sg.addColorStop(0.4, 'rgba(255,220,110,.12)')
          sg.addColorStop(1,   'rgba(0,0,0,0)')
          ctx.fillStyle = sg
          ctx.fillRect(0, 0, S, S)
        }
      }

      ctx.restore()

      // rim vignette
      if (isFinite(R * 0.5) && isFinite(R * 1.02)) {
        const rim = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.02)
        rim.addColorStop(0,    'rgba(0,0,0,0)')
        rim.addColorStop(0.68, 'rgba(0,0,0,0)')
        rim.addColorStop(1,    'rgba(0,0,0,.88)')
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2)
        ctx.fillStyle = rim
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    // Fade in after first frame
    gsap.fromTo(wrap, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power2.inOut', delay: 1.2 })
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
