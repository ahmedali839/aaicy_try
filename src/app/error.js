"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("AICY Application Error:", error);
  }, [error]);

}
