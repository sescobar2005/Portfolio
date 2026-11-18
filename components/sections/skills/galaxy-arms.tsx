'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyArms() {
  const meshRef = useRef<THREE.Points>(null);

  const armCount = 5;
  const pointsPerArm = 600;
  const totalPoints = armCount * pointsPerArm;

  const positions = new Float32Array(totalPoints * 3);
  const colors = new Float32Array(totalPoints * 3);
  const sizes = new Float32Array(totalPoints);

  const armColors = [
    new THREE.Color('#398bff'), // electric blue
    new THREE.Color('#59c7e8'), // cyan
    new THREE.Color('#a78bfa'), // violet
    new THREE.Color('#f472b6'), // magenta-pink
    new THREE.Color('#fbbf24'), // warm amber
  ];

  for (let arm = 0; arm < armCount; arm++) {
    const armAngle = (arm / armCount) * Math.PI * 2;

    for (let i = 0; i < pointsPerArm; i++) {
      const idx = (arm * pointsPerArm + i) * 3;

      // Spiral radius grows outward - denser near center
      const radius = (i / pointsPerArm) * 180;

      // Spiral angle with organic variation
      const angle = armAngle + (i / pointsPerArm) * Math.PI * 5 + Math.sin(i * 0.15) * 0.4;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.28; // Flatten into galactic plane
      const z = Math.sin(angle) * radius * 0.25;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      // Color gradient from center (bright) to outer (dimmer)
      const distanceFromCenter = radius / 180;
      const brightness = 1 - distanceFromCenter * 0.4;

      colors[idx] = armColors[arm].r * brightness;
      colors[idx + 1] = armColors[arm].g * brightness;
      colors[idx + 2] = armColors[arm].b * brightness;

      // Smaller particles toward edges, larger near center
      sizes[idx] = Math.random() * 0.8 + 0.3;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <mesh
      ref={(el) => (meshRef.current = el as unknown as THREE.Points)}
      geometry={geometry}
      material={material}
    />
  );
}
