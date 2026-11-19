import type { Project } from '../data/projects-data';
import styles from './featured-mission.module.css';

interface FeaturedMissionProps {
  project: Project;
}

export default function FeaturedMission({
  project,
}: FeaturedMissionProps) {
  return (
    <section
      className={styles.featured}
      aria-labelledby="featured-mission-title"
    >
      <div className={styles.visual}>
        <div className={styles.visualGrid} />

        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={`${styles.orbit} ${styles.orbitThree}`} />

        <div className={styles.visualCore}>
          <span className={styles.coreRing} />
          <span className={styles.core} />
        </div>

        <span className={styles.visualLabel}>
          MOCK VISUAL / {project.number}
        </span>

        <span className={styles.coordinates}>
          SIMULATED
          <br />
          PROJECT DATA
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.topline}>
          <span className={styles.missionId}>
            PRIMARY MISSION / {project.number}
          </span>

          <span className={styles.status}>
            <span />
            {project.status.toUpperCase()}
          </span>
        </div>

        <div className={styles.description}>
          <span className={styles.eyebrow}>
            MOCK DATA / VISUAL PREVIEW
          </span>

          <h3 id="featured-mission-title">
            {project.name}
          </h3>

          <p>{project.description}</p>
        </div>

        <div className={styles.bottomline}>
          <span>{project.category}</span>
          <span>
            {project.technologies.join(' / ')}
          </span>
        </div>
      </div>
    </section>
  );
}