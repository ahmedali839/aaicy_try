import React, { useState } from "react";
import {
  Globe,
  Palette,
  Cpu,
  Bot,
  PhoneCall,
  Database,
  Share2,
  GraduationCap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified, Professional Service Data
const allServices = [
  // Always Visible (First 4)
  {
    id: "web-dev",
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    title: "Website Development",
    description:
      "Fast, responsive websites built to convert visitors into clients.",
  },
  {
    id: "web-design",
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    title: "Website Design(UI/UX)",
    description: "Modern visual design crafted for seamless user experiences.",
  },
  {
    id: "ai-auto",
    icon: <Cpu className="w-6 h-6 text-purple-500" />,
    title: "Workflow Automation",
    description:
      "Automate repetitive business operations to save time and costs.",
  },
  {
    id: "ai-agents",
    icon: <Bot className="w-6 h-6 text-emerald-500" />,
    title: "AI Assistants",
    description:
      "Smart AI agents trained on your data to handle customer inquiries.",
  },

  // Expandable Services
  {
    id: "voice-agent",
    icon: <PhoneCall className="w-6 h-6 text-indigo-500" />,
    title: "AI Voice Calling",
    description:
      "Automated human-like phone calls for inbound & outbound support.",
  },
  {
    id: "crm-auto",
    icon: <Database className="w-6 h-6 text-amber-500" />,
    title: "CRM Integration",
    description:
      "Keep client leads and data synced across all your tools automatically.",
  },
  {
    id: "omni-auto",
    icon: <Share2 className="w-6 h-6 text-cyan-500" />,
    title: "Social Automation",
    description:
      "Connect WhatsApp, Instagram, Facebook, and Gmail in one workflow.",
  },
  {
    id: "mentorship",
    icon: <GraduationCap className="w-6 h-6 text-rose-500" />,
    title: "Tech Consulting",
    description:
      "Expert guidance to plan, scale, and secure your tech infrastructure.",
  },
];

// Staggered Container Variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // 120ms stagger between each card entry
    },
  },
};

// Subtle Card Animation Variant
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.215, 0.61, 0.355, 1], // Power2 Out ease
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.2 },
  },
};

export default function ServicesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleServices = isExpanded ? allServices : allServices.slice(0, 4);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      id="services"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
          Scalable technical solutions engineered to accelerate your growth.
        </p>
      </div>

      {/* Grid Container with Viewport Entrance Trigger */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          {visibleServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              exit="exit"
              className="group bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 transition-colors duration-300 hover:border-blue-500/60 dark:hover:border-blue-400/60 flex flex-col justify-between"
            >
              <div>
                <div className="mb-5 bg-white dark:bg-white/10 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="services"
          className="
            group flex items-center gap-2 px-7 py-3.5 
            rounded-full 
            bg-white dark:bg-gray-900 
            border border-gray-200 dark:border-gray-800 
            text-gray-900 dark:text-white font-medium text-sm
            shadow-sm hover:shadow-md 
            hover:border-blue-500/50 dark:hover:border-blue-400/50
            active:scale-95 
            transition-all duration-300 cursor-pointer
          "
        >
          <span>{isExpanded ? "Show Less" : "Show More"}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-transform duration-300" />
          )}
        </button>
      </div>
    </section>
  );
}
