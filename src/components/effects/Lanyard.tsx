"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface LanyardProps {
  children: ReactNode;
  className?: string;
  ropeLength?: number;
}

export function Lanyard({
  children,
  className,
  ropeLength = 220,
}: LanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + ropeLength * 0.4;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      rotateX.set(dy * 18);
      rotateY.set(dx * 22);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rotateX, rotateY, ropeLength]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center ${className ?? ""}`}
      style={{ minHeight: ropeLength + 280 }}
    >
      <div className="absolute top-0 flex flex-col items-center">
        <div className="h-3 w-16 rounded-b-lg bg-muted-foreground/30" />
        <div
          className="w-0.5 bg-gradient-to-b from-muted-foreground/50 to-muted-foreground/20"
          style={{ height: ropeLength }}
        />
      </div>

      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformPerspective: 800,
          marginTop: ropeLength - 8,
        }}
        className="origin-top"
      >
        <motion.div
          animate={{ rotate: [0, 1.5, -1.5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="absolute -top-2 left-1/2 h-4 w-8 -translate-x-1/2 rounded-sm bg-muted-foreground/40" />
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
