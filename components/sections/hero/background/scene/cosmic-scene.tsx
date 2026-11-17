'use client';

import { Canvas } from '@react-three/fiber';

import SceneCamera from './camera/scene-camera';
import NebulaClouds from './nebula/nebula-clouds';
import ShootingStars from './shooting-stars/shooting-stars';
import StarField from './stars/star-field';
import CosmicDust from './cosmic-dust/cosmic-dust';
import HeroStars from './stars/hero-stars';
import SceneLights from './lighting/scene-lights';

import PlanetSystem from '../../planet/planet-system';

function CosmicSceneContent() {
  return (
    <>
      <color attach="background" args={['#030611']} />
      <fog attach="fog" args={['#030611', 12, 35]} />

      <SceneCamera />
      <SceneLights />

      <NebulaClouds />

      <StarField />
      <HeroStars />

      <ShootingStars />
      <CosmicDust />

      <PlanetSystem />
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