'use client';

import { useRef, useState, type CSSProperties } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';

import styles from './technology-orbit.module.css';

interface Technology {
  name: string;
  icon: string;
}

interface Category {
  id: string;
  label: string;
  technologies: Technology[];
}

const categories: Category[] = [
  {
    id: 'backend',
    label: 'Backend',
    technologies: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
      },
      {
        name: 'NestJS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    technologies: [
      {
        name: 'Angular',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
      },
    ],
  },
  {
    id: 'databases',
    label: 'Databases and ORM',
    technologies: [
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg',
      },
      {
        name: 'Prisma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg',
      },
    ],
  },
  {
    id: 'programming-data',
    label: 'Programming and data',
    technologies: [
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg',
      },
      {
        name: 'Java',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg',
      },
      {
        name: 'Pandas',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
      },
      {
        name: 'NumPy',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools and version control',
    technologies: [
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg',
      },
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg',
      },
    ],
  },
];

const ORBIT_DURATION = 28_000;

export default function TechnologyOrbit() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  const orbitRef = useRef<HTMLDivElement>(null);

  const isOrbitVisible = useInView(orbitRef, {
    amount: 0.1,
  });

  // One shared rotation value for the orbit and its logos.
  const orbitRotation = useMotionValue(0);

  // Every logo receives the exact inverse rotation.
  const counterRotation = useTransform(
    orbitRotation,
    (rotation) => -rotation,
  );

  // Advance the orbit only while it is visible and motion is allowed.
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || !isOrbitVisible) return;

    const nextRotation =
      (orbitRotation.get() + (delta / ORBIT_DURATION) * 360) % 360;

    orbitRotation.set(nextRotation);
  });

  const activeCategory = categories[activeCategoryIndex];

  const transition = {
    duration: shouldReduceMotion ? 0 : 0.45,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className={styles.orbitSection}>

      <div className={styles.orbitWrapper}>
        <nav
          className={styles.categorySelector}
          aria-label="Technology categories"
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategoryIndex === index}
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
        </nav>

        <div
          ref={orbitRef}
          className={styles.orbitVisualization}
          aria-label={`${activeCategory.label} technologies`}
        >
          <div className={styles.orbitRing} />

          <div className={styles.orbitCenter}>
            <span>TECH</span>
          </div>

          <motion.div
            className={styles.orbitTrack}
            style={{
              rotate: orbitRotation,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory.id}
                className={styles.orbitCategoryLayer}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.88 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.88 }
                }
                transition={transition}
              >
                {activeCategory.technologies.map((technology, index) => {
                  const angle =
                    (index / activeCategory.technologies.length) * 360 - 90;

                  const satelliteStyle = {
                    '--angle': `${angle}deg`,
                    '--counter-angle': `${-angle}deg`,
                  } as CSSProperties;

                  return (
                    <div
                      key={technology.name}
                      className={styles.satellitePosition}
                      style={satelliteStyle}
                    >
                      <div className={styles.satelliteContent}>
                        <motion.div
                          className={styles.satelliteCounter}
                          style={{
                            rotate: counterRotation,
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={styles.technologyLogo}
                            src={technology.icon}
                            alt={technology.name}
                            title={technology.name}
                            width={60}
                            height={60}
                            loading="lazy"
                            draggable={false}
                          />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}