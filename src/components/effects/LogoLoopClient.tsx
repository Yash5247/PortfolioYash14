"use client";

import LogoLoopComponent from "./LogoLoop.jsx";
import type { ComponentType, ReactNode } from "react";

export interface LogoItem {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
}

const LogoLoop = LogoLoopComponent as ComponentType<LogoLoopProps>;

export default LogoLoop;
