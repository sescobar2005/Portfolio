'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import GalaxyCore from './galaxy-core';
import GalaxyArms from './galaxy-arms';
import GalaxyParticles from './galaxy-stars';
import GalaxyNebula from './galaxy-nebula';
import GalaxyDust from './galaxy-dust';
import TechnologySatellites from './technology-satellites';

export default function GalaxySceneContent() {
  useFrame((state, delta) => {
    state.camera.position.set(0, 50, 300);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <GalaxyCore />
      <GalaxyArms />
      <GalaxyParticles />
      <GalaxyNebula />
      <GalaxyDust />
      <TechnologySatellites />
    </group>
  );
}
