"use client";

import dynamic from "next/dynamic";
import { PlexusField } from "./PlexusField";

const FluidGlass = dynamic(() => import("./FluidGlass"), { ssr: false });

interface SceneBackgroundProps {
  className?: string;
}

export function SceneBackground({ className }: SceneBackgroundProps) {
  return (
    <div className={className}>
      <FluidGlass
        className="h-full w-full"
        mode="lens"
        lensProps={{
          scale: 0.22,
          ior: 1.18,
          thickness: 4,
          chromaticAberration: 0.08,
          anisotropy: 0.015,
          transmission: 1,
          roughness: 0,
        }}
      >
        <PlexusField />
      </FluidGlass>
    </div>
  );
}
