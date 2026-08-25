import React from 'react';
import { BookOpen, Check, User, Activity, ShoppingBag, Gift, Sparkles } from 'lucide-react';
import { Unit, PathNode } from '../types';
import { Mascot } from './Mascot';
import { playTapSound } from '../utils/audio';

interface LearnScreenProps {
  units: Unit[];
  activeUnitIndex: number;
  onOpenGuidebook: (unit: Unit) => void;
  onStartNode: (node: PathNode) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({
  units,
  activeUnitIndex,
  onOpenGuidebook,
  onStartNode,
}) => {
  const currentUnit = units[activeUnitIndex] || units[0];

  return (
    <div className="pb-24 pt-3 max-w-lg mx-auto px-4">
      {/* Speech Bubble with Mascot (matching Image 5) */}
      <div className="flex items-center justify-between gap-3 mb-6">
        {/* Left Speech Bubble */}
        <div className="relative flex-1 bg-white border-2 border-[#becbb1] rounded-2xl p-3.5 shadow-sm">
          <p className="text-sm sm:text-base font-extrabold text-[#1b1c1c] leading-snug">
            Let's learn how to stay safe during an earthquake today!
          </p>
          {/* Bubble Tail pointing Right */}
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[10px] border-l-[#becbb1]" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[9px] border-l-white" />
        </div>

        {/* Mascot Card on Right */}
        <div className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-2 shrink-0 shadow-sm flex items-center justify-center w-24 h-24">
          <Mascot size="sm" showLabel={true} expression="waving" />
        </div>
      </div>

      {/* Unit 1 Header Banner (matching Image 5) */}
      <div className="bg-[#1e7e16] text-white rounded-2xl p-4 border-2 border-[#176611] border-b-4 border-b-[#114e0d] shadow-md mb-8">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">{currentUnit.title}</h2>
            <p className="text-xs sm:text-sm font-bold text-[#87fe45] mt-0.5">{currentUnit.subtitle}</p>
          </div>

          <button
            id="open-guidebook-banner-btn"
            onClick={() => {
              playTapSound();
              onOpenGuidebook(currentUnit);
            }}
            className="btn-3d-white text-[#1b1c1c] text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer select-none"
          >
            GUIDEBOOK
          </button>
        </div>
      </div>

      {/* Interactive Vertical Pathway (matching Image 5) */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {/* Connecting Vertical Track */}
        <div className="absolute top-6 bottom-6 w-3 bg-[#dbdad9] rounded-full z-0" />

        <div className="space-y-8 relative z-10 w-full flex flex-col items-center">
          {currentUnit.nodes.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isActive = node.status === 'active';
            const isLocked = node.status === 'locked';

            return (
              <div key={node.id} className="flex flex-col items-center">
                {/* Active node star indicator */}
                {isActive && (
                  <div className="text-[#fd9500] text-sm animate-bounce mb-1">
                    ★
                  </div>
                )}

                {/* Node Button / Circle */}
                {node.type !== 'reward' ? (
                  <button
                    id={`path-node-${node.id}`}
                    onClick={() => {
                      playTapSound();
                      onStartNode(node);
                    }}
                    disabled={isLocked}
                    className={`relative rounded-full flex items-center justify-center transition-transform duration-150 cursor-pointer select-none ${
                      isCompleted
                        ? 'w-16 h-16 bg-[#fd9500] border-4 border-[#ea7e00] border-b-6 border-b-[#c96b00] text-white active:scale-95 shadow-md'
                        : isActive
                        ? 'w-20 h-20 bg-[#2b6c00] border-4 border-[#58cc02] border-b-8 border-b-[#1e5000] text-white active:scale-95 shadow-lg ring-4 ring-[#87fe45]/40'
                        : 'w-16 h-16 bg-[#dbdad9] border-4 border-[#c7c6c5] border-b-6 border-b-[#a8a7a6] text-[#6f7b64] cursor-not-allowed opacity-90'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-8 h-8 stroke-[3.5]" />
                    ) : isActive ? (
                      <div className="flex flex-col items-center justify-center">
                        <User className="w-9 h-9 stroke-[3]" />
                      </div>
                    ) : node.iconType === 'run' ? (
                      <Activity className="w-7 h-7 stroke-[2.5]" />
                    ) : (
                      <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
                    )}
                  </button>
                ) : (
                  /* Reward Chest Node (matching Node 5 in Image 5) */
                  <button
                    id={`path-node-${node.id}`}
                    onClick={() => {
                      playTapSound();
                      onStartNode(node);
                    }}
                    disabled={isLocked}
                    className={`w-18 h-18 rounded-2xl flex items-center justify-center transition-transform select-none ${
                      isCompleted
                        ? 'bg-[#fd9500] border-4 border-[#c96b00] text-white cursor-pointer shadow-md'
                        : isActive
                        ? 'bg-[#58cc02] border-4 border-[#1e5000] text-white cursor-pointer shadow-md animate-pulse'
                        : 'bg-[#dbdad9] border-4 border-[#c7c6c5] border-b-6 border-b-[#a8a7a6] text-[#6f7b64] cursor-not-allowed opacity-90'
                    }`}
                  >
                    <Gift className="w-8 h-8 stroke-[2.5]" />
                  </button>
                )}

                {/* Progress Pill below active node (matching Image 5: 50% bar) */}
                {isActive && (
                  <div className="mt-2 bg-white border-2 border-[#dbdad9] rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
                    <div className="w-12 h-2.5 bg-[#dbdad9] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#fd9500] rounded-full"
                        style={{ width: `${node.progressPercent || 50}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-black text-[#1b1c1c]">
                      {node.progressPercent || 50}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
