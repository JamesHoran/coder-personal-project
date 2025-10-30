/**
 * React Course - Phase 2
 * Module 2.1: Advanced Hooks
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { advancedHooksLessons } from '@/data/courses/react-course-interactive/phase-2/module-2-1';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-2-1-capstone',
  moduleId: 'module-2-1',
  name: 'E-Commerce Shopping Cart',
  description: `Build a complete shopping cart with global state, optimizations, and persistent storage.`,
  xp: 900,
  timeEstimate: '12-15 hours',
  difficulty: 'advanced',
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
    id: 'module-2-1-bonus-1',
    moduleId: 'module-2-1',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-2-1-bonus-2',
    moduleId: 'module-2-1',
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

export const module_2_1: UnifiedModule = {
  id: 'module-2-1',
  phaseId: 'phase-2',
  phase: 2,
  number: '2.1',
  title: 'Advanced Hooks',
  questName: 'Hook Sorcerer',
  description: 'Master useEffect, useContext, useReducer, useMemo, useCallback, and custom hooks.',

  learningObjectives: [],

  lessons: advancedHooksLessons,
  totalLessonXP: advancedHooksLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    advancedHooksLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: advancedHooksLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '12-15 hours',
};
