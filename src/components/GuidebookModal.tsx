import React from 'react';
import { X, ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { Unit } from '../types';
import { playTapSound } from '../utils/audio';

interface GuidebookModalProps {
  unit: Unit;
  onClose: () => void;
}

export const GuidebookModal: React.FC<GuidebookModalProps> = ({ unit, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fbf9f9] border-2 border-[#dbdad9] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-[#2b6c00] text-white p-4 rounded-t-2xl flex items-center justify-between border-b-4 border-[#1e5000]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <div>
              <div className="text-xs font-black tracking-widest text-[#87fe45] uppercase">
                {unit.title} Safety Guidebook
              </div>
              <h2 className="text-lg font-black leading-tight">{unit.subtitle}</h2>
            </div>
          </div>
          <button
            id="close-guidebook-btn"
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Summary Box */}
          <div className="bg-[#f0f4eb] border-2 border-[#becbb1] p-4 rounded-xl">
            <p className="text-sm font-semibold text-[#1b1c1c] leading-relaxed">
              {unit.guidebook.summary}
            </p>
          </div>

          {/* Key Principles */}
          <div>
            <h3 className="text-base font-black text-[#1b1c1c] flex items-center gap-2 mb-3">
              <ShieldAlert className="w-5 h-5 text-[#2b6c00]" />
              Core Safety Protocols
            </h3>
            <div className="space-y-3">
              {unit.guidebook.keyPoints.map((point, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#e5e5e5] border-b-4 border-b-[#d4d4d4] p-3.5 rounded-xl flex items-start gap-3"
                >
                  <span className="text-2xl">{point.icon}</span>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#1b1c1c]">{point.title}</h4>
                    <p className="text-xs font-medium text-[#3f4a36] mt-0.5">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DOs and DONTs */}
          <div>
            <h3 className="text-base font-black text-[#1b1c1c] flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-[#58cc02]" />
              Essential Do's & Don'ts
            </h3>
            <div className="space-y-2.5">
              {unit.guidebook.dosAndDonts.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-[#eaf9e6] border border-[#a3e699] p-2.5 rounded-lg flex items-start gap-2">
                    <span className="font-extrabold text-[#2b6c00] shrink-0">DO:</span>
                    <span className="font-semibold text-[#1e5000]">{item.do}</span>
                  </div>
                  <div className="bg-[#ffdad6] border border-[#fca5a5] p-2.5 rounded-lg flex items-start gap-2">
                    <span className="font-extrabold text-[#ba1a1a] shrink-0">DON'T:</span>
                    <span className="font-semibold text-[#93000a]">{item.dont}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h3 className="text-base font-black text-[#1b1c1c] flex items-center gap-2 mb-3">
              <PhoneCall className="w-5 h-5 text-[#fd9500]" />
              Emergency Dispatch Hotlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {unit.guidebook.emergencyNumbers.map((num, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-[#e5e5e5] p-2.5 rounded-xl flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#1b1c1c]">{num.service}</span>
                  <span className="bg-[#2b6c00] text-white text-xs font-black px-2 py-1 rounded-md">
                    {num.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#efeded] border-t-2 border-[#dbdad9] rounded-b-2xl">
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="w-full btn-3d-green text-white font-extrabold py-3 rounded-xl uppercase tracking-wider text-sm cursor-pointer"
          >
            Got It, Let's Drill!
          </button>
        </div>
      </div>
    </div>
  );
};
