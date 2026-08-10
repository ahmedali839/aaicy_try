import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/

export default function ServicesSection() {
  const pinRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Initial Reveal Animation (Opacity AND Position)
      gsap.from(".animate-up", {
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // 2. The Horizontal Scroll-Jack Logic
      // Calculate exactly how far left the container needs to move based on its total width vs the viewport
      const getScrollAmount = () => {
        let scrollWidth = scrollRef.current.scrollWidth;
        return -(scrollWidth - window.innerWidth + 100); // 100px padding buffer
      };

      const tween = gsap.to(scrollRef.current, {
        x: getScrollAmount,
        ease: "none", // Must be "none" so the scroll feels attached 1-to-1 with the user's mouse wheel
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1, // Smooth catch-up delay
          invalidateOnRefresh: true, // Recalculates on window resize
          end: () => `+=${scrollRef.current.scrollWidth}` // Distance user must scroll vertically to finish horizontal movement
        }
      });

      // 3. Custom Hover Interactions (Replacing CSS Transitions)
      const cards = gsap.utils.toArray('.service-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.05, 
            y: -10, // Lifting effect
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)", 
            duration: 0.3, 
            ease: "power2.out", 
            overwrite: "auto" 
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            y: 0,
            boxShadow: "0 8px 30px rgba(0,0,0,0.04)", 
            duration: 0.3, 
            ease: "power2.out", 
            overwrite: "auto" 
          });
        });
      });

    }, pinRef);

    return () => ctx.revert(); // Essential cleanup to prevent React strict-mode duplication
  }, []);

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* 
        The "pinRef" is the outer container that gets locked in place.
        We give it a minimum height of screen so it fills the view while pinned.
      */}
      <section ref={pinRef} className="h-screen flex flex-col justify-center py-24 pl-4 sm:pl-8 lg:pl-16">
        
        <div className="max-w-7xl mb-16 animate-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
            Our Expertise & <span className="text-blue-600">Services</span>
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl">
            Scroll down to explore how we elevate digital experiences and empower developers through targeted solutions.
          </p>
        </div>

        {/* 
          The "scrollRef" is the oversized inner container that slides left.
          Using flex-nowrap forces the cards into a horizontal line.
        */}
        <div 
          ref={scrollRef} 
          className="flex flex-nowrap gap-8 w-max pr-16 pb-12"
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              // Removed CSS transitions/hovers. Added 'service-card' & 'animate-up' for GSAP targeting
              className="service-card animate-up w-[350px] md:w-[400px] flex-shrink-0 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer will-change-transform"
            >
              <div className="w-16 h-16 bg-blue-50/80 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">{service.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}