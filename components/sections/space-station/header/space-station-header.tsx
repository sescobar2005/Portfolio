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
        The mind behind the mission.
      </p>

      <p className={styles.description}>
        Every system has a story. Here's a little about the engineer behind
        the architecture, the logic and the code.
      </p>
    </header>
  );
}
