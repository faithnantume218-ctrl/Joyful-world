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
      fact: 'Saturn is made mostly of hydrogen and helium gas. It is so light that if you had an enormous bathtub full of water, Saturn would float like a giant rubber duck!'
    },
    {
      emoji: '🐙',
      title: 'Three Hearts for an Octopus',
      fact: 'An octopus has three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps it through the rest of the body.'
    },
    {
      emoji: '🍯',
      title: 'Ancient Honey Never Spoils',
      fact: 'Archaeologists exploring ancient Egyptian tombs found pots of honey that are over 3,000 years old—and it is still completely edible and sweet!'
    }
  ];

  const handleNextFact = () => {
    playClickPop();
    setFunFactIndex((prev) => (prev + 1) % funFacts.length);
  };

  const teaserQuestion = {
    question: 'How many legs does a spider have?',
    options: ['6 legs', '8 legs', '10 legs'],
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

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 border border-amber-200/80 p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-200/70 text-amber-900 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Fun Learning & Storybook Wonder for Ages 6–12</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-kids font-bold text-slate-900 leading-tight">
              Where Learning Feels Like an <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">Adventure!</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
              Welcome to <strong>Kids Learning & Stories</strong>. Read heart-warming illustrated stories with moral lessons, explore simple school notes for English, Math, Science & Social Studies, and test your smarts with interactive quizzes!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('stories');
                }}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-kids font-bold text-base rounded-2xl shadow-sm transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Read Stories</span>
              </button>

              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('quizzes');
                }}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-kids font-bold text-base rounded-2xl shadow-sm transition-all flex items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                <span>Try a Quiz</span>
              </button>

              <button
                onClick={() => {
                  playClickPop();
                  onNavigate('notes');
                }}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-kids font-semibold text-base rounded-2xl shadow-xs transition-all flex items-center gap-2"
              >
                <FileText className="w-5 h-5 text-indigo-500" />
                <span>Study Notes</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-4">
              <span>✓ 100% Free & Ad-Free</span>
              <span>·</span>
              <span>✓ Built-in Read Aloud Voice</span>
              <span>·</span>
              <span>✓ Instant Quiz Scoring</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white transform lg:rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="/src/assets/images/hero_kids_learning_1791278874175.jpg"
                alt="Happy children exploring books, science, and nature under a bright sky"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-96"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
                <p className="text-sm font-semibold">Join thousands of smart young readers today!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-kids font-bold text-slate-900">
            Four Fun Ways to Learn & Grow
          </h2>
          <p className="text-sm text-slate-600">
            Everything designed with simple language, big buttons, and friendly illustrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Stories */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('stories');
            }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📖
            </div>
            <h3 className="text-lg font-kids font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Moral Stories
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Illustrated stories featuring friendly animals and brave children that teach kindness, courage, and honesty.
            </p>
            <div className="text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Notes */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('notes');
            }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="text-lg font-kids font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
              Subject Notes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear bite-sized explanations for English, Mathematics, Science, and Social Studies with practice questions.
            </p>
            <div className="text-xs font-semibold text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Quizzes */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('quizzes');
            }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🧠
            </div>
            <h3 className="text-lg font-kids font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Interactive Quizzes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiple-choice questions with instant correct/wrong feedback, cheerful sound effects, and explanations!
            </p>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Start quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Audio Read Aloud */}
          <div
            onClick={() => {
              playClickPop();
              onNavigate('stories');
            }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🔊
            </div>
            <h3 className="text-lg font-kids font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              Listen Aloud
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every story comes with an interactive audio reader. Listen along while the words are highlighted on screen!
            </p>
            <div className="text-xs font-semibold text-purple-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Try voice reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story Spotlight */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-5/12">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-amber-100 aspect-4/3">
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-bold text-amber-800 shadow-xs">
                🌟 Today&apos;s Featured Story
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12 space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-amber-700">{featuredStory.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredStory.category}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredStory.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-kids font-bold text-slate-900">
              {featuredStory.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {featuredStory.summary}
            </p>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <strong>Moral Lesson:</strong> {featuredStory.moral}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playClickPop();
                  onSelectStory(featuredStory);
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-kids font-bold text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2"
              >
                <span>Read Full Story Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Interactive Stage: Daily Fun Fact + Quick Brain Teaser */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Fun Fact */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-3xl p-6 sm:p-8 border border-indigo-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900 font-kids font-bold text-lg">
              <span className="text-2xl">{funFacts[funFactIndex].emoji}</span>
              <span>Did You Know?</span>
            </div>
            <button
              onClick={handleNextFact}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-indigo-700 transition-colors shadow-2xs"
            >
              Next Fact ➔
            </button>
          </div>

          <h3 className="text-xl font-kids font-bold text-indigo-950">
            {funFacts[funFactIndex].title}
          </h3>

          <p className="text-sm text-indigo-900/80 leading-relaxed">
            {funFacts[funFactIndex].fact}
          </p>

          <div className="pt-2 text-xs text-indigo-700 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-indigo-600" />
            <span>Curious minds discover something new every day!</span>
          </div>
        </div>

        {/* Quick Brain Teaser */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-kids font-bold text-lg">
              <span className="text-2xl">🧠</span>
              <span>Quick Brain Teaser</span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-200/70 text-emerald-900">
              Science
            </span>
          </div>

          <h3 className="text-base font-kids font-semibold text-emerald-950">
            {teaserQuestion.question}
          </h3>

          <div className="space-y-2">
            {teaserQuestion.options.map((opt, idx) => {
              const isSelected = teaserSelected === idx;
              const isCorrect = idx === teaserQuestion.correct;
              let btnClass = 'bg-white hover:bg-emerald-50 border-emerald-200 text-slate-800';

              if (teaserSelected !== null) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-100 text-rose-800 border-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleTeaserClick(idx)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {teaserSelected !== null && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {teaserSelected !== null && (
            <p className="text-xs text-emerald-900 bg-white/70 p-3 rounded-xl border border-emerald-200">
              {teaserQuestion.explanation}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
