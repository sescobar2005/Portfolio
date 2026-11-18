'use client';

import GalaxyScene from './galaxy-scene';
import styles from './technology-galaxy.module.css';

export default function TechnologyGalaxy() {
  return (
    <section className={styles.technologyGalaxy}>
      <GalaxyScene />
    </section>
  );
}
