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
    const isFront = side === 'front';

    return new THREE.RingGeometry(
      innerRadius,
      outerRadius,
      256,
      1,
      isFront ? Math.PI : 0,
      Math.PI,
    );
  }, [innerRadius, outerRadius, side]);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={side === 'back' ? 1 : 2}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthTest
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}