import styles from './space-station-header.module.css';

export default function SpaceStationHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        ORBITAL FACILITY / 001
      </p>

      <h1 className={styles.stationTitle}>
        SPACE STATION
      </h1>

      <p className={styles.subtitle}>
        Systems designed for scale, reliability and maintainability. The
        architecture behind the software.
      </p>
    </header>
  );
}
