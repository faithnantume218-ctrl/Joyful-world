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
    { id: 'all', label: 'All Subjects', icon: '🎒', color: 'border-amber-300 bg-amber-50 text-amber-900' },
    { id: 'english', label: 'English', icon: '📖', color: 'border-orange-300 bg-orange-50 text-orange-900' },
    { id: 'mathematics', label: 'Mathematics', icon: '🔢', color: 'border-sky-300 bg-sky-50 text-sky-900' },
    { id: 'science', label: 'Science', icon: '🔬', color: 'border-emerald-300 bg-emerald-50 text-emerald-900' },
    { id: 'social-studies', label: 'Social Studies', icon: '🌍', color: 'border-indigo-300 bg-indigo-50 text-indigo-900' },
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-sky-700" />
          <span>Easy Explanations, Examples & Practice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900">
          Learning Notes & Study Guides
        </h1>
        <p className="text-base text-slate-600">
          Clear, simple school notes broken down step-by-step for English, Mathematics, Science, and Social Studies.
        </p>
      </div>

      {/* Subject Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {subjects.map((sub) => {
            const isActive = activeSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  playClickPop();
                  setActiveSubject(sub.id as typeof activeSubject);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search inside notes */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any topic, definition, or question (e.g., fractions, water cycle, verbs, maps)..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Notes Cards List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <p className="text-4xl">📚</p>
          <h3 className="text-lg font-kids font-bold text-slate-800">No notes matched your search</h3>
          <p className="text-sm text-slate-500">Try searching for words like &quot;noun&quot;, &quot;solar&quot;, or &quot;fractions&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveSubject('all');
            }}
            className="px-4 py-2 bg-sky-500 text-white font-semibold text-xs rounded-xl"
          >
            Show All Notes
          </button>
        </div>
      ) : (
        <div className="space-y-8">
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

            const badgeColor =
              topic.subject === 'english'
                ? 'bg-orange-100 text-orange-800'
                : topic.subject === 'mathematics'
                ? 'bg-sky-100 text-sky-800'
                : topic.subject === 'science'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-indigo-100 text-indigo-800';

            return (
              <article
                key={topic.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 transition-all hover:border-slate-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2.5 py-0.5 rounded-md font-semibold ${badgeColor}`}>
                        {subjectLabel}
                      </span>
                      <span className="text-slate-500 font-medium">{topic.gradeLevel}</span>
                    </div>
                    <h2 className="text-2xl font-kids font-bold text-slate-900 tracking-tight">
                      {topic.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => toggleMastered(topic.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-kids font-bold transition-all self-start sm:self-auto ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isMastered ? 'Topic Mastered! ⭐' : 'Mark as Mastered'}</span>
                  </button>
                </div>

                {/* Simple Explanation */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    📖 Simple Explanation
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {topic.explanation.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Real-Life Examples Box */}
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-900 font-kids font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Real-Life Examples</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950 list-disc list-inside">
                    {topic.examples.map((ex, i) => (
                      <li key={i} className="leading-relaxed">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Points to Remember */}
                <div className="rounded-2xl bg-indigo-50/60 border border-indigo-200 p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-900 font-kids font-bold text-sm">
                    <Star className="w-4 h-4 text-indigo-600" />
                    <span>Important Points to Remember</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-indigo-950 list-disc list-inside">
                    {topic.importantPoints.map((pt, i) => (
                      <li key={i} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practice Questions */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>✏️ Practice Questions (Try Yourself!)</span>
                  </h3>

                  <div className="space-y-3">
                    {topic.practiceQuestions.map((q, idx) => {
                      const isRevealed = !!revealedAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-sm font-semibold text-slate-800">
                              <span className="text-slate-400 mr-1.5 font-bold">Q{idx + 1}.</span>
                              {q.question}
                            </p>
                            <button
                              onClick={() => toggleAnswer(q.id)}
                              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
                            >
                              <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                              {isRevealed ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {isRevealed && (
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1 animate-fadeIn">
                              <p className="font-bold text-emerald-800">
                                Answer: {q.answer}
                              </p>
                              <p className="text-emerald-900/80">
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
