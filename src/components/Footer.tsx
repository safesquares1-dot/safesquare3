"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGsapContext, fadeUp } from "@/hooks/useGsap";

const groups: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { href: "/services", label: "Counselling" },
      { href: "/services", label: "Psychotherapy" },
      { href: "/services", label: "Psychology" },
      { href: "/services", label: "Wellness coaching" },
      { href: "/services", label: "Group therapy" },
      { href: "/services", label: "Child & adolescent" },
    ],
  },
  {
    heading: "The clinic",
    links: [
      { href: "/about", label: "About SafeSquare" },
      { href: "/practitioners", label: "For practitioners" },
      { href: "/contact", label: "Write to us" },
      { href: "#", label: "Press kit" },
    ],
  },
  {
    heading: "The small print",
    links: [
      { href: "#", label: "Privacy policy" },
      { href: "#", label: "Terms of service" },
      { href: "#", label: "Records & disclosure" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();
    fadeUp(mm, "[data-footer-block]", {
      y: 30,
      duration: 0.9,
      stagger: 0.1,
      trigger: scopeRef.current!,
      start: "top 95%",
      ease: "power2.out",
    });
  });

  return (
    <footer
      ref={scopeRef}
      className="relative overflow-hidden bg-[var(--color-paper)] text-[var(--color-ink)]"
    >
      <div className="mx-auto max-w-[1320px] px-6 pt-24 pb-12 lg:px-10">
        {/* Headline panel */}
        <div data-footer-block className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-accent">colophon</p>
            <h2 className="mt-5 h-section text-[clamp(2.2rem,5vw,4rem)] text-[var(--color-ink)]">
              A small clinic, set
              <br />
              <span className="italic-display">with care.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-body italic text-[18px] leading-[1.65] text-[var(--color-ink-soft)]">
              Four quarterly letters a year. No tracking, no churn dance,
              never your inbox unbidden.
            </p>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const b = e.currentTarget.querySelector("button");
                if (b) {
                  b.textContent = "✓ subscribed";
                  b.disabled = true;
                }
              }}
            >
              <input
                aria-label="email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-[var(--color-rule-strong)] bg-[var(--color-paper-soft)] px-5 py-3 font-display italic text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-terracotta)] transition-colors"
                required
              />
              <button type="submit" className="btn-ink no-arrow">
                subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="rule-glow mt-16" />

        <div data-footer-block className="mt-14 grid gap-12 lg:grid-cols-12">
          {/* Imprint */}
          <div className="lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span
                aria-hidden
                className="relative grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-rule-strong)] bg-[var(--color-paper-soft)] text-[var(--color-terracotta-deep)]"
              >
                <span className="font-display italic text-[20px] leading-none">
                  S
                </span>
              </span>
              <span className="font-display text-[24px] text-[var(--color-ink)]">
                SafeSquare
              </span>
            </Link>

            <p className="mt-6 max-w-[36ch] font-body text-[16px] leading-[1.65] text-[var(--color-ink-soft)]">
              A multi-speciality clinic for mental health &amp; wellbeing —
              bound under one roof, written in plain language, audited
              quarterly.
            </p>

          </div>

          {/* Chapter links */}
          {groups.map((g) => (
            <div key={g.heading} className="lg:col-span-2">
              <p className="eyebrow">{g.heading}</p>
              <div className="rule-thin mt-3" />
              <ul className="mt-5 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="u-link u-link-grow font-display text-[16.5px] text-[var(--color-ink)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="eyebrow">say hello</p>
            <div className="rule-thin mt-3" />
            <ul className="mt-5 space-y-3 font-display text-[16px] text-[var(--color-ink)]">
              <li>
                <a
                  href="mailto:hello@safesquare.com"
                  className="u-link u-link-grow"
                >
                  hello@safesquare.com
                </a>
              </li>
              <li>
                <a href="tel:+923001437360" className="u-link u-link-grow">
                  +92 300 1437360
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/safesquare.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link u-link-grow"
                >
                  Instagram ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start gap-4 border-t border-[var(--color-rule)] pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="caps text-[var(--color-ink-muted)]">
            © {year} safesquare clinic · all rights reserved
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-display italic text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              privacy
            </a>
            <a
              href="#"
              className="font-display italic text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              terms
            </a>
            <span className="ornament-glyph">❦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
