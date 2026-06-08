"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='pointer'], input, textarea")
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: hovering ? 48 : 12,
            height: hovering ? 48 : 12,
            x: hovering ? -24 : -6,
            y: hovering ? -24 : -6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-full border border-white bg-white/20 backdrop-blur-sm"
        />
      </motion.div>
    </>
  );
}
