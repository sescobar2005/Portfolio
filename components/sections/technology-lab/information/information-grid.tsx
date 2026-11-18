import styles from './information-grid.module.css';

import MissionCard from './mission-card';
import TechnicalOrbitCard from './technical-orbit-card';
import ExperienceCard from './experience-card';

export default function InformationGrid() {
  return (
    <div className={styles.informationGrid}>
      <MissionCard />
      <TechnicalOrbitCard />
      <ExperienceCard />
    </div>
  );
}
