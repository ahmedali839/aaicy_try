// "use client";

// import { useEffect, useRef } from "react";
// import { CheckCircle } from "lucide-react";
// import gsap from "gsap";

// export default function AboutUs() {
//   const containerRef = useRef(null);
//   const checklistRef = useRef([]);

//   useEffect(() => {
//     gsap.fromTo(
//       containerRef.current.children,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" },
//     );
//     gsap.fromTo(
//       checklistRef.current,
//       { x: -50, opacity: 0 },
//       {
//         x: 0,
//         opacity: 1,
//         duration: 0.8,
//         stagger: 0.15,
//         ease: "power3.out",
//         delay: 0.5,
//       },
//     );
//   }, []);

//   const standards = [
//     "Scaleable & Production-Ready",
//     "Professional & Fully Responsive",
//     "Beautiful UI/UX with GSAP Animations",
//     "Premium Typography & Colors",
//     "FAANG-level Engineering Standards",
//   ];

//   return (
//     <div className="relative overflow-hidden pt-32 pb-24">
//       {/* Background Decor */}
//       <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none -z-10" />

//       <div
//         ref={containerRef}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//       >
//         <div className="text-center mb-16">
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
//             Pioneering the intersection of <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
//               Web & AI
//             </span>
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             We are dedicated to building robust, beautiful, and intelligent
//             solutions for the modern web.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Mission Card */}
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
//             <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
//             <p className="text-gray-300 leading-relaxed text-lg">
//               Definetely to empower visionaries with cutting-edge digital
//               experiences. We believe that the combination of flawless web
//               development and state-of-the-art artificial intelligence can solve
//               some of the world's most complex problems. Every line of code we
//               write and every animation we design is crafted with purpose and
//               precision.
//             </p>
//           </div>

//           {/* Standards Card */}
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
//             <h2 className="text-3xl font-semibold mb-8">Our Standards</h2>
//             <ul className="space-y-6">
//               {standards.map((item, index) => (
//                 <li
//                   key={index}
//                   ref={(el) => (checklistRef.current[index] = el)}
//                   className="flex items-start gap-4"
//                 >
//                   <CheckCircle className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
//                   <span className="text-gray-300 text-lg">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import {
//   PhoneCall,
//   Workflow,
//   Globe,
//   Bot,
//   Star,
//   Quote
// } from "lucide-react";
// import gsap from "gsap";

// const services = [
//   {
//     title: "24/7 AI Calling Agents",
//     description: "Never miss a booking. Our AI voice agents handle customer calls, take orders, and manage appointments around the clock.",
//     icon: PhoneCall,
//   },
//   {
//     title: "CRM Automation",
//     description: "Streamline your operations. We build automated workflows that nurture leads and manage customer relationships effortlessly.",
//     icon: Workflow,
//   },
//   {
//     title: "Web Development",
//     description: "From scratch builds and renewals to adding complex features and fixing broken sites. We engineer robust web experiences.",
//     icon: Globe,
//   },
//   {
//     title: "AI Chatbots",
//     description: "Intelligent, context-aware chatbots tailored for small businesses to provide instant, accurate customer support.",
//     icon: Bot,
//   },
// ];

// const team = [
//   {
//     name: "Alex Sterling",
//     position: "Founder & Lead Engineer",
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
//     intro: "Driving AI innovation and business logic.",
//   },
//   {
//     name: "Sarah Chen",
//     position: "Head of AI Solutions",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
//     intro: "Architecting intelligent conversational agents.",
//   },
//   {
//     name: "Marcus Johnson",
//     position: "Full-Stack Developer",
//     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
//     intro: "Crafting flawless, responsive web experiences.",
//   },
//   {
//     name: "Elena Rodriguez",
//     position: "Automation Specialist",
//     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
//     intro: "Streamlining complex business CRM workflows.",
//   },
// ];

// const techStack = [
//   "Google Gemini", "Claude AI", "Lovable", "OpenAI",
//   "React", "Next.js", "Node.js", "MongoDB",
//   "Vercel", "Tailwind CSS"
// ];

// export default function AboutUs() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Using gsap.context for proper cleanup in React Strict Mode
//     let ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".animate-up",
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
//       );

//       gsap.fromTo(
//         ".animate-fade",
//         { opacity: 0 },
//         { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
//       );
//     }, containerRef);

//     return () => ctx.revert(); // Cleanup on unmount
//   }, []);

//   return (
//     <div className="relative overflow-hidden pt-32 pb-24 bg-gray-950 text-white min-h-screen" ref={containerRef}>
//       {/* Background Decor */}
//       <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
//       <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header Section */}
//         <div className="text-center mb-24 animate-up">
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
//             Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AAICY</span>
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
//             We empower businesses by merging cutting-edge web development with intelligent AI automation. From 24/7 autonomous agents to scalable web platforms, we build solutions that drive real revenue.
//           </p>
//         </div>

//         {/* Services Grid */}
//         <div className="mb-32">
//           <h2 className="text-3xl font-semibold mb-10 text-center animate-up">How We Solve Problems</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => {
//               const Icon = service.icon;
//               return (
//                 <div key={index} className="animate-up bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
//                   <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
//                     <Icon className="w-6 h-6 text-blue-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
//                   <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Testimonial Section */}
//         <div className="mb-32 animate-up">
//           <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
//             <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-12" />
//             <div className="flex items-center gap-2 mb-6">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//               ))}
//             </div>
//             <h3 className="text-2xl md:text-3xl font-medium mb-6 leading-snug max-w-4xl relative z-10">
//               "AAICY entirely transformed how we operate. By integrating their AI Calling Agent for our 24/7 order booking, we completely eliminated missed calls during rush hours. The result? Our monthly revenue increased by exactly 30%."
//             </h3>
//             <div className="flex items-center gap-4 relative z-10">
//               <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xl">X</div>
//               <div>
//                 <p className="font-semibold">Owner & Management</p>
//                 <p className="text-gray-400 text-sm">X Restaurant</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Team Section */}
//         <div className="mb-32">
//           <h2 className="text-3xl font-semibold mb-10 text-center animate-up">Meet the Experts</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {team.map((member, index) => (
//               <div key={index} className="animate-up group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   loading="lazy"
//                   className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent opacity-90" />
//                 <div className="absolute bottom-0 left-0 p-5 w-full">
//                   <h4 className="text-lg font-bold">{member.name}</h4>
//                   <p className="text-blue-400 text-sm mb-2">{member.position}</p>
//                   <p className="text-gray-300 text-xs">{member.intro}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tech Stack Marquee / List */}
//         <div className="text-center animate-fade border-t border-white/10 pt-16">
//           <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
//             Powered by industry-leading technology
//           </p>
//           <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
//             {techStack.map((tech, index) => (
//               <div key={index} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-colors">
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }






















// "use client";

// import { useEffect, useRef } from "react";
// import { PhoneCall, Workflow, Globe, Bot } from "lucide-react";
// import gsap from "gsap";

// // --- Data Configuration ---

// const services = [
//   {
//     title: "24/7 AI Calling Agents",
//     description: "Never miss a booking. Our AI voice agents handle customer calls, take orders, and manage appointments around the clock.",
//     icon: PhoneCall,
//   },
//   {
//     title: "CRM Automation",
//     description: "Streamline your operations. We build automated workflows that nurture leads and manage customer relationships effortlessly.",
//     icon: Workflow,
//   },
//   {
//     title: "Website Development",
//     description: "From scratch builds and renewals to adding complex features and fixing broken sites. We engineer robust web experiences.",
//     icon: Globe,
//   },
//   {
//     title: "AI Chatbots",
//     description: "Intelligent, context-aware chatbots tailored for small businesses to provide instant, accurate customer support.",
//     icon: Bot,
//   },
// ];

// const team = [
//   {
//     name: "Alex Sterling",
//     position: "Founder & Lead Engineer",
//     image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
//     intro: "Driving AI innovation and core business logic.",
//   },
//   {
//     name: "Sarah Chen",
//     position: "Head of AI Solutions",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
//     intro: "Architecting intelligent conversational agents.",
//   },
//   {
//     name: "Marcus Johnson",
//     position: "Full-Stack Developer",
//     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
//     intro: "Crafting flawless, responsive web experiences.",
//   },
//   {
//     name: "Elena Rodriguez",
//     position: "Automation Specialist",
//     image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
//     intro: "Streamlining complex business CRM workflows.",
//   },
// ];

// const techStack = [
//   "Google Gemini", "Claude AI", "Lovable", "OpenAI",
//   "React", "Next.js", "Node.js", "MongoDB",
//   "Vercel", "Tailwind CSS"
// ];

// // --- Component ---

// export default function AboutUs() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // GSAP Context ensures proper cleanup and prevents memory leaks in React Strict Mode
//     let ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".animate-up",
//         { y: 40, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="relative overflow-hidden bg-white text-slate-900 selection:bg-[#FF6B00] selection:text-white" ref={containerRef}>

//       {/* Background Subtle Gradient (Matches Hero Theme) */}
//       <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/80 via-purple-50/40 to-white pointer-events-none -z-10" />

//       {/* --- HERO SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
//         <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-up text-[#111827]">
//           Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A80FF] to-[#A055FF]">Future</span><br />
//           of Web & AI
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-up">
//           Digital Excellence for Visionaries. We craft cutting-edge websites and intelligent AI solutions tailored to solve real business problems.
//         </p>
//         <div className="flex justify-center gap-4 animate-up">
//           <button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-orange-500/30">
//             Get Started →
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-slate-900 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200">
//             View Services
//           </button>
//         </div>
//       </div>

//       {/* --- TESTIMONIAL SECTION (Replicating Image 3) --- */}
//       <div className="w-full bg-white py-24">
//         <div className="max-w-6xl mx-auto px-4 animate-up">

//           {/* Complex Shape Masking */}
//           <div className="flex justify-center mb-12">
//             <div className="relative w-full max-w-175 h-86 md:h-112 bg-[#1a3b2b] rounded-[200px] overflow-hidden flex justify-center items-end">
//               {/* Angled Orange Background */}
//               <div className="absolute w-62 md:w-[320px] h-[150%] bg-[#FF5C00] -rotate-12 z-0" />
//               {/* Transparent Portrait Image */}
//               <img
//                 src="https://images.pexels.com/photos/6519891/pexels-photo-6519891.jpeg?_gl=1*683k8p*_ga*MTQ2MDU2NjU1LjE3ODQxNzc2Mzk.*_ga_8JE65Q40S6*czE3ODU1NjQ4MjMkbzEwJGcxJHQxNzg1NTY0ODI5JGo1NCRsMCRoMA.."
//                 alt="Restaurant Owner"
//                 className="relative z-10 h-[90%] md:h-[95%] object-cover object-bottom drop-shadow-2xl"
//               />
//             </div>
//           </div>

//           {/* Typography exact match */}
//           <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight mb-8">
//             “AAICY entirely transformed how we operate. Their AI Calling Agent completely eliminated missed calls, increasing our monthly revenue by exactly 30%.”
//           </h3>
//           <div className="text-center">
//             <p className="font-semibold text-gray-900">Owner & Management</p>
//             <p className="text-gray-500 text-sm">X Restaurant</p>
//           </div>
//         </div>
//       </div>

//       {/* --- SERVICES SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div key={index} className="animate-up bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
//                 <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
//                   <Icon className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- TECH STACK SECTION (Replicating Image 2) --- */}
//       {/* Light gray background is crucial here to make the white pills visible */}
//       <div className="w-full bg-[#F6F7F8] py-24 border-y border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 animate-up">
//           <h2 className="text-4xl md:text-5xl font-black text-center text-[#111827] tracking-tight mb-12">
//             Technologies we utilize...
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//             {techStack.map((tech, index) => (
//               <div
//                 key={index}
//                 className="bg-white px-8 py-4 rounded-full shadow-sm border border-gray-200/60 font-bold text-gray-800 text-sm md:text-base hover:scale-105 transition-transform duration-300 cursor-default flex items-center justify-center"
//               >
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- TEAM SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">Meet the Experts</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {team.map((member, index) => (
//             <div key={index} className="animate-up group relative rounded-4xl overflow-hidden bg-gray-100">
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 loading="lazy"
//                 className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               {/* Gradient overlay adjusted for light theme visibility */}
//               <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90" />
//               <div className="absolute bottom-0 left-0 p-6 w-full">
//                 <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
//                 <p className="text-blue-300 font-medium text-sm mb-3">{member.position}</p>
//                 <p className="text-gray-300 text-sm leading-snug">{member.intro}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

















// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   PhoneCall,
//   Workflow,
//   Globe,
//   Bot,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import gsap from "gsap";

// // --- Data Configuration ---

// const services = [
//   {
//     title: "24/7 AI Calling Agents",
//     description:
//       "Never miss a booking. Our AI voice agents handle customer calls, take orders, and manage appointments around the clock.",
//     icon: PhoneCall,
//   },
//   {
//     title: "CRM Automation",
//     description:
//       "Streamline your operations. We build automated workflows that nurture leads and manage customer relationships effortlessly.",
//     icon: Workflow,
//   },
//   {
//     title: "Website Development",
//     description:
//       "From scratch builds and renewals to adding complex features and fixing broken sites. We engineer robust web experiences.",
//     icon: Globe,
//   },
//   {
//     title: "AI Chatbots",
//     description:
//       "Intelligent, context-aware chatbots tailored for small businesses to provide instant, accurate customer support.",
//     icon: Bot,
//   },
// ];

// const testimonials = [
//   {
//     quote:
//       "“AAICY entirely transformed how we operate. Their AI Calling Agent completely eliminated missed calls, increasing our monthly revenue by exactly 30%.”",
//     name: "Owner & Management",
//     role: "X Restaurant",
//     image: "https://images.pexels.com/photos/6519891/pexels-photo-6519891.jpeg",
//     bgColor: "bg-[#1a3b2b]",
//     accentColor: "bg-[#FF5C00]",
//   },
//   {
//     quote:
//       "“Our conversion rates skyrocketed after integrating their custom web architecture and automated workflows. The level of detail and execution is unmatched.”",
//     name: "Sarah Jenkins",
//     role: "Founder, Apex E-Commerce",
//     image:
//       "https://images.pexels.com/photos/5240179/pexels-photo-5240179.jpeg?_gl=1*1gdksud*_ga*MTQ2MDU2NjU1LjE3ODQxNzc2Mzk.*_ga_8JE65Q40S6*czE3ODU1NzAyNjAkbzExJGcxJHQxNzg1NTcwMjg3JGozMyRsMCRoMA..",
//     bgColor: "bg-[#1e293b]",
//     accentColor: "bg-[#4A80FF]",
//   },
//   {
//     quote:
//       "“The AI chatbots handle 80% of our tier-1 customer support effortlessly. It has saved our internal team countless hours every single week.”",
//     name: "David Miller",
//     role: "CTO, NexaTech Solutions",
//     image:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
//     bgColor: "bg-[#3b1a3b]",
//     accentColor: "bg-[#A055FF]",
//   },
//   {
//     quote:
//       "“From zero to a fully functional digital platform in record time. Their development team is world-class when it comes to speed and scalability.”",
//     name: "Elena Rostova",
//     role: "Director, Innovate Studio",
//     image:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
//     bgColor: "bg-[#1a353b]",
//     accentColor: "bg-[#10B981]",
//   },
// ];

// const team = [
//   {
//     name: "Alex Sterling",
//     position: "Founder & Lead Engineer",
//     image:
//       "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
//     intro: "Driving AI innovation and core business logic.",
//   },
//   {
//     name: "Sarah Chen",
//     position: "Head of AI Solutions",
//     image:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
//     intro: "Architecting intelligent conversational agents.",
//   },
//   {
//     name: "Marcus Johnson",
//     position: "Full-Stack Developer",
//     image:
//       "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
//     intro: "Crafting flawless, responsive web experiences.",
//   },
//   {
//     name: "Elena Rodriguez",
//     position: "Automation Specialist",
//     image:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
//     intro: "Streamlining complex business CRM workflows.",
//   },
// ];

// const techStack = [
//   "Google Gemini",
//   "Claude AI",
//   "Lovable",
//   "OpenAI",
//   "React",
//   "Next.js",
//   "Node.js",
//   "MongoDB",
//   "Vercel",
//   "Tailwind CSS",
// ];

// // --- Component ---

// export default function AboutUs() {
//   const containerRef = useRef(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Carousel Navigation Handlers
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length,
//     );
//   };

//   useEffect(() => {
//     // GSAP Context ensures proper cleanup and prevents memory leaks in React Strict Mode
//     let ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".animate-up",
//         { y: 40, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       className="relative overflow-hidden bg-white text-slate-900 selection:bg-[#FF6B00] selection:text-white"
//       ref={containerRef}
//     >
//       {/* Background Subtle Gradient */}
//       <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/80 via-purple-50/40 to-white pointer-events-none -z-10" />

//       {/* --- HERO SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
//         <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-up text-[#111827]">
//           Building the{" "}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A80FF] to-[#A055FF]">
//             Future
//           </span>
//           <br />
//           of Web & AI
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-up">
//           Digital Excellence for Visionaries. We craft cutting-edge websites and
//           intelligent AI solutions tailored to solve real business problems.
//         </p>
//         <div className="flex justify-center gap-4 animate-up">
//           <button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-orange-500/30">
//             Get Started →
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-slate-900 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200">
//             View Services
//           </button>
//         </div>
//       </div>

//       {/* --- TESTIMONIAL CAROUSEL SECTION --- */}
//       <div className="w-full bg-white py-24">
//         <div className="max-w-6xl mx-auto px-4 animate-up">
//           {/* Carousel Viewport Container */}
//           <div className="overflow-hidden relative">
//             <div
//               className="flex transition-transform duration-500 ease-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {testimonials.map((item, index) => (
//                 <div key={index} className="w-full flex-shrink-0 px-2">
//                   {/* Card Artwork & Mask */}
//                   <div className="flex justify-center mb-12">
//                     <div
//                       className={`relative w-full max-w-[700px] h-[350px] md:h-[450px] ${item.bgColor} rounded-[200px] overflow-hidden flex justify-center items-end shadow-xl`}
//                     >
//                       {/* Angled Accent Background */}
//                       <div
//                         className={`absolute w-[250px] md:w-[320px] h-[150%] ${item.accentColor} -rotate-12 z-0 opacity-90`}
//                       />
//                       {/* Portrait Image */}
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="relative z-10 h-[90%] md:h-[95%] object-cover object-bottom drop-shadow-2xl"
//                       />
//                     </div>
//                   </div>

//                   {/* Quote Typography */}
//                   <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight mb-8">
//                     {item.quote}
//                   </h3>
//                   <div className="text-center">
//                     <p className="font-semibold text-gray-900 text-lg">
//                       {item.name}
//                     </p>
//                     <p className="text-gray-500 text-sm">{item.role}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Carousel Navigation Controls (Arrows & Pagination Dots) */}
//           <div className="flex items-center justify-center gap-6 mt-12">
//             <button
//               onClick={prevSlide}
//               className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-gray-700"
//               aria-label="Previous Slide"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>

//             {/* Pagination Dots */}
//             <div className="flex items-center gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`h-3 rounded-full transition-all duration-300 ${
//                     currentSlide === index
//                       ? "w-8 bg-[#FF5C00]"
//                       : "w-3 bg-gray-300"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={nextSlide}
//               className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-gray-700"
//               aria-label="Next Slide"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- SERVICES SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">
//           Our Services
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div
//                 key={index}
//                 className="animate-up bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
//               >
//                 <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
//                   <Icon className="w-7 h-7" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-slate-900">
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {service.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* --- TECH STACK SECTION --- */}

//       {/* <div className="w-full bg-[#F6F7F8] py-24 border-y border-gray-200">
//         <div className="max-w-5xl mx-auto px-4 animate-up">
//           <h2 className="text-4xl md:text-5xl font-black text-center text-[#111827] tracking-tight mb-12">
//             Technologies we utilize...
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4 md:gap-6">
//             {techStack.map((tech, index) => (
//               <div
//                 key={index}
//                 className="bg-white px-8 py-4 rounded-full shadow-sm border border-gray-200/60 font-bold text-gray-800 text-sm md:text-base hover:scale-105 transition-transform duration-300 cursor-default flex items-center justify-center"
//               >
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div> */}

//       {/* --- TECHNOLOGIES & AI TOOLS INFINITE TICKER SECTION --- */}
//       <div className="w-full bg-[#F6F7F8] py-24 border-y border-gray-200 overflow-hidden marquee-container relative">
//         {/* Scoped Keyframe Animations for Smooth Ticker Effect */}
//         <style
//           dangerouslySetInnerHTML={{
//             __html: `
//           @keyframes scrollLeft {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
//           }
//           @keyframes scrollRight {
//             0% { transform: translateX(-50%); }
//             100% { transform: translateX(0); }
//           }
//           .animate-scroll-left {
//             display: flex;
//             width: max-content;
//             animation: scrollLeft 35s linear infinite;
//           }
//           .animate-scroll-right {
//             display: flex;
//             width: max-content;
//             animation: scrollRight 35s linear infinite;
//           }
//           .marquee-container:hover .animate-scroll-left,
//           .marquee-container:hover .animate-scroll-right {
//             animation-play-state: paused;
//           }
//         `,
//           }}
//         />

//         <div className="max-w-7xl mx-auto px-4 mb-12 text-center animate-up">
//           <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight">
//             Technologies we utilize...
//           </h2>
//         </div>

//         {/* Gradient Fade Masks on Left & Right Edges for Premium Look */}
//         <div className="relative w-full overflow-hidden">
//           <div className="absolute top-0 bottom-0 left-0 w-24 bg-linear-to-r from-[#F6F7F8] to-transparent z-10 pointer-events-none" />
//           <div className="absolute top-0 bottom-0 right-0 w-24 bg-linear-to-l from-[#F6F7F8] to-transparent z-10 pointer-events-none" />

//           {/* ROW 1: AI Tools (Scrolling Left) */}
//           <div className="flex animate-scroll-left gap-6 mb-6">
//             {[
//               "Claude AI",
//               "OpenAI GPT-4",
//               "Google Gemini",
//               "Replit Agent",
//               "Midjourney",
//               "Groq AI",
//               "Anthropic",
//               "Hugging Face",
//               // Duplicated array to ensure a seamless infinite loop loop
//               "Claude AI",
//               "OpenAI GPT-4",
//               "Google Gemini",
//               "Replit Agent",
//               "Midjourney",
//               "Groq AI",
//               "Anthropic",
//               "Hugging Face",
//             ].map((aiTool, index) => (
//               <div
//                 key={`ai-${index}`}
//                 className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200/80 font-bold text-gray-800 text-sm md:text-base flex items-center gap-3 shrink-0 hover:border-orange-500 hover:text-orange-600 transition-colors cursor-default"
//               >
//                 <span className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-orange-500 to-purple-600 animate-pulse" />
//                 {aiTool}
//               </div>
//             ))}
//           </div>

//           {/* ROW 2: Platforms & Frameworks (Scrolling Right) */}
//           <div className="flex animate-scroll-right gap-6">
//             {[
//               "React.js",
//               "Next.js 15",
//               "Google Cloud",
//               "Perplexity",
//               "Vercel",
//               "Node.js",
//               "MongoDB",
//               "Tailwind CSS",
//               // Duplicated array for seamless reverse loop
//               "React.js",
//               "Next.js 15",
//               "Google Cloud",
//               "Perplexity",
//               "Vercel",
//               "Node.js",
//               "MongoDB",
//               "Tailwind CSS",
//             ].map((tech, index) => (
//               <div
//                 key={`tech-${index}`}
//                 className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200/80 font-bold text-gray-800 text-sm md:text-base flex items-center gap-3 shrink-0 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-default"
//               >
//                 <span className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-blue-500 to-indigo-600" />
//                 {tech}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>




     



//       {/* --- TEAM SECTION --- */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">
//           Meet the Experts
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {team.map((member, index) => (
//             <div
//               key={index}
//               className="animate-up group relative rounded-3xl overflow-hidden bg-gray-100"
//             >
//               <img
//                 src={member.image}
//                 alt={member.name}
//                 loading="lazy"
//                 className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
//               <div className="absolute bottom-0 left-0 p-6 w-full">
//                 <h4 className="text-xl font-bold text-white mb-1">
//                   {member.name}
//                 </h4>
//                 <p className="text-blue-300 font-medium text-sm mb-3">
//                   {member.position}
//                 </p>
//                 <p className="text-gray-300 text-sm leading-snug">
//                   {member.intro}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }















































"use client";

import { useEffect, useRef, useState } from "react";
import { 
  PhoneCall, 
  Workflow, 
  Globe, 
  Bot, 
  ChevronLeft, 
  ChevronRight,
  Sparkles, 
  Cpu, 
  Zap, 
  Terminal, 
  Layers, 
  Database, 
  Code2 
} from "lucide-react";
import gsap from "gsap";

// --- Data Configuration ---

const services = [
  {
    title: "24/7 AI Calling Agents",
    description: "Never miss a booking. Our AI voice agents handle customer calls, take orders, and manage appointments around the clock.",
    icon: PhoneCall,
  },
  {
    title: "CRM Automation",
    description: "Streamline your operations. We build automated workflows that nurture leads and manage customer relationships effortlessly.",
    icon: Workflow,
  },
  {
    title: "Website Development",
    description: "From scratch builds and renewals to adding complex features and fixing broken sites. We engineer robust web experiences.",
    icon: Globe,
  },
  {
    title: "AI Chatbots",
    description: "Intelligent, context-aware chatbots tailored for small businesses to provide instant, accurate customer support.",
    icon: Bot,
  },
];

const testimonials = [
  {
    quote: "“AAICY entirely transformed how we operate. Their AI Calling Agent completely eliminated missed calls, increasing our monthly revenue by exactly 30%.”",
    name: "Owner & Management",
    role: "X Restaurant",
    image: "https://images.pexels.com/photos/6519891/pexels-photo-6519891.jpeg",
    bgColor: "bg-[#1a3b2b]",
    accentColor: "bg-[#FF5C00]"
  },
  {
    quote: "“Our conversion rates skyrocketed after integrating their custom web architecture and automated workflows. The level of detail and execution is unmatched.”",
    name: "Sarah Jenkins",
    role: "Founder, Apex E-Commerce",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bgColor: "bg-[#1e293b]",
    accentColor: "bg-[#4A80FF]"
  },
  {
    quote: "“The AI chatbots handle 80% of our tier-1 customer support effortlessly. It has saved our internal team countless hours every single week.”",
    name: "David Miller",
    role: "CTO, NexaTech Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bgColor: "bg-[#3b1a3b]",
    accentColor: "bg-[#A055FF]"
  },
  {
    quote: "“From zero to a fully functional digital platform in record time. Their development team is world-class when it comes to speed and scalability.”",
    name: "Elena Rostova",
    role: "Director, Innovate Studio",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    bgColor: "bg-[#1a353b]",
    accentColor: "bg-[#10B981]"
  }
];

const team = [
  {
    name: "Alex Sterling",
    position: "Founder & Lead Engineer",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80",
    intro: "Driving AI innovation and core business logic.",
  },
  {
    name: "Sarah Chen",
    position: "Head of AI Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    intro: "Architecting intelligent conversational agents.",
  },
  {
    name: "Marcus Johnson",
    position: "Full-Stack Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    intro: "Crafting flawless, responsive web experiences.",
  },
  {
    name: "Elena Rodriguez",
    position: "Automation Specialist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    intro: "Streamlining complex business CRM workflows.",
  },
];

const aiTools = [
  { name: "Claude AI", category: "Anthropic LLM", icon: Sparkles, color: "text-purple-600 bg-purple-50" },
  { name: "OpenAI GPT-4", category: "Core Intelligence", icon: Cpu, color: "text-emerald-600 bg-emerald-50" },
  { name: "Google Gemini", category: "Multimodal AI", icon: Zap, color: "text-blue-600 bg-blue-50" },
  { name: "Replit Agent", category: "Autonomous Dev", icon: Terminal, color: "text-orange-600 bg-orange-50" },
  { name: "Midjourney", category: "Generative Visuals", icon: Layers, color: "text-indigo-600 bg-indigo-50" },
  { name: "Groq AI", category: "Ultra-Fast Inference", icon: Cpu, color: "text-rose-600 bg-rose-50" },
  { name: "Anthropic", category: "Safety & Alignment", icon: Sparkles, color: "text-purple-600 bg-purple-50" },
  { name: "Hugging Face", category: "Open Source Hub", icon: Database, color: "text-amber-600 bg-amber-50" },
];

const platforms = [
  { name: "React.js", category: "UI Library", icon: Code2, color: "text-cyan-600 bg-cyan-50" },
  { name: "Next.js 15", category: "Full-Stack Framework", icon: Globe, color: "text-slate-900 bg-slate-100" },
  { name: "Google Cloud", category: "Cloud Infrastructure", icon: Database, color: "text-blue-600 bg-blue-50" },
  { name: "Perplexity", category: "Neural Search", icon: Sparkles, color: "text-teal-600 bg-teal-50" },
  { name: "Vercel", category: "Edge Deployment", icon: Zap, color: "text-slate-900 bg-slate-100" },
  { name: "Node.js", category: "Backend Runtime", icon: Terminal, color: "text-green-600 bg-green-50" },
  { name: "MongoDB", category: "NoSQL Database", icon: Database, color: "text-emerald-600 bg-emerald-50" },
  { name: "Tailwind CSS", category: "Styling System", icon: Layers, color: "text-sky-600 bg-sky-50" },
];

// --- Component ---

export default function AboutUs() {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Navigation Handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".animate-up",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white text-slate-900 selection:bg-[#FF6B00] selection:text-white" ref={containerRef}>
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/80 via-purple-50/40 to-white pointer-events-none -z-10" />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-up text-[#111827]">
          Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A80FF] to-[#A055FF]">Future</span><br />
          of Web & AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-up">
          Digital Excellence for Visionaries. We craft cutting-edge websites and intelligent AI solutions tailored to solve real business problems.
        </p>
        <div className="flex justify-center gap-4 animate-up">
          <button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg shadow-orange-500/30">
            Get Started →
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-slate-900 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200">
            View Services
          </button>
        </div>
      </div>

      {/* --- TESTIMONIAL CAROUSEL SECTION --- */}
      <div className="w-full bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 animate-up">
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="flex justify-center mb-12">
                    <div className={`relative w-full max-w-[700px] h-[350px] md:h-[450px] ${item.bgColor} rounded-[200px] overflow-hidden flex justify-center items-end shadow-xl`}>
                      <div className={`absolute w-[250px] md:w-[320px] h-[150%] ${item.accentColor} -rotate-12 z-0 opacity-90`} />
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="relative z-10 h-[90%] md:h-[95%] object-cover object-bottom drop-shadow-2xl" 
                      />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-center text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight mb-8">
                    {item.quote}
                  </h3>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-lg">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-gray-700"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-[#FF5C00]" : "w-3 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-gray-700"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* --- SERVICES SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="animate-up bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- ENTERPRISE TECH & AI ECOSYSTEM TICKER --- */}
      <div className="w-full bg-gradient-to-b from-slate-50/60 via-white to-slate-50/60 py-28 border-y border-slate-200/80 overflow-hidden marquee-container relative">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scrollRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            display: flex;
            width: max-content;
            animation: scrollLeft 40s linear infinite;
          }
          .animate-scroll-right {
            display: flex;
            width: max-content;
            animation: scrollRight 40s linear infinite;
          }
          .marquee-container:hover .animate-scroll-left,
          .marquee-container:hover .animate-scroll-right {
            animation-play-state: paused;
          }
        `}} />

        <div className="max-w-7xl mx-auto px-4 mb-16 text-center animate-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/60 text-orange-600 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Ecosystem & Infrastructure
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Technologies We Utilize
          </h2>
          <p className="text-slate-600 mt-3 text-lg max-w-2xl mx-auto font-normal">
            Engineered with industry-leading frameworks, advanced LLM models, and ultra-scalable cloud architectures.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* ROW 1: AI Tools & LLMs */}
          <div className="flex animate-scroll-left gap-5 mb-6">
            {[...aiTools, ...aiTools].map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <div 
                  key={`ai-${index}`} 
                  className="group bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-4 shrink-0"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color} transition-transform group-hover:scale-110 duration-300`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{tool.name}</h4>
                    <p className="text-slate-400 text-xs font-medium">{tool.category}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROW 2: Platforms & Frameworks */}
          <div className="flex animate-scroll-right gap-5">
            {[...platforms, ...platforms].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div 
                  key={`tech-${index}`} 
                  className="group bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-4 shrink-0"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tech.color} transition-transform group-hover:scale-110 duration-300`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{tech.name}</h4>
                    <p className="text-slate-400 text-xs font-medium">{tech.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- TEAM SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-extrabold mb-16 text-center text-[#111827] animate-up tracking-tight">Meet the Experts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="animate-up group relative rounded-3xl overflow-hidden bg-gray-100">
              <img 
                src={member.image} 
                alt={member.name} 
                loading="lazy"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-blue-300 font-medium text-sm mb-3">{member.position}</p>
                <p className="text-gray-300 text-sm leading-snug">{member.intro}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}







