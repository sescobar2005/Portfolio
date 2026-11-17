'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from './shaders/planet-vertex.glsl';
import fragmentShader from './shaders/planet-fragment.glsl';

export default function PlanetMesh() {
  const planet = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value =
        state.clock.elapsedTime;
    }

    if (planet.current) {
      planet.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <mesh ref={planet}>
      <sphereGeometry args={[2, 160, 160]} />

      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        toneMapped={false}
      />
    </mesh>
  );
}