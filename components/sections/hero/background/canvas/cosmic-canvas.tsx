'use client';

import dynamic from 'next/dynamic';
import styles from '../background.module.css';

const CosmicScene = dynamic(() => import('../scene/cosmic-scene'), {
  ssr: false,
  loading: () => null,
});

export default function CosmicCanvas() {
  return (
    <div className={styles.scene}>
      <CosmicScene />
    </div>
  );
}