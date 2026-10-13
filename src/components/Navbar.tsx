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

  const navItems: { id: Page; label: string; emoji: string; activeColor: string }[] = [
    { id: 'home', label: 'Home', emoji: '🏠', activeColor: 'bg-amber-400 text-amber-950 border-amber-500' },
    { id: 'stories', label: 'Stories', emoji: '📖', activeColor: 'bg-rose-400 text-rose-950 border-rose-500' },
    { id: 'notes', label: 'Notes', emoji: '📚', activeColor: 'bg-sky-400 text-sky-950 border-sky-500' },
    { id: 'quizzes', label: 'Quizzes', emoji: '🧠', activeColor: 'bg-emerald-400 text-emerald-950 border-emerald-500' },
    { id: 'about', label: 'About', emoji: '🌟', activeColor: 'bg-purple-400 text-purple-950 border-purple-500' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-sm">
      {/* Rainbow candy bar ribbon */}
      <div className="h-2 w-full bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 via-sky-400 to-purple-400" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display face with playful emoji) */}
        <button
          onClick={() => handleNavClick('home')}
          className="group text-2xl sm:text-3xl font-kids font-bold text-slate-900 tracking-tight flex items-center gap-2.5 hover:scale-102 transition-transform focus:outline-hidden"
          aria-label="Kids Learning & Stories Home"
        >
          <span className="text-3xl sm:text-4xl animate-bounce">🎈</span>
          <span className="rainbow-text font-sniglet font-extrabold text-2xl sm:text-3xl drop-shadow-2xs">
            Kids Learning &amp; Stories
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean text buttons with cheerful color badges) */}
        <nav className="hidden md:flex items-center gap-2 font-kids font-bold text-base">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-2xl border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? `${item.activeColor} shadow-[0_3px_0_rgba(0,0,0,0.15)] scale-105`
                    : 'border-transparent text-slate-700 hover:bg-amber-100 hover:text-slate-900'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Sound FX toggle & Playful 3D Quiz Button) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSoundToggle}
            className="p-2.5 text-slate-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-200 border-2 border-amber-300 rounded-2xl transition-all flex items-center justify-center cursor-pointer shadow-2xs"
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
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-kids font-bold text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Play Quiz!</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-amber-100 rounded-xl transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-amber-300 bg-amber-50 px-4 pt-3 pb-5 space-y-2.5 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-base font-kids font-bold transition-all flex items-center justify-between border-2 ${
                currentPage === item.id
                  ? `${item.activeColor} shadow-xs`
                  : 'bg-white border-amber-200 text-slate-800 hover:bg-amber-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </div>
              {currentPage === item.id && <span className="text-xs font-black">● Playing</span>}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('quizzes')}
            className="w-full mt-3 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-kids font-bold text-lg rounded-2xl text-center btn-bubbly"
          >
            ⭐ Play Interactive Quiz!
          </button>
        </div>
      )}
    </header>
  );
};
