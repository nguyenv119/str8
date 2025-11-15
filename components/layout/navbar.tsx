"use client";

import { useState, useEffect } from "react";
import { OrgUserSelector } from "@/components/selectors/org-user-selector";
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
          <div className="h-6 w-px bg-slate-200" />
          <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white/50 px-4 py-2">
            <OrgUserSelector />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

