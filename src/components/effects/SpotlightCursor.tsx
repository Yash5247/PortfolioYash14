"use client";

import { useEffect, useState } from "react";

export function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.08), transparent 40%)`,
      }}
    />
  );
}
