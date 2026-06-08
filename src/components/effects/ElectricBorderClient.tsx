"use client";

import ElectricBorderComponent from "./ElectricBorder.jsx";
import type { ComponentType, CSSProperties, ReactNode } from "react";

export interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder = ElectricBorderComponent as ComponentType<ElectricBorderProps>;

export default ElectricBorder;
