"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { TriangleAlert } from "lucide-react";
import { useRef } from "react";
import type { Mesh } from "three";
import SwiftLogo from "./SwiftLogo";

const FloatingOrb = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.18;
    meshRef.current.rotation.z = time * 0.05;

    meshRef.current.position.y = Math.sin(time * 0.65) * 0.1;
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.2}
      floatIntensity={0.25}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 2]} />

        <meshBasicMaterial
          color="#e50914"
          transparent
          opacity={0.22}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const NoDataScene = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0, 4],
        fov: 45,
      }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.15} />

      <FloatingOrb />

      <Sparkles
        count={24}
        scale={[3.6, 3.6, 2.5]}
        size={1.15}
        speed={0.2}
        noise={0.3}
        color="#e50914"
      />
    </Canvas>
  );
};

const NoDataFound = () => {
  return (
    <section className="relative min-h-105 w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm sm:min-h-120 lg:min-h-130">
      {/* ========================================================= */}
      {/* GLOBAL BACKGROUND */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/4 blur-[100px] dark:bg-[#e50914]/8" />

        {/* Top light */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#e50914]/4 to-transparent dark:from-[#e50914]/7" />

        {/* Bottom light */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#e50914]/3 to-transparent dark:from-[#e50914]/6" />

        {/* Top border glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#e50914]/30 to-transparent" />

        {/* Bottom border glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#e50914]/20 to-transparent" />
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================================= */}

      <div className="relative z-10 grid min-h-105 lg:min-h-130 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ======================================================= */}
        {/* LEFT — INFORMATION */}
        {/* ======================================================= */}

        <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          {/* Soft glass background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 rounded-3xl border border-border/40 bg-background/40 shadow-sm backdrop-blur-xl sm:inset-6 lg:inset-8"
          />

          {/* Soft red glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/4 blur-[90px] dark:bg-[#e50914]/8"
          />

          {/* Corner decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l border-t border-[#e50914]/15 sm:left-8 sm:top-8 sm:h-14 sm:w-14"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b border-l border-[#e50914]/10 sm:bottom-8 sm:left-8 sm:h-14 sm:w-14"
          />

          {/* -------------------------------------------------------------- */}
          {/* Centered Content                                                 */}
          {/* -------------------------------------------------------------- */}

          <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
            {/* Logo */}
            <div className="relative mb-6">
              {/* Soft glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-[#e50914]/8 blur-2xl"
              />

              {/* Dashed ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[22px] border border-dashed border-[#e50914]/12"
              />

              {/* Logo container */}
              <div className="relative flex size-22 items-center justify-center rounded-2xl border border-border/70 bg-background/75 shadow-xl shadow-[#e50914]/5 backdrop-blur-xl sm:size-24">
                <SwiftLogo />

                {/* Status */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-xl border border-border/80 bg-background shadow-md"
                >
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e50914]/40" />

                    <span className="relative size-2.5 rounded-full bg-[#e50914]" />
                  </span>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e50914]/12 bg-[#e50914]/4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e50914]">
              <span className="size-1.5 rounded-full bg-[#e50914]" />
              Swift Courier
            </div>
            {/* alert */}
            <span className="py-4">
              <TriangleAlert
                size={44}
                className="animate-bounce text-red-600"
              />
            </span>
            {/* Heading */}
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              No Data Found
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px] sm:leading-7">
              There is currently no information available to display here. New
              data will appear automatically when it becomes available.
            </p>

            {/* Divider */}
            <div className="mt-6 flex w-full max-w-xs items-center gap-3">
              <div className="h-px flex-1 bg-linear-to-r from-transparent to-border" />

              <div className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#e50914]/25" />

                <span className="size-1.5 rounded-full bg-[#e50914]/50" />

                <span className="size-1 rounded-full bg-[#e50914]/25" />
              </div>

              <div className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
            </div>

            {/* Footer */}
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40">
              Nothing here yet
            </p>
          </div>
        </div>

        {/* ======================================================= */}
        {/* RIGHT — THREE.JS ANIMATION */}
        {/* ======================================================= */}

        <div className="relative hidden min-h-80 overflow-hidden lg:block">
          {/* Right glass background */}
          <div
            aria-hidden="true"
            className="absolute inset-5 overflow-hidden rounded-3xl border border-border/40 bg-background/25 shadow-inner backdrop-blur-[2px]"
          >
            {/* Right-side glow */}
            <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e50914]/7 blur-[100px] dark:bg-[#e50914]/12" />

            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.1),transparent_65%)]" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Three.js */}
            <div className="absolute inset-0">
              <NoDataScene />
            </div>

            {/* Center label */}
            <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
              <div className="rounded-full border border-border/50 bg-background/50 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.22em] text-muted-foreground/50 backdrop-blur-md">
                Waiting for data
              </div>
            </div>
          </div>

          {/* Right corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-[#e50914]/20 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
          />
        </div>

        {/* ======================================================= */}
        {/* MOBILE THREE.JS AREA */}
        {/* ======================================================= */}

        <div className="relative h-48 overflow-hidden lg:hidden">
          <div className="absolute inset-x-6 inset-y-3 overflow-hidden rounded-2xl border border-border/40 bg-background/25 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.1),transparent_65%)]" />

            <div className="absolute inset-0">
              <NoDataScene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoDataFound;
