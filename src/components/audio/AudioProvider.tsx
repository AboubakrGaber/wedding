"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { wedding } from "@/lib/config";

const DEFAULT_VOLUME = 0.55;

type AudioState = {
  isPlaying: boolean;
  isAvailable: boolean;
  volume: number;
  muted: boolean;
  /** Start playback (used when the guest opens the invitation). */
  start: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const Ctx = createContext<AudioState | null>(null);

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within <AudioProvider>");
  return ctx;
}

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);

  // Keep the latest desired volume/mute available to the fade routine.
  const targetRef = useRef(DEFAULT_VOLUME);
  targetRef.current = muted ? 0 : volume;

  useEffect(() => {
    const el = new Audio(wedding.musicSrc);
    el.loop = true;
    el.preload = "auto";
    el.volume = 0;
    const onError = () => setIsAvailable(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("error", onError);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    audioRef.current = el;
    return () => {
      el.removeEventListener("error", onError);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.pause();
      audioRef.current = null;
    };
  }, []);

  // Gentle fade so the music eases in rather than snapping on.
  const fadeToTarget = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    const step = () => {
      if (!audioRef.current) return;
      const target = targetRef.current;
      const diff = target - el.volume;
      if (Math.abs(diff) < 0.02) {
        el.volume = target;
        return;
      }
      el.volume = Math.min(1, Math.max(0, el.volume + diff * 0.08));
      requestAnimationFrame(step);
    };
    step();
  }, []);

  const start = useCallback(() => {
    const el = audioRef.current;
    if (!el || !isAvailable) return;
    el.play()
      .then(() => fadeToTarget())
      .catch(() => {
        /* Autoplay blocked — the floating control lets the guest tap to play. */
      });
  }, [fadeToTarget, isAvailable]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !isAvailable) return;
    if (el.paused) {
      el.play()
        .then(() => fadeToTarget())
        .catch(() => {});
    } else {
      el.pause();
    }
  }, [fadeToTarget, isAvailable]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    if (clamped > 0) setMuted(false);
    const el = audioRef.current;
    if (el) el.volume = clamped; // immediate response while dragging
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      const el = audioRef.current;
      if (el) el.volume = next ? 0 : volume;
      return next;
    });
  }, [volume]);

  return (
    <Ctx.Provider
      value={{
        isPlaying,
        isAvailable,
        volume,
        muted,
        start,
        toggle,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
