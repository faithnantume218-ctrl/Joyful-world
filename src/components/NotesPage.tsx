import React, { useState } from 'react';
import { NoteTopic } from '../types';
import { notesData } from '../data/notes';
import { BookOpen, Search, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';
import { playClickPop, playSuccessChime } from '../utils/sound';

export const NotesPage: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<'all' | 'english' | 'mathematics' | 'science' | 'social-studies'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [masteredTopics, setMasteredTopics] = useState<string[]>([]);

  const subjects = [
    {
      id: 'all',
      label: 'All Subjects',
      icon: '🎒',
      activeColor: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white border-amber-500 shadow-md scale-105'
    },
    {
      id: 'english',
      label: 'English',
      icon: '📖',
      activeColor: 'bg-gradient-to-r from-orange-400 to-rose-400 text-white border-orange-500 shadow-md scale-105'
    },
    {
      id: 'mathematics',
      label: 'Mathematics',
      icon: '🔢',
      activeColor: 'bg-gradient-to-r from-sky-400 to-blue-500 text-white border-blue-500 shadow-md scale-105'
    },
    {
      id: 'science',
      label: 'Science',
      icon: '🔬',
      activeColor: 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-emerald-500 shadow-md scale-105'
    },
    {
      id: 'social-studies',
      label: 'Social Studies',
      icon: '🌍',
      activeColor: 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white border-purple-500 shadow-md scale-105'
    },
  ];

  const toggleAnswer = (questionId: string) => {
    playClickPop();
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleMastered = (topicId: string) => {
    if (!masteredTopics.includes(topicId)) {
      playSuccessChime();
      setMasteredTopics((prev) => [...prev, topicId]);
    } else {
      playClickPop();
      setMasteredTopics((prev) => prev.filter((id) => id !== topicId));
    }
  };

  const filteredNotes = notesData.filter((topic) => {
    const matchesSubject = activeSubject === 'all' || topic.subject === activeSubject;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.explanation.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      topic.importantPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-200 border-2 border-sky-300 text-sky-950 text-xs sm:text-sm font-kids font-bold shadow-xs">
          <BookOpen className="w-4 h-4 text-sky-700" />
          <span>Easy Explanations, Cool Examples &amp; Practice Fun!</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-kids font-black text-slate-900 leading-tight">
          Learning Notes &amp; Study Guides 📚
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-body font-semibold">
          Clear, simple school notes broken down step-by-step for English, Mathematics, Science, and Social Studies.
        </p>
      </div>

      {/* Subject Filter Bar */}
      <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border-4 border-amber-300 shadow-[0_6px_0_rgba(245,158,11,0.15)] space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {subjects.map((sub) => {
            const isActive = activeSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  playClickPop();
                  setActiveSubject(sub.id as typeof activeSubject);
                }}
                className={`px-4 py-2.5 rounded-2xl text-sm font-kids font-bold transition-all flex items-center gap-2 border-2 cursor-pointer btn-bubbly ${
                  isActive
                    ? sub.activeColor
                    : 'bg-amber-50 border-amber-200 text-slate-700 hover:bg-amber-100 hover:text-slate-900'
                }`}
              >
                <span className="text-xl">{sub.icon}</span>
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search inside notes */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any topic, question, or word (e.g. fraction, verb, water cycle, map)..."
            className="w-full pl-12 pr-4 py-3 bg-amber-50/60 border-2 border-amber-300 rounded-2xl text-sm sm:text-base font-body font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Notes Cards List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-4 border-amber-300 p-8 space-y-4 card-bubbly">
          <p className="text-5xl animate-bounce">🔍</p>
          <h3 className="text-2xl font-kids font-black text-slate-800">No notes matched your search!</h3>
          <p className="text-base font-body text-slate-600">Try searching for &quot;noun&quot;, &quot;solar&quot;, or &quot;fractions&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveSubject('all');
            }}
            className="px-6 py-3 bg-amber-500 text-white font-kids font-bold text-sm rounded-2xl btn-bubbly cursor-pointer"
          >
            Show All Notes 🎒
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredNotes.map((topic) => {
            const isMastered = masteredTopics.includes(topic.id);
            const subjectLabel =
              topic.subject === 'english'
                ? 'English'
                : topic.subject === 'mathematics'
                ? 'Mathematics'
                : topic.subject === 'science'
                ? 'Science'
                : 'Social Studies';

            const cardTheme =
              topic.subject === 'english'
                ? {
                    border: 'border-orange-300',
                    headerBg: 'from-orange-100 to-amber-50',
                    badge: 'bg-orange-400 text-white border-orange-500',
                    accentText: 'text-orange-950',
                    icon: '📖'
                  }
                : topic.subject === 'mathematics'
                ? {
                    border: 'border-sky-300',
                    headerBg: 'from-sky-100 to-blue-50',
                    badge: 'bg-sky-400 text-white border-sky-500',
                    accentText: 'text-sky-950',
                    icon: '🔢'
                  }
                : topic.subject === 'science'
                ? {
                    border: 'border-emerald-300',
                    headerBg: 'from-emerald-100 to-teal-50',
                    badge: 'bg-emerald-400 text-white border-emerald-500',
                    accentText: 'text-emerald-950',
                    icon: '🔬'
                  }
                : {
                    border: 'border-purple-300',
                    headerBg: 'from-purple-100 to-indigo-50',
                    badge: 'bg-purple-400 text-white border-purple-500',
                    accentText: 'text-purple-950',
                    icon: '🌍'
                  };

            return (
              <article
                key={topic.id}
                className={`bg-white rounded-3xl border-4 ${cardTheme.border} shadow-[0_8px_0_rgba(0,0,0,0.06)] p-6 sm:p-9 space-y-7 transition-all hover:shadow-[0_12px_0_rgba(0,0,0,0.08)]`}
              >
                {/* Header */}
                <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${cardTheme.headerBg} border-2 border-white flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-kids font-bold">
                      <span className={`px-3 py-1 rounded-xl border ${cardTheme.badge} shadow-2xs`}>
                        {cardTheme.icon} {subjectLabel}
                      </span>
                      <span className="bg-white/80 px-2.5 py-1 rounded-xl text-slate-700 border border-slate-200">
                        {topic.gradeLevel}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-kids font-black text-slate-900 tracking-tight">
                      {topic.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleMastered(topic.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-kids font-bold transition-all self-start sm:self-auto cursor-pointer btn-bubbly ${
                      isMastered
                        ? 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-white' : 'text-slate-400'}`} />
                    <span>{isMastered ? 'Mastered! ⭐' : 'Mark as Mastered'}</span>
                  </button>
                </div>

                {/* Simple Explanation */}
                <div className="space-y-3">
                  <h3 className="text-base font-kids font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                    <span>💡</span>
                    <span>Simple Explanation</span>
                  </h3>
                  <div className="space-y-2.5 text-base sm:text-lg font-body font-semibold text-slate-800 leading-relaxed bg-amber-50/40 p-5 rounded-2xl border-2 border-amber-200/80">
                    {topic.explanation.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Real-Life Examples Box */}
                <div className="rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-300 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-950 font-kids font-bold text-base sm:text-lg">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span>Real-Life Examples</span>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base font-body font-semibold text-amber-950 list-disc list-inside">
                    {topic.examples.map((ex, i) => (
                      <li key={i} className="leading-relaxed">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Points to Remember */}
                <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 border-3 border-purple-300 p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-purple-950 font-kids font-bold text-base sm:text-lg">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span>Important Points to Remember! ⭐</span>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base font-body font-semibold text-purple-950 list-disc list-inside">
                    {topic.importantPoints.map((pt, i) => (
                      <li key={i} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice Questions */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-base font-kids font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <span>✏️ Practice Questions (Try Yourself!)</span>
                  </h3>

                  <div className="space-y-3.5">
                    {topic.practiceQuestions.map((q, idx) => {
                      const isRevealed = !!revealedAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-5 space-y-3 shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-base font-kids font-bold text-slate-800">
                              <span className="text-amber-600 mr-2 font-black">Q{idx + 1}.</span>
                              {q.question}
                            </p>
                            <button
                              onClick={() => toggleAnswer(q.id)}
                              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl text-xs sm:text-sm font-kids font-bold transition-all flex items-center gap-1.5 shrink-0 btn-bubbly cursor-pointer border border-amber-600/30"
                            >
                              <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                              {isRevealed ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {isRevealed && (
                            <div className="p-4 rounded-xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 space-y-1.5 animate-fadeIn">
                              <p className="font-kids font-bold text-base text-emerald-900">
                                ✅ Answer: {q.answer}
                              </p>
                              <p className="font-body font-semibold text-sm sm:text-base text-emerald-900/90">
                                💡 {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
