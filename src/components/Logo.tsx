/** Brand monogram — geometric H with the signature orange bar. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="4" y="4" width="10" height="32" fill="#F5F3EF" />
      <rect x="26" y="4" width="10" height="32" fill="#F5F3EF" />
      <rect x="14" y="15" width="12" height="10" fill="#F39800" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={compact ? "h-7 w-7" : "h-9 w-9"} />
      <span className="leading-none">
        <span
          className={`block font-display font-bold tracking-[0.08em] text-bone ${
            compact ? "text-[15px]" : "text-[17px]"
          }`}
        >
          HILIGHT<span className="text-brand">.</span>
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.42em] text-ash">
          Builders
        </span>
      </span>
    </span>
  );
}
