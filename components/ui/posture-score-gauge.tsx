"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface PostureScoreGaugeProps {
  score: number;
  className?: string;
}

export function PostureScoreGauge({
  score,
  className,
}: PostureScoreGaugeProps) {
  const { color, status, strokeColor } = useMemo(() => {
    if (score >= 80) {
      return { color: "text-emerald-600", status: "Excellent", strokeColor: "text-emerald-500" };
    } else if (score >= 60) {
      return { color: "text-yellow-500", status: "Good", strokeColor: "text-yellow-500" };
    } else {
      return { color: "text-red-500", status: "Needs Improvement", strokeColor: "text-red-500" };
    }
  }, [score]);

  // Calculate angle for circular progress (0-360 degrees)
  const angle = (score / 100) * 360;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (angle / 360) * circumference;

  return (
    <Card className={cn("rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center", className)}>
      <CardContent className="pt-8 pb-8 px-8">
        <div className="text-sm text-slate-500 text-center mb-6">Posture Score</div>
        <div className="relative flex items-center justify-center">
          <svg
            width="180"
            height="180"
            className="transform -rotate-90"
            viewBox="0 0 180 180"
          >
            {/* Background circle */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-200"
            />
            {/* Progress circle */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={cn("transition-all duration-500", 
                score >= 80 ? "text-emerald-400" : score >= 60 ? "text-emerald-500" : "text-red-400"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("text-4xl font-semibold tracking-tight text-slate-900", color)}>{score}</div>
          </div>
        </div>
        <div className={cn("mt-6 text-center text-sm font-medium", color)}>{status}</div>
      </CardContent>
    </Card>
  );
}

