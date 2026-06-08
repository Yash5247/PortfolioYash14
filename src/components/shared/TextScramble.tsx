"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
}

export function TextScramble({
  text,
  className,
  duration = 1200,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.floor(duration / 30);
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealed) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);

      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration]);

  return <span className={className}>{display}</span>;
}
