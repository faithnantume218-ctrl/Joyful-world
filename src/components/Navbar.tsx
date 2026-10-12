import React, { useState } from 'react';
import { Page } from '../types';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { isSoundEnabled, toggleSound, playClickPop } from '../utils/sound';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavClick = (page: Page) => {
    playClickPop();
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    const updated = toggleSound();
    setSoundOn(updated);
    if (updated) {
      playClickPop();
    }
  };

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'stories', label: 'Stories' },
    { id: 'notes', label: 'Notes' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl sm:text-3xl font-kids font-bold text-amber-900 tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity focus:outline-hidden"
          aria-label="Kids Learning & Stories Home"
        >
          <span className="text-amber-500 text-3xl">✨</span>
          <span>Kids Learning & Stories</span>
        </button>

        {/* Zone 2: Navigation Links (Clean text links with active indicator) */}
        <nav className="hidden md:flex items-center gap-7 text-base font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative whitespace-nowrap focus:outline-hidden ${
                  isActive
                    ? 'text-amber-700 font-bold'
                    : 'hover:text-amber-600 text-slate-700'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.75 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Sound FX toggle & Quick Quiz Button) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSoundToggle}
            className="p-2 text-slate-600 hover:text-amber-700 hover:bg-amber-100/60 rounded-xl transition-colors flex items-center justify-center"
            title={soundOn ? 'Sound effects enabled (Click to mute)' : 'Sound effects muted (Click to unmute)'}
            aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-amber-700" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('quizzes')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-kids font-semibold text-sm rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Play Quiz</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-amber-100 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-200 bg-amber-50/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPage === item.id
                  ? 'bg-amber-200 text-amber-900 font-bold'
                  : 'text-slate-700 hover:bg-amber-100'
              }`}
            >
              <span>{item.label}</span>
              {currentPage === item.id && <span className="text-amber-600 text-xs">● Active</span>}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('quizzes')}
            className="w-full mt-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-kids font-bold rounded-xl text-center shadow-xs"
          >
            Play Interactive Quiz
          </button>
        </div>
      )}
    </header>
  );
};
