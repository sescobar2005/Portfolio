'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface DustLayerProps {
  count: number;
  spread: [number, number, number];
  size: number;
  opacity: number;
  color: string;
  speed: number;
}

export default function DustLayer({
  count,
  spread,
  size,
  opacity,
  color,
  speed,
}: DustLayerProps) {
  const { geometry, positions, phases, velocities } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(spread[0]);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(spread[1]);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(spread[2]);

      phases[i] = Math.random() * Math.PI * 2;
      velocities[i] = 0.5 + Math.random() * 0.5;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );

    return { geometry, positions, phases, velocities };
  }, [count, spread]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uSize: { value: size },
    }),
    [color, opacity, size],
  );

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      positions[index + 1] += speed * velocities[i] * delta;

      positions[index] +=
        Math.sin(time * 0.15 + phases[i]) * 0.001;

      positions[index + 2] +=
        Math.sin(time * 0.12 + phases[i]) * 0.001;

      if (positions[index + 1] > spread[1] / 2) {
        positions[index + 1] = -spread[1] / 2;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        vertexShader={`
          uniform float uSize;

          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            gl_Position = projectionMatrix * mvPosition;

            gl_PointSize = uSize * (30.0 / -mvPosition.z);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float distanceToCenter = length(uv);

            float alpha = 1.0 - smoothstep(
              0.05,
              0.5,
              distanceToCenter
            );

            alpha *= uOpacity;

            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}