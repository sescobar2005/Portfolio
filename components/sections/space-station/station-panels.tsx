'use client';

import * as THREE from 'three';

export default function StationPanels() {
  return (
    <group>
      {/* Left solar panel array */}
      <group position={[-8.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 6.2, 0.1, 4, 4, 1]} />
          <meshStandardMaterial
            color="#101b2a"
            roughness={0.4}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>

        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[0, -2.1 + i * 2.1, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <planeGeometry args={[5.2, 1.8]} />
            <meshStandardMaterial
              color="#26384d"
              emissive="#0a1423"
              emissiveIntensity={0.2}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Right solar panel array */}
      <group position={[8.2, -1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 5.2, 0.1, 4, 4, 1]} />
          <meshStandardMaterial
            color="#101b2a"
            roughness={0.4}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>

        {[0, 1].map((i) => (
          <mesh
            key={i}
            position={[0, -1.7 + i * 1.7, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <planeGeometry args={[4.2, 1.5]} />
            <meshStandardMaterial
              color="#26384d"
              emissive="#0a1423"
              emissiveIntensity={0.2}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Top dorsal panel */}
      <mesh position={[0, 6.8, -1.5]}>
        <boxGeometry args={[6.2, 0.1, 0.4, 4, 1, 4]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.4}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Bottom ventral panel */}
      <mesh position={[0, -6.8, 1.5]}>
        <boxGeometry args={[5.2, 0.1, 0.4, 4, 1, 4]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.4}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Antenna array */}
      <mesh position={[0, 7.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.4, 10]} />
        <meshStandardMaterial
          color="#26384d"
          roughness={0.5}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 8.1, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color="#59c7e8"
          emissive="#59c7e8"
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
