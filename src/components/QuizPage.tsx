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
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-200 shadow-sm text-center space-y-6">
          {/* Trophy badge */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-inner animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900">
              {encouragement.title}
            </h1>
            <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              {encouragement.message}
            </p>
          </div>

          {/* Score card */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Your Score</p>
              <p className="text-3xl font-kids font-bold text-amber-700">
                {score} / {questions.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Accuracy</p>
              <p className="text-3xl font-kids font-bold text-emerald-600">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-kids font-bold text-sm rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Play Again</span>
            </button>

            <button
              onClick={() => handleSubjectChange(selectedSubject === 'all' ? 'science' : 'all')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids font-bold text-sm rounded-xl transition-colors"
            >
              Try Another Subject
            </button>
          </div>
        </div>

        {/* Question Review Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-kids font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Question Review</span>
          </h2>

          <div className="space-y-4">
            {userAnswers.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  item.correct
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-rose-50/60 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-slate-900">
                    <span className="font-bold mr-1">Q{idx + 1}.</span> {item.question.question}
                  </p>
                  {item.correct ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full shrink-0">
                      <XCircle className="w-3.5 h-3.5" /> Missed
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mb-1">
                  <strong>Your answer:</strong> {item.question.options[item.selected]}
                </p>
                {!item.correct && (
                  <p className="text-xs text-emerald-700 font-semibold mb-1">
                    <strong>Correct answer:</strong> {item.question.options[item.question.correctIndex]}
                  </p>
                )}
                <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
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

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5 text-emerald-700" />
          <span>Test Your Knowledge & Earn Super Explorer Stars</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900">
          Interactive Kids&apos; Quiz
        </h1>
        <p className="text-sm text-slate-600">
          Pick your favorite subject or try the All-Rounder challenge!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        {[
          { id: 'all', label: 'All Subjects' },
          { id: 'english', label: 'English' },
          { id: 'mathematics', label: 'Math' },
          { id: 'science', label: 'Science' },
          { id: 'social-studies', label: 'Social Studies' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSubjectChange(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedSubject === tab.id
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-6">
        {/* Progress & Current Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="px-2.5 py-0.5 bg-amber-100 rounded-md text-amber-900 font-kids font-bold">
              Score: {score}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-3">
          <div className="inline-block px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 text-xs font-bold">
            {currentQ.subjectLabel}
          </div>
          <h2 className="text-xl sm:text-2xl font-kids font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let buttonStyle = 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800';

            if (hasAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-100 text-rose-900 border-rose-300';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 text-sm sm:text-base font-medium transition-all flex items-center justify-between ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      hasAnswered && isCorrect
                        ? 'bg-emerald-800 text-white'
                        : isSelected && !isCorrect
                        ? 'bg-rose-200 text-rose-800'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600" />
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
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>
            {showHint && (
              <p className="mt-2 text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 animate-fadeIn">
                🔍 <strong>Hint:</strong> {currentQ.hint}
              </p>
            )}
          </div>
        )}

        {/* Instant Feedback Explanation Card */}
        {hasAnswered && (
          <div
            className={`p-5 rounded-2xl border animate-fadeIn space-y-2 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-kids font-bold text-sm">
              <span className="text-lg">
                {selectedOption === currentQ.correctIndex ? '🎉 Fantastic!' : '💡 Good Try!'}
              </span>
              <span>
                {selectedOption === currentQ.correctIndex
                  ? 'You got it right!'
                  : `The correct answer was: "${currentQ.options[currentQ.correctIndex]}"`}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question / Finish Button */}
        {hasAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-kids font-bold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
