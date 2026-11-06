import styles from './information.module.css';

export default function ExperienceCard() {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardNumber}>03</span>
        <span className={styles.cardSymbol}>⌖</span>
      </div>

      <h3 className={styles.cardTitle}>EXPERIENCE</h3>

      <p className={styles.cardDescription}>
        Computer Engineer graduate with six months of
        professional internship experience, applying
        technical knowledge to real-world challenges.
      </p>

      <span className={styles.experienceHighlight}>
        06 <small>MONTHS OF EXPERIENCE</small>
      </span>

      <span className={styles.cardFooter}>
        CAREER DEVELOPMENT
      </span>
    </article>
  );
}