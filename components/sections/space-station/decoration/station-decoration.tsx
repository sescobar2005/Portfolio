import styles from './station-decoration.module.css';

export default function TechLabVisual() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={`${styles.gridDot} ${styles['dot1']}`} />
      <div className={`${styles.gridDot} ${styles['dot2']}`} />
      <div className={`${styles.gridDot} ${styles['dot3']}`} />
      <div className={`${styles.gridDot} ${styles['dot4']}`} />
      <div className={`${styles.gridDot} ${styles['dot5']}`} />
      <div className={`${styles.gridDot} ${styles['dot6']}`} />
      <div className={`${styles.gridLine} ${styles['line1']}`} />
      <div className={`${styles.gridLine} ${styles['line2']}`} />
      <div className={`${styles.gridLine} ${styles['line3']}`} />
      <div className={`${styles.gridLine} ${styles['line4']}`} />
    </div>
  );
}
