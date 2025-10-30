/**
 * React Course - Unified Index
 *
 * This file exports the complete unified React course with:
 * - 155 interactive lessons
 * - 13 capstone projects
 * - 26 bonus challenges
 * - Gamification system (XP, levels, badges)
 * - Progress tracking
 *
 * Total XP Available: ~45,000 XP
 * Total Content: 194 pieces (155 lessons + 13 projects + 26 challenges)
 * Estimated Time: 70-90 hours
 */

import { ReactCourse, CoursePhase, UnifiedModule, LevelThreshold, BadgeDefinition } from '@/types/course';

// Import all unified modules
import { module_1_1 } from './modules/phase-1/module-1-1-react-fundamentals';
import { module_1_2 } from './modules/phase-1/module-1-2';
import { module_1_3 } from './modules/phase-1/module-1-3';
import { module_1_4 } from './modules/phase-1/module-1-4';
import { module_1_5 } from './modules/phase-1/module-1-5';

import { module_2_1 } from './modules/phase-2/module-2-1';
import { module_2_2 } from './modules/phase-2/module-2-2';
import { module_2_3 } from './modules/phase-2/module-2-3';
import { module_2_4 } from './modules/phase-2/module-2-4';

import { module_3_1 } from './modules/phase-3/module-3-1';
import { module_3_2 } from './modules/phase-3/module-3-2';
import { module_3_3 } from './modules/phase-3/module-3-3';
import { module_3_4 } from './modules/phase-3/module-3-4';

// =================================================================
// LEVEL THRESHOLDS
// =================================================================

export const levelThresholds: LevelThreshold[] = [
  { level: 1, minXP: 0, title: 'React Newbie' },
  { level: 2, minXP: 500, title: 'Component Apprentice' },
  { level: 3, minXP: 1000, title: 'JSX Journeyman' },
  { level: 4, minXP: 1750, title: 'Props Practitioner' },
  { level: 5, minXP: 2500, title: 'State Student' },
  { level: 6, minXP: 3500, title: 'Event Handler' },
  { level: 7, minXP: 4750, title: 'Conditional Coder' },
  { level: 8, minXP: 6250, title: 'List Master' },
  { level: 9, minXP: 8000, title: 'Hook Hero' },
  { level: 10, minXP: 10000, title: 'React Practitioner' },
  { level: 11, minXP: 12500, title: 'Pattern Pioneer' },
  { level: 12, minXP: 15250, title: 'Performance Pro' },
  { level: 13, minXP: 18250, title: 'Router Ranger' },
  { level: 14, minXP: 21500, title: 'State Strategist' },
  { level: 15, minXP: 25000, title: 'TypeScript Titan' },
  { level: 16, minXP: 29000, title: 'Testing Tactician' },
  { level: 17, minXP: 33500, title: 'Production Professional' },
  { level: 18, minXP: 38500, title: 'React Expert' },
  { level: 19, minXP: 42000, title: 'React Architect' },
  { level: 20, minXP: 45000, title: 'React Legend' },
];

// =================================================================
// BADGES
// =================================================================

export const badges: BadgeDefinition[] = [
  // Progress Badges
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'progress',
    criteria: { type: 'lessons_completed', value: 1 },
    xpBonus: 50,
  },
  {
    id: '10-lessons',
    name: 'Consistent Learner',
    description: 'Complete 10 lessons',
    icon: '📚',
    category: 'progress',
    criteria: { type: 'lessons_completed', value: 10 },
    xpBonus: 100,
  },
  {
    id: '50-lessons',
    name: 'Dedicated Student',
    description: 'Complete 50 lessons',
    icon: '⭐',
    category: 'progress',
    criteria: { type: 'lessons_completed', value: 50 },
    xpBonus: 250,
  },
  {
    id: '100-lessons',
    name: 'Coding Marathon',
    description: 'Complete 100 lessons',
    icon: '🏃',
    category: 'progress',
    criteria: { type: 'lessons_completed', value: 100 },
    xpBonus: 500,
  },
  {
    id: 'all-lessons',
    name: 'Lesson Completionist',
    description: 'Complete all 155 lessons',
    icon: '💯',
    category: 'progress',
    criteria: { type: 'lessons_completed', value: 155 },
    xpBonus: 1000,
  },

  // Module Completion Badges
  {
    id: 'module-1-1-complete',
    name: 'React Fundamentals Master',
    description: 'Complete Module 1.1',
    icon: '🎓',
    category: 'module',
    criteria: { type: 'module_completed', value: 'module-1-1' },
    xpBonus: 100,
  },
  {
    id: 'phase-1-complete',
    name: 'Novice Graduate',
    description: 'Complete all Phase 1 modules',
    icon: '🏆',
    category: 'module',
    criteria: { type: 'module_completed', value: 'phase-1' },
    xpBonus: 500,
  },
  {
    id: 'phase-2-complete',
    name: 'Practitioner Certified',
    description: 'Complete all Phase 2 modules',
    icon: '🎖️',
    category: 'module',
    criteria: { type: 'module_completed', value: 'phase-2' },
    xpBonus: 750,
  },
  {
    id: 'phase-3-complete',
    name: 'Expert Certified',
    description: 'Complete all Phase 3 modules',
    icon: '👑',
    category: 'module',
    criteria: { type: 'module_completed', value: 'phase-3' },
    xpBonus: 1000,
  },

  // Project Badges
  {
    id: 'first-project',
    name: 'Project Builder',
    description: 'Complete your first capstone project',
    icon: '🏗️',
    category: 'project',
    criteria: { type: 'project_completed', value: 1 },
    xpBonus: 200,
  },
  {
    id: 'all-projects',
    name: 'Capstone Champion',
    description: 'Complete all 13 capstone projects',
    icon: '🏅',
    category: 'project',
    criteria: { type: 'project_completed', value: 13 },
    xpBonus: 2000,
  },

  // Achievement Badges
  {
    id: '10-day-streak',
    name: 'Consistency King',
    description: 'Learn for 10 days in a row',
    icon: '🔥',
    category: 'achievement',
    criteria: { type: 'streak', value: 10 },
    xpBonus: 300,
  },
  {
    id: 'perfect-module',
    name: 'Perfectionist',
    description: 'Get 100% on all tests in a module',
    icon: '💎',
    category: 'achievement',
    criteria: { type: 'perfect_score', value: 'module' },
    xpBonus: 400,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a module in under 8 hours',
    icon: '⚡',
    category: 'achievement',
    criteria: { type: 'speed', value: '8-hours' },
    xpBonus: 350,
  },

  // Special Badge
  {
    id: 'course-complete',
    name: 'React Master',
    description: 'Complete the entire React course',
    icon: '🎉',
    category: 'special',
    criteria: { type: 'lessons_completed', value: 155 },
    xpBonus: 5000,
  },
];

// =================================================================
// PHASES
// =================================================================

const phase1: CoursePhase = {
  id: 'phase-1',
  number: 1,
  title: 'Novice Foundations',
  description: 'Build a solid foundation in React fundamentals through 51 interactive lessons and 5 capstone projects.',
  level: 'Novice',
  modules: [module_1_1, module_1_2, module_1_3, module_1_4, module_1_5],
  totalLessons: 51,
  totalProjects: 5,
  totalXP: [module_1_1, module_1_2, module_1_3, module_1_4, module_1_5].reduce(
    (sum, mod) => sum + mod.totalXP,
    0
  ),
  estimatedHours: '18-24 hours',
};

const phase2: CoursePhase = {
  id: 'phase-2',
  number: 2,
  title: 'Practitioner Skills',
  description: 'Master advanced patterns and optimization through 61 interactive lessons and 4 capstone projects.',
  level: 'Practitioner',
  modules: [module_2_1, module_2_2, module_2_3, module_2_4],
  totalLessons: 61,
  totalProjects: 4,
  totalXP: [module_2_1, module_2_2, module_2_3, module_2_4].reduce((sum, mod) => sum + mod.totalXP, 0),
  estimatedHours: '26-32 hours',
};

const phase3: CoursePhase = {
  id: 'phase-3',
  number: 3,
  title: 'Expert Mastery',
  description: 'Achieve production-ready expertise through 43 interactive lessons and 4 capstone projects.',
  level: 'Expert',
  modules: [module_3_1, module_3_2, module_3_3, module_3_4],
  totalLessons: 43,
  totalProjects: 4,
  totalXP: [module_3_1, module_3_2, module_3_3, module_3_4].reduce((sum, mod) => sum + mod.totalXP, 0),
  estimatedHours: '26-34 hours',
};

// =================================================================
// UNIFIED REACT COURSE
// =================================================================

export const reactCourse: ReactCourse = {
  id: 'react-mastery',
  title: 'React Mastery',
  description:
    'Master React from fundamentals to production patterns through 155 interactive coding lessons, 13 real-world capstone projects, and gamified learning.',
  tagline: 'From Zero to React Hero',
  phases: [phase1, phase2, phase3],

  stats: {
    totalLessons: 155,
    totalProjects: 13,
    totalChallenges: 26,
    totalXP: phase1.totalXP + phase2.totalXP + phase3.totalXP,
    estimatedHoursMin: 70,
    estimatedHoursMax: 90,
  },

  levelThresholds,
  badges,
};

// =================================================================
// HELPER FUNCTIONS
// =================================================================

/**
 * Get all lessons across all modules
 */
export function getAllLessons() {
  return [
    ...phase1.modules.flatMap((m) => m.lessons),
    ...phase2.modules.flatMap((m) => m.lessons),
    ...phase3.modules.flatMap((m) => m.lessons),
  ];
}

/**
 * Get all projects across all modules
 */
export function getAllProjects() {
  return [
    ...phase1.modules.map((m) => m.capstoneProject),
    ...phase2.modules.map((m) => m.capstoneProject),
    ...phase3.modules.map((m) => m.capstoneProject),
  ];
}

/**
 * Get lesson by ID
 */
export function getLessonById(lessonId: string) {
  return getAllLessons().find((lesson) => lesson.id === lessonId);
}

/**
 * Get module by ID
 */
export function getModuleById(moduleId: string): UnifiedModule | undefined {
  return [...phase1.modules, ...phase2.modules, ...phase3.modules].find((m) => m.id === moduleId);
}

/**
 * Get project by ID
 */
export function getProjectById(projectId: string) {
  return getAllProjects().find((project) => project.id === projectId);
}

/**
 * Calculate user level from XP
 */
export function calculateLevel(xp: number): number {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (xp >= levelThresholds[i].minXP) {
      return levelThresholds[i].level;
    }
  }
  return 1;
}

/**
 * Calculate progress to next level
 */
export function calculateLevelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const currentThreshold = levelThresholds.find((t) => t.level === currentLevel);
  const nextThreshold = levelThresholds.find((t) => t.level === currentLevel + 1);

  if (!currentThreshold || !nextThreshold) return 100;

  const xpInCurrentLevel = xp - currentThreshold.minXP;
  const xpNeededForNextLevel = nextThreshold.minXP - currentThreshold.minXP;

  return Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);
}

// Export individual phases for direct access
export { phase1, phase2, phase3 };

// Export all modules
export const allModules = [
  module_1_1,
  module_1_2,
  module_1_3,
  module_1_4,
  module_1_5,
  module_2_1,
  module_2_2,
  module_2_3,
  module_2_4,
  module_3_1,
  module_3_2,
  module_3_3,
  module_3_4,
];
