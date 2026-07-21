"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { wedding } from "@/lib/config";
import Reveal from "./ui/Reveal";
import Divider from "./ui/Divider";

type Status = "idle" | "sending" | "done" | "error";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          attending,
          guests: attending ? guests : 0,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Request failed");
      }
      setStatus("done");
    } catch {
      setError(
        "We couldn't save your reply just now. Please try again shortly.",
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="rsvp"
      className="paper relative overflow-hidden px-6 py-24 text-center"
    >
      <Reveal>
        <p className="tracking-wide-caps text-[0.66rem] uppercase text-gold-deep">
          Kindly reply
        </p>
        <h2 className="script mt-2 text-5xl text-sage-deep sm:text-6xl">
          Will you join us?
        </h2>
        <Divider className="my-8" />
      </Reveal>

      <div className="mx-auto max-w-md">
        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-gold/30 bg-cream/60 px-8 py-12 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose/20"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
                  <path
                    d="M12 21s-7.5-4.9-9.5-9.2C1.1 8.6 2.6 5.5 5.7 5.1c2-.3 3.5.8 4.3 2.1.8-1.3 2.3-2.4 4.3-2.1 3.1.4 4.6 3.5 3.2 6.7C19.5 16.1 12 21 12 21Z"
                    fill="var(--color-rose)"
                  />
                </svg>
              </motion.div>
              <h3 className="name-serif text-3xl text-gold-deep">
                {attending ? "We can't wait to see you!" : "We'll miss you"}
              </h3>
              <p className="mt-3 text-ink-soft">
                {attending
                  ? `Thank you, ${name.split(" ")[0]}. Your reply is received.`
                  : "Thank you for letting us know — you'll be in our hearts."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-gold/25 bg-cream/50 px-6 py-8 text-left backdrop-blur-sm sm:px-9"
            >
              <Field label="Your name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  className="input"
                />
              </Field>

              <Field label="Phone (optional)">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="So we can reach you"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="input"
                />
              </Field>

              <Field label="Will you attend?">
                <div className="grid grid-cols-2 gap-3">
                  <Choice
                    active={attending}
                    onClick={() => setAttending(true)}
                  >
                    Joyfully accept
                  </Choice>
                  <Choice
                    active={!attending}
                    onClick={() => setAttending(false)}
                  >
                    Regretfully decline
                  </Choice>
                </div>
              </Field>

              <AnimatePresence initial={false}>
                {attending && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Field label="Number of guests (including you)">
                      <div className="flex items-center gap-4">
                        <Stepper
                          onClick={() => setGuests((g) => Math.max(1, g - 1))}
                          label="−"
                        />
                        <span className="name-serif w-10 text-center text-3xl text-rose-deep">
                          {guests}
                        </span>
                        <Stepper
                          onClick={() => setGuests((g) => Math.min(10, g + 1))}
                          label="+"
                        />
                      </div>
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              <Field label="A note for the couple (optional)">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share your wishes…"
                  className="input resize-none"
                />
              </Field>

              {status === "error" && (
                <p className="mb-3 text-sm text-rose-deep">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-full rounded-full bg-gold py-3 text-sm uppercase tracking-wide-caps text-cream transition-colors hover:bg-gold-deep disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-10 script text-4xl text-rose">
        {wedding.couple.partnerA} {wedding.couple.joiner}{" "}
        {wedding.couple.partnerB}
      </p>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(177,138,92,0.35);
          background: rgba(255,255,255,0.5);
          padding: 0.7rem 0.9rem;
          color: var(--color-ink);
          font-family: var(--font-body);
          font-size: 1rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input::placeholder { color: var(--color-ink-soft); opacity: .6; }
        .input:focus {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px rgba(177,138,92,0.12);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-5 block">
      <span className="tracking-wide-caps mb-2 block text-[0.6rem] uppercase text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2.5 text-xs uppercase tracking-wide-caps transition-colors ${
        active
          ? "border-gold bg-gold text-cream"
          : "border-gold/40 text-gold-deep hover:bg-gold/10"
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-xl text-gold-deep transition-colors hover:bg-gold hover:text-cream"
    >
      {label}
    </button>
  );
}
