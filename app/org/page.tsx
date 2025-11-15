"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/ui/stat-card";
import { OrgLeaderboard } from "@/components/tables/org-leaderboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrgLeaderboard } from "@/lib/hooks/use-org-leaderboard";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { useSlackCongrats } from "@/lib/hooks/use-slack-congrats";
import { useToast } from "@/components/ui/use-toast";
import { useWeeklySummary } from "@/lib/hooks/use-weekly-summary";
import { useUsersForOrg } from "@/lib/hooks/use-users-for-org";
import { useMemo } from "react";

export default function OrgPage() {
  const { orgId, isHydrated } = useOrgUserSelection();
  const { data: leaderboard } = useOrgLeaderboard(orgId);
  const { data: users } = useUsersForOrg(orgId);
  const { data: weeklyData } = useWeeklySummary(orgId, null);
  const { mutate: sendCongrats } = useSlackCongrats();
  const { toast } = useToast();

  // Calculate org stats
  const orgStats = useMemo(() => {
    if (!leaderboard || !users || !weeklyData) {
      return null;
    }

    const today = weeklyData[weeklyData.length - 1];
    const avgScore = leaderboard.reduce((sum, e) => sum + e.avgScore, 0) / leaderboard.length;
    const totalHours = weeklyData.reduce((sum, d) => sum + d.goodPostureMinutes, 0) / 60;

    return {
      avgScore: Math.round(avgScore * 10) / 10,
      activeUsers: users.length,
      totalHours: Math.round(totalHours * 10) / 10,
    };
  }, [leaderboard, users, weeklyData]);

  // Generate insights
  const insights = useMemo(() => {
    if (!weeklyData || !leaderboard) return [];

    const insightsList = [];

    // Find peak slouch time
    const hourlySlouch: Record<number, number> = {};
    weeklyData.forEach((day) => {
      // Mock: assume most slouch events happen in afternoon
      hourlySlouch[15] = (hourlySlouch[15] || 0) + day.slouchEvents;
    });
    const peakHour = Object.entries(hourlySlouch).sort((a, b) => b[1] - a[1])[0];
    if (peakHour) {
      insightsList.push(
        `Most slouch events happen between ${peakHour[0]}:00-${parseInt(peakHour[0]) + 1}:00 PM.`
      );
    }

    // Compare departments (mock: assume first half are engineers, second half are sales)
    if (leaderboard.length >= 4) {
      const engineers = leaderboard.slice(0, Math.floor(leaderboard.length / 2));
      const sales = leaderboard.slice(Math.floor(leaderboard.length / 2));
      const engAvg = engineers.reduce((sum, e) => sum + e.avgScore, 0) / engineers.length;
      const salesAvg = sales.reduce((sum, e) => sum + e.avgScore, 0) / sales.length;

      if (engAvg < salesAvg) {
        insightsList.push(
          "Engineers have higher posture fatigue than Sales. Consider ergonomic assessments."
        );
      }
    }

    return insightsList;
  }, [weeklyData, leaderboard]);

  const handleSendCongrats = () => {
    if (!orgId || !leaderboard || leaderboard.length < 3) {
      toast({
        title: "Not enough data",
        description: "Need at least 3 users in the leaderboard.",
      });
      return;
    }

    const topThree = leaderboard.slice(0, 3).map((e) => e.userId);
    sendCongrats(
      { orgId, userIds: topThree },
      {
        onSuccess: () => {
          toast({
            title: "Congrats sent!",
            description: "Slack notifications sent to top 3 performers.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to send Slack notifications.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (!isHydrated) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      </AppShell>
    );
  }

  if (!orgId) {
    return (
      <AppShell>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              Select Organization
            </h2>
            <p className="text-slate-600">
              Please select an organization from the dropdown above to view
              organization insights.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Org Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Average Posture Score"
            value={orgStats?.avgScore ?? "—"}
            description="Today across all users"
          />
          <StatCard
            title="Active Users"
            value={orgStats?.activeUsers ?? "—"}
            description="Currently monitored"
          />
          <StatCard
            title="Total Hours Monitored"
            value={orgStats?.totalHours ?? "—"}
            description="This week"
          />
        </div>

        {/* Leaderboard */}
        <OrgLeaderboard />

        {/* Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {insights.length > 0 ? (
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="text-sm text-slate-600">
                    • {insight}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-600">
                No insights available yet. Check back after more data is
                collected.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Slack Congrats Button */}
        <div className="flex justify-center">
          <Button onClick={handleSendCongrats} size="lg">
            Send Slack Congrats to Top 3
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

