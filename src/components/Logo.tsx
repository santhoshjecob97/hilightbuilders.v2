/** Official HILIGHT BUILDERS 3D Hexagon Emblem */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="HILIGHT BUILDERS"
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
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
