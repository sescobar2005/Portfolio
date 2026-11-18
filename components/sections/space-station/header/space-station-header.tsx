import styles from './space-station-header.module.css';

export default function TechnologyLabHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        01 / RESEARCH &amp; DEVELOPMENT
      </p>

      <h1 className={styles.title}>
        TECHNOLOGY LAB
      </h1>

      <p className={styles.subtitle}>
        Systems designed for scale, reliability and maintainability. The
        architecture behind the software.
      </p>

      <div className={styles.metadata}>
        <span>SYSTEM: LAB-01</span>
        <span>SECTOR: ENGINEERING</span>
        <span>STATUS: ACTIVE</span>
      </div>
    </header>
  );
}
