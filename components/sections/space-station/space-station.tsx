import styles from './space-station.module.css';

import SpaceStationHeader from './header/space-station-header';
import StationDecoration from './decoration/station-decoration';
import PanelGrid from './panels/panel-grid';
import StationFooter from './footer/station-footer';

export default function SpaceStation() {
  return (
    <section id="space-station" className={styles.spaceStation}>
      <StationDecoration />

      <div className={styles.container}>
        <SpaceStationHeader />

        <div className={styles.content}>
          <PanelGrid />
        </div>

        <StationFooter />
      </div>
    </section>
  );
}
