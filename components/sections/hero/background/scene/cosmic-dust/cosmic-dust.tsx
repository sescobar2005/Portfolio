import DustLayer from './dust-layer';

export default function CosmicDust() {
  return (
    <group>
      {/* Distant cosmic dust */}
      <DustLayer
        count={140}
        spread={[32, 18, 8]}
        size={0.45}
        opacity={0.07}
        color="#829bcf"
        speed={0.012}
      />

      {/* Mid-distance cosmic dust */}
      <DustLayer
        count={65}
        spread={[25, 15, 6]}
        size={0.65}
        opacity={0.09}
        color="#a3b8e8"
        speed={0.02}
      />

      {/* Foreground cosmic dust */}
      <DustLayer
        count={25}
        spread={[16, 10, 4]}
        size={0.85}
        opacity={0.12}
        color="#c3d5ff"
        speed={0.025}
      />
    </group>
  );
}