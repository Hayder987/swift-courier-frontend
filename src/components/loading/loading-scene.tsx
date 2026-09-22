"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const RED = "#e50914";

const LIGHT_GLOBE = "#e8e8e8";
const DARK_GLOBE = "#171717";

function Globe({ globeColor }: { globeColor: string }) {
  const globeRef = useRef<THREE.Group>(null);

  const latitudeLines = useMemo(
    () => [
      { id: "lat-1", y: -0.9 },
      { id: "lat-2", y: -0.45 },
      { id: "lat-3", y: 0 },
      { id: "lat-4", y: 0.45 },
      { id: "lat-5", y: 0.9 },
    ],
    [],
  );

  const longitudeLines = useMemo(
    () => [
      { id: "long-1", rotation: 0 },
      { id: "long-2", rotation: Math.PI / 7 },
      { id: "long-3", rotation: (2 * Math.PI) / 7 },
      { id: "long-4", rotation: (3 * Math.PI) / 7 },
      { id: "long-5", rotation: (4 * Math.PI) / 7 },
      { id: "long-6", rotation: (5 * Math.PI) / 7 },
      { id: "long-7", rotation: (6 * Math.PI) / 7 },
    ],
    [],
  );

  useFrame((state) => {
    if (!globeRef.current) return;

    const time = state.clock.elapsedTime;

    globeRef.current.rotation.y = time * 0.12;

    globeRef.current.rotation.x = Math.sin(time * 0.18) * 0.02;
  });

  return (
    <group ref={globeRef}>
      {/* Globe */}
      <mesh>
        <sphereGeometry args={[1.4, 24, 18]} />

        <meshStandardMaterial
          color={globeColor}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Latitude */}
      {latitudeLines.map(({ id, y }) => {
        const radius = Math.sqrt(1 - y * y);

        return (
          <mesh key={id} position={[0, y * 1.4, 0]}>
            <torusGeometry args={[radius * 1.4, 0.007, 4, 40]} />

            <meshBasicMaterial color={RED} transparent opacity={0.13} />
          </mesh>
        );
      })}

      {/* Longitude */}
      {longitudeLines.map(({ id, rotation }) => (
        <mesh key={id} rotation={[0, rotation, 0]}>
          <torusGeometry args={[1.4, 0.007, 4, 48]} />

          <meshBasicMaterial color={RED} transparent opacity={0.13} />
        </mesh>
      ))}

      {/* Atmosphere */}
      <mesh scale={1.035}>
        <sphereGeometry args={[1.4, 20, 16]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function DeliveryOrbit() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={ref}>
      <mesh rotation={[0.55, 0.15, -0.15]}>
        <torusGeometry args={[1.67, 0.014, 5, 64]} />

        <meshBasicMaterial color={RED} transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[-0.35, 0.45, 0.3]}>
        <torusGeometry args={[1.82, 0.007, 4, 64]} />

        <meshBasicMaterial color={RED} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function DeliverySignal() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;
    const angle = time * 0.7;

    ref.current.position.set(
      Math.cos(angle) * 1.67,
      Math.sin(angle) * 0.8,
      Math.sin(angle) * 1.15,
    );

    const scale = 1 + Math.sin(time * 4) * 0.2;

    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />

      <meshBasicMaterial color={RED} />
    </mesh>
  );
}

function NetworkPoints() {
  const points = useMemo(
    () => [
      {
        id: "network-1",
        position: [-1.1, 0.5, 1.0] as [number, number, number],
      },
      {
        id: "network-2",
        position: [0.8, 0.65, 1.0] as [number, number, number],
      },
      {
        id: "network-3",
        position: [1.0, -0.5, 1.0] as [number, number, number],
      },
      {
        id: "network-4",
        position: [-0.75, -0.65, 1.0] as [number, number, number],
      },
    ],
    [],
  );

  return (
    <group>
      {points.map(({ id, position }) => (
        <mesh key={id} position={position}>
          <sphereGeometry args={[0.035, 6, 6]} />

          <meshBasicMaterial color={RED} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ globeColor }: { globeColor: string }) {
  return (
    <>
      <ambientLight intensity={1.3} />

      <directionalLight position={[3, 4, 5]} intensity={1.5} />

      <pointLight
        position={[0, 0, 3]}
        color={RED}
        intensity={1.2}
        distance={5}
      />

      <Globe globeColor={globeColor} />

      <DeliveryOrbit />

      <DeliverySignal />

      <NetworkPoints />
    </>
  );
}

export default function LoadingScene() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const globeColor = resolvedTheme === "dark" ? DARK_GLOBE : LIGHT_GLOBE;

  return (
    <Canvas
      dpr={[1, 1.15]}
      camera={{
        position: [0, 0, 5.8],
        fov: 42,
      }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop="always"
    >
      <Scene globeColor={globeColor} />
    </Canvas>
  );
}
