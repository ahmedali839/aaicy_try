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
import ServicesSection from "../../components/ServiceLists";

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
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-center text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight mb-8">
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
         <ServicesSection />

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






