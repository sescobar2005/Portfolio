import styles from '../technology-grid/technology-grid.module.css';

import TechnologyItem from '../technology-grid/technology-item';

const technologies = [
  'Git',
  'GitHub',
  'Vitest',
  'npm',
];

export default function ToolsCategory() {
  return (
    <article className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryNumber}>04</span>
        <span className={styles.categoryCode}>SYS.TOOLS</span>
      </div>

      <h3 className={styles.categoryTitle}>Tools & Workflow</h3>

      <p className={styles.categoryDescription}>
        Development tools, version control and testing workflows.
      </p>

      <div className={styles.technologyList}>
        {technologies.map((technology) => (
          <TechnologyItem key={technology} name={technology} />
        ))}
      </div>
    </article>
  );
}