"use client";

import {
  Environment,
  Float,
  Line,
  OrbitControls,
  RoundedBox,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RED = "#e50914";

interface CourierWarehouseSceneProps {
  className?: string;
}

function WarehouseFloor({ dark }: { dark: boolean }) {
  return (
    <group>
      {/* Main floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.65, 0]}
        receiveShadow
      >
        <planeGeometry args={[22, 18]} />
        <meshStandardMaterial
          color={dark ? "#090b0f" : "#e7e9ed"}
          roughness={0.82}
          metalness={0.08}
        />
      </mesh>

      {/* Floor grid */}
      <gridHelper
        args={[
          22,
          22,
          dark ? "#262b34" : "#c7cbd2",
          dark ? "#171b22" : "#d7dae0",
        ]}
        position={[0, -1.63, 0]}
      />

      {/* Red loading lane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.615, 2.8]}>
        <planeGeometry args={[7.5, 0.08]} />
        <meshBasicMaterial color={RED} transparent opacity={0.7} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.615, -2.8]}>
        <planeGeometry args={[7.5, 0.08]} />
        <meshBasicMaterial color={RED} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function WarehouseShelves({ dark }: { dark: boolean }) {
  const shelfColor = dark ? "#252a32" : "#b7bcc5";
  const boxColors = ["#e50914", "#f2f2f2", "#777d88", "#cfd2d6"];

  return (
    <group position={[-4.9, 0, -1.5]}>
      {/* Shelf frames */}
      {[-1.7, 0, 1.7].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.09, 4.2, 1.7]} />
            <meshStandardMaterial
              color={shelfColor}
              metalness={0.75}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0, -1.45, 0]}>
            <boxGeometry args={[0.09, 0.09, 1.7]} />
            <meshStandardMaterial color={shelfColor} />
          </mesh>
        </group>
      ))}

      {/* Horizontal shelf levels */}
      {[1.2, 0.15, -0.9].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[5.1, 0.09, 1.65]} />
          <meshStandardMaterial
            color={shelfColor}
            metalness={0.65}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Parcels */}
      {Array.from({ length: 12 }).map((_, index) => {
        const row = Math.floor(index / 4);
        const column = index % 4;

        return (
          <RoundedBox
            key={`${row}-${column}`}
            args={[0.7, 0.52, 0.55]}
            radius={0.06}
            smoothness={4}
            position={[-1.8 + column * 1.2, -0.55 + row * 1.05, -0.05]}
          >
            <meshStandardMaterial
              color={boxColors[(row * 4 + column) % boxColors.length]}
              roughness={0.65}
              metalness={0.05}
            />
          </RoundedBox>
        );
      })}
    </group>
  );
}

function MovingParcel() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.position.x = Math.sin(time * 0.7) * 3;
    ref.current.position.z = Math.cos(time * 0.7) * 1.6 - 1;

    ref.current.rotation.y += 0.012;
  });

  return (
    <RoundedBox
      ref={ref}
      args={[0.65, 0.65, 0.65]}
      radius={0.08}
      smoothness={4}
      position={[0, -0.7, 0]}
    >
      <meshStandardMaterial
        color={RED}
        roughness={0.45}
        metalness={0.15}
        emissive={RED}
        emissiveIntensity={0.12}
      />
    </RoundedBox>
  );
}

function DeliveryVan({ dark }: { dark: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.position.x = Math.sin(time * 0.32) * 3.8;
    ref.current.rotation.y =
      Math.cos(time * 0.32) > 0 ? Math.PI / 2 : -Math.PI / 2;
  });

  return (
    <group ref={ref} position={[0, -0.65, 3.5]}>
      {/* Van body */}
      <RoundedBox args={[2.3, 0.95, 1.25]} radius={0.15} smoothness={5}>
        <meshStandardMaterial
          color={dark ? "#f3f4f6" : "#ffffff"}
          roughness={0.3}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Front cabin */}
      <RoundedBox
        args={[0.9, 0.75, 1.15]}
        radius={0.12}
        smoothness={4}
        position={[0.75, 0.15, 0]}
      >
        <meshStandardMaterial
          color={dark ? "#1a1d23" : "#dfe3e8"}
          roughness={0.25}
          metalness={0.3}
        />
      </RoundedBox>

      {/* Red stripe */}
      <mesh position={[0, 0.08, 0.64]}>
        <boxGeometry args={[2.1, 0.12, 0.025]} />
        <meshBasicMaterial color={RED} />
      </mesh>

      {/* Wheels */}
      {[-0.72, 0.72].map((x) =>
        [-0.65, 0.65].map((z) => (
          <mesh
            key={`${x}-${z}`}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, -0.55, z]}
          >
            <cylinderGeometry args={[0.27, 0.27, 0.18, 24]} />
            <meshStandardMaterial
              color="#111318"
              roughness={0.75}
              metalness={0.15}
            />
          </mesh>
        )),
      )}

      {/* Headlight */}
      <mesh position={[1.22, 0.08, 0]}>
        <boxGeometry args={[0.03, 0.18, 0.45]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function CourierCharacter() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.elapsedTime;

    ref.current.position.y = -0.65 + Math.sin(time * 2.5) * 0.035;
    ref.current.rotation.z = Math.sin(time * 1.7) * 0.025;
  });

  return (
    <group ref={ref} position={[3.5, -0.65, -1]}>
      {/* Body */}
      <RoundedBox
        args={[0.58, 0.9, 0.38]}
        radius={0.13}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color={RED} roughness={0.55} metalness={0.05} />
      </RoundedBox>

      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#c58d6a" roughness={0.7} metalness={0} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 0.84, 0]}>
        <sphereGeometry args={[0.3, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#15181e"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.42, 0.05, 0]} rotation={[0, 0, -0.35]}>
        <capsuleGeometry args={[0.1, 0.45, 6, 12]} />
        <meshStandardMaterial color={RED} />
      </mesh>

      <mesh position={[0.42, 0.05, 0]} rotation={[0, 0, 0.35]}>
        <capsuleGeometry args={[0.1, 0.45, 6, 12]} />
        <meshStandardMaterial color={RED} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.16, -0.65, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 6, 12]} />
        <meshStandardMaterial color="#20242c" />
      </mesh>

      <mesh position={[0.16, -0.65, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 6, 12]} />
        <meshStandardMaterial color="#20242c" />
      </mesh>

      {/* Delivery box */}
      <RoundedBox
        args={[0.65, 0.65, 0.45]}
        radius={0.07}
        smoothness={4}
        position={[0, 0.05, 0.28]}
      >
        <meshStandardMaterial color="#f2f2f2" roughness={0.65} />
      </RoundedBox>

      <mesh position={[0, 0.05, 0.51]}>
        <boxGeometry args={[0.48, 0.08, 0.02]} />
        <meshBasicMaterial color={RED} />
      </mesh>
    </group>
  );
}

function RouteLine() {
  const points = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, -1.25, 3),
        new THREE.Vector3(-2, -0.8, 1.8),
        new THREE.Vector3(0, -0.7, 0),
        new THREE.Vector3(2.2, -0.5, -1),
        new THREE.Vector3(4.5, -0.8, -2.5),
      ]),
    [],
  );

  const linePoints = useMemo(() => {
    return points.getPoints(80);
  }, [points]);

  return (
    <>
      <Line
        points={linePoints}
        color={RED}
        transparent
        opacity={0.45}
        lineWidth={1.5}
      />

      <RoutePulse curve={points} />
    </>
  );
}

function RoutePulse({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const progress = (state.clock.elapsedTime * 0.09) % 1;

    const point = curve.getPointAt(progress);

    ref.current.position.copy(point);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color={RED} toneMapped={false} />
    </mesh>
  );
}

function WarehouseLights({ dark }: { dark: boolean }) {
  return (
    <>
      <ambientLight intensity={dark ? 0.5 : 1.1} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={dark ? 1.5 : 2}
        castShadow
      />

      <pointLight
        position={[0, 3, 1]}
        color={RED}
        intensity={dark ? 22 : 8}
        distance={10}
      />

      <pointLight
        position={[-5, 1, -3]}
        color="#ffffff"
        intensity={dark ? 8 : 4}
        distance={8}
      />
    </>
  );
}

function Scene({ dark }: { dark: boolean }) {
  return (
    <>
      <WarehouseLights dark={dark} />

      <WarehouseFloor dark={dark} />

      <WarehouseShelves dark={dark} />

      <DeliveryVan dark={dark} />

      <CourierCharacter />

      <MovingParcel />

      <RouteLine />

      <Sparkles
        count={dark ? 100 : 45}
        scale={[14, 7, 12]}
        size={dark ? 1.8 : 1}
        speed={0.25}
        opacity={dark ? 0.6 : 0.25}
        color={RED}
      />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.25}>
        <Text
          position={[0, 2.2, -2.5]}
          fontSize={0.32}
          letterSpacing={0.08}
          color={dark ? "#ffffff" : "#111318"}
          anchorX="center"
          anchorY="middle"
        >
          SWIFTCOURIER
        </Text>
      </Float>

      <Environment preset={dark ? "city" : "studio"} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.35}
      />
    </>
  );
}

export default function CourierWarehouseScene({
  className = "",
}: CourierWarehouseSceneProps) {
  const { resolvedTheme } = useTheme();

  const dark = resolvedTheme === "dark";

  return (
    <div
      className={[
        "relative h-100 w-full overflow-hidden rounded-[2rem]",
        "border border-border/50",
        "bg-background/40 backdrop-blur-xl",
        "sm:h-125 lg:h-150",
        className,
      ].join(" ")}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute -left-20 -top-20 size-60 rounded-full bg-[#e50914]/10 blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-[#e50914]/10 blur-[100px]" />
      </div>

      {/* Top HUD */}
      <div className="pointer-events-none absolute left-5 right-5 top-5 z-20 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-[#e50914] shadow-[0_0_14px_#e50914]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e50914]">
              Live Operations
            </span>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Warehouse activity
          </p>
        </div>

        <div className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-xl">
          24 / 7 Logistics
        </div>
      </div>

      {/* Three.js */}
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{
          position: [8, 5.5, 9],
          fov: 42,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene dark={dark} />
      </Canvas>

      {/* Bottom information panel */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 sm:bottom-7 sm:left-7 sm:right-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e50914]">
              Smart Logistics
            </p>

            <h3 className="mt-1 text-xl font-black tracking-tight text-foreground sm:text-2xl">
              From warehouse to doorstep.
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["01", "Packed"],
              ["02", "In Transit"],
              ["03", "Delivered"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-xl border border-border/50 bg-background/60 px-3 py-2 backdrop-blur-xl"
              >
                <p className="text-[9px] font-bold text-[#e50914]">{number}</p>
                <p className="mt-0.5 text-[9px] font-medium text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#e50914] to-transparent opacity-70 shadow-[0_0_18px_#e50914]" />
    </div>
  );
}
