"use client";

import { useState, useEffect, useRef } from "react";
import { AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PostureDetector } from "@/components/cv/posture-detector";
import { useLivePosture } from "@/lib/hooks/use-live-posture";
import { usePostureNotifications } from "@/lib/hooks/use-posture-notifications";
import { cn } from "@/lib/utils";

export function LivePosturePanel() {
  // Use default org/user (no selector needed)
  const { data: posture, isLoading } = useLivePosture("org-1", "user-1");
  const [liveScore, setLiveScore] = useState<number>(80);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [useCV, setUseCV] = useState(false);
  const [showSlouchAlert, setShowSlouchAlert] = useState(false);
  const poorPostureStartRef = useRef<number | null>(null);
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use CV score if enabled, otherwise fall back to mock data
  const currentScore = useCV ? liveScore : (posture?.postureScore ?? 80);

  // Browser notifications for poor posture (works in background)
  usePostureNotifications({
    score: currentScore,
    enabled: useCV,
    threshold: 60,
    durationMs: 7000,
  });

  // Debounced slouch alert (fires after 7 seconds of poor posture)
  useEffect(() => {
    if (!useCV) {
      setShowSlouchAlert(false);
      poorPostureStartRef.current = null;
      return;
    }

    const SLOUCH_THRESHOLD = 60;
    const ALERT_DELAY_MS = 7000; // 7 seconds

    if (currentScore < SLOUCH_THRESHOLD) {
      if (poorPostureStartRef.current === null) {
        poorPostureStartRef.current = Date.now();
      }

      const duration = Date.now() - poorPostureStartRef.current;
      
      if (duration >= ALERT_DELAY_MS && !showSlouchAlert) {
        setShowSlouchAlert(true);
      }
    } else {
      // Reset if posture improves
      poorPostureStartRef.current = null;
      setShowSlouchAlert(false);
    }
  }, [currentScore, useCV, showSlouchAlert]);

  if (isLoading || (!posture && !useCV)) {
    return (
      <Card className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium text-slate-800">Live Posture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56 w-full animate-pulse rounded-2xl bg-slate-100" />
        </CardContent>
      </Card>
    );
  }

  const status =
    currentScore >= 80
      ? { label: "Good", variant: "default" as const }
      : currentScore >= 60
        ? { label: "Fair", variant: "secondary" as const }
        : { label: "Slouch", variant: "destructive" as const };

  const tip =
    currentScore >= 80
      ? "Great posture! Keep it up."
      : currentScore >= 60
        ? "Tip: Bring your ears over your shoulders."
        : "Tip: Sit up straight and align your spine.";

  return (
    <Card className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-slate-800">Live Posture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* CV Toggle */}
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-3">
            <Label htmlFor="cv-toggle" className="text-sm font-medium text-slate-700 cursor-pointer">
              Enable Live CV Detection
            </Label>
            <Switch
              id="cv-toggle"
              checked={useCV}
              onCheckedChange={setUseCV}
            />
          </div>
          {useCV && (
            <div className="flex items-center gap-3">
              <Label htmlFor="skeleton-toggle" className="text-xs text-slate-500 cursor-pointer">
                Show Skeleton
              </Label>
              <Switch
                id="skeleton-toggle"
                checked={showSkeleton}
                onCheckedChange={setShowSkeleton}
              />
            </div>
          )}
        </div>

        {/* Webcam/CV Feed */}
        <div className="relative h-56 w-full mx-auto max-w-md">
          {useCV ? (
            <PostureDetector
              onScore={setLiveScore}
              showSkeleton={showSkeleton}
              className="h-full"
            />
          ) : (
            <div className="relative h-full w-full rounded-2xl bg-white flex items-center justify-center border border-slate-200">
              <div className="text-center">
                <div className="text-4xl mb-2">📹</div>
                <div className="text-sm text-slate-500">Camera Feed</div>
              </div>
            </div>
          )}
        </div>

        {/* Score display */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-light text-slate-900 mb-2">{currentScore}</div>
            <div className="text-sm text-slate-500">Current Score</div>
          </div>
          <div className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            status.variant === "default" 
              ? "bg-emerald-100 text-emerald-700" 
              : status.variant === "secondary"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}>
            {status.label}
          </div>
        </div>

        {/* Slouch Alert */}
        {showSlouchAlert && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 border-2 border-red-200 p-4 animate-in slide-in-from-top">
            <AlertCircle className="h-5 w-5 mt-0.5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-900">
                Posture Alert
              </p>
              <p className="text-sm text-red-700 mt-1">
                Your posture has been poor for over 7 seconds. Please adjust your position.
              </p>
            </div>
          </div>
        )}

        {/* Tip */}
        {!showSlouchAlert && (
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <AlertCircle className="h-5 w-5 mt-0.5 text-emerald-600 flex-shrink-0" />
            <p className="text-sm text-slate-600">{tip}</p>
          </div>
        )}

        {/* Score Calculation Explanation */}
        <details className="rounded-xl border border-slate-200 bg-slate-50">
          <summary className="flex items-center gap-2 p-4 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
            <Info className="h-4 w-4 text-emerald-600" />
            How is the posture score calculated?
          </summary>
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-600">
            <p>
              The posture score (0-100) is calculated from MediaPipe pose landmarks using biomechanical analysis:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Shoulder Alignment:</strong> Measures levelness of left and right shoulders</li>
              <li><strong>Forward Head Posture:</strong> Detects how far forward your head is relative to your shoulders</li>
              <li><strong>Spine Alignment:</strong> Analyzes vertical alignment from shoulders to hips</li>
              <li><strong>Neck Angle:</strong> Calculates forward head angle deviation</li>
            </ul>
            <p className="pt-2">
              <strong>Score Ranges:</strong> 90-100 (Excellent), 70-89 (Good), 60-69 (Fair), &lt;60 (Needs Improvement)
            </p>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}

