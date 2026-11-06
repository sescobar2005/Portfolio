'use client';

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

const stars = [
  { position: [-7.2, 2.8, -5.5], size: 4.2, color: '#dbeafe' },
  { position: [6.5, 2.1, -7.0], size: 5.0, color: '#b9e8ff' },
  { position: [-3.5, -2.5, -4.5], size: 3.5, color: '#ffffff' },
  { position: [2.8, 3.8, -10.0], size: 5.5, color: '#c4d2ff' },
  { position: [8.0, -2.8, -8.0], size: 4.0, color: '#d5f5ff' },
  { position: [-8.5, -1.8, -9.0], size: 3.8, color: '#ffffff' },
] as const;

function createStarGeometry() {
  const shape = new THREE.Shape();

  const points = [
    [0, 0.24],
    [0.045, 0.045],
    [0.24, 0],
    [0.045, -0.045],
    [0, -0.24],
    [-0.045, -0.045],
    [-0.24, 0],
    [-0.045, 0.045],
  ];

  points.forEach(([x, y], index) => {
    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });

  shape.closePath();

  return new THREE.ShapeGeometry(shape);
}

export default function HeroStars() {
  const resources = useMemo(() => {
    const geometry = createStarGeometry();
    const coreGeometry = new THREE.CircleGeometry(0.014, 24);

    const materials = stars.map((star) => {
      const color = new THREE.Color(star.color);

      return {
        star: new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
          side: THREE.DoubleSide,
        }),

        core: new THREE.MeshBasicMaterial({
          color: '#dbeafe',
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          toneMapped: false,
        }),
      };
    });

    return {
      geometry,
      coreGeometry,
      materials,
    };
  }, []);

  useEffect(() => {
    return () => {
      resources.geometry.dispose();
      resources.coreGeometry.dispose();

      resources.materials.forEach((material) => {
        material.star.dispose();
        material.core.dispose();
      });
    };
  }, [resources]);

  return (
    <group>
      {stars.map((star, index) => {
        const material = resources.materials[index];
        const scale = star.size / 4.5;

        return (
          <group
            key={index}
            position={star.position}
            scale={scale}
          >
            {/* Four-point star */}
            <mesh
              geometry={resources.geometry}
              material={material.star}
            />

            {/* Subtle central light */}
            <mesh
              geometry={resources.coreGeometry}
              material={material.core}
              position={[0, 0, 0.01]}
            />
          </group>
        );
      })}
    </group>
  );
}