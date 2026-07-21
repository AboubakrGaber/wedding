"use client";

import { directionsUrl, mapEmbedUrl, mapsUrl, wedding } from "@/lib/config";
import Reveal from "./ui/Reveal";
import Divider from "./ui/Divider";

export default function Location() {
  const { venue } = wedding;

  return (
    <section
      id="location"
      className="paper relative overflow-hidden px-4 py-24 text-center sm:px-6"
    >
      <Reveal>
        <p className="tracking-wide-caps text-[0.66rem] uppercase text-gold-deep">
          Find your way
        </p>
        <h2 className="script mt-2 text-5xl text-sage-deep sm:text-6xl">
          The Location
        </h2>
        <Divider className="my-8" />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mb-8 max-w-lg">
          <p className="name-serif text-3xl text-gold-deep">{venue.place}</p>
          <p className="mt-1 tracking-wide-caps text-sm uppercase text-ink-soft">
            {venue.name} · {venue.area}
          </p>
        </div>
      </Reveal>

      {/* Embedded map */}
      <Reveal delay={0.15}>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold/30 bg-cream/60 p-2 shadow-[0_10px_30px_rgba(153,113,63,0.12)]">
          <iframe
            title={`Map to ${venue.place}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full rounded-2xl sm:h-80"
            style={{ border: 0 }}
          />
        </div>
      </Reveal>

      {/* Actions */}
      <Reveal delay={0.2}>
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm uppercase tracking-wide-caps text-cream transition-colors hover:bg-gold-deep sm:w-auto"
          >
            <RouteIcon />
            Get Directions
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3 text-sm uppercase tracking-wide-caps text-gold-deep transition-colors hover:bg-gold/10 sm:w-auto"
          >
            <PinIcon />
            Open in Maps
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-6 max-w-sm text-xs italic text-ink-soft">
          Tap “Get Directions” to open turn-by-turn navigation from wherever you
          are.
        </p>
      </Reveal>
    </section>
  );
}

function RouteIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 20V9a3 3 0 0 1 3-3h6a3 3 0 0 0 3-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="20" r="2" fill="currentColor" />
      <path
        d="M18 3l2.2 1.3L18 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s7-6.2 7-12A7 7 0 0 0 5 10c0 5.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}
