/**
 * React Course - Phase 2
 * Module 2.4: Routing
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { routingLessons } from '@/data/courses/react-course-interactive/phase-2/module-2-4';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-2-4-capstone',
  moduleId: 'module-2-4',
  name: 'Multi-Page Blog Platform',
  description: `Create a blog with routing, authentication, protected routes, and deep linking.`,
  xp: 850,
  timeEstimate: '12-14 hours',
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
    id: 'module-2-4-bonus-1',
    moduleId: 'module-2-4',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-2-4-bonus-2',
    moduleId: 'module-2-4',
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

export const module_2_4: UnifiedModule = {
  id: 'module-2-4',
  phaseId: 'phase-2',
  phase: 2,
  number: '2.4',
  title: 'Routing',
  questName: 'Navigation Navigator',
  description: 'Master React Router with dynamic routes, nested routing, and protected routes.',

  learningObjectives: [],

  lessons: routingLessons,
  totalLessonXP: routingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    routingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: routingLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '12-14 hours',
};
