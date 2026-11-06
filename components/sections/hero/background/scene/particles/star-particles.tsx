'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface StarParticlesProps {
  position: [number, number, number];
  scale: [number, number, number];
  count: number;
  size: number;
  speed: number;
  opacity: number;
  noise: number;
  rotationSpeed: number;
  phase: number;
}

export default function StarParticles({
  position,
  scale,
  count,
  size,
  speed,
  opacity,
  noise,
  rotationSpeed,
  phase,
}: StarParticlesProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const result = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      positions[index] = THREE.MathUtils.randFloatSpread(scale[0]);
      positions[index + 1] = THREE.MathUtils.randFloatSpread(scale[1]);
      positions[index + 2] = THREE.MathUtils.randFloatSpread(scale[2]);

      phases[i] = Math.random() * Math.PI * 2;

      sizes[i] = size * (
        0.75 + Math.random() * 0.25 * noise
      );
    }

    result.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );

    result.setAttribute(
      'aPhase',
      new THREE.BufferAttribute(phases, 1),
    );

    result.setAttribute(
      'aSize',
      new THREE.BufferAttribute(sizes, 1),
    );

    return result;
  }, [count, scale, size, noise]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uSpeed: { value: speed },
    }),
    [opacity, speed],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (material.current) {
      material.current.uniforms.uTime.value = time;
    }

    if (group.current) {
      group.current.rotation.y =
        Math.sin(time * 0.025 + phase) * rotationSpeed;

      group.current.rotation.x =
        Math.cos(time * 0.018 + phase) * rotationSpeed * 0.5;
    }
  });

  return (
    <group ref={group} position={position}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          vertexShader={`
            uniform float uTime;
            uniform float uSpeed;

            attribute float aPhase;
            attribute float aSize;

            varying float vTwinkle;

            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

              gl_Position = projectionMatrix * mvPosition;

              float twinkle = sin(
                uTime * uSpeed * 0.7 + aPhase
              );

              vTwinkle = 0.94 + twinkle * 0.06;

              gl_PointSize = clamp(
                aSize * (30.0 / -mvPosition.z),
                1.0,
                9.0
              );
            }
          `}
          fragmentShader={`
            uniform float uOpacity;

            varying float vTwinkle;

            void main() {
              vec2 uv = gl_PointCoord - 0.5;

              float distanceToCenter = length(uv);

              float core = 1.0 - smoothstep(
                0.0,
                0.16,
                distanceToCenter
              );

              float halo = 1.0 - smoothstep(
                0.05,
                0.5,
                distanceToCenter
              );

              float alpha = (
                core * 0.35 + halo * 0.65
              ) * uOpacity * vTwinkle;

              vec3 color = mix(
                vec3(0.38, 0.52, 0.85),
                vec3(0.86, 0.93, 1.0),
                core
              );

              gl_FragColor = vec4(color, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}