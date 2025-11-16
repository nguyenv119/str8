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
    <Card className={cn("flex flex-col items-center justify-center", className)}>
      <CardContent className="pt-6">
        <div className="relative">
          <svg
            width="160"
            height="160"
            className="transform -rotate-90"
            viewBox="0 0 160 160"
          >
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-200"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={cn("transition-all duration-500", strokeColor)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("text-4xl font-medium text-slate-900", color)}>{score}</div>
            <div className="text-xs text-slate-600">Score</div>
          </div>
        </div>
        <div className={cn("mt-4 text-center text-sm font-medium", color)}>{status}</div>
      </CardContent>
    </Card>
  );
}

