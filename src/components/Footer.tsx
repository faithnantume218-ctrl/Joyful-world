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
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="text-2xl font-kids font-bold text-white tracking-tight">
                Kids Learning & Stories
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A colorful, safe, and cheerful educational universe created to make reading fun, school concepts simple, and quizzes rewarding for kids aged 6 to 12.
            </p>
            <div className="pt-2 text-xs text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Ad-free · Child-safe content · Made for curious young explorers</span>
            </div>
          </div>

          {/* Column 2: Quick Jump */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Explore Pages
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('stories')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Moral Stories Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('notes')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <FileText className="w-3.5 h-3.5" /> School Subject Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quizzes')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <Brain className="w-3.5 h-3.5" /> Fun Knowledge Quizzes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> About & Developer Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Subjects Covered */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
              School Subjects
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li>📖 English (Nouns, Verbs, Punctuation)</li>
              <li>🔢 Mathematics (Fractions, Multiplication)</li>
              <li>🔬 Science (Water Cycle, Planets, Nature)</li>
              <li>🌍 Social Studies (Maps, Continents, Helpers)</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Kids Learning & Stories. Built for young learners, parents, and teachers.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
            <span>for growing minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
