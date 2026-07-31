"use client";

import { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";

export default function AboutUs() {
  const containerRef = useRef(null);
  const checklistRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
    );
    gsap.fromTo(
      checklistRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const standards = [
    "Scaleable & Production-Ready",
    "Professional & Fully Responsive",
    "Beautiful UI/UX with GSAP Animations",
    "Premium Typography & Colors",
    "FAANG-level Engineering Standards"
  ];

  return (
    <div className="relative overflow-hidden pt-32 pb-24">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Pioneering the intersection of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              Web & AI
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are dedicated to building robust, beautiful, and intelligent solutions for the modern web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Definetely to empower visionaries with cutting-edge digital experiences. We believe that the combination of flawless web development and state-of-the-art artificial intelligence can solve some of the world's most complex problems. Every line of code we write and every animation we design is crafted with purpose and precision.
            </p>
          </div>

          {/* Standards Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-8">Our Standards</h2>
            <ul className="space-y-6">
              {standards.map((item, index) => (
                <li
                  key={index}
                  ref={(el) => (checklistRef.current[index] = el)}
                  className="flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}