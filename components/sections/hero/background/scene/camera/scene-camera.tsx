import { PerspectiveCamera } from '@react-three/drei';

export default function SceneCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 8]}
      fov={60}
      near={0.1}
      far={100}
    />
  );
}