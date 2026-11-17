'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Clouds() {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state: any) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={1.025}>
      <sphereGeometry args={[2, 64, 64]} />

      <shaderMaterial
        ref={material}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vUv = uv;
            vNormal = normal;
            gl_Position = projectionMatrix
              * modelViewMatrix
              * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;

          varying vec2 vUv;
          varying vec3 vNormal;

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

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;

            for (int i = 0; i < 4; i++) {
              value += noise(p) * amplitude;
              p *= 2.0;
              amplitude *= 0.5;
            }

            return value;
          }

          void main() {
            float time = uTime * 0.03;

            vec2 uv = vUv * 3.0;
            uv += vec2(time * 0.5, time * 0.3);

            float clouds = fbm(uv);
            clouds = smoothstep(0.45, 0.75, clouds);
            clouds = pow(clouds, 3.0);

            // Clouds are brighter on the illuminated side.
            float light = max(
              dot(vNormal, normalize(vec3(-0.55, 0.65, 0.75))),
              0.0
            );
            clouds *= light * 0.8 + 0.2;

            float alpha = clouds * 0.22;

            if (alpha < 0.01) discard;

            vec3 color = vec3(0.90, 0.95, 1.00);
            gl_FragColor = vec4(color, alpha);
          }
        `}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
