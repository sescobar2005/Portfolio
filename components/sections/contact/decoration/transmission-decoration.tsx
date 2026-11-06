import styles from './transmission-decoration.module.css';

export default function TransmissionDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.transmission}>
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />
        <div className={`${styles.orbit} ${styles.orbitThree}`} />

        <div className={styles.core}>
          <div className={styles.coreGlow} />
          <div className={styles.corePoint} />
        </div>

        <span className={`${styles.signal} ${styles.signalOne}`} />
        <span className={`${styles.signal} ${styles.signalTwo}`} />
        <span className={`${styles.signal} ${styles.signalThree}`} />
        <span className={`${styles.signal} ${styles.signalFour}`} />
      </div>

      <div className={styles.coordinates}>
        <span>TRANSMISSION NODE 04</span>
        <span>FREQUENCY: 98.7 MHz</span>
        <span>SIGNAL: STABLE</span>
      </div>

      <div className={styles.scanLine} />
    </div>
  );
}