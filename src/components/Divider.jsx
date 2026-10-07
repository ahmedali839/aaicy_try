"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Divider({ className = "" }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 1,
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getById(path)?.kill();
    };
  }, []);

  return (
    <div className={`flex justify-center items-center h-full min-h-[340px] opacity-20 ${className}`}>
      <svg
        width="38"
        height="340"
        viewBox="0 0 38 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <path
          ref={pathRef}
          d="M36.0033 1.50008L1.50013 338.058"
          stroke="url(#paint0_linear)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="18.7517"
            y1="1.50008"
            x2="18.7517"
            y2="338.058"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
