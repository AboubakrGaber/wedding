/** A small gold sprig divider — two leaves flanking a dot. */
export default function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="54" height="16" viewBox="0 0 54 16" fill="none">
        <path
          d="M27 3c-4 0-9 2-13 5 4 1 10 1 13-2 3 3 9 3 13 2-4-3-9-5-13-5Z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="27" cy="9.5" r="2" fill="currentColor" />
      </svg>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}
