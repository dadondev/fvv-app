export type TabType = 'learn' | 'practice' | 'leaderboard' | 'profile';
export type ProfileSubTab = 'profile' | 'friends';
export type LeaderboardPeriod = 'weekly' | 'all-time';

export interface UserStats {
  name: string;
  avatar: string;
  title: string;
  joinedDate: string;
  totalXp: number;
  dayStreak: number;
  league: string;
  hearts: number;
  maxHearts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconType: 'fire' | 'earthquake' | 'firstaid' | 'bag' | 'speed';
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  level: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface FriendActivity {
  id: string;
  name: string;
  avatar: string;
  action: string;
  timestamp: string;
  xpEarned?: number;
  streakDays?: number;
  highFived?: boolean;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
  icon?: 'person' | 'cover' | 'door' | 'fire' | 'phone' | 'water' | 'stairs' | 'elevator' | 'run' | 'tools' | 'firstaid';
  isCorrect: boolean;
}

export interface Question {
  id: string;
  topic: string;
  title: string;
  prompt: string;
  options: QuestionOption[];
  explanation: string;
  tip?: string;
}

export interface PathNode {
  id: string;
  unitId: number;
  nodeIndex: number;
  type: 'lesson' | 'checkpoint' | 'drill' | 'reward';
  title: string;
  status: 'completed' | 'active' | 'locked';
  progressPercent?: number;
  iconType: 'check' | 'person' | 'run' | 'bag' | 'chest';
  questions: Question[];
}

export interface Unit {
  id: number;
  unitNumber: number;
  title: string;
  subtitle: string;
  color: string;
  guidebook: {
    title: string;
    summary: string;
    keyPoints: { title: string; desc: string; icon: string }[];
    dosAndDonts: { do: string; dont: string }[];
    emergencyNumbers: { service: string; number: string }[];
  };
  nodes: PathNode[];
}

export interface GoBagItem {
  id: string;
  name: string;
  category: 'water' | 'food' | 'firstaid' | 'tools' | 'documents' | 'warmth';
  checked: boolean;
  essential: boolean;
}
