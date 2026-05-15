"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  useGsapContext,
  splitHeadline,
  fadeUp,
  parallaxY,
} from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

const provisions = [
  {
    no: "01",
    title: "Rooms by the hour",
    body: "Fully-equipped consulting rooms. Book by the hour or take a recurring slot. No long lease, no setup costs, no key deposits.",
  },
  {
    no: "02",
    title: "A vetted referral network",
    body: "Receive in-clinic referrals from a small, vetted team. We route on fit, not on monthly headcount targets.",
  },
  {
    no: "03",
    title: "Admin off your plate",
    body: "Reception, bookings, billing, follow-ups, insurance correspondence — included with every chair, included by default.",
  },
  {
    no: "04",
    title: "Peer supervision",
    body: "Monthly small-group supervision and CPD-eligible workshops, hosted in-house. Tea and biscuits provided; opinions, generously.",
  },
  {
    no: "05",
    title: "Marketing without the clout",
    body: "Get listed on the directory and benefit from clinic-wide press. No engagement bait, no testimonial farming.",
  },
  {
    no: "06",
    title: "A collegial team",
    body: "Multi-disciplinary, multi-generational, multilingual. Disagreements happen in case reviews, not in group chats.",
  },
];

const openings = [
  { t: "Child psychology", loc: "Karachi · hybrid" },
  { t: "Couples therapy", loc: "Karachi · in-clinic" },
  { t: "Psychiatry (consultant)", loc: "Remote · monthly" },
];

export default function PractitionersPage() {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();

    splitHeadline(mm, "[data-prac-headline]", {
      by: "words",
      stagger: 0.06,
      duration: 1.0,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    fadeUp(mm, "[data-prac-eyebrow]", {
      trigger: scopeRef.current!,
      start: "top 82%",
    });

    fadeUp(mm, "[data-prac-intro]", {
      duration: 0.95,
      delay: 0.1,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    parallaxY(mm, "[data-prac-orb='1']", {
      y: 100,
      trigger: scopeRef.current!,
    });
    parallaxY(mm, "[data-prac-orb='2']", {
      y: -90,
      trigger: scopeRef.current!,
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-provision]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.14,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-provisions]",
            start: "top bottom-=80",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-openings]",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-openings]",
            start: "top bottom-=40",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-opening-item]",
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-openings]",
            start: "top bottom-=20",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  return (
    <section
      ref={scopeRef}
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      <div
        data-prac-orb="1"
        aria-hidden
        className="orb h-[480px] w-[480px] right-[-120px] top-[-60px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(176,136,56,0.32), transparent 70%)",
        }}
      />
      <div
        data-prac-orb="2"
        aria-hidden
        className="orb h-[400px] w-[400px] left-[-100px] bottom-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,74,42,0.28), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 section lg:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              data-prac-eyebrow
              className="eyebrow"
              style={{ color: "var(--color-gilt)" }}
            >
              For practitioners
            </p>
            <h1
              data-prac-headline
              className="mt-6 h-section text-[clamp(2.6rem,6.5vw,5.4rem)]"
            >
              The clinic, viewed from the other chair.
            </h1>
          </div>
          <div data-prac-intro className="lg:col-span-5">
            <div className="h-px w-full bg-[rgba(244,236,220,0.25)] mb-6" />
            <p className="font-body italic text-[18px] leading-[1.65] text-[rgba(244,236,220,0.8)]">
              SafeSquare is a professional home for counsellors,
              psychotherapists, psychologists and wellness coaches. We handle
              the overhead so you can run the practice you trained for —
              quietly, ethically, well.
            </p>
          </div>
        </div>

        <div className="mt-14 h-px bg-[rgba(244,236,220,0.3)]" />

        {/* Provisions */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <p className="eyebrow" style={{ color: "var(--color-gilt)" }}>
              what you can expect
            </p>
            <ol data-provisions className="mt-8 grid gap-6 sm:grid-cols-2">
              {provisions.map((p) => (
                <li
                  key={p.no}
                  data-provision
                  className="group rounded-2xl border border-[rgba(244,236,220,0.15)] bg-[rgba(244,236,220,0.04)] p-7 transition-all duration-500 hover:border-[var(--color-gilt)] hover:bg-[rgba(176,136,56,0.06)] hover:-translate-y-1"
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-mono text-[11px] tracking-[0.28em]"
                      style={{ color: "var(--color-gilt)" }}
                    >
                      / {p.no}
                    </span>
                    <span className="font-display italic text-[13px] text-[rgba(244,236,220,0.55)]">
                      provision
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-[22px] leading-tight">
                    {p.title}
                  </h2>
                  <p className="mt-3 font-body text-[16px] leading-[1.6] text-[rgba(244,236,220,0.82)]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>

            {/* Why SafeSquare */}
            <div className="mt-14 max-w-[60ch] space-y-5">
              <p className="eyebrow" style={{ color: "var(--color-gilt)" }}>
                why practitioners choose us
              </p>
              <p className="font-body text-[18px] leading-[1.7] text-[rgba(244,236,220,0.8)]">
                You trained for years to do this work well. The last thing you
                need is a landlord who treats therapy rooms like co-working
                desks, or a clinic that measures your value by monthly billing
                targets.
              </p>
              <p className="font-body text-[18px] leading-[1.7] text-[rgba(244,236,220,0.8)]">
                At SafeSquare, the infrastructure exists to support the work —
                not the other way around. Reception, billing, referrals,
                supervision, and a collegial team that disagrees in case
                reviews, not in group chats.
              </p>
            </div>
          </div>

          {/* Openings sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div
              data-openings
              className="relative overflow-hidden rounded-2xl border border-[rgba(244,236,220,0.18)] bg-[var(--color-paper)] p-8 text-[var(--color-ink)]"
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-16 h-44 w-44 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(176,136,56,0.3), transparent 70%)",
                }}
              />

              <div className="flex items-center justify-between">
                <p className="eyebrow eyebrow-accent">currently interviewing</p>
                <span className="dot" />
              </div>
              <div className="rule-thin mt-3" />

              <ul className="mt-6 space-y-4">
                {openings.map((o, i) => (
                  <li key={o.t} data-opening-item className="group">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] tracking-widest text-[var(--color-terracotta)]">
                          0{i + 1}
                        </span>
                        <span className="font-display text-[19px] text-[var(--color-ink)]">
                          {o.t}
                        </span>
                      </span>
                      <span className="stamp-forest stamp">open</span>
                    </div>
                    <p className="mt-1 ml-7 font-display italic text-[13px] text-[var(--color-ink-muted)]">
                      {o.loc}
                    </p>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="btn-ink mt-8 w-full justify-center">
                send your portfolio
              </Link>

              <p className="mt-5 text-center font-display italic text-[13px] text-[var(--color-ink-muted)]">
                or write at{" "}
                <a
                  href="mailto:join@safesquare.com"
                  className="u-link text-[var(--color-ink)]"
                >
                  join@safesquare.com
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
