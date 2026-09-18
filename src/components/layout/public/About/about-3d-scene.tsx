"use client";

import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function LogisticsOrb({ dark }: { dark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const result: THREE.Vector3[] = [];

    for (let i = 0; i < 24; i++) {
      const phi = Math.acos(-1 + (2 * i) / 24);
      const theta = Math.sqrt(24 * Math.PI) * phi;

      result.push(
        new THREE.Vector3(
          2.55 * Math.cos(theta) * Math.sin(phi),
          2.55 * Math.sin(theta) * Math.sin(phi),
          2.55 * Math.cos(phi),
        ),
      );
    }

    return result;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Main globe */}
      <mesh>
        <sphereGeometry args={[2.55, 64, 64]} />

        <meshStandardMaterial
          color={dark ? "#171717" : "#f8fafc"}
          transparent
          opacity={0.88}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh>
        <sphereGeometry args={[2.62, 32, 32]} />

        <meshBasicMaterial
          color="#e50914"
          wireframe
          transparent
          opacity={dark ? 0.24 : 0.13}
        />
      </mesh>

      {/* Location nodes */}
      {points.map((point) => (
        <Float
          key={`${point.x}-${point.y}-${point.z}`}
          speed={1 + Math.abs(point.x * point.y) * 0.2}
          rotationIntensity={0.1}
          floatIntensity={0.08}
        >
          <mesh position={point}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#e50914" />
          </mesh>
        </Float>
      ))}

      {/* Connection lines */}
      <Line
        points={[
          [-2.1, 0.8, 0.5],
          [-0.6, 1.65, 1.05],
          [1.4, 1.05, 0.75],
          [2.1, -0.35, 0.2],
        ]}
        color="#e50914"
        lineWidth={1.4}
        transparent
        opacity={0.8}
      />

      <Line
        points={[
          [-1.7, -0.8, 1.15],
          [-0.35, -1.45, 0.8],
          [1.35, -1.05, 0.45],
        ]}
        color="#e50914"
        lineWidth={1.1}
        transparent
        opacity={0.55}
      />

      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#e50914" />
      </mesh>

      <pointLight color="#e50914" intensity={7} distance={8} />
    </group>
  );
}

function OrbitRing({
  radius,
  rotation,
  dark,
}: {
  radius: number;
  rotation: [number, number, number];
  dark: boolean;
}) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />

      <meshBasicMaterial
        color="#e50914"
        transparent
        opacity={dark ? 0.38 : 0.22}
      />
    </mesh>
  );
}

function Scene({ dark }: { dark: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 9]} />

      <ambientLight intensity={dark ? 0.6 : 1} />

      <directionalLight position={[5, 5, 5]} intensity={dark ? 2 : 1.5} />

      <directionalLight position={[-5, -3, -4]} color="#e50914" intensity={2} />

      <Stars
        radius={20}
        depth={12}
        count={dark ? 1200 : 350}
        factor={1.8}
        saturation={0}
        fade
        speed={0.35}
      />

      <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.18}>
        <LogisticsOrb dark={dark} />

        <OrbitRing
          radius={3.35}
          rotation={[Math.PI / 2.7, 0.25, 0]}
          dark={dark}
        />

        <OrbitRing
          radius={3.75}
          rotation={[1.2, Math.PI / 3, 0.35]}
          dark={dark}
        />

        <OrbitRing
          radius={4.05}
          rotation={[0.35, 1.1, Math.PI / 5]}
          dark={dark}
        />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.45}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}

interface AboutThreeSceneProps {
  dark: boolean;
  mounted: boolean;
}

const AboutThreeScene = ({ dark, mounted }: AboutThreeSceneProps) => {
  return (
    <div className="relative h-105 w-full sm:h-125 lg:h-150">
      <div className="absolute inset-0 rounded-full bg-[#e50914]/5 blur-[100px]" />

      <div className="absolute inset-0">
        {mounted && (
          <Canvas
            dpr={[1, 1.7]}
            gl={{
              antialias: true,
              alpha: true,
            }}
          >
            <Suspense fallback={null}>
              <Scene dark={dark} />
            </Suspense>
          </Canvas>
        )}
      </div>
    </div>
  );
};

export default AboutThreeScene;
