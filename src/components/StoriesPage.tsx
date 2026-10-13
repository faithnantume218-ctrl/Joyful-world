import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { storiesData } from '../data/stories';
import {
  BookOpen,
  Volume2,
  VolumeX,
  ArrowLeft,
  Heart,
  Search,
  CheckCircle,
  MessageCircle,
  PlusCircle,
  X,
  Trash2,
  Sparkles,
  PenTool
} from 'lucide-react';
import { playClickPop, playSuccessChime, playSoftBoop } from '../utils/sound';

interface StoriesPageProps {
  selectedStory: Story | null;
  onSelectStory: (story: Story | null) => void;
}

const COVER_PRESETS = [
  {
    id: 'lion-firefly',
    label: 'Lion & Firefly',
    url: '/src/assets/images/story_lion_firefly_1791877819142.jpg'
  },
  {
    id: 'lion-roar',
    label: 'Lion Cub Roar',
    url: '/src/assets/images/scene_lion_twilight_roar_1791880632860.jpg'
  },
  {
    id: 'firefly-flower',
    label: 'Singing Firefly',
    url: '/src/assets/images/scene_firefly_glowing_flower_1791880671434.jpg'
  },
  {
    id: 'rabbit-meadow',
    label: 'Rabbit & Friends',
    url: '/src/assets/images/story_curious_rabbit_1791278890075.jpg'
  },
  {
    id: 'carrot-patch',
    label: 'Carrot Patch',
    url: '/src/assets/images/scene_rabbit_carrot_patch_1791880044515.jpg'
  },
  {
    id: 'sharing-picnic',
    label: 'Friends Picnic',
    url: '/src/assets/images/scene_animals_sharing_picnic_1791880044283.jpg'
  },
  {
    id: 'brave-star',
    label: 'Glowing Star',
    url: '/src/assets/images/story_brave_little_star_1791278901368.jpg'
  },
  {
    id: 'bear-cub',
    label: 'Bear & Star',
    url: '/src/assets/images/scene_lost_bear_cub_1791880046331.jpg'
  },
  {
    id: 'clockwork-fox',
    label: 'Owl & Fox',
    url: '/src/assets/images/story_clever_fox_clock_1791278916748.jpg'
  },
  {
    id: 'clockwork-gears',
    label: 'Clockwork Gears',
    url: '/src/assets/images/scene_clock_tree_gears_1791880046299.jpg'
  },
  {
    id: 'sunflower-garden',
    label: 'Giant Sunflower',
    url: '/src/assets/images/scene_maya_giant_sunflower_1791880712529.jpg'
  },
  {
    id: 'honest-bridge',
    label: 'Sturdy River Bridge',
    url: '/src/assets/images/scene_bridge_sturdy_river_1791880750635.jpg'
  },
  {
    id: 'adventure-notes',
    label: 'School Explorer',
    url: '/src/assets/images/notes_school_adventure_1791278927538.jpg'
  }
];

export const StoriesPage: React.FC<StoriesPageProps> = ({ selectedStory, onSelectStory }) => {
  const [filterAge, setFilterAge] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [readingParagraphIndex, setReadingParagraphIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [readStories, setReadStories] = useState<string[]>([]);
  const [favoriteStories, setFavoriteStories] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Custom stories state initialized from localStorage
  const [customStories, setCustomStories] = useState<Story[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('kids_custom_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Form state for creating a story
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newAgeGroup, setNewAgeGroup] = useState<'Ages 6-8' | 'Ages 9-12'>('Ages 6-8');
  const [newCategory, setNewCategory] = useState('Friendship & Kindness');
  const [newCharacters, setNewCharacters] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMoral, setNewMoral] = useState('');
  const [newQuestions, setNewQuestions] = useState('');
  const [selectedCover, setSelectedCover] = useState(COVER_PRESETS[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');

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
      setReadingParagraphIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = `${story.title}. A story for ${story.ageGroup}. ${story.content.join(' ')}. The moral of the story is: ${story.moral}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsReadingAloud(false);
    };

    utterance.onerror = () => {
      setIsReadingAloud(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsReadingAloud(true);
  };

  const handleReadParagraph = (text: string, index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsReadingAloud(false);

    if (readingParagraphIndex === index) {
      setReadingParagraphIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.onend = () => setReadingParagraphIndex(null);
    utterance.onerror = () => setReadingParagraphIndex(null);

    setReadingParagraphIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleStopReadAloud = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
    setReadingParagraphIndex(null);
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

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newMoral.trim()) {
      alert('Please fill in the Story Title, Story Content, and Moral Lesson!');
      return;
    }

    const paragraphs = newContent
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const charactersList = newCharacters
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const questionsList = newQuestions
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    // Give each paragraph its own picture from available presets
    const chosenBaseImage = customImageUrl.trim() || selectedCover;
    const assignedParagraphImages = paragraphs.map((_, i) => {
      if (i === 0) return chosenBaseImage;
      return COVER_PRESETS[i % COVER_PRESETS.length].url;
    });

    const createdStory: Story = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Young Author',
      ageGroup: newAgeGroup,
      category: newCategory,
      readTime: `${Math.max(2, Math.round(newContent.split(' ').length / 80))} min read`,
      summary: newSummary.trim() || paragraphs[0]?.slice(0, 140) + '...',
      image: chosenBaseImage,
      content: paragraphs.length > 0 ? paragraphs : [newContent.trim()],
      paragraphImages: assignedParagraphImages,
      moral: newMoral.trim(),
      characters: charactersList.length > 0 ? charactersList : ['Main Character'],
      discussionQuestions:
        questionsList.length > 0
          ? questionsList
          : [
              'What was your favorite part of this story?',
              'How would you apply the moral lesson in your daily life?'
            ],
      isCustom: true
    };

    const updated = [createdStory, ...customStories];
    setCustomStories(updated);
    try {
      localStorage.setItem('kids_custom_stories', JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }

    playSuccessChime();
    setIsAddModalOpen(false);

    setNewTitle('');
    setNewAuthor('');
    setNewCharacters('');
    setNewSummary('');
    setNewContent('');
    setNewMoral('');
    setNewQuestions('');
    setCustomImageUrl('');

    onSelectStory(createdStory);
  };

  const handleDeleteCustomStory = (storyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this story?')) return;

    playSoftBoop();
    const updated = customStories.filter((s) => s.id !== storyId);
    setCustomStories(updated);
    try {
      localStorage.setItem('kids_custom_stories', JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to update localStorage:', err);
    }

    if (selectedStory?.id === storyId) {
      onSelectStory(null);
    }
  };

  const fillSampleStory = () => {
    playClickPop();
    setNewTitle('Sammy the Sea Turtle and the Crystal Reef');
    setNewAuthor('By Young Ocean Explorers');
    setNewAgeGroup('Ages 6-8');
    setNewCategory('Courage & Kindness');
    setNewCharacters('Sammy the Turtle, Coral the Seahorse, Barnaby Whale');
    setNewSummary('Sammy discovers a glittering cove filled with trapped sea lanterns, and gathers ocean friends to clear the coral reef.');
    setNewContent(
      `Deep beneath the turquoise waves of Coral Cove, little Sammy the Sea Turtle paddled with his silky green flippers.\n\nOne afternoon, he heard a gentle tinkling sound coming from the Great Reef. When Sammy swam closer, he saw that shiny glass jars left behind by sailors had trapped tiny friendly jellyfish.\n\nSammy was small, but he remembered his grandmother's advice: "A little helper who invites others becomes a giant force for good."\n\nSammy swam to Barnaby Whale and Coral the Seahorse. Together, they gently nudged the coral stones, freed every jellyfish, and made the entire reef sparkle with warm gratitude!`
    );
    setNewMoral('Small acts of kindness can protect our beautiful world when we work together with caring friends.');
    setNewQuestions(
      'Why was Sammy able to make such a big difference even though he was small?\nHow can we help protect nature and animals in our neighborhoods?'
    );
  };

  const allStories = [...customStories, ...storiesData];

  const filteredStories = allStories.filter((story) => {
    const matchesAge = filterAge === 'All' || story.ageGroup === filterAge;
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.characters.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (story.author && story.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesAge && matchesSearch;
  });

  // If a story is selected, show the full illustrated picture book story reader view
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
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/95 backdrop-blur-xs p-4 sm:p-5 rounded-3xl border-3 border-amber-300 shadow-sm">
          <button
            onClick={() => {
              handleStopReadAloud();
              playClickPop();
              onSelectStory(null);
            }}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-kids font-bold text-amber-950 hover:text-amber-700 transition-colors px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 cursor-pointer btn-bubbly"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Stories 📚</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font size selector */}
            <div className="flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-2xl border-2 border-amber-200 text-xs font-kids font-bold text-slate-800">
              <span className="px-2 text-slate-600">Text Size:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${fontSize === 'normal' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200'}`}
              >
                Normal
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-3 py-1.5 rounded-xl text-sm cursor-pointer ${fontSize === 'large' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200'}`}
              >
                Big
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1.5 rounded-xl text-base cursor-pointer ${fontSize === 'xlarge' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200'}`}
              >
                Super Big!
              </button>
            </div>

            {/* Read Aloud All Story Button */}
            <button
              onClick={() => handleStartReadAloud(selectedStory)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-kids font-bold transition-all shadow-xs cursor-pointer btn-bubbly ${
                isReadingAloud
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white border-2 border-amber-600/30'
              }`}
            >
              {isReadingAloud ? (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span>Listen Whole Story 🔊</span>
                </>
              )}
            </button>

            {/* Quick Add Story button from inside reader */}
            <button
              onClick={() => {
                playClickPop();
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-sm font-kids font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-rose-600/30 btn-bubbly cursor-pointer"
              title="Add a new story"
            >
              <PenTool className="w-4 h-4" />
              <span>+ Add a Story ✍️</span>
            </button>

            {/* Custom story delete button */}
            {selectedStory.isCustom && (
              <button
                onClick={() => handleDeleteCustomStory(selectedStory.id)}
                className="p-2.5 text-rose-600 hover:text-rose-800 bg-rose-100 hover:bg-rose-200 border-2 border-rose-300 rounded-2xl transition-colors cursor-pointer"
                title="Delete this custom story"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Story Article Presentation */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-[0_8px_0_rgba(245,158,11,0.15)] space-y-10">
          {/* Header Metadata & Title */}
          <div className="space-y-4 border-b-2 border-amber-100 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-kids font-bold">
                <span className="bg-amber-200 px-3 py-1 rounded-xl text-amber-950">{selectedStory.ageGroup}</span>
                <span>·</span>
                <span className="bg-rose-200 px-3 py-1 rounded-xl text-rose-950">{selectedStory.category}</span>
                <span>·</span>
                <span className="bg-sky-200 px-3 py-1 rounded-xl text-sky-950">⏱️ {selectedStory.readTime}</span>
                {selectedStory.author && (
                  <>
                    <span>·</span>
                    <span className="bg-purple-200 px-3 py-1 rounded-xl text-purple-950">✍️ {selectedStory.author}</span>
                  </>
                )}
              </div>

              <button
                onClick={(e) => toggleFavorite(selectedStory.id, e)}
                className="p-2.5 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-500 hover:bg-rose-100 transition-all cursor-pointer shadow-xs"
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <h1 className="text-3xl sm:text-5xl font-kids font-black text-slate-900 tracking-tight leading-snug">
              {selectedStory.title}
            </h1>

            {/* Character badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-sm font-kids font-bold text-slate-600">Characters in this tale:</span>
              {selectedStory.characters.map((char, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-orange-100 text-orange-950 text-xs sm:text-sm font-kids font-bold border border-orange-300"
                >
                  🐾 {char}
                </span>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* ILLUSTRATED STORY PARAGRAPHS: EACH PARAGRAPH HAS A PICTURE */}
          {/* ========================================================= */}
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-kids font-black text-xl sm:text-2xl">
                <span className="text-2xl animate-bounce">🎨</span>
                <span>Illustrated Story Scenes</span>
              </div>
              <span className="text-xs sm:text-sm font-kids font-black text-amber-900 bg-amber-200 px-3.5 py-1.5 rounded-xl border-2 border-amber-400 shadow-xs">
                🖼️ Every Paragraph Has a Picture! ({selectedStory.content.length} Scenes)
              </span>
            </div>

            <div className="space-y-10">
              {selectedStory.content.map((paragraph, index) => {
                // Picture specifically for this paragraph
                const paragraphImg =
                  selectedStory.paragraphImages?.[index] ||
                  selectedStory.paragraphImages?.[index % (selectedStory.paragraphImages?.length || 1)] ||
                  selectedStory.image;

                const themeStyles = [
                  {
                    bg: 'bg-gradient-to-br from-amber-50 via-yellow-50/50 to-orange-50/40 border-amber-300',
                    ring: 'ring-amber-300',
                    sticker: 'bg-amber-300 text-amber-950 border-amber-400',
                    badge: 'bg-amber-200 text-amber-950 border-amber-300',
                    btn: 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300',
                    icon: '🎨'
                  },
                  {
                    bg: 'bg-gradient-to-br from-rose-50 via-pink-50/50 to-red-50/40 border-rose-300',
                    ring: 'ring-rose-300',
                    sticker: 'bg-rose-300 text-rose-950 border-rose-400',
                    badge: 'bg-rose-200 text-rose-950 border-rose-300',
                    btn: 'bg-white hover:bg-rose-100 text-rose-950 border-rose-300',
                    icon: '🌸'
                  },
                  {
                    bg: 'bg-gradient-to-br from-sky-50 via-cyan-50/50 to-blue-50/40 border-sky-300',
                    ring: 'ring-sky-300',
                    sticker: 'bg-sky-300 text-sky-950 border-sky-400',
                    badge: 'bg-sky-200 text-sky-950 border-sky-300',
                    btn: 'bg-white hover:bg-sky-100 text-sky-950 border-sky-300',
                    icon: '🌊'
                  },
                  {
                    bg: 'bg-gradient-to-br from-emerald-50 via-teal-50/50 to-green-50/40 border-emerald-300',
                    ring: 'ring-emerald-300',
                    sticker: 'bg-emerald-300 text-emerald-950 border-emerald-400',
                    badge: 'bg-emerald-200 text-emerald-950 border-emerald-300',
                    btn: 'bg-white hover:bg-emerald-100 text-emerald-950 border-emerald-400',
                    icon: '🍀'
                  }
                ];

                const currentTheme = themeStyles[index % themeStyles.length];
                const isEven = index % 2 === 0;
                const isCurrentlyPlaying = readingParagraphIndex === index;

                return (
                  <section
                    key={index}
                    className={`rounded-3xl p-6 sm:p-8 border-4 transition-all card-bubbly ${currentTheme.bg} ${
                      isCurrentlyPlaying
                        ? `ring-4 ${currentTheme.ring} shadow-lg scale-101`
                        : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Picture for this paragraph */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl aspect-4/3 group bg-amber-100">
                          <img
                            src={paragraphImg}
                            alt={`Picture for Scene ${index + 1}: ${selectedStory.title}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                          />
                          <div className={`absolute top-3 left-3 backdrop-blur-xs font-kids font-black text-xs px-3.5 py-1.5 rounded-xl shadow-md border-2 ${currentTheme.sticker}`}>
                            {currentTheme.icon} Scene {index + 1} Picture
                          </div>
                        </div>
                      </div>

                      {/* Paragraph Text for this picture */}
                      <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-kids font-bold px-3 py-1 rounded-xl border-2 ${currentTheme.badge}`}>
                            📖 Page {index + 1} of {selectedStory.content.length}
                          </span>

                          {/* Individual Listen Aloud Button for this paragraph */}
                          <button
                            onClick={() => handleReadParagraph(paragraph, index)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-kids font-bold transition-all cursor-pointer btn-bubbly ${
                              isCurrentlyPlaying
                                ? 'bg-rose-500 text-white animate-pulse'
                                : currentTheme.btn
                            }`}
                            title="Listen to this scene"
                          >
                            <Volume2 className="w-4 h-4 text-amber-700" />
                            <span>{isCurrentlyPlaying ? 'Reading Part...' : 'Listen to this part 🔊'}</span>
                          </button>
                        </div>

                        <p className={`font-kids font-medium text-slate-800 leading-relaxed ${textSizeClass}`}>
                          {paragraph}
                        </p>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {/* Moral Lesson Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-200 via-orange-100 to-yellow-200 border-4 border-amber-400 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="flex items-center gap-2.5 text-amber-950 font-kids font-black text-xl sm:text-2xl">
              <span className="text-3xl animate-bounce">🌟</span>
              <span>Moral of the Story!</span>
            </div>
            <p className="text-lg sm:text-xl font-kids font-black text-amber-950 leading-snug">
              &ldquo;{selectedStory.moral}&rdquo;
            </p>
          </div>

          {/* Discussion Questions */}
          <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-50 border-3 border-sky-300 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-sky-950 font-kids font-black text-xl">
              <MessageCircle className="w-6 h-6 text-sky-600" />
              <span>Let&apos;s Think &amp; Talk Together! 💭</span>
            </div>
            <p className="text-sm font-body font-bold text-sky-900">
              Ask these questions to your parents, teacher, or friends:
            </p>
            <ul className="space-y-2.5 text-base font-body font-semibold text-slate-800 list-disc list-inside">
              {selectedStory.discussionQuestions.map((q, idx) => (
                <li key={idx} className="leading-relaxed">
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Finished Reading CTA */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-slate-100">
            <button
              onClick={() => markStoryAsRead(selectedStory.id)}
              className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-base font-kids font-bold transition-all cursor-pointer btn-bubbly ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>{isCompleted ? 'Finished Reading! ⭐' : 'I Finished This Story! 🎉'}</span>
            </button>

            <button
              onClick={() => {
                handleStopReadAloud();
                playClickPop();
                onSelectStory(null);
              }}
              className="text-base font-kids font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-200 border-2 border-rose-300 text-rose-950 text-xs sm:text-sm font-kids font-bold shadow-xs">
          <BookOpen className="w-4 h-4 text-rose-700" />
          <span>Every Story Scene Illustrated with Pictures! 🎨📖</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-kids font-black text-slate-900 leading-tight">
          Illustrated Picture Stories 🖼️
        </h1>
        <p className="text-base sm:text-lg text-slate-700 font-body font-semibold">
          Every paragraph is paired with its own picture scene! Read along, listen to each scene, and learn great moral lessons.
        </p>

        {/* Action Button: Add A Story */}
        <div className="pt-2">
          <button
            onClick={() => {
              playClickPop();
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-kids font-black text-lg rounded-2xl border-3 border-rose-600/40 shadow-lg btn-bubbly cursor-pointer transform hover:scale-104 transition-all"
          >
            <Sparkles className="w-6 h-6 text-yellow-200 animate-pulse" />
            <span>+ Write / Add Your Story! ✍️</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-bold">New</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white/90 backdrop-blur-xs rounded-3xl p-5 border-4 border-amber-300 shadow-[0_6px_0_rgba(245,158,11,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Age Segmented Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-50 rounded-2xl border-2 border-amber-200 w-full md:w-auto">
          {['All', 'Ages 6-8', 'Ages 9-12'].map((age) => (
            <button
              key={age}
              onClick={() => {
                playClickPop();
                setFilterAge(age);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-kids font-bold transition-all flex-1 md:flex-none whitespace-nowrap cursor-pointer btn-bubbly ${
                filterAge === age
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-amber-100'
              }`}
            >
              {age === 'All' ? '🌟 All Ages' : age}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-5 h-5 text-amber-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, character, author..."
            className="w-full pl-12 pr-4 py-2.5 bg-amber-50/60 border-2 border-amber-300 rounded-2xl text-sm font-body font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-4 border-amber-300 p-8 space-y-4 card-bubbly">
          <p className="text-5xl animate-bounce">🔍</p>
          <h3 className="text-2xl font-kids font-black text-slate-800">No stories found!</h3>
          <p className="text-base font-body text-slate-600">Try clearing your search or switching age filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterAge('All');
            }}
            className="px-6 py-3 bg-amber-500 text-white font-kids font-bold text-sm rounded-2xl btn-bubbly cursor-pointer"
          >
            Show All Stories 📖
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group cursor-pointer bg-white rounded-3xl border-4 border-amber-300 hover:border-amber-400 card-bubbly flex flex-col overflow-hidden"
              >
                {/* Story Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl text-xs font-kids font-black text-amber-900 border border-amber-200 shadow-sm">
                    {story.ageGroup}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {story.isCustom && (
                      <button
                        onClick={(e) => handleDeleteCustomStory(story.id, e)}
                        className="p-2 rounded-full bg-white/95 backdrop-blur-xs text-slate-400 hover:text-rose-600 shadow-sm transition-colors cursor-pointer"
                        title="Delete custom story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => toggleFavorite(story.id, e)}
                      className="p-2 rounded-full bg-white/95 backdrop-blur-xs text-rose-500 hover:bg-white shadow-sm transition-transform active:scale-90 cursor-pointer"
                      title={isFav ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {isCompleted && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-xl font-kids font-bold flex items-center gap-1.5 shadow-md">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Read ⭐</span>
                    </div>
                  )}

                  {story.isCustom && (
                    <div className="absolute bottom-3 right-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-xl font-kids font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Custom ✨</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-white/90 text-amber-950 text-[11px] px-2.5 py-0.5 rounded-lg font-kids font-bold shadow-xs">
                    🖼️ {story.content.length} Pictures
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-kids font-bold text-slate-500">
                      <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">{story.category}</span>
                      <span>·</span>
                      <span>⏱️ {story.readTime}</span>
                      {story.author && (
                        <>
                          <span>·</span>
                          <span className="text-purple-700 font-bold truncate max-w-24">{story.author}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-kids font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-sm font-body font-semibold text-slate-600 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  {/* Moral lesson tag */}
                  <div className="pt-2 border-t-2 border-slate-100">
                    <p className="text-xs sm:text-sm font-kids text-amber-950 bg-amber-100/70 p-3 rounded-2xl border border-amber-300 line-clamp-2">
                      <span className="font-black text-amber-900">🌟 Moral:</span> {story.moral}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-sm font-kids font-black text-amber-600 group-hover:text-amber-700">
                    <span>Read Picture Story ({story.content.length} Pics)</span>
                    <span className="text-lg">➔</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= ADD STORY MODAL ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-9 border-4 border-amber-400 shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shadow-xs">
                  <PenTool className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-kids font-black text-slate-900">
                    Write Your Own Illustrated Story! ✍️
                  </h2>
                  <p className="text-xs sm:text-sm font-body font-semibold text-slate-600">
                    Each paragraph will automatically receive a colorful story scene picture!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fillSampleStory}
                  className="px-3 py-1.5 text-xs font-kids font-bold bg-amber-100 text-amber-950 border-2 border-amber-300 rounded-xl hover:bg-amber-200 transition-colors cursor-pointer"
                  title="Autofill a sample story to test quickly"
                >
                  ⚡ Sample Idea
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-xl transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                    Story Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Bella the Brave Butterfly"
                    className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                    Author / Written By
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Faith &amp; Class 3"
                    className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                    Target Age Group
                  </label>
                  <select
                    value={newAgeGroup}
                    onChange={(e) => setNewAgeGroup(e.target.value as 'Ages 6-8' | 'Ages 9-12')}
                    className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  >
                    <option value="Ages 6-8">Ages 6-8 (Early Readers)</option>
                    <option value="Ages 9-12">Ages 9-12 (Middle Grade)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                    Theme / Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                  >
                    <option value="Friendship & Kindness">Friendship &amp; Kindness</option>
                    <option value="Courage & Bravery">Courage &amp; Bravery</option>
                    <option value="Listening & Patience">Listening &amp; Patience</option>
                    <option value="Honesty & Truth">Honesty &amp; Truth</option>
                    <option value="Perseverance & Curiosity">Perseverance &amp; Curiosity</option>
                    <option value="Teamwork & Helping">Teamwork &amp; Helping</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                  Characters (comma separated)
                </label>
                <input
                  type="text"
                  value={newCharacters}
                  onChange={(e) => setNewCharacters(e.target.value)}
                  placeholder="e.g. Bella the Butterfly, Hopper the Cricket"
                  className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                />
              </div>

              {/* Cover Art Preset Selection */}
              <div>
                <label className="block text-xs font-kids font-bold text-slate-700 mb-1.5">
                  Choose Primary Cover Illustration Preset 🎨
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {COVER_PRESETS.map((preset) => {
                    const isSelected = selectedCover === preset.url && !customImageUrl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedCover(preset.url);
                          setCustomImageUrl('');
                        }}
                        className={`relative rounded-2xl overflow-hidden border-3 p-0.5 text-left transition-all cursor-pointer ${
                          isSelected ? 'border-amber-500 ring-4 ring-amber-300 scale-102' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-14 object-cover rounded-xl"
                        />
                        <p className="text-[11px] font-kids font-bold text-center text-slate-700 mt-1 truncate">
                          {preset.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                  Short Summary (1–2 sentences)
                </label>
                <input
                  type="text"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="A quick preview of what happens in the story..."
                  className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-kids font-bold text-slate-700 mb-1">
                  Full Story Content * (Leave a blank line between paragraphs — each gets its own picture!)
                </label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Once upon a time in a sunny meadow...&#10;&#10;Bella the butterfly loved exploring new flowers..."
                  className="w-full px-4 py-2.5 bg-amber-50/50 border-2 border-amber-200 rounded-xl text-sm font-body font-semibold text-slate-800 focus:outline-hidden focus:border-amber-400 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="p-5 rounded-2xl bg-amber-100/70 border-3 border-amber-300 space-y-3">
                <div>
                  <label className="block text-xs font-kids font-bold text-amber-950 mb-1">
                    🌟 Moral of the Story *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMoral}
                    onChange={(e) => setNewMoral(e.target.value)}
                    placeholder="e.g. True bravery is helping others when they feel afraid."
                    className="w-full px-4 py-2.5 bg-white border-2 border-amber-300 rounded-xl text-sm font-body font-semibold text-amber-950 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kids font-bold text-amber-950 mb-1">
                    Discussion Questions for Kids (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={newQuestions}
                    onChange={(e) => setNewQuestions(e.target.value)}
                    placeholder="How would you help a friend in trouble?&#10;What was your favorite moment?"
                    className="w-full px-4 py-2.5 bg-white border-2 border-amber-300 rounded-xl text-sm font-body font-semibold text-amber-950 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-kids font-bold text-slate-600 hover:text-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-kids font-bold text-base rounded-2xl border-2 border-amber-600/30 btn-bubbly cursor-pointer"
                >
                  Publish Illustrated Story ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
