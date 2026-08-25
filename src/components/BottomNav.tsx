import React from 'react';
import { GraduationCap, Dumbbell, BarChart3, User } from 'lucide-react';
import { TabType } from '../types';
import { playTapSound } from '../utils/audio';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'learn', label: 'LEARN', icon: GraduationCap },
    { id: 'practice', label: 'PRACTICE', icon: Dumbbell },
    { id: 'leaderboard', label: 'LEADERBOARD', icon: BarChart3 },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f9] border-t-2 border-[#e5e5e5] shadow-lg">
      <div className="max-w-lg mx-auto grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => {
                playTapSound();
                onSelectTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center pt-1 transition-all select-none cursor-pointer ${
                isActive ? 'bg-[#f0f4eb]/60 text-[#2b6c00]' : 'text-[#6f7b64] hover:text-[#2b6c00]/80'
              }`}
            >
              {/* Active Top Line Indicator */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#2b6c00] rounded-b-sm" />
              )}

              <Icon
                className={`w-6 h-6 transition-transform ${
                  isActive ? 'scale-110 text-[#2b6c00] stroke-[2.5]' : 'stroke-[2]'
                }`}
              />

              <span
                className={`text-[11px] font-extrabold tracking-wider mt-1 ${
                  isActive ? 'text-[#2b6c00]' : 'text-[#6f7b64]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
