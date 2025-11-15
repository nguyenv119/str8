"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersForOrg } from "@/lib/api/mock";
import type { User } from "@/lib/types/posture";

export function useUsersForOrg(orgId: string | null) {
  return useQuery<User[]>({
    queryKey: ["usersForOrg", orgId],
    queryFn: () => {
      if (!orgId) {
        throw new Error("orgId is required");
      }
      return getUsersForOrg(orgId);
    },
    enabled: !!orgId,
  });
}

