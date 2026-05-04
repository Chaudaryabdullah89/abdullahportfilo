"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────
// PRELOADER — Award-winning design
//
// Phase 1 — INITIAL LOAD:
//   • Black screen with grid of 120 cells
//   • Name builds letter-by-letter (scramble style)
//   • A kinetic progress line draws across
//   • Counter counts 0 → 100 smoothly
//   • Grid cells collapse outward in a ripple wave
//   • Oversized "PORTFOLIO" text shoots upward
//
// Phase 2 — ROUTE TRANSITIONS:
//   • Fast clip-path wipe (horizontal line sweep)
// ─────────────────────────────────────────────

const COLS = 10;
const ROWS = 12;
const TOTAL = COLS * ROWS;

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";

const Preloader = () => {
  const isFirstLoad = useRef(true);
  const pathname = usePathname();

  const containerRef  = useRef<HTMLDivElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLDivElement>(null);
  const counterRef    = useRef<HTMLSpanElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLSpanElement>(null);
  const roleRef       = useRef<HTMLSpanElement>(null);
  const bigTextRef    = useRef<HTMLDivElement>(null);
  const shuffleColsRef = useRef<HTMLDivElement>(null);

  // ── INITIAL LOAD ──────────────────────────
  useEffect(() => {
    if (!isFirstLoad.current) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          isFirstLoad.current = false;
          if (containerRef.current) containerRef.current.style.display = "none";
          document.body.style.overflow = "";
        },
      });

      const cells = gridRef.current?.querySelectorAll<HTMLElement>(".pl-cell");
      const nameChars = nameRef.current?.querySelectorAll<HTMLElement>(".pl-char");

      // ── Phase 0: Setup ──
      tl.set(containerRef.current, { visibility: "visible" })
        .set(overlayRef.current, { opacity: 1 })
        .set(bigTextRef.current,  { y: "0%" })
        .set(cells || [],         { opacity: 1, scaleX: 1, scaleY: 1 })
        .set(nameChars || [],     { opacity: 0, y: 20 })
        .set(counterRef.current,  { opacity: 0 })
        .set(progressRef.current, { scaleX: 0, transformOrigin: "left center" })
        .set(labelRef.current,    { opacity: 0, y: 8 })
        .set(roleRef.current,     { opacity: 0, y: 8 });

      // ── Phase 1: Labels fade in ──
      tl.to([labelRef.current, roleRef.current], {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out",
      }, 0.2);

      // ── Phase 2: Name scramble-reveal ──
      if (nameChars && nameChars.length) {
        const target = "ABDULLAH";
        nameChars.forEach((char, i) => {
          const targetChar = target[i] ?? "";
          let frame = 0;
          const maxFrames = 12 + i * 3;

          tl.fromTo(char,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              onUpdate() {
                frame++;
                if (frame < maxFrames && char.dataset.final !== "1") {
                  char.innerText = LETTERS[Math.floor(Math.random() * LETTERS.length)];
                } else {
                  char.innerText = targetChar;
                  char.dataset.final = "1";
                }
              },
            },
            0.3 + i * 0.06
          );
        });
      }

      // ── Phase 3: Counter + progress bar ──
      tl.to(counterRef.current, { opacity: 1, duration: 0.3 }, 0.4)
        .to(
          counterRef.current,
          {
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              const progress = this.progress();
              const val = Math.round(progress * 100);
              if (counterRef.current) {
                counterRef.current.innerText = val < 10 ? `0${val}` : `${val}`;
              }
            },
          },
          0.4
        )
        .to(progressRef.current, {
          scaleX: 1, duration: 1.5, ease: "power2.inOut",
        }, 0.4);

      // ── Phase 4: Grid cells dissolve outward ──
      if (cells && cells.length) {
        // Group cells by distance from center
        const cx = COLS / 2;
        const cy = ROWS / 2;

        const sortedCells = Array.from(cells).sort((a, b) => {
          const ai = parseInt(a.dataset.i || "0");
          const bi = parseInt(b.dataset.i || "0");
          const ar = Math.floor(ai / COLS), ac = ai % COLS;
          const br = Math.floor(bi / COLS), bc = bi % COLS;
          const da = Math.sqrt((ar - cy) ** 2 + (ac - cx) ** 2);
          const db = Math.sqrt((br - cy) ** 2 + (bc - cx) ** 2);
          return db - da; // outer first
        });

        tl.to(sortedCells, {
          opacity: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 0.35,
          stagger: { each: 0.012, from: "edges" },
          ease: "power3.in",
          transformOrigin: "center center",
        }, 2.0);
      }

      // ── Phase 5: Big text + counter shoot upward ──
      tl.to(bigTextRef.current, {
        y: "-110%",
        duration: 1.0,
        ease: "expo.inOut",
      }, 2.7)
      .to(nameRef.current, {
        y: "-120%",
        opacity: 0,
        duration: 0.8,
        ease: "expo.in",
      }, 2.7);

      // ── Phase 6: Overlay panel slides up ──
      tl.to(overlayRef.current, {
        y: "-100%",
        duration: 1.0,
        ease: "expo.inOut",
      }, 2.8);
    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── PAGE SHUFFLE (ROUTE TRANSITIONS) ──────────
  useEffect(() => {
    if (isFirstLoad.current) return;

    const container = containerRef.current;
    const shuffleContainer = shuffleColsRef.current;
    if (!container || !shuffleContainer) return;

    const slices = shuffleContainer.querySelectorAll(".shuffle-slice");

    container.style.display = "block";
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        container.style.display = "none";
        document.body.style.overflow = "";
        gsap.set(container, { visibility: "hidden" });
      },
    });

    tl.set(container, { visibility: "visible" })
      .set(overlayRef.current, { opacity: 0 })
      .set(slices, { yPercent: -100, display: "block" })
      .to(slices, {
        yPercent: 0,
        duration: 0.5,
        stagger: { amount: 0.3, from: "random" },
        ease: "power4.inOut",
      })
      .to(slices, {
        yPercent: 100,
        duration: 0.5,
        stagger: { amount: 0.3, from: "random" },
        ease: "power4.inOut",
        delay: 0.1,
      });
  }, [pathname]);

  // ── BUILD GRID ────────────────────────────
  const cells = Array.from({ length: TOTAL }, (_, i) => (
    <div
      key={i}
      className="pl-cell"
      data-i={i}
      style={{
        width:  `${100 / COLS}%`,
        height: `${100 / ROWS}%`,
        background: i % 2 === 0 ? "#0a0b0d" : "#0d0f11",
      }}
    />
  ));

  const nameLetters = "ABDULLAH".split("").map((ch, i) => (
    <span
      key={i}
      className="pl-char inline-block font-black tracking-[-0.04em]"
      style={{ minWidth: "0.55em" }}
    >
      {ch}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] invisible pointer-events-none"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {/* ── MAIN OVERLAY: grid + content ─────── */}
      <div ref={overlayRef} className="absolute inset-0 overflow-hidden">
        {/* Grid layer */}
        <div
          ref={gridRef}
          className="absolute inset-0 flex flex-wrap"
          aria-hidden
        >
          {cells}
        </div>

        {/* Content layer (on top of grid) */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0 pointer-events-none select-none">

          {/* Label */}
          <span
            ref={labelRef}
            className="text-[#4ec9b0] text-[9px] font-bold tracking-[0.7em] uppercase mb-6"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Initialize_Portfolio
          </span>

          {/* Big scramble name */}
          <div
            ref={nameRef}
            className="text-white overflow-hidden"
            style={{ fontSize: "clamp(56px, 12vw, 140px)", lineHeight: 1 }}
            aria-label="Abdullah"
          >
            {nameLetters}
          </div>

          {/* Role */}
          <span
            ref={roleRef}
            className="text-white/20 text-[11px] font-bold tracking-[0.5em] uppercase mt-5"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Full&#8209;Stack&nbsp;Developer
          </span>

          {/* Progress block */}
          <div className="absolute bottom-[14%] left-0 right-0 px-[max(2rem,8vw)] flex flex-col gap-3 pointer-events-none">
            {/* Bar */}
            <div className="h-[1px] w-full bg-white/10 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full bg-[#4ec9b0] origin-left"
              />
            </div>
            {/* Row: label + counter */}
            <div className="flex items-center justify-between">
              <span
                className="text-white/25 text-[9px] font-bold tracking-[0.5em] uppercase"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Loading Assets
              </span>
              <div className="flex items-baseline gap-0.5">
                <span
                  ref={counterRef}
                  className="text-white font-black tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(28px,4vw,52px)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  00
                </span>
                <span className="text-[#4ec9b0] font-black text-xl">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big background "PORTFOLIO" text that shoots up at exit */}
        <div
          ref={bigTextRef}
          className="absolute inset-x-0 bottom-[-12%] flex items-end justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="font-black uppercase leading-none text-white/[0.025] whitespace-nowrap"
            style={{
              fontSize: "clamp(80px, 18vw, 220px)",
              fontFamily: "var(--font-space-grotesk)",
              letterSpacing: "-0.05em",
            }}
          >
            PORTFOLIO
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#4ec9b0]/30 pointer-events-none" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#4ec9b0]/30 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-[#4ec9b0]/30 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-[#4ec9b0]/30 pointer-events-none" />

        {/* Horizontal center divider */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.03] pointer-events-none" />
      </div>

      {/* ── ROUTE TRANSITION PANELS (SHUFFLE) ────────── */}
      <div
        ref={shuffleColsRef}
        className="absolute inset-0 flex pointer-events-none z-50 h-full w-full"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`shuffle-${i}`}
            className="shuffle-slice h-full flex-1 bg-[#050608] border-r border-white/[0.02]"
            style={{ transform: "translateY(-100%)" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
