'use client';

import { Bloom, EffectComposer } from '@react-three/postprocessing';

export default function CosmicEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.45}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.05}
        mipmapBlur
      />
    </EffectComposer>
  );
}