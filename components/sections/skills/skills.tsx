import styles from './skills.module.css';

import SkillsHeader from './header/skills-header';
import TechnologyGalaxy from './technology-galaxy/technology-galaxy';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <SkillsHeader />

        <div className={styles.content}>
          <TechnologyGalaxy />
        </div>

        <footer className={styles.footer}>
          <span>END OF TECHNICAL INVENTORY</span>
          <span>MORE KNOWLEDGE LOADING...</span>
        </footer>
      </div>
    </section>
  );
}
