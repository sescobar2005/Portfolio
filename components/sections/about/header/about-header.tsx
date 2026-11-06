import styles from './about-header.module.css';

export default function AboutHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        01 / SPACE STATION
      </p>

      <h2 className={styles.title}>
        The mind
        <span> behind the mission.</span>
      </h2>

      <p className={styles.subtitle}>
        Every system has a story. Here's a little about the
        engineer behind the architecture, the logic and the code.
      </p>
    </header>
  );
}