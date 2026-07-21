// Central place for all wedding details — edit here to update the whole site.

export const wedding = {
  couple: {
    partnerA: "Youssef",
    partnerB: "Lobna",
    // The ampersand / joining word shown between the names
    joiner: "&",
  },
  intro: "Together with their families",
  invitation: "joyfully invite you to share in their special day",

  // Local time of the celebration. Month is 0-indexed (8 = September).
  date: new Date(2026, 8, 2, 18, 30, 0),
  dateLabel: {
    weekday: "Wednesday",
    month: "September",
    day: "2",
    year: "2026",
    time: "6:30 PM",
  },

  venue: {
    kind: "Venue",
    name: "Greenery",
    place: "Dreamland Golf Resort",
    area: "Hilton",
    // Used for the "open in maps" and calendar location
    mapQuery: "Dreamland Golf Resort Hilton",
  },

  notes: {
    fireworks: "Kindly no fireworks",
    closing: "We can't wait to celebrate with you!",
  },

  // Drop your song at public/music/wedding.mp3 to enable background music.
  musicSrc: "/music/wedding.mp3",
  musicTitle: "Our Song",
} as const;

// ICS calendar payload (1.5h default duration).
export function buildCalendarUrl() {
  const start = wedding.date;
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const { partnerA, joiner, partnerB } = wedding.couple;
  const title = `${partnerA} ${joiner} ${partnerB} — Wedding`;
  const location = `${wedding.venue.name}, ${wedding.venue.place}, ${wedding.venue.area}`;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${wedding.invitation}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf8,${encodeURIComponent(body)}`;
}

const q = encodeURIComponent(wedding.venue.mapQuery);

// Opens the place in Google Maps.
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;

// Opens turn-by-turn directions to the venue (uses the guest's location as start).
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

// Keyless Google Maps embed — safe to iframe without an API key.
export const mapEmbedUrl = `https://maps.google.com/maps?q=${q}&z=14&output=embed`;
