import styles from './information.module.css';

import MissionCard from './mission-card';
import TechnicalOrbitCard from './technical-orbit-card';
import ExperienceCard from './experience-card';

export default function Information() {
  return (
    <div className={styles.information}>
      <MissionCard />
      <TechnicalOrbitCard />
      <ExperienceCard />
    </div>
  );
}