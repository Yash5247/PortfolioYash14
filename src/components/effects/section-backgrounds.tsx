"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div
        className="animate-grid-drift absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

export function NetworkGraphBg({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = [
      { x: 0.15, y: 0.3, label: "MRV" },
      { x: 0.35, y: 0.6, label: "AI" },
      { x: 0.55, y: 0.25, label: "ShortsOS" },
      { x: 0.75, y: 0.55, label: "API" },
      { x: 0.5, y: 0.75, label: "DB" },
    ];
    const edges = [[0, 1], [1, 2], [1, 3], [3, 4], [2, 4], [0, 4]];

    let id: number;
    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      t += 0.005;
      const pulse = Math.sin(t) * 0.5 + 0.5;

      edges.forEach(([a, b]) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        ctx.beginPath();
        ctx.moveTo(n1.x * w, n1.y * h);
        ctx.lineTo(n2.x * w, n2.y * h);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 + pulse * 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((n, i) => {
        const ox = Math.sin(t + i) * 8;
        const oy = Math.cos(t + i * 0.7) * 6;
        ctx.beginPath();
        ctx.arc(n.x * w + ox, n.y * h + oy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${0.3 + pulse * 0.2})`;
        ctx.fill();
      });

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

export function DataFlowBg({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layers = 4;
    let id: number;
    let offset = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      offset += 0.5;
      const layerH = h / (layers + 1);

      for (let i = 0; i < layers; i++) {
        const y = layerH * (i + 1);
        ctx.strokeStyle = `rgba(99, 102, 241, 0.12)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        const dotX = ((offset + i * 80) % w);
        ctx.beginPath();
        ctx.arc(dotX, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.6)";
        ctx.fill();
      }

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

export function TimelineGlow({ activeIndex, className }: { activeIndex: number; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div
        className="absolute left-8 top-0 w-px transition-all duration-700 ease-out"
        style={{
          height: "100%",
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(99,102,241,0.4) ${15 + activeIndex * 25}%, 
            rgba(167,139,250,0.6) ${25 + activeIndex * 25}%, 
            rgba(99,102,241,0.2) ${35 + activeIndex * 25}%, 
            transparent 100%)`,
          boxShadow: "0 0 20px rgba(99,102,241,0.3)",
        }}
      />
    </div>
  );
}

export function GridScan({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let scanY = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const grid = 40;
      ctx.strokeStyle = "rgba(99, 102, 241, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      scanY = (scanY + 1.2) % h;
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(129, 140, 248, 0.15)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, w, 120);

      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

export function HeroNetworkBg({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = [
      { x: 0.2, y: 0.35, label: "API" },
      { x: 0.45, y: 0.55, label: "DB" },
      { x: 0.65, y: 0.3, label: "Client" },
      { x: 0.8, y: 0.6, label: "AI" },
      { x: 0.35, y: 0.75, label: "Deploy" },
      { x: 0.55, y: 0.45, label: "Flow" },
    ];
    const edges = [
      [0, 5],
      [5, 1],
      [5, 2],
      [2, 3],
      [1, 4],
      [3, 4],
      [0, 2],
    ];

    let id: number;
    let t = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, w, h);

      t += 0.006;
      const { x: mx, y: my } = mouseRef.current;

      const positions = nodes.map((n, i) => ({
        x: n.x * w + Math.sin(t + i) * 10,
        y: n.y * h + Math.cos(t + i * 0.8) * 8,
      }));

      edges.forEach(([a, b], i) => {
        const p1 = positions[a];
        const p2 = positions[b];
        const progress = ((t * 0.25 + i * 0.15) % 1);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
        const dotX = p1.x + (p2.x - p1.x) * progress;
        const dotY = p1.y + (p2.y - p1.y) * progress;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.8)";
        ctx.fill();
      });

      positions.forEach((p) => {
        const near = Math.hypot(mx - p.x, my - p.y) < 100;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = near
          ? "rgba(167, 139, 250, 0.95)"
          : "rgba(129, 140, 248, 0.5)";
        ctx.fill();
      });

      id = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div
        className="animate-mesh-shift absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(167,139,250,0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(79,70,229,0.15) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
