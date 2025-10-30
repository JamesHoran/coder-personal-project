/**
 * React Course - Phase 2
 * Module 2.3: Performance Optimization
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { performanceOptimizationLessons } from '@/data/courses/react-course-interactive/phase-2/module-2-3';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-2-3-capstone',
  moduleId: 'module-2-3',
  name: 'High-Performance Data Grid',
  description: `Build a data grid that handles 10,000+ rows efficiently with virtualization.`,
  xp: 1000,
  timeEstimate: '14-16 hours',
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
    id: 'module-2-3-bonus-1',
    moduleId: 'module-2-3',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-2-3-bonus-2',
    moduleId: 'module-2-3',
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

export const module_2_3: UnifiedModule = {
  id: 'module-2-3',
  phaseId: 'phase-2',
  phase: 2,
  number: '2.3',
  title: 'Performance Optimization',
  questName: 'Speed Demon',
  description: 'Master React.memo, useMemo, useCallback, code splitting, and lazy loading.',

  learningObjectives: [],

  lessons: performanceOptimizationLessons,
  totalLessonXP: performanceOptimizationLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    performanceOptimizationLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: performanceOptimizationLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '14-16 hours',
};
