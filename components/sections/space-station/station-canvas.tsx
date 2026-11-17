import styles from './space-station.module.css';
import dynamic from 'next/dynamic';

const StationScene = dynamic(() => import('./station-scene'), {
  ssr: false,
  loading: () => null,
});

export default function StationCanvas() {
  return (
    <div className={styles.stationCanvasWrap}>
      <StationScene />
    </div>
  );
}
