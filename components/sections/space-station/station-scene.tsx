'use client';

import { Canvas } from '@react-three/fiber';

import StationSceneContent from './station-scene-content';

export default function StationScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
    >
      <color attach="background" args={['#030711']} />
      <fog attach="fog" args={['#030711', 10, 60]} />

      <StationSceneContent />
    </Canvas>
  );
}
