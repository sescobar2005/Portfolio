'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyStars() {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.008;
      meshRef.current.rotation.x += delta * 0.003;
    }
  });

  const particleCount = 4000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 500;
    positions[i + 1] = (Math.random() - 0.5) * 120;
    positions[i + 2] = (Math.random() - 0.5) * 500;

    // Star colors: blue-white, warm white, pale cyan
    const roll = Math.random();
    let r, g, b;
    if (roll < 0.4) {
      // Cool blue-white stars
      r = 0.7 + Math.random() * 0.3;
      g = 0.7 + Math.random() * 0.3;
      b = 0.9 + Math.random() * 0.1;
    } else if (roll < 0.7) {
      // Warm yellow-white stars
      r = 0.9 + Math.random() * 0.1;
      g = 0.8 + Math.random() * 0.2;
      b = 0.5 + Math.random() * 0.2;
    } else {
      // Pale cyan stars
      r = 0.6 + Math.random() * 0.3;
      g = 0.8 + Math.random() * 0.2;
      b = 0.9 + Math.random() * 0.1;
    }

    colors[i] = r;
    colors[i + 1] = g;
    colors[i + 2] = b;

    sizes[i] = Math.random() * 1.2 + 0.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <mesh ref={(el) => (meshRef.current = el as unknown as THREE.Points)} geometry={geometry} material={material} />
  );
}
