/**
 * React Course - Phase 3
 * Module 3.3: Testing
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { testingLessons } from '@/data/courses/react-course-interactive/phase-3/module-3-3';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-3-3-capstone',
  moduleId: 'module-3-3',
  name: 'Fully Tested Application',
  description: `Take an existing app and achieve 90%+ test coverage with unit, integration, and E2E tests.`,
  xp: 1100,
  timeEstimate: '15-18 hours',
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
    id: 'module-3-3-bonus-1',
    moduleId: 'module-3-3',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-3-3-bonus-2',
    moduleId: 'module-3-3',
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

export const module_3_3: UnifiedModule = {
  id: 'module-3-3',
  phaseId: 'phase-3',
  phase: 3,
  number: '3.3',
  title: 'Testing',
  questName: 'Quality Assurance Master',
  description: 'Master React Testing Library, Jest, and E2E testing with Playwright.',

  learningObjectives: [],

  lessons: testingLessons,
  totalLessonXP: testingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    testingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: testingLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '15-18 hours',
};
