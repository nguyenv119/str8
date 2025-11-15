"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`border-b border-slate-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-8 py-4">
        <Logo />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/50 px-4 py-2">
            <img
              src="https://logo.clearbit.com/microsoft.com"
              alt="Microsoft"
              className="h-6 w-6 object-contain flex-shrink-0"
              onError={(e) => {
                // Fallback to initials if logo fails
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLDivElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="hidden h-6 w-6 items-center justify-center rounded bg-slate-100">
              <span className="text-xs font-semibold text-slate-700">MS</span>
            </div>
            <span className="text-sm font-medium text-slate-700">Microsoft</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

