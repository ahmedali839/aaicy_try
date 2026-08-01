import Link from "next/link";
import { Globe, Palette, BrainCircuit, Bot, Mail, Phone } from "lucide-react";
import FlowithFooter from "./FlowithFooter"; // it's footer (AAICY) water animation component

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Our Process", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "/contact-form" },
    ],
    services: [
      { name: "Website Development", href: "/services-list", icon: Globe },
      { name: "UI/UX Design", href: "/services-list", icon: Palette },
      { name: "AI Automations", href: "/services-list", icon: BrainCircuit },
      { name: "AI Agents", href: "/services-list", icon: Bot },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Community", href: "#" },
      { name: "Showcase", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-black/5 bg-white text-black transition-colors duration-300 dark:border-white/10 dark:bg-black dark:text-white">
      <FlowithFooter />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="group flex items-center gap-1 text-2xl font-bold tracking-tighter"
            >
              AAICY
              <span className="text-brand-blue transition-colors duration-300 group-hover:text-brand-purple">
                .
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Pioneering the intersection of Web & Artificial Intelligence. We
              craft digital excellence for the next generation of visionaries.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:hello@aicy.company"
                className="group flex items-center gap-3 text-gray-500 transition-colors hover:text-brand-blue dark:text-gray-400"
              >
                <div className="rounded-lg bg-black/5 p-2 transition-colors group-hover:bg-brand-blue/10 dark:bg-white/5">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm">ahmedyarr1212@gmail.com</span>
              </a>
              <a
                href="tel:+923715335433"
                className="group flex items-center gap-3 text-gray-500 transition-colors hover:text-brand-blue dark:text-gray-400"
              >
                <div className="rounded-lg bg-black/5 p-2 transition-colors group-hover:bg-brand-blue/10 dark:bg-white/5">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm">+92 371 533 5433</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    <link.icon className="h-3.5 w-3.5 opacity-50" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-black/5 pt-8 md:flex-row dark:border-white/10">
          <div className="flex items-center gap-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {currentYear} AAICY. All rights reserved.
            </p>
            <div className="hidden items-center gap-4 border-l border-black/10 pl-6 md:flex dark:border-white/10">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aicy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 transition-colors hover:text-black dark:hover:text-white"
              title="GitHub"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <div className="ml-4 flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 dark:border-white/10 dark:bg-white/5">
              <Globe className="h-3 w-3 text-gray-500" />
              <span className="text-[10px] font-medium uppercase tracking-tighter text-gray-500">
                English (US)
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
