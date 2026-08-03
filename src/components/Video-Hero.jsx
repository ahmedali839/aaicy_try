// "use client";

// import React, { useRef } from "react";
// import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// export default function VideoHero() {
//   const containerRef = useRef(null);

//   // 1. Track scroll progress through the section
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // 2. Apply spring physics to eliminate robotic linear motion
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   // 3. Map progress to scale: Starts at 82% (natural look), expands smoothly to 100%
//   const scale = useTransform(smoothProgress, [0, 0.75], [0.82, 1.0]);
  
//   // 4. Dynamically smooth out border-radius during expansion
//   const borderRadius = useTransform(smoothProgress, [0, 0.75], ["32px", "16px"]);
  
//   // 5. Subtle opacity fade for polished scroll entry/exit
//   const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.8]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative h-[180vh] w-full bg-transparent"
//     >
//       {/* Pinned Sticky Viewport Frame */}
//       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8">
//         <motion.div
//           style={{
//             scale,
//             borderRadius,
//             opacity,
//           }}
//           className="relative w-full max-w-6xl aspect-video max-h-[82vh] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-zinc-900/50"
//         >
//           <video
//             className="w-full h-full object-cover"
//             autoPlay
//             loop
//             muted
//             playsInline
//           >
//             <source src="/hero_video.mp4" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

