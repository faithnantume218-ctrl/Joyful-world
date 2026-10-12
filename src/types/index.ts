export type Page = 'home' | 'stories' | 'notes' | 'quizzes' | 'about';

export interface Story {
  id: string;
  title: string;
  ageGroup: 'Ages 6-8' | 'Ages 9-12';
  category: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
  moral: string;
  discussionQuestions: string[];
  characters: string[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface NoteTopic {
  id: string;
  subject: 'english' | 'mathematics' | 'science' | 'social-studies';
  title: string;
  gradeLevel: string;
  summary: string;
  explanation: string[];
  examples: string[];
  importantPoints: string[];
  practiceQuestions: PracticeQuestion[];
}

export interface QuizQuestion {
  id: string;
  subject: 'english' | 'mathematics' | 'science' | 'social-studies' | 'general';
  subjectLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}
