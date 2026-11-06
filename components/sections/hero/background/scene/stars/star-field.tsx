'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import StarParticles from '../particles/star-particles';

export default function StarField() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.025) * 0.035;

    group.current.rotation.x =
      Math.cos(state.clock.elapsedTime * 0.02) * 0.02;
  });

  return (
    <group ref={group}>
      <StarParticles />
    </group>
  );
}