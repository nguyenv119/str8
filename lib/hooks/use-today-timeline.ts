"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodayTimeline } from "@/lib/api/mock";
import type { PostureSample } from "@/lib/types/posture";

export function useTodayTimeline(orgId: string | null, userId: string | null) {
  return useQuery<PostureSample[]>({
    queryKey: ["todayTimeline", orgId, userId],
    queryFn: () => {
      if (!orgId || !userId) {
        throw new Error("orgId and userId are required");
      }
      return getTodayTimeline(orgId, userId);
    },
    enabled: !!orgId && !!userId,
  });
}

