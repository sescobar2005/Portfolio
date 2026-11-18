'use client';

import styles from './orbital-system.module.css';

import { ORBIT_RADII, TECHNICAL_INVENTORY, TECH_LOGOS } from './technical-data';

// Flatten all technologies from all categories into one list
const ALL_TECHNOLOGIES = TECHNICAL_INVENTORY.flatMap((cat) =>
  cat.technologies.map((tech) => ({
    name: tech,
    logoUrl: TECH_LOGOS[tech],
    color: cat.color,
  }))
);

export default function OrbitalSystem() {
  return (
    <section className={styles.orbitalSystem}>
      {/* Central nucleus */}
      <div className={styles.nucleus}>
        <div className={styles.nucleusCore} />
        <div className={styles.nucleusRing} />
        <span className={styles.nucleusLabel}>KNOWLEDGE CORE</span>
      </div>

      {/* Single orbit system - all technologies */}
      <div className={styles.orbitGroup}>
        {/* Orbit path ring */}
        <div
          className={styles.orbitRing}
          style={{ width: ORBIT_RADII[0] * 2, height: ORBIT_RADII[0] * 2 }}
        />

        {/* Satellites - all technology logos orbiting together */}
        {ALL_TECHNOLOGIES.map((tech, index) => {
          const angleDeg = (index / ALL_TECHNOLOGIES.length) * 360;
          const x = Math.round(
            Math.cos((angleDeg * Math.PI) / 180) * ORBIT_RADII[0]
          );
          const y = Math.round(
            Math.sin((angleDeg * Math.PI) / 180) * ORBIT_RADII[0]
          );

          return (
            <div
              key={tech.name}
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
              aria-label={`Select ${tech.name}`}
            >
              <div className={styles.satelliteDot} />
              <img
                className={styles.satelliteLogo}
                src={tech.logoUrl}
                alt={tech.name}
                width={20}
                height={20}
                style={{ filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.3))' }}
              />
              <span className={styles.satelliteLabel}>{tech.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
