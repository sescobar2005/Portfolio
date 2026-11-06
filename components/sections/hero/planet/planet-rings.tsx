import styles from './planet-system.module.css';

export default function PlanetRings() {
  return (
    <div className={styles.planetRings}>
      <div className={styles.ringBack} />
      <div className={styles.ringFront} />
    </div>
  );
}