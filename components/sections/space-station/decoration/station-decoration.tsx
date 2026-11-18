import styles from './station-decoration.module.css';

export default function StationDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.orbitalRing} />
      <div className={styles.stationCore} />
      <div className={styles.dockingArm} />
      <div className={styles.dockingArmAlt} />

      <div className={`${styles.module} ${styles['moduleTop']}`} />
      <div className={`${styles.module} ${styles['moduleRight']}`} />
      <div className={`${styles.module} ${styles['moduleBottom']}`} />
      <div className={`${styles.module} ${styles['moduleLeft']}`} />

      <div className={`${styles.beacon} ${styles['beaconTop']}`} />
      <div className={`${styles.beacon} ${styles['beaconRight']}`} />
      <div className={`${styles.beacon} ${styles['beaconBottom']}`} />
      <div className={`${styles.beacon} ${styles['beaconLeft']}`} />

      <div className={`${styles.gridLine} ${styles['lineHorizontal']}`} />
      <div className={`${styles.gridLine} ${styles['lineVertical']}`} />

      <div className={styles.scanLine} />
    </div>
  );
}
