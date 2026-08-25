import React, { useState } from 'react';
import { User, Trophy, Medal, Flame } from 'lucide-react';
import { LeaderboardUser, LeaderboardPeriod } from '../types';
import { playTapSound } from '../utils/audio';

interface LeaderboardScreenProps {
  weeklyUsers: LeaderboardUser[];
  allTimeUsers: LeaderboardUser[];
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  weeklyUsers,
  allTimeUsers,
}) => {
  const [period, setPeriod] = useState<LeaderboardPeriod>('weekly');

  const currentList = period === 'weekly' ? weeklyUsers : allTimeUsers;

  return (
    <div className="pb-24 pt-3 max-w-lg mx-auto px-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-center text-[#1b1c1c] tracking-tight mb-4">
        Top Responders
      </h1>

      {/* Segmented Filter Pills (matching Image 14) */}
      <div className="bg-[#e9e8e7] p-1.5 rounded-2xl flex items-center gap-2 max-w-xs mx-auto mb-6">
        <button
          id="period-weekly-btn"
          onClick={() => {
            playTapSound();
            setPeriod('weekly');
          }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer select-none ${
            period === 'weekly'
              ? 'bg-[#1e7e16] text-white shadow-sm'
              : 'text-[#3f4a36] hover:text-[#1b1c1c]'
          }`}
        >
          Weekly
        </button>

        <button
          id="period-alltime-btn"
          onClick={() => {
            playTapSound();
            setPeriod('all-time');
          }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer select-none ${
            period === 'all-time'
              ? 'bg-[#1e7e16] text-white shadow-sm'
              : 'text-[#3f4a36] hover:text-[#1b1c1c]'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Leaderboard Cards List (matching Image 14) */}
      <div className="space-y-3">
        {currentList.map((user) => {
          let leftBorderColor = 'border-l-[#becbb1]';
          let rankColor = 'text-[#6f7b64]';

          if (user.rank === 1) {
            leftBorderColor = 'border-l-[#fd9500]';
            rankColor = 'text-[#fd9500]';
          } else if (user.rank === 2) {
            leftBorderColor = 'border-l-[#1cb0f6]';
            rankColor = 'text-[#1cb0f6]';
          } else if (user.rank === 3) {
            leftBorderColor = 'border-l-[#ea7e00]';
            rankColor = 'text-[#ea7e00]';
          }

          if (user.isCurrentUser) {
            return (
              <div
                key={user.id}
                className="bg-[#d7ffb8] border-2 border-[#58cc02] border-l-8 border-l-[#2b6c00] rounded-2xl p-4 flex items-center justify-between shadow-sm mt-4"
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-black text-lg text-[#1e5000] w-6 text-center">
                    {user.rank}
                  </span>
                  <div className="w-11 h-11 rounded-full border-2 border-[#2b6c00] overflow-hidden bg-white flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-[#2b6c00]" />
                    )}
                  </div>
                  <span className="font-black text-base text-[#1e5000]">You</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-base text-[#1e5000]">
                    {user.xp.toLocaleString()} <span className="text-xs">XP</span>
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={user.id}
              className={`bg-white border-2 border-[#e5e5e5] border-l-8 ${leftBorderColor} rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`font-black text-lg ${rankColor} w-6 text-center`}>
                  {user.rank}
                </span>

                {/* Avatar with circle border */}
                <div className="w-11 h-11 rounded-full border-2 border-[#dbdad9] overflow-hidden bg-[#f5f3f3] flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-[#a3a3a3]" />
                  )}
                </div>

                <span className="font-extrabold text-base text-[#1b1c1c]">{user.name}</span>
              </div>

              <div className="text-right">
                <span className="font-black text-base text-[#58cc02]">
                  {user.xp.toLocaleString()} <span className="text-xs font-bold">XP</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
