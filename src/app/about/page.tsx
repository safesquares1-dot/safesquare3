"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useGsapContext,
  splitHeadline,
  fadeUp,
  countUp,
} from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

const principles = [
  {
    no: "01",
    title: "Care over content",
    body: "We do not post infographics. We sit with people. The work happens in rooms, not feeds.",
  },
  {
    no: "02",
    title: "Plain language",
    body: "No jargon walls. If a therapist cannot explain a thing simply, it does not belong in your file.",
  },
  {
    no: "03",
    title: "Confidentiality is the floor",
    body: "Records stay on ISO-grade systems. We never sell, share, or train models on session notes.",
  },
  {
    no: "04",
    title: "Inclusive by default",
    body: "Queer-affirming, neurodivergent-affirming, multilingual. You should not have to translate yourself first.",
  },
];

const ledger = [
  { k: "Established", v: "2020", count: true },
  { k: "Practitioners", v: "10 +", count: true },
  { k: "Clients served", v: "500 +", count: true },
  { k: "Specialities", v: "6", count: true },
  { k: "Languages", v: "EN · HI · KN · TA", count: false },
  { k: "Rooms", v: "four, with kettles", count: false },
];

export default function AboutPage() {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();

    splitHeadline(mm, "[data-about-headline]", {
      by: "words",
      stagger: 0.06,
      duration: 1.0,
      trigger: scopeRef.current!,
      start: "top 78%",
    });

    splitHeadline(mm, "[data-about-quote]", {
      by: "words",
      stagger: 0.045,
      duration: 1.3,
      y: 40,
      ease: "expo.out",
      trigger: "[data-about-quote]",
      start: "top 75%",
    });

    fadeUp(mm, "[data-about-eyebrow]", {
      trigger: scopeRef.current!,
      start: "top 82%",
    });

    fadeUp(mm, "[data-about-intro]", {
      duration: 0.95,
      delay: 0.1,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    fadeUp(mm, "[data-about-essay]", {
      y: 30,
      duration: 1.0,
      trigger: "[data-about-essay]",
      start: "top 80%",
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-principle]",
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-principles]",
            start: "top bottom-=80",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-about-ledger]",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-about-ledger]",
            start: "top bottom-=40",
            toggleActions: "play none none none",
          },
        }
      );
    });

    countUp(mm, "[data-ledger-count]");
  });

  return (
    <section
      ref={scopeRef}
      className="relative overflow-hidden bg-[var(--color-paper)]"
    >
      <div className="mx-auto max-w-[1320px] px-6 section lg:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-about-eyebrow className="eyebrow eyebrow-accent">
              About SafeSquare
            </p>
            <h1
              data-about-headline
              className="mt-6 h-section text-[clamp(2.6rem,6.5vw,5.4rem)] text-[var(--color-ink)]"
            >
              We built the clinic we wanted ourselves.
            </h1>
          </div>
          <div data-about-intro className="lg:col-span-5">
            <div className="rule-glow mb-6" />
            <p className="font-body italic text-[18px] leading-[1.65] text-[var(--color-ink-soft)]">
              A multi-speciality practice where care is the product and the
              brochure is incidental. Tired of referral mazes and twelve-week
              waitlists, so we made the room we wished existed.
            </p>
          </div>
        </div>

        <div className="rule mt-14" />

        {/* Content */}
        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div data-about-essay className="max-w-[60ch] space-y-6">
              <p className="dropcap font-body text-[20px] leading-[1.7] text-[var(--color-ink-soft)]">
                <span className="small-caps font-semibold">SafeSquare</span>{" "}
                began in the winter of 2020 — in a small room, with a kettle
                and three folding chairs. We were tired of clinics that sounded
                like brochures and felt like banks, so we built the place we
                wanted: a multi-speciality practice where the work of getting
                better feels like a quiet, deliberate practice.
              </p>
              <p className="font-body text-[18px] leading-[1.7] text-[var(--color-ink-soft)]">
                The principles below are not aspirations. They are operating
                instructions — why we exist, and how we behave when no one is
                watching.<span className="footnote-marker">¹</span>
              </p>
              <p className="font-body text-[18px] leading-[1.7] text-[var(--color-ink-soft)]">
                We believe mental healthcare should feel like visiting a trusted
                professional — not navigating a bureaucracy. No referral mazes,
                no twelve-week waitlists, no forms that ask more questions than
                the therapist does. Just a quiet room, a good listener, and a
                clear path forward.
              </p>
              <p className="font-body text-[18px] leading-[1.7] text-[var(--color-ink-soft)]">
                Our team of counsellors, psychotherapists, psychologists, and
                wellness coaches work under one roof so that care can be
                coordinated, not fragmented. You should not have to tell your
                story four times to four strangers in four different buildings.
              </p>
            </div>

            <ol data-principles className="mt-12 grid gap-5 sm:grid-cols-2">
              {principles.map((p) => (
                <li
                  key={p.no}
                  data-principle
                  className="group surface card-hover p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-terracotta)]">
                      / {p.no}
                    </span>
                    <span className="font-display italic text-[14px] text-[var(--color-ink-muted)]">
                      principle
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[22px] leading-tight text-[var(--color-ink)]">
                    {p.title}
                  </h2>
                  <p className="mt-3 font-body text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 max-w-[60ch] border-t border-[var(--color-rule)] pt-4">
              <p className="footnote">
                <span className="footnote-marker">¹</span> We will share our
                policies, supervision schedule, and complaints procedure with
                anyone who asks. Just ask.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <figure className="surface-vellum p-8 lg:p-10">
              <span
                className="font-display italic text-[var(--color-terracotta)] text-[64px] leading-none block"
                aria-hidden
              >
                &ldquo;
              </span>
              <p data-about-quote className="pull-quote -mt-6">
                I did not need a guru. I needed a room, a kettle, and someone
                who took my notes seriously.
              </p>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[var(--color-ink)]" />
                <span className="font-display italic text-[14px] text-[var(--color-ink-muted)]">
                  anonymised client · 2024
                </span>
              </figcaption>
            </figure>

            <div data-about-ledger className="mt-6 surface p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">the clinic, in numbers</p>
                <span className="dot dot-forest" />
              </div>
              <div className="rule-thin mt-3" />

              <dl className="mt-5 grid grid-cols-1 gap-y-3">
                {ledger.map((r) => (
                  <div
                    key={r.k}
                    className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--color-rule)] pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="font-display italic text-[15px] text-[var(--color-ink-muted)]">
                      {r.k}
                    </dt>
                    <dd
                      {...(r.count ? { "data-ledger-count": true, "data-count": r.v } : {})}
                      className="font-display text-[18px] text-[var(--color-ink)] text-right"
                    >
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 font-display italic text-[14px] text-[var(--color-terracotta-deep)]">
                — entered by hand, audited quarterly.
              </p>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-20 surface-vellum relative overflow-hidden p-8 lg:p-12">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[58ch]">
              <p className="eyebrow eyebrow-accent">want to know more?</p>
              <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-[var(--color-ink)]">
                Come visit, or write to us.
                <br />
                <span className="italic-display">We will write back.</span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn-ink">
                write to us
              </Link>
              <Link href="/practitioners" className="btn-ghost">
                meet the team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
