'use client';

import * as THREE from 'three';

export default function StationModules() {
  return (
    <group>
      {/* Left module - cylindrical habitation ring */}
      <group position={[-5.2, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.6, 1.6, 4.5, 20]} />
          <meshStandardMaterial
            color="#1a2636"
            roughness={0.5}
            metalness={0.75}
            toneMapped={false}
          />
        </mesh>

        {/* Module end caps */}
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.3, 20]} />
          <meshStandardMaterial
            color="#26384d"
            roughness={0.4}
            metalness={0.8}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, -2.3, 0]}>
          <cylinderGeometry args={[1.7, 1.7, 0.3, 20]} />
          <meshStandardMaterial
            color="#26384d"
            roughness={0.4}
            metalness={0.8}
            toneMapped={false}
          />
        </mesh>

        {/* Illuminated windows */}
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              1.65 * Math.cos((i / 4) * Math.PI * 2),
              0,
              1.65 * Math.sin((i / 4) * Math.PI * 2),
            ]}
          >
            <ringGeometry args={[0.45, 0.6, 12]} />
            <meshStandardMaterial
              color="#59c7e8"
              emissive="#59c7e8"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* Right module - rectangular laboratory section */}
      <group position={[5.2, -1.5, 0]}>
        <mesh>
          <boxGeometry args={[3.2, 4.2, 2.2, 8, 8, 4]} />
          <meshStandardMaterial
            color="#101b2a"
            roughness={0.5}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>

        {/* Laboratory windows */}
        <mesh position={[1.65, 0, 0]}>
          <planeGeometry args={[2.2, 3.2]} />
          <meshStandardMaterial
            color="#59c7e8"
            emissive="#59c7e8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[-1.65, 0, 0]}>
          <planeGeometry args={[2.2, 3.2]} />
          <meshStandardMaterial
            color="#59c7e8"
            emissive="#59c7e8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        {/* External equipment boxes */}
        <mesh position={[2.1, -1.5, 0.6]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            color="#26384d"
            roughness={0.6}
            metalness={0.6}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[-2.1, 1.2, 0.6]}>
          <boxGeometry args={[0.5, 0.9, 0.5]} />
          <meshStandardMaterial
            color="#26384d"
            roughness={0.6}
            metalness={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Lower module - engineering section */}
      <group position={[-2.6, -4.2, 1.8]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 3.2, 16]} />
          <meshStandardMaterial
            color="#1a2636"
            roughness={0.55}
            metalness={0.7}
            toneMapped={false}
          />
        </mesh>

        {/* Module connection ring */}
        <mesh position={[0, 1.65, 0]}>
          <ringGeometry args={[1.25, 1.45, 20]} />
          <meshStandardMaterial
            color="#398bff"
            emissive="#398bff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Connecting corridor between core and left module */}
      <mesh position={[-2.6, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 5.2, 12]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.5}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Connecting corridor between core and right module */}
      <mesh position={[2.6, -1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 5.2, 12]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.5}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Connecting corridor between core and lower module */}
      <mesh position={[-1.3, -2.8, 0.9]}>
        <cylinderGeometry args={[0.4, 0.4, 2.8, 10]} />
        <meshStandardMaterial
          color="#101b2a"
          roughness={0.5}
          metalness={0.7}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
