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

    const time = state.clock.elapsedTime;

    ringSystem.current.rotation.y += delta * 0.12;

    ringSystem.current.rotation.z =
      -0.28 + Math.sin(time * 0.18) * 0.025;

    ringSystem.current.rotation.x =
      1.12 + Math.sin(time * 0.12) * 0.018;
  });

  return (
    <group
      ref={ringSystem}
      rotation={[1.12, 0.12, -0.28]}
    >
      <RingBand
        innerRadius={2.45}
        outerRadius={2.72}
        color="#536a9e"
        opacity={0.38}
      />

      <RingBand
        innerRadius={2.82}
        outerRadius={3.18}
        color="#9aadd4"
        opacity={0.32}
      />

      <RingBand
        innerRadius={3.22}
        outerRadius={3.42}
        color="#718bc1"
        opacity={0.24}
      />

      <RingBand
        innerRadius={3.50}
        outerRadius={3.58}
        color="#b5c8ef"
        opacity={0.18}
      />

      <RingParticles />
    </group>
  );
}