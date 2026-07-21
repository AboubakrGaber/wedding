"use client";

import { motion } from "motion/react";
import { wedding } from "@/lib/config";
import { useAudio } from "./audio/AudioProvider";
import Spray from "./floral/Spray";
import Divider from "./ui/Divider";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  const { start } = useAudio();
  const { partnerA, joiner, partnerB } = wedding.couple;

  const handleOpen = () => {
    start(); // user gesture — unlocks audio autoplay
    onOpen();
  };

  return (
    <motion.div
      className="paper fixed inset-0 z-[70] flex items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <Spray
        variant="top-left"
        className="absolute left-0 top-0 h-40 w-40 opacity-90 sm:h-72 sm:w-72 sm:opacity-100"
      />
      <Spray
        variant="bottom-left"
        className="absolute bottom-0 left-0 h-44 w-40 opacity-90 sm:h-80 sm:w-72 sm:opacity-100"
      />
      <Spray
        variant="right"
        className="absolute -right-4 top-1/2 h-80 w-28 -translate-y-1/2 opacity-90 sm:h-[34rem] sm:w-52 sm:opacity-100"
      />

      <motion.div
        className="relative flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="tracking-widest-xl text-[0.62rem] uppercase text-ink-soft sm:text-xs">
          You are invited
        </p>

        <div className="my-7 flex flex-col items-center">
          <h1 className="name-serif text-5xl text-gold-deep sm:text-6xl">
            {partnerA}
          </h1>
          <span className="script my-1 text-4xl text-rose sm:text-5xl">
            {joiner}
          </span>
          <h1 className="name-serif text-5xl text-gold-deep sm:text-6xl">
            {partnerB}
          </h1>
        </div>

        <Divider className="mb-8" />

        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={{ boxShadow: [
            "0 0 0 0 rgba(177,138,92,0.0)",
            "0 0 0 10px rgba(177,138,92,0.0)",
          ] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="group rounded-full border border-gold/60 bg-cream/60 px-9 py-3 text-sm uppercase tracking-wide-caps text-gold-deep backdrop-blur-sm transition-colors hover:bg-gold hover:text-cream"
        >
          Open Invitation
        </motion.button>
        <p className="mt-4 text-xs italic text-ink-soft">
          ♪ turn your sound on
        </p>
      </motion.div>
    </motion.div>
  );
}
