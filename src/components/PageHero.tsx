import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";

/** Cinematic inner-page hero — full-width image, editorial headline, CTA. */
export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  copy,
  cta,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  copy: string;
  cta?: { to: string; label: string };
}) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex min-h-[72svh] items-end overflow-hidden">
      <motion.img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduce ? undefined : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-16 pt-44 sm:px-8 lg:px-12">
        <motion.p
          className="eyebrow"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="display-1 mt-5 max-w-4xl !text-[clamp(2.2rem,6vw,4.8rem)] text-bone"
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-[16px] leading-relaxed text-bone/75"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          {copy}
        </motion.p>
        {cta && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
          >
            <Link to={cta.to} className="btn-primary mt-9">
              {cta.label}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
