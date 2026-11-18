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

export const TECH_LOGOS: Record<string, string> = {
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
  NestJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Prisma ORM': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  GitHub: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  Vitest: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitest/vitest-original.svg',
  npm: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg',
};
