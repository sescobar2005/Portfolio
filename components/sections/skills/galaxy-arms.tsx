'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import { createGalaxyGeometry } from './galaxy-spiral';

export default function GalaxyArms() {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  const config = {
    particleCount: 4000,
    arms: 4,
    radius: 180,
    spin: 0.8,
    randomness: 0.2,
    randomnessPower: 2,
    thickness: 10,
  };

  const geometry = createGalaxyGeometry(config);

  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vColor;
      attribute float size;

      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * (30.0 / -mvPosition.z);
        vColor = color;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        vec2 centered = gl_PointCoord - vec2(0.5);
        float distanceToCenter = length(centered);

        if (distanceToCenter > 0.5) {
          discard;
        }

        float glow = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        float alpha = pow(glow, 2.0);

        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <mesh
      ref={(el) => (meshRef.current = el as unknown as THREE.Points)}
      geometry={geometry}
      material={material}
    />
  );
}
