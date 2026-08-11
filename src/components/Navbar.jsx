"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Braces,
  ChevronDown,
  LayoutGrid,
  Moon,
  PanelTop,
  RefreshCcw,
  ScanSearch,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useTheme } from "next-themes";

const PRIMARY_NAV = [
  { href: "/about-us", label: "Features", hasDropdown: true },
  { href: "/services-list", label: "Integrations", badge: "New" },
  { href: "/contact-form", label: "Pricing" },
  { href: "/contact-form", label: "Get paid!" },
];

const FEATURE_COLUMNS = [
  {
    title: "Core features",
    items: [
      { label: "Design", icon: LayoutGrid },
      { label: "Publish", icon: PanelTop },
      { label: "Collaborate", icon: Sparkles, badge: "Soon" },
    ],
  },
  {
    title: "Extra features",
    items: [
      { label: "AI agents", icon: WandSparkles, badge: "Soon" },
      { label: "Automation", icon: RefreshCcw, badge: "Soon" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { label: "API", icon: Braces, badge: "Soon" },
      { label: "Whitelabel", icon: ScanSearch, badge: "Soon" },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [compactNavbar, setCompactNavbar] = useState(false);
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef(null);
  const previousScrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    previousScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < previousScrollYRef.current;

      setCompactNavbar(!scrollingUp && currentScrollY > 0);
      previousScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const activeTheme = resolvedTheme ?? theme;

  const handleThemeToggle = () => {
    setTheme(activeTheme === "dark" ? "light" : "dark");
  };

  const openFeatures = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setFeaturesOpen(true);
  };

  const closeFeatures = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setFeaturesOpen(false);
      closeTimerRef.current = null;
    }, 250);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-[10px] transition-all duration-300 lg:left-1/2 lg:top-5 lg:-translate-x-1/2 lg:border lg:border-black/8 lg:bg-white/95 lg:shadow-[0_10px_30px_rgba(17,24,39,0.08)]
         ${compactNavbar ? "lg:w-[50vw]  lg:rounded-full" : " lg:rounded-2xl lg:w-[80vw]"}
         `}
      style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-black lg:gap-1.5"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] lg:h-10 lg:w-10 lg:rounded-[14px]">
              <img
                src="/logo.svg"
                alt="AAICY logo"
                className="h-7 w-7 object-contain lg:h-8 lg:w-8"
              />
            </span>
            <span
              className={`text-[26px] font-black tracking-[-0.06em] text-black transition-all duration-300 lg:text-[31px]
                 ${
                   compactNavbar
                     ? "w-0 overflow-hidden opacity-0 lg:w-0"
                     : "w-auto opacity-100"
                 }
              `}
            >
              AAICY
            </span>
            <sup
              className={`relative -top-2.5 text-[10px] font-semibold text-black/75 lg:-top-3 lg:text-[12px]
               ${
                 compactNavbar
                   ? "w-0 overflow-hidden opacity-0 lg:w-0"
                   : "w-auto opacity-100"
               }D
              `}
            >
              ®
            </sup>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((link) => {
              const active = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openFeatures}
                    onMouseLeave={closeFeatures}
                    onFocusCapture={openFeatures}
                    onBlurCapture={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        closeFeatures();
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`flex h-10 items-center gap-1 rounded-2xl px-4 text-[15px] font-medium tracking-[-0.02em] transition-colors duration-200 lg:h-11 lg:text-[16px] ${
                        active || pathname.startsWith("/about-us")
                          ? "bg-neutral-100 text-black"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                      }`}
                    >
                      Features
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          featuresOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <div
                      className={`absolute left-1/2 top-full z-50 mt-3 w-[min(700px,calc(100vw-1.5rem))] -translate-x-1/2 transition-all duration-200 ease-out ${
                        featuresOpen
                          ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
                          : "pointer-events-none opacity-0 translate-y-2 scale-[0.985]"
                      }`}
                    >
                      <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                        <div className="grid grid-cols-1 gap-4 p-4 lg:p-5">
                          <div className="grid grid-cols-3 gap-6">
                            {FEATURE_COLUMNS.map((column) => (
                              <div key={column.title}>
                                <p className="mb-4 text-[13px] font-medium text-neutral-500">
                                  {column.title}
                                </p>
                                <div className="space-y-3.5">
                                  {column.items.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                      <div
                                        key={item.label}
                                        className="flex items-center justify-between gap-3 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-gray-100/80"
                                      >
                                        <div className="flex items-center gap-1.5">
                                          <span className="flex h-7 w-7 items-center justify-center rounded-[10px] border border-black/10 text-black">
                                            <Icon className="h-3.5 w-3.5" />
                                          </span>
                                          <span className="text-[16px] tracking-[-0.02em] text-black">
                                            {item.label}
                                          </span>
                                        </div>
                                        {item.badge && (
                                          <span className="rounded-lg border border-black/10 bg-white px-2 py-0.5 text-[12px] font-medium text-black shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex h-11 items-center gap-1.5 rounded-2xl px-4 text-[16px] font-medium tracking-[-0.02em] transition-colors duration-200 ${
                    active
                      ? "text-black"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded-lg border border-black/10 px-2 py-0.5 text-[12px] font-medium leading-none text-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
              aria-label="Toggle theme"
            >
              {mounted ? (
                <Moon className="h-8 w-8 stroke-[1.7]" />
              ) : (
                <span className="h-8 w-8" />
              )}
            </button>

            <Link
              href="/contact-form"
              className="inline-flex h-11 items-center justify-center rounded-[14px] border border-black/10 bg-white px-5 text-[15px] font-medium tracking-[-0.01em] text-black transition-colors duration-200 hover:bg-neutral-50"
            >
              Login
            </Link>

            <Link
              href="/contact-form"
              className="inline-flex h-11 items-center justify-center rounded-[14px] bg-neutral-900 px-5 text-[15px] font-semibold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-neutral-800"
            >
              Try free
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5"
              aria-label="Toggle theme"
            >
              {mounted ? (
                <Moon className="h-7 w-7 stroke-[1.7]" />
              ) : (
                <span className="h-7 w-7" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-neutral-950 text-white transition-colors hover:bg-neutral-900"
            >
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span
                  className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-0 rotate-45"
                      : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen
                      ? "translate-y-0 -rotate-45"
                      : "translate-y-1.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-neutral-200/80 bg-white/90 backdrop-blur-[10px] transition-all duration-300 lg:hidden ${mobileMenuOpen ? "max-h-104 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="space-y-2 px-4 py-4">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 rounded-[18px] px-4 py-3 text-[16px] font-medium tracking-[-0.02em] transition-colors ${
                pathname === link.href
                  ? "bg-black/5 text-black"
                  : "text-neutral-700 hover:bg-black/5 hover:text-black"
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="rounded-[7px] border border-black/10 px-2 py-0.5 text-[12px] text-black">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-[14px] border border-black/10 bg-white px-5 text-[15px] font-medium text-black"
            >
              Login
            </Link>
            <Link
              href="/contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-[14px] bg-neutral-900 px-5 text-[15px] font-semibold text-white"
            >
              Try free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
