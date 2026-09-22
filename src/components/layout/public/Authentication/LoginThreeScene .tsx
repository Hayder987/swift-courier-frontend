"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const RED = "#e50914";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type ThemeColors = {
  background: string;
  grid: string;
  gridStrong: string;
  primary: string;
  white: string;
  secondary: string;
  panel: string;
};

/* -------------------------------------------------------------------------- */
/* THEME                                                                      */
/* -------------------------------------------------------------------------- */

function getThemeColors(isDark: boolean): ThemeColors {
  if (isDark) {
    return {
      background: "#020202",
      grid: "#0c0c0c",
      gridStrong: "#161616",
      primary: RED,
      white: "#ffffff",
      secondary: "#777777",
      panel: "rgba(7,7,7,0.84)",
    };
  }

  return {
    background: "#f4f4f5",
    grid: "#dedede",
    gridStrong: "#cfcfcf",
    primary: RED,
    white: "#18181b",
    secondary: "#71717a",
    panel: "rgba(255,255,255,0.88)",
  };
}

/* -------------------------------------------------------------------------- */
/* AUTHENTICATION CORE                                                        */
/* -------------------------------------------------------------------------- */

function AuthCore({ colors }: { colors: ThemeColors }) {
  const groupRef = useRef<THREE.Group>(null);
  const lockRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.rotation.y += 0.002;

    if (lockRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.035;

      lockRef.current.scale.setScalar(scale);
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 1.8) * 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer security glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.45, 20, 20]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>

      {/* Lock body */}
      <mesh ref={lockRef} position={[0, -0.15, 0]}>
        <boxGeometry args={[1.25, 1.05, 0.5]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>

      {/* Lock inner panel */}
      <mesh position={[0, -0.15, 0.27]}>
        <boxGeometry args={[0.9, 0.68, 0.035]} />

        <meshBasicMaterial color={colors.background} />
      </mesh>

      {/* Red security strip */}
      <mesh position={[0, -0.5, 0.3]}>
        <boxGeometry args={[0.62, 0.035, 0.02]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>

      {/* Lock shackle */}
      <mesh position={[0, 0.58, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.38, 0.09, 8, 24, Math.PI]} />

        <meshStandardMaterial
          color={colors.white}
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>

      {/* Keyhole */}
      <mesh position={[0, -0.12, 0.34]}>
        <circleGeometry args={[0.11, 12]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>

      <mesh position={[0, -0.31, 0.34]}>
        <boxGeometry args={[0.06, 0.25, 0.025]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>

      {/* Status light */}
      <mesh position={[0.52, 0.32, 0.3]}>
        <sphereGeometry args={[0.045, 8, 8]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* SECURITY RINGS                                                             */
/* -------------------------------------------------------------------------- */

function SecurityRings({ colors }: { colors: ThemeColors }) {
  const refs = useRef<
    [THREE.Mesh | null, THREE.Mesh | null, THREE.Mesh | null]
  >([null, null, null]);

  useFrame((_, delta) => {
    const [one, two, three] = refs.current;

    if (one) {
      one.rotation.z += delta * 0.2;
    }

    if (two) {
      two.rotation.z -= delta * 0.13;
    }

    if (three) {
      three.rotation.x += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh
        ref={(node) => {
          refs.current[0] = node;
        }}
      >
        <torusGeometry args={[2, 0.008, 6, 64]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={(node) => {
          refs.current[1] = node;
        }}
        rotation={[Math.PI / 3, 0.2, 0]}
      >
        <torusGeometry args={[2.65, 0.006, 6, 64]} />

        <meshBasicMaterial
          color={RED}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={(node) => {
          refs.current[2] = node;
        }}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[3.25, 0.004, 6, 64]} />

        <meshBasicMaterial
          color={colors.white}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* AUTH NODES                                                                 */
/* -------------------------------------------------------------------------- */

function AuthNode({
  position,
  label,
  active = false,
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

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;

    pulseRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      {/* Pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.14, 8, 8]} />

        <meshBasicMaterial
          color={active ? RED : colors.secondary}
          transparent
          opacity={0.16}
          depthWrite={false}
        />
      </mesh>

      {/* Node */}
      <mesh>
        <sphereGeometry args={[0.055, 8, 8]} />

        <meshBasicMaterial color={active ? RED : colors.secondary} />
      </mesh>

      {/* Label */}
      <Html
        center
        distanceFactor={8}
        position={[0, 0.27, 0]}
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[8px] font-semibold tracking-[0.16em] backdrop-blur-xl"
          style={{
            borderColor: active
              ? "rgba(229,9,20,0.3)"
              : "rgba(255,255,255,0.1)",
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

/* -------------------------------------------------------------------------- */
/* AUTH NETWORK                                                               */
/* -------------------------------------------------------------------------- */

function AuthNetwork({ colors }: { colors: ThemeColors }) {
  const nodes = [
    {
      position: [-3.8, 0.9, 0] as [number, number, number],
      label: "IDENTITY",
    },
    {
      position: [-2.5, -1.2, 0.2] as [number, number, number],
      label: "PASSWORD",
      active: true,
    },
    {
      position: [3.8, 0.9, 0] as [number, number, number],
      label: "SESSION",
      active: true,
    },
    {
      position: [2.5, -1.2, 0.2] as [number, number, number],
      label: "ENCRYPTED",
      active: true,
    },
  ];

  return (
    <group>
      {/* Identity → Core */}
      <Line
        points={[
          [-3.8, 0.9, 0],
          [-1.4, 0.35, 0],
          [0, 0, 0],
        ]}
        color={colors.secondary}
        lineWidth={0.7}
        transparent
        opacity={0.3}
      />

      {/* Password → Core */}
      <Line
        points={[
          [-2.5, -1.2, 0.2],
          [-0.9, -0.45, 0.1],
          [0, 0, 0],
        ]}
        color={RED}
        lineWidth={1.1}
        transparent
        opacity={0.65}
      />

      {/* Core → Session */}
      <Line
        points={[
          [0, 0, 0],
          [1.4, 0.35, 0],
          [3.8, 0.9, 0],
        ]}
        color={RED}
        lineWidth={1.1}
        transparent
        opacity={0.65}
      />

      {/* Core → Encryption */}
      <Line
        points={[
          [0, 0, 0],
          [0.9, -0.45, 0.1],
          [2.5, -1.2, 0.2],
        ]}
        color={RED}
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {nodes.map((node) => (
        <AuthNode
          key={node.label}
          position={node.position}
          label={node.label}
          active={node.active}
          colors={colors}
        />
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* ENCRYPTED DATA                                                             */
/* -------------------------------------------------------------------------- */

function EncryptedData() {
  const ref = useRef<THREE.Group>(null);

  const characters = useMemo(
    () =>
      ["01", "7F", "A9", "X2", "9C", "4B", "FF", "10"].map((value, index) => ({
        value,
        x: -3.8 + index * 1.05,
        y: 2.2 + (index % 2) * 0.18,
      })),
    [],
  );

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.position.y -= delta * 0.04;

    if (ref.current.position.y < -0.12) {
      ref.current.position.y = 0;
    }
  });

  return (
    <group ref={ref}>
      {characters.map((item) => (
        <Html
          key={`${item.value}-${item.x}`}
          position={[item.x, item.y, -0.2]}
          center
          style={{
            pointerEvents: "none",
          }}
        >
          <span className="font-mono text-[9px] font-semibold tracking-widest text-[#e50914]/50">
            {item.value}
          </span>
        </Html>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* AUTH STATUS                                                                */
/* -------------------------------------------------------------------------- */

function AuthStatus({ colors }: { colors: ThemeColors }) {
  return (
    <Html
      position={[0, -2.45, 0]}
      center
      distanceFactor={8}
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        className="rounded-full border px-4 py-1.5 font-mono text-[8px] font-semibold tracking-[0.2em] backdrop-blur-xl"
        style={{
          background: colors.panel,
          borderColor: "rgba(229,9,20,0.25)",
          color: RED,
          boxShadow: "0 0 24px rgba(229,9,20,0.08)",
        }}
      >
        AUTHENTICATION SECURE
      </div>
    </Html>
  );
}

/* -------------------------------------------------------------------------- */
/* SCAN LINE                                                                  */
/* -------------------------------------------------------------------------- */

function ScanLine() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 1.9;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[6.5, 0.012]} />

      <meshBasicMaterial
        color={RED}
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* MOVING AUTH SIGNAL                                                         */
/* -------------------------------------------------------------------------- */

function AuthSignal() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const progress = (state.clock.elapsedTime * 0.12) % 1;

    const x = THREE.MathUtils.lerp(-3.8, 3.8, progress);

    const y = 0.9 + Math.sin(progress * Math.PI) * 0.35;

    ref.current.position.set(x, y, 0.08);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />

      <meshBasicMaterial color={RED} toneMapped={false} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* PARTICLES                                                                  */
/* -------------------------------------------------------------------------- */

function AmbientParticles({ dark }: { dark: boolean }) {
  const count = dark ? 55 : 20;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      data[index] = (Math.random() - 0.5) * 11;

      data[index + 1] = (Math.random() - 0.5) * 6;

      data[index + 2] = (Math.random() - 0.5) * 5;
    }

    return data;
  }, [count]);

  const attribute = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions],
  );

  return (
    <points>
      <bufferGeometry>
        <primitive object={attribute} attach="attributes-position" />
      </bufferGeometry>

      <pointsMaterial
        color={dark ? "#ffffff" : "#52525b"}
        size={0.022}
        transparent
        opacity={dark ? 0.3 : 0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE MOTION                                                               */
/* -------------------------------------------------------------------------- */

function SceneMotion({ colors }: { colors: ThemeColors }) {
  const groupRef = useRef<THREE.Group>(null);

  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.055,
      0.035,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.035,
      0.035,
    );
  });

  return (
    <group ref={groupRef}>
      <AuthCore colors={colors} />

      <SecurityRings colors={colors} />

      <AuthNetwork colors={colors} />

      <EncryptedData />

      <ScanLine />

      <AuthSignal />

      <AuthStatus colors={colors} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE                                                                      */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* NETWORK GRID                                                               */
/* -------------------------------------------------------------------------- */

function NetworkGrid({ colors }: { colors: ThemeColors }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <gridHelper args={[18, 18, colors.gridStrong, colors.grid]} />
    </group>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  const colors = getThemeColors(isDark);

  return (
    <>
      <color attach="background" args={[colors.background]} />

      <ambientLight intensity={isDark ? 0.6 : 1} />

      <directionalLight position={[4, 5, 5]} intensity={isDark ? 1.5 : 2} />

      <pointLight
        position={[0, 0, 2]}
        intensity={isDark ? 3.5 : 1.8}
        distance={7}
        color={RED}
      />

      <NetworkGrid colors={colors} />

      <AmbientParticles dark={isDark} />

      <SceneMotion colors={colors} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

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
        dpr={[1, 1.25]}
        camera={{
          position: [0, 0, 10],
          fov: 43,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <Scene isDark={isDark} />
      </Canvas>

      {/* Vignette */}
      <div
        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.52)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_25%,rgba(255,255,255,0.15)_100%)]"
        }`}
      />

      {/* Red atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/5 blur-[110px]" />
    </div>
  );
}
