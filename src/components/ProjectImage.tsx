import { useEffect, useRef, useState } from 'react'
import styles from './ProjectFrame.module.css'
import { useLang } from '../context/LangContext'
import type { Project } from './ProjectFrame'

interface Dot { x: number; y: number; vx: number; vy: number; r: number; o: number; color: string }

function CornerDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const colors = ['rgba(0,229,160,', 'rgba(155,79,150,']
    dotsRef.current = Array.from({ length: 7 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1.5,
      o: Math.random() * 0.5 + 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const dots = dotsRef.current
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `${d.color}${d.o})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

const GRID_SIZE = 22
const COLS = 5
const ROWS = 4

function CornerDetail() {
  const w = COLS * GRID_SIZE
  const h = ROWS * GRID_SIZE
  return (
    <div className={styles.cornerDetail} style={{ width: w, height: h }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 160"
        preserveAspectRatio="xMaxYMin meet"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="cFade" cx="100%" cy="0%" r="90%">
            <stop offset="0%"   stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
          <mask id="cMask">
            <rect width="200" height="160" fill="url(#cFade)" />
          </mask>
        </defs>

        <g mask="url(#cMask)">
          <line x1="188" y1="0"  x2="191" y2="72"  stroke="rgba(0,229,160,0.55)" strokeWidth="0.5" />
          <line x1="164" y1="0"  x2="166" y2="96"  stroke="rgba(0,229,160,0.5)"  strokeWidth="0.5" />
          <line x1="139" y1="0"  x2="140" y2="117" stroke="rgba(0,229,160,0.45)" strokeWidth="0.5" />
          <line x1="112" y1="14" x2="112" y2="138" stroke="rgba(0,229,160,0.4)"  strokeWidth="0.5" />
          <line x1="89"  y1="0"  x2="88"  y2="160" stroke="rgba(0,229,160,0.4)"  strokeWidth="0.5" />
          <line x1="63"  y1="32" x2="61"  y2="160" stroke="rgba(0,229,160,0.35)" strokeWidth="0.5" />
          <line x1="42"  y1="51" x2="38"  y2="160" stroke="rgba(0,229,160,0.3)"  strokeWidth="0.5" />
          <line x1="18"  y1="72" x2="12"  y2="160" stroke="rgba(0,229,160,0.2)"  strokeWidth="0.5" />

          <line x1="112" y1="11"  x2="200" y2="8"   stroke="rgba(0,229,160,0.55)" strokeWidth="0.5" />
          <line x1="63"  y1="32"  x2="200" y2="30"  stroke="rgba(0,229,160,0.5)"  strokeWidth="0.5" />
          <line x1="42"  y1="50"  x2="200" y2="49"  stroke="rgba(0,229,160,0.45)" strokeWidth="0.5" />
          <line x1="18"  y1="72"  x2="200" y2="72"  stroke="rgba(0,229,160,0.4)"  strokeWidth="0.5" />
          <line x1="0"   y1="96"  x2="164" y2="97"  stroke="rgba(0,229,160,0.3)"  strokeWidth="0.5" />
          <line x1="0"   y1="117" x2="112" y2="119" stroke="rgba(0,229,160,0.22)" strokeWidth="0.5" />
          <line x1="0"   y1="138" x2="63"  y2="141" stroke="rgba(0,229,160,0.15)" strokeWidth="0.5" />

          <line x1="139" y1="0"  x2="200" y2="44"  stroke="rgba(155,79,150,0.22)" strokeWidth="0.5" />
          <line x1="89"  y1="11" x2="200" y2="85"  stroke="rgba(155,79,150,0.16)" strokeWidth="0.5" />
          <line x1="18"  y1="72" x2="89"  y2="160" stroke="rgba(155,79,150,0.1)"  strokeWidth="0.5" />

          <circle cx="188" cy="11"  r="1.2" fill="rgba(0,229,160,0.9)"  />
          <circle cx="164" cy="11"  r="1.5" fill="rgba(0,229,160,0.85)" />
          <circle cx="164" cy="32"  r="1.2" fill="rgba(0,229,160,0.8)"  />
          <circle cx="139" cy="32"  r="1.8" fill="rgba(0,229,160,0.85)" />
          <circle cx="139" cy="50"  r="1.2" fill="rgba(0,229,160,0.7)"  />
          <circle cx="112" cy="50"  r="1.5" fill="rgba(0,229,160,0.65)" />
          <circle cx="112" cy="72"  r="1.2" fill="rgba(0,229,160,0.6)"  />
          <circle cx="89"  cy="32"  r="1.2" fill="rgba(0,229,160,0.55)" />
          <circle cx="89"  cy="72"  r="1.5" fill="rgba(0,229,160,0.5)"  />
          <circle cx="63"  cy="72"  r="1.2" fill="rgba(0,229,160,0.4)"  />
          <circle cx="63"  cy="96"  r="1.5" fill="rgba(0,229,160,0.35)" />
          <circle cx="42"  cy="96"  r="1.2" fill="rgba(0,229,160,0.3)"  />

          <circle cx="139" cy="11"  r="1.5" fill="rgba(155,79,150,0.8)"  />
          <circle cx="112" cy="32"  r="1.2" fill="rgba(155,79,150,0.6)"  />
          <circle cx="89"  cy="50"  r="1.5" fill="rgba(155,79,150,0.5)"  />
          <circle cx="63"  cy="117" r="1.0" fill="rgba(155,79,150,0.3)"  />

          <circle cx="152" cy="22"  r="0.8" fill="rgba(0,229,160,0.4)"   />
          <circle cx="101" cy="61"  r="0.8" fill="rgba(0,229,160,0.3)"   />
          <circle cx="175" cy="58"  r="0.8" fill="rgba(0,229,160,0.25)"  />
          <circle cx="78"  cy="108" r="0.8" fill="rgba(155,79,150,0.25)" />
        </g>
      </svg>

      <CornerDots />
    </div>
  )
}

interface ProjectImageProps {
  project: Project
}

export default function ProjectImage({ project }: ProjectImageProps) {
  const { lang } = useLang()
  const images = project.images
  const [index, setIndex] = useState(0)
  const hasMultiple = images.length > 1

  const handleClick = () => {
    if (!project.url) return
    window.open(project.url, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!project.url) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i - 1 + images.length) % images.length)
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i + 1) % images.length)
  }

  const goTo = (e: React.MouseEvent, i: number) => {
    e.stopPropagation()
    setIndex(i)
  }

  return (
    <div className={styles.imageSide}>
      <CornerDetail />

      <div
        className={styles.carousel}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={project.url ? 'link' : undefined}
        tabIndex={project.url ? 0 : undefined}
        aria-label={project.url ? `${project.label} — ${lang === 'EN' ? 'view live' : 'ver projeto'}` : undefined}
        style={{ cursor: project.url ? 'pointer' : 'default' }}
      >
        {images.map((src, i) => {
          const isActive = i === index
          return (
            <div
              key={src}
              className={`${styles.carouselSlide} ${isActive ? styles.carouselSlideActive : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={src}
                alt={`${project.label} screenshot ${i + 1}`}
                className={styles.carouselImg}
              />
            </div>
          )
        })}

        {hasMultiple && (
          <>
            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.arrowPrev}`}
              onClick={goPrev}
              aria-label={lang === 'EN' ? 'Previous image' : 'Imagem anterior'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.carouselArrow} ${styles.arrowNext}`}
              onClick={goNext}
              aria-label={lang === 'EN' ? 'Next image' : 'Próxima imagem'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className={styles.carouselDots}>
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                  onClick={(e) => goTo(e, i)}
                  aria-label={`${lang === 'EN' ? 'Go to image' : 'Ir para imagem'} ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.stackFooter}>
        <span className={styles.coordLabel}>{project.coords}</span>
        {project.inProgress && (
          <span className={styles.viewBtn} style={{ opacity: 0.6, cursor: 'default' }}>
            {lang === 'EN' ? 'In progress' : 'Em desenvolvimento'}
          </span>
        )}
      </div>
    </div>
  )
}