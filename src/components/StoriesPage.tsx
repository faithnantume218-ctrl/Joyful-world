import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { storiesData } from '../data/stories';
import { BookOpen, Sparkles, Volume2, VolumeX, ArrowLeft, Heart, Search, CheckCircle, MessageCircle } from 'lucide-react';
import { playClickPop, playSuccessChime } from '../utils/sound';

interface StoriesPageProps {
  selectedStory: Story | null;
  onSelectStory: (story: Story | null) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ selectedStory, onSelectStory }) => {
  const [filterAge, setFilterAge] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readStories, setReadStories] = useState<string[]>([]);
  const [favoriteStories, setFavoriteStories] = useState<string[]>([]);

  // Speech synthesis cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedStory]);

  const handleStartReadAloud = (story: Story) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = `${story.title}. A story for ${story.ageGroup}. ${story.content.join(' ')}. The moral of the story is: ${story.moral}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9; // Slightly slower, clear narration for children
    utterance.pitch = 1.05; // Friendly tone

    utterance.onend = () => {
      setIsReadingAloud(false);
    };

    utterance.onerror = () => {
      setIsReadingAloud(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  const handleStopReadAloud = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
  };

  const toggleFavorite = (storyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickPop();
    setFavoriteStories((prev) =>
      prev.includes(storyId) ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
  };

  const markStoryAsRead = (storyId: string) => {
    if (!readStories.includes(storyId)) {
      playSuccessChime();
      setReadStories((prev) => [...prev, storyId]);
    }
  };

  const filteredStories = storiesData.filter((story) => {
    const matchesAge = filterAge === 'All' || story.ageGroup === filterAge;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.characters.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAge && matchesSearch;
  });

  // If a story is selected, show the full story reader view
  if (selectedStory) {
    const isFav = favoriteStories.includes(selectedStory.id);
    const isCompleted = readStories.includes(selectedStory.id);

    const textSizeClass =
      fontSize === 'xlarge'
        ? 'text-xl sm:text-2xl leading-relaxed'
        : fontSize === 'large'
        ? 'text-lg sm:text-xl leading-relaxed'
        : 'text-base sm:text-lg leading-relaxed';

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* Reader Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
          <button
            onClick={() => {
              handleStopReadAloud();
              playClickPop();
              onSelectStory(null);
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-amber-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-amber-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Stories</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font size selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              <span className="px-2 text-slate-500">Text Size:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 rounded-lg ${fontSize === 'normal' ? 'bg-white shadow-xs text-amber-700' : 'hover:bg-slate-200'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white shadow-xs text-amber-700' : 'hover:bg-slate-200'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 rounded-lg text-base ${fontSize === 'xlarge' ? 'bg-white shadow-xs text-amber-700' : 'hover:bg-slate-200'}`}
              >
                A++
              </button>
            </div>

            {/* Read Aloud Button */}
            <button
              onClick={() => handleStartReadAloud(selectedStory)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-kids font-bold transition-all shadow-xs ${
                isReadingAloud
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {isReadingAloud ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Aloud</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story Article Presentation */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-8">
          {/* Cover Illustration */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-100 shadow-md aspect-16/9 max-h-96">
            <img
              src={selectedStory.image}
              alt={selectedStory.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(selectedStory.id, e)}
                className="p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-white shadow-sm transition-transform active:scale-95"
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Metadata & Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-amber-700 font-bold">{selectedStory.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedStory.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedStory.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900 tracking-tight">
              {selectedStory.title}
            </h1>

            {/* Character badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-semibold">Characters:</span>
              {selectedStory.characters.map((char, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md bg-amber-100/70 text-amber-900 text-xs font-medium"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Story Body Paragraphs */}
          <div className={`space-y-5 text-slate-800 ${textSizeClass}`}>
            {selectedStory.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed indent-2 sm:indent-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Moral Lesson Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-2 border-amber-300 p-6 sm:p-8 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-kids font-bold text-lg">
              <span className="text-2xl">🌟</span>
              <span>Moral of the Story</span>
            </div>
            <p className="text-base sm:text-lg font-kids font-semibold text-amber-950">
              &ldquo;{selectedStory.moral}&rdquo;
            </p>
          </div>

          {/* Discussion Questions */}
          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sky-900 font-kids font-bold text-base">
              <MessageCircle className="w-5 h-5 text-sky-600" />
              <span>Let&apos;s Think & Talk Together!</span>
            </div>
            <p className="text-xs text-sky-800">
              Ask these questions to your parents, teacher, or friends:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
              {selectedStory.discussionQuestions.map((q, idx) => (
                <li key={idx} className="leading-relaxed">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Finished Reading CTA */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            <button
              onClick={() => markStoryAsRead(selectedStory.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-kids font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Finished Reading! ⭐' : 'I Finished This Story!'}</span>
            </button>

            <button
              onClick={() => {
                handleStopReadAloud();
                playClickPop();
                onSelectStory(null);
              }}
              className="text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              Choose another story ➔
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>Bedtime & Classroom Tales for Ages 6–12</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-kids font-bold text-slate-900">
          Illustrated Moral Stories
        </h1>
        <p className="text-base text-slate-600">
          Discover wonderful stories about kind animals, clever inventors, and brave children. Every story ends with an important moral lesson!
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Age Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50/80 rounded-xl w-full md:w-auto">
          {['All', 'Ages 6-8', 'Ages 9-12'].map((age) => (
            <button
              key={age}
              onClick={() => {
                playClickPop();
                setFilterAge(age);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 md:flex-none whitespace-nowrap ${
                filterAge === age
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {age === 'All' ? 'All Ages' : age}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or character..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <p className="text-4xl">🔍</p>
          <h3 className="text-lg font-kids font-bold text-slate-800">No stories found</h3>
          <p className="text-sm text-slate-500">Try clearing your search or switching age filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterAge('All');
            }}
            className="px-4 py-2 bg-amber-500 text-white font-semibold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => {
            const isFav = favoriteStories.includes(story.id);
            const isCompleted = readStories.includes(story.id);

            return (
              <div
                key={story.id}
                onClick={() => {
                  playClickPop();
                  onSelectStory(story);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white rounded-2xl border border-amber-200/80 hover:border-amber-400 hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                {/* Story Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-xs font-semibold text-amber-900 shadow-2xs">
                    {story.ageGroup}
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(story.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-white shadow-2xs transition-transform active:scale-90"
                    title={isFav ? 'Remove favorite' : 'Add favorite'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>
                  {isCompleted && (
                    <div className="absolute bottom-3 left-3 bg-emerald-600/90 text-white text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 shadow-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span>Read</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{story.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{story.readTime}</span>
                    </div>

                    <h3 className="text-lg font-kids font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  {/* Moral lesson tag */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-amber-900 bg-amber-50/70 p-2 rounded-lg line-clamp-2">
                      <span className="font-bold">Moral:</span> {story.moral}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs font-kids font-bold text-amber-600 group-hover:text-amber-700">
                    <span>Read Full Story</span>
                    <span>➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
