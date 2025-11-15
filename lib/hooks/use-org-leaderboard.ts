"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrgLeaderboard } from "@/lib/api/mock";
import type { LeaderboardEntry } from "@/lib/types/posture";

export function useOrgLeaderboard(orgId: string | null) {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["orgLeaderboard", orgId],
    queryFn: () => {
      if (!orgId) {
        throw new Error("orgId is required");
      }
      return getOrgLeaderboard(orgId);
    },
    enabled: !!orgId,
  });
}

