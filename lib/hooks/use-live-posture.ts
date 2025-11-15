"use client";

import { useQuery } from "@tanstack/react-query";
import { getLivePosture } from "@/lib/api/mock";
import type { PostureSample } from "@/lib/types/posture";

export function useLivePosture(orgId: string | null, userId: string | null) {
  return useQuery<PostureSample>({
    queryKey: ["livePosture", orgId, userId],
    queryFn: () => {
      if (!orgId || !userId) {
        throw new Error("orgId and userId are required");
      }
      return getLivePosture(orgId, userId);
    },
    enabled: !!orgId && !!userId,
    refetchInterval: 3000, // Poll every 3 seconds
  });
}

