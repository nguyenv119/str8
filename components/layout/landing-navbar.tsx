"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function LandingNavbar() {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Logo showText={true} variant={scrolled ? "dark" : "light"} />

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link
              href="#about"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="#science"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Science
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors hidden sm:block ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Log in
            </Link>
            <Button
              asChild
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 shadow-sm"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
