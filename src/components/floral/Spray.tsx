/**
 * Composed floral corner sprays built from the botanical primitives.
 * `variant` picks a corner; each is a self-contained SVG that scales to its box.
 */
import * as React from "react";
import {
  Bud,
  Cosmos,
  FillerBlossoms,
  FloralDefs,
  Sprig,
} from "./parts";

type Variant = "top-left" | "bottom-left" | "right";

export default function Spray({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  if (variant === "top-left") {
    return (
      <svg
        viewBox="0 0 260 260"
        className={className}
        aria-hidden
        preserveAspectRatio="xMinYMin meet"
      >
        <FloralDefs />
        <g className="sway">
          <Sprig x={4} y={40} rotate={28} scale={1.05} count={5} />
          <Sprig x={10} y={70} rotate={64} scale={0.9} count={5} />
          <FillerBlossoms x={70} y={70} rotate={40} scale={1.15} />
          <Cosmos x={62} y={58} scale={1.15} rotate={-12} />
          <Cosmos x={26} y={112} scale={0.82} rotate={20} petal="#fdf4f2" />
          <Bud x={120} y={44} rotate={40} scale={0.8} />
        </g>
      </svg>
    );
  }

  if (variant === "bottom-left") {
    return (
      <svg
        viewBox="0 0 260 300"
        className={className}
        aria-hidden
        preserveAspectRatio="xMinYMax meet"
      >
        <FloralDefs />
        <g className="sway-slow">
          <Sprig x={6} y={250} rotate={-30} scale={1.05} count={5} />
          <Sprig x={16} y={220} rotate={-58} scale={0.92} count={5} />
          <FillerBlossoms x={70} y={250} rotate={-42} scale={1.2} />
          <Cosmos x={64} y={224} scale={1.2} rotate={14} />
          <Cosmos x={30} y={176} scale={0.8} rotate={-18} petal="#fdf4f2" />
          <Bud x={120} y={244} rotate={-46} scale={0.82} />
        </g>
      </svg>
    );
  }

  // right — a tall stem with the large focal poppy, echoing the reference
  return (
    <svg
      viewBox="0 0 200 460"
      className={className}
      aria-hidden
      preserveAspectRatio="xMaxYMid meet"
    >
      <FloralDefs />
      <g className="sway-slow">
        <path
          d="M150 460 C 120 340 128 220 108 96"
          fill="none"
          stroke="var(--color-sage-deep)"
          strokeWidth="2.4"
          opacity="0.7"
        />
        <Sprig x={132} y={300} rotate={-150} scale={1.1} count={5} />
        <Sprig x={122} y={210} rotate={150} scale={1} count={5} />
        <Bud x={150} y={150} rotate={188} scale={1.05} />
        <Cosmos x={104} y={92} scale={1.55} rotate={8} />
      </g>
    </svg>
  );
}
