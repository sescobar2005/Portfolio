import styles from './background.module.css';
import CosmicCanvas from './canvas/cosmic-canvas';

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <CosmicCanvas />
      <div className={styles.vignette} />
    </div>
  );
}