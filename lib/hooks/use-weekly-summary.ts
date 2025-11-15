"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeklySummary } from "@/lib/api/mock";
import type { DailySummary } from "@/lib/types/posture";

export function useWeeklySummary(orgId: string | null, userId: string | null) {
  return useQuery<DailySummary[]>({
    queryKey: ["weeklySummary", orgId, userId],
    queryFn: () => {
      if (!orgId || !userId) {
        throw new Error("orgId and userId are required");
      }
      return getWeeklySummary(orgId, userId);
    },
    enabled: !!orgId && !!userId,
  });
}

