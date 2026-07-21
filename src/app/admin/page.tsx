import { supabase, type Rsvp } from "@/lib/supabase";
import { wedding } from "@/lib/config";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "RSVP Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  let rows: Rsvp[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("rsvp")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) loadError = true;
    else rows = (data as Rsvp[]) ?? [];
  } else {
    loadError = true;
  }

  const attendingRows = rows.filter((r) => r.attending);
  const totalGuests = attendingRows.reduce((n, r) => n + (r.guests || 0), 0);
  const declined = rows.length - attendingRows.length;

  return (
    <main className="paper min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <p className="tracking-wide-caps text-[0.62rem] uppercase text-gold-deep">
            {wedding.couple.partnerA} {wedding.couple.joiner}{" "}
            {wedding.couple.partnerB}
          </p>
          <h1 className="script mt-1 text-5xl text-sage-deep sm:text-6xl">
            RSVP Dashboard
          </h1>
        </header>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
          <Stat label="Replies" value={rows.length} />
          <Stat label="Guests coming" value={totalGuests} />
          <Stat label="Declined" value={declined} />
        </div>

        {loadError ? (
          <p className="mt-10 text-center text-ink-soft">
            Could not load RSVPs. Check the database connection.
          </p>
        ) : rows.length === 0 ? (
          <p className="mt-10 text-center text-ink-soft">
            No replies yet — they&apos;ll appear here as guests respond.
          </p>
        ) : (
          <>
            {/* Table for larger screens */}
            <div className="mt-8 hidden overflow-hidden rounded-3xl border border-gold/25 bg-cream/60 sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-gold/90 text-cream">
                  <tr>
                    {["Name", "Phone", "Attending", "Guests", "Message", "Date"].map(
                      (h) => (
                        <th
                          key={h}
                          className="tracking-wide-caps px-4 py-3 text-[0.62rem] uppercase"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-gold/15">
                      <td className="px-4 py-3 font-medium text-ink">{r.name}</td>
                      <td className="px-4 py-3 text-ink-soft">{r.phone || "—"}</td>
                      <td className="px-4 py-3">
                        <StatusPill attending={r.attending} />
                      </td>
                      <td className="px-4 py-3 text-ink">
                        {r.attending ? r.guests : "—"}
                      </td>
                      <td className="max-w-xs px-4 py-3 text-ink-soft">
                        {r.message || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                        {formatDate(r.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className="mt-8 space-y-3 sm:hidden">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-gold/25 bg-cream/60 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="name-serif text-xl text-gold-deep">
                      {r.name}
                    </span>
                    <StatusPill attending={r.attending} />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                    {r.attending && <span>{r.guests} guest(s)</span>}
                    {r.phone && <span>{r.phone}</span>}
                    <span>{formatDate(r.created_at)}</span>
                  </div>
                  {r.message && (
                    <p className="mt-2 text-sm italic text-ink">
                      &ldquo;{r.message}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gold/25 bg-cream/50 px-2 py-5 text-center">
      <div className="name-serif text-4xl text-rose-deep sm:text-5xl">{value}</div>
      <div className="tracking-wide-caps mt-1 text-[0.55rem] uppercase text-ink-soft sm:text-[0.62rem]">
        {label}
      </div>
    </div>
  );
}

function StatusPill({ attending }: { attending: boolean }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-wide-caps ${
        attending
          ? "bg-sage/20 text-sage-deep"
          : "bg-rose/20 text-rose-deep"
      }`}
    >
      {attending ? "Coming" : "Regrets"}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
