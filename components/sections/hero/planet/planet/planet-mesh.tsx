'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from './shaders/planet-vertex.glsl';
import fragmentShader from './shaders/planet-fragment.glsl';

// Constant planet-to-ring transform. Rings sit in the planet's equatorial
// plane (flat in XZ, rotation [-PI/2, 0, 0] under the same axial group as
// the planet), so the transform from planet-local to ring-local space is a
// fixed inverse of the ring's equatorial tilt. No per-frame updates needed.
const invRingTilt = new THREE.Matrix3();
invRingTilt.set(
  1, 0, 0,
  0, 0, 1,
  0, -1, 0,
);

export default function PlanetMesh() {
  const planet = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPlanetToRing: { value: invRingTilt.clone() },
      uLightDir: {
        value: new THREE.Vector3(-0.55, 0.65, 0.75).normalize(),
      },
      uRingBands1: { value: new THREE.Vector4(2.45, 2.72, 2.82, 3.18) },
      uRingBands2: { value: new THREE.Vector4(3.22, 3.42, 3.50, 3.58) },
    }),
    [],
  );

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
