import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'
import { useLang } from '../context/LangContext'

function SparklingLink() {
  const { lang } = useLang()
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const link = linkRef.current
    if (!link) return

    let frame: number
    let t = 0

    const sparks = Array.from({ length: 4 }, () => {
      const el = document.createElement('span')
      el.className = styles.spark
      link.appendChild(el)
      return el
    })

    function animate() {
      t += 0.03
      sparks.forEach((spark, i) => {
        const angle = (t + i * (Math.PI / 2)) % (Math.PI * 2)
        const rx = link!.offsetWidth / 2 + 6
        const ry = link!.offsetHeight / 2 + 6
        const cx = link!.offsetWidth / 2
        const cy = link!.offsetHeight / 2
        const x = cx + Math.cos(angle) * rx
        const y = cy + Math.sin(angle) * ry
        const pulse = Math.sin(t * 2 + i) * 0.5 + 0.5
        spark.style.left = `${x - 1.5}px`
        spark.style.top = `${y - 1.5}px`
        spark.style.opacity = String(pulse * 0.8)
        spark.style.transform = `scale(${0.5 + pulse * 0.8})`
      })
      frame = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(frame)
      sparks.forEach(s => s.remove())
    }
  }, [])

  return (
    <div className={styles.secretWrap}>
      <a
        ref={linkRef}
        href="https://three-js-portfolio-kohl.vercel.app/"
        className={styles.secretLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: 'relative', display: 'inline-block' }}
      >
        ↳ enter the room
      </a>

      {/* Visible under 640px only — see .secretNote in Nav.module.css */}
      <span className={styles.secretNote}>
        {lang === 'EN'
          ? 'better experience on laptop'
          : 'melhor experiência em computador'}
      </span>
    </div>
  )
}

export default function Nav() {
  const { lang, setLang } = useLang()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>LM</div>

      <div className={styles.navRight}>
        <SparklingLink />

        <div className={styles.langToggle}>
          <button
            className={`${styles.lang} ${lang === 'EN' ? styles.active : ''}`}
            onClick={() => setLang('EN')}
          >
            EN
          </button>
          <span className={styles.sep}>/</span>
          <button
            className={`${styles.lang} ${lang === 'PT' ? styles.active : ''}`}
            onClick={() => setLang('PT')}
          >
            PT
          </button>
        </div>
      </div>
    </nav>
  )
}