import styles from './ProjectFrame.module.css'
import { useLang } from '../context/LangContext'
import ProjectImage from './ProjectImage'

const PROJECTS = [
  {
    id: 'terroir',
    label: 'Terroir Urbano',
    year: '2024',
    index: '01',
    tags: ['Next.js', 'Mapbox GL', 'Supabase', 'TypeScript'],
    description: {
      EN: 'Geospatial editorial platform mapping natural wine bars and producers in Lisbon. Custom dark map style, audio interviews, category filtering and a bilingual interface.\n\nThe owner manages the map independently — adding pins, uploading audio and images — through a protected admin panel.',
      PT: 'Plataforma editorial geoespacial que mapeia adegas naturais e produtores em Lisboa. Estilo de mapa escuro personalizado, entrevistas em áudio, filtragem por categoria e interface bilingue.\n\nO proprietário gere o mapa de forma autónoma — adicionando pins, carregando áudio e imagens — através de um painel de administração protegido.',
    },
    url: 'https://vinho-map.vercel.app',
    inProgress: true,
    coords: "38°43'N · 9°08'W",
    images: [
      '/images/VinhoMap1.jpg',
      '/images/VinhoMap2.jpg',
    ],
  },
  {
    id: 'base-pelo-comum',
    label: 'Base pelo Comum',
    year: '2026',
    index: '02',
    tags: ['Next.js 16', 'Sanity CMS', 'TypeScript', 'Vercel'],
    description: {
      EN: 'Editorial website for a Lisbon-based urban research association. Custom Sanity schema, bilingual content (PT/EN), embedded Studio, and fully responsive layout.\n\nBuilt for editors, not developers — content is managed entirely through Sanity without touching code. Currently in active development for the client.',
      PT: 'Website editorial para uma associação de investigação urbana com sede em Lisboa. Schema Sanity personalizado, conteúdo bilingue (PT/EN), Studio incorporado e layout totalmente responsivo.\n\nConstruído para editores, não para programadores — o conteúdo é gerido inteiramente através do Sanity sem tocar no código. Atualmente em desenvolvimento ativo para o cliente.',
    },
    url: 'https://base-pelo-comum.vercel.app/',
    inProgress: true,
    coords: "38°43'N · 9°08'W",
    images: [
      '/images/BPC1.jpg',
      '/images/BPC2.jpg',
      '/images/BPC3.jpg',
    ],
  },
  {
    id: 'dams-dashboard',
    label: 'DAMS Dashboard',
    year: '2026',
    index: '03',
    tags: ['Next.js', 'TypeScript', 'Mapbox GL', 'Recharts', 'Vercel'],
    description: {
      EN: 'Live map of Portugal\'s hydroelectric dams, paired with the national generation mix and a year-by-year historical reveal. Combines three independent real-world sources, a government shapefile, a live utility API, and respectfully rate-limited scraping of dam records, into one coherent, honestly-caveated story.',
      PT: 'Mapa interativo das barragens hidroelétricas de Portugal, combinado com a matriz energética nacional e uma reconstituição histórica ano a ano. Cruza três fontes de dados reais e independentes. Um shapefile de dados abertos do governo, uma API pública do operador da rede elétrica nacional e a recolha de dados de barragens, respeitando as regras de acesso do site de origem',
    },
    url: 'https://portugal-renewables.vercel.app/',
    inProgress: false,
    coords: "38°43'N · 9°08'W",
    images: [
      '/images/dams.jpg',
    ],
  },
]

export type Project = typeof PROJECTS[number]

/* ── Text side ── */
interface ProjectTextProps {
  project: Project
}

function ProjectText({ project }: ProjectTextProps) {
  const { lang } = useLang()

  return (
    <div className={styles.textSide}>
      <div className={styles.projectMeta}>
        <span className={styles.projectIndex}>{project.index}</span>
        <span className={styles.projectYear}>{project.year}</span>
      </div>
      <h2 className={styles.projectTitle}>{project.label}</h2>
      <div className={styles.projectTags}>
        {project.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
      </div>
      <p className={styles.projectDesc}>{project.description[lang]}</p>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
      >
        {lang === 'EN' ? 'View live →' : 'Ver projeto →'}
      </a>
    </div>
  )
}

/* ── Row: composes text + image sides ── */
interface ProjectRowProps {
  project: Project
  flip?: boolean
}

function ProjectRow({ project, flip = false }: ProjectRowProps) {
  return (
    <div className={styles.projectRow}>
      {flip ? (
        <>
          <ProjectImage project={project} />
          <ProjectText project={project} />
        </>
      ) : (
        <>
          <ProjectText project={project} />
          <ProjectImage project={project} />
        </>
      )}
    </div>
  )
}

export default function ProjectFrame() {
  const { lang } = useLang()

  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>
        <span className={styles.labelText}>
          {lang === 'EN' ? 'Projects' : 'Projetos'}
        </span>
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