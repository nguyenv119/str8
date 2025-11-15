import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className, showText = true, variant }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      {/* Logo mark */}
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 shadow-sm",
          variant === "light" ? "bg-white/90 text-emerald-600" : "text-white"
        )}
      >
        {/* Minimal "alignment" icon - looks like spine/posture */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="scale-95"
        >
          {/* Stylized 'A' made of aligned lines (subtle posture reference) */}
          <path d="M4 18L12 4L20 18" />
          <path d="M7 16H17" />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight",
            variant === "light" ? "text-white" : "text-slate-900",
            "text-xl"
          )}
        >
          Align
        </span>
      )}
    </Link>
  );
}
