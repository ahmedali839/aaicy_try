"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 blur-[150px] rounded-full pointer-events-none -z-10" />
      <h1 className="text-9xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md text-center mb-10">
        We couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="group inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return Home
      </Link>
    </div>
  );
}
