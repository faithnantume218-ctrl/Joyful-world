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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-amber-700" />
          <span>Our Story & How This Website Was Built</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900">
          About Kids Learning & Stories
        </h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto">
          An open, friendly learning portal crafted to nurture imagination, moral character, and foundational school skills in children aged 6 to 12.
        </p>

        {/* Tab switch between Mission & Beginner Developer Guide */}
        <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs mt-4">
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('mission');
            }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'mission'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌟 Mission & Parents Guide
          </button>
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('guide');
            }}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Beginner Web Developer Guide</span>
          </button>
        </div>
      </div>

      {activeTab === 'mission' ? (
        <div className="space-y-10">
          {/* Mission Core */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-kids font-bold text-slate-900">
              Why We Created This Platform
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Learning in childhood should never feel like a chore. When concepts are explained with vivid pictures, friendly words, and real-life connections, children build natural confidence and curiosity.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Our stories do more than entertain: they highlight universal virtues such as <strong>sharing</strong>, <strong>courage</strong>, <strong>patience</strong>, and <strong>honesty</strong>. Every story concludes with a moral lesson and reflection questions to spark meaningful family conversations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center text-xl">
                  🛡️
                </div>
                <h3 className="text-base font-kids font-bold text-amber-950">100% Safe & Ad-Free</h3>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Zero advertisements, no external trackers, and no distracting pop-ups. Pure educational focus.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sky-200 text-sky-800 flex items-center justify-center text-xl">
                  📚
                </div>
                <h3 className="text-base font-kids font-bold text-sky-950">Bite-Sized Subjects</h3>
                <p className="text-xs text-sky-900/80 leading-relaxed">
                  Curriculum aligned with elementary standards in English, Math, Science, and Social Studies.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center text-xl">
                  🎧
                </div>
                <h3 className="text-base font-kids font-bold text-emerald-950">Accessible Read Aloud</h3>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Younger kids can listen to any story read aloud with clear, friendly text-to-speech audio.
                </p>
              </div>
            </div>
          </div>

          {/* Note for Parents & Teachers */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 sm:p-8 border border-orange-200 space-y-4">
            <div className="flex items-center gap-2 text-orange-950 font-kids font-bold text-lg">
              <Users className="w-5 h-5 text-orange-600" />
              <span>A Note for Parents & Teachers</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              We encourage you to read together! After completing any story, tap the &quot;Let&apos;s Think & Talk Together&quot; prompt to explore the characters&apos; dilemmas. In the notes section, use the &quot;Show Answer&quot; buttons as flashcards during homework review.
            </p>
          </div>

          {/* Feedback & Suggestion Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-kids font-bold text-lg">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>Suggest a Story or Ask a Question</span>
            </div>
            <p className="text-xs text-slate-600">
              Have an idea for a new animal tale or a school topic you want simplified? Send us a note!
            </p>

            {feedbackSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your suggestion has been received. Happy learning!</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name or Student Nickname
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Leo (Age 8)"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Topic or Character Idea
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A story about a baby dolphin"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us what you loved or what you'd like to learn next..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-kids font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  Send Suggestion ✨
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* Beginner Web Developer Guide (Fulfilling Prompt 6) */
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold">
              <Code2 className="w-3.5 h-3.5 text-indigo-700" />
              <span>Beginner Developer Documentation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-kids font-bold text-slate-900">
              How This Website Is Built: A Beginner&apos;s Tour
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Welcome to web development! Building an interactive, responsive website might look magical, but it is organized like building with LEGO bricks. Here is a clear breakdown of where each file goes and how the code works:
            </p>

            {/* Folder & File Tree Explanation */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-kids font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-600" />
                <span>1. Project File Structure</span>
              </h3>

              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
                <p><span className="text-amber-400">index.html</span> — The entry door of the website. Loads fonts and mounts React.</p>
                <p><span className="text-emerald-400">src/main.tsx</span> — The JavaScript starting line that connects React to the HTML.</p>
                <p><span className="text-sky-400">src/App.tsx</span> — The master conductor component holding page navigation state.</p>
                <p><span className="text-purple-400">src/components/</span> — Modular building blocks (Navbar, Footer, HomePage, StoriesPage, NotesPage, QuizPage, AboutPage).</p>
                <p><span className="text-pink-400">src/data/</span> — Clean data files (stories.ts, notes.ts, quizzes.ts) separating content from code.</p>
                <p><span className="text-orange-400">src/utils/sound.ts</span> — Self-contained Web Audio synthesizer creating sound effects.</p>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-base">🧱</span> HTML & Semantic Markup
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We use tags like <code className="text-amber-700 bg-amber-50 px-1 rounded">&lt;header&gt;</code>, <code className="text-amber-700 bg-amber-50 px-1 rounded">&lt;nav&gt;</code>, <code className="text-amber-700 bg-amber-50 px-1 rounded">&lt;article&gt;</code>, and <code className="text-amber-700 bg-amber-50 px-1 rounded">&lt;footer&gt;</code> instead of plain divs so screen readers and search engines understand the structure.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-base">🎨</span> Tailwind CSS Styling
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Instead of writing separate CSS files, we use utility classes directly on elements (e.g., <code className="text-sky-700 bg-sky-50 px-1 rounded">rounded-2xl p-6 bg-white</code>). This keeps styling maintainable and mobile-responsive with prefixes like <code className="text-sky-700 bg-sky-50 px-1 rounded">md:</code>.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-base">⚡</span> React State Management
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whenever the user clicks a tab or chooses a quiz answer, React uses the <code className="text-emerald-700 bg-emerald-50 px-1 rounded">useState()</code> hook to update variables and immediately re-render only the affected UI components without a full page refresh.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-base">🔊</span> Browser APIs (Audio & TTS)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No heavy external media files are needed! The Web Audio API synthesizes cheerful chimes using mathematical frequencies, and <code className="text-purple-700 bg-purple-50 px-1 rounded">window.speechSynthesis</code> reads stories aloud in natural spoken English.
                </p>
              </div>
            </div>

            {/* Beginner Best Practices */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Beginner Golden Rules to Remember:</span>
              </h4>
              <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                <li><strong>Separate your data:</strong> Keep your stories and notes in separate files (<code className="font-semibold">src/data/</code>) so adding new content doesn&apos;t risk breaking your UI.</li>
                <li><strong>Always test mobile widths:</strong> Use flexbox and CSS grids with responsive breakpoints (<code className="font-semibold">grid-cols-1 md:grid-cols-2</code>).</li>
                <li><strong>Provide instant feedback:</strong> Always let the user know what happened after they click (sound, color shift, or alert).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
