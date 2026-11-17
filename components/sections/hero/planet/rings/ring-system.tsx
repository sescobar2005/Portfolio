'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import RingHalf from './ring-half';
import RingParticles from './ring-particles';
import { ORBITAL_REGIONS } from './orbital-config';

interface RingBandProps {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity: number;
}

function RingBand({
  innerRadius,
  outerRadius,
  color,
  opacity,
}: RingBandProps) {
  return (
    <>
      <RingHalf
        side="back"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={color}
        opacity={opacity}
      />

      <RingHalf
        side="front"
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        color={color}
        opacity={opacity}
      />
    </>
  );
}

export default function RingSystem() {
  const ringGroup = useRef<THREE.Group>(null);

  // Orbital rotation: rings rotate horizontally around the planet's Y axis,
  // simulating artificial satellites following their orbital path. Both bands
  // and particles move together as one coherent system.
  useFrame((state: any, delta: number) => {
    if (ringGroup.current) {
      ringGroup.current.rotation.y += delta * 0.06;
    }
  });

  // Fixed equatorial orientation: flat in the XZ plane, perpendicular to the
  // planet's axial rotation axis (Y). Inherits the parent group's axial spin
  // so rings stay aligned with the planet's equator.
  return (
    <group ref={ringGroup} rotation={[-Math.PI / 2, 0, 0]}>
      {ORBITAL_REGIONS.map((region, index) => (
        <RingBand
          key={index}
          innerRadius={region.innerRadius}
          outerRadius={region.outerRadius}
          color={region.color}
          opacity={region.opacity}
        />
      ))}

      <RingParticles />
    </group>
  );
}
