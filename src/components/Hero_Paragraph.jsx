import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger early
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper component to ensure natural text wrapping while allowing isolated animations
const Word = ({ children, className = "" }) => (
  <span className={`word inline-block opacity-0 translate-y-8 will-change-transform ${className}`}>
    {children}&nbsp;
  </span>
);

export default function WhyGsap() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    // gsap.context strictly scopes animations to this component and automatically cleans them up on unmount
    const ctx = gsap.context(() => {
      
      // 1. Text Stagger Reveal
      // Animate opacity AND position together for a heavy, professional feel
      gsap.to('.word', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out" // Default smooth deceleration
      });

      // 2. SVG Decorator Pop-ins
      // Graphics scale and rotate in slightly after the text reveals
      gsap.fromTo('.decorator', 
        { 
          scale: 0, 
          rotation: -45, 
          opacity: 0 
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.2
        }
      );

      // 3. Badge Load Animation
      gsap.from('.badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      });

      // 4. Custom Hover interactions (replacing CSS transitions)
      const hoverTargets = gsap.utils.toArray('.gsap-hover');
      hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
        target.addEventListener('mouseleave', () => gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
      });

    }, sectionRef);

    return () => ctx.revert(); // Critical cleanup for React architecture
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen bg-[#111111] text-white py-32 px-6 md:px-12 lg:px-24 font-sans overflow-hidden selection:bg-[#0ae448] selection:text-black"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Top Badge */}
        <div className="badge flex items-center gap-3 text-white/60 mb-12 font-mono text-sm tracking-wider">
          <svg className="w-5 h-5 animate-spin-slow text-[#0ae448]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4m11.314-5.657l-11.314 11.314m0-11.314l11.314 11.314" />
          </svg>
          <span>{`{`} Why GSAP® {`}`}</span>
        </div>

        {/* Animated Typography Block */}
        <h2 className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight">
          <Word>GSAP</Word> <Word>allows</Word> <Word>you</Word> <Word>to</Word>
          
          <span className="relative inline-block gsap-hover cursor-pointer">
            <Word className="text-[#0ae448]">effortlessly</Word>
            {/* Flower/Spark SVG */}
            <svg className="decorator absolute -top-8 -right-6 w-14 h-14 text-orange-400 z-10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C55 40 60 45 100 50 C60 55 55 60 50 100 C45 60 40 55 0 50 C40 45 45 40 50 0 Z" />
            </svg>
          </span>
          
          <Word>animate</Word> <Word>anything</Word> <Word>JS</Word> <Word>can</Word> <Word>touch.</Word> <Word>Delivering</Word>
          
          <span className="relative inline-block gsap-hover cursor-pointer">
            <Word className="text-[#0ae448]">silky-smooth</Word>
            {/* Wave SVG */}
            <svg className="decorator absolute -bottom-4 left-0 w-full h-4 text-green-500 z-10 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M0 10 Q 25 20, 50 10 T 100 10" strokeLinecap="round"/>
            </svg>
          </span>
          
          <span className="relative inline-block gsap-hover cursor-pointer">
            <Word>performance</Word>
            {/* Green Swirl SVG inside text */}
            <svg className="decorator absolute top-2 right-4 w-8 h-8 text-[#0ae448] z-10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8" />
            </svg>
          </span>
          
          <Word>and</Word> <Word>unmatched</Word> <Word>support</Word> <Word>so</Word> <Word>you</Word> <Word>can</Word> <Word>focus</Word> <Word>on</Word> <Word>the</Word>
          
          <span className="relative inline-block gsap-hover cursor-pointer">
            <Word className="text-[#0ae448]">fun</Word> <Word className="text-[#0ae448]">stuff.</Word>
            {/* Underline SVG */}
            <svg className="decorator absolute -bottom-2 left-0 w-full h-6 text-[#0ae448] z-10 pointer-events-none" viewBox="0 0 100 24" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="5">
              <path d="M5 20 Q 50 5, 95 18" strokeLinecap="round"/>
            </svg>
          </span>
        </h2>

      </div>
    </section>
  );
}