"use client";

import { motion } from "motion/react";
import { wedding } from "@/lib/config";
import Spray from "./floral/Spray";

function NoFireworks() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <g stroke="var(--color-gold-deep)" strokeWidth="1.4" strokeLinecap="round">
        <line x1="20" y1="6" x2="20" y2="1" />
        <line x1="27" y1="9" x2="30" y2="5" />
        <line x1="13" y1="9" x2="10" y2="5" />
        <line x1="30" y1="16" x2="34" y2="14" />
        <line x1="10" y1="16" x2="6" y2="14" />
        <path
          d="M20 12 L18 22 L22 22 Z"
          fill="var(--color-gold-deep)"
          stroke="none"
        />
        <path d="M18 22 L15 34 L25 34 L22 22" />
        <circle cx="20" cy="20" r="18" />
        <line x1="7" y1="7" x2="33" y2="33" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const { couple, dateLabel, venue, intro, invitation } = wedding;

  return (
    <section
      id="invitation"
      className="paper relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16"
    >
      <Spray
        variant="top-left"
        className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-90 sm:h-64 sm:w-64 sm:opacity-100 lg:h-80 lg:w-80"
      />
      <Spray
        variant="bottom-left"
        className="pointer-events-none absolute bottom-0 left-0 h-36 w-32 opacity-90 sm:h-72 sm:w-64 sm:opacity-100 lg:h-96 lg:w-80"
      />
      <Spray
        variant="right"
        className="pointer-events-none absolute -right-2 top-1/2 h-72 w-24 -translate-y-1/2 opacity-90 sm:h-[32rem] sm:w-44 sm:opacity-100 lg:h-[40rem] lg:w-56"
      />

      {/* Arched frame */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="relative rounded-t-[170px] border border-gold/55 px-7 pb-10 pt-14 text-center sm:px-10">
          {/* inner hairline echo */}
          <div className="pointer-events-none absolute inset-2 rounded-t-[160px] border border-gold/20" />

          <p className="tracking-wide-caps text-[0.6rem] uppercase text-gold-deep sm:text-[0.68rem]">
            {intro}
          </p>

          <div className="mt-6 flex flex-col items-center">
            <h1 className="name-serif text-5xl leading-none text-gold-deep sm:text-7xl">
              {couple.partnerA}
            </h1>
            <span className="script -my-1 text-4xl text-rose sm:text-5xl">
              {couple.joiner}
            </span>
            <h1 className="name-serif text-5xl leading-none text-gold-deep sm:text-7xl">
              {couple.partnerB}
            </h1>
          </div>

          <div className="my-5 flex items-center justify-center gap-2 text-sage-deep">
            <Leaflet flip />
            <Leaflet />
          </div>

          <p className="mx-auto max-w-[15rem] font-body text-[0.95rem] italic leading-relaxed text-ink-soft">
            {invitation}
          </p>

          {/* Date row */}
          <div className="mt-8">
            <p className="tracking-wide-caps text-sm font-medium uppercase text-ink">
              {dateLabel.weekday}
            </p>
            <div className="mt-3 flex items-stretch justify-center gap-4 text-gold-deep">
              <div className="flex flex-1 items-center justify-end tracking-wide-caps text-xs uppercase text-ink-soft">
                {dateLabel.month}
              </div>
              <div className="flex items-center">
                <span className="h-8 w-px bg-gold/50" />
                <span className="name-serif px-3 text-4xl text-rose">
                  {dateLabel.day}
                </span>
                <span className="h-8 w-px bg-gold/50" />
              </div>
              <div className="flex flex-1 items-center tracking-wide-caps text-xs uppercase text-ink-soft">
                {dateLabel.time}
              </div>
            </div>
            <p className="tracking-widest-xl mt-2 text-sm text-ink-soft">
              {dateLabel.year}
            </p>
          </div>

          {/* Venue */}
          <div className="mt-8">
            <p className="tracking-wide-caps text-[0.62rem] uppercase text-ink-soft">
              {venue.kind}
            </p>
            <p className="script text-4xl text-sage-deep">{venue.name}</p>
            <p className="tracking-wide-caps mt-1 text-sm uppercase text-ink">
              {venue.place}
            </p>
          </div>

          {/* Location + fireworks note */}
          <div className="mt-7 grid grid-cols-2 items-start gap-4">
            <div className="flex flex-col items-center gap-1">
              <PinIcon />
              <p className="tracking-wide-caps text-xs font-medium uppercase text-ink">
                {venue.area}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <NoFireworks />
              <p className="tracking-wide-caps text-center text-[0.6rem] uppercase leading-tight text-gold-deep">
                {wedding.notes.fireworks}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-7 flex items-center justify-center gap-2 text-gold/70">
            <span className="h-px w-8 bg-gold/40" />
            <svg width="30" height="10" viewBox="0 0 30 10" aria-hidden>
              <path
                d="M15 1c-3 0-7 1.5-10 4 3 .8 7 .8 10-1.5 3 2.3 7 2.3 10 1.5-3-2.5-7-4-10-4Z"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
            <span className="h-px w-8 bg-gold/40" />
          </div>

          <p className="tracking-wide-caps mt-4 text-[0.62rem] uppercase text-ink-soft">
            {wedding.notes.closing}
          </p>
          <div className="mt-2 flex justify-center">
            <HeartIcon />
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#countdown"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-deep"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </section>
  );
}

function Leaflet({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden
    >
      <path
        d="M2 6c6-5 16-5 22 0-6 5-16 5-22 0Z"
        fill="var(--color-sage)"
        opacity="0.7"
      />
      <path d="M2 6h22" stroke="var(--color-sage-deep)" strokeWidth="0.7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-6.2 7-12A7 7 0 0 0 5 10c0 5.8 7 12 7 12Z"
        fill="var(--color-rose)"
        opacity="0.9"
      />
      <circle cx="12" cy="10" r="2.6" fill="var(--color-cream)" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 21s-7.5-4.9-9.5-9.2C1.1 8.6 2.6 5.5 5.7 5.1c2-.3 3.5.8 4.3 2.1.8-1.3 2.3-2.4 4.3-2.1 3.1.4 4.6 3.5 3.2 6.7C19.5 16.1 12 21 12 21Z"
        fill="var(--color-rose)"
      />
    </svg>
  );
}
