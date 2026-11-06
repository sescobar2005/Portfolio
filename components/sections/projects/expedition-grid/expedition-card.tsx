import type { Project } from '../data/projects-data';
import styles from './expedition-grid.module.css';

interface ExpeditionCardProps {
  project: Project;
}

export default function ExpeditionCard({
  project,
}: ExpeditionCardProps) {
  return (
    <article
      className={`${styles.card} ${
        project.featured ? styles.featured : ''
      }`}
    >
      <div className={styles.cardHeader}>
        <span className={styles.projectNumber}>
          EXPEDITION / {project.number}
        </span>

        <span
          className={`${styles.status} ${
            styles[project.status.replace(' ', '')]
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.category}>
          {project.category}
        </p>

        <h3 className={styles.projectName}>
          {project.name}
        </h3>

        <p className={styles.description}>
          {project.description}
        </p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.technologies}>
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className={styles.technology}
            >
              {technology}
            </span>
          ))}
        </div>

        <div className={styles.links}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} source code`}
            >
              GitHub ↗
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} live demo`}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}