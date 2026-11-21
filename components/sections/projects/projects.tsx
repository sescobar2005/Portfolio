import styles from './projects.module.css';

import ProjectsHeader from './header/projects-header';
import MissionControl from './mission-control/mission-control';
import ExpeditionDecoration from './decoration/expedition-decoration';
import { SectionReveal } from '@/components/common/section-reveal';

import projects from './data/projects-data';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <ExpeditionDecoration />

      <div className={styles.container}>
        <SectionReveal>
          <ProjectsHeader />

          <MissionControl projects={projects} />

          <footer className={styles.footer}>
            <span>END OF EXPEDITION LOG</span>
            <span>FUTURE MISSIONS AWAIT</span>
          </footer>
        </SectionReveal>
      </div>
    </section>
  );
}