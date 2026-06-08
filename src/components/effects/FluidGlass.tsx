"use client";

/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useRef, useState, useEffect, memo, type ReactNode } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Preload,
} from "@react-three/drei";
import { easing } from "maath";

export interface FluidGlassProps {
  mode?: "lens" | "bar" | "cube";
  className?: string;
  children?: ReactNode;
  lensProps?: Record<string, unknown>;
  barProps?: Record<string, unknown>;
  cubeProps?: Record<string, unknown>;
}

export default function FluidGlass({
  mode = "lens",
  className,
  children,
  lensProps = {},
  barProps = {},
  cubeProps = {},
}: FluidGlassProps) {
  const Wrapper = mode === "bar" ? Bar : mode === "cube" ? Cube : Lens;
  const rawOverrides =
    mode === "bar" ? barProps : mode === "cube" ? cubeProps : lensProps;

  const { ...modeProps } = rawOverrides;

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <Wrapper modeProps={modeProps}>{children}</Wrapper>
        <Preload all />
      </Canvas>
    </div>
  );
}

interface ModeWrapperProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: Record<string, unknown>;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null);
  const gltf = useGLTF(glb);
  const nodes = gltf.nodes as Record<string, THREE.Mesh>;
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = nodes[geometryKey]?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    if (box) {
      geoWidthRef.current = box.max.x - box.min.x || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;

    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps;

  const geometry = nodes[geometryKey]?.geometry;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      {geometry && (
        <mesh
          ref={ref}
          scale={(scale as number) ?? 0.15}
          rotation-x={Math.PI / 2}
          geometry={geometry}
        >
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={(ior as number) ?? 1.15}
            thickness={(thickness as number) ?? 5}
            anisotropy={(anisotropy as number) ?? 0.01}
            chromaticAberration={(chromaticAberration as number) ?? 0.1}
            {...extraMat}
          />
        </mesh>
      )}
    </>
  );
});

function Lens({
  modeProps,
  children,
}: {
  modeProps?: Record<string, unknown>;
  children?: ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
    >
      {children}
    </ModeWrapper>
  );
}

function Cube({
  modeProps,
  children,
}: {
  modeProps?: Record<string, unknown>;
  children?: ReactNode;
}) {
  return (
    <ModeWrapper
      glb="/assets/3d/cube.glb"
      geometryKey="Cube"
      followPointer
      modeProps={modeProps}
    >
      {children}
    </ModeWrapper>
  );
}

function Bar({
  modeProps = {},
  children,
}: {
  modeProps?: Record<string, unknown>;
  children?: ReactNode;
}) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
    >
      {children}
    </ModeWrapper>
  );
}

useGLTF.preload("/assets/3d/lens.glb");
useGLTF.preload("/assets/3d/cube.glb");
useGLTF.preload("/assets/3d/bar.glb");
