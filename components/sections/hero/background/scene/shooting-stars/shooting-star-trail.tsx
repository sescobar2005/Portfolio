'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface ShootingStarTrailProps {
  length: number;
  opacity: { current: number };
  direction: [number, number];
}

export default function ShootingStarTrail({
  length,
  opacity,
  direction,
}: ShootingStarTrailProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const headMaterial = useRef<THREE.MeshBasicMaterial>(null);

  const angle = Math.atan2(direction[1], direction[0]);

  const uniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
    }),
    [],
  );

  useFrame(() => {
    const value = opacity.current;

    if (material.current) {
      material.current.uniforms.uOpacity.value = value;
    }

    if (headMaterial.current) {
      headMaterial.current.opacity = value;
    }
  });

  return (
    <group rotation={[0, 0, angle]}>
      {/* Luminous trail */}
      <mesh position={[-length / 2, 0, 0]}>
        <planeGeometry args={[length, 0.035]} />

        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          vertexShader={`
            varying vec2 vUv;

            void main() {
              vUv = uv;

              gl_Position = projectionMatrix
                * modelViewMatrix
                * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uOpacity;
            varying vec2 vUv;

            void main() {
              float tail = smoothstep(0.0, 0.65, vUv.x);
              float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;

              float alpha = tail * edge * uOpacity;

              vec3 color = mix(
                vec3(0.12, 0.28, 0.65),
                vec3(0.65, 0.82, 1.0),
                vUv.x
              );

              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </mesh>

      {/* Star head */}
      <mesh>
        <sphereGeometry args={[0.025, 12, 12]} />

        <meshBasicMaterial
          ref={headMaterial}
          color="#dbeafe"
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}