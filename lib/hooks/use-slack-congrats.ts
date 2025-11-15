"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSlackCongrats } from "@/lib/api/mock";

export function useSlackCongrats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orgId, userIds }: { orgId: string; userIds: string[] }) =>
      sendSlackCongrats(orgId, userIds),
    onSuccess: () => {
      // Optionally invalidate queries if needed
    },
  });
}

