import styles from './information.module.css';

export default function MissionCard() {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>01</span>
        <span className={styles.cardSymbol}>◎</span>
      </div>

      <h3 className={styles.cardTitle}>MISSION</h3>

      <p className={styles.cardDescription}>
        To build software that solves real problems through
        thoughtful engineering, clean architecture and
        continuous improvement.
      </p>

      <span className={styles.cardFooter}>
        PRIMARY OBJECTIVE
      </span>
    </article>
  );
}