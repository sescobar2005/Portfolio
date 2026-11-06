import styles from '../technology-grid/technology-grid.module.css';

import TechnologyItem from '../technology-grid/technology-item';

const technologies = [
  'Java',
  'Node.js',
  'NestJS',
];

export default function BackendCategory() {
  return (
    <article className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryNumber}>01</span>
        <span className={styles.categoryCode}>SYS.BACKEND</span>
      </div>

      <h3 className={styles.categoryTitle}>Backend Development</h3>

      <p className={styles.categoryDescription}>
        Application logic, server-side development and API design.
      </p>

      <div className={styles.technologyList}>
        {technologies.map((technology) => (
          <TechnologyItem key={technology} name={technology} />
        ))}
      </div>
    </article>
  );
}