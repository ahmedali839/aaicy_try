import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// // Tailored mock data with embedded SVGs to ensure immediate rendering
const services = [
  {
    title: "1-on-1 Online Teaching",
    description: "Dedicated online instruction and personalized tutoring sessions focused on deep conceptual understanding and practical application.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  {
    title: "MERN Stack Solutions",
    description: "End-to-end web application development using MongoDB, Express.js, React, and Node.js for robust, scalable platforms.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "Code Mentorship",
    description: "Guided code reviews, architectural planning, and career mentorship for aspiring developers stepping into the software industry.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    title: "AI Integration",
    description: "Automating workflows and enhancing user experiences by seamlessly integrating intelligent AI APIs into existing codebases.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

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