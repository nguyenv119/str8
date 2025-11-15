"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrgLeaderboard } from "@/lib/hooks/use-org-leaderboard";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function OrgLeaderboard() {
  const { orgId } = useOrgUserSelection();
  const { data: leaderboard, isLoading } = useOrgLeaderboard(orgId);

  if (isLoading || !leaderboard) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organization Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-full animate-pulse rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Avg Score</TableHead>
              <TableHead className="text-right">Improvement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow key={entry.userId}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="font-semibold">
                    {entry.avgScore}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "flex items-center justify-end gap-1",
                      entry.improvementPercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {entry.improvementPercent >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">
                      {entry.improvementPercent >= 0 ? "+" : ""}
                      {entry.improvementPercent.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

