import styles from '../technology-grid/technology-grid.module.css';

import TechnologyItem from '../technology-grid/technology-item';

const technologies = [
  'PostgreSQL',
  'Prisma ORM',
];

export default function DatabaseCategory() {
  return (
    <article className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryNumber}>03</span>
        <span className={styles.categoryCode}>SYS.DATA</span>
      </div>

      <h3 className={styles.categoryTitle}>Database Systems</h3>

      <p className={styles.categoryDescription}>
        Data modeling, relational databases and database management.
      </p>

      <div className={styles.technologyList}>
        {technologies.map((technology) => (
          <TechnologyItem key={technology} name={technology} />
        ))}
      </div>
    </article>
  );
}