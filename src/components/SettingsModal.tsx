import React, { useState } from 'react';
import { X, Volume2, VolumeX, Phone, Shield, RefreshCw, Info, Check } from 'lucide-react';
import { playTapSound, setSoundMuted, getSoundMuted } from '../utils/audio';

interface SettingsModalProps {
  onClose: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onResetProgress }) => {
  const [muted, setMutedState] = useState(getSoundMuted());
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleToggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setSoundMuted(next);
    if (!next) playTapSound();
  };

  const handleReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      return;
    }
    onResetProgress();
    setResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fbf9f9] border-2 border-[#dbdad9] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#f5f3f3] p-4 border-b-2 border-[#dbdad9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2b6c00]" />
            <h2 className="text-base font-black text-[#1b1c1c]">Application Settings</h2>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1 rounded-full text-[#6f7b64] hover:bg-[#e9e8e7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Sound FX Toggle */}
          <div className="bg-white border-2 border-[#e5e5e5] p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f0f4eb] flex items-center justify-center text-[#2b6c00]">
                {muted ? <VolumeX className="w-5 h-5 text-[#ba1a1a]" /> : <Volume2 className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#1b1c1c]">Tactile Sound FX</div>
                <div className="text-xs text-[#6f7b64]">Audio cues for buttons & quizzes</div>
              </div>
            </div>
            <button
              onClick={handleToggleMute}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                !muted ? 'bg-[#58cc02] text-white shadow-sm' : 'bg-[#e5e5e5] text-[#6f7b64]'
              }`}
            >
              {!muted ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Quick Emergency Contacts Directory */}
          <div className="bg-[#fff3d4] border-2 border-[#fd9500] p-3.5 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-[#8c5000]">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Emergency Hotlines</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-[#ffdcbf]">
                <div className="text-[10px] text-[#8c5000] font-bold">FVV Rescue Service</div>
                <div className="text-sm font-black text-[#2b6c00]">1050</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#ffdcbf]">
                <div className="text-[10px] text-[#8c5000] font-bold">Fire Rescue</div>
                <div className="text-sm font-black text-[#ea580c]">101</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#ffdcbf]">
                <div className="text-[10px] text-[#8c5000] font-bold">Ambulance</div>
                <div className="text-sm font-black text-[#ba1a1a]">103</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-[#ffdcbf]">
                <div className="text-[10px] text-[#8c5000] font-bold">Unified Emergency</div>
                <div className="text-sm font-black text-[#006590]">112</div>
              </div>
            </div>
          </div>

          {/* Reset progress option */}
          <div className="pt-2">
            <button
              onClick={handleReset}
              className={`w-full py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                resetConfirm
                  ? 'bg-[#ba1a1a] text-white border-2 border-[#93000a]'
                  : 'bg-[#f5f3f3] text-[#6f7b64] hover:text-[#ba1a1a] border-2 border-[#dbdad9]'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              {resetConfirm ? 'Click again to confirm reset' : 'Reset Lesson Progress'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
