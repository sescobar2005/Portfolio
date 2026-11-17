'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const RING_ZONES = [
  { inner: 2.46, outer: 2.72, count: 800, color: '#3d5a80' },
  { inner: 2.83, outer: 3.17, count: 700, color: '#8fb4d8' },
  { inner: 3.23, outer: 3.42, count: 600, color: '#5a7fa8' },
  { inner: 3.51, outer: 3.58, count: 500, color: '#a8c4e8' },
];

const TOTAL_PARTICLES = 2600;

export default function RingParticles() {
  const particles = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(TOTAL_PARTICLES * 3);
    const sizes = new Float32Array(TOTAL_PARTICLES);
    const alphas = new Float32Array(TOTAL_PARTICLES);
    const colors = new Float32Array(TOTAL_PARTICLES * 3);

    let offset = 0;

    for (const zone of RING_ZONES) {
      const zoneColor = new THREE.Color(zone.color);

      for (let i = 0; i < zone.count; i++, offset++) {
        const radius =
          zone.inner + Math.random() * (zone.outer - zone.inner);

        const angle = Math.random() * Math.PI * 2;

        // Particles are laid out in the XY plane so that RingSystem's
        // equatorial tilt [-PI/2, 0, 0] maps them into the XZ plane,
        // matching the ring bands' orientation.
        positions[offset * 3] = Math.cos(angle) * radius;
        positions[offset * 3 + 1] = Math.sin(angle) * radius;
        positions[offset * 3 + 2] = (Math.random() - 0.5) * 0.025;

        sizes[offset] = 0.015 + Math.random() * 0.025;

        alphas[offset] = 0.3 + Math.random() * 0.6;

        const brightness = 0.7 + Math.random() * 0.6;
        colors[offset * 3] = zoneColor.r * brightness;
        colors[offset * 3 + 1] = zoneColor.g * brightness;
        colors[offset * 3 + 2] = zoneColor.b * brightness;
      }
    }

    const result = new THREE.BufferGeometry();

    result.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    result.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    result.setAttribute(
      'aAlpha',
      new THREE.BufferAttribute(alphas, 1),
    );
    result.setAttribute(
      'aColor',
      new THREE.BufferAttribute(colors, 3),
    );

    return result;
  }, []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <group ref={particles}>
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={`
            attribute float aSize;
            attribute float aAlpha;
            attribute vec3 aColor;

            varying float vAlpha;
            varying vec3 vColor;

            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

              vAlpha = aAlpha;
              vColor = aColor;

              gl_Position = projectionMatrix * mvPosition;
              gl_PointSize = aSize * (30.0 / max(1.0, -mvPosition.z));
            }
          `}
          fragmentShader={`
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
          `}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
