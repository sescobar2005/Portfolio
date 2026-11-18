import styles from './space-station.module.css';

import TechnologyLabHeader from './header/space-station-header';
import PersonalIntroduction from './personal-introduction/personal-introduction';
import InformationGrid from './information-grid/information-grid';
import LabFooter from './footer/lab-footer';

export default function TechnologyLab() {
  return (
    <section id="technology-lab" className={styles.technologyLab}>
      <div className={styles.container}>
        <TechnologyLabHeader />

        <div className={styles.content}>
          <PersonalIntroduction />

          <InformationGrid />
        </div>

        <LabFooter />
      </div>
    </section>
  );
}
