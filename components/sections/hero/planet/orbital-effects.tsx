import styles from './planet-system.module.css';

export default function OrbitalEffects() {
  return (
    <div className={styles.orbitalEffects}>
      <span className={styles.orbit} />
      <span className={styles.orbitParticle} />
      <span className={styles.orbitParticleSecondary} />
    </div>
  );
}