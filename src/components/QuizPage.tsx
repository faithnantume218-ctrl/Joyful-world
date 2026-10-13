import React, { useState } from 'react';
import { quizQuestionsData, encouragingMessages } from '../data/quizzes';
import { QuizQuestion } from '../types';
import { Sparkles, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, HelpCircle, Star } from 'lucide-react';
import { playSuccessChime, playSoftBoop, playCheerFanfare, playClickPop } from '../utils/sound';

export const QuizPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: QuizQuestion; selected: number; correct: boolean }>>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Filtered question pool
  const questions = quizQuestionsData.filter((q) =>
    selectedSubject === 'all' ? true : q.subject === selectedSubject
  );

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return; // Prevent double clicking

    setSelectedOption(index);
    setHasAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      playSuccessChime();
    } else {
      playSoftBoop();
    }

    setUserAnswers((prev) => [
      ...prev,
      { question: currentQ, selected: index, correct: isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    playClickPop();
    setShowHint(false);
    setSelectedOption(null);
    setHasAnswered(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
      playCheerFanfare();
    }
  };

  const handleRestartQuiz = () => {
    playClickPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswers([]);
    setShowHint(false);
  };

  const handleSubjectChange = (subject: string) => {
    playClickPop();
    setSelectedSubject(subject);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsQuizComplete(false);
    setUserAnswers([]);
    setShowHint(false);
  };

  const encouragement = encouragingMessages.find((m) => score >= m.minScore) || encouragingMessages[encouragingMessages.length - 1];

  // ================= QUIZ COMPLETE SCREEN =================
  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto space-y-8 pb-16">
        <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-pink-100 rounded-3xl p-8 sm:p-12 border-4 border-amber-300 shadow-[0_8px_0_rgba(245,158,11,0.2)] text-center space-y-6">
          {/* Trophy badge */}
          <div className="w-24 h-24 mx-auto rounded-3xl bg-amber-300 border-4 border-amber-400 text-amber-950 flex items-center justify-center text-5xl shadow-md animate-bounce">
            🏆
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-kids font-black text-slate-900">
              {encouragement.title}
            </h1>
            <p className="text-base sm:text-lg font-body font-semibold text-slate-700 max-w-md mx-auto leading-relaxed">
              {encouragement.message}
            </p>
          </div>

          {/* Score card */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-5 rounded-3xl bg-white/90 border-3 border-amber-300 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs font-kids font-bold text-amber-800 uppercase tracking-wider">Your Score</p>
              <p className="text-4xl font-kids font-black text-amber-600">
                {score} / {questions.length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-kids font-bold text-emerald-800 uppercase tracking-wider">Accuracy</p>
              <p className="text-4xl font-kids font-black text-emerald-600">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={handleRestartQuiz}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-kids font-bold text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Play Again! 🔄</span>
            </button>

            <button
              onClick={() => handleSubjectChange(selectedSubject === 'all' ? 'science' : 'all')}
              className="px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-kids font-bold text-base rounded-2xl border-2 border-slate-300 btn-bubbly cursor-pointer"
            >
              Try Another Subject 🎒
            </button>
          </div>
        </div>

        {/* Question Review Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-200 shadow-sm space-y-5">
          <h2 className="text-2xl font-kids font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Question Review 📝</span>
          </h2>

          <div className="space-y-4">
            {userAnswers.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-3 ${
                  item.correct
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-rose-50 border-rose-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-base font-kids font-bold text-slate-900">
                    <span className="font-black mr-1.5 text-amber-600">Q{idx + 1}.</span> {item.question.question}
                  </p>
                  {item.correct ? (
                    <span className="inline-flex items-center gap-1 text-xs font-kids font-bold text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full shrink-0 border border-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Correct!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-kids font-bold text-rose-800 bg-rose-200 px-3 py-1 rounded-full shrink-0 border border-rose-400">
                      <XCircle className="w-4 h-4" /> Missed
                    </span>
                  )}
                </div>

                <p className="text-sm font-body text-slate-700 mb-1">
                  <strong>Your answer:</strong> {item.question.options[item.selected]}
                </p>
                {!item.correct && (
                  <p className="text-sm font-body font-bold text-emerald-800 mb-1">
                    <strong>Correct answer:</strong> {item.question.options[item.question.correctIndex]}
                  </p>
                )}
                <p className="text-sm font-body text-slate-800 bg-white/80 p-3 rounded-xl border border-slate-200 mt-2">
                  💡 {item.question.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= ACTIVE QUIZ SCREEN =================
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const categoryThemes: Record<string, { label: string; activeStyle: string; icon: string }> = {
    all: { label: 'All Subjects', activeStyle: 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm scale-105', icon: '🎒' },
    english: { label: 'English', activeStyle: 'bg-orange-400 text-orange-950 border-orange-500 shadow-sm scale-105', icon: '📖' },
    mathematics: { label: 'Math', activeStyle: 'bg-sky-400 text-sky-950 border-sky-500 shadow-sm scale-105', icon: '🔢' },
    science: { label: 'Science', activeStyle: 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow-sm scale-105', icon: '🔬' },
    'social-studies': { label: 'Social Studies', activeStyle: 'bg-purple-400 text-purple-950 border-purple-500 shadow-sm scale-105', icon: '🌍' },
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-200 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm font-kids font-bold shadow-xs">
          <Trophy className="w-4 h-4 text-emerald-700" />
          <span>Test Your Knowledge &amp; Earn Super Explorer Stars! ⭐</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-kids font-black text-slate-900">
          Interactive Kids&apos; Quiz 🧠
        </h1>
        <p className="text-base font-body font-semibold text-slate-600">
          Pick your favorite subject or challenge yourself with the All-Rounder!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/90 backdrop-blur-xs rounded-2xl border-3 border-amber-300 shadow-xs">
        {Object.entries(categoryThemes).map(([id, info]) => (
          <button
            key={id}
            onClick={() => handleSubjectChange(id)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-kids font-bold transition-all border-2 cursor-pointer btn-bubbly ${
              selectedSubject === id
                ? info.activeStyle
                : 'bg-amber-50/70 border-amber-200 text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span className="mr-1">{info.icon}</span>
            <span>{info.label}</span>
          </button>
        ))}
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-[0_8px_0_rgba(245,158,11,0.15)] space-y-6">
        {/* Progress & Current Score */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-kids font-bold text-slate-600">
            <span className="flex items-center gap-2 text-amber-900">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="px-3 py-1 bg-amber-200 border border-amber-300 rounded-xl text-amber-950 font-kids font-black">
              ⭐ Score: {score}
            </span>
          </div>

          {/* Rainbow Progress bar */}
          <div className="w-full bg-amber-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-amber-200">
            <div
              className="bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 to-sky-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-xl bg-sky-100 border border-sky-300 text-sky-900 text-xs font-kids font-bold">
            {currentQ.subjectLabel}
          </div>
          <h2 className="text-2xl sm:text-3xl font-kids font-black text-slate-900 leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            const letterColors = ['bg-orange-200 text-orange-950', 'bg-sky-200 text-sky-950', 'bg-emerald-200 text-emerald-950', 'bg-purple-200 text-purple-950'];

            let buttonStyle = 'bg-amber-50/50 hover:bg-amber-100/80 border-amber-200 text-slate-800';

            if (hasAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-md';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-100 text-rose-950 border-rose-400 font-bold';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border-3 text-base sm:text-lg font-kids font-bold transition-all flex items-center justify-between cursor-pointer btn-bubbly ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black border ${
                      hasAnswered && isCorrect
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : isSelected && !isCorrect
                        ? 'bg-rose-300 text-rose-950 border-rose-400'
                        : letterColors[idx % 4]
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint button */}
        {!hasAnswered && (
          <div className="pt-1">
            <button
              onClick={() => {
                playClickPop();
                setShowHint(!showHint);
              }}
              className="text-sm text-amber-800 hover:text-amber-950 font-kids font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>{showHint ? 'Hide Hint' : 'Need a friendly hint? 🔍'}</span>
            </button>
            {showHint && (
              <p className="mt-2 text-sm font-body font-semibold text-amber-950 bg-amber-100/90 p-4 rounded-2xl border-2 border-amber-300 animate-fadeIn">
                🔍 <strong>Hint:</strong> {currentQ.hint}
              </p>
            )}
          </div>
        )}

        {/* Instant Feedback Explanation Card */}
        {hasAnswered && (
          <div
            className={`p-5 rounded-2xl border-3 animate-fadeIn space-y-2 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                : 'bg-amber-100 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-kids font-black text-lg">
              <span className="text-2xl">
                {selectedOption === currentQ.correctIndex ? '🎉 Fantastic Job!' : '💡 Good Try!'}
              </span>
              <span>
                {selectedOption === currentQ.correctIndex
                  ? 'You got it 100% right!'
                  : `The answer is: "${currentQ.options[currentQ.correctIndex]}"`}
              </span>
            </div>
            <p className="text-base font-body font-semibold leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question / Finish Button */}
        {hasAnswered && (
          <div className="pt-3 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-kids font-bold text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question ➔' : 'See Results 🏆'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
