import StarParticles from '../particles/star-particles';

export default function StarField() {
  return (
    <group>
      {/* Distant stars */}
      <StarParticles
        position={[0, 0, -14]}
        scale={[38, 22, 10]}
        count={550}
        size={1.1}
        speed={0.08}
        opacity={0.42}
        noise={1}
        rotationSpeed={0.008}
        phase={0}
      />

      {/* Mid-distance stars */}
      <StarParticles
        position={[0, 0, -5]}
        scale={[30, 18, 8]}
        count={260}
        size={2}
        speed={0.16}
        opacity={0.62}
        noise={1.4}
        rotationSpeed={0.015}
        phase={2}
      />

      {/* Foreground stars */}
      <StarParticles
        position={[0, 0, 1.5]}
        scale={[16, 10, 5]}
        count={75}
        size={3.5}
        speed={0.22}
        opacity={0.78}
        noise={1.8}
        rotationSpeed={0.025}
        phase={4}
      />
    </group>
  );
}