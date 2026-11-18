import styles from './skills.module.css';

import SkillsHeader from './header/skills-header';
import TechnologyGrid from './technology-grid/technology-grid';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <SkillsHeader />
        <TechnologyGrid />
      </div>
    </section>
  );
}
