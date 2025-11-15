"use client";

import { useState, useEffect } from "react";

const ORG_KEY = "posturelens_selectedOrgId";
const USER_KEY = "posturelens_selectedUserId";

export function useOrgUserSelection() {
  const [orgId, setOrgIdState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrgId = localStorage.getItem(ORG_KEY);
      const savedUserId = localStorage.getItem(USER_KEY);
      setOrgIdState(savedOrgId);
      setUserIdState(savedUserId);
      setIsHydrated(true);
    }
  }, []);

  const setOrgId = (id: string | null) => {
    setOrgIdState(id);
    if (typeof window !== "undefined") {
      if (id) {
        localStorage.setItem(ORG_KEY, id);
      } else {
        localStorage.removeItem(ORG_KEY);
      }
    }
  };

  const setUserId = (id: string | null) => {
    setUserIdState(id);
    if (typeof window !== "undefined") {
      if (id) {
        localStorage.setItem(USER_KEY, id);
      } else {
        localStorage.removeItem(USER_KEY);
      }
    }
  };

  return {
    orgId,
    userId,
    setOrgId,
    setUserId,
    isHydrated,
  };
}

