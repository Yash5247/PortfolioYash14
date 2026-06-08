"use client";

/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { DetailedExperience } from "@/data/portfolio";

interface ExperienceCubeProps {
  experiences: DetailedExperience[];
  activeIndex: number;
  className?: string;
}

function CubeMesh({
  experiences,
  activeIndex,
}: {
  experiences: DetailedExperience[];
  activeIndex: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const faces = experiences.map((exp) => ({
    company: exp.company,
    role: exp.role,
    period: exp.period,
  }));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const idx = activeIndex % faces.length;
    targetRotation.current.y = (idx * Math.PI) / 2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      delta * 3
    );
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  const faceContent = (index: number, position: [number, number, number], rotation: [number, number, number]) => {
    const face = faces[index % faces.length];
    return (
      <group position={position} rotation={rotation}>
        <RoundedBox args={[2.8, 2.8, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color="#18181b"
            metalness={0.4}
            roughness={0.3}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        <Text
          position={[0, 0.35, 0.06]}
          fontSize={0.22}
          color="#fafafa"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.4}
        >
          {face.company}
        </Text>
        <Text
          position={[0, -0.1, 0.06]}
          fontSize={0.12}
          color="#a1a1aa"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.4}
        >
          {face.role}
        </Text>
        <Text
          position={[0, -0.45, 0.06]}
          fontSize={0.1}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
        >
          {face.period}
        </Text>
      </group>
    );
  };

  return (
    <group ref={groupRef}>
      {faceContent(0, [0, 0, 1.45], [0, 0, 0])}
      {faceContent(1, [1.45, 0, 0], [0, Math.PI / 2, 0])}
      {faceContent(2, [0, 0, -1.45], [0, Math.PI, 0])}
      {faceContent(0, [-1.45, 0, 0], [0, -Math.PI / 2, 0])}
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#6366f1" />
    </group>
  );
}

export function ExperienceCube({
  experiences,
  activeIndex,
  className,
}: ExperienceCubeProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ alpha: true }}>
        <CubeMesh experiences={experiences} activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
