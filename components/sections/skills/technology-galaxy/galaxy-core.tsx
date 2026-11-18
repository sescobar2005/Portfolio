'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function GalaxyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.01;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group>
      {/* Núcleo brillante central */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>
      {/* Capa intermedia */}
      <mesh>
        <sphereGeometry args={[10, 64, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Núcleo interno brillante */}
      <mesh>
        <sphereGeometry args={[6, 64, 64]} />
        <meshBasicMaterial
          color="#ffa500"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
      {/* Núcleo más brillante */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
