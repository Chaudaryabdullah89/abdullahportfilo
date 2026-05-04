"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollReveal() {
  const pathname = usePathname();
  const initRef = useRef(false);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const initReveal = () => {
      // 1. Cinematic Fade and Slide Up (Premium Curve)
      const revealElements = document.querySelectorAll('[data-reveal="fade-up"]');
      revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { 
            y: 60, 
            opacity: 0 
          }, 
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 2. High-End Staggered Sequences
      const staggerGroups = document.querySelectorAll('[data-reveal="stagger"]');
      staggerGroups.forEach((group) => {
        const children = group.children;
        gsap.fromTo(children, 
          { 
            y: 40, 
            opacity: 0,
            scale: 0.95 
          }, 
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 3. Immersive Image Reveals
      const imageReveals = document.querySelectorAll('[data-reveal="image"]');
      imageReveals.forEach((img) => {
        gsap.fromTo(img, 
          { 
            scale: 1.1, 
            opacity: 0,
            filter: "grayscale(100%) brightness(50%)" 
          }, 
          {
            scale: 1,
            opacity: 1,
            filter: "grayscale(100%) brightness(100%)",
            duration: 1.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 4. Horizontal Drift
      const driftElements = document.querySelectorAll('[data-reveal="drift-right"]');
      driftElements.forEach((el) => {
        gsap.fromTo(el, 
          { 
            x: -30, 
            opacity: 0 
          }, 
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 5. SAFETY FAIL-SAFE
      // If elements are still invisible after 3 seconds (e.g. scroll issues), force them visible
      setTimeout(() => {
        const allHidden = document.querySelectorAll('[data-reveal]');
        gsap.to(allHidden, { opacity: 1, y: 0, duration: 0.5, overwrite: 'auto' });
      }, 3000);
    };

    // Kill any existing triggers before re-initializing
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Orchestrated initialization with a slight delay for hydration
    const timer = setTimeout(() => {
       initReveal();
       ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  return null;
}
