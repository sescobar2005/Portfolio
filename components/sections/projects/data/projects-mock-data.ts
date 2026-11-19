import type { Project } from './projects-data';

const mockProjects: Project[] = [
  {
    id: 'convet-aruba-mock',
    number: '001',
    name: 'Convet Aruba',
    category: 'VETERINARY MANAGEMENT PLATFORM',
    description:
      'A centralized digital platform concept for managing veterinary services, appointments, patient records and clinic operations.',
    technologies: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
    ],
    status: 'In Progress',
    featured: true,
    isMock: true,
  },
  {
    id: 'nebula-analytics-mock',
    number: '002',
    name: 'Nebula Analytics',
    category: 'DATA & ANALYTICS',
    description:
      'A fictional analytics dashboard concept focused on transforming complex datasets into clear, interactive visual insights.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'D3.js',
    ],
    status: 'Planning',
    featured: false,
    isMock: true,
  },
  {
    id: 'orbit-commerce-mock',
    number: '003',
    name: 'Orbit Commerce',
    category: 'E-COMMERCE SYSTEM',
    description:
      'A fictional commerce platform concept exploring product discovery, shopping experiences and modular application architecture.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Stripe',
    ],
    status: 'Planning',
    featured: false,
    isMock: true,
  },
];

export default mockProjects;