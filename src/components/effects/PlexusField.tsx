"use client";

/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 120;
const CONNECT_DIST = 1.8;

export function PlexusField() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const pts: THREE.Vector3[] = [];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pts.push(new THREE.Vector3(x, y, z));
    }

    const lineVerts: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z);
          lineVerts.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lineVerts),
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a78bfa"
          size={0.06}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </lineSegments>
      <mesh position={[0, 0.5, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <pointLight position={[0, 2, 4]} intensity={2} color="#a78bfa" />
      <ambientLight intensity={0.3} />
    </group>
  );
}
