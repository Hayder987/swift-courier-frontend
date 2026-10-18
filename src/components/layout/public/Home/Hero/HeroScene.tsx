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

/* ------------------------------------------------------------------ */
/*  Utility: memoized deterministic pseudo-random generator           */
/* ------------------------------------------------------------------ */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* ------------------------------------------------------------------ */
/*  Energy core                                                       */
/* ------------------------------------------------------------------ */
function EnergyCore({
  isDark,
  refs,
}: {
  isDark: boolean;
  refs: React.MutableRefObject<SceneRefs>;
}) {
  return (
    <group ref={(node) => (refs.current.core = node)}>
      {/* Outer shell */}
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.65 : 0.42}
          wireframe
        />
      </mesh>

      {/* Middle shell */}
      <mesh scale={0.72}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.38 : 0.24}
          wireframe
        />
      </mesh>

      {/* Inner shell */}
      <mesh scale={0.5}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.25 : 0.14}
          wireframe
        />
      </mesh>

      {/* Glow sphere (soft halo) */}
      <mesh scale={1.18}>
        <sphereGeometry args={[0.72, 16, 16]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.06 : 0.035}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Energy center */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color={isDark ? WHITE : RED} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbit ring                                                        */
/* ------------------------------------------------------------------ */
function OrbitRing({
  radius,
  rotation,
  opacity,
  refs,
  refKey,
}: {
  radius: number;
  rotation: Vec3;
  opacity: number;
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
      <torusGeometry args={[radius, 0.007, 6, 72]} />
      <meshBasicMaterial color={RED} transparent opacity={opacity} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Route path (curved, smooth)                                       */
/* ------------------------------------------------------------------ */
function RoutePath({ isDark }: { isDark: boolean }) {
  const points = useMemo<Vec3[]>(
    () => [
      [-1.8, 0, 0],
      [-1.2, 0.48, 0.05],
      [-0.5, 0.62, 0.02],
      [0, 0.72, 0],
      [0.5, 0.62, 0.02],
      [1.2, 0.48, 0.05],
      [1.8, 0, 0],
    ],
    [],
  );

  return (
    <Line
      points={points}
      color={RED}
      transparent
      opacity={isDark ? 0.55 : 0.35}
      lineWidth={1.2}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Route node                                                        */
/* ------------------------------------------------------------------ */
function RouteNode({
  position,
  active = false,
  isDark,
  refs,
  refKey,
}: {
  position: Vec3;
  active?: boolean;
  isDark: boolean;
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
        <sphereGeometry args={[active ? 0.1 : 0.065, 12, 12]} />
        <meshBasicMaterial color={active ? WHITE : RED} />
      </mesh>

      {/* Node halo ring */}
      <mesh scale={active ? 2.2 : 1.7}>
        <ringGeometry args={[0.065, 0.08, 24]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={active ? 0.45 : isDark ? 0.28 : 0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Extra soft glow for active node */}
      {active && (
        <mesh scale={3}>
          <ringGeometry args={[0.05, 0.065, 24]} />
          <meshBasicMaterial
            color={RED}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Delivery pod                                                      */
/* ------------------------------------------------------------------ */
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

      {/* Red accent top */}
      <mesh position={[0, 0.255, 0]}>
        <boxGeometry args={[0.62, 0.06, 0.36]} />
        <meshBasicMaterial color={RED} />
      </mesh>

      {/* Illuminated edge strip (front) */}
      <mesh position={[0, 0, 0.242]}>
        <boxGeometry args={[0.7, 0.012, 0.01]} />
        <meshBasicMaterial color={RED} transparent opacity={0.9} />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.08, 0.245]}>
        <boxGeometry args={[0.45, 0.13, 0.025]} />
        <meshBasicMaterial color="#f5f5f5" />
      </mesh>

      {/* Barcode accent on label */}
      <mesh position={[0.1, -0.08, 0.26]}>
        <boxGeometry args={[0.06, 0.09, 0.005]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* Wheels */}
      <mesh position={[0.27, -0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.07, 12]} />
        <meshBasicMaterial color={RED} />
      </mesh>
      <mesh position={[-0.27, -0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.07, 12]} />
        <meshBasicMaterial color={RED} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Moving energy signal                                              */
/* ------------------------------------------------------------------ */
function MovingEnergy({ refs }: { refs: React.MutableRefObject<SceneRefs> }) {
  return (
    <mesh
      ref={(node) => {
        refs.current.energy = node;
      }}
    >
      <sphereGeometry args={[0.04, 10, 10]} />
      <meshBasicMaterial color={WHITE} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene content                                                     */
/* ------------------------------------------------------------------ */
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
  const pointerTarget = useRef({ x: 0, y: 0 });

  const { viewport, gl } = useThree();

  const isMobile = viewport.width < 6;

  /* Deterministic particles – generated once */
  const particlePositions = useMemo(() => {
    const count = isMobile ? (isDark ? 22 : 14) : isDark ? 40 : 22;
    const rand = seededRandom(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 4.5;
      arr[i * 3 + 1] = (rand() - 0.5) * 3.5;
      arr[i * 3 + 2] = (rand() - 0.5) * 3;
    }
    return arr;
  }, [isMobile, isDark]);

  /* Pointer parallax with interpolation */
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerTarget.current.x = nx * 0.08;
      pointerTarget.current.y = ny * 0.05;
    };
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  /* Pause when hidden */
  const isVisible = useRef(true);
  useEffect(() => {
    const onVis = () => {
      isVisible.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* Reduced motion */
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useFrame((state, delta) => {
    if (!isVisible.current) return;

    const reduced = prefersReducedMotion.current;
    const speedMul = reduced ? 0.15 : 1;

    elapsed.current += delta * speedMul;
    const time = elapsed.current;
    const current = refs.current;

    // Root parallax
    if (current.root) {
      const tx = pointerTarget.current.x;
      const ty = pointerTarget.current.y;
      current.root.rotation.y += (tx - current.root.rotation.y) * 0.03;
      current.root.rotation.x += (-ty - current.root.rotation.x) * 0.03;
    }

    // Energy core
    if (current.core) {
      current.core.rotation.y += delta * 0.32 * speedMul;
      current.core.rotation.x = Math.sin(time * 0.7) * 0.07;
      current.core.position.y = Math.sin(time * 1.1) * 0.035;
    }

    // Orbit rings – different speeds & directions
    if (current.orbit1) current.orbit1.rotation.z += delta * 0.65 * speedMul;
    if (current.orbit2) current.orbit2.rotation.z -= delta * 0.45 * speedMul;
    if (current.orbit3) current.orbit3.rotation.z += delta * 0.25 * speedMul;

    // Delivery pod
    if (current.pod) {
      current.pod.rotation.y = Math.sin(time * 0.45) * 0.16;
      current.pod.position.y = 0.15 + Math.sin(time * 1.35) * 0.07;
    }

    // Moving energy along route
    if (current.energy) {
      const progress = (time * 0.18) % 1;
      const t = progress;

      // Quadratic bezier matching route shape
      const x = -1.8 + t * 3.6;
      const y = Math.sin(t * Math.PI) * 0.72;

      current.energy.position.x = x;
      current.energy.position.y = y;
      current.energy.position.z = 0.01;

      // Subtle scale pulse on signal
      const pulse = 1 + Math.sin(time * 6) * 0.25;
      current.energy.scale.setScalar(pulse);
    }

    // Node pulses
    const pulse1 = 1 + Math.sin(time * 3.2) * 0.07;
    const pulseCenter = 1 + Math.sin(time * 3.2) * 0.12;

    if (current.nodeLeft) current.nodeLeft.scale.setScalar(pulse1);
    if (current.nodeCenter) current.nodeCenter.scale.setScalar(pulseCenter);
    if (current.nodeRight) current.nodeRight.scale.setScalar(pulse1);
  });

  return (
    <group
      ref={(node) => {
        refs.current.root = node;
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={isDark ? 0.45 : 0.9} />
      <directionalLight position={[3, 4, 5]} intensity={isDark ? 1.4 : 1} />

      {/* Energy core */}
      <EnergyCore isDark={isDark} refs={refs} />

      {/* Orbit rings */}
      <OrbitRing
        radius={1.05}
        rotation={[Math.PI / 2, 0.2, 0]}
        opacity={isDark ? 0.4 : 0.26}
        refs={refs}
        refKey="orbit1"
      />
      <OrbitRing
        radius={1.3}
        rotation={[0.7, 0.3, 0.5]}
        opacity={isDark ? 0.24 : 0.15}
        refs={refs}
        refKey="orbit2"
      />
      <OrbitRing
        radius={1.55}
        rotation={[1.1, 0.2, 0.8]}
        opacity={isDark ? 0.14 : 0.08}
        refs={refs}
        refKey="orbit3"
      />

      {/* Delivery pod + ground shadow */}
      <DeliveryPod refs={refs} />
      <mesh position={[0.25, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 24]} />
        <meshBasicMaterial
          color={RED}
          transparent
          opacity={isDark ? 0.08 : 0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Route */}
      <RoutePath isDark={isDark} />

      {/* Route nodes */}
      <RouteNode
        position={[-1.8, 0, 0]}
        isDark={isDark}
        refs={refs}
        refKey="nodeLeft"
      />
      <RouteNode
        position={[0, 0.72, 0]}
        active
        isDark={isDark}
        refs={refs}
        refKey="nodeCenter"
      />
      <RouteNode
        position={[1.8, 0, 0]}
        isDark={isDark}
        refs={refs}
        refKey="nodeRight"
      />

      {/* Moving signal */}
      <MovingEnergy refs={refs} />

      {/* Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={RED}
          size={isMobile ? 0.022 : 0.032}
          transparent
          opacity={isDark ? 0.4 : 0.18}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Root component                                                    */
/* ------------------------------------------------------------------ */
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
