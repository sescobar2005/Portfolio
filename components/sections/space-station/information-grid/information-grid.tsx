import styles from './information-grid.module.css';

import InformationCard from './information-card';

const sections = [
  {
    number: '01',
    title: 'MISSION',
    label: 'PRIMARY OBJECTIVE',
    description:
      'To build software that solves real problems through thoughtful engineering, clean architecture and continuous improvement.',
  },
  {
    number: '02',
    title: 'TECHNICAL ORBIT',
    label: 'CURRENT TECHNICAL INTERESTS',
    description:
      'Focused on backend development, application architecture, REST APIs and relational databases.',
    technologies: ['NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
  },
  {
    number: '03',
    title: 'EXPERIENCE',
    label: 'CAREER DEVELOPMENT',
    description:
      'Computer Engineer graduate with six months of professional internship experience, applying technical knowledge to real-world challenges.',
    highlight: '06 MONTHS OF EXPERIENCE',
  },
];

export default function InformationGrid() {
  return (
    <div className={styles.informationGrid}>
      {sections.map((section) => (
        <InformationCard key={section.number} {...section} />
      ))}
    </div>
  );
}
