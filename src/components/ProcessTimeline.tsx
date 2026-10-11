import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "./Reveal";

export type ProcessStep = {
  n: string;
  title: string;
  copy: string;
};

/** Scroll-linked vertical timeline — orange line draws as you scroll. */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative">
      {/* Rail */}
      <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-1/2" aria-hidden />
      {!reduce && (
        <motion.div
          className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-brand md:left-1/2"
          style={{ scaleY }}
          aria-hidden
        />
      )}
      <ol className="space-y-12 md:space-y-20">
        {steps.map((step, i) => (
          <li key={step.n} className="relative">
            <div
              className={`grid items-start gap-4 pl-10 md:grid-cols-2 md:gap-16 md:pl-0 ${
                i % 2 === 1 ? "md:text-left" : ""
              }`}
            >
              {/* Node */}
              <span
                className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center md:left-1/2 md:-translate-x-1/2`}
                aria-hidden
              >
                <span className="h-[15px] w-[15px] rotate-45 border border-brand bg-charcoal" />
              </span>
              <Reveal
                className={`${i % 2 === 1 ? "md:order-2 md:pl-16" : "md:pr-16 md:text-right"}`}
              >
                <p className="font-mono text-[12px] tracking-[0.3em] text-brand">{step.n}</p>
                <h3 className="display-3 mt-2 text-bone">{step.title}</h3>
              </Reveal>
              <Reveal
                delay={0.1}
                className={`${i % 2 === 1 ? "md:order-1 md:pr-16 md:text-right" : "md:pl-16"}`}
              >
                <p className="max-w-md text-[15px] leading-relaxed text-ash md:inline-block">
                  {step.copy}
                </p>
              </Reveal>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
