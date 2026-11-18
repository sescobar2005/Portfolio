import styles from './lab-footer.module.css';

export default function LabFooter() {
  return (
    <footer className={styles.footer}>
      <span>SYSTEM: LAB-01</span>
      <span>SECTOR: ENGINEERING</span>
      <span>STATUS: ACTIVE</span>
    </footer>
  );
}
