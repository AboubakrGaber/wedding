"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AudioProvider from "@/components/audio/AudioProvider";
import MusicToggle from "@/components/audio/MusicToggle";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Details from "@/components/Details";
import Rsvp from "@/components/Rsvp";
import FallingPetals from "@/components/FallingPetals";
import { wedding } from "@/lib/config";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <AudioProvider>
      <main className="relative">
        <AnimatePresence>
          {!opened && <Cover key="cover" onOpen={() => setOpened(true)} />}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <FallingPetals />
              <Hero />
              <Countdown />
              <Details />
              <Rsvp />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <MusicToggle visible={opened} />
      </main>
    </AudioProvider>
  );
}

function Footer() {
  const { partnerA, joiner, partnerB } = wedding.couple;
  return (
    <footer className="paper relative overflow-hidden border-t border-gold/15 px-6 py-14 text-center">
      <p className="script text-5xl text-sage-deep">Thank you</p>
      <p className="tracking-wide-caps mt-3 text-[0.62rem] uppercase text-ink-soft">
        {partnerA} {joiner} {partnerB} · {wedding.dateLabel.month}{" "}
        {wedding.dateLabel.day}, {wedding.dateLabel.year}
      </p>
    </footer>
  );
}
