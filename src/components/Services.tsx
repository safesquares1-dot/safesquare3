"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGsapContext, splitHeadline, fadeUp } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

const chapters = [
  {
    no: "01",
    title: "Counselling",
    epigraph: "Begin where the weather is.",
    body:
      "Talk through what is heavy. Build practical resilience without performing wellness. Sessions are weekly or fortnightly; no script, no homework unless you want some.",
    tags: ["stress", "grief", "life transitions", "relationships"],
  },
  {
    no: "02",
    title: "Psychotherapy",
    epigraph: "The patterns beneath the patterns.",
    body:
      "Long-form, trauma-informed work in the rooms between sessions. CBT, ACT, EMDR, and psychodynamic approaches — selected for you, not your file.",
    tags: ["trauma", "attachment", "long-form", "in-depth"],
  },
  {
    no: "03",
    title: "Psychology",
    epigraph: "To name a thing is to begin to hold it.",
    body:
      "Diagnostic assessments and clinical interventions for what is making the day hard. Reports written in plain language, not jargon walls.",
    tags: ["ADHD", "anxiety", "depression", "neurodivergence"],
  },
  {
    no: "04",
    title: "Wellness Coaching",
    epigraph: "Habits that compound, quietly.",
    body:
      "Less burnout, more capacity. We work on sleep, focus, boundaries, and recovery — with measurable goals and no vibes-only nonsense.",
    tags: ["sleep", "focus", "boundaries", "burnout"],
  },
  {
    no: "05",
    title: "Group Therapy",
    epigraph: "A small, honest room.",
    body:
      "Small, vetted groups, eight people maximum. Confidentiality is the floor, not the goal; warmth is the goal.",
    tags: ["anxiety", "grief", "queer-affirming", "parents"],
  },
  {
    no: "06",
    title: "Child & Adolescent",
    epigraph: "Younger minds, older respect.",
    body:
      "Age-appropriate care for ages 6–17, with caregivers held in the loop. Play-based, school-aware, family-informed.",
    tags: ["ages 6–17", "school", "family", "play-based"],
  },
];

export default function Services() {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();

    splitHeadline(mm, "[data-services-headline]", {
      by: "words",
      stagger: 0.06,
      duration: 1.0,
      y: 50,
      ease: "power3.out",
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    fadeUp(mm, "[data-services-eyebrow]", {
      y: 20,
      duration: 0.8,
      trigger: scopeRef.current!,
      start: "top 80%",
    });

    fadeUp(mm, "[data-services-intro]", {
      y: 28,
      duration: 0.9,
      delay: 0.1,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-service-card]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-service-grid]",
            start: "top bottom-=80",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-services-cta]",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-services-cta]",
            start: "top bottom-=40",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  return (
    <section
      ref={scopeRef}
      id="services"
      className="relative overflow-hidden bg-[var(--color-paper-soft)]"
    >
      <div className="mx-auto max-w-[1320px] px-6 section lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-services-eyebrow className="eyebrow eyebrow-accent">
              Part one · what we do
            </p>
            <h2
              data-services-headline
              className="mt-6 h-section text-[clamp(2.6rem,6.5vw,5.4rem)] text-[var(--color-ink)]"
            >
              Six specialities, one quiet roof.
            </h2>
          </div>
          <div data-services-intro className="lg:col-span-5">
            <div className="rule-glow mb-6" />
            <p className="font-body text-[18px] leading-[1.65] text-[var(--color-ink-soft)]">
              Most clinics make you pick a label, then find someone to match it.
              SafeSquare runs the other way around — begin with one
              conversation, and we route you to the right care.
            </p>
            <Link href="#contact" className="btn-link mt-6">
              start with one conversation
            </Link>
          </div>
        </div>

        <div className="rule mt-14" />

        <div
          data-service-grid
          className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-7"
        >
          {chapters.map((c) => (
            <article
              key={c.no}
              data-service-card
              className="group surface card-hover relative overflow-hidden p-8 lg:p-10"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[var(--color-terracotta)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-15"
              />

              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[12px] tracking-[0.3em] text-[var(--color-terracotta)]">
                  / {c.no}
                </span>
                <span className="font-display italic text-[14px] text-[var(--color-ink-muted)] text-right max-w-[20ch]">
                  &ldquo;{c.epigraph}&rdquo;
                </span>
              </div>

              <h3 className="mt-8 font-display text-[clamp(2rem,3vw,2.8rem)] leading-[1.02] tracking-tight text-[var(--color-ink)]">
                {c.title}
              </h3>

              <p className="mt-5 max-w-[52ch] font-body text-[16.5px] leading-[1.65] text-[var(--color-ink-soft)]">
                {c.body}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--color-rule)] pt-5">
                <Link
                  href="#contact"
                  className="font-display italic text-[15px] text-[var(--color-ink)] u-link"
                >
                  begin this chapter
                </Link>
                <span className="font-display italic text-[var(--color-terracotta)] transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>

        <div
          data-services-cta
          className="mt-20 surface-vellum relative overflow-hidden p-8 lg:p-12"
        >
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[58ch]">
              <p className="eyebrow eyebrow-accent">unsure where to begin?</p>
              <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-[var(--color-ink)]">
                Write one letter. We will read it,
                <br />
                <span className="italic-display">and write back.</span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#contact" className="btn-ink">
                write to us
              </Link>
              <Link href="tel:+923001437360" className="btn-ghost">
                or call directly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
