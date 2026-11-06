'use client';

import { Canvas } from '@react-three/fiber';

import SceneCamera from './camera/scene-camera';
import SceneLights from './lighting/scene-lights';
import NebulaClouds from './nebula/nebula-clouds';
import ShootingStars from './shooting-stars/shooting-stars';
import StarField from './stars/star-field';
import CosmicDust from './cosmic-dust/cosmic-dust';
import CosmicEffects from './effects/cosmic-effects';

function CosmicSceneContent() {
  return (
    <>
      <color attach="background" args={['#030611']} />
      <fog attach="fog" args={['#030611', 12, 35]} />

      <SceneCamera />
      <SceneLights />

      <NebulaClouds />
      <StarField />
      <ShootingStars />
      <CosmicDust />

      <CosmicEffects />
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