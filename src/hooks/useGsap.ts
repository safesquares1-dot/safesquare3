"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

function scheduleRefresh() {
  if (typeof window === "undefined") return;
  // Refresh after layout/fonts settle so trigger positions are correct.
  requestAnimationFrame(() => ScrollTrigger.refresh());
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }
  setTimeout(() => ScrollTrigger.refresh(), 400);
}

type Scope = RefObject<HTMLElement | null>;

export function useGsapScope<T extends HTMLElement = HTMLElement>() {
  return useRef<T | null>(null);
}

/**
 * Run an animation setup inside a `gsap.context`, scoped to `scopeRef`.
 * Returns nothing — the cleanup is handled internally via `ctx.revert()`.
 *
 * `setup` receives a `gsap.MatchMedia` already filtered to:
 *   - `(prefers-reduced-motion: no-preference)` → full motion.
 *   - `(prefers-reduced-motion: reduce)` → instant reveal, no triggers.
 */
export function useGsapContext(
  scopeRef: Scope,
  setup: (ctx: {
    mm: gsap.MatchMedia;
    reduced: () => void;
  }) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const reduced = () => {
        mm.add("(prefers-reduced-motion: reduce)", () => {
          // Force-final state for any nodes flagged for animation.
          const root = scopeRef.current!;
          const targets = root.querySelectorAll<HTMLElement>(
            "[data-anim],[data-split],.reveal,.reveal-children > *"
          );
          gsap.set(targets, { clearProps: "all", opacity: 1, y: 0, x: 0 });
        });
      };

      setup({ mm, reduced });
    }, scopeRef);

    scheduleRefresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ─────────────────────────────────────────────────────────────
   Animation primitives (each takes a `gsap.MatchMedia` for
   reduced-motion gating, plus a selector or element.)
   ───────────────────────────────────────────────────────────── */

type MM = gsap.MatchMedia;

export function fadeUp(
  mm: MM,
  selector: gsap.DOMTarget,
  opts: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    trigger?: gsap.DOMTarget;
    start?: string;
    once?: boolean;
  } = {}
) {
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const {
      y = 30,
      duration = 0.95,
      delay = 0,
      stagger = 0,
      ease = "power3.out",
      trigger,
      start = "top 82%",
      once = true,
    } = opts;

    gsap.from(selector, {
      y,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          }
        : undefined,
    });
  });
}

export function parallaxY(
  mm: MM,
  selector: gsap.DOMTarget,
  opts: { y?: number; trigger?: gsap.DOMTarget } = {}
) {
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const { y = 120, trigger } = opts;
    gsap.to(selector, {
      yPercent: 0,
      y,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? "body",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  });
}

export function splitHeadline(
  mm: MM,
  selector: gsap.DOMTarget,
  opts: {
    by?: "chars" | "words" | "lines";
    stagger?: number;
    duration?: number;
    y?: number;
    ease?: string;
    delay?: number;
    trigger?: gsap.DOMTarget;
    start?: string;
    onMount?: boolean;
  } = {}
): SplitText | null {
  let split: SplitText | null = null;

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const {
      by = "chars",
      stagger = 0.02,
      duration = 1.1,
      y = 50,
      ease = "power3.out",
      delay = 0,
      trigger,
      start = "top 80%",
      onMount = false,
    } = opts;

    const el =
      typeof selector === "string"
        ? document.querySelector<HTMLElement>(selector)
        : (selector as HTMLElement);
    if (!el) return;

    split = new SplitText(el, {
      type: by,
      // SplitText 3.13+ uses CSS-mask reveals — fine for headlines.
    });

    const targets =
      by === "chars" ? split.chars : by === "words" ? split.words : split.lines;

    gsap.from(targets, {
      y,
      opacity: 0,
      rotateX: -28,
      transformPerspective: 800,
      transformOrigin: "0% 100% -40",
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: onMount
        ? undefined
        : {
            trigger: trigger ?? el,
            start,
            toggleActions: "play none none none",
          },
    });
  });

  return split;
}

export function countUp(
  mm: MM,
  selector: gsap.DOMTarget,
  opts: { duration?: number; trigger?: gsap.DOMTarget } = {}
) {
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const { duration = 1.6, trigger } = opts;
    const nodes =
      typeof selector === "string"
        ? document.querySelectorAll<HTMLElement>(selector)
        : (selector as NodeListOf<HTMLElement>);

    nodes.forEach((node) => {
      const raw = node.getAttribute("data-count") ?? node.textContent ?? "0";
      const target = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
      const prefix = (raw.match(/^[^0-9.]+/) ?? [""])[0];
      const suffix = (raw.match(/[^0-9.]+$/) ?? [""])[0];

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        snap: { val: target >= 100 ? 1 : 0.1 },
        onUpdate: () => {
          const v = target >= 100 ? Math.round(obj.val) : obj.val.toFixed(1);
          node.textContent = `${prefix}${v}${suffix}`;
        },
        scrollTrigger: {
          trigger: trigger ?? node,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  });
}

export function marquee(
  mm: MM,
  selector: gsap.DOMTarget,
  opts: { duration?: number } = {}
) {
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const { duration = 32 } = opts;
    gsap.to(selector, {
      xPercent: -50,
      ease: "none",
      duration,
      repeat: -1,
    });
  });
}

export function pin(
  mm: MM,
  trigger: gsap.DOMTarget,
  opts: { end?: string; query?: string } = {}
) {
  const { end = "+=30%", query = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" } = opts;
  mm.add(query, () => {
    ScrollTrigger.create({
      trigger,
      start: "top top",
      end,
      pin: true,
      pinSpacing: false,
    });
  });
}
