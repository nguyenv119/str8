"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/lib/api/mock";
import type { Organization } from "@/lib/types/posture";

export function useOrganizations() {
  return useQuery<Organization[]>({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}

