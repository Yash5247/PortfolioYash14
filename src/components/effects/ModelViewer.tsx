"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox, Line } from "@react-three/drei";
import * as THREE from "three";

const LAYERS = [
  { id: "frontend", label: "Frontend", color: "#818cf8", y: 2.2 },
  { id: "api", label: "API Layer", color: "#a78bfa", y: 1.1 },
  { id: "backend", label: "Backend", color: "#6366f1", y: 0 },
  { id: "database", label: "Database", color: "#4f46e5", y: -1.1 },
  { id: "deploy", label: "Deployment", color: "#7c3aed", y: -2.2 },
] as const;

function DataParticles() {
  const ref = useRef<THREE.Group>(null);
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      t: i / 12,
      speed: 0.003 + (i % 3) * 0.001,
    }))
  );

  useFrame(() => {
    particles.current.forEach((p) => {
      p.t = (p.t + p.speed) % 1;
    });
    if (ref.current) ref.current.rotation.y += 0.001;
  });

  return (
    <group ref={ref}>
      {particles.current.map((p, i) => {
        const y = 2.2 - p.t * 4.4;
        return (
          <mesh key={i} position={[0.6, y, 0.3]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#c4b5fd"
              emissive="#818cf8"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
      <Line
        points={LAYERS.map((l) => new THREE.Vector3(0, l.y, 0))}
        color="#6366f1"
        lineWidth={1}
        transparent
        opacity={0.35}
      />
    </group>
  );
}

function ArchitectureModel() {
  return (
    <group>
      {LAYERS.map((layer) => (
        <group key={layer.id} position={[0, layer.y, 0]}>
          <RoundedBox args={[2.8, 0.55, 1.2]} radius={0.08} smoothness={4}>
            <meshStandardMaterial
              color="#18181b"
              metalness={0.4}
              roughness={0.35}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.62]}>
            <planeGeometry args={[2.4, 0.3]} />
            <meshBasicMaterial color={layer.color} transparent opacity={0.15} />
          </mesh>
          <Text
            position={[0, 0, 0.65]}
            fontSize={0.18}
            color="#fafafa"
            anchorX="center"
            anchorY="middle"
          >
            {layer.label}
          </Text>
        </group>
      ))}
      <DataParticles />
    </group>
  );
}

interface ModelViewerProps {
  className?: string;
}

export function ModelViewer({ className }: ModelViewerProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4, 1.5, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <pointLight position={[-3, 2, 2]} intensity={0.6} color="#818cf8" />
        <Suspense fallback={null}>
          <ArchitectureModel />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={9}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}
