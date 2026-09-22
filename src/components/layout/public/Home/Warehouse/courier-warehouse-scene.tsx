"use client";

import { Line, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RED = "#e50914";

interface CourierWarehouseSceneProps {
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                              Warehouse Floor                               */
/* -------------------------------------------------------------------------- */

function WarehouseFloor({ dark }: { dark: boolean }) {
  return (
    <group>
      {/* Main floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.65, 0]}>
        <planeGeometry args={[22, 18]} />

        <meshStandardMaterial
          color={dark ? "#090b0f" : "#e7e9ed"}
          roughness={0.85}
          metalness={0.05}
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

      {/* Red loading lanes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.615, 2.8]}>
        <planeGeometry args={[7.5, 0.08]} />

        <meshBasicMaterial color={RED} transparent opacity={0.65} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.615, -2.8]}>
        <planeGeometry args={[7.5, 0.08]} />

        <meshBasicMaterial color={RED} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Warehouse Shelves                              */
/* -------------------------------------------------------------------------- */

function WarehouseShelves({ dark }: { dark: boolean }) {
  const shelfColor = dark ? "#252a32" : "#b7bcc5";

  const boxColors = [RED, "#f2f2f2", "#777d88", "#cfd2d6"];

  return (
    <group position={[-4.9, 0, -1.5]}>
      {/* Shelf frames */}
      {[-1.7, 0, 1.7].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.09, 4.2, 1.7]} />

            <meshStandardMaterial
              color={shelfColor}
              metalness={0.55}
              roughness={0.4}
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
            metalness={0.5}
            roughness={0.45}
          />
        </mesh>
      ))}

      {/* Parcels */}
      {Array.from({ length: 12 }, (_, index) => {
        const row = Math.floor(index / 4);
        const column = index % 4;

        return (
          <RoundedBox
            key={`${row}-${column}`}
            args={[0.7, 0.52, 0.55]}
            radius={0.05}
            smoothness={2}
            position={[-1.8 + column * 1.2, -0.55 + row * 1.05, -0.05]}
          >
            <meshStandardMaterial
              color={boxColors[index % boxColors.length]}
              roughness={0.7}
            />
          </RoundedBox>
        );
      })}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Delivery Van                                 */
/* -------------------------------------------------------------------------- */

interface DeliveryVanProps {
  dark: boolean;
  ref?: React.Ref<THREE.Group>;
}

function DeliveryVan({ dark, ref }: DeliveryVanProps) {
  return (
    <group ref={ref} position={[0, -0.65, 3.5]}>
      {/* Van body */}
      <RoundedBox args={[2.3, 0.95, 1.25]} radius={0.12} smoothness={3}>
        <meshStandardMaterial
          color={dark ? "#f3f4f6" : "#ffffff"}
          roughness={0.35}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Front cabin */}
      <RoundedBox
        args={[0.9, 0.75, 1.15]}
        radius={0.1}
        smoothness={3}
        position={[0.75, 0.15, 0]}
      >
        <meshStandardMaterial
          color={dark ? "#1a1d23" : "#dfe3e8"}
          roughness={0.3}
          metalness={0.2}
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
            <cylinderGeometry args={[0.27, 0.27, 0.18, 12]} />

            <meshStandardMaterial color="#111318" roughness={0.8} />
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

/* -------------------------------------------------------------------------- */
/*                           Courier Character                                */
/* -------------------------------------------------------------------------- */

interface CourierCharacterProps {
  ref?: React.Ref<THREE.Group>;
}

function CourierCharacter({ ref }: CourierCharacterProps) {
  return (
    <group ref={ref} position={[3.5, -0.65, -1]}>
      {/* Body */}
      <RoundedBox args={[0.58, 0.9, 0.38]} radius={0.1} smoothness={3}>
        <meshStandardMaterial color={RED} roughness={0.6} />
      </RoundedBox>

      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />

        <meshStandardMaterial color="#c58d6a" roughness={0.75} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 0.84, 0]}>
        <sphereGeometry args={[0.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />

        <meshStandardMaterial color="#15181e" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.42, 0.05, 0]} rotation={[0, 0, -0.35]}>
        <capsuleGeometry args={[0.1, 0.45, 4, 8]} />

        <meshStandardMaterial color={RED} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.42, 0.05, 0]} rotation={[0, 0, 0.35]}>
        <capsuleGeometry args={[0.1, 0.45, 4, 8]} />

        <meshStandardMaterial color={RED} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.16, -0.65, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 4, 8]} />

        <meshStandardMaterial color="#20242c" />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.16, -0.65, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 4, 8]} />

        <meshStandardMaterial color="#20242c" />
      </mesh>

      {/* Delivery box */}
      <RoundedBox
        args={[0.65, 0.65, 0.45]}
        radius={0.05}
        smoothness={2}
        position={[0, 0.05, 0.28]}
      >
        <meshStandardMaterial color="#f2f2f2" roughness={0.7} />
      </RoundedBox>

      {/* Box red stripe */}
      <mesh position={[0, 0.05, 0.51]}>
        <boxGeometry args={[0.48, 0.08, 0.02]} />

        <meshBasicMaterial color={RED} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Moving Parcel                                 */
/* -------------------------------------------------------------------------- */

interface MovingParcelProps {
  ref?: React.Ref<THREE.Mesh>;
}

function MovingParcel({ ref }: MovingParcelProps) {
  return (
    <RoundedBox
      ref={ref}
      args={[0.65, 0.65, 0.65]}
      radius={0.06}
      smoothness={2}
      position={[0, -0.7, 0]}
    >
      <meshStandardMaterial
        color={RED}
        roughness={0.5}
        metalness={0.1}
        emissive={RED}
        emissiveIntensity={0.1}
      />
    </RoundedBox>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Route Line                                   */
/* -------------------------------------------------------------------------- */

interface RouteLineProps {
  pulseRef?: React.Ref<THREE.Mesh>;
}

function RouteLine({ pulseRef }: RouteLineProps) {
  const curve = useMemo(
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

  const linePoints = useMemo(() => curve.getPoints(50), [curve]);

  return (
    <>
      <Line
        points={linePoints}
        color={RED}
        transparent
        opacity={0.42}
        lineWidth={1.2}
      />

      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.09, 10, 10]} />

        <meshBasicMaterial color={RED} toneMapped={false} />
      </mesh>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Ambient Particles                               */
/* -------------------------------------------------------------------------- */

function AmbientParticles({ dark }: { dark: boolean }) {
  const positions = useMemo(() => {
    const data = new Float32Array(45 * 3);

    for (let index = 0; index < 45; index++) {
      const offset = index * 3;

      data[offset] = (Math.random() - 0.5) * 10;

      data[offset + 1] = (Math.random() - 0.5) * 5;

      data[offset + 2] = (Math.random() - 0.5) * 8;
    }

    return data;
  }, []);

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
        color={RED}
        size={0.025}
        transparent
        opacity={dark ? 0.45 : 0.2}
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
  const vanRef = useRef<THREE.Group>(null);
  const courierRef = useRef<THREE.Group>(null);
  const parcelRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  const timeRef = useRef(0);

  const routeCurve = useMemo(
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

  useFrame((_, delta) => {
    timeRef.current += delta;

    const time = timeRef.current;

    /* ------------------------------- Van -------------------------------- */

    if (vanRef.current) {
      vanRef.current.position.x = Math.sin(time * 0.32) * 3.8;

      vanRef.current.rotation.y =
        Math.cos(time * 0.32) > 0 ? Math.PI / 2 : -Math.PI / 2;
    }

    /* ----------------------------- Courier ------------------------------- */

    if (courierRef.current) {
      courierRef.current.position.y = -0.65 + Math.sin(time * 2.5) * 0.035;

      courierRef.current.rotation.z = Math.sin(time * 1.7) * 0.025;
    }

    /* ------------------------------ Parcel ------------------------------- */

    if (parcelRef.current) {
      parcelRef.current.position.x = Math.sin(time * 0.7) * 3;

      parcelRef.current.position.z = Math.cos(time * 0.7) * 1.6 - 1;

      parcelRef.current.rotation.y += delta * 0.7;
    }

    /* ----------------------------- Route Pulse --------------------------- */

    if (pulseRef.current) {
      const progress = (time * 0.09) % 1;

      pulseRef.current.position.copy(routeCurve.getPointAt(progress));
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={dark ? 0.7 : 1.2} />

      <directionalLight position={[5, 8, 5]} intensity={dark ? 1.4 : 1.8} />

      <pointLight
        position={[0, 3, 1]}
        color={RED}
        intensity={dark ? 5 : 2.5}
        distance={8}
      />

      {/* Warehouse */}
      <WarehouseFloor dark={dark} />

      <WarehouseShelves dark={dark} />

      {/* Animated objects */}
      <DeliveryVan dark={dark} ref={vanRef} />

      <CourierCharacter ref={courierRef} />

      <MovingParcel ref={parcelRef} />

      {/* Route */}
      <RouteLine pulseRef={pulseRef} />

      {/* Particles */}
      <AmbientParticles dark={dark} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Main Scene Component                               */
/* -------------------------------------------------------------------------- */

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
      {/* Ambient CSS glow */}
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

      {/* Three.js Canvas */}
      <Canvas
        dpr={[1, 1.25]}
        camera={{
          position: [8, 5.5, 9],
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

      {/* Bottom information */}
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

      {/* Top red accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#e50914] to-transparent opacity-70 shadow-[0_0_18px_#e50914]" />
    </div>
  );
}
