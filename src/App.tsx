import React, { useState, useEffect } from 'react';
import { TabType, Unit, PathNode, Question, GoBagItem, UserStats } from './types';
import {
  initialUserStats,
  initialAchievements,
  initialFriendRequests,
  initialFriendActivity,
  weeklyLeaderboard,
  allTimeLeaderboard,
  initialGoBagItems,
  initialUnits,
  sampleQuestions,
} from './data/mockData';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { LearnScreen } from './components/LearnScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QuizModal } from './components/QuizModal';
import { GuidebookModal } from './components/GuidebookModal';
import { GoBagModal } from './components/GoBagModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('learn');

  // App State
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('eh_user_stats');
    return saved ? JSON.parse(saved) : initialUserStats;
  });

  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem('eh_units');
    return saved ? JSON.parse(saved) : initialUnits;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('eh_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [friendActivities, setFriendActivities] = useState(initialFriendActivity);
  const [goBagItems, setGoBagItems] = useState<GoBagItem[]>(() => {
    const saved = localStorage.getItem('eh_gobag');
    return saved ? JSON.parse(saved) : initialGoBagItems;
  });

  // Modal states
  const [activeGuidebookUnit, setActiveGuidebookUnit] = useState<Unit | null>(null);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<Question[] | null>(null);
  const [quizTitle, setQuizTitle] = useState('Safety Drill');
  const [quizIsTimed, setQuizIsTimed] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showGoBagModal, setShowGoBagModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('eh_user_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('eh_units', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('eh_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('eh_gobag', JSON.stringify(goBagItems));
  }, [goBagItems]);

  // Quiz Handling
  const handleStartNode = (node: PathNode) => {
    if (node.status === 'locked') return;
    setActiveNodeId(node.id);
    setQuizTitle(node.title);
    setQuizIsTimed(node.type === 'drill');
    setActiveQuizQuestions(node.questions.length > 0 ? node.questions : sampleQuestions);
  };

  const handleStartTimedDrill = () => {
    setActiveNodeId(null);
    setQuizTitle('Timed Emergency Drill');
    setQuizIsTimed(true);
    // Shuffle all questions for timed drill
    const shuffled = [...sampleQuestions].sort(() => Math.random() - 0.5);
    setActiveQuizQuestions(shuffled);
  };

  const handleStartWeakSkills = () => {
    setActiveNodeId(null);
    setQuizTitle('Weak Skills Focused Practice');
    setQuizIsTimed(false);
    setActiveQuizQuestions(sampleQuestions.slice(1, 4));
  };

  const handleStartMistakesReview = () => {
    setActiveNodeId(null);
    setQuizTitle('Mistakes Review Practice');
    setQuizIsTimed(false);
    setActiveQuizQuestions([sampleQuestions[0], sampleQuestions[2], sampleQuestions[4]]);
  };

  const handleQuizComplete = (xpGained: number, correctCount: number) => {
    // Update XP
    setStats((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xpGained,
    }));

    // If completed a specific path node, advance progress
    if (activeNodeId) {
      setUnits((prevUnits) =>
        prevUnits.map((u) => ({
          ...u,
          nodes: u.nodes.map((n, idx) => {
            if (n.id === activeNodeId) {
              return { ...n, status: 'completed', progressPercent: 100 };
            }
            // Unlock next node
            const prevNode = u.nodes[idx - 1];
            if (prevNode && prevNode.id === activeNodeId && n.status === 'locked') {
              return { ...n, status: 'active', progressPercent: 50 };
            }
            return n;
          }),
        }))
      );
    }

    setActiveQuizQuestions(null);
  };

  // Friend actions
  const handleAcceptFriendRequest = (id: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRejectFriendRequest = (id: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleHighFive = (id: string) => {
    setFriendActivities((prev) =>
      prev.map((act) => (act.id === id ? { ...act, highFived: true } : act))
    );
  };

  const handleResetProgress = () => {
    localStorage.clear();
    setStats(initialUserStats);
    setUnits(initialUnits);
    setAchievements(initialAchievements);
    setGoBagItems(initialGoBagItems);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] flex flex-col font-sans selection:bg-[#58cc02] selection:text-white">
      {/* Top Header Navigation */}
      <TopHeader
        stats={stats}
        onOpenSettings={() => setShowSettingsModal(true)}
        showDetails={currentTab === 'learn' || currentTab === 'practice'}
      />

      {/* Main Screen Content */}
      <main className="flex-1 w-full max-w-lg mx-auto">
        {currentTab === 'learn' && (
          <LearnScreen
            units={units}
            activeUnitIndex={0}
            onOpenGuidebook={(unit) => setActiveGuidebookUnit(unit)}
            onStartNode={handleStartNode}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeScreen
            goBagItems={goBagItems}
            topResponders={weeklyLeaderboard}
            onStartTimedDrill={handleStartTimedDrill}
            onStartWeakSkills={handleStartWeakSkills}
            onStartMistakesReview={handleStartMistakesReview}
            onOpenGoBag={() => setShowGoBagModal(true)}
            onViewAllLeaderboard={() => setCurrentTab('leaderboard')}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardScreen
            weeklyUsers={weeklyLeaderboard}
            allTimeUsers={allTimeLeaderboard}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            stats={stats}
            achievements={achievements}
            friendRequests={friendRequests}
            friendActivities={friendActivities}
            onAcceptFriendRequest={handleAcceptFriendRequest}
            onRejectFriendRequest={handleRejectFriendRequest}
            onHighFive={handleHighFive}
          />
        )}
      </main>

      {/* Bottom Sticky Tab Bar */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Modals & Overlays */}
      {activeQuizQuestions && (
        <QuizModal
          questions={activeQuizQuestions}
          title={quizTitle}
          isTimed={quizIsTimed}
          onComplete={handleQuizComplete}
          onClose={() => setActiveQuizQuestions(null)}
        />
      )}

      {activeGuidebookUnit && (
        <GuidebookModal
          unit={activeGuidebookUnit}
          onClose={() => setActiveGuidebookUnit(null)}
        />
      )}

      {showGoBagModal && (
        <GoBagModal
          items={goBagItems}
          onUpdateItems={(updated) => setGoBagItems(updated)}
          onClose={() => setShowGoBagModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}
