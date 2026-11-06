import styles from './background.module.css';

import Nebula from './nebula';
import Stars from './stars';
import AmbientGlow from './ambient-glow';

export default function Background() {
  return (
    <div className={styles.background} aria-hidden="true">
      <Nebula />
      <Stars />
      <AmbientGlow />
    </div>
  );
}