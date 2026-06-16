import { useEffect, useRef } from 'react'
import styles from './DotsStrip.module.css'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  o: number
  rgb: string
}

export default function DotsStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0

    function resize() {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      initDots()
    }

function initDots() {
  const n = Math.floor(W / 16)
  dotsRef.current = Array.from({ length: n }, (_, i) => {
    const isMint = i < n / 2
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: isMint
        ? (Math.random() - 0.5) * 0.18
        : (Math.random() - 0.5) * 0.55,
      vy: isMint
        ? (Math.random() - 0.5) * 0.18
        : (Math.random() - 0.5) * 0.55,
      r: Math.random() * 1.6 + 0.5,
      o: Math.random() * 0.28 + 0.08,
      rgb: isMint ? '0,229,160' : '155,79,150',
    }
  })
}
    

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const dots = dotsRef.current

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
d.x += d.vx
d.y += d.vy
if (d.x < 0 || d.x > W) d.vx *= -1
if (d.y < 0 || d.y > H) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.rgb},${d.o})`
        ctx.fill()

        for (let j = i + 1; j < dots.length; j++) {
  const d2 = dots[j]
  if (d2.rgb !== d.rgb) continue          // ← skip cross-color connections
  const dist = Math.hypot(d.x - d2.x, d.y - d2.y)
  if (dist < 100) {
    ctx.beginPath()
    ctx.moveTo(d.x, d.y)
    ctx.lineTo(d2.x, d2.y)
    ctx.strokeStyle = `rgba(${d.rgb},${0.05 * (1 - dist / 100)})`
    ctx.lineWidth = 5 * (1 - dist / 100)
    ctx.stroke()
  }
}
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div className={styles.strip}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}