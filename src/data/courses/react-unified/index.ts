/**
 * React Unified Course - Main Entry Point
 *
 * This file consolidates the React course structure by:
 * 1. Re-exporting all 155 interactive lessons from react-course-interactive
 * 2. Adding gamification metadata (quests, badges, levels)
 * 3. Providing a single import point for the entire course
 *
 * Architecture:
 * - Lessons: Maintained in react-course-interactive (9.5/10 quality, DO NOT MODIFY)
 * - Metadata: Quest names, module descriptions, phase info
 * - Gamification: XP, levels, badges
 * - Projects: Capstone definitions
 *
 * Usage:
 *   import { allLessons, courseMetadata, gamification } from '@/data/courses/react-unified'
 */

// ==================== Import Interactive Lessons ====================
// These are the existing 155 high-quality lessons from react-course-interactive
// DO NOT MODIFY - they are production-ready at 9.5/10 quality

// Phase 1 Lessons
import { reactFundamentalsLessons } from '../react-course-interactive/phase-1/module-1-1-react-fundamentals';
import { stateBasicsLessons } from '../react-course-interactive/phase-1/module-1-2-state-basics';
import { eventHandlingLessons } from '../react-course-interactive/phase-1/module-1-3-event-handling';
import { conditionalRenderingLessons } from '../react-course-interactive/phase-1/module-1-4-conditional-rendering';
import { listsAndKeysLessons } from '../react-course-interactive/phase-1/module-1-5-lists-and-keys';
// Note: module-1-6 is capstone project, included in the lesson arrays

// Phase 2 Lessons
import { advancedHooksLessons } from '../react-course-interactive/phase-2/module-2-1-advanced-hooks';
import { componentPatternsLessons } from '../react-course-interactive/phase-2/module-2-2-component-patterns';
import { performanceOptimizationLessons } from '../react-course-interactive/phase-2/module-2-3-performance-optimization';
import { routingLessons } from '../react-course-interactive/phase-2/module-2-4-routing';
// Note: module-2-5 is capstone project, included in the lesson arrays

// Phase 3 Lessons
import { advancedStateManagementLessons as stateManagementLessons } from '../react-course-interactive/phase-3/module-3-1-state-management';
import { typescriptReactLessons } from '../react-course-interactive/phase-3/module-3-2-typescript-react';
import { testingLessons } from '../react-course-interactive/phase-3/module-3-3-testing';
import { productionPatternsLessons } from '../react-course-interactive/phase-3/module-3-4-production-patterns';

// ==================== Import Metadata & Gamification ====================
import {
  COURSE_INFO,
  allPhases,
  phase1Metadata,
  phase2Metadata,
  phase3Metadata,
  getModuleMetadata,
  getPhaseMetadata,
  getAllModules
} from './course-metadata';

import {
  levelThresholds,
  badges,
  calculateLevel,
  calculateLessonXP,
  calculateTotalXP,
  getBadgesForModule,
  checkSpecialBadges,
  xpBreakdown
} from './gamification';

import {
  allCapstonProjects,
  phase1Capstone,
  phase2Capstone,
  getCapstonByModuleId,
  getCapstonsByPhase,
  getTotalCapstoneXP
} from './projects/capstone-definitions';

import type { InteractiveLesson, Phase, Module } from '@/types';

// ==================== Organize Lessons by Module ====================

/**
 * All lessons organized by module for easy access
 */
export const lessonsByModule = {
  'module-1-1': reactFundamentalsLessons,
  'module-1-2': stateBasicsLessons,
  'module-1-3': eventHandlingLessons,
  'module-1-4': conditionalRenderingLessons,
  'module-1-5': listsAndKeysLessons,
  // module-1-6: Capstone lessons are included in the arrays above
  'module-2-1': advancedHooksLessons,
  'module-2-2': componentPatternsLessons,
  'module-2-3': performanceOptimizationLessons,
  'module-2-4': routingLessons,
  // module-2-5: Capstone lessons are included in the arrays above
  'module-3-1': stateManagementLessons,
  'module-3-2': typescriptReactLessons,
  'module-3-3': testingLessons,
  'module-3-4': productionPatternsLessons,
};

/**
 * All 155 lessons flattened into a single array
 * This is the primary export for rendering lessons
 */
export const allLessons: InteractiveLesson[] = [
  // Phase 1 - React Foundations (68 lessons)
  ...reactFundamentalsLessons,
  ...stateBasicsLessons,
  ...eventHandlingLessons,
  ...conditionalRenderingLessons,
  ...listsAndKeysLessons,

  // Phase 2 - Intermediate React (50 lessons)
  ...advancedHooksLessons,
  ...componentPatternsLessons,
  ...performanceOptimizationLessons,
  ...routingLessons,

  // Phase 3 - Advanced React (37 lessons)
  ...stateManagementLessons,
  ...typescriptReactLessons,
  ...testingLessons,
  ...productionPatternsLessons,
];

// ==================== Course Statistics ====================

/**
 * Course statistics for dashboard and progress tracking
 */
export const courseStats = {
  totalLessons: allLessons.length,
  totalModules: 13,
  totalPhases: 3,
  totalCapstonProjects: 2,
  estimatedHours: '60-75 hours',

  // Breakdown by phase
  phase1: {
    lessons: reactFundamentalsLessons.length +
             stateBasicsLessons.length +
             eventHandlingLessons.length +
             conditionalRenderingLessons.length +
             listsAndKeysLessons.length,
    modules: 6,
    estimatedHours: '15-20 hours'
  },
  phase2: {
    lessons: advancedHooksLessons.length +
             componentPatternsLessons.length +
             performanceOptimizationLessons.length +
             routingLessons.length,
    modules: 5,
    estimatedHours: '20-25 hours'
  },
  phase3: {
    lessons: stateManagementLessons.length +
             typescriptReactLessons.length +
             testingLessons.length +
             productionPatternsLessons.length,
    modules: 4,
    estimatedHours: '25-30 hours'
  },

  // Difficulty distribution
  difficulties: {
    beginner: allLessons.filter(l => l.difficulty === 'beginner').length,
    intermediate: allLessons.filter(l => l.difficulty === 'intermediate').length,
    advanced: allLessons.filter(l => l.difficulty === 'advanced').length,
  }
};

// ==================== Helper Functions ====================

/**
 * Get lessons for a specific module
 */
export function getLessonsByModule(moduleId: string): InteractiveLesson[] {
  return lessonsByModule[moduleId as keyof typeof lessonsByModule] || [];
}

/**
 * Get a specific lesson by ID
 */
export function getLessonById(lessonId: string): InteractiveLesson | undefined {
  return allLessons.find(lesson => lesson.id === lessonId);
}

/**
 * Get lessons by difficulty
 */
export function getLessonsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): InteractiveLesson[] {
  return allLessons.filter(lesson => lesson.difficulty === difficulty);
}

/**
 * Get lessons by phase
 */
export function getLessonsByPhase(phase: 1 | 2 | 3): InteractiveLesson[] {
  const phaseModules = {
    1: ['module-1-1', 'module-1-2', 'module-1-3', 'module-1-4', 'module-1-5'],
    2: ['module-2-1', 'module-2-2', 'module-2-3', 'module-2-4'],
    3: ['module-3-1', 'module-3-2', 'module-3-3', 'module-3-4']
  };

  return allLessons.filter(lesson =>
    phaseModules[phase].some(moduleId => lesson.moduleId.startsWith(moduleId))
  );
}

/**
 * Get next lesson after current lesson
 */
export function getNextLesson(currentLessonId: string): InteractiveLesson | undefined {
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return undefined;
  }
  return allLessons[currentIndex + 1];
}

/**
 * Get previous lesson before current lesson
 */
export function getPreviousLesson(currentLessonId: string): InteractiveLesson | undefined {
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return allLessons[currentIndex - 1];
}

/**
 * Get progress for a module (how many lessons completed)
 */
export function getModuleProgress(
  moduleId: string,
  completedLessonIds: string[]
): { completed: number; total: number; percentage: number } {
  const moduleLessons = getLessonsByModule(moduleId);
  const completed = moduleLessons.filter(lesson =>
    completedLessonIds.includes(lesson.id)
  ).length;

  return {
    completed,
    total: moduleLessons.length,
    percentage: moduleLessons.length > 0 ? Math.round((completed / moduleLessons.length) * 100) : 0
  };
}

/**
 * Get progress for a phase
 */
export function getPhaseProgress(
  phase: 1 | 2 | 3,
  completedLessonIds: string[]
): { completed: number; total: number; percentage: number } {
  const phaseLessons = getLessonsByPhase(phase);
  const completed = phaseLessons.filter(lesson =>
    completedLessonIds.includes(lesson.id)
  ).length;

  return {
    completed,
    total: phaseLessons.length,
    percentage: phaseLessons.length > 0 ? Math.round((completed / phaseLessons.length) * 100) : 0
  };
}

/**
 * Calculate total XP earned from completed lessons
 */
export function calculateEarnedXP(completedLessonIds: string[]): number {
  return allLessons
    .filter(lesson => completedLessonIds.includes(lesson.id))
    .reduce((total, lesson) => total + lesson.xpReward, 0);
}

// ==================== Main Exports ====================

/**
 * Course metadata - quest names, descriptions, module info
 */
export const courseMetadata = {
  info: COURSE_INFO,
  phases: allPhases,
  modules: getAllModules(),
  getModule: getModuleMetadata,
  getPhase: getPhaseMetadata,
};

/**
 * Gamification system - levels, badges, XP
 */
export const gamification = {
  levels: levelThresholds,
  badges,
  xpBreakdown,
  calculateLevel,
  calculateLessonXP,
  calculateTotalXP,
  getBadgesForModule,
  checkSpecialBadges,
};

/**
 * Projects - capstone definitions
 */
export const projects = {
  all: allCapstonProjects,
  phase1: phase1Capstone,
  phase2: phase2Capstone,
  getByModuleId: getCapstonByModuleId,
  getByPhase: getCapstonsByPhase,
  getTotalXP: getTotalCapstoneXP,
};

// ==================== Re-export Types ====================
export type { InteractiveLesson, Phase, Module } from '@/types';

// ==================== Default Export ====================
/**
 * Default export with all course data
 */
export default {
  lessons: allLessons,
  metadata: courseMetadata,
  gamification,
  projects,
  stats: courseStats,
  helpers: {
    getLessonById,
    getLessonsByModule,
    getLessonsByDifficulty,
    getLessonsByPhase,
    getNextLesson,
    getPreviousLesson,
    getModuleProgress,
    getPhaseProgress,
    calculateEarnedXP,
  }
};
