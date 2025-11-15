import type {
  User,
  Organization,
  PostureSample,
  DailySummary,
  LeaderboardEntry,
} from "@/lib/types/posture";
import organizationsData from "@/lib/mock-data/organizations.json";
import usersData from "@/lib/mock-data/users.json";

const organizations = organizationsData as Organization[];
const users = usersData as User[];

// In-memory state for live posture simulation
let livePostureState: Record<string, { base: number; time: number }> = {};

// Generate realistic posture score using sine wave + noise
function generatePostureScore(userId: string): number {
  if (!livePostureState[userId]) {
    livePostureState[userId] = {
      base: 70 + Math.random() * 20, // Base score between 70-90
      time: Date.now(),
    };
  }

  const state = livePostureState[userId];
  const elapsed = (Date.now() - state.time) / 1000; // seconds
  const variation = Math.sin(elapsed / 10) * 10; // Slow sine wave
  const noise = (Math.random() - 0.5) * 5; // Random noise
  const score = Math.max(0, Math.min(100, state.base + variation + noise));

  return Math.round(score);
}

// Generate time-series data for a day
function generateDaySamples(
  userId: string,
  date: Date
): PostureSample[] {
  const samples: PostureSample[] = [];
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  // Generate samples every 5 minutes
  for (let i = 0; i < 288; i++) {
    const timestamp = new Date(startOfDay.getTime() + i * 5 * 60 * 1000);
    const hour = timestamp.getHours();

    // Simulate fatigue: lower scores in afternoon (2-5 PM)
    let baseScore = 75;
    if (hour >= 14 && hour < 17) {
      baseScore = 60;
    } else if (hour >= 17 && hour < 20) {
      baseScore = 65;
    }

    const variation = Math.sin((i / 288) * Math.PI * 2) * 10;
    const noise = (Math.random() - 0.5) * 8;
    const score = Math.max(0, Math.min(100, baseScore + variation + noise));
    const slouch = score < 60;

    samples.push({
      timestamp: timestamp.toISOString(),
      postureScore: Math.round(score),
      slouch,
    });
  }

  return samples;
}

export async function getOrganizations(): Promise<Organization[]> {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
  return organizations;
}

export async function getUsersForOrg(orgId: string): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return users.filter((u) => u.organizationId === orgId);
}

export async function getCurrentUser(): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem("selectedUserId");
  if (!userId) return null;

  return users.find((u) => u.id === userId) || null;
}

export async function getLivePosture(
  orgId: string,
  userId: string
): Promise<PostureSample> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const score = generatePostureScore(userId);
  const slouch = score < 60;

  return {
    timestamp: new Date().toISOString(),
    postureScore: score,
    slouch,
  };
}

export async function getTodayTimeline(
  orgId: string,
  userId: string
): Promise<PostureSample[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return generateDaySamples(userId, new Date());
}

export async function getWeeklySummary(
  orgId: string,
  userId: string
): Promise<DailySummary[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const summaries: DailySummary[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const samples = generateDaySamples(userId, date);

    const avgScore =
      samples.reduce((sum, s) => sum + s.postureScore, 0) / samples.length;
    const slouchEvents = samples.filter((s) => s.slouch).length;
    const goodPostureMinutes = samples.filter((s) => !s.slouch).length * 5;

    summaries.push({
      date: date.toISOString().split("T")[0],
      avgScore: Math.round(avgScore * 10) / 10,
      slouchEvents,
      goodPostureMinutes,
    });
  }

  return summaries;
}

export async function getOrgLeaderboard(
  orgId: string
): Promise<LeaderboardEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const orgUsers = users.filter((u) => u.organizationId === orgId);

  const entries: LeaderboardEntry[] = orgUsers.map((user) => {
    // Generate consistent scores per user
    const seed = user.id.charCodeAt(0) + user.id.charCodeAt(user.id.length - 1);
    const baseScore = 60 + (seed % 30);
    const improvement = (Math.random() - 0.3) * 20; // -6% to +14%

    return {
      userId: user.id,
      name: user.name,
      avgScore: Math.round(baseScore * 10) / 10,
      improvementPercent: Math.round(improvement * 10) / 10,
    };
  });

  // Sort by avgScore descending
  entries.sort((a, b) => b.avgScore - a.avgScore);

  return entries;
}

export async function sendSlackCongrats(
  orgId: string,
  userIds: string[]
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`[Mock] Sending Slack congrats to users:`, userIds);
  // In production, this would call a real Slack webhook
}

