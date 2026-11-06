import styles from './skills.module.css';

import SkillsHeader from './header/skills-header';
import TechnologyGrid from './technology-grid/technology-grid';
import LabDecoration from './decoration/lab-decoration';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <LabDecoration />

      <div className={styles.container}>
        <SkillsHeader />
        <TechnologyGrid />

        <footer className={styles.footer}>
          <span>END OF TECHNICAL INVENTORY</span>
          <span>MORE KNOWLEDGE LOADING...</span>
        </footer>
      </div>
    </section>
  );
}