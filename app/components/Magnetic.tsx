"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const distance = Math.sqrt(x*x + y*y);
      if (distance < 100) {
        xTo(x * 0.35);
        yTo(y * 0.35);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return ref;
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useMagnetic();
  return <div ref={ref as any} className="inline-block">{children}</div>;
};

export default Magnetic;
