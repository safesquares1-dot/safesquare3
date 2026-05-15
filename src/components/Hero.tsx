"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useGsapContext,
  splitHeadline,
  fadeUp,
  parallaxY,
  marquee,
  countUp,
  pin,
} from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

const stats = [
  { k: "10+", v: "practitioners" },
  { k: "06", v: "specialities" },
  { k: "500+", v: "lives held" },
  { k: "4.9", v: "rating" },
];

export default function Hero() {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1 · Headline split — chars rise + rotate in.
      splitHeadline(mm, "[data-hero-headline]", {
        by: "chars",
        stagger: 0.018,
        duration: 1.1,
        y: 60,
        ease: "power3.out",
        delay: 0.15,
        onMount: true,
      });

      // 2 · Eyebrow + body + CTAs chained.
      gsap.from("[data-hero-eyebrow]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from("[data-hero-body]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.85,
      });
      gsap.from("[data-hero-cta] > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 1.1,
      });

      // 3 · Side card timeline — slides up from below.
      gsap.from("[data-hero-card]", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from("[data-hero-card] [data-card-item]", {
        x: -16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.95,
      });

      // 4 · Stats count-up.
      countUp(mm, "[data-stat]", { duration: 1.6 });
      gsap.from("[data-stat-row] > *", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1.4,
      });

      // 5 · Orb parallax — each drifts at a different speed.
      parallaxY(mm, "[data-orb='1']", { y: 180, trigger: scopeRef.current! });
      parallaxY(mm, "[data-orb='2']", { y: -160, trigger: scopeRef.current! });
      parallaxY(mm, "[data-orb='3']", { y: 240, trigger: scopeRef.current! });

      // 6 · Marquee.
      marquee(mm, "[data-marquee-track]", { duration: 36 });

      // (Pin removed — it offset later-section trigger positions.)
    });
  });

  return (
    <section
      ref={scopeRef}
      id="home"
      className="relative isolate overflow-hidden"
    >
      <div
        data-orb="1"
        aria-hidden
        className="orb h-[420px] w-[420px] left-[-120px] top-[-60px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(184,74,42,0.45), transparent 70%)",
        }}
      />
      <div
        data-orb="2"
        aria-hidden
        className="orb h-[520px] w-[520px] right-[-160px] top-[40px]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(176,136,56,0.30), transparent 70%)",
        }}
      />
      <div
        data-orb="3"
        aria-hidden
        className="orb h-[380px] w-[380px] left-[40%] bottom-[-100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(58,90,58,0.25), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 pt-14 pb-24 lg:px-10 lg:pt-20 lg:pb-32">
        <div
          data-hero-eyebrow
          className="flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="stamp-ink stamp">
            <span className="dot dot-forest" /> open · vol. i
          </span>
          <span className="font-display italic text-[15px] text-[var(--color-ink-muted)]">
            a multi-speciality clinic, bound under one roof
          </span>
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <h1
              data-hero-headline
              className="h-display text-[clamp(2.4rem,7vw,6.4rem)] text-[var(--color-ink)]"
            >
              A clinic for being{" "}
              <span className="italic-display">
                <span className="marker">quietly</span>
              </span>{" "}
              well.
            </h1>

            <p
              data-hero-body
              className="mt-10 max-w-[58ch] font-body text-[20px] leading-[1.6] text-[var(--color-ink-soft)]"
            >
              SafeSquare brings counsellors, psychotherapists, psychologists and
              wellness coaches under one roof — so getting better feels less
              like a maze, and more like a deliberate, generous practice.
            </p>

            <div
              data-hero-cta
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/contact" className="btn-ink">
                book a session
              </Link>
              <Link href="/services" className="btn-ghost">
                explore our care
              </Link>
              <span className="ml-2 hidden sm:inline font-display italic text-[14px] text-[var(--color-ink-muted)]">
                · or simply scroll ↓
              </span>
            </div>

            <div
              data-stat-row
              className="mt-16 grid max-w-[640px] grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <div key={s.v}>
                  <div
                    data-stat
                    data-count={s.k}
                    className="font-display text-[40px] leading-none text-[var(--color-ink)]"
                  >
                    {s.k}
                  </div>
                  <div className="caps mt-2 text-[var(--color-ink-muted)]">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div
              data-hero-card
              className="surface-lift relative overflow-hidden p-7"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow eyebrow-accent">our care</span>
                <span className="stamp">six chapters</span>
              </div>

              <ol className="mt-7 space-y-3.5">
                {[
                  { t: "Counselling", n: "01" },
                  { t: "Psychotherapy", n: "02" },
                  { t: "Psychology", n: "03" },
                  { t: "Wellness coaching", n: "04" },
                  { t: "Group therapy", n: "05" },
                  { t: "Child & adolescent", n: "06" },
                ].map((c) => (
                  <li
                    key={c.t}
                    data-card-item
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-mono text-[11px] text-[var(--color-terracotta)] tracking-widest">
                      {c.n}
                    </span>
                    <span className="font-display text-[19px] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-terracotta)]">
                      {c.t}
                    </span>
                    <span className="flex-1 translate-y-[-3px] border-b border-dotted border-[var(--color-rule-strong)]" />
                    <span className="font-display italic text-[13px] text-[var(--color-ink-muted)]">
                      ↗
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--color-rule-strong)]" />
                <span className="ornament-glyph">❦</span>
                <span className="h-px flex-1 bg-[var(--color-rule-strong)]" />
              </div>

              <p className="mt-5 font-display italic text-[15px] text-[var(--color-terracotta-deep)]">
                &ldquo;Read in any order. There is no late, here.&rdquo;
              </p>

              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 font-display italic text-[15px] text-[var(--color-ink)] group"
              >
                <span className="u-link u-link-grow">see what we offer</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div
              data-hero-card
              className="mt-6 flex items-center gap-3 px-2"
            >
              <div className="flex -space-x-2">
                {["T", "K", "A", "R"].map((c, i) => (
                  <span
                    key={i}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-paper)] bg-gradient-to-br from-[var(--color-terracotta-soft)] to-[var(--color-terracotta-deep)] font-display italic text-[14px] text-[var(--color-paper)]"
                    style={{
                      transform: `rotate(${(i - 1.5) * 4}deg)`,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="font-display italic text-[14px] leading-tight text-[var(--color-ink-muted)]">
                ten practitioners,
                <br />
                one quiet roof.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-24 border-y border-[var(--color-rule)] py-6 overflow-hidden">
          <div className="mb-4 flex items-center gap-3">
            <span className="eyebrow">six specialities</span>
            <span className="h-px flex-1 bg-[var(--color-rule)]" />
            <span className="font-display italic text-[15px] text-[var(--color-ink-muted)]">one quiet roof</span>
          </div>
          <div className="relative">
            <div data-marquee-track className="marquee gap-14">
              {(() => {
                const items = [
                  { t: "Counselling", n: "01" },
                  { t: "Psychotherapy", n: "02" },
                  { t: "Psychology", n: "03" },
                  { t: "Wellness coaching", n: "04" },
                  { t: "Group therapy", n: "05" },
                  { t: "Child & adolescent", n: "06" },
                ];
                return [...items, ...items].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-baseline gap-3 whitespace-nowrap"
                  >
                    <span className="font-mono text-[13px] font-semibold text-[var(--color-terracotta-deep)] tracking-widest">
                      {c.n}
                    </span>
                    <span className="font-display italic font-bold text-[clamp(2rem,3.5vw,3.2rem)] text-[var(--color-terracotta-deep)]">
                      {c.t}
                    </span>
                    <span className="mx-6 text-[28px] text-[var(--color-terracotta)]">✦</span>
                  </span>
                ));
              })()}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-paper)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-paper)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
