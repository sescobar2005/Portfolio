'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import StationCore from './station-core';
import StationModules from './station-modules';
import StationPanels from './station-panels';
import StationLights from './station-lights';

export default function StationSceneContent() {
  const stationGroup = useRef<THREE.Group>(null);

  // Slow orbital rotation of the entire station
  useFrame((state, delta) => {
    if (stationGroup.current) {
      stationGroup.current.rotation.y += delta * 0.015;
      stationGroup.current.rotation.z += delta * 0.005;
    }
  });

  return (
    <group ref={stationGroup} position={[0, 0, 0]}>
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#398bff"
      />

      <directionalLight
        position={[-5, -2, 3]}
        intensity={0.3}
        color="#59c7e8"
      />

      <StationCore />
      <StationModules />
      <StationPanels />
      <StationLights />
    </group>
  );
}
