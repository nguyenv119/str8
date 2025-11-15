"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodayTimeline } from "@/lib/hooks/use-today-timeline";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { format } from "date-fns";

export function TodayStatsCard() {
  const { orgId, userId } = useOrgUserSelection();
  const { data: timeline, isLoading } = useTodayTimeline(orgId, userId);

  if (isLoading || !timeline) {
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalMinutes = timeline.length * 5;
  const slouchEvents = timeline.filter((s) => s.slouch).length;
  const goodPostureMinutes =
    timeline.filter((s) => !s.slouch).length * 5;
  const goodPosturePercent = Math.round(
    (goodPostureMinutes / totalMinutes) * 100
  );

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">{totalMinutes}</div>
            <p className="text-sm text-slate-500">Minutes monitored</p>
          </div>
          <div>
            <div className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">{slouchEvents}</div>
            <p className="text-sm text-slate-500">Slouch events</p>
          </div>
          <div className="col-span-2">
            <div className="text-4xl font-semibold tracking-tight text-slate-900 mb-1">{goodPosturePercent}%</div>
            <p className="text-sm text-slate-500">Good posture time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

