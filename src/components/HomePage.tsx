import React, { useState } from 'react';
import { Page, Story } from '../types';
import { storiesData } from '../data/stories';
import { BookOpen, FileText, Brain, Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { playClickPop, playSuccessChime } from '../utils/sound';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectStory: (story: Story) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectStory }) => {
  const featuredStory = storiesData[0]; // Benny the Rabbit
  const [funFactIndex, setFunFactIndex] = useState(0);
  const [teaserSelected, setTeaserSelected] = useState<number | null>(null);

  const funFacts = [
    {
      emoji: '🪐',
      title: 'Saturn Could Float!',
      theme: 'from-amber-100 via-orange-100 to-yellow-100 border-amber-300 text-amber-950',
      badge: 'bg-amber-300 text-amber-900',
      fact: 'Saturn is made mostly of hydrogen and helium gas. It is so light that if you had an enormous bathtub full of water, Saturn would float like a giant rubber duck!'
    },
    {
      emoji: '🐙',
      title: 'Three Hearts for an Octopus!',
      theme: 'from-sky-100 via-cyan-100 to-blue-100 border-sky-300 text-sky-950',
      badge: 'bg-sky-300 text-sky-900',
      fact: 'An octopus has three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps it through the rest of the body.'
    },
    {
      emoji: '🍯',
      title: 'Ancient Honey Never Spoils!',
      theme: 'from-emerald-100 via-teal-100 to-green-100 border-emerald-300 text-emerald-950',
      badge: 'bg-emerald-300 text-emerald-900',
      fact: 'Archaeologists exploring ancient Egyptian tombs found pots of honey that are over 3,000 years old—and it is still completely edible, sweet, and golden!'
    }
  ];

  const handleNextFact = () => {
    playClickPop();
    setFunFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  const teaserQuestion = {
    question: 'How many legs does a spider have? 🕷️',
    options: ['6 legs (Like an insect)', '8 legs (Arachnid power!)', '10 legs (Like a crab)'],
    correct: 1,
    explanation: 'Spiders are arachnids, not insects! All arachnids have 8 legs, while insects have 6.'
  };

  const handleTeaserClick = (index: number) => {
    setTeaserSelected(index);
    if (index === teaserQuestion.correct) {
      playSuccessChime();
    } else {
      playClickPop();
    }
  };

  const currentFact = funFacts[funFactIndex];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-200 via-orange-100 to-pink-100 border-4 border-amber-300 p-6 sm:p-10 lg:p-12 shadow-[0_8px_0_rgba(245,158,11,0.2)]">
        {/* Floating playful shapes */}
        <div className="absolute top-3 right-6 text-3xl sm:text-4xl animate-float select-none opacity-80">
          ⭐
        </div>
        <div className="absolute bottom-4 left-6 text-3xl sm:text-4xl animate-bounce select-none opacity-80">
          🌈
        </div>
        <div className="absolute top-1/2 right-1/3 text-2xl animate-spin select-none opacity-40">
          ✨
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border-2 border-amber-300 text-amber-900 text-sm font-kids font-bold shadow-xs">
              <span className="text-lg">🎈</span>
              <span>Learning is a Colorful Adventure for Ages 6–12!</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-kids font-black text-slate-900 leading-tight">
              Where Learning Feels Like a{' '}
              <span className="rainbow-text underline decoration-pink-400 decoration-wavy decoration-4">
                Party!
              </span>{' '}
              🎉
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-body font-semibold max-w-xl">
              Welcome to <strong>Kids Learning &amp; Stories</strong>! Dive into fun illustrated animal tales with moral lessons, explore super-easy school notes, and show off your brainpower with interactive quizzes!
            </p>

            {/* Joyful Bubbly Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('stories');
                }}
                className="px-7 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-kids font-extrabold text-lg rounded-2xl border-2 border-rose-600/40 btn-bubbly flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-6 h-6" />
                <span>Read Stories 📖</span>
              </button>

              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('quizzes');
                }}
                className="px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-kids font-extrabold text-lg rounded-2xl border-2 border-emerald-600/40 btn-bubbly flex items-center gap-2.5 cursor-pointer"
              >
                <Brain className="w-6 h-6" />
                <span>Play Quiz 🧠</span>
              </button>

              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('notes');
                }}
                className="px-7 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-kids font-extrabold text-lg rounded-2xl border-2 border-sky-600/40 btn-bubbly flex items-center gap-2.5 cursor-pointer"
              >
                <FileText className="w-6 h-6" />
                <span>School Notes 📚</span>
              </button>
            </div>

            <div className="pt-2 text-sm text-amber-950 font-kids font-bold flex flex-wrap items-center gap-4">
              <span className="bg-white/80 px-3 py-1 rounded-full border border-amber-300">⭐ 100% Free &amp; Ad-Free</span>
              <span className="bg-white/80 px-3 py-1 rounded-full border border-amber-300">🔊 Listen Aloud Reader</span>
              <span className="bg-white/80 px-3 py-1 rounded-full border border-amber-300">🏆 Win Explorer Badges</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-6 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src="/src/assets/images/hero_kids_learning_1791278874175.jpg"
                alt="Happy children exploring books, science, and nature under a bright sky"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-96"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-amber-950/80 via-amber-950/40 to-transparent p-4 text-white">
                <p className="text-base font-kids font-bold text-center">🌟 Join thousands of smart young readers today!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars Grid with Rich Cheerful Colors */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-kids font-black text-slate-900">
            Four Colorful Ways to Learn! 🎨
          </h2>
          <p className="text-base text-slate-600 font-body font-semibold">
            Big buttons, cheerful illustrations, and simple explanations made especially for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Stories (Rose / Pink) */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('stories');
            }}
            className="group cursor-pointer bg-gradient-to-b from-rose-50 to-pink-100/70 rounded-3xl p-6 border-3 border-rose-300 card-bubbly space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-400 text-white flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
              📖
            </div>
            <h3 className="text-xl font-kids font-bold text-rose-950 group-hover:text-rose-600 transition-colors">
              Moral Stories
            </h3>
            <p className="text-sm text-slate-700 font-body leading-relaxed">
              Illustrated animal adventures and brave kid tales that teach kindness, sharing, and honesty.
            </p>
            <div className="text-sm font-kids font-bold text-rose-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read stories ➔</span>
            </div>
          </div>

          {/* Card 2: Notes (Sky / Cyan) */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('notes');
            }}
            className="group cursor-pointer bg-gradient-to-b from-sky-50 to-cyan-100/70 rounded-3xl p-6 border-3 border-sky-300 card-bubbly space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-sky-400 text-white flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
              📚
            </div>
            <h3 className="text-xl font-kids font-bold text-sky-950 group-hover:text-sky-600 transition-colors">
              Subject Notes
            </h3>
            <p className="text-sm text-slate-700 font-body leading-relaxed">
              Easy bite-sized summaries for English, Mathematics, Science, and Social Studies with practice questions!
            </p>
            <div className="text-sm font-kids font-bold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore notes ➔</span>
            </div>
          </div>

          {/* Card 3: Quizzes (Emerald / Mint) */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('quizzes');
            }}
            className="group cursor-pointer bg-gradient-to-b from-emerald-50 to-teal-100/70 rounded-3xl p-6 border-3 border-emerald-300 card-bubbly space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-400 text-white flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
              🧠
            </div>
            <h3 className="text-xl font-kids font-bold text-emerald-950 group-hover:text-emerald-600 transition-colors">
              Fun Quizzes
            </h3>
            <p className="text-sm text-slate-700 font-body leading-relaxed">
              Exciting multiple-choice questions with instant correct/wrong bells, chime sounds, and friendly hints!
            </p>
            <div className="text-sm font-kids font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Play quiz ➔</span>
            </div>
          </div>

          {/* Card 4: Audio Read Aloud (Purple / Lavender) */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('stories');
            }}
            className="group cursor-pointer bg-gradient-to-b from-purple-50 to-indigo-100/70 rounded-3xl p-6 border-3 border-purple-300 card-bubbly space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-400 text-white flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xs">
              🔊
            </div>
            <h3 className="text-xl font-kids font-bold text-purple-950 group-hover:text-purple-600 transition-colors">
              Listen Aloud
            </h3>
            <p className="text-sm text-slate-700 font-body leading-relaxed">
              Every story has a friendly narrator! Listen along while resting your eyes or reading before bedtime.
            </p>
            <div className="text-sm font-kids font-bold text-purple-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Try voice reader ➔</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story Spotlight with Warm Golden Glow */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-50 to-pink-50 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-[0_8px_0_rgba(245,158,11,0.15)]">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-5/12">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 px-3 py-1 rounded-xl text-xs font-kids font-extrabold shadow-sm border border-amber-500">
                🌟 Today&apos;s Featured Story!
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-4">
            <div className="flex items-center gap-2 text-xs font-kids font-bold text-amber-900">
              <span className="bg-amber-200 px-2.5 py-0.5 rounded-lg">{featuredStory.ageGroup}</span>
              <span>·</span>
              <span className="bg-rose-200 px-2.5 py-0.5 rounded-lg text-rose-900">{featuredStory.category}</span>
              <span>·</span>
              <span className="bg-sky-200 px-2.5 py-0.5 rounded-lg text-sky-900">⏱️ {featuredStory.readTime}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-kids font-black text-slate-900 leading-snug">
              {featuredStory.title}
            </h2>

            <p className="text-base text-slate-700 font-body leading-relaxed">
              {featuredStory.summary}
            </p>

            <div className="p-4 rounded-2xl bg-white/90 border-2 border-amber-300 text-sm font-body text-amber-950 shadow-xs">
              <strong className="font-kids text-amber-800">🌟 Moral Lesson:</strong> {featuredStory.moral}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playClickPop();
                  onSelectStory(featuredStory);
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-kids font-bold text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Story Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Interactive Stage: Daily Fun Fact + Quick Brain Teaser */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Fun Fact */}
        <div className={`bg-gradient-to-br ${currentFact.theme} rounded-3xl p-6 sm:p-8 border-4 card-bubbly space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-kids font-black text-xl">
              <span className="text-3xl animate-bounce">{currentFact.emoji}</span>
              <span>Did You Know?</span>
            </div>
            <button
              onClick={handleNextFact}
              className="text-xs font-kids font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 shadow-2xs btn-bubbly cursor-pointer"
            >
              Next Fact ➔
            </button>
          </div>

          <h3 className="text-2xl font-kids font-black">
            {currentFact.title}
          </h3>

          <p className="text-base font-body leading-relaxed font-semibold">
            {currentFact.fact}
          </p>

          <div className="pt-2 text-xs font-kids font-bold flex items-center gap-2 opacity-90">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>Curious minds discover something awesome every single day!</span>
          </div>
        </div>

        {/* Quick Brain Teaser */}
        <div className="bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 card-bubbly space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-emerald-950 font-kids font-black text-xl">
              <span className="text-3xl animate-wiggle">🧠</span>
              <span>Quick Brain Teaser</span>
            </div>
            <span className="text-xs font-kids font-bold px-3 py-1 rounded-xl bg-emerald-300 text-emerald-950 border border-emerald-400">
              Science
            </span>
          </div>

          <h3 className="text-lg font-kids font-bold text-emerald-950">
            {teaserQuestion.question}
          </h3>

          <div className="space-y-2.5">
            {teaserQuestion.options.map((opt, idx) => {
              const isSelected = teaserSelected === idx;
              const isCorrect = idx === teaserQuestion.correct;
              let btnClass = 'bg-white hover:bg-emerald-50 border-emerald-300 text-slate-800';

              if (teaserSelected !== null) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-xs';
                } else if (isSelected) {
                  btnClass = 'bg-rose-200 text-rose-900 border-rose-400 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleTeaserClick(idx)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border-2 text-sm sm:text-base font-kids font-bold transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                >
                  <span>{opt}</span>
                  {teaserSelected !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {teaserSelected !== null && (
            <p className="text-sm font-body font-semibold text-emerald-950 bg-white/90 p-4 rounded-2xl border-2 border-emerald-300 animate-fadeIn">
              💡 {teaserQuestion.explanation}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
