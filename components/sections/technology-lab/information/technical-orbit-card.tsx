import styles from './information-card.module.css';

export default function TechnicalOrbitCard() {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>02</span>
        <span className={styles.cardSymbol}>⌘</span>
      </div>

      <h3 className={styles.cardTitle}>CORE COMPETENCIES</h3>

      <p className={styles.cardDescription}>
        Focused on backend development, application architecture,
        REST APIs and relational databases.
      </p>

      <span className={styles.cardFooter}>
        CURRENT TECHNICAL INTERESTS
      </span>
    </article>
  );
}