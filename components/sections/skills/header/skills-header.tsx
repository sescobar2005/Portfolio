import styles from './skills-header.module.css';

export default function SkillsHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        02 / TECHNOLOGY LAB
      </p>
    </header>
  );
}
