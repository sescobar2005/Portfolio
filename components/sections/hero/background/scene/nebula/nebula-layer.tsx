'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from './shaders/nebula-vertex.glsl';
import fragmentShader from './shaders/nebula-fragment.glsl';

interface NebulaLayerProps {
  position: [number, number, number];
  scale: [number, number, number];
  tint: string;
  opacity: number;
  seed: number;
  frequency: number;
}

export default function NebulaLayer({
  position,
  scale,
  tint,
  opacity,
  seed,
  frequency,
}: NebulaLayerProps) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const aspect = scale[0] / scale[1];

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uSeed: { value: seed },
      uFrequency: { value: frequency },
      uAspect: { value: aspect },
      uTint: { value: new THREE.Color(tint) },
    }),
    [opacity, seed, frequency, aspect, tint],
  );

  useFrame((state) => {
    if (!material.current) return;

    material.current.uniforms.uTime.value =
      state.clock.elapsedTime;
  });

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />

      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}