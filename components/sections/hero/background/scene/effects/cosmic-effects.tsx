'use client';

import { Bloom, EffectComposer } from '@react-three/postprocessing';

export default function CosmicEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
    </EffectComposer>
  );
}