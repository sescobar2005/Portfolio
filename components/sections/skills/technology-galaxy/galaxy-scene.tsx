'use client';

import { Canvas } from '@react-three/fiber';
import GalaxySceneContent from './galaxy-scene-content';

export default function GalaxyScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 200], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
    >
      <color attach="background" args={['#050914']} />
      <fog args={['#050914', 100, 600]} />
      
      <GalaxySceneContent />
    </Canvas>
  );
}
