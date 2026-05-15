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

const chapters = [
  {
    no: "01",
    title: "Counselling",
    epigraph: "Begin where the weather is.",
    body: "Talk through what is heavy. Build practical resilience without performing wellness. Sessions are weekly or fortnightly; no script, no homework unless you want some.",
    tags: ["stress", "grief", "life transitions", "relationships"],
    detail:
      "Our counsellors hold space for the every-day weight — work stress, relationship strain, grief that does not announce itself. No scripts, no forced homework. Just a steady, confidential room and someone trained to listen well.",
    duration: "50 min sessions",
    format: "Weekly or fortnightly",
    approaches: ["Person-centred", "Solution-focused", "Narrative therapy"],
  },
  {
    no: "02",
    title: "Psychotherapy",
    epigraph: "The patterns beneath the patterns.",
    body: "Long-form, trauma-informed work in the rooms between sessions. CBT, ACT, EMDR, and psychodynamic approaches — selected for you, not your file.",
    tags: ["trauma", "attachment", "long-form", "in-depth"],
    detail:
      "When the surface symptoms point to something deeper, psychotherapy offers a longer arc. Our therapists draw from CBT, ACT, EMDR, and psychodynamic modalities — choosing the approach that fits you, not the one that fits a diagnosis code.",
    duration: "60–80 min sessions",
    format: "Weekly, with flexibility",
    approaches: ["CBT", "ACT", "EMDR", "Psychodynamic"],
  },
  {
    no: "03",
    title: "Psychology",
    epigraph: "To name a thing is to begin to hold it.",
    body: "Diagnostic assessments and clinical interventions for what is making the day hard. Reports written in plain language, not jargon walls.",
    tags: ["ADHD", "anxiety", "depression", "neurodivergence"],
    detail:
      "Assessment and intervention for when daily life feels harder than it should. ADHD screening, anxiety and depression protocols, neurodivergence-affirming care. Reports are written in plain language — no jargon walls, no gatekeeping.",
    duration: "50–90 min assessments",
    format: "As needed, with follow-ups",
    approaches: ["Clinical assessment", "Behavioural intervention", "Psychoeducation"],
  },
  {
    no: "04",
    title: "Wellness Coaching",
    epigraph: "Habits that compound, quietly.",
    body: "Less burnout, more capacity. We work on sleep, focus, boundaries, and recovery — with measurable goals and no vibes-only nonsense.",
    tags: ["sleep", "focus", "boundaries", "burnout"],
    detail:
      "For when you are not in crisis but know capacity is leaking. Our coaches work on sleep hygiene, focus architecture, boundary-setting, and recovery rhythms — all with measurable goals and no vibes-only advice.",
    duration: "45 min sessions",
    format: "Fortnightly, with check-ins",
    approaches: ["Habit design", "Behavioural activation", "Recovery planning"],
  },
  {
    no: "05",
    title: "Group Therapy",
    epigraph: "A small, honest room.",
    body: "Small, vetted groups, eight people maximum. Confidentiality is the floor, not the goal; warmth is the goal.",
    tags: ["anxiety", "grief", "queer-affirming", "parents"],
    detail:
      "Eight people, vetted and facilitated. Groups for anxiety, grief, queer-affirming spaces, and parenting. Confidentiality is the floor, not the ceiling — warmth and honesty are what we build toward.",
    duration: "75 min sessions",
    format: "Weekly, 8-week cycles",
    approaches: ["Process groups", "Support circles", "Skills-based"],
  },
  {
    no: "06",
    title: "Child & Adolescent",
    epigraph: "Younger minds, older respect.",
    body: "Age-appropriate care for ages 6–17, with caregivers held in the loop. Play-based, school-aware, family-informed.",
    tags: ["ages 6–17", "school", "family", "play-based"],
    detail:
      "For ages 6 through 17, with caregivers included in the process. Play-based approaches, school-aware planning, and family-informed sessions. Younger minds deserve the same respect and rigour as adult ones.",
    duration: "45–50 min sessions",
    format: "Weekly, with family reviews",
    approaches: ["Play therapy", "Art-based", "Family systems"],
  },
];

const process = [
  {
    step: "01",
    title: "Write to us",
    body: "A few sentences about what is going on. No need to diagnose yourself or pick a label — just tell us, in your own words.",
  },
  {
    step: "02",
    title: "We read, then reply",
    body: "Within a working day, someone reads your letter and writes back. We may ask a question or two to understand your needs better.",
  },
  {
    step: "03",
    title: "First conversation",
    body: "A 20-minute introductory call, no charge. This is not therapy — it is a conversation to see if we are the right fit for each other.",
  },
  {
    step: "04",
    title: "Matched to a practitioner",
    body: "Based on what you have told us, we match you with the right person. If the fit is not right, we re-route — no offence taken.",
  },
];

const faqs = [
  {
    q: "Do I need a referral?",
    a: "No. You can write to us directly. If your situation requires a specialist we do not have, we will say so and help you find one.",
  },
  {
    q: "How much does it cost?",
    a: "Fees vary by service and practitioner. We share rates upfront, before your first session. No hidden charges, no surprise invoices.",
  },
  {
    q: "Is everything confidential?",
    a: "Yes. Records stay on ISO-grade systems. We never sell, share, or train models on session notes. Confidentiality is the floor, not the ceiling.",
  },
  {
    q: "What if the fit is not right?",
    a: "Tell us. We will re-route you to another practitioner, no questions asked. The work is too important to settle for a poor match.",
  },
];

export default function ServicesPage() {
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

    parallaxY(mm, "[data-services-orb]", {
      y: 120,
      trigger: scopeRef.current!,
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
        "[data-process-step]",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.15,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-process]",
            start: "top bottom-=60",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-faq-item]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-faqs]",
            start: "top bottom-=60",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  return (
    <section
      ref={scopeRef}
      className="relative overflow-hidden bg-[var(--color-paper-soft)]"
    >
      <div
        data-services-orb
        aria-hidden
        className="orb h-[500px] w-[500px] right-[-150px] top-[200px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(184,74,42,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px] px-6 section lg:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-services-eyebrow className="eyebrow eyebrow-accent">
              Our services
            </p>
            <h1
              data-services-headline
              className="mt-6 h-section text-[clamp(2.6rem,6.5vw,5.4rem)] text-[var(--color-ink)]"
            >
              Six specialities, one quiet roof.
            </h1>
          </div>
          <div data-services-intro className="lg:col-span-5">
            <div className="rule-glow mb-6" />
            <p className="font-body text-[18px] leading-[1.65] text-[var(--color-ink-soft)]">
              Most clinics make you pick a label, then find someone to match it.
              SafeSquare runs the other way around — begin with one
              conversation, and we route you to the right care.
            </p>
            <Link href="/contact" className="btn-link mt-6">
              start with one conversation
            </Link>
          </div>
        </div>

        <div className="rule mt-14" />

        {/* Service cards */}
        <div
          data-service-grid
          className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-7"
        >
          {chapters.map((c) => (
            <article
              key={c.no}
              data-service-card
              className="group surface card-animated p-8 lg:p-10"
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

              <h2 className="mt-8 font-display text-[clamp(2rem,3vw,2.8rem)] leading-[1.02] tracking-tight text-[var(--color-ink)]">
                {c.title}
              </h2>

              <p className="mt-5 max-w-[52ch] font-body text-[16.5px] leading-[1.65] text-[var(--color-ink-soft)]">
                {c.body}
              </p>

              <p className="mt-4 max-w-[52ch] font-body text-[15px] leading-[1.65] text-[var(--color-ink-muted)]">
                {c.detail}
              </p>

              {/* Session details */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-[var(--color-paper)] p-3 text-center">
                  <span className="block font-mono text-[10px] tracking-widest text-[var(--color-terracotta)] uppercase">Duration</span>
                  <span className="mt-1 block font-display text-[14px] text-[var(--color-ink)]">{c.duration}</span>
                </div>
                <div className="rounded-lg bg-[var(--color-paper)] p-3 text-center">
                  <span className="block font-mono text-[10px] tracking-widest text-[var(--color-terracotta)] uppercase">Format</span>
                  <span className="mt-1 block font-display text-[14px] text-[var(--color-ink)]">{c.format}</span>
                </div>
                <div className="rounded-lg bg-[var(--color-paper)] p-3 text-center">
                  <span className="block font-mono text-[10px] tracking-widest text-[var(--color-terracotta)] uppercase">Approaches</span>
                  <span className="mt-1 block font-display text-[14px] text-[var(--color-ink)]">{c.approaches.length} modalities</span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              {/* Approaches list */}
              <div className="mt-5 flex flex-wrap gap-2">
                {c.approaches.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-rule)] px-3 py-1 font-mono text-[11px] text-[var(--color-ink-muted)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--color-terracotta)]" />
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--color-rule)] pt-5">
                <Link
                  href="/contact"
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

        {/* How it works */}
        <div className="mt-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="eyebrow eyebrow-accent">how it works</span>
            <span className="h-px flex-1 bg-[var(--color-rule)]" />
          </div>

          <div data-process className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div
                key={p.step}
                data-process-step
                className="group surface card-animated p-7"
              >
                <span className="font-display text-[48px] font-bold text-[var(--color-terracotta)] opacity-15 absolute top-4 right-5">
                  {p.step}
                </span>
                <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-terracotta)]">
                  step {p.step}
                </span>
                <h3 className="mt-4 font-display text-[20px] text-[var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div data-faqs className="mt-24">
          <div className="flex items-center gap-3 mb-10">
            <span className="eyebrow eyebrow-accent">questions we hear often</span>
            <span className="h-px flex-1 bg-[var(--color-rule)]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {faqs.map((f, i) => (
              <div
                key={i}
                data-faq-item
                className="surface card-animated p-7"
              >
                <h3 className="font-display text-[18px] text-[var(--color-ink)]">
                  {f.q}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 surface-vellum relative overflow-hidden p-8 lg:p-12">
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
              <Link href="/contact" className="btn-ink">
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
