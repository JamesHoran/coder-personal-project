/**
 * React Course - Phase 1
 * Module 1.5: Lists and Keys
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { listsAndKeysLessons } from '@/data/courses/react-course-interactive/phase-1/module-1-5';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-1-5-capstone',
  moduleId: 'module-1-5',
  name: 'Filterable Product Catalog',
  description: `Create a product catalog with search, filtering, sorting, and pagination.`,
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
    id: 'module-1-5-bonus-1',
    moduleId: 'module-1-5',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-1-5-bonus-2',
    moduleId: 'module-1-5',
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

export const module_1_5: UnifiedModule = {
  id: 'module-1-5',
  phaseId: 'phase-1',
  phase: 1,
  number: '1.5',
  title: 'Lists and Keys',
  questName: 'The Array Architect',
  description: 'Master rendering lists, using keys correctly, and manipulating arrays in React.',

  learningObjectives: [],

  lessons: listsAndKeysLessons,
  totalLessonXP: listsAndKeysLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    listsAndKeysLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: listsAndKeysLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '10-12 hours',
};
