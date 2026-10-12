import { QuizQuestion } from '../types';

export const quizQuestionsData: QuizQuestion[] = [
  {
    id: 'q-eng-1',
    subject: 'english',
    subjectLabel: 'English',
    question: 'Which word in this sentence is an action verb: "The playful puppy leaped over the red fence"?',
    options: ['playful', 'puppy', 'leaped', 'fence'],
    correctIndex: 2,
    hint: 'Look for the word that tells you what the puppy did physically.',
    explanation: '"Leaped" is an action verb because it describes the jumping motion of the puppy.'
  },
  {
    id: 'q-math-1',
    subject: 'mathematics',
    subjectLabel: 'Mathematics',
    question: 'If you slice a birthday cake into 8 equal pieces and eat 2 slices, what fraction of the cake did you eat?',
    options: ['2/8', '8/2', '1/4 only', '6/8'],
    correctIndex: 0,
    hint: 'The top number is the slices you ate, and the bottom number is total slices.',
    explanation: 'You ate 2 out of 8 total slices, which is written as 2/8 (which can also simplify to 1/4)!'
  },
  {
    id: 'q-sci-1',
    subject: 'science',
    subjectLabel: 'Science',
    question: 'What is the primary source of light and thermal heat that drives the water cycle on Earth?',
    options: ['The Moon', 'The Sun', 'Campfires', 'Lightning'],
    correctIndex: 1,
    hint: 'It is the blazing golden star at the center of our solar system.',
    explanation: 'The Sun heats liquid water in oceans, lakes, and puddles so that it evaporates into water vapor.'
  },
  {
    id: 'q-soc-1',
    subject: 'social-studies',
    subjectLabel: 'Social Studies',
    question: 'What do the four letters on a compass rose (N, E, S, W) stand for?',
    options: [
      'Night, Evening, Sunrise, Winter',
      'North, East, South, West',
      'Nature, Earth, Sea, Wind',
      'Near, Everywhere, Safe, Wide'
    ],
    correctIndex: 1,
    hint: 'Think of "Never Eat Soggy Waffles"!',
    explanation: 'N, E, S, and W stand for North, East, South, and West, which are the 4 cardinal directions.'
  },
  {
    id: 'q-math-2',
    subject: 'mathematics',
    subjectLabel: 'Mathematics',
    question: 'What is 7 multiplied by 6 (7 × 6)?',
    options: ['36', '42', '48', '56'],
    correctIndex: 1,
    hint: 'Count by 7s six times: 7, 14, 21, 28, 35...',
    explanation: '7 × 6 = 42. (Or think: 7 × 5 = 35, plus 7 more = 42!)'
  },
  {
    id: 'q-sci-2',
    subject: 'science',
    subjectLabel: 'Science',
    question: 'Which planet in our solar system is nicknamed the "Red Planet"?',
    options: ['Venus', 'Jupiter', 'Mars', 'Mercury'],
    correctIndex: 2,
    hint: 'Its reddish color comes from iron oxide rust in its rocky soil.',
    explanation: 'Mars is known as the Red Planet due to large amounts of rusty iron dust across its surface.'
  },
  {
    id: 'q-eng-2',
    subject: 'english',
    subjectLabel: 'English',
    question: 'Which of the following is a PROPER noun that always requires a capital letter?',
    options: ['city', 'mountain', 'Saturday', 'ocean'],
    correctIndex: 2,
    hint: 'It is a specific day of the week.',
    explanation: '"Saturday" is a specific day name, so it is a proper noun and must always be capitalized.'
  },
  {
    id: 'q-soc-2',
    subject: 'social-studies',
    subjectLabel: 'Social Studies',
    question: 'How many major continents make up the land on planet Earth?',
    options: ['Five (5)', 'Six (6)', 'Seven (7)', 'Nine (9)'],
    correctIndex: 2,
    hint: 'Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
    explanation: 'There are 7 continents on Earth, with Asia being the largest and Antarctica the coldest.'
  },
  {
    id: 'q-sci-3',
    subject: 'science',
    subjectLabel: 'Science',
    question: 'What gas do green plants absorb from the air to make their own food through photosynthesis?',
    options: ['Oxygen', 'Carbon Dioxide', 'Helium', 'Neon'],
    correctIndex: 1,
    hint: 'Animals breathe it out, and green leafy plants breathe it in!',
    explanation: 'Plants absorb carbon dioxide from the air and release fresh oxygen for us to breathe.'
  },
  {
    id: 'q-gen-1',
    subject: 'general',
    subjectLabel: 'General Knowledge',
    question: 'What is the main moral lesson of the story of "Benny the Rabbit"?',
    options: [
      'Bury all your food where nobody can find it',
      'Carrots taste better in winter than summer',
      'Sharing with friends brings more joy than having things alone',
      'Rabbits should never talk to hedgehogs'
    ],
    correctIndex: 2,
    hint: 'Think about how Benny felt after he shared with Spike and Ruby.',
    explanation: 'Benny discovered that sharing his treat with his forest friends made his heart feel much warmer than eating alone!'
  }
];

export const encouragingMessages = [
  { minScore: 9, title: '🏆 Grand Master Explorer!', message: 'Spectacular job! You answered almost everything correctly. You are a true learning superhero!' },
  { minScore: 7, title: '🌟 Brilliant Superstar!', message: 'High five! Your brain is full of amazing knowledge and curiosity. Keep shining bright!' },
  { minScore: 5, title: '👍 Great Effort, Explorer!', message: 'Wonderful attempt! You learned so many cool facts today. Review your notes and try again for a perfect score!' },
  { minScore: 0, title: '🌱 Growing Learner!', message: 'Practice makes permanent! Every mistake is just a new clue on the path to discovering cool new things.' }
];
