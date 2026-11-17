'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import vertexShader from './shaders/planet-vertex.glsl';
import fragmentShader from './shaders/planet-fragment.glsl';

// Constant planet-to-ring transform. Rings sit in the planet's equatorial
// plane (flat in XZ, rotation [-PI/2, 0, 0] under the same axial group as
// the planet), so the transform from planet-local to ring-local space is a
// fixed inverse of the ring's equatorial tilt.
const invRingTilt = new THREE.Matrix3();
invRingTilt.set(
  1, 0, 0,
  0, 0, -1,
  0, 1, 0,
);

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
      uPlanetToRing: { value: invRingTilt.clone() },
      uRingOrbitAngle: { value: 0 },
      uLightDir: {
        value: new THREE.Vector3(-0.55, 0.65, 0.75).normalize(),
      },
      uRingBands1: { value: new THREE.Vector4(2.45, 2.72, 2.82, 3.18) },
      uRingBands2: { value: new THREE.Vector4(3.22, 3.42, 3.50, 3.58) },
    }),
    [],
  );

  useFrame((state: any, delta: number) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Ring orbital rotation speed matches RingSystem (0.06 rad/frame).
      // This keeps planet ring shadows synchronized with ring movement.
      material.current.uniforms.uRingOrbitAngle.value =
        state.clock.elapsedTime * 0.06;
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
