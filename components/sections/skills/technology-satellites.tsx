'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import { TECHNICAL_INVENTORY, TECH_LOGOS, TechnologyCategory } from './technical-data';

export default function TechnologySatellites() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.03;
    }
  });

  const ALL_TECHNOLOGIES = TECHNICAL_INVENTORY.flatMap((cat: TechnologyCategory) =>
    cat.technologies.map((tech: string) => ({
      name: tech,
      logoUrl: TECH_LOGOS[tech],
      color: cat.color,
    }))
  );

  return (
    <group ref={(el) => (meshRef.current = el as unknown as THREE.Group)}>
      {ALL_TECHNOLOGIES.map((tech, index) => {
        const angleDeg = (index / ALL_TECHNOLOGIES.length) * 360;
        const radius = 140 + Math.sin(index * 0.7) * 30;
        const x = Math.cos((angleDeg * Math.PI) / 180) * radius;
        const y = Math.sin((angleDeg * Math.PI) / 180) * radius * 0.5;
        const z = Math.cos((angleDeg * Math.PI) / 180) * radius * 0.3;

        return (
          <mesh
            key={tech.name}
            position={[x, y, z]}
          >
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial
              map={new THREE.TextureLoader().load(tech.logoUrl)}
              transparent
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
