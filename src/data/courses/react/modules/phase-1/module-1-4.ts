/**
 * React Course - Phase 1
 * Module 1.4: Conditional Rendering
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { conditionalRenderingLessons } from '@/data/courses/react-course-interactive/phase-1/module-1-4';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-1-4-capstone',
  moduleId: 'module-1-4',
  name: 'Dynamic Dashboard with Widgets',
  description: `Build a customizable dashboard where users can show/hide widgets, change themes, and personalize their view.`,
  xp: 650,
  timeEstimate: '8-10 hours',
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
    id: 'module-1-4-bonus-1',
    moduleId: 'module-1-4',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-1-4-bonus-2',
    moduleId: 'module-1-4',
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

export const module_1_4: UnifiedModule = {
  id: 'module-1-4',
  phaseId: 'phase-1',
  phase: 1,
  number: '1.4',
  title: 'Conditional Rendering',
  questName: 'The Logic Master',
  description: 'Learn to render UI conditionally based on state, props, and user actions.',

  learningObjectives: [],

  lessons: conditionalRenderingLessons,
  totalLessonXP: conditionalRenderingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    conditionalRenderingLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: conditionalRenderingLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '8-10 hours',
};
