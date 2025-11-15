"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodayTimeline } from "@/lib/hooks/use-today-timeline";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";

export function DailyTimelineChart() {
  const { orgId, userId } = useOrgUserSelection();
  const { data: timeline, isLoading } = useTodayTimeline(orgId, userId);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [orgId, userId]);

  if (isLoading || !timeline) {
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full animate-pulse rounded-xl bg-slate-100" />
        </CardContent>
      </Card>
    );
  }

  if (hasError) {
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">
            Failed to load chart data. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  try {
    // Sample every 30 minutes for better chart readability
    const chartData = timeline
      .filter((_, index) => index % 6 === 0)
      .map((sample) => ({
        time: format(parseISO(sample.timestamp), "HH:mm"),
        score: sample.postureScore,
        slouch: sample.slouch,
      }));

    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="time"
                  className="text-xs"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  domain={[0, 100]}
                  className="text-xs"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                />
                <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.5} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#10b981" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Posture Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-8 border-t-2 border-dashed border-red-400" />
              <span>Slouch Threshold (60)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    setHasError(true);
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Today&apos;s Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">
            Failed to render chart. Please refresh the page.
          </div>
        </CardContent>
      </Card>
    );
  }
}

