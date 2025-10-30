/**
 * React Course - Phase 1: Novice Foundations
 * Module 1.1: React Fundamentals
 *
 * UNIFIED MODULE - Combines:
 * - 10 interactive lessons (from react-course-interactive)
 * - 1 capstone project (from gamified course)
 * - 4 bonus challenges (from gamified course)
 */

import { UnifiedModule, InteractiveLesson, CapstonProject, BonusChallenge } from '@/types/course';

// Import the original 10 interactive lessons
import { reactFundamentalsLessons } from '@/data/courses/react-course-interactive/phase-1/module-1-1-react-fundamentals';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'react-1-1-capstone',
  moduleId: 'module-1-1',
  name: 'Personal Portfolio Website',
  description: `
Build a complete multi-component portfolio site that showcases everything you've learned about React fundamentals.

Your portfolio will feature:
- A navigation component with routing between sections
- A hero section with your information
- A projects showcase using list rendering
- An about section with conditional rendering
- A contact form with event handling
- Responsive design and modern styling

This project integrates all the concepts from Module 1.1: components, JSX, props, events, conditional rendering, and lists/keys.
  `.trim(),
  xp: 500,
  timeEstimate: '6-8 hours',
  difficulty: 'beginner',
  successCriteria: [
    'At least 5 distinct components created',
    'Props passed correctly between parent and child components',
    'Event handlers implemented for at least 3 user interactions',
    'Conditional rendering used in at least 2 places',
    'List rendering with proper key props',
    'Navigation between different sections working',
    'Responsive design that works on mobile and desktop',
    'Clean, semantic HTML structure',
    'No console errors or warnings',
    'Code follows React best practices',
  ],
  starterRepoUrl: 'https://github.com/your-org/react-portfolio-starter',
};

// =================================================================
// BONUS CHALLENGES (Optional)
// =================================================================

const bonusChallenges: BonusChallenge[] = [
  {
    id: 'react-1-1-bonus-1',
    moduleId: 'module-1-1',
    name: 'First Component',
    description: 'Create your first React component and see it render on screen',
    xp: 25,
    difficulty: 'intermediate',
    type: 'completion',
  },
  {
    id: 'react-1-1-bonus-2',
    moduleId: 'module-1-1',
    name: 'Props Master',
    description: 'Successfully pass 10 different prop types including strings, numbers, booleans, arrays, objects, and functions',
    xp: 50,
    difficulty: 'intermediate',
    type: 'completion',
  },
  {
    id: 'react-1-1-bonus-3',
    moduleId: 'module-1-1',
    name: 'Event Handler Champion',
    description: 'Implement 15 different event handlers across your components (onClick, onChange, onSubmit, onMouseEnter, etc.)',
    xp: 75,
    difficulty: 'advanced',
    type: 'completion',
  },
  {
    id: 'react-1-1-bonus-4',
    moduleId: 'module-1-1',
    name: 'Boss Challenge: Component Library',
    description: 'Build a reusable component library with 20 different components (buttons, cards, modals, etc.) and document them',
    xp: 150,
    difficulty: 'expert',
    type: 'boss',
  },
];

// =================================================================
// UNIFIED MODULE
// =================================================================

export const module_1_1: UnifiedModule = {
  id: 'module-1-1',
  phaseId: 'phase-1',
  phase: 1,
  number: '1.1',
  title: 'React Fundamentals',
  questName: 'The Component Journey',
  description: 'Master the foundational concepts of React including components, JSX, props, and events.',

  learningObjectives: [
    'Understand what React is and why it exists',
    'Learn the virtual DOM concept',
    'Create functional components',
    'Master JSX syntax and rules',
    'Pass and use props effectively',
    'Handle events in React',
    'Implement conditional rendering',
    'Render lists with proper keys',
    'Compose components to build complex UIs',
    'Follow React best practices and conventions',
  ],

  // 10 interactive lessons (imported from original)
  lessons: reactFundamentalsLessons,
  totalLessonXP: reactFundamentalsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  // 1 capstone project
  capstoneProject,

  // 4 bonus challenges
  bonusChallenges,

  // Computed totals
  totalXP:
    reactFundamentalsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent:
    reactFundamentalsLessons.length +
    1 + // capstone project
    (bonusChallenges?.length || 0),

  estimatedHours: '8-12 hours',
};

// Export for easy access
export const reactFundamentalsModule = module_1_1;
