import styles from './expedition-decoration.module.css';

export default function ExpeditionDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.radar}>
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={`${styles.orbit} ${styles.orbitThree}`} />

        <div className={styles.center}>
          <div className={styles.centerGlow} />
          <div className={styles.centerPoint} />
        </div>

        <span className={`${styles.signal} ${styles.signalOne}`} />
        <span className={`${styles.signal} ${styles.signalTwo}`} />
        <span className={`${styles.signal} ${styles.signalThree}`} />
      </div>

      <div className={styles.coordinates}>
        <span>SECTOR 03</span>
        <span>EXPLORATION SYSTEM</span>
        <span>COORDINATES: 04.6097 / -74.0817</span>
      </div>

      <div className={styles.scanLine} />
    </div>
  );
}