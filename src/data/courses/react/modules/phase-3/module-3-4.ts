/**
 * React Course - Phase 3
 * Module 3.4: Production Patterns
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { productionPatternsLessons } from '@/data/courses/react-course-interactive/phase-3/module-3-4';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-3-4-capstone',
  moduleId: 'module-3-4',
  name: 'Production-Ready SaaS Application',
  description: `Build a complete SaaS app with auth, payments, admin panel, and deployment pipeline.`,
  xp: 1500,
  timeEstimate: '20-25 hours',
  difficulty: 'expert',
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
    id: 'module-3-4-bonus-1',
    moduleId: 'module-3-4',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-3-4-bonus-2',
    moduleId: 'module-3-4',
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

export const module_3_4: UnifiedModule = {
  id: 'module-3-4',
  phaseId: 'phase-3',
  phase: 3,
  number: '3.4',
  title: 'Production Patterns',
  questName: 'Production Hero',
  description: 'Master authentication, API integration, error boundaries, accessibility, and deployment.',

  learningObjectives: [],

  lessons: productionPatternsLessons,
  totalLessonXP: productionPatternsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    productionPatternsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: productionPatternsLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '20-25 hours',
};
