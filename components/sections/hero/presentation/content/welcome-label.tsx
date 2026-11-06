import styles from './hero-content.module.css';

export default function WelcomeLabel() {
  return (
    <p className={styles.eyebrow}>
      <span className={styles.statusDot} />
      WELCOME TO MY UNIVERSE
    </p>
  );
}