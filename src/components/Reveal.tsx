import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Scroll-triggered reveal — fade + rise, respects reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section shell with consistent gutters and optional hairline top. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 sm:px-8 lg:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-[1400px]">{children}</div>
    </section>
  );
}

/** Eyebrow + display heading block used across pages. */
export function SectionHead({
  eyebrow,
  title,
  copy,
  dark = true,
  className = "",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`display-2 mt-5 ${dark ? "text-bone" : "text-charcoal"}`}>{title}</h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-[16px] leading-relaxed ${dark ? "text-ash" : "text-charcoal/70"}`}>
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
