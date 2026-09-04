import styles from './Footer.module.css'

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
        <span className={styles.copy}>© 2026 LMacanda</span>
      </div>
    </footer>
  )
}