import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Always register plugins to prevent SSR hydration errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper component for staggered text reveals without losing natural browser kerning
const Word = ({ children, className = "" }) => (
  <span className={`word inline-block opacity-0 translate-y-8 will-change-transform ${className}`}>
    {children}&nbsp;
  </span>
);

export default function WhyGsap() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Text Stagger Reveal (Opacity + Position together for professional feel)
      gsap.to('.word', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03, // Fluid wave stagger
        ease: "power2.out" // Default smooth easing
      });

      // 2. Asterisk Petal Pop-ins
      gsap.fromTo('.asterisk-petal', 
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scrollTrigger: {
            trigger: ".asterisk-trigger",
            start: "top 75%",
          },
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(2)",
          delay: 0.3
        }
      );

      // 3. SVG Path Drawing (Simulating DrawSVG without external plugins)
      gsap.fromTo('.draw-line',
        { strokeDashoffset: 1000 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.2,
          delay: 0.5
        }
      );

      // 4. Badge Reveal
      gsap.from('.badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      });

      // 5. GSAP Hover Interactions (No CSS transitions allowed here)
      const hoverTargets = gsap.utils.toArray('.gsap-hover');
      hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
        target.addEventListener('mouseleave', () => gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
      });

    }, sectionRef);

    return () => ctx.revert(); // Cleanup memory leaks on unmount
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen bg-[#111111] text-[#f4f4f5] py-32 px-6 md:px-12 lg:px-24 font-sans overflow-hidden selection:bg-[#0ae448] selection:text-black"
    >
      {/* Max width widened to 1100px to match the text wrapping of image-1 */}
      <div className="max-w-[1100px] mx-auto">
        
        {/* Badge */}
        <div className="badge inline-flex items-center gap-2 mb-10 font-mono text-lg text-white/80">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M16 4C12 4 8 8 8 16V24C8 32 12 36 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="tracking-wide">Why GSAP®</span>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M8 4C12 4 16 8 16 16V24C16 32 12 36 8 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* 
          Typography Block Adjusted: 
          - Reduced max text size from 7rem to 5.2rem.
          - Increased leading (line-height) to 1.15 to prevent SVG overlapping.
          - Removed all manual <br /> tags for fluid wrapping.
        */}
        <h2 className="text-4xl md:text-5xl lg:text-[5.2rem] font-medium leading-[1.15] tracking-tight">
          <Word>GSAP</Word> <Word>allows</Word> <Word>you</Word> <Word>to</Word>
          
          <span className="relative inline-block asterisk-trigger cursor-pointer mr-2 gsap-hover">
            <Word className="text-[#0ae448]">effortlessly</Word>
            {/* Scaled down and repositioned asterisk */}
            <svg className="absolute -top-8 -right-10 w-16 h-16 z-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path className="asterisk-petal text-[#0ae448]" fill="currentColor" d="M45 45 L20 20 A 15 15 0 0 1 40 10 L55 35 Z" />
              <path className="asterisk-petal text-[#f97316]" fill="currentColor" d="M55 45 L80 20 A 15 15 0 0 1 90 40 L65 55 Z" />
              <path className="asterisk-petal text-[#ec4899]" fill="currentColor" d="M55 55 L80 80 A 15 15 0 0 1 60 90 L45 65 Z" />
              <path className="asterisk-petal text-[#a855f7]" fill="currentColor" d="M45 55 L20 80 A 15 15 0 0 1 10 60 L35 45 Z" />
            </svg>
          </span>
          
          <Word>animate</Word> <Word>anything</Word> <Word>JS</Word> <Word>can</Word> <Word>touch.</Word> <Word>Delivering</Word>
          
          <span className="relative inline-block cursor-pointer gsap-hover">
            <Word className="text-[#0ae448]">silky-smooth</Word>
            {/* Wave tucked closer to the text base */}
            <svg className="absolute -bottom-2 left-0 w-full h-4 z-10 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path 
                className="draw-line text-[#0ae448]" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round" 
                fill="none" 
                style={{ strokeDasharray: 1000 }}
                d="M 5,10 Q 20,20 35,10 T 65,10 T 95,10 T 125,10 T 155,10 T 185,10 T 215,10" 
              />
            </svg>
          </span>
          
          <span className="relative inline-block cursor-pointer mx-2 gsap-hover">
            <Word>performance</Word>
            {/* Loop repositioned to not float too high */}
            <svg className="absolute -top-2 -right-6 w-10 h-14 z-10 pointer-events-none" viewBox="0 0 40 60" fill="none">
              <path 
                className="draw-line text-[#0ae448]" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                style={{ strokeDasharray: 1000 }}
                d="M 5,50 C 30,50 40,20 20,10 C 0,0 0,30 20,35 C 35,40 35,15 35,15" 
              />
            </svg>
          </span>
          
          <Word>and</Word> <Word>unmatched</Word> <Word>support</Word> <Word>so</Word> <Word>you</Word> <Word>can</Word> <Word>focus</Word> <Word>on</Word> <Word>the</Word>
          
          <span className="relative inline-block cursor-pointer ml-2 gsap-hover">
            <Word className="text-[#0ae448]">fun</Word> <Word className="text-[#0ae448]">stuff.</Word>
            {/* Curls tucked up slightly to prevent bleeding into content below */}
            <svg className="absolute -bottom-4 left-0 w-full h-10 z-10 pointer-events-none" viewBox="0 0 250 40" preserveAspectRatio="none">
              <path 
                className="draw-line text-[#0ae448]" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round"
                fill="none" 
                style={{ strokeDasharray: 1000 }}
                d="M 5,20 C 50,30 100,-10 150,15 C 200,40 230,10 245,5 M 15,35 C 70,45 130,5 180,25" 
              />
            </svg>
          </span>
        </h2>

      </div>
    </section>
  );
}