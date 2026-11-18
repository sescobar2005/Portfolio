'use client';

import { useState } from 'react';

import styles from './technology-orbit.module.css';

const categories = [
  {
    id: 'backend',
    label: 'Backend',
    technologies: ['Java', 'Node.js', 'NestJS'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    technologies: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
  },
  {
    id: 'database',
    label: 'Database',
    technologies: ['PostgreSQL', 'Prisma ORM'],
  },
  {
    id: 'tools',
    label: 'Tools',
    technologies: ['Git', 'GitHub', 'Vitest', 'npm'],
  },
];

export default function TechnologyOrbit() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex];

  return (
    <section className={styles.orbitSection}>
      <header className={styles.header}>
        <h1 className={styles.title}>TECHNOLOGY LAB</h1>
        <p className={styles.subtitle}>
          Technologies, tools and concepts I use to design,
          develop and bring software solutions to life.
        </p>
      </header>

      <div className={styles.orbitWrapper}>
        <div className={styles.categorySelector}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                activeCategoryIndex === index
                  ? styles.categoryButtonActive
                  : ''
              }`}
              onClick={() => setActiveCategoryIndex(index)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className={styles.orbitVisualization}>
          <div className={styles.orbitRing} />
          <div className={styles.orbitParticles}>
            {activeCategory.technologies.map((tech, index) => {
              const angleDeg = (index / activeCategory.technologies.length) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 140;

              return (
                <div
                  key={tech}
                  className={styles.technologyNode}
                  style={{
                    left: `calc(50% + ${Math.cos(angleRad) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angleRad) * radius * 0.5}px)`,
                  }}
                >
                  <div className={styles.orbitDot} />
                  <span className={styles.techLabel}>{tech}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
