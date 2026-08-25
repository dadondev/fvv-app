import { UserStats, Achievement, FriendRequest, FriendActivity, LeaderboardUser, Unit, GoBagItem, Question } from '../types';

export const initialUserStats: UserStats = {
  name: 'Alex Mercer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  title: 'Senior Safety Scout',
  joinedDate: 'Joined October 2023',
  totalXp: 4250,
  dayStreak: 14,
  league: 'Gold',
  hearts: 5,
  maxHearts: 5,
};

export const initialAchievements: Achievement[] = [
  {
    id: 'fire-fighter',
    title: 'Fire Fighter',
    description: 'Completed all fire safety modules.',
    iconType: 'fire',
    completed: true,
  },
  {
    id: 'earthquake-expert',
    title: 'Earthquake Expert',
    description: 'Mastered structural safety protocols.',
    iconType: 'earthquake',
    completed: true,
  },
  {
    id: 'first-aid-hero',
    title: 'First Aid Hero',
    description: 'Finish the advanced medical course.',
    iconType: 'firstaid',
    completed: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: 'go-bag-master',
    title: 'Go-Bag Specialist',
    description: 'Pack 100% of essential emergency supplies.',
    iconType: 'bag',
    completed: false,
    progress: 6,
    maxProgress: 10,
  },
  {
    id: 'speed-demon',
    title: 'Lightning Responder',
    description: 'Complete 3 timed drills under 45 seconds.',
    iconType: 'speed',
    completed: true,
  },
];

export const initialFriendRequests: FriendRequest[] = [
  {
    id: 'req-1',
    name: 'Elena R.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    level: 'Lvl 4 Rescuer',
    status: 'pending',
  },
  {
    id: 'req-2',
    name: 'Timur M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    level: 'Lvl 2 Novice',
    status: 'pending',
  },
];

export const initialFriendActivity: FriendActivity[] = [
  {
    id: 'act-1',
    name: 'Safi T.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    action: 'just completed Earthquake Basics!',
    timestamp: '2 hours ago',
    xpEarned: 50,
  },
  {
    id: 'act-2',
    name: 'Zara K.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    action: 'started a 7 Day Streak!',
    timestamp: 'Yesterday',
    streakDays: 7,
    highFived: false,
  },
  {
    id: 'act-3',
    name: 'Dilshod U.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    action: 'passed Fire Extinguisher Drill!',
    timestamp: '2 days ago',
    xpEarned: 75,
  },
];

export const weeklyLeaderboard: LeaderboardUser[] = [
  {
    id: 'user-1',
    rank: 1,
    name: 'Alijon R.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 1250,
  },
  {
    id: 'user-2',
    rank: 2,
    name: 'Madina T.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    xp: 1100,
  },
  {
    id: 'user-3',
    rank: 3,
    name: 'Jasur K.',
    avatar: '',
    xp: 950,
  },
  {
    id: 'user-4',
    rank: 4,
    name: 'Zarina M.',
    avatar: '',
    xp: 820,
  },
  {
    id: 'user-5',
    rank: 5,
    name: 'Bobur S.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    xp: 780,
  },
  {
    id: 'user-6',
    rank: 6,
    name: 'Shahzoda O.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    xp: 720,
  },
  {
    id: 'user-7',
    rank: 7,
    name: 'Daler F.',
    avatar: '',
    xp: 690,
  },
  {
    id: 'user-12',
    rank: 12,
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    xp: 450,
    isCurrentUser: true,
  },
];

export const allTimeLeaderboard: LeaderboardUser[] = [
  {
    id: 'at-1',
    rank: 1,
    name: 'Safiya T.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    xp: 4520,
  },
  {
    id: 'at-2',
    rank: 2,
    name: 'Timur A.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    xp: 4100,
  },
  {
    id: 'at-3',
    rank: 3,
    name: 'Alex Mercer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    xp: 4250,
    isCurrentUser: true,
  },
  {
    id: 'at-4',
    rank: 4,
    name: 'Alijon R.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    xp: 3890,
  },
  {
    id: 'at-5',
    rank: 5,
    name: 'Elena R.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    xp: 3600,
  },
];

export const initialGoBagItems: GoBagItem[] = [
  { id: 'gb-1', name: 'Clean Bottled Water (3 Gallons)', category: 'water', checked: true, essential: true },
  { id: 'gb-2', name: 'Non-perishable Canned Foods & Energy Bars', category: 'food', checked: true, essential: true },
  { id: 'gb-3', name: 'Comprehensive First Aid Medical Kit', category: 'firstaid', checked: true, essential: true },
  { id: 'gb-4', name: 'Multi-tool & Can Opener', category: 'tools', checked: true, essential: true },
  { id: 'gb-5', name: 'Emergency Whistle (120dB)', category: 'tools', checked: true, essential: true },
  { id: 'gb-6', name: 'Heavy-duty Flashlight & Extra Batteries', category: 'tools', checked: true, essential: true },
  { id: 'gb-7', name: 'Waterproof Copies of Passports & IDs', category: 'documents', checked: false, essential: true },
  { id: 'gb-8', name: 'Thermal Mylar Emergency Blankets', category: 'warmth', checked: false, essential: true },
  { id: 'gb-9', name: 'N95 / FFP2 Dust Masks (Pack of 4)', category: 'tools', checked: false, essential: true },
  { id: 'gb-10', name: 'Portable Power Bank with Charging Cables', category: 'tools', checked: false, essential: false },
];

export const sampleQuestions: Question[] = [
  {
    id: 'q-1',
    topic: 'Earthquake Safety',
    title: 'Earthquake Protocol',
    prompt: 'What is the first thing you should do during an earthquake?',
    explanation: 'The internationally recognized best practice is "Drop, Cover, and Hold on" beneath sturdy furniture to protect from falling debris.',
    tip: 'Avoid windows, heavy cabinets, and outdoor electrical cables.',
    options: [
      { id: 'opt-1', text: 'Run outside immediately', icon: 'person', isCorrect: false },
      { id: 'opt-2', text: 'Drop, Cover, and Hold on', icon: 'cover', isCorrect: true },
      { id: 'opt-3', text: 'Stand in a doorway', icon: 'door', isCorrect: false },
    ],
  },
  {
    id: 'q-2',
    topic: 'Earthquake Evacuation',
    title: 'High-Rise Evacuation',
    prompt: 'When evacuating a multi-story building after shaking stops, you should:',
    explanation: 'Always use emergency stairs. Elevators may lose electrical power or experience cable jamming.',
    options: [
      { id: 'opt-4', text: 'Take the fastest elevator', icon: 'elevator', isCorrect: false },
      { id: 'opt-5', text: 'Use the interior stairs calmly', icon: 'stairs', isCorrect: true },
      { id: 'opt-6', text: 'Jump from the first balcony', icon: 'run', isCorrect: false },
    ],
  },
  {
    id: 'q-3',
    topic: 'Fire Safety',
    title: 'Fire Extinguisher P.A.S.S.',
    prompt: 'What does the "P" in the fire extinguisher P.A.S.S. acronym stand for?',
    explanation: 'P.A.S.S. stands for: Pull the pin, Aim at the base of the fire, Squeeze the lever, and Sweep side to side.',
    options: [
      { id: 'opt-7', text: 'Pull the pin', icon: 'fire', isCorrect: true },
      { id: 'opt-8', text: 'Push the nozzle', icon: 'tools', isCorrect: false },
      { id: 'opt-9', text: 'Power on the valve', icon: 'person', isCorrect: false },
    ],
  },
  {
    id: 'q-4',
    topic: 'First Aid',
    title: 'Severe Bleeding Control',
    prompt: 'What is the most effective immediate action for severe external bleeding?',
    explanation: 'Apply firm, continuous direct pressure with a clean cloth or sterile dressing directly over the wound.',
    options: [
      { id: 'opt-10', text: 'Wash with warm soapy water', icon: 'water', isCorrect: false },
      { id: 'opt-11', text: 'Apply firm direct pressure', icon: 'firstaid', isCorrect: true },
      { id: 'opt-12', text: 'Elevate feet without touching wound', icon: 'person', isCorrect: false },
    ],
  },
  {
    id: 'q-5',
    topic: 'Emergency Communication',
    title: 'Emergency Service Number',
    prompt: 'In Uzbekistan, what is the unified emergency telephone number for the Ministry of Emergency Situations (FVV)?',
    explanation: '1050 connects directly to the Rescue Service of the Ministry of Emergency Situations (FVV). 112 is also supported as the unified helpline.',
    options: [
      { id: 'opt-13', text: '1050 (Rescue Service / FVV)', icon: 'phone', isCorrect: true },
      { id: 'opt-14', text: '000 (General Info)', icon: 'phone', isCorrect: false },
      { id: 'opt-15', text: '999 (Weather)', icon: 'phone', isCorrect: false },
    ],
  },
];

export const initialUnits: Unit[] = [
  {
    id: 1,
    unitNumber: 1,
    title: 'Unit 1',
    subtitle: 'Earthquake Basics',
    color: '#2b6c00',
    guidebook: {
      title: 'Earthquake Safety & Structural Preparedness Guide',
      summary: 'Essential procedures before, during, and after seismic events in high-density urban areas.',
      keyPoints: [
        {
          title: 'Drop, Cover, and Hold On',
          desc: 'Drop onto hands and knees. Cover your head and neck under a sturdy table. Hold on until shaking ceases.',
          icon: '🛡️',
        },
        {
          title: 'Indoor Danger Zones',
          desc: 'Stay away from glass windows, exterior walls, unanchored heavy furniture, and pendant lights.',
          icon: '⚠️',
        },
        {
          title: 'Gas and Electricity Shutoff',
          desc: 'Know the location of your main gas shutoff valve and circuit breaker panel.',
          icon: '⚡',
        },
      ],
      dosAndDonts: [
        { do: 'Drop to knees and protect neck with arms', dont: 'Do not run outside while walls and glass are falling' },
        { do: 'Take stairs when evacuating buildings', dont: 'Never enter or use elevators during an emergency' },
        { do: 'Check yourself and neighbors for injuries', dont: 'Do not light matches or candles if gas may have leaked' },
      ],
      emergencyNumbers: [
        { service: 'FVV Emergency Rescue Service', number: '1050' },
        { service: 'Fire & Rescue Service', number: '101' },
        { service: 'Emergency Ambulance', number: '103' },
        { service: 'Gas Emergency Service', number: '104' },
      ],
    },
    nodes: [
      {
        id: 'node-1-1',
        unitId: 1,
        nodeIndex: 0,
        type: 'lesson',
        title: 'Earthquake Immediate Action',
        status: 'completed',
        iconType: 'check',
        questions: [sampleQuestions[0]],
      },
      {
        id: 'node-1-2',
        unitId: 1,
        nodeIndex: 1,
        type: 'lesson',
        title: 'Drop, Cover & Safe Zones',
        status: 'active',
        progressPercent: 50,
        iconType: 'person',
        questions: [sampleQuestions[0], sampleQuestions[1]],
      },
      {
        id: 'node-1-3',
        unitId: 1,
        nodeIndex: 2,
        type: 'drill',
        title: 'Building Evacuation Drill',
        status: 'locked',
        iconType: 'run',
        questions: [sampleQuestions[1], sampleQuestions[4]],
      },
      {
        id: 'node-1-4',
        unitId: 1,
        nodeIndex: 3,
        type: 'checkpoint',
        title: '72-Hour Go-Bag Essentials',
        status: 'locked',
        iconType: 'bag',
        questions: [sampleQuestions[4], sampleQuestions[3]],
      },
      {
        id: 'node-1-5',
        unitId: 1,
        nodeIndex: 4,
        type: 'reward',
        title: 'Unit 1 Mastery Treasure Chest',
        status: 'locked',
        iconType: 'chest',
        questions: [],
      },
    ],
  },
  {
    id: 2,
    unitNumber: 2,
    title: 'Unit 2',
    subtitle: 'Fire Safety & Prevention',
    color: '#ea580c',
    guidebook: {
      title: 'Fire Prevention & Smoke Evacuation Protocol',
      summary: 'Learn P.A.S.S. fire extinguishing methods, smoke crawling techniques, and escape path planning.',
      keyPoints: [
        { title: 'P.A.S.S. Method', desc: 'Pull, Aim at base, Squeeze, Sweep.', icon: '🧯' },
        { title: 'Stay Low in Smoke', desc: 'Toxic smoke rises. Crawl beneath the smoke level.', icon: '💨' },
        { title: 'Feel Doors Before Opening', desc: 'Use back of hand to test door knobs for heat.', icon: '🚪' },
      ],
      dosAndDonts: [
        { do: 'Crawl low on hands and knees under smoke', dont: 'Never stand tall in a smoke-filled room' },
        { do: 'Close doors behind you to slow fire spread', dont: 'Do not re-enter a burning structure for belongings' },
      ],
      emergencyNumbers: [
        { service: 'Fire Rescue Dispatch', number: '101' },
        { service: 'Unified Emergency Helpline', number: '112' },
      ],
    },
    nodes: [
      {
        id: 'node-2-1',
        unitId: 2,
        nodeIndex: 0,
        type: 'lesson',
        title: 'Extinguisher Basics',
        status: 'locked',
        iconType: 'person',
        questions: [sampleQuestions[2]],
      },
      {
        id: 'node-2-2',
        unitId: 2,
        nodeIndex: 1,
        type: 'drill',
        title: 'Smoke Escape Drill',
        status: 'locked',
        iconType: 'run',
        questions: [sampleQuestions[2], sampleQuestions[4]],
      },
    ],
  },
];
