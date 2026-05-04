"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TextReveal = ({ text, className = "" }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const chars = containerRef.current?.querySelectorAll(".char");
    if (!chars) return;

    // Use fromTo for ironclad visibility logic
    gsap.fromTo(chars, 
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%", // Fire earlier for Hero items
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
        overwrite: true
      }
    );
  }, [text]);

  return (
    <div ref={containerRef} className={`flex flex-wrap overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextReveal;
