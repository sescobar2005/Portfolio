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

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uOpacity;

  attribute float aSize;
  attribute float aAlpha;
  attribute float aPhase;
  attribute vec3 aColor;

  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float twinkle = 0.88 + 0.12 * sin(
      uTime * uSpeed + aPhase
    );

    vAlpha = aAlpha * uOpacity * twinkle;
    vColor = aColor;

    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = aSize * (30.0 / max(1.0, -mvPosition.z));
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 centeredUv = gl_PointCoord - 0.5;
    float distanceToCenter = length(centeredUv);

    float halo = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
    float core = exp(-distanceToCenter * distanceToCenter * 42.0);

    float alpha = (halo * 0.45 + core * 0.75) * vAlpha;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

const starColors = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#dbeafe'),
  new THREE.Color('#9ecbff'),
  new THREE.Color('#b9f2ff'),
];

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
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(scale[0]);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(scale[1]);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(scale[2]);

      sizes[i] = size * THREE.MathUtils.randFloat(0.55, 1.45);

      alphas[i] = THREE.MathUtils.randFloat(
        0.55,
        Math.min(1, 0.75 + noise * 0.15),
      );

      phases[i] = Math.random() * Math.PI * 2;

      const color = starColors[
        Math.floor(Math.random() * starColors.length)
      ];

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );

    starGeometry.setAttribute(
      'aSize',
      new THREE.BufferAttribute(sizes, 1),
    );

    starGeometry.setAttribute(
      'aAlpha',
      new THREE.BufferAttribute(alphas, 1),
    );

    starGeometry.setAttribute(
      'aPhase',
      new THREE.BufferAttribute(phases, 1),
    );

    starGeometry.setAttribute(
      'aColor',
      new THREE.BufferAttribute(colors, 3),
    );

    return starGeometry;
  }, [count, scale, size, noise]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uOpacity: { value: opacity },
    }),
    [speed, opacity],
  );

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value =
        state.clock.elapsedTime;
    }

    if (!group.current) return;

    const time = state.clock.elapsedTime;

    group.current.rotation.y =
      Math.sin(time * 0.025 + phase) * rotationSpeed;

    group.current.rotation.x =
      Math.cos(time * 0.018 + phase) * rotationSpeed * 0.5;
  });

  return (
    <group ref={group} position={position}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}