"use client";

import { AppShell } from "@/components/layout/app-shell";
import { LivePosturePanel } from "@/components/live-posture-panel";
import { PostureScoreGauge } from "@/components/ui/posture-score-gauge";
import { TodayStatsCard } from "@/components/ui/today-stats-card";
import { DailyTimelineChart } from "@/components/charts/daily-timeline-chart";
import { WeeklyTrendChart } from "@/components/charts/weekly-trend-chart";
import { useLivePosture } from "@/lib/hooks/use-live-posture";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function DashboardPage() {
  const { orgId, userId, isHydrated } = useOrgUserSelection();
  const { data: livePosture } = useLivePosture(orgId, userId);

  if (!isHydrated) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      </AppShell>
    );
  }

  if (!orgId || !userId) {
    return (
      <AppShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Activity className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Welcome to your Posture Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-slate-600">
                Select an organization and user to view your real-time posture insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Two-column layout */}
        <div className="grid gap-8 md:grid-cols-2">
          <LivePosturePanel />
          <div className="space-y-8">
            {livePosture && (
              <PostureScoreGauge score={livePosture.postureScore} />
            )}
            <TodayStatsCard />
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-8 md:grid-cols-2">
          <DailyTimelineChart />
          <WeeklyTrendChart />
        </div>

        {/* Footer note */}
        <div className="mt-12 py-6 text-center text-xs text-slate-400">
          Mock data only. In production this is fed by a continuous CV posture
          stream.
        </div>
      </div>
    </AppShell>
  );
}

