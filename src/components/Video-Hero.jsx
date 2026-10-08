




"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoHero() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useLayoutEffect(() => {
    // Register plugin safely in browser lifecycle
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Isolate animations inside GSAP Context for zero memory leaks & instant cleanup
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrapperRef.current,
        {
          scale: 0.82,
          opacity: 0.4,
          borderRadius: "32px",
        },
        {
          scale: 1.0,
          opacity: 1.0,
          borderRadius: "12px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Triggers when top of hero reaches 80% down viewport
            end: "top 30%",   // Reaches full width when hero hits 30% viewport height
            scrub: 0.5,       // Smooth GPU scrubbing catch-up
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Garbage collect triggers on unmount
  }, []);

  // SEO Microdata Schema for Google Video Indexing
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Hero Demonstration Video",
    "description": "High resolution product showcase video",
    "thumbnailUrl": ["https://yourdomain.com/hero_poster.jpg"],
    "uploadDate": "2026-01-01T08:00:00+00:00",
    "contentUrl": "https://yourdomain.com/hero_video.mp4",
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent py-12"
      aria-label="Video Showcase Section"
    >
      {/* 1. SEO Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="w-full flex items-center justify-center overflow-hidden px-4 sm:px-8">
        <div
          ref={videoWrapperRef}
          className="relative w-full max-w-6xl aspect-video max-h-[82vh] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-zinc-900/50 will-change-transform"
        >
          {/* 2. Optimized Video Element */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero_poster.webp"
            aria-label="Product Showcase Video"
          >
            <source src="/hero_video.mp4" type="video/mp4" />
            <p className="sr-only">
              Your browser does not support HTML5 video.
            </p>
          </video>
        </div>
      </div>
    </section>
  );
}