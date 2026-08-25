import React, { useState } from 'react';
import {
  Calendar,
  Zap,
  Flame,
  Shield,
  Check,
  Lock,
  Search,
  CheckCircle2,
  X,
  Heart,
  UserPlus,
  Star,
  Award,
  Sparkles,
} from 'lucide-react';
import { UserStats, Achievement, FriendRequest, FriendActivity, ProfileSubTab } from '../types';
import { Mascot } from './Mascot';
import { playTapSound, playCorrectSound } from '../utils/audio';

interface ProfileScreenProps {
  stats: UserStats;
  achievements: Achievement[];
  friendRequests: FriendRequest[];
  friendActivities: FriendActivity[];
  onAcceptFriendRequest: (id: string) => void;
  onRejectFriendRequest: (id: string) => void;
  onHighFive: (id: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  stats,
  achievements,
  friendRequests,
  friendActivities,
  onAcceptFriendRequest,
  onRejectFriendRequest,
  onHighFive,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ProfileSubTab>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const pendingRequests = friendRequests.filter((r) => r.status === 'pending');

  const filteredActivities = friendActivities.filter((act) =>
    act.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 pt-3 max-w-lg mx-auto px-4">
      {/* User Header Profile Card (matching Image 16) */}
      {activeSubTab === 'profile' && (
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar with Double Ring */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#becbb1] p-1 bg-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={stats.avatar}
              alt={stats.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1b1c1c] leading-tight">
              {stats.name}
            </h1>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6f7b64] mt-1">
              <Calendar className="w-4 h-4" />
              <span>{stats.joinedDate}</span>
            </div>
          </div>
        </div>
      )}

      {/* Segmented Toggle Pills: [Profile] [Friends] (matching Image 16 and Image 3) */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          id="profile-subtab-profile"
          onClick={() => {
            playTapSound();
            setActiveSubTab('profile');
          }}
          className={`py-3 rounded-2xl font-black text-sm transition-all cursor-pointer select-none ${
            activeSubTab === 'profile'
              ? 'bg-white border-2 border-[#2b6c00] border-b-4 border-b-[#1e5000] text-[#2b6c00] shadow-xs'
              : 'bg-[#efeded] border-2 border-[#dbdad9] text-[#6f7b64] hover:bg-[#e9e8e7]'
          }`}
        >
          Profile
        </button>

        <button
          id="profile-subtab-friends"
          onClick={() => {
            playTapSound();
            setActiveSubTab('friends');
          }}
          className={`py-3 rounded-2xl font-black text-sm transition-all cursor-pointer select-none relative ${
            activeSubTab === 'friends'
              ? 'bg-white border-2 border-[#2b6c00] border-b-4 border-b-[#1e5000] text-[#2b6c00] shadow-xs'
              : 'bg-[#efeded] border-2 border-[#dbdad9] text-[#6f7b64] hover:bg-[#e9e8e7]'
          }`}
        >
          Friends
          {pendingRequests.length > 0 && (
            <span className="absolute top-2 right-4 w-5 h-5 bg-[#ba1a1a] text-white text-[11px] font-black rounded-full flex items-center justify-center">
              {pendingRequests.length}
            </span>
          )}
        </button>
      </div>

      {/* SUBTAB 1: PROFILE VIEW (matching Image 16) */}
      {activeSubTab === 'profile' && (
        <div className="space-y-6">
          {/* Statistics Section */}
          <div>
            <h2 className="text-xl font-black text-[#1b1c1c] mb-3">Statistics</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Total XP Card */}
              <div className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#ffeed9] text-[#fd9500] flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5 fill-[#fd9500]" />
                </div>
                <span className="text-xl font-black text-[#1b1c1c]">{stats.totalXp.toLocaleString()}</span>
                <span className="text-[11px] font-extrabold text-[#6f7b64] uppercase tracking-wider mt-0.5">
                  TOTAL XP
                </span>
              </div>

              {/* Day Streak Card */}
              <div className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-2">
                  <Flame className="w-5 h-5 fill-[#ba1a1a]" />
                </div>
                <span className="text-xl font-black text-[#1b1c1c]">{stats.dayStreak}</span>
                <span className="text-[11px] font-extrabold text-[#6f7b64] uppercase tracking-wider mt-0.5">
                  DAY STREAK
                </span>
              </div>

              {/* League Card */}
              <div className="col-span-2 bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#c8e6ff] text-[#006590] flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 fill-[#006590]" />
                </div>
                <span className="text-xl font-black text-[#1b1c1c]">{stats.league}</span>
                <span className="text-[11px] font-extrabold text-[#6f7b64] uppercase tracking-wider mt-0.5">
                  LEAGUE
                </span>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-black text-[#1b1c1c]">Achievements</h2>
              <button
                onClick={() => {
                  playTapSound();
                  setShowAllAchievements(!showAllAchievements);
                }}
                className="text-xs font-extrabold text-[#2b6c00] hover:underline uppercase tracking-wider cursor-pointer"
              >
                {showAllAchievements ? 'COLLAPSE' : 'VIEW ALL'}
              </button>
            </div>

            <div className="space-y-3">
              {(showAllAchievements ? achievements : achievements.slice(0, 3)).map((ach) => (
                <div
                  key={ach.id}
                  className={`border-2 rounded-2xl p-4 flex items-center justify-between shadow-xs ${
                    ach.completed
                      ? 'bg-white border-[#e5e5e5] border-b-4 border-b-[#d4d4d4]'
                      : 'bg-[#efeded] border-[#dbdad9]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl shrink-0 ${
                        ach.completed
                          ? 'bg-[#ffdad6] border-[#fca5a5] text-[#ba1a1a]'
                          : 'bg-[#dbdad9] border-[#c7c6c5] text-[#6f7b64]'
                      }`}
                    >
                      {ach.iconType === 'fire' ? '🧯' : ach.iconType === 'earthquake' ? '🛡️' : ach.iconType === 'firstaid' ? '🧰' : '⚡'}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-[#1b1c1c] leading-tight">
                        {ach.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#6f7b64] mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {ach.completed ? (
                      <div className="w-8 h-8 rounded-full bg-[#58cc02] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#dbdad9] text-[#6f7b64] flex items-center justify-center">
                        <Lock className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Mascot Showcase Card (matching Image 16) */}
          <div className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xs">
            <Mascot size="lg" showLabel={true} expression="waving" />
          </div>
        </div>
      )}

      {/* SUBTAB 2: FRIENDS VIEW (matching Image 3) */}
      {activeSubTab === 'friends' && (
        <div className="space-y-6">
          {/* Find Friends Search */}
          <div>
            <h2 className="text-xl font-black text-[#1b1c1c] mb-2">Find Friends</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-[#6f7b64] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by username..."
                className="w-full pl-11 pr-4 py-3 bg-white border-2 border-[#dbdad9] rounded-2xl text-sm font-semibold focus:outline-none focus:border-[#2b6c00] transition-colors"
              />
            </div>
          </div>

          {/* Friend Requests (matching Image 3) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-black text-[#1b1c1c]">Friend Requests</h2>
              {pendingRequests.length > 0 && (
                <span className="w-6 h-6 bg-[#ba1a1a] text-white font-black text-xs rounded-full flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </div>

            {pendingRequests.length === 0 ? (
              <div className="bg-white border-2 border-[#e5e5e5] p-4 rounded-2xl text-center text-xs font-bold text-[#6f7b64]">
                No pending friend requests.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-2xl p-3.5 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-[#becbb1] overflow-hidden bg-[#f5f3f3] shrink-0">
                        <img src={req.avatar} alt={req.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-[#1b1c1c]">{req.name}</h3>
                        <p className="text-xs font-semibold text-[#6f7b64]">{req.level}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`accept-request-${req.id}`}
                        onClick={() => {
                          playCorrectSound();
                          onAcceptFriendRequest(req.id);
                        }}
                        className="w-10 h-10 rounded-full bg-[#1e7e16] text-white flex items-center justify-center hover:bg-[#2b6c00] active:scale-95 cursor-pointer shadow-xs"
                        aria-label="Accept"
                      >
                        <Check className="w-5 h-5 stroke-[3]" />
                      </button>
                      <button
                        id={`reject-request-${req.id}`}
                        onClick={() => {
                          playTapSound();
                          onRejectFriendRequest(req.id);
                        }}
                        className="w-10 h-10 rounded-full bg-[#dbdad9] text-[#6f7b64] flex items-center justify-center hover:bg-[#c7c6c5] active:scale-95 cursor-pointer"
                        aria-label="Decline"
                      >
                        <X className="w-5 h-5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Friend Activity (matching Image 3) */}
          <div>
            <h2 className="text-xl font-black text-[#1b1c1c] mb-3">Friend Activity</h2>

            <div className="space-y-3">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] rounded-2xl p-4 relative overflow-hidden shadow-xs"
                >
                  {/* Decorative Background Stamp */}
                  <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
                    <Star className="w-20 h-20 text-[#1b1c1c]" />
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-full border-2 border-[#becbb1] overflow-hidden bg-[#f5f3f3] shrink-0">
                      <img src={act.avatar} alt={act.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1b1c1c] leading-snug">
                        <span className="font-extrabold text-[#1b1c1c]">{act.name}</span>{' '}
                        {act.action.includes('Earthquake') ? (
                          <>
                            just completed{' '}
                            <span className="text-[#2b6c00] font-black">Earthquake Basics!</span>
                          </>
                        ) : act.action.includes('Streak') ? (
                          <>
                            started a{' '}
                            <span className="text-[#ba1a1a] font-black">{act.streakDays || 7} Day Streak!</span>
                          </>
                        ) : (
                          act.action
                        )}
                      </p>
                      <p className="text-xs font-semibold text-[#6f7b64] mt-0.5">
                        {act.timestamp}
                      </p>

                      {/* Pill Badge / High Five Action */}
                      <div className="mt-3">
                        {act.xpEarned ? (
                          <div className="inline-flex items-center gap-1.5 bg-[#f5f3f3] border-2 border-[#dbdad9] rounded-xl px-3 py-1.5">
                            <Star className="w-4 h-4 text-[#fd9500] fill-[#fd9500]" />
                            <span className="text-xs font-black text-[#1b1c1c]">
                              +{act.xpEarned} XP Earned
                            </span>
                          </div>
                        ) : (
                          <button
                            id={`highfive-${act.id}`}
                            onClick={() => {
                              playCorrectSound();
                              onHighFive(act.id);
                            }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              act.highFived
                                ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#fca5a5]'
                                : 'text-[#2b6c00] hover:bg-[#f0f4eb]'
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                act.highFived ? 'fill-[#ba1a1a] text-[#ba1a1a]' : 'text-[#2b6c00]'
                              }`}
                            />
                            <span>{act.highFived ? 'High Fived!' : 'High Five'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
