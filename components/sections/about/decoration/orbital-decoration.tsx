import styles from './orbital-decoration.module.css';

export default function OrbitalDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.orbit}>
        <span className={styles.orbitParticle} />
      </div>

      <div className={styles.planet}>
        <div className={styles.planetGlow} />
      </div>

      <div className={styles.orbitSecondary} />
    </div>
  );
}