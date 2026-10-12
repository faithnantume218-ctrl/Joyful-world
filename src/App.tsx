/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Page, Story } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { StoriesPage } from './components/StoriesPage';
import { NotesPage } from './components/NotesPage';
import { QuizPage } from './components/QuizPage';
import { AboutPage } from './components/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== 'stories') {
      setSelectedStory(null);
    }
  };

  const handleSelectStoryFromHome = (story: Story) => {
    setSelectedStory(story);
    setCurrentPage('stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectStory={handleSelectStoryFromHome}
          />
        )}

        {currentPage === 'stories' && (
          <StoriesPage
            selectedStory={selectedStory}
            onSelectStory={setSelectedStory}
          />
        )}

        {currentPage === 'notes' && <NotesPage />}

        {currentPage === 'quizzes' && <QuizPage />}

        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
