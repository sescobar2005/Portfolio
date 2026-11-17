'use client';

import * as THREE from 'three';

export default function StationCore() {
  return (
    <group>
      {/* Main central cylinder */}
      <mesh>
        <cylinderGeometry args={[2.6, 2.6, 11, 24]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.45}
          metalness={0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Top ring detail */}
      <mesh position={[0, 5.55, 0]}>
        <cylinderGeometry args={[2.85, 2.85, 0.4, 24]} />
        <meshStandardMaterial
          color="#26384d"
          roughness={0.3}
          metalness={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Bottom ring detail */}
      <mesh position={[0, -5.55, 0]}>
        <cylinderGeometry args={[2.85, 2.85, 0.4, 24]} />
        <meshStandardMaterial
          color="#26384d"
          roughness={0.3}
          metalness={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Central illuminated band */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[2.65, 2.9, 32]} />
        <meshStandardMaterial
          color="#398bff"
          emissive="#398bff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Top observation dome */}
      <mesh position={[0, 6.2, 0]}>
        <sphereGeometry args={[1.4, 16, 12]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.2}
          metalness={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* Docking port top */}
      <mesh position={[0, 6.95, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
        <meshStandardMaterial
          color="#26384d"
          roughness={0.4}
          metalness={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Docking port bottom */}
      <mesh position={[0, -6.95, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
        <meshStandardMaterial
          color="#26384d"
          roughness={0.4}
          metalness={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Structural struts along core */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -5.5 + i * 5.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.12, 0.12, 11.2, 12]} />
          <meshStandardMaterial
            color="#101b2a"
            roughness={0.5}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
