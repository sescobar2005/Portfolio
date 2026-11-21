import styles from './projects-header.module.css';

export default function ProjectsHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        03 / EXPEDITION LOG
      </p>

      <h2 className={styles.title}>
        Systems
        <span> built beyond ideas.</span>
      </h2>
    </header>
  );
}