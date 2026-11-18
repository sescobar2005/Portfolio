'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyParticles() {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.005;
      meshRef.current.rotation.x += delta * 0.002;
    }
  });

  const particleCount = 8000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 500;
    positions[i + 1] = (Math.random() - 0.5) * 150;
    positions[i + 2] = (Math.random() - 0.5) * 500;

    const brightness = Math.random() * 0.5 + 0.3;
    colors[i] = brightness * 0.4;
    colors[i + 1] = brightness * 0.5;
    colors[i + 2] = brightness * 0.9;

    sizes[i] = Math.random() * 1.5 + 0.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.6,
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
