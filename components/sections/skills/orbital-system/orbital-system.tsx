'use client';

import { useCallback, useMemo, useState } from 'react';

import styles from './orbital-system.module.css';

import { ORBIT_RADII, TECHNICAL_INVENTORY, TECH_LOGOS } from './technical-data';

export default function OrbitalSystem({ initialCategory }: { initialCategory?: string }) {
  const [selectedId, setSelectedId] = useState<string>(
    initialCategory || TECHNICAL_INVENTORY[0].identifier
  );

  const selectedCategory = TECHNICAL_INVENTORY.find(
    (c) => c.identifier === selectedId
  )!;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  return (
    <section className={styles.orbitalSystem}>
      {/* Central nucleus */}
      <div className={styles.nucleus}>
        <div className={styles.nucleusCore} />
        <div className={styles.nucleusRing} />
        <span className={styles.nucleusLabel}>KNOWLEDGE CORE</span>
      </div>

      {TECHNICAL_INVENTORY.map((category) => (
        <OrbitOrbit
          key={category.identifier}
          category={category}
          radius={ORBIT_RADII[TECHNICAL_INVENTORY.indexOf(category)]}
          isSelected={category.identifier === selectedId}
          onSelect={handleSelect}
        />
      ))}

      {/* Category selector */}
      <div className={styles.orbitSelector}>
        {TECHNICAL_INVENTORY.map((category) => (
          <button
            key={category.identifier}
            className={`${styles.selectorBtn} ${
              category.identifier === selectedId ? styles.selected : ''
            }`}
            onClick={() => setSelectedId(category.identifier)}
            aria-label={`Select ${category.title}`}
          >
            <span className={styles.selectorNumber}>{category.number}</span>
            <span className={styles.selectorCode}>{category.identifier}</span>
            <span className={styles.selectorTitle}>{category.title}</span>
          </button>
        ))}
      </div>

      {/* Selected category info panel */}
      <div className={`${styles.categoryInfo} ${styles.visible}`}>
        <div className={styles.infoHeader}>
          <span className={styles.infoNumber}>{selectedCategory.number}</span>
          <span className={styles.infoCode}>{selectedCategory.identifier}</span>
        </div>
        <h2 className={styles.infoTitle}>{selectedCategory.title}</h2>
        <p className={styles.infoDescription}>{selectedCategory.description}</p>
        <div className={styles.infoTechnologies}>
          {selectedCategory.technologies.map((tech) => (
            <span key={tech} className={styles.infoTech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

interface OrbitOrbitProps {
  category: typeof TECHNICAL_INVENTORY[number];
  radius: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function OrbitOrbit({ category, radius, isSelected, onSelect }: OrbitOrbitProps) {
  const techCount = category.technologies.length;

  return (
    <div className={styles.orbitGroup}>
      {/* Orbit path ring */}
      <div
        className={styles.orbitRing}
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Satellites - technology logos orbiting */}
      {category.technologies.map((tech, techIndex) => {
        const angleDeg = (techIndex / techCount) * 360;
        const x = Math.cos((angleDeg * Math.PI) / 180) * radius;
        const y = Math.sin((angleDeg * Math.PI) / 180) * radius;
        const LogoComponent = TECH_LOGOS[tech];

        return (
          <div
            key={tech}
            className={styles.satelliteContainer}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: 32,
              height: 32,
            }}
            onClick={() => onSelect(category.identifier)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${tech} from ${category.title}`}
          >
            <div className={styles.satelliteDot} />
            <LogoComponent className={styles.satelliteLogo} />
            <span className={styles.satelliteLabel}>{tech}</span>
          </div>
        );
      })}
    </div>
  );
}
