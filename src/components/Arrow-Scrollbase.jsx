// "use client";

// import React, { useEffect, useRef } from "react";
// import Script from "next/script";

// const SCROLL_ITEMS = [
//   { label: "Motion", category: "Essence" },
//   { label: "Versatile", category: "Architecture" },
//   { label: "Life", category: "Experience" },
//   { label: "Journey", category: "Direction" },
//   { label: "Blur Effect", category: "Visuals" },
//   { label: "Moments", category: "Presence" },
//   { label: "Pulse", category: "Energy" },
//   { label: "Essence", category: "Core" },
//   { label: "Direction", category: "Strategy" },
// ];

// export default function BlurTextScroller() {
//   const containerRef = useRef(null);
//   const listRef = useRef(null);

//   const initAnimation = () => {
//     if (typeof window === "undefined" || !window.gsap) return;

//     const { gsap, ScrollTrigger } = window;
//     if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       const items = gsap.utils.toArray(".scroller-item");
//       if (!items.length) return;

//       // 1. Hero Entrance Animation
//       gsap.from(".scroller-card-container", {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         ease: "power2.out",
//       });

//       // 2. Infinite Vertical Continuous Motion with Dynamic Focal Blur
//       const loopTL = gsap.timeline({
//         repeat: -1,
//         defaults: { ease: "none" },
//       });

//       const totalItems = items.length;
//       const itemHeight = 64; // height + gap in px

//       // Animate the parent list moving upward smoothly
//       loopTL.to(listRef.current, {
//         y: `-=${totalItems * itemHeight}`,
//         duration: 12,
//         ease: "none",
//         modifiers: {
//           y: gsap.utils.unitize((y) => parseFloat(y) % (totalItems * itemHeight)),
//         },
//       });

//       // 3. Focal Zone Detector (ScrollTrigger / Intersection Blur effect)
//       items.forEach((item) => {
//         const textEl = item.querySelector(".item-text");
//         const arrowEl = item.querySelector(".item-arrow");

//         // Hover effect using standard GSAP pattern
//         item.addEventListener("mouseenter", () => {
//           gsap.to(item, { scale: 1.05, duration: 0.3, ease: "power2.out" });
//         });
//         item.addEventListener("mouseleave", () => {
//           gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
//         });
//       });

//       // Scroll-driven parallax / scale reveal for container
//       if (ScrollTrigger) {
//         ScrollTrigger.create({
//           trigger: containerRef.current,
//           start: "top 80%",
//           onEnter: () => {
//             gsap.fromTo(
//               items,
//               { opacity: 0, y: 20 },
//               {
//                 opacity: 1,
//                 y: 0,
//                 duration: 0.8,
//                 stagger: 0.1,
//                 ease: "power2.out",
//               }
//             );
//           },
//         });
//       }
//     }, containerRef);

//     return ctx;
//   };

//   useEffect(() => {
//     let ctx;
//     if (typeof window !== "undefined" && window.gsap) {
//       ctx = initAnimation();
//     }
//     return () => {
//       if (ctx) ctx.revert();
//     };
//   }, []);

//   return (
//     <section className="w-full py-12 px-4 flex justify-center items-center bg-black/95">
//       {/* GSAP CDN Scripts */}
//       <Script
//         src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
//         strategy="afterInteractive"
//         onLoad={initAnimation}
//       />
//       <Script
//         src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
//         strategy="afterInteractive"
//         onLoad={initAnimation}
//       />

//       {/* 16:9 Aspect Ratio Frame Container */}
//       <div
//         ref={containerRef}
//         className="scroller-card-container relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-center items-center p-8 select-none"
//       >
//         {/* Subtle Background Radial Gradient Glow */}
//         <div className="absolute inset-0 bg-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />

//         {/* Top & Bottom Masking Gradients for Depth Blur Effect */}
//         <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-10 pointer-events-none" />

//         {/* Center Focal Indicator Ring */}
//         <div className="absolute left-12 right-12 h-16 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xs pointer-events-none z-0 shadow-inner flex items-center justify-between px-6">
//           <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
//             Focus Zone
//           </span>
//           <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
//         </div>

//         {/* Scrolling List Wrapper */}
//         <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
//           <div ref={listRef} className="flex flex-col gap-4 items-center w-full">
//             {/* Render duplicated list for seamless continuous infinite scroll loop */}
//             {[...SCROLL_ITEMS, ...SCROLL_ITEMS].map((item, idx) => (
//               <div
//                 key={idx}
//                 className="scroller-item flex items-center justify-between w-full max-w-md h-12 px-6 rounded-lg transition-all duration-300 transform-gpu cursor-pointer group"
//               >
//                 {/* Secondary Meta Tag */}
//                 <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 group-hover:text-purple-400 transition-colors">
//                   {item.category}
//                 </span>

//                 {/* Main Label with Focus Arrow */}
//                 <div className="flex items-center gap-3">
//                   <span className="item-arrow text-purple-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
//                     →
//                   </span>
//                   <span className="item-text text-xl md:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
//                     {item.label}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }








"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";

const SCROLLER_ITEMS = [
  "Essence",
  "Memories",
  "Motion",
  "Emotion",
  "Direction",
  "Jitter",
  "Versatile",
  "Life",
  "Journey",
  "Moments",
  "Pulse",
];

export default function BlurTextScroller() {
  const containerRef = useRef(null);

  const initGSAP = () => {
    if (typeof window === "undefined" || !window.gsap) return;

    const { gsap, ScrollTrigger } = window;
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Create GSAP Context scoped to containerRef for safe React cleanup
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".scroller-item");
      if (!items.length) return;

      // 1. Page Load Animation Pattern
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // 2. Setup ScrollReveal and Hover interactions for each item
      items.forEach((item) => {
        const text = item.querySelector(".scroller-text");
        const arrow = item.querySelector(".scroller-arrow");

        // Hover Interaction Pattern
        const onMouseEnter = () => {
          gsap.to(item, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        };
        const onMouseLeave = () => {
          gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
        };

        item.addEventListener("mouseenter", onMouseEnter);
        item.addEventListener("mouseleave", onMouseLeave);

        // Symmetric ScrollTrigger Timeline for Focal Blur
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",   // Triggers as item enters lower 20% of screen
            end: "bottom 20%",  // Ends as item leaves top 20% of screen
            scrub: 1,           // 1-second smoothing for professional fluidity
          },
        });

        // STEP A: Animate INTO the center focus (0 to 50% scroll progress)
        tl.fromTo(
          text,
          { filter: "blur(12px)", scale: 0.75, color: "#333333", opacity: 0.2 },
          { filter: "blur(0px)", scale: 1, color: "#ffffff", opacity: 1, duration: 1, ease: "power2.out" },
          0
        )
        .fromTo(
          arrow,
          { opacity: 0, x: -30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
          0
        )
        // STEP B: Animate OUT OF the center focus (50% to 100% scroll progress)
        .to(
          text,
          { filter: "blur(12px)", scale: 0.75, color: "#333333", opacity: 0.2, duration: 1, ease: "power2.in" },
          1
        )
        .to(
          arrow,
          { opacity: 0, x: -30, scale: 0.8, duration: 1, ease: "power2.in" },
          1
        );
      });
    }, containerRef);

    return ctx;
  };

  useEffect(() => {
    let ctx;
    if (typeof window !== "undefined" && window.gsap) {
      ctx = initGSAP();
    }

    // Clean up all GSAP timelines and listeners on unmount
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden select-none">
      {/* Required GSAP CDNs via Next.js Script loaders */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={initGSAP}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={initGSAP}
      />

      {/* Component Specific Styles */}
      <style jsx global>{`
        .scroller-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 50vh 0;
        }

        .scroller-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin: -5px 0;
          will-change: transform, filter, opacity;
          transform: translateZ(0);
        }

        .scroller-arrow {
          position: absolute;
          right: calc(100% + 24px);
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 600;
          line-height: 1;
          opacity: 0;
        }

        .scroller-text {
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          text-transform: capitalize;
          color: #333333;
          filter: blur(12px);
          opacity: 0.2;
          transform: scale(0.75);
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
          color: #555;
          pointer-events: none;
          z-index: 100;
        }

        .scroller-footer .brand {
          color: #4f46e5;
        }
      `}</style>

      {/* Main Interactive Scroll List */}
      <main ref={containerRef} className="scroller-wrapper">
        {SCROLLER_ITEMS.map((itemText, index) => (
          <div key={`${itemText}-${index}`} className="scroller-item">
            <span className="scroller-arrow">→</span>
            <span className="scroller-text">{itemText}</span>
          </div>
        ))}
      </main>

      {/* Fixed Footer Layout */}
      <footer className="scroller-footer">
        <span className="brand">Blur Effect</span>
        <span>Template — 01</span>
        <span>YEAR 25</span>
      </footer>
    </div>
  );
}