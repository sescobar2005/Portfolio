import styles from './panel-grid.module.css';

import StationPanel from './station-panel';

const panels = [
  {
    id: 'core-architecture',
    number: 'LAB 01',
    title: 'Core Architecture',
    description:
      'Backend architecture and system design principles applied to build scalable, maintainable server-side systems.',
    technologies: ['Java', 'Node.js', 'NestJS'],
  },
  {
    id: 'data-platform',
    number: 'LAB 02',
    title: 'Data Platform',
    description:
      'Database design and management with PostgreSQL and Prisma, focused on data integrity and query performance.',
    technologies: ['PostgreSQL', 'Prisma'],
  },
  {
    id: 'service-layer',
    number: 'LAB 03',
    title: 'Service Layer',
    description:
      'API development and backend services with an emphasis on clean interfaces, reliability and operational simplicity.',
    technologies: ['REST', 'TypeScript'],
  },
  {
    id: 'engineering-foundation',
    number: 'LAB 04',
    title: 'Engineering Foundation',
    description:
      'Software engineering fundamentals: code quality, testing practices and architectural decision-making.',
    technologies: ['TypeScript'],
  },
];

export default function PanelGrid() {
  return (
    <div className={styles.panelGrid}>
      {panels.map((panel) => (
        <StationPanel key={panel.id} {...panel} />
      ))}
    </div>
  );
}
