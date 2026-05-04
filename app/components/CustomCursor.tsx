"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ringInnerRef.current;

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Immediate dot movement
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const ticker = () => {
      // Smooth ring following with gravity/lag
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      
      ringPos.x += (mouse.x - ringPos.x) * dt;
      ringPos.y += (mouse.y - ringPos.y) * dt;

      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y
      });

      // Subtle scaling based on movement velocity
      const dx = mouse.x - ringPos.x;
      const dy = mouse.y - ringPos.y;
      const vel = Math.sqrt(dx * dx + dy * dy);
      const scale = 1 + Math.min(vel / 200, 0.4);
      
      gsap.to(ringInner, {
        scale: scale,
        duration: 0.2,
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(ticker);

    const handleMouseEnter = () => {
      gsap.to(ringInner, {
        width: 60,
        height: 60,
        backgroundColor: "#4ec9b0",
        opacity: 0.15,
        borderColor: "#4ec9b0",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(dot, {
        scale: 2,
        backgroundColor: "#4ec9b0",
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ringInner, {
        width: 40,
        height: 40,
        backgroundColor: "transparent",
        opacity: 1,
        borderColor: "rgba(0,0,0,0.15)",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: "black",
        duration: 0.3
      });
    };

    const interactive = document.querySelectorAll("a, button, .interactive, .magnetic-wrap");
    interactive.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Handle Clicks
    const handleClick = () => {
       gsap.fromTo(ringInner, 
         { scale: 0.8, opacity: 0.5 },
         { scale: 1.5, opacity: 0, duration: 0.5, ease: "power2.out" }
       );
    };
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      gsap.ticker.remove(ticker);
      interactive.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block">
      {/* Precision Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full z-[999999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      
      {/* Lagging Ring Wrapper */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 z-[999998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        {/* The Animated Ring */}
        <div 
          ref={ringInnerRef}
          className="w-10 h-10 border border-black/15 rounded-full transition-colors duration-500"
        />
      </div>
    </div>
  );
};

export default CustomCursor;
