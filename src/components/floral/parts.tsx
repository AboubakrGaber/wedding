/**
 * Botanical SVG primitives — soft, layered fills in the wedding palette to
 * evoke watercolour florals. Composed into corner sprays in `Spray.tsx`.
 * All parts draw around their own local origin so they can be transformed.
 */
import * as React from "react";

/* A single tapered leaf with a midrib. */
export function Leaf({
  fill = "var(--color-sage)",
  vein = "var(--color-sage-deep)",
  scale = 1,
  rotate = 0,
  x = 0,
  y = 0,
}: {
  fill?: string;
  vein?: string;
  scale?: number;
  rotate?: number;
  x?: number;
  y?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C 10 -6 22 -6 34 0 C 22 6 10 6 0 0 Z"
        fill={fill}
        opacity="0.92"
      />
      <path
        d="M0 0 C 10 -6 22 -6 34 0"
        fill="none"
        stroke={vein}
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path d="M2 0 H 31" stroke={vein} strokeWidth="0.7" opacity="0.45" />
    </g>
  );
}

/* A leafy stem — several leaves alternating along a gentle curve. */
export function Sprig({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  fill = "var(--color-sage)",
  vein = "var(--color-sage-deep)",
  count = 5,
  length = 96,
}: {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  fill?: string;
  vein?: string;
  count?: number;
  length?: number;
}) {
  const leaves = Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    const lx = t * length;
    const ly = -Math.sin(t * Math.PI) * 6;
    const side = i % 2 === 0 ? 1 : -1;
    const s = (1 - t * 0.55) * 0.9;
    return (
      <Leaf
        key={i}
        x={lx}
        y={ly}
        rotate={side * 38}
        scale={s}
        fill={fill}
        vein={vein}
      />
    );
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d={`M0 0 Q ${length * 0.5} -10 ${length} -4`}
        fill="none"
        stroke={vein}
        strokeWidth="1.4"
        opacity="0.6"
      />
      {leaves}
      {/* terminal bud */}
      <Leaf x={length} y={-4} rotate={-8} scale={0.5} fill={fill} vein={vein} />
    </g>
  );
}

/* A cluster of tiny blush filler blossoms on thread-like stems. */
export function FillerBlossoms({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
}) {
  const dots = [
    [6, -20],
    [16, -34],
    [26, -18],
    [34, -38],
    [44, -22],
    [20, -8],
    [40, -6],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {dots.map(([dx, dy], i) => (
        <g key={i}>
          <path
            d={`M0 0 Q ${dx * 0.5} ${dy * 0.6} ${dx} ${dy}`}
            fill="none"
            stroke="var(--color-sage-deep)"
            strokeWidth="0.7"
            opacity="0.4"
          />
          <TinyBlossom x={dx} y={dy} scale={0.5 + (i % 3) * 0.12} />
        </g>
      ))}
    </g>
  );
}

function TinyBlossom({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-5"
          rx="3.1"
          ry="4.6"
          fill="var(--color-blush-soft)"
          transform={`rotate(${a})`}
          opacity="0.95"
        />
      ))}
      <circle r="2" fill="var(--color-gold)" opacity="0.9" />
    </g>
  );
}

/* A large open cosmos / poppy-like bloom — the focal flower. */
export function Cosmos({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  petal = "#ffffff",
  petalEdge = "#f0e4d8",
}: {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  petal?: string;
  petalEdge?: string;
}) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path
            d="M0 0 C -13 -20 -9 -46 0 -54 C 9 -46 13 -20 0 0 Z"
            fill={petal}
            stroke={petalEdge}
            strokeWidth="1.1"
            opacity="0.97"
          />
          <path
            d="M0 -6 C -3 -24 -2 -40 0 -50"
            fill="none"
            stroke={petalEdge}
            strokeWidth="0.7"
            opacity="0.5"
          />
        </g>
      ))}
      <circle r="10" fill="var(--color-gold)" opacity="0.95" />
      <circle r="10" fill="url(#centerGlow)" />
      {/* stamen dots */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * 6}
            cy={Math.sin(a) * 6}
            r="1.3"
            fill="var(--color-gold-deep)"
          />
        );
      })}
    </g>
  );
}

/* A closed poppy bud on a curved stem. */
export function Bud({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 Q 6 34 0 60"
        fill="none"
        stroke="var(--color-sage-deep)"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <path
        d="M0 0 C -12 -4 -13 -20 0 -26 C 13 -20 12 -4 0 0 Z"
        fill="#fdfbf6"
        stroke="#e7dccb"
        strokeWidth="1"
      />
      <path
        d="M0 2 C -10 0 -11 -14 -2 -22"
        fill="var(--color-sage)"
        opacity="0.85"
      />
      <path
        d="M0 2 C 10 0 11 -14 2 -22"
        fill="var(--color-sage-deep)"
        opacity="0.7"
      />
    </g>
  );
}

export function FloralDefs() {
  return (
    <defs>
      <radialGradient id="centerGlow" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#f6e2b8" />
        <stop offset="100%" stopColor="var(--color-gold-deep)" />
      </radialGradient>
    </defs>
  );
}
