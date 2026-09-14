"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.x = time * 0.08;
    meshRef.current.rotation.y = time * 0.12;

    meshRef.current.position.y = Math.sin(time * 0.45) * 0.12;
    meshRef.current.position.x = 3.2 + Math.cos(time * 0.3) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[3.2, 0, -1]} scale={2}>
      <icosahedronGeometry args={[1, 3]} />

      <meshBasicMaterial
        color="#e50914"
        transparent
        opacity={0.045}
        wireframe
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 80;
  const positions = new Float32Array(particleCount * 3);

  /**
   * Deterministic particle positions.
   *
   * IMPORTANT:
   * No Math.random() here.
   * This keeps the component safe from hydration mismatch.
   */
  for (let index = 0; index < particleCount; index++) {
    const x = ((index * 37) % 100) / 100;
    const y = ((index * 67) % 100) / 100;
    const z = ((index * 97) % 100) / 100;

    positions[index * 3] = (x - 0.5) * 14;
    positions[index * 3 + 1] = (y - 0.5) * 4;
    positions[index * 3 + 2] = (z - 0.5) * 5;
  }

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.012;
    pointsRef.current.rotation.x = Math.sin(time * 0.15) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#e50914"
        size={0.035}
        transparent
        opacity={0.3}
        sizeAttenuation
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

export default function FooterThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <Scene />
      </Canvas>

      {/* Red ambient glow */}
      <div className="absolute -bottom-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-red-600/[0.06] blur-3xl" />

      {/* Top glow */}
      <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-red-500/[0.04] blur-3xl" />
    </div>
  );
}
