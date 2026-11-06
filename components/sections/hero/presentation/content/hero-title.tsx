import styles from './hero-content.module.css';

export default function HeroTitle() {
  return (
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>
        Santiago
        <span>Escobar</span>
      </h1>

      <h2 className={styles.role}>
        COMPUTER ENGINEER
      </h2>
    </div>
  );
}