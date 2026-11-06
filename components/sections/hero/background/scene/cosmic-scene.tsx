'use client';

import { Canvas } from '@react-three/fiber';

import SceneCamera from './camera/scene-camera';
import SceneLights from './lighting/scene-lights';
import NebulaClouds from './nebula/nebula-clouds';
import StarField from './stars/star-field';

function CosmicSceneContent() {
  return (
    <>
      <color attach="background" args={['#030611']} />

      <fog attach="fog" args={['#030611', 12, 35]} />

      <SceneCamera />
      <SceneLights />

      <NebulaClouds />
      <StarField />
    </>
  );
}

export default function CosmicScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
    >
      <CosmicSceneContent />
    </Canvas>
  );
}