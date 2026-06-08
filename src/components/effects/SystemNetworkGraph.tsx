"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { portfolioData } from "@/data/portfolio";

interface SystemNetworkGraphProps {
  className?: string;
  interactive?: boolean;
}

interface GraphNode {
  id: string;
  label: string;
  position: THREE.Vector3;
  color: number;
}

interface DataPacket {
  mesh: THREE.Mesh;
  from: THREE.Vector3;
  to: THREE.Vector3;
  progress: number;
  speed: number;
}

export function SystemNetworkGraph({
  className,
  interactive = true,
}: SystemNetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { nodes: nodeDefs, edges: edgeDefs } = portfolioData.systemArchitecture;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const nodes: GraphNode[] = nodeDefs.map((n) => ({
      id: n.id,
      label: n.label,
      position: new THREE.Vector3(n.x, n.y, n.z),
      color: new THREE.Color(n.color).getHex(),
    }));

    const nodeMeshes = new Map<string, THREE.Mesh>();
    const nodeGroup = new THREE.Group();

    nodes.forEach((node) => {
      const geometry = new THREE.SphereGeometry(0.22, 24, 24);
      const material = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(node.position);
      nodeGroup.add(mesh);
      nodeMeshes.set(node.id, mesh);

      const ringGeometry = new THREE.RingGeometry(0.28, 0.32, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(node.position);
      ring.lookAt(camera.position);
      nodeGroup.add(ring);
    });

    scene.add(nodeGroup);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.2,
    });

    const packets: DataPacket[] = [];

    edgeDefs.forEach((edge, i) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      const points = [fromNode.position, toNode.position];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);

      if (!prefersReducedMotion) {
        const packetGeometry = new THREE.SphereGeometry(0.06, 8, 8);
        const packetMaterial = new THREE.MeshBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.85,
        });
        const packetMesh = new THREE.Mesh(packetGeometry, packetMaterial);
        scene.add(packetMesh);

        packets.push({
          mesh: packetMesh,
          from: fromNode.position.clone(),
          to: toNode.position.clone(),
          progress: (i * 0.2) % 1,
          speed: 0.003 + (i % 3) * 0.001,
        });
      }
    });

    const ambientParticles = new THREE.BufferGeometry();
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 16;
    }
    ambientParticles.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
    });
    const particleField = new THREE.Points(ambientParticles, particleMaterial);
    scene.add(particleField);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        nodeGroup.rotation.y += 0.0015;
        particleField.rotation.y -= 0.0005;

        packets.forEach((packet) => {
          packet.progress += packet.speed;
          if (packet.progress > 1) packet.progress = 0;
          packet.mesh.position.lerpVectors(
            packet.from,
            packet.to,
            packet.progress
          );
        });

        nodeMeshes.forEach((mesh, id) => {
          const scale = 1 + Math.sin(Date.now() * 0.002 + id.length) * 0.05;
          mesh.scale.setScalar(scale);
        });
      }

      if (interactive) {
        camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
        if (obj instanceof THREE.Line) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      ambientParticles.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      role="presentation"
    />
  );
}
