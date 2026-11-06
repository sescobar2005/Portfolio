'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import ShootingStarTrail from './shooting-star-trail';

interface ShootingStarProps {
  speed: number;
  length: number;
  delay: number;
  direction: [number, number];
  bounds: [number, number];
}

export default function ShootingStar({
  speed,
  length,
  delay,
  direction,
  bounds,
}: ShootingStarProps) {
  const group = useRef<THREE.Group>(null);

  const progress = useRef(-delay);
  const opacity = useRef(0);

  const initialPosition = useMemo(
    () => [
      THREE.MathUtils.randFloatSpread(bounds[0]),
      THREE.MathUtils.randFloatSpread(bounds[1]),
      THREE.MathUtils.randFloat(-3, -9),
    ] as [number, number, number],
    [bounds],
  );

  useFrame((_, delta) => {
    const object = group.current;

    if (!object) return;

    progress.current += delta * speed;

    if (progress.current < 0) {
      opacity.current = 0;
      return;
    }

    if (progress.current >= 1) {
      progress.current = -THREE.MathUtils.randFloat(2, 7);

      initialPosition[0] = THREE.MathUtils.randFloatSpread(bounds[0]);
      initialPosition[1] = THREE.MathUtils.randFloatSpread(bounds[1]);

      opacity.current = 0;
      return;
    }

    const currentProgress = progress.current;

    const fadeIn = THREE.MathUtils.smoothstep(
      currentProgress,
      0,
      0.18,
    );

    const fadeOut = 1 - THREE.MathUtils.smoothstep(
      currentProgress,
      0.68,
      1,
    );

    opacity.current = fadeIn * fadeOut * 0.75;

    object.position.set(
      initialPosition[0] + direction[0] * currentProgress * 12,
      initialPosition[1] + direction[1] * currentProgress * 12,
      initialPosition[2],
    );
  });

  return (
    <group ref={group}>
      <ShootingStarTrail
        length={length}
        direction={direction}
        opacity={opacity}
      />
    </group>
  );
}