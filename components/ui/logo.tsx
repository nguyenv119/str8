import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className, showText = true, variant }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white font-semibold text-base shadow-sm">
        S8
      </div>
      {showText && (
        <span
          className={cn(
            "font-medium text-lg tracking-tight",
            variant === "light" ? "text-white" : "text-slate-900"
          )}
        >
          Align
        </span>
      )}
    </Link>
  );
}

