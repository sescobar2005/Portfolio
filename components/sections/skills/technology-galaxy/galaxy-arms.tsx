'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyArms() {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  const armCount = 5;
  const pointsPerArm = 300;
  const totalPoints = armCount * pointsPerArm;

  const positions = new Float32Array(totalPoints * 3);
  const colors = new Float32Array(totalPoints * 3);
  const sizes = new Float32Array(totalPoints);

  const armColors = [
    new THREE.Color('#398bff'),
    new THREE.Color('#59c7e8'),
    new THREE.Color('#a78bfa'),
    new THREE.Color('#f472b6'),
    new THREE.Color('#398bff'),
  ];

  for (let arm = 0; arm < armCount; arm++) {
    const armAngle = (arm / armCount) * Math.PI * 2;
    
    for (let i = 0; i < pointsPerArm; i++) {
      const idx = (arm * pointsPerArm + i) * 3;
      
      const radius = (i / pointsPerArm) * 150;
      const angle = armAngle + (i / pointsPerArm) * Math.PI * 4 + Math.sin(i * 0.1) * 0.5;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.4;
      const z = Math.sin(angle) * radius * 0.2;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      colors[idx] = armColors[arm].r;
      colors[idx + 1] = armColors[arm].g;
      colors[idx + 2] = armColors[arm].b;

      sizes[idx] = Math.random() * 2 + 0.5;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
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
