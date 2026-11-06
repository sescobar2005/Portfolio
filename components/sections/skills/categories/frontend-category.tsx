import styles from '../technology-grid/technology-grid.module.css';

import TechnologyItem from '../technology-grid/technology-item';

const technologies = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
];

export default function FrontendCategory() {
  return (
    <article className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryNumber}>02</span>
        <span className={styles.categoryCode}>SYS.FRONTEND</span>
      </div>

      <h3 className={styles.categoryTitle}>Frontend Development</h3>

      <p className={styles.categoryDescription}>
        Interactive interfaces and modern web experiences.
      </p>

      <div className={styles.technologyList}>
        {technologies.map((technology) => (
          <TechnologyItem key={technology} name={technology} />
        ))}
      </div>
    </article>
  );
}