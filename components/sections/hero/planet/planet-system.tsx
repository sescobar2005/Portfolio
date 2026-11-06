import Planet from './planet';
import PlanetRings from './planet-rings';
import OrbitalEffects from './orbital-effects';

import styles from './planet-system.module.css';

export default function PlanetSystem() {
  return (
    <div className={styles.planetSystem} aria-hidden="true">
      <PlanetRings />
      <OrbitalEffects />
      <Planet />
    </div>
  );
}