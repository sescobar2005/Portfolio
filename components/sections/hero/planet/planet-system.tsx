'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import PlanetMesh from './planet/planet-mesh';
import Atmosphere from './effects/atmosphere';
import Clouds from './effects/clouds';
import RingSystem from './rings/ring-system';

export default function PlanetSystem() {
  const planetGroupRef = useRef<THREE.Group>(null);
  const axialGroupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Drag state kept in refs to avoid React re-renders during pointer movement.
  const isDraggingRef = useRef(false);
  const startMouseRef = useRef({ x: 0, y: 0 });
  const startQuaternionRef = useRef(new THREE.Quaternion());
  const targetQuaternionRef = useRef(new THREE.Quaternion());
  const currentQuaternionRef = useRef(new THREE.Quaternion());

  // Hover state only changes on pointer-over/out, not every move frame.
  const [isHovering, setIsHovering] = useState(false);

  // Capture the canvas element for cursor styling on hover.
  useEffect(() => {
    const canvas = gl?.domElement;
    if (canvas) {
      canvas.style.cursor = 'default';
    }
  }, [gl]);

  // Automatic axial rotation — spins planet, rings, and atmosphere together
  // around the planet's local Y axis. Independent of user drag.
  useFrame((state, delta) => {
    if (axialGroupRef.current) {
      axialGroupRef.current.rotation.y += delta * 0.025;
    }

    // Smoothly interpolate toward the target quaternion for fluid drag rotation.
    if (planetGroupRef.current) {
      const current = planetGroupRef.current.quaternion;
      const target = targetQuaternionRef.current;

      // Slerp factor: higher = snappier, lower = smoother/slower.
      const t = Math.min(delta * 12, 1);
      current.slerpQuaternions(current, target, t);
      planetGroupRef.current.quaternion.copy(current);
    }
  });

  // Ensure dragging is never left stuck if the pointer is released outside
  // the canvas or the window loses focus.
  useEffect(() => {
    const handleWindowPointerUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointerup', handleWindowPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleWindowPointerUp);
    };
  }, []);

  const handlePointerDown = (event: unknown) => {
    const pointerEvent = event as PointerEvent;
    if (pointerEvent.button !== 0) return;
    isDraggingRef.current = true;
    startMouseRef.current = { x: pointerEvent.clientX, y: pointerEvent.clientY };
    startQuaternionRef.current.copy(planetGroupRef.current!.quaternion);
    targetQuaternionRef.current.copy(planetGroupRef.current!.quaternion);
    currentQuaternionRef.current.copy(planetGroupRef.current!.quaternion);
  };

  const handlePointerMove = (event: unknown) => {
    if (!isDraggingRef.current || !planetGroupRef.current) return;

    const pointerEvent = event as PointerEvent;
    const dx = pointerEvent.clientX - startMouseRef.current.x;
    const dy = pointerEvent.clientY - startMouseRef.current.y;

    const sensitivity = 0.005;
    const qY = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      dx * sensitivity,
    );
    const qX = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      -dy * sensitivity,
    );

    targetQuaternionRef.current
      .copy(startQuaternionRef.current)
      .multiply(qY)
      .multiply(qX)
      .normalize();
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
  };

  const setCursor = (cursor: string) => {
    const canvas = gl?.domElement;
    if (canvas) {
      canvas.style.cursor = cursor;
    }
  };

  return (
    <group position={[2.6, -0.15, -3.5]} rotation={[0.12, 0, -0.12]}>
      <group ref={planetGroupRef}>
        {/* Invisible hit sphere slightly larger than the planet (radius 2.0)
            so it captures pointer events across the full planetary disk,
            including the back-facing side. */}
        <mesh
          geometry={new THREE.SphereGeometry(2.15, 32, 32)}
          material={new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
          })}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerOver={() => {
            setIsHovering(true);
            setCursor('grab');
          }}
          onPointerOut={() => {
            setIsHovering(false);
            setCursor('default');
          }}
        />

        <group ref={axialGroupRef}>
          <PlanetMesh />
          <Atmosphere />
          <Clouds />
          <RingSystem />
        </group>
      </group>
    </group>
  );
}
