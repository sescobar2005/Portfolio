import styles from './transmission-decoration.module.css';

export default function TransmissionDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.stars} />

      <div className={styles.horizonAtmosphere} />

      <div className={styles.horizon} />

      <div className={styles.horizonLine} />
    </div>
  );
}