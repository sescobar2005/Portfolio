'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import PlanetMesh from './planet/planet-mesh';
import Atmosphere from './effects/atmosphere';
import RingSystem from './rings/ring-system';

export default function PlanetSystem() {
  const planetGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (planetGroup.current) {
      planetGroup.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <group position={[2.6, -0.15, -3.5]} rotation={[0.12, 0, -0.12]}>
      <group ref={planetGroup}>
        <PlanetMesh />
        <Atmosphere />
        <RingSystem />
      </group>
    </group>
  );
}
