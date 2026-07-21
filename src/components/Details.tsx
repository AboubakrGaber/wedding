"use client";

import { buildCalendarUrl, mapsUrl, wedding } from "@/lib/config";
import Reveal from "./ui/Reveal";
import Divider from "./ui/Divider";

export default function Details() {
  const { dateLabel, venue } = wedding;

  return (
    <section
      id="details"
      className="paper relative overflow-hidden px-6 py-24 text-center"
    >
      <Reveal>
        <p className="tracking-wide-caps text-[0.66rem] uppercase text-gold-deep">
          The celebration
        </p>
        <h2 className="script mt-2 text-5xl text-sage-deep sm:text-6xl">
          When &amp; Where
        </h2>
        <Divider className="my-8" />
      </Reveal>

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <Card>
            <CalendarGlyph />
            <h3 className="tracking-wide-caps mt-4 text-sm uppercase text-ink">
              {dateLabel.weekday}
            </h3>
            <p className="name-serif mt-1 text-3xl text-gold-deep">
              {dateLabel.month} {dateLabel.day}, {dateLabel.year}
            </p>
            <p className="mt-1 text-ink-soft">{dateLabel.time}</p>
            <a
              href={buildCalendarUrl()}
              download="youssef-and-lobna.ics"
              className="mt-5 inline-block rounded-full border border-gold/50 px-6 py-2 text-xs uppercase tracking-wide-caps text-gold-deep transition-colors hover:bg-gold hover:text-cream"
            >
              Add to calendar
            </a>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card>
            <PinGlyph />
            <h3 className="tracking-wide-caps mt-4 text-sm uppercase text-ink">
              {venue.name}
            </h3>
            <p className="name-serif mt-1 text-3xl text-gold-deep">
              {venue.place}
            </p>
            <p className="mt-1 text-ink-soft">{venue.area}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-full border border-gold/50 px-6 py-2 text-xs uppercase tracking-wide-caps text-gold-deep transition-colors hover:bg-gold hover:text-cream"
            >
              Open in maps
            </a>
          </Card>
        </Reveal>
      </div>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-12 max-w-md text-sm italic leading-relaxed text-ink-soft">
          {wedding.notes.fireworks} · {wedding.notes.closing}
        </p>
      </Reveal>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center rounded-3xl border border-gold/25 bg-cream/50 px-8 py-10 backdrop-blur-sm">
      {children}
    </div>
  );
}

function CalendarGlyph() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2.5"
        stroke="var(--color-gold-deep)"
        strokeWidth="1.3"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="var(--color-gold-deep)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="2" fill="var(--color-rose)" />
    </svg>
  );
}

function PinGlyph() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-6.2 7-12A7 7 0 0 0 5 10c0 5.8 7 12 7 12Z"
        stroke="var(--color-gold-deep)"
        strokeWidth="1.3"
      />
      <circle cx="12" cy="10" r="2.6" fill="var(--color-rose)" />
    </svg>
  );
}
