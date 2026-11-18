import styles from './station-panel.module.css';

interface StationPanelProps {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
}

export default function StationPanel({
  id,
  number,
  title,
  description,
  technologies,
}: StationPanelProps) {
  return (
    <article
      className={styles.stationPanel}
      data-module={id}
    >
      <div className={styles.panelHeader}>
        <span className={styles.moduleNumber}>{number}</span>
        <span className={styles.moduleCode}>{id.toUpperCase()}</span>
      </div>

      <h3 className={styles.panelTitle}>{title}</h3>

      <p className={styles.panelDescription}>{description}</p>

      <div className={styles.technologies}>
        {technologies.map((tech) => (
          <span key={tech} className={styles.technology}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
