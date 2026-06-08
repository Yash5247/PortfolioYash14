"use client";

import CardSwapComponent, { Card as CardComponent } from "./CardSwap.jsx";
import type { ComponentType, ReactNode, CSSProperties } from "react";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  className?: string;
  children: ReactNode;
}

export interface CardProps {
  customClass?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  children?: ReactNode;
}

const CardSwap = CardSwapComponent as ComponentType<CardSwapProps>;
const Card = CardComponent as ComponentType<CardProps>;

export default CardSwap;
export { Card };
