import styles from './expedition-decoration.module.css';

export default function ExpeditionDecoration() {
  return (
    <div className={styles.decoration} aria-hidden="true">
      <div className={styles.nebula} />

      <div className={styles.orbitalSystem}>

        <div className={styles.orbitalCore}>
          <span className={styles.coreGlow} />
          <span className={styles.corePoint} />
        </div>

      </div>
      
    </div>
  );
}