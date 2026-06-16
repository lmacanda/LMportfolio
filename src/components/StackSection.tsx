import { useState } from 'react'
import styles from './StackSection.module.css'

const STACK = [
  'React', 'TypeScript', 'Next.js',
  'Mapbox GL', 'Three.js', 'Supabase',
  'OpenAI API', 'Python', 'Git',
]

const CERTS = [
  { label: 'Frontend Development', done: true },
  { label: 'Data Science', done: true },
  { label: 'AI Integration — in progress', done: false },
]

export default function StackSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <div className={styles.labelLine} />
        <span className={styles.labelText}>Stack</span>
      </div>

      <div className={styles.stackGrid}>
        {STACK.map((item, i) => (
          <div
            key={item}
            className={`${styles.stackItem} ${hovered === i ? styles.hovered : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === i && <span className={styles.cursorDot} aria-hidden="true" />}
            {item}
          </div>
        ))}
      </div>

      <div className={styles.certRow}>
        {CERTS.map(cert => (
          <div key={cert.label} className={styles.cert}>
            <span className={`${styles.certDot} ${!cert.done ? styles.wip : ''}`} />
            {cert.label}
          </div>
        ))}
      </div>
    </section>
  )
}