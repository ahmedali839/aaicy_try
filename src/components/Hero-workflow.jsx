// "use client";

// import React from "react";

// // Integration nodes representing CRM, communication, and automation tools
// const INTEGRATION_NODES = [
//   {
//     name: "WhatsApp",
//     category: "Messaging",
//     description: "Real-time client communication & instant support routing",
//     color:
//       "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Gmail",
//     category: "Communications",
//     description: "Automated email outreach, parsing, and lead responses",
//     color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.691 2.279 24 3.434 24 5.457z" />
//       </svg>
//     ),
//   },
//   {
//     name: "n8n Workflows",
//     category: "Automation Engine",
//     description: "Custom node orchestration and webhook synchronization",
//     color:
//       "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 0L2.125 5.75v12.5L12 24l9.875-5.75V5.75L12 0zm7.125 17.25L12 21.375l-7.125-4.125V8.125L12 4l7.125 4.125v9.125z" />
//       </svg>
//     ),
//   },
//   {
//     name: "HubSpot CRM",
//     category: "Pipeline Management",
//     description: "Automatic lead scoring, contact sync, and deal tracking",
//     color:
//       "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.25 11.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zm-16.5 7a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zm16.5-12a5.75 5.75 0 1 1-5.734 5.503L9.57 14.123a5.751 5.751 0 1 1-.002-4.248l5.215-2.122A5.736 5.736 0 0 1 20.25 6.5z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Slack Ops",
//     category: "Team Alerts",
//     description: "Instant internal notifications for high-value conversions",
//     color:
//       "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.527 2.527 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521v2.521A2.527 2.527 0 0 1 8.834 13.62H2.522A2.528 2.528 0 0 1 0 11.099a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.958 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.527 2.527 0 0 1-2.521 2.521H8.834A2.527 2.527 0 0 1 6.313 8.834V2.522A2.527 2.527 0 0 1 8.834 0a2.528 2.528 0 0 1 2.522 2.522v6.312h6.331zM15.166 18.958a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.521v-2.521a2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.521 2.522h-6.313z" />
//       </svg>
//     ),
//   },
//   {
//     name: "PostgreSQL",
//     category: "Secure Database",
//     description:
//       "Reliable persistent storage for client records and state logs",
//     color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-500",
//     icon: (
//       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.639 0 8.4 3.761 8.4 8.4 0 4.639-3.761 8.4-8.4 8.4-4.639 0-8.4-3.761-8.4-8.4 0-4.639 3.761-8.4 8.4-8.4z" />
//       </svg>
//     ),
//   },
// ];

// export default function CrmAutomationHub() {
//   return (
//     <section className="py-24 overflow-hidden bg-transparent relative">
//       {/* Background Ambient Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

//       {/* Constrained Centered Container */}
//       <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center max-w-2xl mx-auto mb-16">
//           <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4 tracking-wide uppercase border border-purple-500/20">
//             Intelligent Infrastructure
//           </span>
//           <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
//             How{" "}
//             <span className="bg-gradient-to-r from-foreground to-[#6c2bd9] bg-clip-text text-transparent">
//               AAICY Solutions
//             </span>{" "}
//             Handles Your CRM & Workflows
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
//             We bridge your communication channels and automation pipelines into
//             a singular, unified ecosystem.
//           </p>
//         </div>

//         {/* Central Hub & Surrounding Ecosystem Container */}
//         <div className="relative flex flex-col items-center justify-center min-h-[500px] sm:min-h-[580px]">
//           {/* Central Core Element */}
//           <div className="relative z-20 flex flex-col items-center justify-center p-8 bg-background/80 dark:bg-zinc-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-900/20 max-w-xs text-center group transition-all duration-500 hover:border-purple-500/60">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6c2bd9] to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />
//             <div className="relative flex flex-col items-center">
//               <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6c2bd9] to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-600/40 mb-3">
//                 AI
//               </div>
//               <h3 className="text-lg font-bold text-foreground tracking-tight">
//                 AAICY Engine
//               </h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Central CRM & Automation Orchestrator
//               </p>
//             </div>
//           </div>

//           {/* Grid/Orbit Layout for Connected Apps */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mt-10 relative z-10">
//             {INTEGRATION_NODES.map((node, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-start gap-4 p-4 rounded-2xl bg-background/60 dark:bg-zinc-900/40 backdrop-blur-md border border-border/60 hover:border-purple-500/40 transition-all duration-300 group shadow-sm hover:shadow-md"
//               >
//                 <div
//                   className={`p-3 rounded-xl bg-gradient-to-br ${node.color} border shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
//                 >
//                   {node.icon}
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold text-sm text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
//                       {node.name}
//                     </h4>
//                     <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-muted text-gray-500 dark:text-gray-400">
//                       {node.category}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
//                     {node.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }













"use client";

import React, { useState } from "react";

// Integration nodes with precise metadata for radial positioning
const INTEGRATION_NODES = [
  {
    name: "WhatsApp",
    category: "Messaging",
    description: "Real-time client support & instant routing",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-500",
    badgeBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    ),
  },
  {
    name: "Gmail",
    category: "Outreach",
    description: "Automated email parsing & lead replies",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-500",
    badgeBg: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.691 2.279 24 3.434 24 5.457z"/>
      </svg>
    ),
  },
  {
    name: "n8n Workflows",
    category: "Automation",
    description: "Custom webhook orchestration engine",
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-500",
    badgeBg: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L2.125 5.75v12.5L12 24l9.875-5.75V5.75L12 0zm7.125 17.25L12 21.375l-7.125-4.125V8.125L12 4l7.125 4.125v9.125z"/>
      </svg>
    ),
  },
  {
    name: "HubSpot CRM",
    category: "Pipeline",
    description: "Automatic lead scoring & deal tracking",
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-500",
    badgeBg: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.25 11.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zm-16.5 7a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5zm16.5-12a5.75 5.75 0 1 1-5.734 5.503L9.57 14.123a5.751 5.751 0 1 1-.002-4.248l5.215-2.122A5.736 5.736 0 0 1 20.25 6.5z"/>
      </svg>
    ),
  },
  {
    name: "Slack Ops",
    category: "Alerts",
    description: "Instant internal conversion notifications",
    color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-500",
    badgeBg: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.527 2.527 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521v2.521A2.527 2.527 0 0 1 8.834 13.62H2.522A2.528 2.528 0 0 1 0 11.099a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.958 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.52V8.834zm-1.271 0a2.527 2.527 0 0 1-2.521 2.521H8.834A2.527 2.527 0 0 1 6.313 8.834V2.522A2.527 2.527 0 0 1 8.834 0a2.528 2.528 0 0 1 2.522 2.522v6.312h6.331zM15.166 18.958a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.522v-2.52h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.521v-2.521a2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.521 2.522h-6.313z"/>
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Reliable persistent state & record storage",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-500",
    badgeBg: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c4.639 0 8.4 3.761 8.4 8.4 0 4.639-3.761 8.4-8.4 8.4-4.639 0-8.4-3.761-8.4-8.4 0-4.639 3.761-8.4 8.4-8.4z"/>
      </svg>
    ),
  },
];

export default function CrmAutomationHub() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section className="py-24 overflow-hidden bg-transparent relative">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4 tracking-wider uppercase border border-purple-500/20 shadow-sm">
            Ecosystem Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            How <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">AAICY Solutions</span> Unifies Your CRM
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            We bridge all your communication channels and automation pipelines into a synchronized intelligence layer.
          </p>
        </div>

        {/* Desktop Orbital View (Hidden on Small Screens) */}
        <div className="hidden md:flex relative items-center justify-center h-[560px] w-full max-w-4xl mx-auto">
          
          {/* Orbital Track Rings */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-purple-500/15 animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-purple-500/20 pointer-events-none" />

          {/* Central AI Hub Core */}
          <div className="relative z-30 flex flex-col items-center justify-center w-44 h-44 rounded-full bg-background/90 dark:bg-zinc-950/90 backdrop-blur-2xl border-2 border-purple-500/40 shadow-2xl shadow-purple-900/30 text-center group cursor-pointer transition-transform duration-500 hover:scale-105">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500 -z-10 animate-pulse" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-purple-600/50 mb-2">
              AI
            </div>
            <h3 className="text-sm font-bold text-foreground tracking-tight">AAICY Engine</h3>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5">Central Orchestrator</span>
          </div>

          {/* Radial Orbiting Nodes (Positioned via trigonometry / fixed angles) */}
          {INTEGRATION_NODES.map((node, index) => {
            // Calculate circular coordinates for 6 nodes (60 degrees apart)
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 220; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isHovered = activeNode === index;

            return (
              <div
                key={index}
                className="absolute z-20 transition-all duration-300"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onMouseEnter={() => setActiveNode(index)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`flex items-center gap-3 p-3.5 rounded-2xl bg-background/90 dark:bg-zinc-900/90 backdrop-blur-xl border transition-all duration-300 shadow-lg cursor-pointer w-60 ${isHovered ? 'border-purple-500 shadow-purple-500/20 scale-105' : 'border-border/80 hover:border-purple-500/50'}`}>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${node.color} border shrink-0 flex items-center justify-center`}>
                    {node.icon}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-semibold text-xs text-foreground truncate">{node.name}</h4>
                      <span className={`text-[9px] uppercase font-semibold px-1.5 py-0.2 rounded-full border ${node.badgeBg}`}>
                        {node.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate">{node.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Adaptive Grid View (Shown on screens < md) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          
          {/* Central Hub Card for Mobile */}
          <div className="sm:col-span-2 flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 backdrop-blur-md mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              AI
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">AAICY Engine Core</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Central CRM & Automation Orchestrator handling all connected nodes below.</p>
            </div>
          </div>

          {INTEGRATION_NODES.map((node, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-background/80 dark:bg-zinc-900/60 backdrop-blur-md border border-border/70 shadow-sm"
            >
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${node.color} border shrink-0 flex items-center justify-center`}>
                {node.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-foreground">{node.name}</h4>
                  <span className={`text-[9px] uppercase font-semibold px-1.5 py-0.2 rounded-full border ${node.badgeBg}`}>
                    {node.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {node.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}