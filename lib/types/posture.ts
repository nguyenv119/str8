export interface User {
  id: string;
  name: string;
  email: string;
  organizationId: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
}

export interface PostureSample {
  timestamp: string;
  postureScore: number; // 0-100
  slouch: boolean;
}

export interface DailySummary {
  date: string;
  avgScore: number;
  slouchEvents: number;
  goodPostureMinutes: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avgScore: number;
  improvementPercent: number;
}

