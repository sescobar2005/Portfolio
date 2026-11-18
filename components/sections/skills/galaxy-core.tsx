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
      {/* Central bright core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[6, 64, 64]} />
        <meshBasicMaterial
          color="#fffef0"
          toneMapped={false}
        />
      </mesh>
      {/* Bright inner core glow */}
      <mesh>
        <sphereGeometry args={[10, 64, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>
      {/* Mid atmosphere */}
      <mesh>
        <sphereGeometry args={[16, 64, 64]} />
        <meshBasicMaterial
          color="#ffa500"
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[22, 64, 64]} />
        <meshBasicMaterial
          color="#ff8c00"
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
