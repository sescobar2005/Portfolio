import styles from './space-station.module.css';

import TechnologyLabHeader from './header/space-station-header';
import TechLabVisual from './decoration/station-decoration';
import PanelGrid from './panels/panel-grid';
import LabFooter from './footer/station-footer';

export default function TechnologyLab() {
  return (
    <section id="technology-lab" className={styles.technologyLab}>
      <TechLabVisual />

      <div className={styles.container}>
        <TechnologyLabHeader />

        <div className={styles.content}>
          <div className={styles.visualPanel}>
            <div className={styles.inlineVisual}>
              <div className={`${styles.node} ${styles.nodeA}`} />
              <div className={`${styles.node} ${styles.nodeB}`} />
              <div className={`${styles.node} ${styles.nodeC}`} />
              <div className={`${styles.node} ${styles.nodeD}`} />
              <div className={`${styles.node} ${styles.nodeE}`} />
              <div className={`${styles.connection} ${styles.connAB}`} />
              <div className={`${styles.connection} ${styles.connBC}`} />
              <div className={`${styles.connection} ${styles.connCD}`} />
              <div className={`${styles.connection} ${styles.connDE}`} />
              <div className={`${styles.connection} ${styles.connEA}`} />
            </div>
          </div>

          <div className={styles.panelGrid}>
            <PanelGrid />
          </div>
        </div>

        <LabFooter />
      </div>
    </section>
  );
}
