import styles from './projects.module.css';

import ProjectsHeader from './header/projects-header';
import MissionControl from './mission-control/mission-control';
import ExpeditionDecoration from './decoration/expedition-decoration';

import mockProjects from './data/projects-mock-data';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <ExpeditionDecoration />

      <div className={styles.container}>
        <ProjectsHeader />

        <MissionControl projects={mockProjects} />

        <footer className={styles.footer}>
          <span>END OF EXPEDITION LOG</span>
          <span>FUTURE MISSIONS AWAIT</span>
        </footer>
      </div>
    </section>
  );
}