import styles from './projects.module.css';

import ProjectsHeader from './header/projects-header';
import ExpeditionGrid from './expedition-grid/expedition-grid';
import ExpeditionDecoration from './decoration/expedition-decoration';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <ExpeditionDecoration />

      <div className={styles.container}>
        <ProjectsHeader />

        <ExpeditionGrid />

        <footer className={styles.footer}>
          <span>END OF EXPEDITION LOG</span>
          <span>FUTURE MISSIONS AWAIT</span>
        </footer>
      </div>
    </section>
  );
}