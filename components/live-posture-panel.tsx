"use client";

import { Video, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLivePosture } from "@/lib/hooks/use-live-posture";
import { useOrgUserSelection } from "@/lib/hooks/use-org-user-selection";
import { cn } from "@/lib/utils";

export function LivePosturePanel() {
  const { orgId, userId } = useOrgUserSelection();
  const { data: posture, isLoading } = useLivePosture(orgId, userId);

  if (isLoading || !posture) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Posture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
    );
  }

  const status =
    posture.postureScore >= 80
      ? { label: "Good", variant: "default" as const }
      : posture.postureScore >= 60
        ? { label: "Fair", variant: "secondary" as const }
        : { label: "Slouch", variant: "destructive" as const };

  const tip =
    posture.postureScore >= 80
      ? "Great posture! Keep it up."
      : posture.postureScore >= 60
        ? "Tip: Bring your ears over your shoulders."
        : "Tip: Sit up straight and align your spine.";

  return (
    <Card className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm hover:shadow-md transition">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-medium text-slate-800">Live Posture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mock webcam visual */}
        <div className="relative h-56 w-full rounded-2xl bg-white flex items-center justify-center border border-slate-200 mx-auto max-w-md">
          <Video className="h-12 w-12 text-slate-400" />
          <div className="absolute bottom-3 right-3 text-xs text-slate-500 bg-white/90 px-2 py-1 rounded-md border border-slate-200">
            Mock Camera Feed
          </div>
        </div>

        {/* Score display */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-light text-slate-900 mb-2">{posture.postureScore}</div>
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

        {/* Tip */}
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <AlertCircle className="h-5 w-5 mt-0.5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-slate-600">{tip}</p>
        </div>
      </CardContent>
    </Card>
  );
}

