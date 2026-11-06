import styles from './hero-actions.module.css';

export default function HeroActions() {
  return (
    <div className={styles.actions}>
      <a href="#projects" className={styles.primary}>
        Explore my work
        <span aria-hidden="true">↗</span>
      </a>

      <a href="#contact" className={styles.secondary}>
        Contact me
      </a>
    </div>
  );
}