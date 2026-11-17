import styles from './station-footer.module.css';

export default function StationFooter() {
  return (
    <footer className={styles.footer}>
      <span>SYSTEM: ORBITAL-03</span>
      <span>SECTOR: BACKEND / ARCHITECTURE</span>
      <span>STATUS: ONLINE</span>
    </footer>
  );
}
