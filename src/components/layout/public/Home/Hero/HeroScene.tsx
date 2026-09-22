"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const RED = "#e50914";
const WHITE = "#ffffff";

type Vec3 = [number, number, number];

interface SceneRefs {
  root: THREE.Group | null;
  core: THREE.Group | null;
  orbit1: THREE.Mesh | null;
  orbit2: THREE.Mesh | null;
  orbit3: THREE.Mesh | null;
  pod: THREE.Group | null;
  energy: THREE.Mesh | null;
  nodeLeft: THREE.Mesh | null;
  nodeCenter: THREE.Mesh | null;
  nodeRight: THREE.Mesh | null;
}

function EnergyCore({
  isDark,
  refs,
}: {
  isDark: boolean;
  refs: React.MutableRefObject<SceneRefs>;
}) {
  return (
    <group ref={(node) => (refs.current.core = node)}>
      {/* Main energy shell */}
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.72 : 0.48}
          wireframe
        />
      </mesh>

      {/* Inner shell */}
      <mesh scale={0.55}>
        <icosahedronGeometry args={[0.72, 1]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.3 : 0.16}
          wireframe
        />
      </mesh>

      {/* Energy center */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />

        <meshBasicMaterial color={isDark ? WHITE : RED} />
      </mesh>
    </group>
  );
}

function OrbitRing({
  radius,
  rotation,
  opacity,
  speed,
  refs,
  refKey,
}: {
  radius: number;
  rotation: Vec3;
  opacity: number;
  speed: number;
  refs: React.MutableRefObject<SceneRefs>;
  refKey: "orbit1" | "orbit2" | "orbit3";
}) {
  return (
    <mesh
      ref={(node) => {
        refs.current[refKey] = node;
      }}
      rotation={rotation}
    >
      <torusGeometry args={[radius, 0.008, 6, 64]} />

      <meshBasicMaterial color={RED} transparent opacity={opacity} />
    </mesh>
  );
}

function RoutePath() {
  const points = useMemo<Vec3[]>(
    () => [
      [-1.8, 0, 0],
      [0, 0.72, 0],
      [1.8, 0, 0],
    ],
    [],
  );

  return (
    <Line
      points={points}
      color={RED}
      transparent
      opacity={0.55}
      lineWidth={1}
    />
  );
}

function RouteNode({
  position,
  active = false,
  refs,
  refKey,
}: {
  position: Vec3;
  active?: boolean;
  refs: React.MutableRefObject<SceneRefs>;
  refKey: "nodeLeft" | "nodeCenter" | "nodeRight";
}) {
  return (
    <group position={position}>
      <mesh
        ref={(node) => {
          refs.current[refKey] = node;
        }}
      >
        <sphereGeometry args={[active ? 0.11 : 0.07, 12, 12]} />

        <meshBasicMaterial color={active ? WHITE : RED} />
      </mesh>

      {/* Node ring */}
      <mesh scale={active ? 2 : 1.6}>
        <ringGeometry args={[0.07, 0.08, 20]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={active ? 0.42 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function DeliveryPod({ refs }: { refs: React.MutableRefObject<SceneRefs> }) {
  return (
    <group
      ref={(node) => {
        refs.current.pod = node;
      }}
      position={[0.25, 0.15, 0]}
    >
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.8, 0.45, 0.48]} />

        <meshBasicMaterial color="#171717" />
      </mesh>

      {/* Red top */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.32]} />

        <meshBasicMaterial color={RED} />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.08, 0.245]}>
        <boxGeometry args={[0.45, 0.13, 0.025]} />

        <meshBasicMaterial color="#f5f5f5" />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.27, -0.18, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.07, 12]} />

        <meshBasicMaterial color={RED} />
      </mesh>

      <mesh position={[-0.27, -0.18, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.07, 12]} />

        <meshBasicMaterial color={RED} />
      </mesh>
    </group>
  );
}

function MovingEnergy({ refs }: { refs: React.MutableRefObject<SceneRefs> }) {
  return (
    <mesh
      ref={(node) => {
        refs.current.energy = node;
      }}
    >
      <sphereGeometry args={[0.045, 10, 10]} />

      <meshBasicMaterial color={WHITE} />
    </mesh>
  );
}

function SceneContent({ isDark }: { isDark: boolean }) {
  const refs = useRef<SceneRefs>({
    root: null,
    core: null,
    orbit1: null,
    orbit2: null,
    orbit3: null,
    pod: null,
    energy: null,
    nodeLeft: null,
    nodeCenter: null,
    nodeRight: null,
  });

  const elapsed = useRef(0);

  const { viewport } = useThree();

  const isMobile = viewport.width < 6;

  useFrame((state, delta) => {
    elapsed.current += delta;

    const time = elapsed.current;
    const current = refs.current;

    /*
     * Single animation loop
     * Instead of many independent useFrame calls.
     */

    // Main pointer interaction
    if (current.root) {
      const targetX = state.pointer.x * 0.08;
      const targetY = state.pointer.y * 0.05;

      current.root.rotation.y += (targetX - current.root.rotation.y) * 0.025;

      current.root.rotation.x += (-targetY - current.root.rotation.x) * 0.025;
    }

    // Energy core rotation
    if (current.core) {
      current.core.rotation.y += delta * 0.32;

      current.core.rotation.x = Math.sin(time * 0.7) * 0.07;

      current.core.position.y = Math.sin(time * 1.1) * 0.035;
    }

    // Orbit animations
    if (current.orbit1) {
      current.orbit1.rotation.z += delta * 0.65;
    }

    if (current.orbit2) {
      current.orbit2.rotation.z -= delta * 0.45;
    }

    if (current.orbit3) {
      current.orbit3.rotation.z += delta * 0.25;
    }

    // Delivery pod
    if (current.pod) {
      current.pod.rotation.y = Math.sin(time * 0.45) * 0.16;

      current.pod.position.y = 0.15 + Math.sin(time * 1.35) * 0.07;
    }

    // Moving delivery signal
    if (current.energy) {
      const progress = (time * 0.18) % 1;

      current.energy.position.x = -1.8 + progress * 3.6;

      current.energy.position.y = Math.sin(progress * Math.PI) * 0.72;
    }

    // Node pulse
    const pulse = 1 + Math.sin(time * 3.2) * 0.07;

    if (current.nodeLeft) {
      current.nodeLeft.scale.setScalar(pulse);
    }

    if (current.nodeCenter) {
      current.nodeCenter.scale.setScalar(1 + Math.sin(time * 3.2) * 0.1);
    }

    if (current.nodeRight) {
      current.nodeRight.scale.setScalar(pulse);
    }
  });

  const particleCount = isMobile ? (isDark ? 25 : 15) : isDark ? 45 : 25;

  return (
    <group
      ref={(node) => {
        refs.current.root = node;
      }}
    >
      {/* Lightweight lighting */}
      <ambientLight intensity={isDark ? 0.45 : 0.9} />

      <directionalLight position={[3, 4, 5]} intensity={isDark ? 1.4 : 1} />

      {/* Main energy core */}
      <EnergyCore isDark={isDark} refs={refs} />

      {/* Orbit rings */}
      <OrbitRing
        radius={1.05}
        rotation={[Math.PI / 2, 0.2, 0]}
        speed={0.65}
        opacity={isDark ? 0.4 : 0.26}
        refs={refs}
        refKey="orbit1"
      />

      <OrbitRing
        radius={1.3}
        rotation={[0.7, 0.3, 0.5]}
        speed={-0.45}
        opacity={isDark ? 0.24 : 0.15}
        refs={refs}
        refKey="orbit2"
      />

      <OrbitRing
        radius={1.55}
        rotation={[1.1, 0.2, 0.8]}
        speed={0.25}
        opacity={isDark ? 0.14 : 0.08}
        refs={refs}
        refKey="orbit3"
      />

      {/* Delivery */}
      <DeliveryPod refs={refs} />

      {/* Route */}
      <RoutePath />

      {/* Route nodes */}
      <RouteNode position={[-1.8, 0, 0]} refs={refs} refKey="nodeLeft" />

      <RouteNode
        position={[0, 0.72, 0]}
        active
        refs={refs}
        refKey="nodeCenter"
      />

      <RouteNode position={[1.8, 0, 0]} refs={refs} refKey="nodeRight" />

      {/* Moving signal */}
      <MovingEnergy refs={refs} />

      {/* Lightweight particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from(
                  { length: particleCount * 3 },
                  () => (Math.random() - 0.5) * 5,
                ),
              ),
              3,
            ]}
          />
        </bufferGeometry>

        <pointsMaterial
          color={isDark ? RED : RED}
          size={isMobile ? 0.025 : 0.035}
          transparent
          opacity={isDark ? 0.45 : 0.2}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Canvas
      camera={{
        position: [0, 0.1, 5.5],
        fov: 38,
        near: 0.1,
        far: 50,
      }}
      dpr={[1, 1.25]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop="always"
      fallback={null}
    >
      <SceneContent isDark={isDark} />
    </Canvas>
  );
}
