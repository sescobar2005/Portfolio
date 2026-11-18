export interface TechnologyCategory {
  number: string;
  identifier: string;
  title: string;
  description: string;
  technologies: string[];
  color: string;
}

export const TECHNICAL_INVENTORY: TechnologyCategory[] = [
  {
    number: '01',
    identifier: 'SYS.BACKEND',
    title: 'Backend Development',
    description: 'Application logic, server-side development and API design.',
    technologies: ['Java', 'Node.js', 'NestJS'],
    color: '#398bff',
  },
  {
    number: '02',
    identifier: 'SYS.FRONTEND',
    title: 'Frontend Development',
    description: 'Interactive interfaces and modern web experiences.',
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
    color: '#59c7e8',
  },
  {
    number: '03',
    identifier: 'SYS.DATA',
    title: 'Database Systems',
    description: 'Data modeling, relational databases and database management.',
    technologies: ['PostgreSQL', 'Prisma ORM'],
    color: '#a78bfa',
  },
  {
    number: '04',
    identifier: 'SYS.TOOLS',
    title: 'Tools & Workflow',
    description: 'Development tools, version control and testing workflows.',
    technologies: ['Git', 'GitHub', 'Vitest', 'npm'],
    color: '#f472b6',
  },
];

export const ORBIT_RADII = [110, 160, 210, 260];
