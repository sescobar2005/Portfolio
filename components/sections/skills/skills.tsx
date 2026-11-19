import styles from './skills.module.css';
import SkillsHeader from './header/skills-header';
import TechnologyOrbit from './technology-orbit';
import { SectionReveal } from '@/components/common/section-reveal';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      {/* Shared cosmic background for the entire Skills section */}
      <div className={styles.spaceBackground} aria-hidden="true">
        <div className={styles.nebula} />
        <div className={styles.starField} />
        <div className={styles.ambientGlow} />
      </div>

      <div className={styles.container}>
        <SectionReveal>
          <SkillsHeader />
          <TechnologyOrbit />
        </SectionReveal>
      </div>
    </section>
  );
}