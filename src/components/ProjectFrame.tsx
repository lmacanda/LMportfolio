import { useEffect, useRef, useState } from 'react'
import styles from './ProjectFrame.module.css'

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

const PROJECTS = [
  {
    id: 'terroir',
    label: 'Terroir Urbano',
    year: '2024',
    index: '01',
    tags: ['Next.js', 'Mapbox GL', 'Supabase', 'TypeScript'],
    description: 'Geospatial editorial platform mapping natural wine bars and producers in Lisbon. Custom dark map style, audio interviews, category filtering and a bilingual interface.\n\nThe owner manages the map independently — adding pins, uploading audio and images — through a protected admin panel.',
    url: 'https://vinho-map.vercel.app',
    inProgress: false,
    coords: "38°43'N · 9°08'W",
    images: [
      'src/images/VinhoMap1.jpg',
      'src/images/VinhoMap2.jpg',
    ],
  },
  {
    id: 'base-pelo-comum',
    label: 'Base pelo Comum',
    year: '2025',
    index: '02',
    tags: ['Next.js 16', 'Sanity CMS', 'TypeScript', 'Vercel'],
    description: 'Editorial website for a Lisbon-based urban research association. Custom Sanity schema, bilingual content (PT/EN), embedded Studio, and fully responsive layout.\n\nBuilt for editors, not developers — content is managed entirely through Sanity without touching code. Currently in active development for the client.',
    url: 'https://base-pelo-comum.vercel.app/',
    inProgress: true,
    coords: "38°43'N · 9°08'W",
    images: [
      'src/images/BPC1.jpg',
      'src/images/BPC2.jpg',
    ],
  },
]

interface ProjectRowProps {
  project: typeof PROJECTS[number]
  flip?: boolean
}

function ProjectRow({ project, flip = false }: ProjectRowProps) {
  const [slide, setSlide] = useState(0)
  const images = project.images

  return (
    <div className={`${styles.projectRow} ${flip ? styles.projectRowFlip : ''}`}>
      {/* ── Text side ── */}
      <div className={styles.textSide}>
        <div className={styles.projectMeta}>
          <span className={styles.projectIndex}>{project.index}</span>
          <span className={styles.projectYear}>{project.year}</span>
        </div>
        <h2 className={styles.projectTitle}>{project.label}</h2>
        <div className={styles.projectTags}>
          {project.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
        <p className={styles.projectDesc}>{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.projectLink}
        >
          View live →
        </a>
      </div>

      {/* ── Image side ── */}
      <div className={styles.imageSide}>
        <CornerDetail />

        <div className={styles.mapFrame}>
          <div className={styles.screenshotTrack}>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${project.label} screenshot ${i + 1}`}
                className={`${styles.screenshot} ${i === slide ? styles.screenshotActive : ''}`}
              />
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.slideBtn} ${styles.slideBtnPrev}`}
                onClick={() => setSlide(s => (s - 1 + images.length) % images.length)}
                aria-label="Previous screenshot"
              >‹</button>
              <button
                className={`${styles.slideBtn} ${styles.slideBtnNext}`}
                onClick={() => setSlide(s => (s + 1) % images.length)}
                aria-label="Next screenshot"
              >›</button>

              <div className={styles.slideDots}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.slideDot} ${i === slide ? styles.slideDotActive : ''}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className={styles.coordLabel}>{project.coords}</div>

          {project.inProgress && (
            <span className={styles.viewBtn} style={{ opacity: 0.35, cursor: 'default' }}>
              In progress
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectFrame() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span className={styles.labelText}>Projects</span>
        <div className={styles.labelLine} />
      </div>

      <div className={styles.projectList}>
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} flip={i % 2 !== 0} />
        ))}
      </div>
    </section>
  )
}