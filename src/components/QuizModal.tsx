import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Volume2, AlertCircle, Sparkles, Heart, Clock } from 'lucide-react';
import { Question } from '../types';
import { playTapSound, playCorrectSound, playWrongSound, playFanfareSound } from '../utils/audio';
import { Mascot } from './Mascot';

interface QuizModalProps {
  questions: Question[];
  title?: string;
  isTimed?: boolean;
  onComplete: (xpGained: number, correctCount: number) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  questions,
  title = 'Safety Drill',
  isTimed = false,
  onComplete,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(isTimed ? 60 : 0);

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = ((currentIndex + (hasChecked ? 1 : 0)) / questions.length) * 100;

  // Timer for Timed Drill
  useEffect(() => {
    if (!isTimed || isFinished) return;
    if (timeLeft <= 0) {
      handleFinish(correctAnswersCount);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimed, timeLeft, isFinished, correctAnswersCount]);

  const handleSelectOption = (id: string) => {
    if (hasChecked) return;
    playTapSound();
    setSelectedOptionId(id);
  };

  const handleCheck = () => {
    if (!selectedOptionId || hasChecked) return;

    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    const correct = !!chosen?.isCorrect;

    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playCorrectSound();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    playTapSound();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasChecked(false);
      setIsCorrect(null);
    } else {
      handleFinish(correctAnswersCount + (isCorrect ? 0 : 0));
    }
  };

  const handleFinish = (totalCorrect: number) => {
    setIsFinished(true);
    playFanfareSound();
  };

  const handleCompleteSummary = () => {
    playTapSound();
    const xpPerCorrect = isTimed ? 30 : 20;
    const gained = Math.max(10, correctAnswersCount * xpPerCorrect);
    onComplete(gained, correctAnswersCount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fbf9f9] flex flex-col justify-between overflow-hidden animate-fade-in">
      {/* Top Bar with Progress Bar & Close */}
      <div className="w-full max-w-lg mx-auto px-4 pt-4 pb-2 flex items-center gap-3">
        <button
          id="close-quiz-btn"
          onClick={() => {
            playTapSound();
            onClose();
          }}
          className="p-1.5 rounded-full text-[#6f7b64] hover:bg-[#efeded] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Thick Duolingo-style Progress Bar */}
        <div className="flex-1 bg-[#e5e5e5] h-4 rounded-full overflow-hidden p-0.5 relative">
          <div
            className="bg-[#58cc02] h-full rounded-full transition-all duration-300 relative shadow-inner"
            style={{ width: `${Math.min(100, Math.max(5, progressPercent))}%` }}
          >
            {/* Gloss shine reflection */}
            <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

        {isTimed && (
          <div className="flex items-center gap-1 bg-[#ffd500] px-2.5 py-1 rounded-full text-xs font-black text-[#8c5000]">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 max-w-lg mx-auto w-full px-5 py-3 overflow-y-auto flex flex-col justify-center">
        {!isFinished ? (
          <div>
            {/* Mascot Peeking & Question Header */}
            <div className="relative mb-6 pt-2">
              <div className="absolute -left-3 -top-3 opacity-90 pointer-events-none transform -rotate-12 scale-75 origin-top-left">
                <Mascot size="sm" showLabel={false} expression="thinking" />
              </div>

              <div className="pl-14">
                <span className="text-xs font-black uppercase tracking-wider text-[#2b6c00] bg-[#f0f4eb] px-2.5 py-1 rounded-md">
                  {currentQ.topic || title}
                </span>
                <h1 className="text-2xl sm:text-[26px] font-black text-[#1b1c1c] leading-tight tracking-tight mt-2">
                  {currentQ.prompt}
                </h1>
              </div>
            </div>

            {/* Options List - Chunky 3D tactile buttons */}
            <div className="space-y-3.5 mt-4">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let cardStyle = 'bg-white border-2 border-[#dbdad9] border-b-4 border-b-[#c7c6c5] text-[#1b1c1c]';

                if (isSelected && !hasChecked) {
                  cardStyle = 'bg-[#eaf4ff] border-2 border-[#1cb0f6] border-b-4 border-b-[#1899d6] text-[#004a6b] ring-2 ring-[#1cb0f6]/30';
                } else if (hasChecked) {
                  if (opt.isCorrect) {
                    cardStyle = 'bg-[#d7ffb8] border-2 border-[#58cc02] border-b-4 border-b-[#46a302] text-[#1e5000]';
                  } else if (isSelected && !opt.isCorrect) {
                    cardStyle = 'bg-[#ffdad6] border-2 border-[#ea2b2b] border-b-4 border-b-[#ba1a1a] text-[#93000a]';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    id={`option-${opt.id}`}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasChecked}
                    className={`w-full text-left p-4 rounded-2xl flex items-center gap-3.5 transition-all cursor-pointer select-none active:translate-y-[2px] ${cardStyle}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                        isSelected
                          ? 'bg-[#1cb0f6] text-white border-[#1899d6]'
                          : 'bg-[#f5f3f3] text-[#3f4a36] border-[#dbdad9]'
                      }`}
                    >
                      {opt.icon === 'cover' ? '🛡️' : opt.icon === 'door' ? '🚪' : opt.icon === 'person' ? '🏃' : opt.icon === 'fire' ? '🧯' : opt.icon === 'stairs' ? '🪜' : '💡'}
                    </div>

                    <span className="font-extrabold text-base sm:text-lg flex-1 leading-snug">
                      {opt.text}
                    </span>

                    {hasChecked && opt.isCorrect && (
                      <div className="w-7 h-7 rounded-full bg-[#58cc02] text-white flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                    {hasChecked && isSelected && !opt.isCorrect && (
                      <div className="w-7 h-7 rounded-full bg-[#ea2b2b] text-white flex items-center justify-center">
                        <X className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Completion Celebration Screen */
          <div className="text-center py-6 animate-scale-up">
            <Mascot size="lg" expression="excited" />
            <div className="mt-4">
              <span className="text-sm font-black uppercase text-[#fd9500] tracking-widest">
                Lesson Completed!
              </span>
              <h2 className="text-3xl font-black text-[#1b1c1c] mt-1">Great Job Responder!</h2>
              <p className="text-sm font-semibold text-[#3f4a36] mt-1">
                You correctly answered {correctAnswersCount} of {questions.length} drills.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mt-6">
              <div className="bg-[#fff3d4] border-2 border-[#fd9500] border-b-4 border-b-[#c96b00] rounded-2xl p-3 text-center">
                <div className="text-xs font-black text-[#8c5000] uppercase">XP Earned</div>
                <div className="text-2xl font-black text-[#fd9500] mt-0.5">
                  +{Math.max(10, correctAnswersCount * (isTimed ? 30 : 20))}
                </div>
              </div>

              <div className="bg-[#eaf9e6] border-2 border-[#58cc02] border-b-4 border-b-[#46a302] rounded-2xl p-3 text-center">
                <div className="text-xs font-black text-[#2b6c00] uppercase">Accuracy</div>
                <div className="text-2xl font-black text-[#58cc02] mt-0.5">
                  {Math.round((correctAnswersCount / questions.length) * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer & Bottom Sheet for feedback */}
      {!isFinished ? (
        <div
          className={`border-t-2 p-4 transition-colors duration-200 ${
            !hasChecked
              ? 'bg-[#fbf9f9] border-[#e5e5e5]'
              : isCorrect
              ? 'bg-[#d7ffb8] border-[#a3e699]'
              : 'bg-[#ffdad6] border-[#fca5a5]'
          }`}
        >
          <div className="max-w-lg mx-auto">
            {hasChecked && (
              <div className="mb-3 flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    isCorrect ? 'bg-[#58cc02] text-white' : 'bg-[#ea2b2b] text-white'
                  }`}
                >
                  {isCorrect ? <Check className="w-5 h-5 stroke-[3]" /> : <X className="w-5 h-5 stroke-[3]" />}
                </div>
                <div>
                  <h4
                    className={`font-black text-lg ${
                      isCorrect ? 'text-[#1e5000]' : 'text-[#93000a]'
                    }`}
                  >
                    {isCorrect ? 'Excellent Safety Move!' : 'Not Quite Safe!'}
                  </h4>
                  <p
                    className={`text-xs font-semibold leading-relaxed mt-0.5 ${
                      isCorrect ? 'text-[#2b6c00]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            )}

            {!hasChecked ? (
              <button
                id="check-button"
                onClick={handleCheck}
                disabled={!selectedOptionId}
                className={`w-full py-3.5 rounded-2xl font-black uppercase text-base tracking-wider cursor-pointer select-none transition-all ${
                  selectedOptionId
                    ? 'btn-3d-green text-white shadow-md'
                    : 'bg-[#e5e5e5] text-[#9ca3af] border-b-4 border-[#d4d4d4] cursor-not-allowed'
                }`}
              >
                CHECK
              </button>
            ) : (
              <button
                id="continue-button"
                onClick={handleNext}
                className={`w-full py-3.5 rounded-2xl font-black uppercase text-base tracking-wider text-white shadow-md select-none transition-all cursor-pointer ${
                  isCorrect ? 'btn-3d-green' : 'bg-[#ea2b2b] border-b-4 border-[#ba1a1a] hover:bg-[#ff3b3b]'
                }`}
              >
                CONTINUE
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 border-t-2 border-[#e5e5e5] bg-[#fbf9f9]">
          <div className="max-w-lg mx-auto">
            <button
              id="finish-summary-button"
              onClick={handleCompleteSummary}
              className="w-full btn-3d-green text-white font-black py-4 rounded-2xl uppercase tracking-wider text-base cursor-pointer select-none"
            >
              COLLECT REWARDS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
