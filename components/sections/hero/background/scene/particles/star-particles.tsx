import { Sparkles } from '@react-three/drei';

export default function StarParticles() {
  return (
    <>
      <Sparkles
        count={1200}
        scale={[35, 20, 25]}
        size={1.5}
        speed={0.15}
        opacity={0.65}
        color="#dbeafe"
        noise={1}
      />

      <Sparkles
        count={350}
        scale={[25, 15, 18]}
        size={3}
        speed={0.3}
        opacity={0.8}
        color="#93c5fd"
        noise={1.5}
      />

      <Sparkles
        count={80}
        scale={[18, 10, 12]}
        size={5}
        speed={0.2}
        opacity={0.7}
        color="#c4b5fd"
        noise={2}
      />
    </>
  );
}