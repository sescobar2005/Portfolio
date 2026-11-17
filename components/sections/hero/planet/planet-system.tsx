'use client';

import PlanetMesh from './planet/planet-mesh';
import Atmosphere from './effects/atmosphere';
import RingSystem from './rings/ring-system';

export default function PlanetSystem() {
  return (
    <group position={[2.6, -0.15, -3.5]} rotation={[0.12, 0, -0.12]}>
      <RingSystem />
      <PlanetMesh />
      <Atmosphere />
    </group>
  );
}