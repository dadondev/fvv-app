import React from 'react';
import { Flame, Heart, Shield, Settings } from 'lucide-react';
import { UserStats } from '../types';
import { playTapSound } from '../utils/audio';

interface TopHeaderProps {
  stats: UserStats;
  onOpenSettings: () => void;
  showDetails?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  stats,
  onOpenSettings,
  showDetails = true,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fbf9f9]/95 backdrop-blur-sm border-b-2 border-[#e5e5e5] px-4 py-2.5 transition-all">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Left side: Flame or Logo */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-[#2b6c00] font-black text-xl tracking-tight gap-1.5">
            <Flame className="w-6 h-6 text-[#2b6c00] fill-[#2b6c00]" />
            <span className="text-[#2b6c00] font-extrabold text-[17px] sm:text-lg">
              Favqulodda Vaziyatlar
            </span>
          </div>
        </div>

        {/* Right side: Stats & Settings */}
        <div className="flex items-center gap-2">
          {showDetails && (
            <div className="hidden sm:flex items-center gap-3 mr-2 bg-[#efeded] px-3 py-1 rounded-full border border-[#dbdad9]">
              {/* Hearts */}
              <div className="flex items-center gap-1 text-[#ba1a1a] font-bold text-sm">
                <Heart className="w-4 h-4 fill-[#ba1a1a]" />
                <span>{stats.hearts}</span>
              </div>
              {/* Streak */}
              <div className="flex items-center gap-1 text-[#fd9500] font-bold text-sm">
                <Flame className="w-4 h-4 fill-[#fd9500]" />
                <span>{stats.dayStreak}</span>
              </div>
              {/* XP Shield */}
              <div className="flex items-center gap-1 text-[#2b6c00] font-bold text-sm">
                <Shield className="w-4 h-4 fill-[#2b6c00]" />
                <span>{stats.totalXp}</span>
              </div>
            </div>
          )}

          <button
            id="settings-button"
            onClick={() => {
              playTapSound();
              onOpenSettings();
            }}
            aria-label="Settings"
            className="p-2 rounded-xl text-[#3f4a36] hover:bg-[#e9e8e7] active:scale-95 transition-all cursor-pointer"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Mini Stats Strip (if on Learn page matching Image 5) */}
      {showDetails && (
        <div className="sm:hidden flex items-center justify-center gap-6 pt-1 text-sm font-black border-t border-[#e5e5e5]/60 mt-1.5">
          <div className="flex items-center gap-1.5 text-[#ba1a1a]">
            <Heart className="w-4 h-4 fill-[#ba1a1a]" />
            <span>{stats.hearts}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#fd9500]">
            <Flame className="w-4 h-4 fill-[#fd9500]" />
            <span>{stats.dayStreak}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#2b6c00]">
            <Shield className="w-4 h-4 fill-[#2b6c00]" />
            <span>{stats.totalXp}</span>
          </div>
        </div>
      )}
    </header>
  );
};
