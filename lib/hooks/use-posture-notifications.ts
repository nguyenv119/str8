"use client";

import { useEffect, useRef } from "react";

interface UsePostureNotificationsOptions {
  score: number;
  enabled: boolean;
  threshold?: number;
  durationMs?: number;
}

export function usePostureNotifications({
  score,
  enabled,
  threshold = 60,
  durationMs = 7000,
}: UsePostureNotificationsOptions) {
  const poorPostureStartRef = useRef<number | null>(null);
  const notificationShownRef = useRef(false);
  const permissionRequestedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      poorPostureStartRef.current = null;
      notificationShownRef.current = false;
      return;
    }

    // Request notification permission on first enable
    if (!permissionRequestedRef.current && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          permissionRequestedRef.current = true;
        });
      } else {
        permissionRequestedRef.current = true;
      }
    }

    if (score < threshold) {
      if (poorPostureStartRef.current === null) {
        poorPostureStartRef.current = Date.now();
      }

      const duration = Date.now() - poorPostureStartRef.current;

      if (duration >= durationMs && !notificationShownRef.current) {
        // Show browser notification (works even when page is not focused)
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Posture Alert", {
            body: "Your posture has been poor for over 7 seconds. Please adjust your position.",
            icon: "/favicon.ico",
            tag: "posture-alert", // Prevents duplicate notifications
            requireInteraction: false,
          });
          notificationShownRef.current = true;
        }
      }
    } else {
      // Reset if posture improves
      poorPostureStartRef.current = null;
      notificationShownRef.current = false;
    }
  }, [score, enabled, threshold, durationMs]);
}
