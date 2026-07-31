"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Initial entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

    // Scroll listener for dynamic background
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, []);

  // Animate mobile menu open/close
  const mobileMenuRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About" },
    { href: "/services-list", label: "Services" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-2xl py-2" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter text-black dark:text-white group">
              AAICY<span className="text-brand-blue group-hover:text-brand-purple transition-colors duration-300">.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
            {links.map((link, index) => (
              <Link
                key={link.href}
                ref={(el) => (linksRef.current[index] = el)}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {pathname === link.href && (
                  <span className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-full -z-10 animate-in zoom-in duration-300" />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Theme */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact-form"
              ref={(el) => (linksRef.current[links.length] = el)}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
              className="inline-flex items-center justify-center p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu panel */}
      <div 
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`md:hidden overflow-hidden ${isOpen ? "block" : "hidden"} bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {[...links, { href: "/contact-form", label: "Contact Us" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                pathname === link.href
                  ? "text-black dark:text-white bg-brand-blue/10 dark:bg-brand-blue/20 border border-brand-blue/20 dark:border-brand-blue/30"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
