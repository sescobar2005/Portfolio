'use client';

import * as THREE from 'three';

export default function GalaxyCore() {
  return (
    <group>
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[12, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[10, 64, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[6, 64, 64]} />
        <meshBasicMaterial
          color="#ffa500"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
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
