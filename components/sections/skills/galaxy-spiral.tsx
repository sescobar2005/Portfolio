'use client';

import * as THREE from 'three';

interface GalaxyConfig {
  particleCount: number;
  arms: number;
  radius: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  thickness: number;
}

export function createGalaxyGeometry(config: GalaxyConfig) {
  const positions = new Float32Array(config.particleCount * 3);
  const colors = new Float32Array(config.particleCount * 3);
  const sizes = new Float32Array(config.particleCount);

  const colorCore = new THREE.Color('#fff0d5');
  const colorBlue = new THREE.Color('#2466bd');
  const colorCyan = new THREE.Color('#36c6e8');
  const colorPurple = new THREE.Color('#8150d5');
  const colorMagenta = new THREE.Color('#d45bb8');

  for (let i = 0; i < config.particleCount; i++) {
    // Logarithmic spiral radius distribution
    const radius = Math.pow(Math.random(), 0.65) * config.radius;

    const arm = i % config.arms;
    const armAngle = (arm / config.arms) * Math.PI * 2;
    const spinAngle = radius * config.spin;

    const angle = armAngle + spinAngle;

    const randomness =
      Math.pow(Math.random(), config.randomnessPower) *
      config.randomness *
      radius / config.radius;

    const offsetX = (Math.random() - 0.5) * randomness;
    const offsetY = (Math.random() - 0.5) *
      config.thickness *
      (1 - radius / config.radius);

    const offsetZ = (Math.random() - 0.5) * randomness;

    positions[i * 3] =
      Math.cos(angle) * radius + offsetX;

    positions[i * 3 + 1] = offsetY;

    positions[i * 3 + 2] =
      Math.sin(angle) * radius + offsetZ;

    const normalizedRadius = radius / config.radius;
    const galaxyColor = new THREE.Color();

    if (normalizedRadius < 0.15) {
      galaxyColor.copy(colorCore);
    } else if (normalizedRadius < 0.45) {
      galaxyColor.copy(colorCyan).lerp(
        colorBlue,
        normalizedRadius
      );
    } else {
      galaxyColor.copy(colorPurple).lerp(
        colorMagenta,
        Math.random() * 0.55
      );
    }

    galaxyColor.multiplyScalar(
      0.75 + Math.random() * 0.5
    );

    colors[i * 3] = galaxyColor.r;
    colors[i * 3 + 1] = galaxyColor.g;
    colors[i * 3 + 2] = galaxyColor.b;

    sizes[i] = 0.5 + Math.random() * 1.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
  );

  geometry.setAttribute(
    'size',
    new THREE.BufferAttribute(sizes, 1)
  );

  return geometry;
}
