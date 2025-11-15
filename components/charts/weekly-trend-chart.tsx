"use client";

import { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeeklySummary } from "@/lib/hooks/use-weekly-summary";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";

export function WeeklyTrendChart() {
  const { orgId, userId } = useOrgUserSelection();
  const { data: weeklyData, isLoading } = useWeeklySummary(orgId, userId);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [orgId, userId]);

  if (isLoading || !weeklyData) {
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Weekly Trend</CardTitle>
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
          <CardTitle className="text-xl font-medium text-slate-800">Weekly Trend</CardTitle>
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
    const chartData = weeklyData.map((day) => ({
      date: format(parseISO(day.date), "EEE"),
      avgScore: day.avgScore,
      slouchEvents: day.slouchEvents,
    }));

    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Weekly Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  yAxisId="left"
                  domain={[0, 100]}
                  className="text-xs"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
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
                <Legend 
                  wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
                  iconType="line"
                />
                <Bar
                  yAxisId="right"
                  dataKey="slouchEvents"
                  fill="#ef4444"
                  name="Slouch Events"
                  opacity={0.6}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#10b981" }}
                  name="Avg Score"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    setHasError(true);
    return (
      <Card className="rounded-2xl border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Weekly Trend</CardTitle>
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

