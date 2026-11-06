export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Planning';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [];

export default projects;