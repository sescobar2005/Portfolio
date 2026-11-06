import styles from './information.module.css';

export default function TechnicalOrbitCard() {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>02</span>
        <span className={styles.cardSymbol}>⌘</span>
      </div>

      <h3 className={styles.cardTitle}>TECHNICAL ORBIT</h3>

      <p className={styles.cardDescription}>
        Focused on backend development, application architecture,
        REST APIs and relational databases.
      </p>

      <div className={styles.technologies}>
        <span>NestJS</span>
        <span>PostgreSQL</span>
        <span>Prisma</span>
        <span>TypeScript</span>
      </div>

      <span className={styles.cardFooter}>
        CURRENT TECHNICAL INTERESTS
      </span>
    </article>
  );
}