import styles from './lab-decoration.module.css';

export default function LabDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.outerRing} />
      <div className={styles.middleRing} />
      <div className={styles.innerRing} />

      <div className={styles.core}>
        <div className={styles.coreGlow} />
        <div className={styles.coreCenter} />
      </div>

      <span className={`${styles.signal} ${styles.signalTop}`} />
      <span className={`${styles.signal} ${styles.signalRight}`} />
      <span className={`${styles.signal} ${styles.signalBottom}`} />
      <span className={`${styles.signal} ${styles.signalLeft}`} />

      <div className={styles.scanLine} />
    </div>
  );
}