import styles from './skills-header.module.css';

export default function SkillsHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        02 / TECHNOLOGY LAB
      </p>

      <h2 className={styles.title}>
        TECHNOLOGY LAB
      </h2>

      <p className={styles.subtitle}>
        Technologies, tools and concepts I use to design,
        develop and bring software solutions to life.
      </p>
    </header>
  );
}
