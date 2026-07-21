"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/config";
import Reveal from "./ui/Reveal";
import Divider from "./ui/Divider";

function diff(target: number) {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    days: Math.floor(total / 86400000),
    hours: Math.floor((total / 3600000) % 24),
    minutes: Math.floor((total / 60000) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export default function Countdown() {
  const target = wedding.date.getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t?.days },
    { label: "Hours", value: t?.hours },
    { label: "Minutes", value: t?.minutes },
    { label: "Seconds", value: t?.seconds },
  ];

  const isHere = t !== null && t.total === 0;

  return (
    <section
      id="countdown"
      className="paper relative overflow-hidden px-6 py-24 text-center"
    >
      <Reveal>
        <p className="tracking-wide-caps text-[0.66rem] uppercase text-gold-deep">
          {isHere ? "Today is the day" : "Counting down to forever"}
        </p>
        <h2 className="script mt-2 text-5xl text-sage-deep sm:text-6xl">
          {isHere ? "We're married!" : "Save the date"}
        </h2>
        <Divider className="my-8" />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-3 sm:gap-6">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-2xl border border-gold/25 bg-cream/50 px-2 py-5 backdrop-blur-sm sm:py-7"
            >
              <div className="name-serif text-4xl text-rose-deep sm:text-6xl">
                {u.value === undefined
                  ? "—"
                  : String(u.value).padStart(2, "0")}
              </div>
              <div className="tracking-wide-caps mt-2 text-[0.58rem] uppercase text-ink-soft sm:text-xs">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
