/**
 * React Course - Phase 3
 * Module 3.1: State Management
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { stateManagementLessons } from '@/data/courses/react-course-interactive/phase-3/module-3-1';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-3-1-capstone',
  moduleId: 'module-3-1',
  name: 'Social Media Dashboard',
  description: `Build a complex dashboard with global state, real-time updates, and offline support.`,
  xp: 1200,
  timeEstimate: '16-20 hours',
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
    id: 'module-3-1-bonus-1',
    moduleId: 'module-3-1',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-3-1-bonus-2',
    moduleId: 'module-3-1',
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

export const module_3_1: UnifiedModule = {
  id: 'module-3-1',
  phaseId: 'phase-3',
  phase: 3,
  number: '3.1',
  title: 'State Management',
  questName: 'State Architect',
  description: 'Master Redux Toolkit, Zustand, and advanced state management patterns.',

  learningObjectives: [],

  lessons: stateManagementLessons,
  totalLessonXP: stateManagementLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    stateManagementLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: stateManagementLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '16-20 hours',
};
