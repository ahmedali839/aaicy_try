// import React, { useRef, useLayoutEffect } from 'react';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// // Register ScrollTrigger early
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Helper component to ensure natural text wrapping while allowing isolated animations
// const Word = ({ children, className = "" }) => (
//   <span className={`word inline-block opacity-0 translate-y-8 will-change-transform ${className}`}>
//     {children}&nbsp;
//   </span>
// );

// export default function WhyGsap() {
//   const sectionRef = useRef(null); // yes to add here
//   yes

//   useLayoutEffect(() => {
//     // gsap.context strictly scopes animations to this component and automatically cleans them up on unmount
//     const ctx = gsap.context(() => {
      
//       // 1. Text Stagger Reveal
//       // Animate opacity AND position together for a heavy, professional feel
//       gsap.to('.word', {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 80%",
//         },
//         opacity: 1,
//         y: 0,
//         duration: 0.8,
//         stagger: 0.05,
//         ease: "power2.out" // Default smooth deceleration
//       });

//       // 2. SVG Decorator Pop-ins
//       // Graphics scale and rotate in slightly after the text reveals
//       gsap.fromTo('.decorator', 
//         { 
//           scale: 0, 
//           rotation: -45, 
//           opacity: 0 
//         },
//         {
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 75%",
//           },
//           scale: 1,
//           rotation: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.2,
//           ease: "back.out(1.7)",
//           delay: 0.2
//         }
//       );

//       // 3. Badge Load Animation
//       gsap.from('.badge', {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 85%",
//         },
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         ease: "power2.out"
//       });

//       // 4. Custom Hover interactions (replacing CSS transitions)
//       const hoverTargets = gsap.utils.toArray('.gsap-hover');
//       hoverTargets.forEach(target => {
//         target.addEventListener('mouseenter', () => gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
//         target.addEventListener('mouseleave', () => gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
//       });

//     }, sectionRef);

//     return () => ctx.revert(); // Critical cleanup for React architecture
//   }, []);

//   return (
//     <section 
//       ref={sectionRef} 
//       className="w-full min-h-screen bg-[#111111] text-white py-32 px-6 md:px-12 lg:px-24 font-sans overflow-hidden selection:bg-[#0ae448] selection:text-black"
//     >
//       <div className="max-w-5xl mx-auto">
        
//         {/* Top Badge */}
//         <div className="badge flex items-center gap-3 text-white/60 mb-12 font-mono text-sm tracking-wider">
//           <svg className="w-5 h-5 animate-spin-slow text-[#0ae448]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4m11.314-5.657l-11.314 11.314m0-11.314l11.314 11.314" />
//           </svg>
//           <span>{`{`} Why GSAP® {`}`}</span>
//         </div>

//         {/* Animated Typography Block */}
//         <h2 className="text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight">
//           <Word>GSAP</Word> <Word>allows</Word> <Word>you</Word> <Word>to</Word>
          
//           <span className="relative inline-block gsap-hover cursor-pointer">
//             <Word className="text-[#0ae448]">effortlessly</Word>
//             {/* Flower/Spark SVG */}
//             <svg className="decorator absolute -top-8 -right-6 w-14 h-14 text-orange-400 z-10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
//               <path d="M50 0 C55 40 60 45 100 50 C60 55 55 60 50 100 C45 60 40 55 0 50 C40 45 45 40 50 0 Z" />
//             </svg>
//           </span>
          
//           <Word>animate</Word> <Word>anything</Word> <Word>JS</Word> <Word>can</Word> <Word>touch.</Word> <Word>Delivering</Word>
          
//           <span className="relative inline-block gsap-hover cursor-pointer">
//             <Word className="text-[#0ae448]">silky-smooth</Word>
//             {/* Wave SVG */}
//             <svg className="decorator absolute -bottom-4 left-0 w-full h-4 text-green-500 z-10 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="4">
//               <path d="M0 10 Q 25 20, 50 10 T 100 10" strokeLinecap="round"/>
//             </svg>
//           </span>
          
//           <span className="relative inline-block gsap-hover cursor-pointer">
//             <Word>performance</Word>
//             {/* Green Swirl SVG inside text */}
//             <svg className="decorator absolute top-2 right-4 w-8 h-8 text-[#0ae448] z-10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8" />
//             </svg>
//           </span>
          
//           <Word>and</Word> <Word>unmatched</Word> <Word>support</Word> <Word>so</Word> <Word>you</Word> <Word>can</Word> <Word>focus</Word> <Word>on</Word> <Word>the</Word>
          
//           <span className="relative inline-block gsap-hover cursor-pointer">
//             <Word className="text-[#0ae448]">fun</Word> <Word className="text-[#0ae448]">stuff.</Word>
//             {/* Underline SVG */}
//             <svg className="decorator absolute -bottom-2 left-0 w-full h-6 text-[#0ae448] z-10 pointer-events-none" viewBox="0 0 100 24" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="5">
//               <path d="M5 20 Q 50 5, 95 18" strokeLinecap="round"/>
//             </svg>
//           </span>
//         </h2>

//       </div>
//     </section>
//   );
// }







import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper component kept intact, but default tracking adjusted to match the video's tight typography
const Word = ({ children, className = "" }) => (
  <span className={`word inline-block opacity-0 translate-y-12 will-change-transform ${className}`}>
    {children}&nbsp;
  </span>
);

export default function WhyGsap() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Text Stagger Reveal (Tightened for fluid wave effect)
      gsap.to('.word', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.7, // Slightly longer duration
        stagger: 0.025, // Much tighter stagger for the wave feel
        ease: "power2.out"
      });

      // 2. Asterisk Petal Pop-ins (Exploding outward)
      gsap.fromTo('.asterisk-petal', 
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scrollTrigger: {
            trigger: ".asterisk-trigger",
            start: "top 75%",
          },
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)", // Adds that slight bounce seen in the video
          delay: 0.3
        }
      );

      // 3. SVG Path Drawing (Recreating the DrawSVG effect)
      // We set a high strokeDasharray in CSS/inline, and animate the offset to 0
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
          stagger: 0.3, // Delay each drawing line sequentially
          delay: 0.5
        }
      );

      // 4. Badge Reveal
      gsap.from('.badge', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      });

      // 5. Custom Hover interactions
      const hoverTargets = gsap.utils.toArray('.gsap-hover');
      hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => gsap.to(target, { scale: 1.05, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
        target.addEventListener('mouseleave', () => gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }));
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen bg-[#111111] text-[#f4f4f5] py-32 px-6 md:px-12 lg:px-24 font-sans overflow-hidden selection:bg-[#0ae448] selection:text-black"
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* Updated Badge: Matched the { Why GSAP } look from the video */}
        <div className="badge inline-flex items-center gap-2 mb-12 font-mono text-lg text-white/80">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-white">
            <path d="M16 4C12 4 8 8 8 16V24C8 32 12 36 16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="tracking-wide">Why GSAP®</span>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-white">
            <path d="M8 4C12 4 16 8 16 16V24C16 32 12 36 8 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Animated Typography Block - Font sizes and leading adjusted for massive scale */}
        <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-medium leading-[1.05] tracking-tight">
          <Word>GSAP</Word> <Word>allows</Word> <Word>you</Word> <Word>to</Word>
          
          <span className="relative inline-block asterisk-trigger cursor-pointer mr-4">
            <Word className="text-[#0ae448]">effortlessly</Word>
            {/* Multi-colored Exploding Asterisk */}
            <svg className="absolute -top-12 -right-16 w-24 h-24 z-10 pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path className="asterisk-petal text-[#0ae448]" fill="currentColor" d="M45 45 L20 20 A 15 15 0 0 1 40 10 L55 35 Z" />
              <path className="asterisk-petal text-[#f97316]" fill="currentColor" d="M55 45 L80 20 A 15 15 0 0 1 90 40 L65 55 Z" />
              <path className="asterisk-petal text-[#ec4899]" fill="currentColor" d="M55 55 L80 80 A 15 15 0 0 1 60 90 L45 65 Z" />
              <path className="asterisk-petal text-[#a855f7]" fill="currentColor" d="M45 55 L20 80 A 15 15 0 0 1 10 60 L35 45 Z" />
            </svg>
          </span>
          
          <Word>animate</Word> <br className="hidden lg:block" /> <Word>anything</Word> <Word>JS</Word> <Word>can</Word> <Word>touch.</Word> <Word>Delivering</Word>
          
          <span className="relative inline-block cursor-pointer">
            <Word className="text-[#0ae448]">silky-smooth</Word>
            {/* Squiggly Wave Underline */}
            <svg className="absolute -bottom-6 left-0 w-full h-8 z-10 pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path 
                className="draw-line text-[#0ae448]" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                fill="none" 
                style={{ strokeDasharray: 1000 }}
                d="M 5,10 Q 20,20 35,10 T 65,10 T 95,10 T 125,10 T 155,10 T 185,10 T 215,10" 
              />
            </svg>
          </span>
          
          <span className="relative inline-block cursor-pointer mx-3">
            <Word>performance</Word>
            {/* Green Looping 'e' Squiggle */}
            <svg className="absolute top-4 -right-10 w-12 h-16 z-10 pointer-events-none" viewBox="0 0 40 60" fill="none">
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
          
          <Word>and</Word> <Word>unmatched</Word> <Word>support</Word> <br className="hidden lg:block" /> <Word>so</Word> <Word>you</Word> <Word>can</Word> <Word>focus</Word> <Word>on</Word> <Word>the</Word>
          
          <span className="relative inline-block cursor-pointer ml-3">
            <Word className="text-[#0ae448]">fun</Word> <Word className="text-[#0ae448]">stuff.</Word>
            {/* Double Curly Underline */}
            <svg className="absolute -bottom-8 left-0 w-full h-12 z-10 pointer-events-none" viewBox="0 0 250 40" preserveAspectRatio="none">
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