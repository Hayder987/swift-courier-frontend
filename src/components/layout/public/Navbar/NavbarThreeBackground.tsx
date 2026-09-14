"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsedTimeRef = useRef(0);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    elapsedTimeRef.current += delta;

    const time = elapsedTimeRef.current;

    mesh.rotation.x = time * 0.08;
    mesh.rotation.y = time * 0.12;
    mesh.position.y = Math.sin(time * 0.5) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, 0]} scale={1.6}>
      <icosahedronGeometry args={[1, 3]} />

      <meshBasicMaterial
        color="#e50914"
        transparent
        opacity={0.045}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const elapsedTimeRef = useRef(0);

  const positions = useMemo(() => {
    const particleCount = 70;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index++) {
      const x = ((index * 37) % 100) / 100;
      const y = ((index * 67) % 100) / 100;
      const z = ((index * 97) % 100) / 100;

      particlePositions[index * 3] = (x - 0.5) * 12;
      particlePositions[index * 3 + 1] = (y - 0.5) * 2;
      particlePositions[index * 3 + 2] = (z - 0.5) * 3;
    }

    return particlePositions;
  }, []);

  useFrame((_state, delta) => {
    const points = pointsRef.current;

    if (!points) {
      return;
    }

    elapsedTimeRef.current += delta;

    const time = elapsedTimeRef.current;

    points.rotation.y = time * 0.015;
    points.position.x = Math.sin(time * 0.2) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#e50914"
        size={0.025}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <FloatingOrb />
      <FloatingParticles />
    </>
  );
}

export default function NavbarThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <Scene />
      </Canvas>

      {/* Soft SwiftCourier red ambient glow */}
      <div className="absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.035] blur-3xl" />
    </div>
  );
}
