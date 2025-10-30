/**
 * React Course - Phase 2
 * Module 2.2: Component Patterns
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { componentPatternsLessons } from '@/data/courses/react-course-interactive/phase-2/module-2-2';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-2-2-capstone',
  moduleId: 'module-2-2',
  name: 'Reusable Component Library',
  description: `Create a published npm package with 15+ reusable components following best patterns.`,
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
    id: 'module-2-2-bonus-1',
    moduleId: 'module-2-2',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-2-2-bonus-2',
    moduleId: 'module-2-2',
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

export const module_2_2: UnifiedModule = {
  id: 'module-2-2',
  phaseId: 'phase-2',
  phase: 2,
  number: '2.2',
  title: 'Component Patterns',
  questName: 'Pattern Master',
  description: 'Learn advanced component patterns: HOCs, render props, compound components, and more.',

  learningObjectives: [],

  lessons: componentPatternsLessons,
  totalLessonXP: componentPatternsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    componentPatternsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: componentPatternsLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '12-14 hours',
};
