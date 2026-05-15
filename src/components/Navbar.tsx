"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/practitioners", label: "Practitioners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headerRef.current, {
          y: -16,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      {/* Slim status strip */}
      <div className="border-b border-[var(--color-rule)]/60">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-2 lg:px-10">
          <div className="flex items-center gap-2">
            <span className="dot dot-forest" aria-hidden />
            <span className="caps text-[var(--color-ink-muted)]">
              Safesquare - AC-10 Block-4, Clifton, Karachi.
            </span>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10 lg:py-5">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-rule-strong)] bg-[var(--color-paper-soft)] text-[var(--color-terracotta-deep)] transition-transform duration-500 group-hover:rotate-[-4deg]"
          >
            <span className="font-display italic text-[20px] leading-none">S</span>
            <span className="absolute -bottom-[1px] left-1/2 h-[2px] w-2/3 -translate-x-1/2 bg-[var(--color-terracotta)]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[22px] tracking-tight text-[var(--color-ink)]">
              SafeSquare
            </span>
            <span className="caps mt-1 text-[var(--color-ink-muted)] text-[9.5px] tracking-[0.26em]">
              a clinic for being well
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative inline-flex items-center px-3 py-2 font-display text-[16px] text-[var(--color-ink)]"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-x-3 bottom-1 h-[1px] origin-left scale-x-0 bg-[var(--color-terracotta)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="tel:+923001437360"
            className="font-display italic text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            +92 300 1437360
          </Link>
          <Link href="/contact" className="btn-ink">
            book a session
          </Link>
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-rule-strong)] bg-[var(--color-paper-soft)] md:hidden"
        >
          <span className="relative block h-[14px] w-[18px]">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-[var(--color-ink)] transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-[var(--color-ink)] transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[1.5px] w-full bg-[var(--color-ink)] transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden border-t border-[var(--color-rule)] bg-[var(--color-paper-soft)]/95 backdrop-blur-md transition-[max-height] duration-500 ease-out ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
      >
        <ul className="divide-y divide-[var(--color-rule)] px-6">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-[var(--color-terracotta)]">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[24px] text-[var(--color-ink)]">
                    {l.label}
                  </span>
                </span>
                <span className="font-display italic text-[var(--color-ink-muted)]">→</span>
              </Link>
            </li>
          ))}
          <li className="py-5">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-ink w-full justify-center"
            >
              book a session
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
