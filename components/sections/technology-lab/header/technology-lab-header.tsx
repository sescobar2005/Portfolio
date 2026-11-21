import styles from './technology-lab-header.module.css';

export default function TechnologyLabHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        01 / RESEARCH &amp; DEVELOPMENT
      </p>
    </header>
  );
}
