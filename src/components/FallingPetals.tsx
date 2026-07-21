"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  hue: string;
  rotate: number;
};

const HUES = [
  "var(--color-blush-soft)",
  "var(--color-blush)",
  "#ffffff",
  "var(--color-sage-soft)",
];

export default function FallingPetals({ count = 16 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    setPetals(
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 11 + Math.random() * 12,
        size: 10 + Math.random() * 12,
        drift: -40 + Math.random() * 80,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        rotate: Math.random() * 360,
      })),
    );
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute top-[-8%]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.25,
              background: p.hue,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
      <style>{`
        .petal {
          border-radius: 82% 18% 78% 22% / 68% 42% 58% 32%;
          opacity: 0;
          filter: blur(0.2px);
          will-change: transform, opacity;
          animation-name: petalfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes petalfall {
          0%   { opacity: 0; transform: translate(0,0) rotate(var(--spin)); }
          8%   { opacity: 0.85; }
          90%  { opacity: 0.7; }
          100% {
            opacity: 0;
            transform: translate(var(--drift), 108vh) rotate(calc(var(--spin) + 220deg));
          }
        }
      `}</style>
    </div>
  );
}
