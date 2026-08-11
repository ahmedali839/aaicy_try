// "use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   ChevronDown,
//   Moon,
//   Play,
//   Zap,
//   Sparkles,
// } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Ensure GSAP plugins are registered safely on the client side
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function LandingPage() {
//   const compRef = useRef(null);
//   const heroLeftRef = useRef(null);
//   const heroRightRef = useRef(null);
//   const trustBadgeRef = useRef(null);

//   // Initial Page Load Animations (GSAP)
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Navbar Fade & Slide Down
//       gsap.from(".gsap-nav", {
//         opacity: 0,
//         y: -30,
//         duration: 0.8,
//         ease: "power2.out",
//       });

//       // 2. Hero Left Staggered Text & Button Entrance
//       gsap.from(".gsap-hero-left > *", {
//         opacity: 0,
//         y: 35,
//         duration: 0.8,
//         stagger: 0.15,
//         ease: "power2.out",
//         delay: 0.2,
//       });

//       // 3. Hero Right Cards Entrance (Opacity + Position + Scale)
//       gsap.from(".gsap-card", {
//         opacity: 0,
//         y: 40,
//         scale: 0.96,
//         duration: 0.9,
//         stagger: 0.2,
//         ease: "power2.out",
//         delay: 0.4,
//       });

//       // 4. Trust Badges Entrance
//       gsap.from(trustBadgeRef.current, {
//         opacity: 0,
//         y: 20,
//         scale: 0.95,
//         duration: 0.7,
//         ease: "power2.out",
//         delay: 0.8,
//       });

//       // 5. ScrollTrigger Example for lower section triggers (if extended)
//       ScrollTrigger.create({
//         trigger: compRef.current,
//         start: "top 80%",
//         onEnter: () => {
//           gsap.to(".gsap-dot-bg", {
//             opacity: 1,
//             duration: 1,
//             ease: "power2.out",
//           });
//         },
//       });
//     }, compRef);

//     return () => ctx.revert();
//   }, []);

//   // Generic GSAP Hover Animators
//   const handleButtonHover = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1.04,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleButtonLeave = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleCardHover = (e) => {
//     gsap.to(e.currentTarget, {
//       y: -6,
//       scale: 1.01,
//       boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)",
//       duration: 0.35,
//       ease: "power2.out",
//     });
//   };

//   const handleCardLeave = (e) => {
//     gsap.to(e.currentTarget, {
//       y: 0,
//       scale: 1,
//       boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.04)",
//       duration: 0.35,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div
//       ref={compRef}
//       className="relative min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white"
//       style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
//     >
//       {/* Canvas Background: Polka Dot Grid Pattern */}
//       <div
//         className="gsap-dot-bg pointer-events-none absolute inset-0 z-0 opacity-60"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, #D1D5DB 1.2px, transparent 1.2px)",
//           backgroundSize: "24px 24px",
//         }}
//       />

//       {/* ------------------- NAVIGATION BAR ------------------- */}
//       <header className="gsap-nav relative z-50 pt-5 px-4">
//         <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-black/8 bg-white/90 px-6 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-black">
//             <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white">
//               <span className="text-xs font-extrabold">O</span>
//             </div>
//             <span>Ocoya</span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden items-center gap-6 lg:flex text-[14px] font-medium text-neutral-700">
//             <button className="flex items-center gap-1 hover:text-black">
//               Features <ChevronDown className="h-3.5 w-3.5" />
//             </button>
//             <Link href="#" className="flex items-center gap-1.5 hover:text-black">
//               Integrations
//               <span className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.2 text-[10px] font-semibold text-neutral-700">
//                 New
//               </span>
//             </Link>
//             <Link href="#" className="hover:text-black">
//               Pricing
//             </Link>
//             <Link href="#" className="hover:text-black">
//               Get paid!
//             </Link>
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-3">
//             <button
//               onMouseEnter={handleButtonHover}
//               onMouseLeave={handleButtonLeave}
//               className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
//               aria-label="Toggle theme"
//             >
//               <Moon className="h-4 w-4" />
//             </button>
//             <Link
//               href="#"
//               onMouseEnter={handleButtonHover}
//               onMouseLeave={handleButtonLeave}
//               className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl px-4 text-[14px] font-medium text-neutral-800 hover:bg-neutral-100"
//             >
//               Login
//             </Link>
//             <Link
//               href="#"
//               onMouseEnter={handleButtonHover}
//               onMouseLeave={handleButtonLeave}
//               className="inline-flex h-9 items-center justify-center rounded-xl bg-neutral-950 px-4 text-[14px] font-semibold text-white shadow-sm"
//             >
//               Try free
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* ------------------- MAIN HERO SECTION ------------------- */}
//       <main className="relative z-10 mx-auto max-w-7xl px-6 pt-16 lg:pt-24 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
//           {/* LEFT COLUMN: Main Hero Copy & Social Proof */}
//           <div ref={heroLeftRef} className="gsap-hero-left lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
            
//             {/* Headline */}
//             <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.04em] text-neutral-950 leading-[1.05] mb-6">
//               Social media management. <br />
//               <span className="text-neutral-950">Using AI.</span>
//             </h1>

//             {/* Subtitle */}
//             <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-xl mb-8">
//               Don't hire a social media agency. <br />
//               Ocoya allows bulk content creation and engagement with AI and workflows.
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap items-center gap-3 mb-12">
//               <Link
//                 href="#"
//                 onMouseEnter={handleButtonHover}
//                 onMouseLeave={handleButtonLeave}
//                 className="inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-[15px] font-semibold text-white shadow-md"
//               >
//                 Try free
//               </Link>
//               <Link
//                 href="#"
//                 onMouseEnter={handleButtonHover}
//                 onMouseLeave={handleButtonLeave}
//                 className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200/90 bg-white px-5 text-[15px] font-medium text-neutral-800 shadow-sm"
//               >
//                 Watch intro
//                 <Play className="h-3.5 w-3.5 fill-current text-neutral-800" />
//               </Link>
//             </div>

//             {/* Trust & Social Proof Bar */}
//             <div ref={trustBadgeRef} className="flex flex-col sm:flex-row sm:items-center gap-4">
//               {/* Stacked Brand Circles */}
//               <div className="flex -space-x-2.5 items-center">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white ring-2 ring-white text-[11px] font-bold">
//                   Uber
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-white text-[10px] font-bold">
//                   coursera
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white ring-2 ring-white text-[12px] font-extrabold">
//                   f
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-white text-[11px] font-bold">
//                   P
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-white text-[10px] font-bold">
//                   Pepsi
//                 </div>
//               </div>

//               {/* Status Badge + Counter */}
//               <div className="flex items-center gap-2">
//                 <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//                   LIVE
//                 </span>
//                 <span className="text-sm font-medium text-neutral-600">
//                   Trusted by <strong className="text-neutral-900 font-semibold">618,104</strong> customers worldwide.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Feature Cards Stack */}
//           <div ref={heroRightRef} className="lg:col-span-5 flex flex-col gap-6">
            
//             {/* Top Card: Automations with AI */}
//             <div
//               onMouseEnter={handleCardHover}
//               onMouseLeave={handleCardLeave}
//               className="gsap-card cursor-pointer rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]"
//             >
//               <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-900">
//                 <Zap className="h-6 w-6 stroke-[2]" />
//               </div>
//               <h3 className="text-2xl font-bold tracking-tight text-neutral-950 mb-3">
//                 Automations with AI
//               </h3>
//               <p className="text-[15px] font-normal leading-relaxed text-neutral-500 max-w-md">
//                 Create and schedule posts with the help of automations and AI agents.
//               </p>
//             </div>

//             {/* Bottom Card: Made for Agencies (Photo Card) */}
//             <div
//               onMouseEnter={handleCardHover}
//               onMouseLeave={handleCardLeave}
//               className="gsap-card cursor-pointer group relative min-h-[300px] overflow-hidden rounded-[28px] border border-black/5 bg-neutral-900 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)]"
//             >
//               {/* Background Agency Team Image */}
//               <img
//                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
//                 alt="Made for agencies team"
//                 className="absolute inset-0 h-full w-full object-cover object-center opacity-85 transition-transform duration-700 group-hover:scale-105"
//               />

//               {/* Floating Badge */}
//               <div className="absolute top-5 right-5 z-20">
//                 <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm">
//                   <img
//                     src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
//                     alt="Agency avatar"
//                     className="h-5 w-5 rounded-full object-cover"
//                   />
//                   <span className="text-xs font-semibold text-neutral-900">
//                     Made for agencies
//                   </span>
//                 </div>
//               </div>
//             </div>

//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }

















// "use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import { Play, ChevronRight, Star, Moon, ChevronDown } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Ensure GSAP plugins are safely registered on client mount
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function LandingPage() {
//   const pageRef = useRef(null);

//   // GSAP Entrance & Scroll Animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Navbar Page Load Entrance
//       gsap.from(".gsap-nav", {
//         opacity: 0,
//         y: -30,
//         scale: 0.98,
//         duration: 0.8,
//         ease: "power2.out",
//       });

//       // 2. Left Hero Content Entrance (Staggered Opacity + Position)
//       gsap.from(".gsap-hero-left > *", {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         stagger: 0.2,
//         ease: "power2.out",
//         delay: 0.1,
//       });

//       // 3. Right Column Cards Entrance (Staggered Opacity + Scale)
//       gsap.from(".gsap-card", {
//         opacity: 0,
//         y: 40,
//         scale: 0.95,
//         duration: 0.8,
//         stagger: 0.2,
//         ease: "power2.out",
//         delay: 0.3,
//       });

//       // 4. ScrollTrigger Reveal for Additional Lower Sections
//       ScrollTrigger.create({
//         trigger: ".gsap-hero-left",
//         start: "top 80%",
//         onEnter: () => {
//           gsap.to(".gsap-bg-dots", {
//             opacity: 0.6,
//             duration: 1,
//             ease: "power2.out",
//           });
//         },
//       });
//     }, pageRef);

//     return () => ctx.revert();
//   }, []);

//   // GSAP Standard Hover Animators (No CSS Transitions)
//   const handleHoverIn = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1.05,
//       opacity: 1,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleHoverOut = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleCardHoverIn = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1.02,
//       y: -6,
//       opacity: 1,
//       boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleCardHoverOut = (e) => {
//     gsap.to(e.currentTarget, {
//       scale: 1,
//       y: 0,
//       boxShadow: "0 10px 30px -5px rgba(0,0,0,0.03)",
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div
//       ref={pageRef}
//       className="relative min-h-screen w-full overflow-x-hidden bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white"
//     >
//       {/* Polka Dot Background Grid */}
//       <div
//         className="gsap-bg-dots pointer-events-none absolute inset-0 z-0 opacity-60"
//         style={{
//           backgroundImage:
//             "radial-gradient(circle, #D1D5DB 1.2px, transparent 1.2px)",
//           backgroundSize: "24px 24px",
//         }}
//       />

//             {/* ------------------- MAIN HERO SECTION ------------------- */}
//       <main className="relative z-10 mx-auto max-w-7xl px-6 pt-12 lg:pt-20 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
//           {/* LEFT COLUMN: Hero Copy & Social Proof */}
//           <div className="gsap-hero-left lg:col-span-7 flex flex-col justify-center">
            
//             {/* Heading matching exact Plus Jakarta Sans Specs */}
//             <h1
//               className="text-neutral-950 mb-6 tracking-[-0.03em]"
//               style={{
//                 fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Placeholder", sans-serif',
//                 fontWeight: 600,
//                 fontSize: "48px",
//                 lineHeight: "67px",
//               }}
//             >
//               Social media management. <br />
//               Using AI.
//             </h1>

//             {/* Subtitle matching exact Inter Tight Specs */}
//             <p
//               className="mb-8 max-w-xl"
//               style={{
//                 fontFamily: '"Inter Tight", "Inter Tight Placeholder", sans-serif',
//                 fontWeight: 400,
//                 fontSize: "18px",
//                 lineHeight: "29px",
//                 color: "rgb(161, 161, 170)",
//               }}
//             >
//               Don't hire a social media agency. <br />
//               Ocoya allows bulk content creation and engagement with AI and workflows.
//             </p>

//             {/* CTA Action Buttons */}
//             <div className="flex flex-wrap items-center gap-3 mb-12">
//               <Link
//                 href="#"
//                 onMouseEnter={handleHoverIn}
//                 onMouseLeave={handleHoverOut}
//                 className="inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 text-[15px] font-semibold text-white shadow-md"
//               >
//                 Try free
//               </Link>
//               <Link
//                 href="#"
//                 onMouseEnter={handleHoverIn}
//                 onMouseLeave={handleHoverOut}
//                 className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200/90 bg-white px-5 text-[15px] font-medium text-neutral-800 shadow-sm"
//               >
//                 Watch intro
//                 <Play className="h-3.5 w-3.5 fill-current text-neutral-800" />
//               </Link>
//             </div>

//             {/* Social Proof & Customer Count Badge */}
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//               <div className="flex -space-x-2.5 items-center">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white ring-2 ring-white text-[11px] font-bold">
//                   Uber
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white ring-2 ring-white text-[10px] font-bold">
//                   coursera
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white ring-2 ring-white text-[12px] font-extrabold">
//                   f
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-white text-[11px] font-bold">
//                   P
//                 </div>
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-white text-[10px] font-bold">
//                   Pepsi
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
//                   <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//                   LIVE
//                 </span>
//                 <span className="text-sm font-medium text-neutral-600">
//                   Trusted by <strong className="text-neutral-900 font-semibold">618,104</strong> customers worldwide.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Matching Card Stack from Image */}
//           <div className="lg:col-span-5 flex flex-col gap-5">
            
//             {/* CARD 1: Dark Agency Transformation Banner */}
//             <div
//               onMouseEnter={handleCardHoverIn}
//               onMouseLeave={handleCardHoverOut}
//               className="gsap-card cursor-pointer relative overflow-hidden rounded-[24px] bg-[#18181B] p-8 text-white shadow-sm"
//             >
//               {/* Subtle Ambient Background Image Overlay */}
//               <div
//                 className="absolute inset-0 z-0 opacity-20 mix-blend-overlay"
//                 style={{
//                   backgroundImage:
//                     "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')",
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               />
//               <div className="relative z-10 flex flex-col items-start gap-6">
//                 <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight max-w-xs">
//                   Transform your agency into a true sector leader.
//                 </h3>
//                 <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-200 hover:text-white transition-colors">
//                   Check all features
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>

//             {/* CARD 2: Testimonial Card with 5 Stars & Benjamin Austin Profile */}
//             <div
//               onMouseEnter={handleCardHoverIn}
//               onMouseLeave={handleCardHoverOut}
//               className="gsap-card cursor-pointer rounded-[24px] border border-black/5 bg-white p-7 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)]"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
//                     alt="Benjamin Austin"
//                     className="h-11 w-11 rounded-full object-cover"
//                   />
//                   <div>
//                     <h4 className="text-base font-bold text-neutral-900 leading-tight">
//                       Benjamin Austin
//                     </h4>
//                     <p className="text-xs text-neutral-500 font-medium">
//                       Account Executive, Uber Eats
//                     </p>
//                   </div>
//                 </div>

//                 {/* 5-Star Rating */}
//                 <div className="flex items-center gap-0.5 text-amber-400">
//                   <Star className="h-4 w-4 fill-current" />
//                   <Star className="h-4 w-4 fill-current" />
//                   <Star className="h-4 w-4 fill-current" />
//                   <Star className="h-4 w-4 fill-current" />
//                   <Star className="h-4 w-4 fill-current" />
//                 </div>
//               </div>

//               <p className="text-[14px] leading-relaxed text-neutral-600 font-normal">
//                 The AI-driven workflows do a solid job and saves an incredible amount of time in content creation.
//               </p>
//             </div>

//             {/* CARD 3: Social Food Spread Image Card */}
//             <div
//               onMouseEnter={handleCardHoverIn}
//               onMouseLeave={handleCardHoverOut}
//               className="gsap-card cursor-pointer overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.03)]"
//             >
//               <div className="h-56 w-full overflow-hidden">
//                 <img
//                   src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
//                   alt="Social Media Post Content"
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//             </div>

//           </div>

//         </div>
//       </main>
//     </div>
//   );
// }


















// "use client";

// import React, { useEffect, useRef } from "react";

// /* 
//  * GSAP CDN IMPORTS (Required per architecture standards)
//  * Include these in your index.html <head> or Next.js _document.jsx:
//  * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
//  * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
//  */
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Ensure ScrollTrigger is registered safely on the client
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function HeroSection() {
//   const sectionRef = useRef(null);

//   // Core GSAP Lifecycle Engine
//   useEffect(() => {
//     // gsap.context handles scope and cleanup automatically for React
//     const ctx = gsap.context(() => {
      
//       // 1. Page Load Animation Pattern
//       gsap.from(".hero-anim", {
//         opacity: 0,
//         y: 30,
//         duration: 0.8,
//         stagger: 0.2,
//         ease: "power2.out",
//       });

//       // 2. Scroll Reveal Pattern for the container
//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top 80%",
//         animation: gsap.to(".bg-pattern-layer", {
//           opacity: 0.6,
//           duration: 1.5,
//           ease: "power2.out",
//         }),
//       });

//     }, sectionRef);

//     // Strict cleanup prevents memory leaks during re-renders
//     return () => ctx.revert();
//   }, []);

//   // Standard Hover Pattern Handlers
//   const handleHoverIn = (e) => {
//     gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" });
//   };

//   const handleHoverOut = (e) => {
//     gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
//   };

//   const handleCardHoverIn = (e) => {
//     gsap.to(e.currentTarget, { 
//       scale: 1.02, 
//       y: -5, 
//       boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
//       duration: 0.3, 
//       ease: "power2.out" 
//     });
//   };

//   const handleCardHoverOut = (e) => {
//     gsap.to(e.currentTarget, { 
//       scale: 1, 
//       y: 0, 
//       boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
//       duration: 0.3, 
//       ease: "power2.out" 
//     });
//   };

//   return (
//     <div 
//       ref={sectionRef} 
//       className="relative min-h-screen w-full overflow-hidden bg-[#FCFCFC] text-[#09090b] selection:bg-neutral-900 selection:text-white flex items-center justify-center font-sans"
//     >
//       {/* Background SVG Pattern */}
//       <div
//         className="bg-pattern-layer pointer-events-none absolute inset-0 z-0 opacity-0"
//         style={{
//           backgroundImage: "url('https://framerusercontent.com/images/c0EZxtMucSR6UOSZk2TBnWsqr4.svg?width=96&height=96')",
//           backgroundRepeat: "repeat",
//           backgroundPosition: "center",
//           backgroundSize: "41px auto",
//         }}
//       />

//       <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 items-center">
        
//         {/* LEFT COLUMN: Copy & Actions */}
//         <section className="flex flex-col gap-7">
//           <h1 className="hero-anim text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl lg:text-[4rem]">
//             <span className="block">Social media management.</span>
//             <span className="block">Using AI.</span>
//           </h1>

//           <p className="hero-anim max-w-lg text-lg font-normal leading-relaxed text-neutral-600">
//             Don't hire a social media agency.<br />
//             Ocoya allows bulk content creation and engagement with AI and workflows.
//           </p>

//           <div className="hero-anim flex flex-wrap items-center gap-3 pt-2">
//             <button
//               onMouseEnter={handleHoverIn}
//               onMouseLeave={handleHoverOut}
//               className="inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-7 text-[15px] font-semibold text-white shadow-md outline-none"
//             >
//               Try free
//             </button>
//             <button
//               onMouseEnter={handleHoverIn}
//               onMouseLeave={handleHoverOut}
//               className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 text-[15px] font-medium text-neutral-900 shadow-sm outline-none"
//             >
//               Watch intro
//               <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current"><path d="M8 5v14l11-7z"/></svg>
//             </button>
//           </div>

//           {/* Social Proof */}
//           <div className="hero-anim mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
//             <div className="flex -space-x-3">
//               {['bg-black', 'bg-blue-600', 'bg-blue-700', 'bg-blue-900'].map((bg, i) => (
//                 <div key={i} className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-[10px] font-bold text-white shadow-sm ${bg}`}>
//                   {['Uber', 'c', '∞', 'P'][i]}
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
//               <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-900">
//                 <span className="h-2 w-2 rounded-full bg-emerald-500" /> LIVE
//               </span>
//               <span>Trusted by <strong className="text-neutral-900">618,104</strong> customers worldwide.</span>
//             </div>
//           </div>
//         </section>

//         {/* RIGHT COLUMN: Interactive Cards */}
//         <section className="flex flex-col gap-5">
          
//           {/* Card 1: Agency Banner */}
//           <div
//             onMouseEnter={handleCardHoverIn}
//             onMouseLeave={handleCardHoverOut}
//             className="hero-anim relative flex min-h-[180px] cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] bg-[#18181b] p-7 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-neutral-200/10"
//           >
//             <div
//               className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
//               style={{
//                 backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             />
//             <div className="relative z-10 flex h-full flex-col justify-between gap-6">
//               <h3 className="max-w-[280px] text-[1.35rem] font-bold leading-tight">
//                 Transform your agency into a true sector leader.
//               </h3>
//               <span className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-200">
//                 Check all features &rsaquo;
//               </span>
//             </div>
//           </div>

//           {/* Card 2: Testimonial */}
//           <div
//             onMouseEnter={handleCardHoverIn}
//             onMouseLeave={handleCardHoverOut}
//             className="hero-anim flex cursor-pointer flex-col gap-4 rounded-[20px] border border-neutral-200/80 bg-white p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
//                   alt="Benjamin Austin"
//                   className="h-11 w-11 rounded-full object-cover"
//                   loading="lazy"
//                 />
//                 <div>
//                   <h4 className="text-[15px] font-bold text-neutral-900">Benjamin Austin</h4>
//                   <p className="text-xs text-neutral-500 font-medium">Account Executive, Uber Eats</p>
//                 </div>
//               </div>
//               <div className="text-[15px] tracking-widest text-amber-500">★★★★★</div>
//             </div>
//             <p className="text-[14px] leading-relaxed text-neutral-600">
//               The AI-driven workflows do a solid job and saves an incredible amount of time in content creation.
//             </p>
//           </div>

//           {/* Card 3: Image Feature */}
//           <div
//             onMouseEnter={handleCardHoverIn}
//             onMouseLeave={handleCardHoverOut}
//             className="hero-anim h-[200px] cursor-pointer overflow-hidden rounded-[20px] border border-neutral-200/80 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
//               alt="Social Workflow"
//               className="h-full w-full object-cover"
//               loading="lazy"
//             />
//           </div>

//         </section>
//       </main>
//     </div>
//   );
// }




















"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered safely on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef(null);

  // Core GSAP Lifecycle Engine
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Page Load Animation Pattern (Opacity + Y position together)
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 2. Scroll Reveal Pattern for the background pattern
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        animation: gsap.to(".bg-pattern-layer", {
          opacity: 0.4, // Subtle reveal
          duration: 1.5,
          ease: "power2.out",
        }),
      });

    }, sectionRef);

    // Strict cleanup prevents memory leaks during React StrictMode re-renders
    return () => ctx.revert();
  }, []);

  // Standard GSAP Hover Pattern Handlers
  const handleHoverIn = (e) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleHoverOut = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleCardHoverIn = (e) => {
    gsap.to(e.currentTarget, { 
      scale: 1.02, 
      y: -5, 
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  const handleCardHoverOut = (e) => {
    gsap.to(e.currentTarget, { 
      scale: 1, 
      y: 0, 
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
      duration: 0.3, 
      ease: "power2.out" 
    });
  };

  // here we added features in landing page and also added social proof section with 5 items to match the image provided in the prompt
  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-screen w-full overflow-hidden bg-[#FCFCFC] text-[#09090b] selection:bg-neutral-900 selection:text-white flex flex-col"
    >
      {/* Dynamic Font Injection (For immediate rendering) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Inter+Tight:wght@400;500&display=swap');
        .font-heading { font-family: 'Inter', sans-serif; }
        .font-body { font-family: 'Inter Tight', sans-serif; }
      `}} />

      {/* Background SVG Pattern */}
      <div
        className="bg-pattern-layer pointer-events-none absolute inset-0 z-0 opacity-0"
        style={{
          backgroundImage: "url('https://framerusercontent.com/images/c0EZxtMucSR6UOSZk2TBnWsqr4.svg?width=96&height=96')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "41px auto",
        }}
      />


      {/* MAIN HERO CONTENT */}
      <main className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-6 pt-12 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-12 items-center flex-grow">
        
        {/* LEFT COLUMN: Copy & Actions */}
        <section className="flex flex-col gap-6 lg:pr-8">
          <h1 className="hero-anim font-heading text-[3.25rem] font-bold leading-[1.05] tracking-[-0.04em] text-neutral-900 sm:text-[4.5rem]">
            <span className="block">Social media management.</span>
            <span className="block">Using AI.</span>
          </h1>

          <p className="hero-anim font-body max-w-[480px] text-[17px] font-normal leading-[1.6] text-[#52525B]">
            Don't hire a social media agency.<br />
            Ocoya allows bulk content creation and engagement with AI and workflows.
          </p>

          <div className="hero-anim flex flex-wrap items-center gap-3 pt-4">
            <button
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
              className="font-body inline-flex h-[46px] items-center justify-center rounded-[10px] bg-[#212121] px-7 text-[15px] font-semibold text-white shadow-sm outline-none"
            >
              Try free
            </button>
            <button
              onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}
              className="font-body inline-flex h-[46px] items-center justify-center gap-2 rounded-[10px] border border-neutral-200 bg-white px-5 text-[15px] font-medium text-neutral-900 shadow-sm outline-none"
            >
              Watch intro
              <span className="text-[18px] font-light leading-none mb-[2px]">▷</span>
            </button>
          </div>

          {/* Social Proof Stack (Updated to 5 items to match image) */}
          <div className="hero-anim mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex -space-x-2.5">
              {/* 1. Uber */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#FCFCFC] bg-black text-[10px] font-bold text-white shadow-sm z-[5]">
                Uber
              </div>
              {/* 2. Coursera */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#FCFCFC] bg-[#0056D2] text-[14px] font-serif italic text-white shadow-sm z-[4]">
                c
              </div>
              {/* 3. Meta */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#FCFCFC] bg-black text-[18px] font-bold text-white shadow-sm z-[3]">
                ∞
              </div>
              {/* 4. White/Blue Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#FCFCFC] bg-white text-[14px] font-bold text-[#003087] shadow-sm z-[2]">
                <span className="transform -rotate-12">p</span>
              </div>
              {/* 5. Pepsi (Simulated with gradient) */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#FCFCFC] bg-gradient-to-b from-[#E32934] via-white to-[#00256C] shadow-sm z-[1]">
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 text-[14px] font-body text-[#52525B]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold tracking-wide text-neutral-800 uppercase border border-neutral-200">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> LIVE
              </span>
              <span>Trusted by <strong className="text-neutral-900 font-semibold">618,104</strong> customers worldwide.</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive Cards */}
        <section className="flex flex-col gap-5 relative z-10">
          
          {/* Card 1: Agency Banner */}
          <div
            onMouseEnter={handleCardHoverIn}
            onMouseLeave={handleCardHoverOut}
            className="hero-anim relative flex min-h-[190px] cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] bg-[#18181b] p-7 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] border border-neutral-200/10"
          >
            <div
              className="absolute inset-0 z-0 opacity-50 mix-blend-overlay"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
              <h3 className="font-heading max-w-[280px] text-[1.4rem] font-bold leading-[1.2] tracking-tight">
                Transform your agency into a true sector leader.
              </h3>
              <span className="font-body inline-flex items-center gap-1 text-[14px] font-medium text-neutral-200">
                Check all features &rsaquo;
              </span>
            </div>
          </div>

          {/* Card 2: Testimonial */}
          <div
            onMouseEnter={handleCardHoverIn}
            onMouseLeave={handleCardHoverOut}
            className="hero-anim flex cursor-pointer flex-col gap-4 rounded-[16px] border border-neutral-200/60 bg-white p-7 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Benjamin Austin"
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <h4 className="font-body text-[15px] font-medium text-neutral-900">Benjamin Austin</h4>
                  <p className="font-body text-[13px] text-[#52525B]">Account Executive, Uber Eats</p>
                </div>
              </div>
              <div className="flex gap-1 text-[#F59E0B] text-[15px]">
                ★★★★★
              </div>
            </div>
            <p className="font-body text-[15px] leading-relaxed text-[#52525B]">
              The AI-driven workflows do a solid job and saves an incredible amount of time in content creation.
            </p>
          </div>

          {/* Card 3: Image Feature (Matching rounded corners) */}
          <div
            onMouseEnter={handleCardHoverIn}
            onMouseLeave={handleCardHoverOut}
            className="hero-anim h-[210px] cursor-pointer overflow-hidden rounded-[16px] border border-neutral-200/60 bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.05)]"
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
              alt="Social Workflow"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

        </section>
      </main>
    </div>
  );
}