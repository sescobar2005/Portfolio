'use client';

import { Canvas } from '@react-three/fiber';
import GalaxySceneContent from './galaxy-scene-content';
import styles from './technology-galaxy.module.css';

export default function GalaxyScene() {
  return (
    <section className={styles.technologyGalaxy}>
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 300], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
          }}
          frameloop="always"
          style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#050914' }}
        >
          <color attach="background" args={['#050914']} />
          <fog args={['#050914', 100, 800]} />
          <GalaxySceneContent />
        </Canvas>
      </div>
    </section>
  );
}
