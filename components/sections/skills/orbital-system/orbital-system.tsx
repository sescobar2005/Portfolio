'use client';

import { useMemo } from 'react';

import styles from './orbital-system.module.css';

import { ORBIT_RADII, TECHNICAL_INVENTORY, TECH_LOGOS } from './technical-data';

export default function OrbitalSystem() {
  const category = TECHNICAL_INVENTORY[0]; // SYS.BACKEND

  return (
    <section className={styles.orbitalSystem}>
      {/* Central nucleus */}
      <div className={styles.nucleus}>
        <div className={styles.nucleusCore} />
        <div className={styles.nucleusRing} />
        <span className={styles.nucleusLabel}>KNOWLEDGE CORE</span>
      </div>

      {/* Single orbit system - SYS.BACKEND only */}
      <OrbitOrbit
        category={category}
        radius={ORBIT_RADII[0]}
      />
    </section>
  );
}

interface OrbitOrbitProps {
  category: typeof TECHNICAL_INVENTORY[number];
  radius: number;
}

function OrbitOrbit({ category, radius }: OrbitOrbitProps) {
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
        const x = Math.round(Math.cos((angleDeg * Math.PI) / 180) * radius);
        const y = Math.round(Math.sin((angleDeg * Math.PI) / 180) * radius);
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
