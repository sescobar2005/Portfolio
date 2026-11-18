import styles from './skills.module.css';

import SkillsHeader from './header/skills-header';
import GalaxyScene from './galaxy-scene';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <SkillsHeader />
        <GalaxyScene />
      </div>
    </section>
  );
}
