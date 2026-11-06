import styles from './scroll-indicator.module.css';

export default function ScrollIndicator() {
  return (
    <a
      href="#about"
      className={styles.indicator}
      aria-label="Scroll to About Me section"
    >
      <span className={styles.label}>
        SCROLL TO EXPLORE
      </span>

      <span className={styles.line} />

      <span className={styles.arrow}>
        ↓
      </span>
    </a>
  );
}