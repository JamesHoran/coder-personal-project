/**
 * React Course - Phase 3
 * Module 3.2: TypeScript with React
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { typescriptReactLessons } from '@/data/courses/react-course-interactive/phase-3/module-3-2';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-3-2-capstone',
  moduleId: 'module-3-2',
  name: 'Type-Safe Component Library',
  description: `Build a fully typed component library with generics, strict typing, and excellent DX.`,
  xp: 1000,
  timeEstimate: '14-16 hours',
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
    id: 'module-3-2-bonus-1',
    moduleId: 'module-3-2',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-3-2-bonus-2',
    moduleId: 'module-3-2',
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

export const module_3_2: UnifiedModule = {
  id: 'module-3-2',
  phaseId: 'phase-3',
  phase: 3,
  number: '3.2',
  title: 'TypeScript with React',
  questName: 'Type Safety Guardian',
  description: 'Master TypeScript in React: typing components, props, hooks, and context.',

  learningObjectives: [],

  lessons: typescriptReactLessons,
  totalLessonXP: typescriptReactLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    typescriptReactLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: typescriptReactLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '14-16 hours',
};
