'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const RING_ZONES = [
  { inner: 2.46, outer: 2.72 },
  { inner: 2.83, outer: 3.17 },
  { inner: 3.23, outer: 3.42 },
  { inner: 3.51, outer: 3.58 },
];

const PARTICLE_COUNT = 2600;

export default function RingParticles() {
  const particles = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const palette = [
      new THREE.Color('#dceaff'),
      new THREE.Color('#9ebce8'),
      new THREE.Color('#7899c9'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const zone = RING_ZONES[
        Math.floor(Math.random() * RING_ZONES.length)
      ];

      const radius =
        zone.inner + Math.random() * (zone.outer - zone.inner);

      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.025;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const color = palette[
        Math.floor(Math.random() * palette.length)
      ];

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const result = new THREE.BufferGeometry();

    result.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );

    result.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3),
    );

    return result;
  }, []);

  useFrame((_, delta) => {
    if (!particles.current) return;

    particles.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={particles}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}