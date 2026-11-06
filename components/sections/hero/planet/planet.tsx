import styles from './planet-system.module.css';

export default function Planet() {
  return (
    <div className={styles.planet}>
      <div className={styles.planetSurface} />
      <div className={styles.planetAtmosphere} />
    </div>
  );
}