"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LeaderboardEntry {
  name: string;
  score: number; // today's average posture score
  goodPostureTime?: number; // optional, % good posture time
}

interface DailyLeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
}

export function DailyLeaderboard({
  entries,
  className,
}: DailyLeaderboardProps) {
  const topThree = useMemo(() => {
    return [...entries]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [entries]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400 text-yellow-900"; // Gold #FACC15
      case 2:
        return "bg-slate-300 text-slate-700"; // Silver #D1D5DB
      case 3:
        return "bg-amber-700 text-amber-100"; // Bronze #B45309
      default:
        return "bg-slate-200 text-slate-600";
    }
  };

  const getStatusText = (score: number) => {
    if (score >= 80) {
      return "🏆 Excellent posture";
    } else if (score >= 60) {
      return "👍 Good posture";
    } else {
      return "⚠️ Needs improvement";
    }
  };

  return (
    <Card className={cn("rounded-2xl border border-slate-200 shadow-sm", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-slate-800">
          Top 3 Posture Performers (Today)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {topThree.map((entry, index) => {
            const rank = index + 1;
            return (
              <div
                key={`${entry.name}-${rank}`}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-sm animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Rank Badge */}
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-bold text-lg",
                    getRankColor(rank)
                  )}
                >
                  {rank}
                </div>

                {/* Name and Score */}
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{entry.name}</div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
                    {entry.score}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {getStatusText(entry.score)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

