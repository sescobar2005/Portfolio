'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface RingHalfProps {
  side: 'front' | 'back';
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
}

export default function RingHalf({
  side,
  innerRadius,
  outerRadius,
  color,
  opacity,
}: RingHalfProps) {
  const geometry = useMemo(() => {
    // Full 360-degree ring geometry. No startAngle/endAngle split, so the
    // ring forms a complete annulus with no seam between front and back.
    return new THREE.RingGeometry(innerRadius, outerRadius, 256);
  }, [innerRadius, outerRadius]);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix
              * modelViewMatrix
              * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;

          varying vec2 vUv;

          float hash(vec2 p) {
            return fract(
              sin(dot(p, vec2(127.1, 311.7)))
              * 43758.5453
            );
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(
              mix(a, b, f.x),
              mix(c, d, f.x),
              f.y
            );
          }

          void main() {
            float n = noise(vUv * 6.0);
            float radialStructure = 0.88 + n * 0.12;
            float alpha = uOpacity * radialStructure;

            if (alpha < 0.01) discard;

            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
        }}
        transparent
        side={THREE.DoubleSide}
        depthTest
        depthWrite={true}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
