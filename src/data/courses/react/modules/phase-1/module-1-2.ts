/**
 * React Course - Phase 1
 * Module 1.2: State Basics
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { stateBasicsLessons } from '@/data/courses/react-course-interactive/phase-1/module-1-2';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: 'module-1-2-capstone',
  moduleId: 'module-1-2',
  name: 'Interactive Todo Application',
  description: `Build a full-featured todo app with add, edit, delete, filter, and local storage persistence. Master useState and basic state management.`,
  xp: 600,
  timeEstimate: '8-10 hours',
  difficulty: 'beginner',
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
    id: 'module-1-2-bonus-1',
    moduleId: 'module-1-2',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: 'module-1-2-bonus-2',
    moduleId: 'module-1-2',
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

export const module_1_2: UnifiedModule = {
  id: 'module-1-2',
  phaseId: 'phase-1',
  phase: 1,
  number: '1.2',
  title: 'State Basics',
  questName: 'Making Components Come Alive',
  description: 'Master state management with useState and understand component lifecycles.',

  learningObjectives: [],

  lessons: stateBasicsLessons,
  totalLessonXP: stateBasicsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    stateBasicsLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: stateBasicsLessons.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '8-10 hours',
};
