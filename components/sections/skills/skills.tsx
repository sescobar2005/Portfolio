import styles from './skills.module.css';

import SkillsHeader from './header/skills-header';
import TechnologyOrbit from './technology-orbit';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <SkillsHeader />
        <TechnologyOrbit />
      </div>
    </section>
  );
}
