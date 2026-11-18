import styles from './space-station-header.module.css';

export default function SpaceStationHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>
        <span className={styles.statusDot} />
        03 / ORBITAL FACILITY
      </p>

      <h2 className={styles.title}>
        Space Station
        <span>Orbital architecture.</span>
      </h2>

      <p className={styles.subtitle}>
        Systems designed for scale, reliability and maintainability. The
        architecture behind the software.
      </p>

      <div className={styles.metadata}>
        <span>SYSTEM: ORBITAL-03</span>
        <span>STATUS: OPERATIONAL</span>
        <span>SECTOR: BACKEND / ARCHITECTURE</span>
      </div>
    </header>
  );
}
