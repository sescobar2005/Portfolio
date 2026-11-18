'use client';

import { Canvas } from '@react-three/fiber';
import GalaxySceneContent from './galaxy-scene-content';
import styles from './technology-galaxy.module.css';

export default function GalaxyScene() {
  return (
    <section className={styles.technologyGalaxy}>
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 250], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          frameloop="always"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Fondo plano 3D para garantizar fondo oscuro */}
          <mesh position={[0, 0, -500]}>
            <planeGeometry args={[2000, 2000]} />
            <meshBasicMaterial color="#050914" toneMapped={false} />
          </mesh>

          <fog args={['#050914', 100, 800]} />

          <GalaxySceneContent />
        </Canvas>
      </div>
    </section>
  );
}
