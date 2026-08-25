import React from 'react';
import { Play, Clock, TrendingUp, ListChecks, ShoppingBag, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { Mascot } from './Mascot';
import { GoBagItem, LeaderboardUser } from '../types';
import { playTapSound } from '../utils/audio';

interface PracticeScreenProps {
  goBagItems: GoBagItem[];
  topResponders: LeaderboardUser[];
  onStartTimedDrill: () => void;
  onStartWeakSkills: () => void;
  onStartMistakesReview: () => void;
  onOpenGoBag: () => void;
  onViewAllLeaderboard: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  goBagItems,
  topResponders,
  onStartTimedDrill,
  onStartWeakSkills,
  onStartMistakesReview,
  onOpenGoBag,
  onViewAllLeaderboard,
}) => {
  const packedCount = goBagItems.filter((i) => i.checked).length;
  const readinessPercent = Math.round((packedCount / Math.max(1, goBagItems.length)) * 100);

  return (
    <div className="pb-24 pt-3 max-w-lg mx-auto px-4 space-y-4">
      {/* Top Welcome / Mascot Card (matching Image 1) */}
      <div className="bg-[#efeded] border-2 border-[#dbdad9] rounded-3xl p-5 text-center flex flex-col items-center justify-center shadow-sm">
        <div className="bg-white p-3 rounded-2xl border-2 border-[#e5e5e5] shadow-xs mb-3 flex items-center justify-center">
          <Mascot size="md" showLabel={true} expression="waving" />
        </div>
        <h2 className="text-lg font-black text-[#1b1c1c]">Time to Drill!</h2>
        <p className="text-sm font-semibold text-[#3f4a36] mt-0.5">
          Keep your skills sharp and ready.
        </p>
      </div>

      {/* Blue Card: Timed Challenge (matching Image 1) */}
      <div className="card-3d-cyan rounded-3xl p-5 text-white relative overflow-hidden shadow-md">
        {/* Clock Watermark Graphic on Right */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 border-[12px] border-white/20 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-12 bg-white/20 absolute -top-4" />
          <div className="w-2 h-14 bg-white/20 origin-bottom transform rotate-45" />
        </div>

        {/* Speedometer Badge Icon */}
        <div className="w-11 h-11 rounded-full bg-white text-[#006590] flex items-center justify-center mb-3 shadow-xs">
          <Clock className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-black tracking-tight">Timed Challenge</h3>
        <p className="text-sm font-medium text-white/95 leading-relaxed mt-1 max-w-[280px]">
          Race against the clock in simulated emergency scenarios. Earn double points!
        </p>

        <div className="mt-5">
          <button
            id="start-timed-drill-btn"
            onClick={() => {
              playTapSound();
              onStartTimedDrill();
            }}
            className="btn-3d-white text-[#006590] font-black text-sm px-6 py-3 rounded-2xl flex items-center gap-2 cursor-pointer select-none"
          >
            <span>START DRILL</span>
            <Play className="w-4 h-4 fill-[#006590]" />
          </button>
        </div>
      </div>

      {/* Orange Card: Weak Skills (matching Image 1) */}
      <div
        onClick={() => {
          playTapSound();
          onStartWeakSkills();
        }}
        className="card-3d-orange rounded-3xl p-4 text-white flex items-center gap-4 cursor-pointer select-none transition-transform active:translate-y-[2px]"
      >
        <div className="w-12 h-12 rounded-2xl bg-white text-[#8c5000] flex items-center justify-center shrink-0 shadow-xs">
          <TrendingUp className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-lg font-black leading-tight">Weak Skills</h3>
          <p className="text-xs sm:text-sm font-semibold text-white/90 mt-0.5">
            Focus on areas needing improvement.
          </p>
        </div>
      </div>

      {/* Pink Card: Mistakes Review (matching Image 1) */}
      <div
        onClick={() => {
          playTapSound();
          onStartMistakesReview();
        }}
        className="card-3d-pink rounded-3xl p-4 text-[#ba1a1a] flex items-center gap-4 cursor-pointer select-none transition-transform active:translate-y-[2px]"
      >
        <div className="w-12 h-12 rounded-2xl bg-white text-[#ba1a1a] flex items-center justify-center shrink-0 border border-[#fca5a5] shadow-xs">
          <ListChecks className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-lg font-black leading-tight text-[#93000a]">Mistakes Review</h3>
          <p className="text-xs sm:text-sm font-semibold text-[#ba1a1a]/90 mt-0.5">
            Learn from past incorrect answers.
          </p>
        </div>
      </div>

      {/* Dark Green Card: Emergency Kits (matching Image 1) */}
      <div
        onClick={() => {
          playTapSound();
          onOpenGoBag();
        }}
        className="card-3d-green rounded-3xl p-5 text-white cursor-pointer select-none transition-transform active:translate-y-[2px]"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-black">Emergency Kits</h3>
            <p className="text-xs sm:text-sm font-semibold text-white/90 mt-0.5 max-w-[240px]">
              Checklists & essentials for your go-bag.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white text-[#1e7e16] flex items-center justify-center shrink-0 shadow-xs">
            <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          </div>
        </div>

        {/* Progress Bar with label */}
        <div className="mt-4 pt-1">
          <div className="bg-black/30 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-[#87fe45] rounded-full transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
          <div className="text-right text-xs font-black text-[#87fe45] mt-1.5">
            Kit Readiness: {readinessPercent}%
          </div>
        </div>
      </div>

      {/* Top Responders Preview Card (matching Image 1) */}
      <div className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-3xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#8c5000]" />
            <h3 className="text-base font-black text-[#1b1c1c]">Top Responders</h3>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onViewAllLeaderboard();
            }}
            className="text-xs font-extrabold text-[#2b6c00] hover:underline uppercase tracking-wider cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>

        <div className="space-y-2">
          {topResponders.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#f5f3f3] border-2 border-[#e5e5e5] rounded-2xl p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                    idx === 0
                      ? 'bg-[#fd9500] text-white'
                      : 'bg-[#dbdad9] text-[#1b1c1c]'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-sm font-extrabold text-[#1b1c1c]">{item.name}</span>
              </div>
              <span className="text-sm font-black text-[#2b6c00]">{item.xp.toLocaleString()} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
