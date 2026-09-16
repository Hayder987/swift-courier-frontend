"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Html,
  Line,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const RED = "#e50914";

/* =========================================================
   TYPES
========================================================= */

type ThemeColors = {
  background: string;
  grid: string;
  gridStrong: string;
  primary: string;
  white: string;
  secondary: string;
  panel: string;
};

/* =========================================================
   THEME COLORS
========================================================= */

function getThemeColors(isDark: boolean): ThemeColors {
  if (isDark) {
    return {
      background: "#030303",
      grid: "#0d0d0d",
      gridStrong: "#171717",
      primary: RED,
      white: "#ffffff",
      secondary: "#8a8a8a",
      panel: "rgba(8,8,8,0.82)",
    };
  }

  return {
    background: "#f4f4f5",
    grid: "#dedede",
    gridStrong: "#cfcfcf",
    primary: RED,
    white: "#18181b",
    secondary: "#71717a",
    panel: "rgba(255,255,255,0.86)",
  };
}

/* =========================================================
   GRID
========================================================= */

function NetworkGrid({ colors }: { colors: ThemeColors }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <gridHelper args={[18, 24, colors.gridStrong, colors.grid]} />
    </group>
  );
}

/* =========================================================
   DRONE ROTOR
========================================================= */

function Rotor({
  position,
  colors,
}: {
  position: [number, number, number];
  colors: ThemeColors;
}) {
  const rotorRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!rotorRef.current) return;

    rotorRef.current.rotation.y += delta * 8;
  });

  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 20]} />

        <meshStandardMaterial
          color={colors.secondary}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      <mesh ref={rotorRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.43, 0.012, 8, 64]} />

        <meshBasicMaterial color={colors.primary} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/* =========================================================
   DRONE
========================================================= */

function DeliveryDrone({ colors }: { colors: ThemeColors }) {
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!droneRef.current) return;

    const time = state.clock.elapsedTime;

    droneRef.current.rotation.y = Math.sin(time * 0.35) * 0.2;

    droneRef.current.rotation.z = Math.sin(time * 0.55) * 0.025;

    droneRef.current.position.y = Math.sin(time * 1.15) * 0.12 + 0.3;
  });

  return (
    <group ref={droneRef}>
      {/* Main drone body */}
      <mesh castShadow>
        <icosahedronGeometry args={[0.9, 1]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.7}
          roughness={0.23}
        />
      </mesh>

      {/* Central red core */}
      <mesh position={[0, -0.05, 0.72]}>
        <sphereGeometry args={[0.2, 24, 24]} />

        <meshStandardMaterial
          color={RED}
          emissive={RED}
          emissiveIntensity={4}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Upper navigation light */}
      <mesh position={[0, 0.76, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>

      {/* Drone arms */}
      <mesh position={[-1.25, 0.08, 0]} rotation={[0, 0, -0.08]}>
        <boxGeometry args={[1.1, 0.12, 0.12]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[1.25, 0.08, 0]} rotation={[0, 0, 0.08]}>
        <boxGeometry args={[1.1, 0.12, 0.12]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0.08, -1.25]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.12, 0.12, 1.1]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Rotors */}
      <Rotor position={[-1.75, 0.08, 0]} colors={colors} />

      <Rotor position={[1.75, 0.08, 0]} colors={colors} />

      <Rotor position={[0, 0.08, -1.75]} colors={colors} />

      {/* Cargo pod */}
      <CargoPod colors={colors} />
    </group>
  );
}

/* =========================================================
   SMART CARGO POD
========================================================= */

function CargoPod({ colors }: { colors: ThemeColors }) {
  const podRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!podRef.current) return;

    podRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={podRef} position={[0, -1.2, 0]}>
      {/* Connection */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 16]} />

        <meshStandardMaterial
          color={colors.secondary}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Cargo capsule */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 20]} scale={[1, 0.75, 0.8]} />

        <meshPhysicalMaterial
          color={colors.white}
          metalness={0.2}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Red center stripe */}
      <mesh position={[0, 0, 0.59]}>
        <boxGeometry args={[0.12, 0.6, 0.025]} />

        <meshBasicMaterial color={RED} />
      </mesh>

      {/* Status light */}
      <mesh position={[0, -0.05, 0.62]}>
        <sphereGeometry args={[0.06, 16, 16]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* =========================================================
   RADAR RINGS
========================================================= */

function RadarRings({ colors }: { colors: ThemeColors }) {
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);
  const ringThree = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ringOne.current) {
      ringOne.current.rotation.z = time * 0.25;
    }

    if (ringTwo.current) {
      ringTwo.current.rotation.z = -time * 0.18;
    }

    if (ringThree.current) {
      ringThree.current.rotation.x = time * 0.12;
      ringThree.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      <mesh ref={ringOne}>
        <torusGeometry args={[2.3, 0.009, 8, 120]} />

        <meshBasicMaterial color={colors.primary} transparent opacity={0.5} />
      </mesh>

      <mesh ref={ringTwo} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.85, 0.006, 8, 120]} />

        <meshBasicMaterial color={colors.primary} transparent opacity={0.18} />
      </mesh>

      <mesh ref={ringThree} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.45, 0.004, 8, 120]} />

        <meshBasicMaterial color={colors.white} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/* =========================================================
   LOCATION NODE
========================================================= */

function LocationNode({
  position,
  label,
  active,
  colors,
}: {
  position: [number, number, number];
  label: string;
  active?: boolean;
  colors: ThemeColors;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!pulseRef.current) return;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.22;

    pulseRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.13, 16, 16]} />

        <meshBasicMaterial
          color={active ? RED : colors.secondary}
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />

        <meshBasicMaterial color={active ? RED : colors.secondary} />
      </mesh>

      <Html
        center
        distanceFactor={8}
        position={[0, 0.27, 0]}
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[8px] font-semibold tracking-wide backdrop-blur-xl"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            background: colors.panel,
            color: active ? RED : colors.secondary,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

/* =========================================================
   DELIVERY ROUTE
========================================================= */

function DeliveryRoute({ colors }: { colors: ThemeColors }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4.5, -0.8, 0.6),
        new THREE.Vector3(-3.2, -0.2, 0.2),
        new THREE.Vector3(-1.8, 0.15, 0),
        new THREE.Vector3(0, 0.15, 0),
        new THREE.Vector3(1.6, 0.3, -0.15),
        new THREE.Vector3(3.2, -0.05, -0.3),
        new THREE.Vector3(4.5, 0.35, -0.1),
      ]),
    [],
  );

  const points = useMemo(() => curve.getPoints(120), [curve]);

  return (
    <group>
      {/* Full route */}
      <Line
        points={points}
        color={colors.secondary}
        lineWidth={1}
        transparent
        opacity={0.3}
      />

      {/* Active route */}
      <Line
        points={points}
        color={RED}
        lineWidth={1.7}
        transparent
        opacity={0.8}
      />

      <LocationNode
        position={[-4.5, -0.8, 0.6]}
        label="PICKUP"
        colors={colors}
      />

      <LocationNode
        position={[0, 0.15, 0]}
        label="LIVE HUB"
        active
        colors={colors}
      />

      <LocationNode
        position={[4.5, 0.35, -0.1]}
        label="DELIVERY"
        active
        colors={colors}
      />

      <MovingSignal curve={curve} />
    </group>
  );
}

/* =========================================================
   MOVING SIGNAL
========================================================= */

function MovingSignal({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const progress = (state.clock.elapsedTime * 0.07) % 1;

    ref.current.position.copy(curve.getPointAt(progress));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.085, 20, 20]} />

      <meshBasicMaterial color={RED} toneMapped={false} />
    </mesh>
  );
}

/* =========================================================
   SCANNING BEAM
========================================================= */

function ScanBeam({ colors }: { colors: ThemeColors }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.22) * 3;
  });

  return (
    <group ref={ref}>
      {[-3, -1.5, 0, 1.5, 3].map((x) => (
        <mesh key={x} position={[x, -0.5, -2]}>
          <planeGeometry args={[0.01, 4.5]} />

          <meshBasicMaterial color={colors.primary} transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}


/* =========================================================
   SCENE PARALLAX
========================================================= */

function SceneMotion({ colors }: { colors: ThemeColors }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.07,
      0.035,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.045,
      0.035,
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.2}>
        <DeliveryDrone colors={colors} />
      </Float>

      <RadarRings colors={colors} />

      <DeliveryRoute colors={colors} />

    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene({ isDark }: { isDark: boolean }) {
  const colors = getThemeColors(isDark);

  return (
    <>
      <color attach="background" args={[colors.background]} />

      <PerspectiveCamera makeDefault position={[0, 0.35, 10]} fov={43} />

      {/* Ambient */}
      <ambientLight intensity={isDark ? 0.5 : 1.1} />

      {/* Main light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={isDark ? 2 : 2.8}
        color={isDark ? "#ffffff" : "#ffffff"}
      />

      {/* Red light */}
      <pointLight
        position={[0, 1.4, 2]}
        intensity={isDark ? 12 : 7}
        distance={8}
        color={RED}
      />

      {/* Secondary light */}
      <pointLight
        position={[-4, -1, -2]}
        intensity={isDark ? 4 : 2}
        distance={8}
        color={isDark ? "#ffffff" : "#d4d4d8"}
      />

      <NetworkGrid colors={colors} />

      <ScanBeam colors={colors} />

      {/* White particles */}
      <Sparkles
        count={isDark ? 120 : 80}
        scale={[11, 6, 7]}
        size={isDark ? 1.2 : 0.8}
        speed={0.2}
        opacity={isDark ? 0.45 : 0.18}
        color={isDark ? "#ffffff" : "#52525b"}
        noise={1}
      />

      {/* Red particles */}
      <Sparkles
        count={45}
        scale={[8, 4, 5]}
        size={1.5}
        speed={0.15}
        opacity={isDark ? 0.65 : 0.3}
        color={RED}
        noise={0.7}
      />

      <SceneMotion colors={colors} />
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function LoginThreeScene() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene isDark={isDark} />
      </Canvas>

      {/* Vignette */}
      <div
        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_25%,rgba(255,255,255,0.15)_100%)]"
        }`}
      />

      {/* Red atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/5 blur-[110px]" />
    </div>
  );
}
