'use client';

import { Canvas } from '@react-three/fiber';
import GalaxySceneContent from './galaxy-scene-content';

export default function GalaxyScene() {
  return (
    <section className="galaxy-container">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        <GalaxySceneContent />
      </Canvas>
    </section>
  );
}
