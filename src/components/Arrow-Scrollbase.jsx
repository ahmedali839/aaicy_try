"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SCROLLER_ITEMS = [
  "Websites",
  "AI Agents",
  "CRM",
  "Automation",
  "Voice Calling Agent",
  "Social Media Automation",
  "Chatbots",
  "Lead Generation",
  "GSheets, Insta, WA",
  "Business Automation",
  "Let's get started",
];

export default function BlurTextScroller() {
  const containerRef = useRef(null);

  // Register ScrollTrigger plugin immediately at module level safely
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  useLayoutEffect(() => {
    // Encapsulate all animations inside gsap.context for automatic cleanup
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".scroller-item");
      if (!items.length) return;

      // 1. Mandatory Page Load Animation Pattern
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // 2. Setup ScrollReveal and Hover interactions
      items.forEach((item) => {
        const text = item.querySelector(".scroller-text");
        const arrow = item.querySelector(".scroller-arrow");

        // Hover Interaction Pattern
        const onMouseEnter = () => {
          gsap.to(item, {
            scale: 1.05,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", onMouseEnter);
        item.addEventListener("mouseleave", onMouseLeave);

        // Symmetric ScrollTrigger Timeline for Focal Blur
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Standard ScrollReveal trigger point
            end: "bottom 20%", // Ends as item leaves upper viewport
            scrub: 0.5, // Fluid scroll response
          },
        });

        // STEP A: Animate INTO Center Focus (Black Active Color)
        tl.fromTo(
          text,
          {
            filter: "blur(6px)",
            scale: 0.82,
            color: "rgba(0, 0, 0, 0.35)",
            opacity: 0.35,
          },
          {
            filter: "blur(0px)",
            scale: 1.15,
            color: "#000000",
            opacity: 1.0,
            duration: 1,
            ease: "power2.out",
          },
          0
        ).fromTo(
          arrow,
          {
            opacity: 0.25,
            x: -15,
            scale: 0.8,
            color: "rgba(0, 0, 0, 0.35)",
          },
          {
            opacity: 1.0,
            x: 0,
            scale: 1.15,
            color: "#000000",
            duration: 1,
            ease: "power2.out",
          },
          0
        )

        // STEP B: Animate OUT OF Center Focus (Dimmed Muted Black)
        .to(
          text,
          {
            filter: "blur(6px)",
            scale: 0.82,
            color: "rgba(0, 0, 0, 0.35)",
            opacity: 0.35,
            duration: 1,
            ease: "power2.out",
          },
          1
        )
        .to(
          arrow,
          {
            opacity: 0.25,
            x: -15,
            scale: 0.8,
            color: "rgba(0, 0, 0, 0.35)",
            duration: 1,
            ease: "power2.out",
          },
          1
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    // Clean up timelines and listeners on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#ffffff] text-black font-sans overflow-x-hidden select-none">
      <style jsx global>{`
        .scroller-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 45vh 0;
          gap: 1.5rem;
        }

        .scroller-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          will-change: transform, filter, opacity;
          transform: translateZ(0);
        }

        .scroller-arrow {
          position: absolute;
          right: calc(100% + 28px);
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 400;
          line-height: 1;
          color: rgba(0, 0, 0, 0.35);
          opacity: 0.35;
        }

        .scroller-text {
          font-size: clamp(3.5rem, 7.5vw, 7.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          text-transform: capitalize;
          color: rgba(0, 0, 0, 0.35);
          filter: blur(6px);
          opacity: 0.35;
          transform: scale(0.82);
        }

        .scroller-footer {
          position: fixed;
          bottom: 30px;
          left: 40px;
          right: 40px;
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #52525b;
          pointer-events: none;
          z-index: 100;
        }

        .scroller-footer .brand {
          color: #4f46e5;
        }
      `}</style>

      <main ref={containerRef} className="scroller-wrapper">
        {SCROLLER_ITEMS.map((itemText, index) => (
          <div key={`${itemText}-${index}`} className="scroller-item">
            <span className="scroller-arrow">→</span>
            <span className="scroller-text">{itemText}</span>
          </div>
        ))}
      </main>

    </div>
  );
}