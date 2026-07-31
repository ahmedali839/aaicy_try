"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Palette, BrainCircuit, Bot, Code, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Divider from "../components/Divider";
import MagneticButton from "../components/MagneticButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home | AICY – AI & Web Solutions",
    description: "Discover AICY, leading agency building the future of Web and AI with custom automated agents and robust web solutions.",
    publisher: {
      "@type": "Organization",
      name: "AICY"
    }
  };

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const cardsRef = useRef([]);
  const stackRef = useRef(null);
  const parallaxBgRef = useRef(null);

  useEffect(() => {
    // Ensure fonts are loaded before calculating ScrollTrigger heights (Prevents layout thrashing)
    document.fonts.ready.then(() => {
      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Hero Entrance
      gsap.fromTo(
        heroRef.current.children,
        { y: prefersReducedMotion ? 0 : 50, opacity: 0 },
        { y: 0, opacity: 1, duration: prefersReducedMotion ? 0 : 1, stagger: prefersReducedMotion ? 0 : 0.2, ease: "power4.out", delay: 0.2 }
      );

      // Services Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            gsap.fromTo(
              cardsRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
            );
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (servicesRef.current) {
        observer.observe(servicesRef.current);
      }

      // Advanced Parallax Background
      if (parallaxBgRef.current) {
        gsap.to(parallaxBgRef.current, {
          y: "200px",
          ease: "none",
          scrollTrigger: {
            trigger: parallaxBgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Stack Section Entrance Animation
      const stackElements = stackRef.current?.children;
      if (stackElements) {
        gsap.fromTo(
          Array.from(stackElements),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stackRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      
      // Refresh ScrollTrigger after font loaded and DOM is painted
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    {
      title: "Website Development",
      description: "Scaleable & Production-Ready web apps.",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Website Designing",
      description: "Beautiful UI/UX with modern animations.",
      icon: <Palette className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "AI Automations",
      description: "Streamline workflows with intelligent automation.",
      icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
    },
    {
      title: "AI Agents",
      description: "Custom AI agents to enhance your capabilities.",
      icon: <Bot className="w-8 h-8 text-green-500" />,
    },
  ];

  return (
    <div className="relative overflow-hidden pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Background Gradient Blob with Parallax */}
      <div 
        ref={parallaxBgRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10 will-change-transform" 
      />

      {/* Hero Section */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Future</span><br />
          of Web & AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          Digital Excellence for Visionaries. We craft cutting-edge websites and intelligent AI solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <MagneticButton>
            <Link href="/contact-form" className="px-8 py-4 bg-brand-coral text-white font-semibold rounded-full hover:opacity-90 transition flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/services-list" className="px-8 py-4 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition">
              View Services
            </Link>
          </MagneticButton>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-400">Everything you need to dominate the digital landscape.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 opacity-0 hover:-translate-y-2 hover:border-brand-blue/30 transition-all duration-300"
            >
              <div className="mb-4 bg-white dark:bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advanced Stack Section with Dividers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-16 relative">
        <div ref={stackRef} className="flex flex-col md:flex-row items-stretch justify-center text-center gap-4">
          
          {/* Feature 1 */}
          <div className="flex-1 px-4 py-8 md:py-0">
            <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <Code className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Practical Engineering</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
              Use cutting-edge frameworks like Next.js and robust cloud infrastructure to solve real-world challenges, following a proven path from your first architecture draft to a fully deployed application.
            </p>
          </div>

          <Divider className="hidden md:flex" />

          {/* Feature 2 */}
          <div className="flex-1 px-4 py-8 md:py-0">
            <div className="mx-auto w-20 h-20 bg-brand-blue/10 rounded-2xl rotate-45 flex items-center justify-center mb-6 border border-brand-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <BrainCircuit className="w-10 h-10 text-brand-blue -rotate-45" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Modern AI Tech Stack</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
              Explore the full stack of intelligent automation. From the power of open-source LLMs to enterprise-scale AI Agents, see how perfectly the pieces fit together for your business.
            </p>
          </div>

          <Divider className="hidden md:flex" />

          {/* Feature 3 */}
          <div className="flex-1 px-4 py-8 md:py-0">
            <div className="mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <Users className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Peer-to-Peer Guidance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-sm mx-auto">
              Work alongside senior developers and local leads who share their honest experience building, scaling, and shipping inside the rigorous startup and AI ecosystem.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
