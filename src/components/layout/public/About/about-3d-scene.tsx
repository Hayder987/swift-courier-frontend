"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RED = "#e50914";

interface AboutThreeSceneProps {
  dark: boolean;
  mounted: boolean;
}

interface OrbRefs {
  group: THREE.Group | null;
  core: THREE.Mesh | null;
}

/* -------------------------------------------------------------------------- */
/*                              Logistics Orb                                 */
/* -------------------------------------------------------------------------- */

function LogisticsOrb({ dark }: { dark: boolean }) {
  const refs = useRef<OrbRefs>({
    group: null,
    core: null,
  });

  const timeRef = useRef(0);

  /*
   * Generate location nodes only once.
   * 24 -> 16 nodes to reduce draw calls.
   */
  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];
    const count = 16;
    const radius = 2.55;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);

      const theta = Math.sqrt(count * Math.PI) * phi;

      result.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),

          radius * Math.sin(theta) * Math.sin(phi),

          radius * Math.cos(phi),
        ),
      );
    }

    return result;
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;

    const time = timeRef.current;

    if (refs.current.group) {
      refs.current.group.rotation.y += delta * 0.12;

      refs.current.group.rotation.x = Math.sin(time * 0.25) * 0.08;
    }

    if (refs.current.core) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.08;

      refs.current.core.scale.setScalar(pulse);
    }
  });

  return (
    <group
      ref={(node) => {
        refs.current.group = node;
      }}
    >
      {/* Main globe */}
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />

        <meshStandardMaterial
          color={dark ? "#171717" : "#f8fafc"}
          transparent
          opacity={0.9}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Lightweight wireframe shell */}
      <mesh>
        <sphereGeometry args={[2.62, 20, 20]} />

        <meshBasicMaterial
          color={RED}
          wireframe
          transparent
          opacity={dark ? 0.22 : 0.11}
        />
      </mesh>

      {/* Location nodes */}
      {points.map((point) => (
        <mesh
          key={`${point.x.toFixed(2)}-${point.y.toFixed(2)}-${point.z.toFixed(2)}`}
          position={point}
        >
          <sphereGeometry args={[0.06, 8, 8]} />

          <meshBasicMaterial color={RED} />
        </mesh>
      ))}

      {/* Network connections */}
      <Line
        points={[
          [-2.1, 0.8, 0.5],
          [-0.6, 1.65, 1.05],
          [1.4, 1.05, 0.75],
          [2.1, -0.35, 0.2],
        ]}
        color={RED}
        lineWidth={1.2}
        transparent
        opacity={0.75}
      />

      <Line
        points={[
          [-1.7, -0.8, 1.15],
          [-0.35, -1.45, 0.8],
          [1.35, -1.05, 0.45],
        ]}
        color={RED}
        lineWidth={1}
        transparent
        opacity={0.5}
      />

      {/* Additional small network line */}
      <Line
        points={[
          [-1.5, 0.2, 1.35],
          [-0.2, 0.55, 1.8],
          [1.25, 0.1, 1.35],
        ]}
        color={RED}
        lineWidth={0.8}
        transparent
        opacity={0.35}
      />

      {/* Core */}
      <mesh
        ref={(node) => {
          refs.current.core = node;
        }}
      >
        <sphereGeometry args={[0.28, 16, 16]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>

      {/* Soft red illumination */}
      <pointLight color={RED} intensity={dark ? 3.5 : 1.8} distance={6} />
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Orbit Ring                                   */
/* -------------------------------------------------------------------------- */

function OrbitRing({
  radius,
  rotation,
  dark,
  speed,
}: {
  radius: number;
  rotation: [number, number, number];
  dark: boolean;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 6, 64]} />

      <meshBasicMaterial
        color={RED}
        transparent
        opacity={dark ? 0.32 : 0.18}
        depthWrite={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Ambient Particles                              */
/* -------------------------------------------------------------------------- */

function AmbientParticles({ dark }: { dark: boolean }) {
  const positions = useMemo(() => {
    const count = dark ? 70 : 25;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const index = i * 3;

      data[index] = (Math.random() - 0.5) * 10;

      data[index + 1] = (Math.random() - 0.5) * 7;

      data[index + 2] = (Math.random() - 0.5) * 7;
    }

    return {
      data,
      count,
    };
  }, [dark]);

  const attribute = useMemo(
    () => new THREE.BufferAttribute(positions.data, 3),
    [positions.data],
  );

  return (
    <points>
      <bufferGeometry>
        <primitive object={attribute} attach="attributes-position" />
      </bufferGeometry>

      <pointsMaterial
        color={RED}
        size={0.025}
        transparent
        opacity={dark ? 0.35 : 0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Scene                                     */
/* -------------------------------------------------------------------------- */

function Scene({ dark }: { dark: boolean }) {
  return (
    <>
      {/* Soft lighting */}
      <ambientLight intensity={dark ? 0.7 : 1.1} />

      <directionalLight position={[4, 5, 5]} intensity={dark ? 1.25 : 1.5} />

      {/* Logistics globe */}
      <LogisticsOrb dark={dark} />

      {/* Orbit rings */}
      <OrbitRing
        radius={3.35}
        rotation={[Math.PI / 2.7, 0.25, 0]}
        speed={0.18}
        dark={dark}
      />

      <OrbitRing
        radius={3.75}
        rotation={[1.2, Math.PI / 3, 0.35]}
        speed={-0.12}
        dark={dark}
      />

      <OrbitRing
        radius={4.05}
        rotation={[0.35, 1.1, Math.PI / 5]}
        speed={0.08}
        dark={dark}
      />

      {/* Lightweight particles */}
      <AmbientParticles dark={dark} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Main About Scene                                   */
/* -------------------------------------------------------------------------- */

export default function AboutThreeScene({
  dark,
  mounted,
}: AboutThreeSceneProps) {
  return (
    <div className="relative h-105 w-full sm:h-125 lg:h-150">
      {/* CSS ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[#e50914]/5 blur-[100px]" />

      <div className="absolute inset-0">
        {mounted && (
          <Canvas
            dpr={[1, 1.25]}
            camera={{
              position: [0, 0, 9],
              fov: 42,
              near: 0.1,
              far: 100,
            }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            frameloop="always"
          >
            <Scene dark={dark} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
