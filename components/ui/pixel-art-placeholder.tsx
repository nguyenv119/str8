"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface PixelArtPlaceholderProps {
  variant?: "flower" | "cityscape" | "diagram";
  className?: string;
}

export function PixelArtPlaceholder({
  variant = "flower",
  className,
}: PixelArtPlaceholderProps) {
  if (variant === "flower") {
    return (
      <div
        className={cn(
          "relative h-full w-full rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-100 overflow-hidden",
          className
        )}
      >
        <Image
          src="/lib/images/babson.HEIC"
          alt="Babson illustration"
          fill
          className="object-cover"
          unoptimized // HEIC format requires unoptimized in Next.js
        />
      </div>
    );
  }

  if (variant === "cityscape") {
    return (
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-950">
          {/* Stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  opacity: Math.random() * 0.8 + 0.2,
                }}
              />
            ))}
          </div>
          {/* Buildings silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950 to-transparent">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 bg-slate-800"
                style={{
                  left: `${(i * 100) / 12}%`,
                  width: `${6 + Math.random() * 4}%`,
                  height: `${30 + Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full rounded-2xl bg-slate-50 border border-slate-200",
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="text-center text-slate-400 text-sm">
          Diagram Placeholder
        </div>
      </div>
    </div>
  );
}

