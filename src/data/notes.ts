import { NoteTopic } from '../types';

export const notesData: NoteTopic[] = [
  // ================= ENGLISH =================
  {
    id: 'english-nouns-verbs',
    subject: 'english',
    title: 'Nouns and Action Verbs: The Building Blocks',
    gradeLevel: 'Grades 1–4',
    summary: 'Discover naming words (nouns) and action words (verbs) that bring every sentence to life!',
    explanation: [
      'Every sentence in the English language tells a little story. Two of the most important building blocks are Nouns and Verbs.',
      'A NOUN is a naming word. It names a person (teacher, astronaut), a place (playground, library), a thing (pencil, bicycle), or an animal (dolphin, puppy).',
      'A VERB is an action word. It tells us what the noun is doing! Verbs make things move, jump, dance, and think.'
    ],
    examples: [
      'The friendly dolphin (noun) leaped (verb) over the blue ocean wave (noun).',
      'Emma (noun) paints (verb) a bright golden sunflower on her canvas (noun).',
      'Cheetahs (noun) run (verb) faster than most sports cars!'
    ],
    importantPoints: [
      'Proper Nouns name specific people or places (like London, Dr. Seuss, Saturday) and ALWAYS start with a capital letter.',
      'Common Nouns name general items (city, writer, day) and use lowercase letters unless at the start of a sentence.',
      'Verbs can happen in the past (jumped), present (jumps), or future (will jump).'
    ],
    practiceQuestions: [
      {
        id: 'eng-q1',
        question: 'Identify the verb in this sentence: "The curious cat climbed the apple tree."',
        answer: 'climbed',
        explanation: '"Climbed" is the action word describing what the cat did.'
      },
      {
        id: 'eng-q2',
        question: 'Which of the following is a PROPER noun: "river", "Nile River", "water", or "boat"?',
        answer: 'Nile River',
        explanation: '"Nile River" is the specific name of a famous river and is capitalized.'
      },
      {
        id: 'eng-q3',
        question: 'Complete the sentence with an exciting action verb: "The rocket _______ into outer space!"',
        answer: 'soared / blasted / zoomed',
        explanation: 'Any active motion verb like "soared", "blasted", or "rocketed" fits perfectly!'
      }
    ]
  },
  {
    id: 'english-punctuation-magic',
    subject: 'english',
    title: 'Punctuation Marks: Traffic Lights for Reading',
    gradeLevel: 'Grades 2–5',
    summary: 'Learn how periods, question marks, exclamation marks, and commas tell our voices when to stop, ask, shout, or pause.',
    explanation: [
      'Imagine driving on a road without any stop signs or traffic signals—it would be total chaos! Punctuation marks are like traffic signs for your eyes and voice.',
      'Full Stop / Period (.) means a complete stop at the end of a statement.',
      'Question Mark (?) shows curiosity and asks for information.',
      'Exclamation Mark (!) adds excitement, surprise, joy, or urgency.',
      'Comma (,) gives a brief breath pause, especially when listing items in a group.'
    ],
    examples: [
      'Statement: "The library closes at five o\'clock."',
      'Question: "Would you like to read about outer space or dinosaurs?"',
      'Exclamation: "Hooray, we solved the mystery puzzle!"',
      'Comma list: "I packed apples, bananas, juice, and crackers for our picnic."'
    ],
    importantPoints: [
      'Never put a space before a period or comma; put the space directly AFTER it.',
      'Every brand-new sentence must begin with a capital letter and end with a closing punctuation mark.',
      'Use only ONE exclamation mark in normal writing—it has more power when used sparingly!'
    ],
    practiceQuestions: [
      {
        id: 'eng-punc-q1',
        question: 'What punctuation mark goes at the end of: "Where did I leave my magnifying glass"',
        answer: 'Question mark (?)',
        explanation: 'The sentence begins with the question word "Where" and is asking for information.'
      },
      {
        id: 'eng-punc-q2',
        question: 'Where should commas be added: "We need red yellow blue and green markers."',
        answer: 'We need red, yellow, blue, and green markers.',
        explanation: 'Commas separate items in a series to make the list clear and easy to read.'
      }
    ]
  },

  // ================= MATHEMATICS =================
  {
    id: 'math-fractions-pizza',
    subject: 'mathematics',
    title: 'Fractions Made Easy: The Pizza Party Method',
    gradeLevel: 'Grades 2–5',
    summary: 'Understand equal parts, numerators, and denominators using delicious everyday visual examples.',
    explanation: [
      'A fraction simply represents a part of a whole thing that has been sliced into EQUAL pieces.',
      'Think of a large freshly baked pizza: if you cut the whole pizza into 4 identical slices, each slice is one-fourth (1/4) of the pizza.',
      'The top number is the NUMERATOR. It tells you how many slices you have or are talking about.',
      'The bottom number is the DENOMINATOR. It tells you the TOTAL number of equal slices the whole object was divided into.'
    ],
    examples: [
      'If you have 8 slices of pizza and you eat 3 of them, you ate 3/8 of the pizza. (3 = Numerator, 8 = Denominator).',
      'A glass half-full of water is 1/2 full.',
      'When you have 4 quarters, each quarter is 1/4 of a dollar!'
    ],
    importantPoints: [
      'Memory Trick: Denominator starts with "D" for DOWN (the bottom number)!',
      'The larger the bottom number (denominator), the smaller each individual slice is! (1/8 of a cake is smaller than 1/2 of a cake).',
      'When the numerator equals the denominator (like 4/4 or 6/6), you have the WHOLE thing (equals 1).'
    ],
    practiceQuestions: [
      {
        id: 'math-frac-q1',
        question: 'In the fraction 5/6, which number is the denominator?',
        answer: '6',
        explanation: 'The bottom number is the denominator, showing the pizza was cut into 6 equal slices.'
      },
      {
        id: 'math-frac-q2',
        question: 'Which slice is bigger: 1/3 of a pie or 1/6 of the same pie?',
        answer: '1/3 of the pie',
        explanation: 'Dividing into only 3 parts makes each piece much larger than dividing into 6 parts!'
      },
      {
        id: 'math-frac-q3',
        question: 'If you have a chocolate bar broken into 4 equal rectangles and you eat 2 rectangles, what fraction did you eat?',
        answer: '2/4 (which simplifies to 1/2)',
        explanation: '2 out of 4 parts is exactly one-half of the chocolate bar.'
      }
    ]
  },
  {
    id: 'math-multiplication-patterns',
    subject: 'mathematics',
    title: 'Multiplication Secrets: Repeated Addition and Arrays',
    gradeLevel: 'Grades 2–5',
    summary: 'Master multiplication fast with handy patterns, grid arrays, and easy mental math tricks.',
    explanation: [
      'Multiplication is simply super-fast addition of equal groups.',
      'Instead of adding 4 + 4 + 4 + 4 + 4 (five times), you can multiply 5 × 4 to get 20.',
      'The two numbers you multiply together are called FACTORS, and the answer is called the PRODUCT.',
      'You can visualize multiplication like an egg carton or array: 2 rows of 6 eggs = 12 eggs.'
    ],
    examples: [
      '3 bags with 5 apples each: 3 × 5 = 15 apples.',
      'The Zero Rule: Any number multiplied by 0 is always 0! (9,999 × 0 = 0).',
      'The One Rule: Any number multiplied by 1 stays itself! (7 × 1 = 7).'
    ],
    importantPoints: [
      'Commutative Property: Order does not matter! 4 × 7 is the exact same answer as 7 × 4 (both equal 28).',
      '9s Finger Trick: Hold up 10 fingers. To find 9 × 3, bend down your 3rd finger. You have 2 fingers to the left and 7 fingers to the right = 27!',
      'Multiplication by 10: Just slide a zero onto the end (6 × 10 = 60; 14 × 10 = 140).'
    ],
    practiceQuestions: [
      {
        id: 'math-mult-q1',
        question: 'A spider has 8 legs. How many legs do 4 spiders have altogether?',
        answer: '32 legs (4 × 8 = 32)',
        explanation: '4 groups of 8 legs equals 32 total legs.'
      },
      {
        id: 'math-mult-q2',
        question: 'What is 12 × 0?',
        answer: '0',
        explanation: 'Any number multiplied by zero is always zero.'
      }
    ]
  },

  // ================= SCIENCE =================
  {
    id: 'science-water-cycle',
    subject: 'science',
    title: 'The Great Water Cycle: Earth’s Never-Ending Adventure',
    gradeLevel: 'Grades 2–6',
    summary: 'How water travels from oceans to clouds, rains down on mountains, and cycles back again!',
    explanation: [
      'Did you know that the water in your glass today might have been drunk by a dinosaur 70 million years ago? Earth never makes new water—it recycles the exact same water over and over!',
      '1. EVAPORATION: The warm sun heats up water in oceans, lakes, and puddles, turning liquid water into an invisible gas called water vapor.',
      '2. CONDENSATION: As water vapor rises high into the chilly sky, it cools down and clumps onto tiny dust specks to form fluffy clouds.',
      '3. PRECIPITATION: When clouds get too heavy with water droplets, they fall back to the ground as rain, snow, sleet, or hail.',
      '4. COLLECTION: The water collects in rivers, lakes, oceans, and underground aquifers, ready to start all over again.'
    ],
    examples: [
      'Evaporation at home: Watch a small puddle on the sunny driveway disappear in the afternoon.',
      'Condensation at home: Look at the tiny water beads forming on the outside of an ice-cold glass of lemonade on a warm day.'
    ],
    importantPoints: [
      'Plants also release water vapor into the air through their leaves; this process is called TRANSPIRATION.',
      'The primary energy engine driving the entire water cycle is the SUN.',
      'Clouds are made of billions of microscopic liquid water droplets or tiny ice crystals, not fluffy gas!'
    ],
    practiceQuestions: [
      {
        id: 'sci-water-q1',
        question: 'What turns liquid water into water vapor during the water cycle?',
        answer: 'Heat from the Sun (Evaporation)',
        explanation: 'Solar thermal energy warms water molecules so they gain energy and evaporate.'
      },
      {
        id: 'sci-water-q2',
        question: 'When tiny water droplets gather high in the sky to form clouds, what stage is this?',
        answer: 'Condensation',
        explanation: 'Water vapor cools down and condenses back into liquid droplets.'
      }
    ]
  },
  {
    id: 'science-solar-system',
    subject: 'science',
    title: 'Our Solar System: The Sun and Eight Orbiting Worlds',
    gradeLevel: 'Grades 3–6',
    summary: 'Travel through outer space and meet the terrestrial planets, gas giants, and the glowing star at the center.',
    explanation: [
      'Our Solar System is a cosmic neighborhood located inside the Milky Way galaxy. At its glowing heart sits the SUN—a massive, blazing ball of hydrogen and helium gas.',
      'Eight planets orbit around the Sun in elliptical paths held by gravity.',
      'The 4 Inner Rocky Planets (closer, smaller, solid rock surfaces): Mercury, Venus, Earth, and Mars.',
      'The 4 Outer Giant Planets (huge, mostly gas and liquid): Jupiter, Saturn, Uranus, and Neptune.'
    ],
    examples: [
      'Earth is located in the "Goldilocks Zone"—not too scorching hot and not too freezing cold, allowing liquid water and life to flourish.',
      'Jupiter is so gigantic that over 1,300 Earths could fit inside it!',
      'Saturn is famous for its dazzling rings made of billions of chunks of glittering ice and rock.'
    ],
    importantPoints: [
      'Memory Sentence: "My Very Educated Mother Just Served Us Noodles" (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune).',
      'The Sun contains over 99.8% of all the mass in our entire solar system.',
      'Venus is the hottest planet in the solar system, even hotter than Mercury, due to a thick blanket of greenhouse gas atmosphere trapping heat!'
    ],
    practiceQuestions: [
      {
        id: 'sci-solar-q1',
        question: 'Which planet is known as the "Red Planet" because of iron oxide dust on its surface?',
        answer: 'Mars',
        explanation: 'Mars looks reddish-orange due to rusted iron minerals across its rocky surface.'
      },
      {
        id: 'sci-solar-q2',
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
        explanation: 'Jupiter is the King of Planets and has a famous storm called the Great Red Spot.'
      }
    ]
  },

  // ================= SOCIAL STUDIES =================
  {
    id: 'social-community-helpers',
    subject: 'social-studies',
    title: 'Community Helpers and Good Citizenship',
    gradeLevel: 'Grades 1–4',
    summary: 'Learn how doctors, teachers, firefighters, and everyday citizens work together to keep towns safe, healthy, and fair.',
    explanation: [
      'A COMMUNITY is a place where people live, work, learn, and play together.',
      'To make a community thrive, people have different specialized jobs called Community Helpers.',
      'Firefighters and police officers protect our safety; doctors and nurses heal us when we are ill; postal workers deliver letters; sanitation workers keep streets clean and hygienic.',
      'CITIZENSHIP means being an active, caring member of your community. Even young kids are important citizens!'
    ],
    examples: [
      'Helping an elderly neighbor carry groceries is good citizenship in action.',
      'Picking up litter at the local park keeps public spaces clean and safe for everyone.',
      'Listening carefully and following rules in school makes learning fun and fair for your classmates.'
    ],
    importantPoints: [
      'Rights and Responsibilities go hand-in-hand: you have the right to a clean playground, and the responsibility not to litter.',
      'Cooperation means working together toward a common goal that helps everyone.',
      'Volunteers are special community helpers who give their time and care freely without asking for payment.'
    ],
    practiceQuestions: [
      {
        id: 'soc-com-q1',
        question: 'What is a responsibility you have as a citizen in your school classroom?',
        answer: 'Treating classmates with respect, keeping the room tidy, and listening to the teacher.',
        explanation: 'Being respectful and cooperative creates a happy learning space for everyone.'
      },
      {
        id: 'soc-com-q2',
        question: 'Who are community helpers that ensure clean drinking water and clean streets?',
        answer: 'Sanitation workers, water treatment engineers, and city utility teams.',
        explanation: 'These essential workers protect our public health every single day.'
      }
    ]
  },
  {
    id: 'social-continents-maps',
    subject: 'social-studies',
    title: 'Maps and The Seven Continents of Planet Earth',
    gradeLevel: 'Grades 2–6',
    summary: 'How to read a compass rose, map legend, and discover the seven great landmasses of our globe.',
    explanation: [
      'A MAP is a flat picture drawing of a place as seen from directly above. A GLOBE is a round three-dimensional model of the whole planet Earth.',
      'Earth’s land surface is divided into SEVEN major landmasses called Continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia (Oceania).',
      'The oceans cover roughly 71% of Earth’s surface, with the Pacific Ocean being the largest and deepest.'
    ],
    examples: [
      'Asia is the largest continent both by land area and total population.',
      'Antarctica is the coldest, windiest, and driest continent, covered in thick sheets of ice where penguins live.',
      'Africa is home to the vast Sahara Desert and the mighty Nile River.'
    ],
    importantPoints: [
      'Compass Rose: Shows the 4 cardinal directions: North (N), South (S), East (E), West (W). Memory Trick: "Never Eat Soggy Waffles"!',
      'Map Key / Legend: Explains what symbols like little trees, airplanes, blue lines, and stars mean.',
      'The Equator is an imaginary line circling Earth’s middle halfway between the North and South Poles.'
    ],
    practiceQuestions: [
      {
        id: 'soc-map-q1',
        question: 'What memory phrase helps you remember the four compass directions (N, E, S, W)?',
        answer: 'Never Eat Soggy Waffles (North, East, South, West)',
        explanation: 'Starting at the top and going clockwise: North, East, South, West!'
      },
      {
        id: 'soc-map-q2',
        question: 'How many continents are there on planet Earth?',
        answer: 'Seven (7) continents',
        explanation: 'Asia, Africa, North America, South America, Antarctica, Europe, and Australia.'
      }
    ]
  }
];
