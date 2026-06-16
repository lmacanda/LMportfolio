import styles from './Nav.module.css'
import { useLang } from '../context/LangContext'

export default function Nav() {
  const { lang, setLang } = useLang()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>LM</div>
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
    </nav>
  )
}