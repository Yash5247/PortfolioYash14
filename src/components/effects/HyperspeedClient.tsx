"use client";

import HyperspeedComponent from "./Hyperspeed.jsx";
import type { ComponentType } from "react";
import type { HYPERSPEED_OPTIONS } from "@/lib/hyperspeed-options";

type HyperspeedOptions = typeof HYPERSPEED_OPTIONS;

export interface HyperspeedProps {
  effectOptions?: HyperspeedOptions;
}

const Hyperspeed = HyperspeedComponent as ComponentType<HyperspeedProps>;

export default Hyperspeed;
