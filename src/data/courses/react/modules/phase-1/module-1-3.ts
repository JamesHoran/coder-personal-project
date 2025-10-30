/**
 * React Course - Phase 1
 * Module 1.3: Event Handling
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { eventHandlingLessons } from '@/data/courses/react-course-interactive/phase-1/module-1-3';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-1-3-capstone',
  moduleId: 'module-1-3',
  name: 'Multi-Step Registration Form',
  description: `Create a complex registration form wizard with validation, error handling, and progress tracking.`,
  xp: 700,
  timeEstimate: '10-12 hours',
  difficulty: 'intermediate',
  successCriteria: [
    'Application runs without errors',
    'All core features implemented',
    'Code follows React best practices',
    'Clean, maintainable code structure',
    'Responsive design',
    'No console errors or warnings',
  ],
};

// =================================================================
// BONUS CHALLENGES (Optional)
// =================================================================

const bonusChallenges: BonusChallenge[] = [
  {
    id: 'module-1-3-bonus-1',
    moduleId: 'module-1-3',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-1-3-bonus-2',
    moduleId: 'module-1-3',
    name: 'Perfectionist',
    description: 'Get 100% on all lesson tests on first try',
    xp: 150,
    difficulty: 'expert',
    type: 'perfect',
  },
];

// =================================================================
// UNIFIED MODULE
// =================================================================

export const module_1_3: UnifiedModule = {
  id: 'module-1-3',
  phaseId: 'phase-1',
  phase: 1,
  number: '1.3',
  title: 'Event Handling',
  questName: 'Master of Interactions',
  description: 'Master event handling, forms, and user input in React applications.',

  learningObjectives: [],

  lessons: eventHandlingLessons,
  totalLessonXP: eventHandlingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    eventHandlingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: eventHandlingLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '10-12 hours',
};
