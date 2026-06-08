"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagnifyLensProps {
  children: ReactNode;
  className?: string;
  lensSize?: number;
  scale?: number;
}

export function MagnifyLens({
  children,
  className,
  lensSize = 140,
  scale = 1.15,
}: MagnifyLensProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
    >
      <div
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: active ? `scale(${scale})` : "scale(1)",
          filter: active ? "brightness(1.08)" : "brightness(1)",
        }}
      >
        {children}
      </div>

      {active && (
        <div
          className="pointer-events-none absolute z-20 rounded-full border border-white/20"
          style={{
            width: lensSize,
            height: lensSize,
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            backdropFilter: "blur(4px) saturate(1.4)",
            WebkitBackdropFilter: "blur(4px) saturate(1.4)",
            boxShadow:
              "inset 0 0 20px rgba(167,139,250,0.15), 0 0 40px rgba(99,102,241,0.2)",
          }}
        />
      )}

      {active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle ${lensSize}px at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.12), transparent)`,
          }}
        />
      )}
    </div>
  );
}
