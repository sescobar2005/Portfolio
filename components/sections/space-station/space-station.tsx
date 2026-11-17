'use client';

import dynamic from 'next/dynamic';
import styles from './space-station.module.css';

const StationCanvas = dynamic(() => import('./station-canvas'), {
  ssr: false,
  loading: () => null,
});

import SpaceStationHeader from './header/space-station-header';
import StationFooter from './footer/station-footer';

export default function SpaceStation() {
  return (
    <section id="space-station" className={styles.spaceStation}>
      <StationCanvas />

      <div className={styles.contentLayer}>
        <SpaceStationHeader />

        <main className={styles.main}>
          <div className={styles.stationView}>
            <div className={styles.stationIdentifier}>
              <span className={styles.sectorLabel}>
                ORBITAL FACILITY / 001
              </span>
              <h1 className={styles.stationTitle}>
                SPACE STATION
              </h1>
            </div>

            <div className={styles.contentPanels}>
              <StationContentPanel
                id="core-architecture"
                number="MODULE 01"
                title="Core Architecture"
                description={
                  'Backend architecture and system design principles applied to build scalable, maintainable server-side systems.'
                }
                technologies={['Java', 'Node.js', 'NestJS']}
              />
              <StationContentPanel
                id="data-platform"
                number="MODULE 02"
                title="Data Platform"
                description={
                  'Database design and management with PostgreSQL and Prisma, focused on data integrity and query performance.'
                }
                technologies={['PostgreSQL', 'Prisma']}
              />
              <StationContentPanel
                id="service-layer"
                number="MODULE 03"
                title="Service Layer"
                description={
                  'API development and backend services with an emphasis on clean interfaces, reliability and operational simplicity.'
                }
                technologies={['REST', 'TypeScript']}
              />
              <StationContentPanel
                id="engineering-foundation"
                number="MODULE 04"
                title="Engineering Foundation"
                description={
                  'Software engineering fundamentals: code quality, testing practices and architectural decision-making.'
                }
                technologies={['TypeScript']}
              />
            </div>
          </div>
        </main>

        <StationFooter />
      </div>
    </section>
  );
}

function StationContentPanel({
  id,
  number,
  title,
  description,
  technologies,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
}) {
  return (
    <article
      className={styles.stationPanel}
      data-module={id}
    >
      <div className={styles.panelHeader}>
        <span className={styles.moduleNumber}>{number}</span>
        <span className={styles.moduleCode}>{id.toUpperCase()}</span>
      </div>

      <h3 className={styles.panelTitle}>{title}</h3>

      <p className={styles.panelDescription}>{description}</p>

      <div className={styles.technologies}>
        {technologies.map((tech) => (
          <span key={tech} className={styles.technology}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
