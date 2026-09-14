"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 140;

const createParticlePositions = () => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;

    const angle = i * 2.399963;
    const radius = 2.8 + (((i * 17) % 100) / 100) * 3.2;

    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = (((i * 29) % 100) / 100 - 0.5) * 4.5;
    positions[i3 + 2] = Math.sin(angle) * radius - 1.5;
  }

  return positions;
};

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => createParticlePositions(), []);

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#e50914"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef} position={[2.8, 0.3, -1]}>
      {/* Main sphere */}
      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />

        <meshBasicMaterial
          color="#e50914"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.35, 2]} />

        <meshBasicMaterial
          color="#e50914"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Horizontal orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 8, 160]} />

        <meshBasicMaterial color="#e50914" transparent opacity={0.35} />
      </mesh>

      {/* Vertical orbit */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.95, 0.009, 8, 160]} />

        <meshBasicMaterial color="#e50914" transparent opacity={0.22} />
      </mesh>

      {/* Diagonal orbit */}
      <mesh rotation={[0.7, 0.5, 0.25]}>
        <torusGeometry args={[2.15, 0.007, 8, 160]} />

        <meshBasicMaterial color="#e50914" transparent opacity={0.15} />
      </mesh>

      {/* Core glow */}
      <mesh scale={0.35}>
        <sphereGeometry args={[1, 32, 32]} />

        <meshBasicMaterial color="#e50914" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function FloatingRing({
  position,
  rotation,
  scale,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) {
      return;
    }

    ringRef.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ringRef} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[0.8, 0.008, 8, 100]} />

      <meshBasicMaterial color="#e50914" transparent opacity={0.18} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <ParticleField />

      <OrbitalNetwork />

      <FloatingRing
        position={[-3.2, 1.6, -2]}
        rotation={[0.8, 0.4, 0.2]}
        scale={1.2}
        speed={0.08}
      />

      <FloatingRing
        position={[-3.8, -1.5, -1]}
        rotation={[1.1, 0.2, 0.8]}
        scale={0.7}
        speed={-0.06}
      />

      <FloatingRing
        position={[4, -1.8, -3]}
        rotation={[0.3, 1, 0.2]}
        scale={0.55}
        speed={0.05}
      />
    </>
  );
}

export default function Public3DScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      fallback={null}
    >
      <Scene />
    </Canvas>
  );
}
