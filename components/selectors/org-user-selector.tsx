"use client";

import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { useOrganizations } from "@/lib/hooks/use-organizations";
import { useUsersForOrg } from "@/lib/hooks/use-users-for-org";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

export function OrgUserSelector() {
  const { orgId, userId, setOrgId, setUserId, isHydrated } =
    useOrgUserSelection();
  const { data: organizations } = useOrganizations();
  const { data: users } = useUsersForOrg(orgId);
  const queryClient = useQueryClient();

  const handleOrgChange = (newOrgId: string) => {
    setOrgId(newOrgId);
    setUserId(null); // Reset user when org changes
    // Invalidate queries that depend on org/user
    queryClient.invalidateQueries();
  };

  const handleUserChange = (newUserId: string) => {
    setUserId(newUserId);
    // Invalidate queries that depend on user
    queryClient.invalidateQueries();
  };

  if (!isHydrated) {
    return (
      <div className="flex gap-2">
        <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Select value={orgId || ""} onValueChange={handleOrgChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select org" />
        </SelectTrigger>
        <SelectContent>
          {organizations?.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={userId || ""}
        onValueChange={handleUserChange}
        disabled={!orgId}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

