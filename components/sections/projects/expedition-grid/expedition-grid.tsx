import projects from '../data/projects-data';
import ExpeditionCard from './expedition-card';
import styles from './expedition-grid.module.css';

export default function ExpeditionGrid() {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <span />
          <span />
          <span />
        </div>

        <p className={styles.emptyCode}>
          NO ACTIVE EXPEDITIONS
        </p>

        <h3 className={styles.emptyTitle}>
          New missions are being prepared.
        </h3>

        <p className={styles.emptyDescription}>
          This space will document the projects, experiments
          and systems developed throughout my engineering journey.
        </p>

        <span className={styles.emptyStatus}>
          ARCHIVE STATUS: STANDBY
        </span>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ExpeditionCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}