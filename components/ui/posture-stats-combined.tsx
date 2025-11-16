"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodayTimeline } from "@/lib/hooks/use-today-timeline";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";

interface PostureStatsCombinedProps {
  currentScore: number;
  className?: string;
}

export function PostureStatsCombined({
  currentScore,
  className,
}: PostureStatsCombinedProps) {
  const { orgId, userId } = useOrgUserSelection();
  const { data: timeline, isLoading } = useTodayTimeline(orgId, userId);

  const { color, status, strokeColor } = useMemo(() => {
    if (currentScore >= 80) {
      return { color: "text-emerald-600", status: "Excellent", strokeColor: "text-emerald-500" };
    } else if (currentScore >= 60) {
      return { color: "text-yellow-500", status: "Good", strokeColor: "text-yellow-500" };
    } else {
      return { color: "text-red-500", status: "Needs Improvement", strokeColor: "text-red-500" };
    }
  }, [currentScore]);

  // Calculate angle for circular progress (0-360 degrees)
  const angle = (currentScore / 100) * 360;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (angle / 360) * circumference;

  // Calculate stats from timeline
  const stats = useMemo(() => {
    if (isLoading || !timeline) {
      return {
        totalMinutes: 0,
        slouchEvents: 0,
        goodPosturePercent: 0,
      };
    }

    const totalMinutes = timeline.length * 5;
    const slouchEvents = timeline.filter((s) => s.slouch).length;
    const goodPostureMinutes = timeline.filter((s) => !s.slouch).length * 5;
    const goodPosturePercent = Math.round((goodPostureMinutes / totalMinutes) * 100);

    return {
      totalMinutes,
      slouchEvents,
      goodPosturePercent,
    };
  }, [timeline, isLoading]);

  return (
    <Card className={cn("rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Circular Gauge */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs text-slate-500 text-center mb-4">Posture Score</div>
            <div className="relative flex items-center justify-center mb-2">
              <svg
                width="140"
                height="140"
                className="transform -rotate-90"
                viewBox="0 0 140 140"
              >
                {/* Background circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-200"
                />
                {/* Progress circle */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className={cn("transition-all duration-500", 
                    currentScore >= 80 ? "text-emerald-400" : currentScore >= 60 ? "text-emerald-500" : "text-red-400"
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={cn("text-3xl font-semibold tracking-tight", color)}>{currentScore}</div>
              </div>
            </div>
            <div className={cn("text-center text-xs font-medium", color)}>{status}</div>
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              <>
                <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
              </>
            ) : (
              <>
                <div>
                  <div className="text-3xl font-semibold tracking-tight text-slate-900 mb-1">
                    {stats.totalMinutes}
                  </div>
                  <p className="text-xs text-slate-500">Minutes monitored</p>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-tight text-slate-900 mb-1">
                    {stats.slouchEvents}
                  </div>
                  <p className="text-xs text-slate-500">Slouch events</p>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-tight text-slate-900 mb-1">
                    {stats.goodPosturePercent}%
                  </div>
                  <p className="text-xs text-slate-500">Good posture time</p>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}



