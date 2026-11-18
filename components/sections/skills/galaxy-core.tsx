'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
      meshRef.current.rotation.x += delta * 0.003;
    }
  });

  return (
    <group>
      {/* Outer glow - faint outer atmosphere */}
      <mesh>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial
          color="#fffef0"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      {/* Mid glow - brighter warm center */}
      <mesh>
        <sphereGeometry args={[9, 64, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
      {/* Bright inner core */}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial
          color="#fffef0"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
      {/* Brightest center point */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
