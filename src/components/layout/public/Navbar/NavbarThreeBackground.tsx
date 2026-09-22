"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const RED = "#e50914";

type NetworkNode = {
  id: string;
  position: [number, number, number];
};

const NETWORK_NODES: NetworkNode[] = [
  {
    id: "identity",
    position: [-4.8, 0.15, -0.5],
  },
  {
    id: "password",
    position: [-3.1, -0.35, -0.2],
  },
  {
    id: "encryption",
    position: [-1.5, 0.25, -0.4],
  },
  {
    id: "authentication",
    position: [0, -0.1, -0.3],
  },
  {
    id: "verification",
    position: [1.6, 0.3, -0.4],
  },
  {
    id: "session",
    position: [3.2, -0.25, -0.2],
  },
  {
    id: "secure",
    position: [4.8, 0.1, -0.5],
  },
];

/* -------------------------------------------------------------------------- */
/* NETWORK LINE                                                               */
/* -------------------------------------------------------------------------- */

function NetworkLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  return (
    <Line
      points={[start, end]}
      color={RED}
      lineWidth={0.6}
      transparent
      opacity={0.12}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* SECURITY NETWORK                                                           */
/* -------------------------------------------------------------------------- */

function SecurityNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;

    groupRef.current.position.x = Math.sin(time * 0.15) * 0.05;

    groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* Network connections */}
      {NETWORK_NODES.slice(0, -1).map((node, index) => {
        const nextNode = NETWORK_NODES[index + 1];

        return (
          <NetworkLine
            key={`${node.id}-${nextNode.id}`}
            start={node.position}
            end={nextNode.position}
          />
        );
      })}

      {/* Network nodes */}
      {NETWORK_NODES.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.025, 8, 8]} />

          <meshBasicMaterial
            color={RED}
            transparent
            opacity={0.45}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Central authentication node */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.055, 8, 8]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* MOVING SECURITY SIGNAL                                                     */
/* -------------------------------------------------------------------------- */

function MovingSignal() {
  const signalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!signalRef.current) {
      return;
    }

    const progress = (state.clock.elapsedTime * 0.08) % 1;

    signalRef.current.position.x = -4.8 + progress * 9.6;

    signalRef.current.position.y =
      0.15 + Math.sin(progress * Math.PI * 6) * 0.12;
  });

  return (
    <mesh ref={signalRef}>
      <sphereGeometry args={[0.045, 8, 8]} />

      <meshBasicMaterial color={RED} toneMapped={false} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* SECURITY PULSE                                                             */
/* -------------------------------------------------------------------------- */

function SecurityPulse() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) {
      return;
    }

    const progress = (state.clock.elapsedTime * 0.22) % 1;

    ringRef.current.scale.setScalar(1 + progress * 1.8);

    const material = ringRef.current.material as THREE.MeshBasicMaterial;

    material.opacity = 0.18 - progress * 0.18;
  });

  return (
    <mesh ref={ringRef} position={[0, -0.1, -0.1]}>
      <ringGeometry args={[0.35, 0.365, 32]} />

      <meshBasicMaterial
        color={RED}
        transparent
        opacity={0.18}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* SCENE                                                                      */
/* -------------------------------------------------------------------------- */

function Scene() {
  return (
    <>
      <SecurityNetwork />
      <MovingSignal />
      <SecurityPulse />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* NAVBAR BACKGROUND                                                          */
/* -------------------------------------------------------------------------- */

export default function NavbarThreeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <Scene />
      </Canvas>

      {/* Premium SwiftCourier red atmosphere */}
      <div className="absolute left-1/2 top-0 h-24 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/[0.035] blur-3xl" />

      {/* Subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
