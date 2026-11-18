'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {/* Inner bright core center */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
      {/* Tiny bright center */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
