import { useEffect, useRef } from 'react'
import styles from './Footer.module.css'

function SparklingLink() {
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
  )
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>LM</div>

      <div className={styles.links}>
        <a
          href="https://github.com/lmacanda"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/lauramacandapantano/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
        <a href="mailto:laura.pantano2@gmail.com" className={styles.link}>
          laura.pantano2@gmail.com
        </a>
      </div>

      <div className={styles.right}>
        <SparklingLink />
        <span className={styles.copy}>© 2026 LMacanda</span>
      </div>
    </footer>
  )
}