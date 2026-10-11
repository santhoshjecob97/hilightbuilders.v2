import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Wordmark } from "./Logo";
import { site } from "@/config";

const NAV = [
  { to: "/residential-interiors", label: "Residential" },
  { to: "/commercial-interiors", label: "Commercial" },
  { to: "/construction", label: "Construction" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-charcoal/90 backdrop-blur-md hairline-b" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" aria-label="HILIGHT BUILDERS — home">
            <Wordmark compact />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    isActive ? "text-brand" : "text-bone/70 hover:text-bone"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact#consultation"
              className="btn-primary hidden !min-h-[44px] !px-5 md:inline-flex"
            >
              Book a Consultation
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-bone transition-colors hover:border-brand hover:text-brand xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out menu — mobile / tablet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-charcoal-deep hairline"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-label="Menu"
            >
              <div className="flex h-[72px] items-center justify-between px-6 hairline-b">
                <Wordmark compact />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center border border-white/15 text-bone hover:border-brand hover:text-brand"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Menu">
                <ul className="space-y-1">
                  {[{ to: "/", label: "Home" }, ...NAV].map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.4 }}
                    >
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `group flex items-center justify-between py-3.5 font-display text-[26px] font-semibold tracking-tight transition-colors ${
                            isActive ? "text-brand" : "text-bone hover:text-brand"
                          }`
                        }
                      >
                        {item.label}
                        <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 pb-10">
                <Link to="/contact#consultation" className="btn-primary w-full">
                  Book a Consultation
                </Link>
                <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.08em] text-ash">
                  {site.address[0]}
                  <br />
                  {site.address[1]}
                  <br />
                  <a href={`mailto:${site.email}`} className="text-bone/80 hover:text-brand">
                    {site.email}
                  </a>
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
