"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("AICY Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white dark:bg-black text-black dark:text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-red-500/20 to-orange-500/20 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="bg-red-500/10 p-6 rounded-full mb-8 border border-red-500/30">
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
        Something went wrong!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md text-center mb-10">
        We encountered an unexpected error. Our team has been notified.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => reset()}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
        >
          <RotateCcw className="w-4 h-4 group-active:-rotate-180 transition-transform" />
          Try again
        </button>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-black/20 dark:border-white/20 font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
