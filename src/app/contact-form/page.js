"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import gsap from "gsap";
import toast from "react-hot-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import { processContactForm } from "../actions/contact";

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-full py-4 bg-linear-to-r from-brand-blue to-brand-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {pending ? (
        <>Sending <Loader2 className="w-5 h-5 animate-spin" /></>
      ) : (
        <>Send Message <ArrowRight className="w-5 h-5" /></>
      )}
    </button>
  );
}

/// update the contact form to work with more better flow of submissions

export default function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  
  const headerRef = useRef(null);
  const formRef = useRef(null);

  // Server Action Hook
  const [state, formAction] = useActionState(processContactForm, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setIsSent(true);
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
    );
  }, []);

  return (
    <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center">
      {/* Background Gradient Disk */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-linear-to-tr from-brand-blue/20 to-brand-purple/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-blue to-brand-purple">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Let's discuss how we can help you build the future.
          </p>
        </div>

        <div ref={formRef} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {isSent ? (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                Your message has been received. We'll be in touch shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="px-8 py-4 bg-black/5 dark:bg-white/10 text-black dark:text-white font-semibold rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition flex items-center gap-2 mx-auto"
              >
                Send Another Message <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
  
          )}
        </div>
      </div>
    </div>
  );
}
