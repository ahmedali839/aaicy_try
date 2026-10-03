// "use client";

// import { useRef } from "react";
// import { 
//   motion, 
//   useScroll, 
//   useTransform, 
//   useSpring, 
//   useReducedMotion 
// } from "framer-motion";
// import { Settings2, Cpu, ShieldCheck, Server, Sparkles, ArrowUpRight } from "lucide-react";

// // --- AAICY Feature Data ---
// const features = [
//   {
//     id: "01",
//     title: "Easy & Fast Deployment",
//     tagline: "Plug-and-Play AI Architecture",
//     description: "We handle everything from onboarding to deep CRM integrations. Deploy autonomous AI Calling Agents and Chatbots for your locations in minutes.",
//     icon: Settings2,
//     lightBg: "bg-orange-50/80",
//     borderColor: "border-orange-200",
//   },
//   {
//     id: "02",
//     title: "Proprietary Intelligence",
//     tagline: "Tailored to Your Business Logic",
//     description: "Our proprietary AI builder drastically reduces workflow setup from weeks to hours. AAICY seamlessly executes complex multi-step tasks across your entire software stack.",
//     icon: Cpu,
//     lightBg: "bg-blue-50/80",
//     borderColor: "border-blue-200",
//   },
//   {
//     id: "03",
//     title: "Private & Compliant",
//     tagline: "Zero Third-Party Training",
//     description: "We never expose or train public models on your customer data. Built with enterprise-grade SOC2 & HIPAA protocols to keep your business records completely isolated.",
//     icon: ShieldCheck,
//     lightBg: "bg-emerald-50/80",
//     borderColor: "border-emerald-200",
//   },
//   {
//     id: "04",
//     title: "Enterprise Reliability",
//     tagline: "99.9% Operational Uptime",
//     description: "Powered by a mesh network of specialized LLMs to eliminate hallucinations. Backed by redundant server clusters ensuring your incoming calls and web leads are never missed.",
//     icon: Server,
//     lightBg: "bg-slate-100",
//     borderColor: "border-slate-300",
//   },
// ];

// export default function AAICYScrollSection() {
//   const containerRef = useRef(null);
//   const shouldReduceMotion = useReducedMotion();

//   // 1. Eager Viewport Tracking: Starts triggering when top of section is at 75% screen height
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start 75%", "end end"],
//   });

//   // 2. High-performance spring physics for ultra-smooth responsiveness
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 120,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   const activeProgress = shouldReduceMotion ? scrollYProgress : smoothProgress;

//   return (
//     <section 
//       ref={containerRef}
//       /* Height compressed to 135vh to remove bottom white space gap */
//       className="relative min-h-[135vh] bg-[#FAF8F5] text-slate-900 selection:bg-[#FF5C00] selection:text-white"
//     >
//       {/* Subtle Background Pattern */}
//       <div className="absolute inset-0 bg-[radial-gradient(#e2decd_1.2px,transparent_1.2px)] background-size-[28px_28px] opacity-70 pointer-events-none" />

//       {/* Sticky Viewport Frame */}
//       <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 md:py-10 overflow-hidden">
        
//         {/* --- HEADER --- */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full z-10 shrink-0">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200/80 pb-5">
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-[#FF5C00] text-xs font-semibold uppercase tracking-wider mb-2">
//                 <Sparkles className="w-3.5 h-3.5" />
//                 Next-Gen Automation
//               </div>
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
//                 Built for <span className="text-[#FF5C00]">Scale</span> & Precision
//               </h2>
//             </div>
//             <p className="text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed">
//               Every system is engineered to handle real-world operations with zero downtime and total security.
//             </p>
//           </div>
//         </div>

//         {/* --- CARDS GRID (EARLY REVEAL & STICKY LOCK) --- */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full my-auto z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
//             {features.map((item, index) => (
//               <OptimizedCard 
//                 key={item.id}
//                 item={item}
//                 index={index}
//                 progress={activeProgress}
//                 total={features.length}
//               />
//             ))}
//           </div>
//         </div>

//         {/* --- FOOTER PROGRESS TRACKER --- */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full z-10 shrink-0 flex items-center justify-between text-xs font-medium text-slate-500">
//           <span className="hidden sm:inline-block uppercase tracking-wider font-semibold text-slate-400">
//             Scroll to reveal architecture
//           </span>
//           <div className="flex-1 max-w-xs sm:max-w-md mx-auto sm:mx-0 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
//             <motion.div 
//               className="h-full bg-[#FF5C00] rounded-full origin-left"
//               style={{ scaleX: activeProgress }}
//             />
//           </div>
//           <span className="font-mono font-bold text-slate-800">AAICY // 2026</span>
//         </div>

//       </div>
//     </section>
//   );
// }

// // --- CARD SUB-COMPONENT WITH EARLY ENTRY & ZERO-DRIFT LOCK ---
// function OptimizedCard({ item, index, progress, total }) {
//   const Icon = item.icon;

//   // Stagger start early in the scroll cycle
//   // Card 1 starts at 0.0, Card 2 at 0.06, Card 3 at 0.12, Card 4 at 0.18
//   const start = index * 0.06;
//   const end = start + 0.28; // Rapid 28% scroll window transition

//   // Transforms:
//   // - Starts at 40px translation (down) and moves quickly to 0px
//   // - Opacity shifts quickly from 0 to 1
//   // - Scale shifts smoothly from 0.96 to 1
//   const y = useTransform(progress, [start, end, 1], [40, 0, 0]);
//   const opacity = useTransform(progress, [start, end, 1], [0, 1, 1]);
//   const scale = useTransform(progress, [start, end, 1], [0.96, 1, 1]);

//   return (
//     <motion.div
//       style={{ y, opacity, scale }}
//       className="transform-gpu will-change-transform h-full"
//     >
//       <div className="group relative h-full bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
        
//         <div>
//           {/* Top Bar */}
//           <div className="flex items-center justify-between mb-5">
//             <div className={`w-11 h-11 rounded-2xl ${item.lightBg} ${item.borderColor} border flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
//               <Icon className="w-5.5 h-5.5 text-slate-800" strokeWidth={1.8} />
//             </div>
//             <span className="text-xl font-black font-mono text-slate-300 group-hover:text-[#FF5C00] transition-colors">
//               {item.id}
//             </span>
//           </div>

//           {/* Badge */}
//           <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold tracking-wide uppercase mb-3">
//             {item.tagline}
//           </div>

//           {/* Content */}
//           <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#FF5C00] transition-colors">
//             {item.title}
//           </h3>
//           <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
//             {item.description}
//           </p>
//         </div>

//         {/* Footer Link */}
//         <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-[#FF5C00] transition-colors">
//           <span>LEARN MORE</span>
//           <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#FF5C00] group-hover:text-white flex items-center justify-center transition-all">
//             <ArrowUpRight className="w-3.5 h-3.5" />
//           </div>
//         </div>

//       </div>
//     </motion.div>
//   );
// }















// 'use client';

// import { motion } from 'framer-motion';

// const cardsData = [
//   {
//     title: 'Easy',
//     description:
//       'We do everything for you, from onboarding to integrations. Deploy OpenCall.ai for one of your locations in 5 minutes, and expand to others in seconds.',
//   },
//   {
//     title: 'Powerful',
//     description:
//       'Our propriety AI builder takes customization from weeks to minutes. OpenCall.ai handles any workflow and integrates with almost any software.',
//   },
//   {
//     title: 'Private',
//     description:
//       'We never train our models on your data. And our HIPAA-compliant system never sends your data to 3rd parties like OpenAI.',
//   },
//   {
//     title: 'Reliable',
//     description:
//       "OpenCall.ai uses a mesh of specialized AIs to make common problems impossible. From redundant cloud providers to branding enforcement, we do everything to make sure phone calls aren't a bother.",
//   },
// ];

// const cardVariants = {
//   hidden: { 
//     opacity: 0, 
//     y: 50 
//   },
//   visible: (index) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: index * 0.15, // Stagger effect between cards
//       duration: 0.6,
//       ease: [0.215, 0.61, 0.355, 1.0],
//     },
//   }),
// };

// export default function ValueCards() {
//   return (
//     <section className="w-full py-16 px-4 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cardsData.map((card, index) => (
//           <motion.div
//             key={card.title}
//             custom={index}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             variants={cardVariants}
//             className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
//           >
//             <div>
//               <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
//                 {card.title}
//               </h3>
//               <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
//                 {card.description}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }









// import Image from "next/image";

// // Card Data with exact text copy from image
// const cardData = [
//   {
//     id: "easy",
//     title: "Easy",
//     description:
//       "We do everything for you, from onboarding to integrations. Deploy OpenCall.ai for one of your locations in 5 minutes, and expand to others in seconds.",
//     iconSrc: "/scroll-1-icon.png",
//     iconAlt: "Easy feature icon",
//   },
//   {
//     id: "powerful",
//     title: "Powerful",
//     description:
//       "Our propriety AI builder takes customization from weeks to minutes. OpenCall.ai handles any workflow and integrates with almost any software.",
//     iconSrc: "/scroll-2-icon.png",
//     iconAlt: "Powerful feature icon",
//   },
//   {
//     id: "private",
//     title: "Private",
//     description:
//       "We never train our models on your data. And our HIPAA-compliant system never sends your data to 3rd parties like OpenAI.",
//     iconSrc: "/scroll-3-icon.png",
//     iconAlt: "Private feature icon",
//   },
//   {
//     id: "reliable",
//     title: "Reliable",
//     description:
//       "OpenCall.ai uses a mesh of specialized AIs to make common problems impossible. From redundant cloud providers to branding enforcement, we do everything to make sure phone calls aren't a bother.",
//     iconSrc: "/scroll-4-icon.png",
//     iconAlt: "Reliable feature icon",
//   },
// ];

// export default function FeatureCardsSection() {
//   return (
//     <section className="relative w-full min-h-screen bg-[#FAF6F0] flex items-center justify-center px-6 py-20 overflow-hidden font-sans">
//       {/* Background Subtle Dotted/Dashed Grid Pattern */}
//       <div 
//         className="absolute inset-0 pointer-events-none opacity-40"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #e5dfd5 1px, transparent 1px),
//             linear-gradient(to bottom, #e5dfd5 1px, transparent 1px)
//           `,
//           backgroundSize: "64px 64px",
//           strokeDasharray: "4 4",
//         }}
//       />

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto w-full z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
//           {cardData.map(({ id, title, description, iconSrc, iconAlt }) => (
//             <div
//               key={id}
//               className="
//                 group relative bg-white rounded-[28px] p-8 sm:p-9
//                 shadow-[0_4px_20px_rgba(0,0,0,0.02)]
//                 hover:shadow-[0_20px_35px_rgba(0,0,0,0.06)]
//                 transform-gpu transition-all duration-300 ease-out
//                 hover:-translate-y-8 cursor-pointer
//                 flex flex-col justify-start min-h-110
//                 will-change-transform
//               "
//             >
//               {/* Icon Container */}
//               <div className="mb-6 flex items-center justify-start">
//                 <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
//                   <Image
//                     src={iconSrc}
//                     alt={iconAlt}
//                     fill
//                     sizes="64px"
//                     className="object-contain"
//                     priority={id === "easy"}
//                   />
//                 </div>
//               </div>

//               {/* Title */}
//               <h3 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight">
//                 {title}
//               </h3>

//               {/* Body Copy */}
//               <p className="text-[#475569] text-[15px] leading-relaxed font-normal">
//                 {description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
















import React from "react";

// --- Vector Line-Art Icons matching the target design ---
const EasyIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#FF6C4A]"
  >
    <rect
      x="5"
      y="5"
      width="24"
      height="30"
      rx="6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M23 27H33M28 22V32"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const PowerfulIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#FF6C4A]"
  >
    <rect
      x="6"
      y="10"
      width="22"
      height="22"
      rx="6"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <rect
      x="14"
      y="6"
      width="22"
      height="22"
      rx="6"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

const PrivateIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#FF6C4A]"
  >
    <path
      d="M8 14V10C8 7.79086 9.79086 6 12 6H16"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M28 6H32C34.2091 6 36 7.79086 36 10V14"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M36 28V32C36 34.2091 34.2091 36 32 36H28"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M16 36H12C9.79086 36 8 34.2091 8 32V28"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <rect
      x="17"
      y="17"
      width="10"
      height="10"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ReliableIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#FF6C4A]"
  >
    <circle cx="22" cy="22" r="8.5" stroke="currentColor" strokeWidth="2.2" />
    <ellipse
      cx="22"
      cy="22"
      rx="17"
      ry="5.5"
      transform="rotate(-25 22 22)"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

// Card Dataset
const cardData = [
  {
    id: "easy",
    title: "Easy",
    description:
      "We do everything for you, from onboarding to integrations. Deploy OpenCall.ai for one of your locations in 5 minutes, and expand to others in seconds.",
    Icon: EasyIcon,
  },
  {
    id: "powerful",
    title: "Powerful",
    description:
      "Our propriety AI builder takes customization from weeks to minutes. OpenCall.ai handles any workflow and integrates with almost any software.",
    Icon: PowerfulIcon,
  },
  {
    id: "private",
    title: "Private",
    description:
      "We never train our models on your data. And our HIPAA-compliant system never sends your data to 3rd parties like OpenAI.",
    Icon: PrivateIcon,
  },
  {
    id: "reliable",
    title: "Reliable",
    description:
      "OpenCall.ai uses a mesh of specialized AIs to make common problems impossible. From redundant cloud providers to branding enforcement, we do everything to make sure phone calls aren't a bother.",
    Icon: ReliableIcon,
  },
];

export default function FeatureCardsSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#FAF6EF] flex items-center justify-center px-6 py-24 overflow-hidden font-sans">
      
      {/* --- Ambient Bottom-Left Mesh Glow --- */}
      <div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-400/30 via-pink-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* --- Background Dashed Grid Pattern --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2dacd 1px, transparent 1px),
            linear-gradient(to bottom, #e2dacd 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* --- Main Cards Container --- */}
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {cardData.map(({ id, title, description, Icon }) => (
            <div
              key={id}
              className="
                group relative bg-white rounded-[32px] p-8 sm:p-9
                shadow-[0_4px_25px_rgba(0,0,0,0.03)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                transform-gpu transition-all duration-300 ease-out
                hover:-translate-y-8 cursor-pointer
                flex flex-col justify-start min-h-[410px]
                will-change-transform border border-amber-50/50
              "
            >
              {/* Icon */}
              <div className="mb-7 flex items-center justify-start">
                <Icon />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="text-[#475569] text-[15px] leading-relaxed font-normal">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}