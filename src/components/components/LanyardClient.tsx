"use client";

import LanyardComponent from "./Lanyard.jsx";
import type { ComponentType } from "react";

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

const Lanyard = LanyardComponent as ComponentType<LanyardProps>;

export default Lanyard;
