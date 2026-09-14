"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function EnergyCore({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.35;

    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />

        <meshStandardMaterial
          color="#e50914"
          emissive="#e50914"
          emissiveIntensity={isDark ? 2.5 : 1.4}
          roughness={0.18}
          metalness={0.85}
          wireframe
          transparent
          opacity={isDark ? 0.8 : 0.55}
        />
      </mesh>

      <mesh scale={0.55}>
        <icosahedronGeometry args={[0.72, 2]} />

        <meshBasicMaterial
          color="#e50914"
          wireframe
          transparent
          opacity={isDark ? 0.35 : 0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />

        <meshBasicMaterial color={isDark ? "#ffffff" : "#e50914"} />
      </mesh>

      <pointLight color="#e50914" intensity={isDark ? 8 : 4} distance={5} />
    </group>
  );
}

function OrbitRing({
  radius,
  rotation,
  speed,
  opacity,
}: {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 10, 180]} />

      <meshBasicMaterial color="#e50914" transparent opacity={opacity} />
    </mesh>
  );
}

function RouteBeam({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + 0.55,
      (start[2] + end[2]) / 2,
    ),
    new THREE.Vector3(...end),
  ];

  const curve = new THREE.CatmullRomCurve3(points);

  const geometry = new THREE.TubeGeometry(curve, 48, 0.012, 8, false);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color="#e50914" transparent opacity={0.65} />
    </mesh>
  );
}

function RouteNode({
  position,
  active = false,
}: {
  position: [number, number, number];
  active?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 3.5) * 0.08;

    ref.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[active ? 0.12 : 0.075, 24, 24]} />

        <meshStandardMaterial
          color={active ? "#ffffff" : "#e50914"}
          emissive="#e50914"
          emissiveIntensity={active ? 5 : 2}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      <mesh scale={active ? 2.2 : 1.7}>
        <ringGeometry args={[0.07, 0.085, 32]} />

        <meshBasicMaterial
          color="#e50914"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {active && <pointLight color="#e50914" intensity={3} distance={2} />}
    </group>
  );
}

function DeliveryPod() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.18;

    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0.25, 0.15, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.45, 0.48]} />

        <meshStandardMaterial
          color="#171717"
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.32]} />

        <meshStandardMaterial
          color="#e50914"
          emissive="#e50914"
          emissiveIntensity={1.8}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, -0.08, 0.245]}>
        <boxGeometry args={[0.45, 0.13, 0.025]} />

        <meshBasicMaterial color="#f5f5f5" />
      </mesh>

      <mesh position={[0.27, -0.18, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 24]} />

        <meshStandardMaterial
          color="#e50914"
          emissive="#e50914"
          emissiveIntensity={1}
        />
      </mesh>

      <mesh position={[-0.27, -0.18, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 24]} />

        <meshStandardMaterial
          color="#e50914"
          emissive="#e50914"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

function MovingEnergy() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const progress = (state.clock.elapsedTime * 0.18) % 1;

    ref.current.position.x = -1.8 + progress * 3.6;

    ref.current.position.y = 0.15 + Math.sin(progress * Math.PI) * 0.75;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 16, 16]} />

      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
}

function SceneContent({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const targetX = state.pointer.x * 0.08;
    const targetY = state.pointer.y * 0.05;

    groupRef.current.rotation.y +=
      (targetX - groupRef.current.rotation.y) * 0.025;

    groupRef.current.rotation.x +=
      (-targetY - groupRef.current.rotation.x) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={isDark ? 0.5 : 1.1} />

      <directionalLight position={[3, 4, 5]} intensity={isDark ? 2 : 1.6} />

      <pointLight
        position={[0, 1, 1]}
        color="#e50914"
        intensity={isDark ? 4 : 2.5}
        distance={7}
      />

      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.3}>
        <EnergyCore isDark={isDark} />

        <OrbitRing
          radius={1.05}
          rotation={[Math.PI / 2, 0.2, 0]}
          speed={0.8}
          opacity={isDark ? 0.42 : 0.3}
        />

        <OrbitRing
          radius={1.3}
          rotation={[0.7, 0.3, 0.5]}
          speed={-0.55}
          opacity={isDark ? 0.25 : 0.18}
        />

        <OrbitRing
          radius={1.55}
          rotation={[1.1, 0.2, 0.8]}
          speed={0.3}
          opacity={isDark ? 0.16 : 0.1}
        />
      </Float>

      <DeliveryPod />

      <RouteBeam start={[-1.8, 0, 0]} end={[1.8, 0, 0]} />

      <RouteNode position={[-1.8, 0, 0]} />

      <RouteNode position={[0, 0.75, 0]} active />

      <RouteNode position={[1.8, 0, 0]} />

      <MovingEnergy />

      <Sparkles
        count={isDark ? 90 : 55}
        scale={[5.5, 3.5, 3]}
        size={isDark ? 1.1 : 0.7}
        speed={0.25}
        color="#e50914"
      />

      <Sparkles
        count={isDark ? 35 : 15}
        scale={[4, 2.5, 2]}
        size={isDark ? 1.7 : 1}
        speed={0.12}
        color={isDark ? "#ffffff" : "#e50914"}
      />
    </group>
  );
}

export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  if (!mounted) {
    return null;
  }

  return (
    <Canvas
      camera={{
        position: [0, 0.1, 5.5],
        fov: 38,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
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
