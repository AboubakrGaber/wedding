"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAudio } from "./AudioProvider";

export default function MusicToggle({ visible }: { visible: boolean }) {
  const { isPlaying, isAvailable, muted, volume, toggle, toggleMute, setVolume } =
    useAudio();
  const [expanded, setExpanded] = useState(false);

  const showSpeaker = muted || volume === 0;

  return (
    <AnimatePresence>
      {visible && isAvailable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 240, damping: 20 }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream/85 p-1.5 shadow-[0_6px_20px_rgba(153,113,63,0.18)] backdrop-blur-sm sm:bottom-5 sm:right-5"
        >
          {/* Play / pause with animated equalizer */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-gold-deep transition-colors hover:bg-gold/10"
          >
            <span className="flex h-4 items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gold-deep"
                  animate={
                    isPlaying
                      ? { height: ["30%", "100%", "45%", "85%", "30%"] }
                      : { height: "35%" }
                  }
                  transition={
                    isPlaying
                      ? {
                          duration: 0.9,
                          repeat: Infinity,
                          delay: i * 0.12,
                          ease: "easeInOut",
                        }
                      : { duration: 0.3 }
                  }
                  style={{ height: "35%" }}
                />
              ))}
            </span>
          </button>

          {/* Volume slider — expandable to stay compact on small screens */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 84, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume"
                  className="vol-slider w-[78px]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-gold-deep transition-colors hover:bg-gold/10"
          >
            {showSpeaker ? <SpeakerMuted /> : <SpeakerOn />}
          </button>

          {/* Expand/collapse the slider */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Hide volume" : "Adjust volume"}
            aria-expanded={expanded}
            className="flex h-11 w-8 items-center justify-center rounded-full text-gold-deep/70 transition-colors hover:bg-gold/10"
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
            >
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>

          <style>{`
            .vol-slider {
              -webkit-appearance: none;
              appearance: none;
              height: 4px;
              border-radius: 9999px;
              background: linear-gradient(
                to right,
                var(--color-gold) 0%,
                var(--color-gold) ${(muted ? 0 : volume) * 100}%,
                rgba(177,138,92,0.25) ${(muted ? 0 : volume) * 100}%,
                rgba(177,138,92,0.25) 100%
              );
              outline: none;
              cursor: pointer;
            }
            .vol-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: var(--color-gold-deep);
              border: 2px solid var(--color-cream);
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            .vol-slider::-moz-range-thumb {
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background: var(--color-gold-deep);
              border: 2px solid var(--color-cream);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpeakerOn() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h4l5 4V5L8 9H4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M16.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerMuted() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" opacity="0.9" />
      <path
        d="M17 9l4 4M21 9l-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
