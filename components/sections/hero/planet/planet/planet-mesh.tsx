'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import vertexShader from './shaders/planet-vertex.glsl';
import fragmentShader from './shaders/planet-fragment.glsl';

interface PlanetMeshProps {
  onPointerDown?: (event: unknown) => void;
  onPointerMove?: (event: unknown) => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export default function PlanetMesh({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPointerOver,
  onPointerOut,
}: PlanetMeshProps) {
  const planet = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLightDir: {
        value: new THREE.Vector3(-0.55, 0.65, 0.75).normalize(),
      },
    }),
    [],
  );

  useFrame((state: any) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={planet}
      renderOrder={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
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
