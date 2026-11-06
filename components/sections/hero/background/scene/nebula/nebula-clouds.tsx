import NebulaLayer from './nebula-layer';

export default function NebulaClouds() {
  return (
    <group>
      {/* Main blue nebula */}
      <NebulaLayer
        position={[-5, 1.5, -9]}
        scale={[17, 10, 1]}
        tint="#2457a8"
        opacity={0.34}
        seed={1.2}
        frequency={2.1}
      />

      {/* Violet nebula */}
      <NebulaLayer
        position={[5, -1, -12]}
        scale={[18, 11, 1]}
        tint="#6536a8"
        opacity={0.32}
        seed={4.7}
        frequency={1.9}
      />

      {/* Cyan atmospheric layer */}
      <NebulaLayer
        position={[0, 3, -15]}
        scale={[20, 9, 1]}
        tint="#167caa"
        opacity={0.27}
        seed={8.3}
        frequency={2.3}
      />
    </group>
  );
}