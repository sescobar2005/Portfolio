'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function StationLights() {
  const lightGroup = useRef<THREE.Group>(null);

  // Subtle pulsing of navigation lights
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (lightGroup.current) {
      lightGroup.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;
        const pulse = 0.4 + 0.6 * Math.abs(Math.sin(time * 2 + i));
        material.emissiveIntensity = pulse;
      });
    }
  });

  return (
    <group ref={lightGroup}>
      {/* Navigation lights on core */}
      <mesh position={[2.6, 0, 2.6]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial
          color="#ff3b3b"
          emissive="#ff3b3b"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-2.6, 0, 2.6]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial
          color="#00bfff"
          emissive="#00bfff"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[2.6, 0, -2.6]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial
          color="#00bfff"
          emissive="#00bfff"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-2.6, 0, -2.6]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial
          color="#ff3b3b"
          emissive="#ff3b3b"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Navigation lights on modules */}
      <mesh position={[-5.2, 2.3, 1.6]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial
          color="#59c7e8"
          emissive="#59c7e8"
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[5.2, 1.2, 1.1]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial
          color="#59c7e8"
          emissive="#59c7e8"
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-2.6, -4.2, 3.0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color="#398bff"
          emissive="#398bff"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>

      {/* Small status lights along solar panels */}
      <mesh position={[-8.2, 2.1, 0]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial
          color="#398bff"
          emissive="#398bff"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[8.2, -0.4, 0]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial
          color="#398bff"
          emissive="#398bff"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
