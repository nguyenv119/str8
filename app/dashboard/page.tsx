"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { LivePosturePanel } from "@/components/live-posture-panel";
import { PostureStatsCombined } from "@/components/ui/posture-stats-combined";
import { DailyTimelineChart } from "@/components/charts/daily-timeline-chart";
import { WeeklyTrendChart } from "@/components/charts/weekly-trend-chart";
import { DailyLeaderboard } from "@/components/leaderboard/daily-leaderboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useLivePosture } from "@/lib/hooks/use-live-posture";

export default function DashboardPage() {
  // Use a default user for mock data (no user selector needed)
  const { data: livePosture } = useLivePosture("org-1", "user-1");

  const leaderboardMock = [
    { name: "Long Nguyen", score: 91, goodPostureTime: 78 },
    { name: "Tanya Bansal", score: 88, goodPostureTime: 75 },
    { name: "Abhinav Piyush", score: 85, goodPostureTime: 72 },
    { name: "Camille Dannenberg", score: 79, goodPostureTime: 66 },
  ];

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Live Posture Panel */}
          <LivePosturePanel />
          
          {/* Right: Stats, Charts, and Leaderboard */}
          <div className="space-y-8">
            <PostureStatsCombined currentScore={livePosture?.postureScore ?? 85} />
            <WeeklyTrendChart />
            <DailyLeaderboard entries={leaderboardMock} />
          </div>
        </div>

        {/* Full-width Timeline Chart */}
        <DailyTimelineChart />
      </div>
    </AppShell>
  );
}

