import React from 'react';
import { Page } from '../types';
import { Heart, Sparkles, BookOpen, FileText, Brain, HelpCircle } from 'lucide-react';
import { playClickPop } from '../utils/sound';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: Page) => {
    playClickPop();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t-4 border-amber-400 relative">
      {/* Rainbow candy bar ribbon */}
      <div className="h-2 w-full bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 via-sky-400 to-purple-400" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl animate-bounce">🎈</span>
              <span className="text-2xl sm:text-3xl font-kids font-bold text-white tracking-tight">
                Kids Learning &amp; Stories
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 font-body font-semibold max-w-md leading-relaxed">
              A colorful, safe, and cheerful educational universe created to make reading fun, school concepts simple, and quizzes rewarding for kids aged 6 to 12.
            </p>
            <div className="pt-2 text-xs sm:text-sm text-amber-300 font-kids font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ad-free · Child-safe content · Made for curious young explorers! ⭐</span>
            </div>
          </div>

          {/* Column 2: Quick Jump */}
          <div>
            <h3 className="text-base font-kids font-bold uppercase tracking-wider text-amber-300 mb-3">
              Explore Pages 🚀
            </h3>
            <ul className="space-y-2 text-sm sm:text-base font-kids font-semibold">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 cursor-pointer"
                >
                  <span>🏠</span> <span>Home Overview</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('stories')}
                  className="hover:text-rose-300 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 cursor-pointer"
                >
                  <span>📖</span> <span>Moral Stories Library</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('notes')}
                  className="hover:text-sky-300 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 cursor-pointer"
                >
                  <span>📚</span> <span>School Subject Notes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quizzes')}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 cursor-pointer"
                >
                  <span>🧠</span> <span>Fun Knowledge Quizzes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-2 text-slate-300 hover:translate-x-1 cursor-pointer"
                >
                  <span>🌟</span> <span>About &amp; Developer Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Subjects Covered */}
          <div>
            <h3 className="text-base font-kids font-bold uppercase tracking-wider text-amber-300 mb-3">
              School Subjects 🎒
            </h3>
            <ul className="space-y-2 text-sm sm:text-base font-body font-semibold text-slate-300">
              <li className="flex items-center gap-2"><span>📖</span> English (Nouns, Verbs, Punctuation)</li>
              <li className="flex items-center gap-2"><span>🔢</span> Mathematics (Fractions, Multiplication)</li>
              <li className="flex items-center gap-2"><span>🔬</span> Science (Water Cycle, Planets, Nature)</li>
              <li className="flex items-center gap-2"><span>🌍</span> Social Studies (Maps, Continents, Helpers)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-kids text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Kids Learning &amp; Stories. Built with love for young learners, parents, and teachers.</p>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-0.5 animate-pulse" />
            <span>for bright growing minds ✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
