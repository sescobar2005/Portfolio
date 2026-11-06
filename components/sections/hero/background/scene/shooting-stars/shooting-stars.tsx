import ShootingStar from './shooting-star';

const shootingStars = [
  {
    speed: 0.32,
    length: 1.5,
    delay: 1,
    direction: [-0.85, -0.5] as [number, number],
  },
  {
    speed: 0.24,
    length: 2.1,
    delay: 4,
    direction: [-0.75, -0.65] as [number, number],
  },
  {
    speed: 0.38,
    length: 1.2,
    delay: 7,
    direction: [-0.9, -0.4] as [number, number],
  },
  {
    speed: 0.28,
    length: 1.8,
    delay: 10,
    direction: [-0.8, -0.55] as [number, number],
  },
  {
    speed: 0.35,
    length: 1.4,
    delay: 13,
    direction: [-0.7, -0.7] as [number, number],
  },
];

export default function ShootingStars() {
  return (
    <group>
      {shootingStars.map((star, index) => (
        <ShootingStar
          key={index}
          {...star}
          bounds={[30, 16]}
        />
      ))}
    </group>
  );
}