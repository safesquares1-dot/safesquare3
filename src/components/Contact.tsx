"use client";

import { useRef } from "react";
import { useGsapContext, splitHeadline, fadeUp } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

const correspondence = [
  {
    label: "Email",
    value: "hello@safesquare.com",
    href: "mailto:hello@safesquare.com",
  },
  {
    label: "Telephone",
    value: "+92 300 1437360",
    href: "tel:+923001437360",
  },
  {
    label: "Studio",
    value: "1st Floor, AC-10, Block-4, Clifton, Karachi",
  },
  {
    label: "Instagram",
    value: "@safesquare.official",
    href: "https://www.instagram.com/safesquare.official/",
  },
];

const hours = [
  { d: "Monday — Friday", h: "09:00 — 20:00", tag: "in-clinic" },
  { d: "Saturday", h: "10:00 — 17:00", tag: "walk-ins" },
  { d: "Sunday", h: "by appointment", tag: "online" },
];

export default function Contact() {
  const scopeRef = useRef<HTMLElement | null>(null);

  useGsapContext(scopeRef, ({ mm, reduced }) => {
    reduced();

    splitHeadline(mm, "[data-contact-headline]", {
      by: "words",
      stagger: 0.06,
      duration: 1.0,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    fadeUp(mm, "[data-contact-eyebrow]", {
      trigger: scopeRef.current!,
      start: "top 82%",
    });

    fadeUp(mm, "[data-contact-intro]", {
      duration: 0.95,
      delay: 0.1,
      trigger: scopeRef.current!,
      start: "top 75%",
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-contact-card]",
        { x: -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.18,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-contact-sidebar]",
            start: "top bottom-=80",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-form]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-form]",
            start: "top bottom-=40",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        "[data-form] [data-field]",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: "[data-form]",
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
      id="contact"
      className="relative overflow-hidden bg-[var(--color-paper-soft)]"
    >
      <div className="mx-auto max-w-[1320px] px-6 section lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p data-contact-eyebrow className="eyebrow eyebrow-accent">
              Part four · write to us
            </p>
            <h2
              data-contact-headline
              className="mt-6 h-section text-[clamp(2.6rem,6.5vw,5.4rem)] text-[var(--color-ink)]"
            >
              Begin with one letter.
            </h2>
          </div>
          <div data-contact-intro className="lg:col-span-5">
            <div className="rule-glow mb-6" />
            <p className="font-body italic text-[18px] leading-[1.65] text-[var(--color-ink-soft)]">
              You need not know what kind of help you want. Tell us, in your
              own words, what is going on. We will write back within a day —
              and we will route you to the right care.
            </p>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div data-contact-sidebar className="lg:col-span-5">
            <div data-contact-card className="surface p-7 lg:p-8">
              <p className="eyebrow">how to reach us</p>
              <div className="rule-thin mt-3" />
              <ul className="mt-5 divide-y divide-[var(--color-rule)]">
                {correspondence.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="font-display italic text-[14.5px] text-[var(--color-ink-muted)]">
                      {c.label}
                    </span>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="u-link font-display text-[17px] text-[var(--color-ink)] text-right"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="font-display text-[17px] text-[var(--color-ink)] text-right">
                        {c.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div data-contact-card className="mt-6 surface-vellum p-7 lg:p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">hours, in IST</p>
                <span className="dot" />
              </div>
              <div className="rule-thin mt-3" />
              <ul className="mt-5 space-y-4">
                {hours.map((h) => (
                  <li
                    key={h.d}
                    className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--color-rule)] pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-display italic text-[15px] text-[var(--color-ink-muted)]">
                      {h.d}
                    </span>
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[17px] text-[var(--color-ink)]">
                        {h.h}
                      </span>
                      <span className="tag">{h.tag}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-contact-card
              className="mt-6 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-ink)] p-6 text-[var(--color-paper)]"
            >
              <p
                className="eyebrow"
                style={{ color: "var(--color-gilt)" }}
              >
                in confidence
              </p>
              <p className="mt-3 font-display italic text-[16px] leading-[1.55] text-[rgba(244,236,220,0.85)]">
                Everything sent here is held in confidence. Records stay on
                ISO-grade systems. We never sell, share, or train models on
                session notes.
              </p>
            </div>
          </div>

          <form
            data-form
            className="lg:col-span-7 surface-lift p-8 lg:p-12"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector(
                'button[type="submit"]'
              ) as HTMLButtonElement | null;
              if (btn) {
                btn.textContent = "✓ sent, with thanks";
                btn.disabled = true;
              }
            }}
          >
            <div data-field className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display italic text-[22px] text-[var(--color-ink)]">
                Dear SafeSquare,
              </p>
              <span className="stamp">first folio · enquiry</span>
            </div>
            <div className="rule-thin mt-4" />

            <div data-field className="mt-9 grid gap-7 sm:grid-cols-2">
              <Field id="firstName" label="Given name" placeholder="Sarah" />
              <Field id="lastName" label="Family name" placeholder="Ahmed" />
            </div>
            <div data-field className="mt-7">
              <Field
                id="email"
                type="email"
                label="You may write back to"
                placeholder="you@example.com"
              />
            </div>

            <div data-field className="mt-7">
              <label
                htmlFor="interest"
                className="block font-display italic text-[15px] text-[var(--color-ink-muted)]"
              >
                I am writing as
              </label>
              <select
                id="interest"
                className="field mt-1"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  — choose one —
                </option>
                <option value="client">a potential client</option>
                <option value="practitioner">
                  a practitioner wishing to join
                </option>
                <option value="press">press · partnerships</option>
                <option value="other">someone simply curious</option>
              </select>
            </div>

            <div data-field className="mt-7">
              <label
                htmlFor="message"
                className="block font-display italic text-[15px] text-[var(--color-ink-muted)]"
              >
                …and I would like to say
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="No need to polish the lines. A few sentences is plenty."
                className="field mt-2 resize-none"
                required
              />
            </div>

            <div className="rule-thin mt-10" />

            <div data-field className="mt-7 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display italic text-[15px] text-[var(--color-ink-muted)]">
                  Yours, in confidence,
                </p>
                <p className="font-display text-[28px] italic mt-1 text-[var(--color-ink)]">
                  ___________
                </p>
                <p className="footnote mt-2">
                  ◇ we typically reply within a working day.
                </p>
              </div>
              <button type="submit" className="btn-ink">
                seal &amp; send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-display italic text-[15px] text-[var(--color-ink-muted)]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="field mt-1"
      />
    </div>
  );
}
