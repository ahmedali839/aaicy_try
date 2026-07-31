"use client";
import dynamic from "next/dynamic";

export const Toaster = dynamic(() => import("react-hot-toast").then((c) => c.Toaster), {
  ssr: false,
});
