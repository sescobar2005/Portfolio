'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from './shaders/planet-vertex.glsl';
import fragmentShader from './shaders/planet-fragment.glsl';

// Precomputed inverse of the ring system rotation (constant).
// Both RingSystem and PlanetMesh share the same parent group, so the
// parent rotation cancels when transforming from planet-local to
// ring-local space.
const ringEuler = new THREE.Euler(1.12, 0.12, -0.28, 'XYZ');
const ringRot4 = new THREE.Matrix4().makeRotationFromEuler(ringEuler);
const ringRot = new THREE.Matrix3();
ringRot.set(
  ringRot4.elements[0],
  ringRot4.elements[1],
  ringRot4.elements[2],
  ringRot4.elements[4],
  ringRot4.elements[5],
  ringRot4.elements[6],
  ringRot4.elements[8],
  ringRot4.elements[9],
  ringRot4.elements[10],
);
const invRingRot = ringRot.clone().transpose();

// Reusable matrices to avoid allocations inside useFrame.
const planetRotY = new THREE.Matrix3();
const planetToRing = new THREE.Matrix3();

export default function PlanetMesh() {
  const planet = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPlanetToRing: { value: planetToRing.clone() },
      uLightDir: {
        value: new THREE.Vector3(-0.55, 0.65, 0.75).normalize(),
      },
      uRingBands1: { value: new THREE.Vector4(2.45, 2.72, 2.82, 3.18) },
      uRingBands2: { value: new THREE.Vector4(3.22, 3.42, 3.50, 3.58) },
    }),
    [],
  );

  useFrame((state, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (planet.current) {
      planet.current.rotation.y += delta * 0.025;

      const c = Math.cos(planet.current.rotation.y);
      const s = Math.sin(planet.current.rotation.y);
      planetRotY.set(c, 0, s, 0, 1, 0, -s, 0, c);

      planetToRing.copy(invRingRot).multiply(planetRotY);

      if (material.current) {
        material.current.uniforms.uPlanetToRing.value = planetToRing;
      }
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
