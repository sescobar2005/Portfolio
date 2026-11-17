'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import RingHalf from './ring-half';
import RingParticles from './ring-particles';

interface RingBandProps {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
}

function RingBand({
  innerRadius,
  outerRadius,
  color,
  opacity,
}: RingBandProps) {
  return (
    <>
      <RingHalf
        side="back"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={color}
        opacity={opacity}
      />

      <RingHalf
        side="front"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={color}
        opacity={opacity}
      />
    </>
  );
}

export default function RingSystem() {
  const ringSystem = useRef<THREE.Group>(null);

  
  useFrame((state, delta) => {
    if (!ringSystem.current) return;

    ringSystem.current.rotation.y += delta * 0.12;
  });

  return (
    <group
      ref={ringSystem}
      rotation={[1.12, 0.12, -0.28]}
    >
      <RingBand
        innerRadius={2.45}
        outerRadius={2.72}
        color="#3d5a80"
        opacity={0.40}
      />

      <RingBand
        innerRadius={2.82}
        outerRadius={3.18}
        color="#8fb4d8"
        opacity={0.30}
      />

      <RingBand
        innerRadius={3.22}
        outerRadius={3.42}
        color="#5a7fa8"
        opacity={0.24}
      />

      <RingBand
        innerRadius={3.50}
        outerRadius={3.58}
        color="#a8c4e8"
        opacity={0.14}
      />

      <RingParticles />
    </group>
  );
}