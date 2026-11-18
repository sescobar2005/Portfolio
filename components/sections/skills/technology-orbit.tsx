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
          <div className={styles.orbitGroup}>
            {activeCategory.technologies.map((tech, index) => {
              const angleDeg = (index / activeCategory.technologies.length) * 360;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = Math.round(Math.cos(angleRad) * 140);
              const y = Math.round(Math.sin(angleRad) * 140 * 0.5);

              return (
              <div
                  key={tech}
                  className={styles.satelliteContainer}
                  style={{
                    '--angle': `${angleDeg}deg`,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  } as React.CSSProperties}
                >
                  <div className={styles.satelliteContent}>
                    <div className={styles.orbitDot} />
                    <span className={styles.techLabel}>{tech}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
