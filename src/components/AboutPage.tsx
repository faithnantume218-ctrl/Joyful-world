import React, { useState } from 'react';
import { Heart, Code2, Users, ShieldCheck, Mail, CheckCircle, FileCode, Layers, Sparkles } from 'lucide-react';
import { playClickPop, playSuccessChime } from '../utils/sound';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'guide'>('mission');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    playSuccessChime();
    setFeedbackSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-200 border-2 border-pink-300 text-pink-950 text-xs sm:text-sm font-kids font-bold shadow-xs">
          <Heart className="w-4 h-4 text-pink-700 animate-pulse" />
          <span>Our Story &amp; How This Website Was Built ✨</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-kids font-black text-slate-900">
          About Kids Learning &amp; Stories 🎈
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-body font-semibold max-w-xl mx-auto">
          A colorful, friendly educational haven crafted to nurture imagination, moral courage, and foundational school skills in children aged 6 to 12.
        </p>

        {/* Tab switch between Mission & Beginner Developer Guide */}
        <div className="inline-flex p-1.5 bg-white/90 backdrop-blur-xs rounded-2xl border-3 border-amber-300 shadow-xs mt-4">
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('mission');
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-kids font-bold transition-all cursor-pointer btn-bubbly ${
              activeTab === 'mission'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xs scale-102'
                : 'text-slate-700 hover:text-slate-900 hover:bg-amber-100'
            }`}
          >
            🌟 Mission &amp; Parents Guide
          </button>
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('guide');
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-kids font-bold transition-all flex items-center gap-2 cursor-pointer btn-bubbly ${
              activeTab === 'guide'
                ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-xs scale-102'
                : 'text-slate-700 hover:text-slate-900 hover:bg-purple-100'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Beginner Developer Guide 💻</span>
          </button>
        </div>
      </div>

      {activeTab === 'mission' ? (
        <div className="space-y-10">
          {/* Mission Core */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-[0_8px_0_rgba(245,158,11,0.15)] space-y-6">
            <h2 className="text-3xl font-kids font-black text-slate-900">
              Why We Created This Platform 🌈
            </h2>
            <p className="text-slate-700 font-body font-semibold leading-relaxed text-base sm:text-lg">
              Learning in childhood should never feel scary or boring! When concepts are explained with vivid pictures, friendly words, and real-life connections, children build natural confidence and curiosity.
            </p>
            <p className="text-slate-700 font-body font-semibold leading-relaxed text-base sm:text-lg">
              Our stories do more than entertain: they highlight universal virtues such as <strong>sharing</strong>, <strong>courage</strong>, <strong>patience</strong>, and <strong>honesty</strong>. Every story concludes with a moral lesson and reflection questions to spark meaningful family conversations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-amber-100/70 border-3 border-amber-300 space-y-2 card-bubbly">
                <div className="w-12 h-12 rounded-2xl bg-amber-300 text-amber-900 flex items-center justify-center text-2xl shadow-xs">
                  🛡️
                </div>
                <h3 className="text-lg font-kids font-bold text-amber-950">100% Safe &amp; Ad-Free</h3>
                <p className="text-sm font-body font-semibold text-amber-900/80 leading-relaxed">
                  Zero advertisements, no external trackers, and no distracting pop-ups. Pure educational focus.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-100/70 border-3 border-sky-300 space-y-2 card-bubbly">
                <div className="w-12 h-12 rounded-2xl bg-sky-300 text-sky-900 flex items-center justify-center text-2xl shadow-xs">
                  📚
                </div>
                <h3 className="text-lg font-kids font-bold text-sky-950">Bite-Sized Subjects</h3>
                <p className="text-sm font-body font-semibold text-sky-900/80 leading-relaxed">
                  Curriculum aligned with elementary standards in English, Math, Science, and Social Studies.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-100/70 border-3 border-emerald-300 space-y-2 card-bubbly">
                <div className="w-12 h-12 rounded-2xl bg-emerald-300 text-emerald-900 flex items-center justify-center text-2xl shadow-xs">
                  🎧
                </div>
                <h3 className="text-lg font-kids font-bold text-emerald-950">Accessible Read Aloud</h3>
                <p className="text-sm font-body font-semibold text-emerald-900/80 leading-relaxed">
                  Younger kids can listen to any story read aloud with clear, friendly text-to-speech audio narration!
                </p>
              </div>
            </div>
          </div>

          {/* Note for Parents & Teachers */}
          <div className="bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 rounded-3xl p-6 sm:p-8 border-4 border-orange-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-orange-950 font-kids font-black text-xl">
              <Users className="w-6 h-6 text-orange-600" />
              <span>A Note for Parents &amp; Teachers 👨‍👩‍👧‍👦</span>
            </div>
            <p className="text-base font-body font-semibold text-slate-800 leading-relaxed">
              We encourage you to read together! After completing any story, tap the &quot;Let&apos;s Think &amp; Talk Together&quot; prompt to explore the characters&apos; dilemmas. In the notes section, use the &quot;Show Answer&quot; buttons as flashcards during homework review.
            </p>
          </div>

          {/* Feedback & Suggestion Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 text-slate-900 font-kids font-black text-xl">
              <Mail className="w-6 h-6 text-amber-500" />
              <span>Suggest a Story or Ask a Question 💌</span>
            </div>
            <p className="text-sm font-body font-semibold text-slate-600">
              Have an idea for a new animal tale or a school topic you want simplified? Send us a note!
            </p>

            {feedbackSent ? (
              <div className="p-5 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 text-base font-kids font-bold flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Thank you! Your idea has been saved with love. Happy learning! ⭐</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                      Your Name or Student Nickname
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Leo (Age 8)"
                      className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                      Topic or Character Idea
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A story about a baby dolphin"
                      className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us what you loved or what you'd like to learn next..."
                    className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-kids font-bold text-sm sm:text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly cursor-pointer"
                >
                  Send Suggestion ✨
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* Beginner Web Developer Guide */
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-purple-300 shadow-[0_8px_0_rgba(168,85,247,0.15)] space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
              <Code2 className="w-4 h-4 text-purple-700" />
              <span>Beginner Developer Documentation 💻</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-kids font-black text-slate-900">
              How This Website Is Built: A Beginner&apos;s Tour 🚀
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-body font-semibold leading-relaxed">
              Welcome to web development! Building an interactive, responsive website might look magical, but it is organized like building with LEGO bricks. Here is a clear breakdown of where each file goes and how the code works:
            </p>

            {/* Folder & File Tree Explanation */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-kids font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-600" />
                <span>1. Project File Structure</span>
              </h3>

              <div className="bg-slate-900 text-slate-200 p-6 rounded-3xl font-mono text-xs sm:text-sm space-y-2.5 overflow-x-auto border-4 border-slate-700">
                <p><span className="text-amber-400 font-bold">index.html</span> — The entry door of the website. Loads fonts and mounts React.</p>
                <p><span className="text-emerald-400 font-bold">src/main.tsx</span> — The JavaScript starting line that connects React to the HTML.</p>
                <p><span className="text-sky-400 font-bold">src/App.tsx</span> — The master conductor component holding page navigation state.</p>
                <p><span className="text-purple-400 font-bold">src/components/</span> — Modular building blocks (Navbar, Footer, HomePage, StoriesPage, NotesPage, QuizPage, AboutPage).</p>
                <p><span className="text-pink-400 font-bold">src/data/</span> — Clean data files (stories.ts, notes.ts, quizzes.ts) separating content from code.</p>
                <p><span className="text-orange-400 font-bold">src/utils/sound.ts</span> — Self-contained Web Audio synthesizer creating sound effects.</p>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl border-3 border-amber-200 bg-amber-50/50 space-y-2 card-bubbly">
                <h4 className="text-base font-kids font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">🧱</span> HTML &amp; Semantic Markup
                </h4>
                <p className="text-sm font-body font-semibold text-slate-700 leading-relaxed">
                  We use tags like <code className="text-amber-800 bg-amber-100 px-1 rounded">&lt;header&gt;</code>, <code className="text-amber-800 bg-amber-100 px-1 rounded">&lt;nav&gt;</code>, <code className="text-amber-800 bg-amber-100 px-1 rounded">&lt;article&gt;</code>, and <code className="text-amber-800 bg-amber-100 px-1 rounded">&lt;footer&gt;</code> so screen readers and search engines understand the structure.
                </p>
              </div>

              <div className="p-5 rounded-2xl border-3 border-sky-200 bg-sky-50/50 space-y-2 card-bubbly">
                <h4 className="text-base font-kids font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">🎨</span> Tailwind CSS Styling
                </h4>
                <p className="text-sm font-body font-semibold text-slate-700 leading-relaxed">
                  Instead of writing separate CSS files, we use utility classes directly on elements (e.g., <code className="text-sky-800 bg-sky-100 px-1 rounded">rounded-3xl p-6 bg-white</code>). This keeps styling maintainable and mobile-responsive.
                </p>
              </div>

              <div className="p-5 rounded-2xl border-3 border-emerald-200 bg-emerald-50/50 space-y-2 card-bubbly">
                <h4 className="text-base font-kids font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">⚡</span> React State Management
                </h4>
                <p className="text-sm font-body font-semibold text-slate-700 leading-relaxed">
                  Whenever the user clicks a tab or chooses a quiz answer, React uses the <code className="text-emerald-800 bg-emerald-100 px-1 rounded">useState()</code> hook to update variables and immediately re-render only the affected UI components without a full page refresh.
                </p>
              </div>

              <div className="p-5 rounded-2xl border-3 border-purple-200 bg-purple-50/50 space-y-2 card-bubbly">
                <h4 className="text-base font-kids font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">🔊</span> Browser APIs (Audio &amp; TTS)
                </h4>
                <p className="text-sm font-body font-semibold text-slate-700 leading-relaxed">
                  No heavy external media files are needed! The Web Audio API synthesizes cheerful chimes using mathematical frequencies, and <code className="text-purple-800 bg-purple-100 px-1 rounded">speechSynthesis</code> reads stories aloud in natural English.
                </p>
              </div>
            </div>

            {/* Beginner Best Practices */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 to-orange-100 border-3 border-amber-300 space-y-3">
              <h4 className="text-base font-kids font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Beginner Golden Rules to Remember:</span>
              </h4>
              <ul className="text-sm font-body font-semibold text-amber-950 space-y-2 list-disc list-inside">
                <li><strong>Separate your data:</strong> Keep your stories and notes in separate files (<code className="font-bold">src/data/</code>) so adding new content doesn&apos;t risk breaking your UI.</li>
                <li><strong>Always test mobile widths:</strong> Use flexbox and CSS grids with responsive breakpoints (<code className="font-bold">grid-cols-1 md:grid-cols-2</code>).</li>
                <li><strong>Provide instant feedback:</strong> Always let the user know what happened after they click (sound, color shift, or alert).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
