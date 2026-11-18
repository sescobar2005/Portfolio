'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

import nebulaVertexShader from './shaders/nebula.vert.glsl';
import nebulaFragmentShader from './shaders/nebula.frag.glsl';

export default function GalaxyNebula() {
  const meshRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.015;
      meshRef.current.rotation.z += delta * 0.01;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 200;
    positions[i + 1] = (Math.random() - 0.5) * 100;
    positions[i + 2] = (Math.random() - 0.5) * 200;

    sizes[i] = Math.random() * 2 + 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
    },
  });

  useFrame((state) => {
    if (material.uniforms.uTime) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={(el) => (meshRef.current = el as unknown as THREE.Points)} geometry={geometry} material={material} />
  );
}
