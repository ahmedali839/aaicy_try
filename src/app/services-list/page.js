"use client";

import { useEffect, useRef } from "react";
import { Globe, Palette, BrainCircuit, Bot, ArrowRight } from "lucide-react";
import gsap from "gsap";

// update the import path for the icons based on your project structure

export default function ServicesList() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Website Development",
        "description": "We build scalable, robust web applications using Next.js, React, and cutting-edge web technologies."
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Website Designing",
        "description": "We craft stunning user interfaces and seamless user experiences with modern aesthetics and buttery-smooth animations."
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "AI Automations",
        "description": "We integrate artificial intelligence to streamline your workflows."
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "AI Agents",
        "description": "We develop custom AI agents that interact with your users, gather data, and perform complex tasks autonomously."
      }
    ]
  };

  const cardsRef = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const services = [
    {
      title: "Website Development",
      description: "We build scalable, robust web applications using Next.js, React, and cutting-edge web technologies. Our code is clean, our architectures are sound, and our final products are production-ready.",
      icon: <Globe className="w-12 h-12 text-blue-500" />,
      hoverColor: "hover:border-blue-500/50 hover:shadow-blue-500/20",
    },
    {
      title: "Website Designing",
      description: "We craft stunning user interfaces and seamless user experiences. Using tools like Tailwind CSS and GSAP, we breathe life into designs with modern aesthetics and buttery-smooth animations.",
      icon: <Palette className="w-12 h-12 text-pink-500" />,
      hoverColor: "hover:border-pink-500/50 hover:shadow-pink-500/20",
    },
    {
      title: "AI Automations",
      description: "We integrate artificial intelligence to streamline your workflows. From automated data entry to intelligent decision-making systems, we help you save time and focus on what truly matters.",
      icon: <BrainCircuit className="w-12 h-12 text-purple-500" />,
      hoverColor: "hover:border-purple-500/50 hover:shadow-purple-500/20",
    },
    {
      title: "AI Agents",
      description: "We develop custom AI agents that interact with your users, gather data, and perform complex tasks autonomously. Enhance your business capabilities with our state-of-the-art conversational bots.",
      icon: <Bot className="w-12 h-12 text-green-500" />,
      hoverColor: "hover:border-green-500/50 hover:shadow-green-500/20",
    },
  ];

  return (
    <div className="relative pt-32 pb-24 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to elevate your brand and optimize your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 transition-all duration-300 group ${service.hoverColor} hover:shadow-2xl`}
            >
              <div className="bg-white/5 w-24 h-24 rounded-2xl flex items-center justify-center mb-8">
                {service.icon}
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">{service.title}</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <button className="text-white font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                Learn more <ArrowRight className="w-5 h-5 text-brand-blue" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
