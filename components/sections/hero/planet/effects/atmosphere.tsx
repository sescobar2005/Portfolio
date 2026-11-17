'use client';

import * as THREE from 'three';

const vertexShader = `
  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uLightDirection;
  uniform float uOpacity;
  uniform float uPower;

  varying vec3 vWorldNormal;
  varying vec3 vViewDirection;

  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(vViewDirection);

    float fresnel = 1.0 - max(
      dot(normal, viewDirection),
      0.0
    );

    float light = max(
      dot(normal, normalize(uLightDirection)),
      0.0
    );

    float atmosphere = pow(fresnel, uPower);

    float lightMask = 0.2 + light * 0.8;

    vec3 color = mix(
      uColor * 0.55,
      uColor,
      smoothstep(0.05, 0.95, fresnel)
    );

    float alpha = atmosphere * uOpacity * lightMask;

    if (alpha < 0.003) discard;

    gl_FragColor = vec4(color * lightMask, alpha);
  }
`;

interface AtmosphereLayerProps {
  scale: number;
  opacity: number;
  power: number;
  color: string;
}

function AtmosphereLayer({
  scale,
  opacity,
  power,
  color,
}: AtmosphereLayerProps) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[2, 160, 160]} />

      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uColor: {
            value: new THREE.Color(color),
          },
          uLightDirection: {
            value: new THREE.Vector3(-0.55, 0.65, 0.75).normalize(),
          },
          uOpacity: {
            value: opacity,
          },
          uPower: {
            value: power,
          },
        }}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Atmosphere() {
  return (
    <group>
      {/* Inner atmospheric scattering */}
      <AtmosphereLayer
        scale={1.018}
        opacity={0.42}
        power={5.5}
        color="#398bff"
      />

      {/* Middle atmospheric glow */}
      <AtmosphereLayer
        scale={1.055}
        opacity={0.20}
        power={3.0}
        color="#398bff"
      />

      {/* Wide, soft outer diffusion */}
      <AtmosphereLayer
        scale={1.105}
        opacity={0.075}
        power={1.65}
        color="#62baff"
      />
    </group>
  );
}