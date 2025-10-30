/**
 * React Course - Master Index
 *
 * This file aggregates all 155 interactive lessons from the React course
 * across 3 phases and 13 modules.
 *
 * Total XP Available: ~37,575 XP
 * Total Lessons: 155 lessons (includes React 19 features!)
 */

// Phase 1: Novice Foundations (51 lessons, ~6,475 XP)
import { reactFundamentalsLessons } from './phase-1/module-1-1-react-fundamentals';
import { stateBasicsLessons } from './phase-1/module-1-2-state-basics';
import { eventHandlingLessons } from './phase-1/module-1-3-event-handling';
import { conditionalRenderingLessons } from './phase-1/module-1-4-conditional-rendering';
import { listsAndKeysLessons } from './phase-1/module-1-5-lists-and-keys';

// Phase 2: Practitioner Skills (61 lessons, ~15,400 XP)
import { advancedHooksLessons } from './phase-2/module-2-1-advanced-hooks';
import { componentPatternsLessons } from './phase-2/module-2-2-component-patterns';
import { performanceOptimizationLessons } from './phase-2/module-2-3-performance-optimization';
import { routingLessons } from './phase-2/module-2-4-routing';

// Phase 3: Expert Mastery (43 lessons, ~15,700 XP)
import { advancedStateManagementLessons as stateManagementLessons } from './phase-3/module-3-1-state-management';
import { typescriptReactLessons } from './phase-3/module-3-2-typescript-react';
import { testingLessons } from './phase-3/module-3-3-testing';
import { productionPatternsLessons } from './phase-3/module-3-4-production-patterns';

import { InteractiveLesson } from '@/types';

/**
 * All React course lessons organized by phase and module
 */
export const reactCourseLessons = {
  // Phase 1: Novice Foundations
  phase1: {
    'module-1-1': reactFundamentalsLessons,      // 10 lessons
    'module-1-2': stateBasicsLessons,             // 10 lessons
    'module-1-3': eventHandlingLessons,           // 10 lessons
    'module-1-4': conditionalRenderingLessons,    // 10 lessons
    'module-1-5': listsAndKeysLessons,            // 10 lessons
  },

  // Phase 2: Practitioner Skills
  phase2: {
    'module-2-1': advancedHooksLessons,           // 15 lessons
    'module-2-2': componentPatternsLessons,       // 15 lessons
    'module-2-3': performanceOptimizationLessons, // 15 lessons
    'module-2-4': routingLessons,                 // 15 lessons
  },

  // Phase 3: Expert Mastery
  phase3: {
    'module-3-1': stateManagementLessons,         // 12 lessons
    'module-3-2': typescriptReactLessons,         // 12 lessons
    'module-3-3': testingLessons,                 // 10 lessons
    'module-3-4': productionPatternsLessons,      // 9 lessons (includes React 19!)
  },
};

/**
 * Flattened array of all lessons in order
 */
export const allReactLessons: InteractiveLesson[] = [
  // Phase 1 (51 lessons)
  ...reactFundamentalsLessons,
  ...stateBasicsLessons,
  ...eventHandlingLessons,
  ...conditionalRenderingLessons,
  ...listsAndKeysLessons,

  // Phase 2 (61 lessons)
  ...advancedHooksLessons,
  ...componentPatternsLessons,
  ...performanceOptimizationLessons,
  ...routingLessons,

  // Phase 3 (43 lessons - includes React 19!)
  ...stateManagementLessons,
  ...typescriptReactLessons,
  ...testingLessons,
  ...productionPatternsLessons,
];

/**
 * Course statistics
 */
export const reactCourseStats = {
  totalLessons: allReactLessons.length,
  totalXP: allReactLessons.reduce((sum, lesson) => sum + lesson.xpReward, 0),
  phases: {
    phase1: {
      lessons: 51,
      modules: 5,
      estimatedHoursMin: 16,
      estimatedHoursMax: 21,
    },
    phase2: {
      lessons: 61,
      modules: 4,
      estimatedHoursMin: 26,
      estimatedHoursMax: 32,
    },
    phase3: {
      lessons: 43,
      modules: 4,
      estimatedHoursMin: 22,
      estimatedHoursMax: 28,
    },
  },
};

/**
 * Get lessons by module ID
 */
export function getLessonsByModule(moduleId: string): InteractiveLesson[] {
  // Phase 1
  if (moduleId === 'module-1-1') return reactFundamentalsLessons;
  if (moduleId === 'module-1-2') return stateBasicsLessons;
  if (moduleId === 'module-1-3') return eventHandlingLessons;
  if (moduleId === 'module-1-4') return conditionalRenderingLessons;
  if (moduleId === 'module-1-5') return listsAndKeysLessons;

  // Phase 2
  if (moduleId === 'module-2-1') return advancedHooksLessons;
  if (moduleId === 'module-2-2') return componentPatternsLessons;
  if (moduleId === 'module-2-3') return performanceOptimizationLessons;
  if (moduleId === 'module-2-4') return routingLessons;

  // Phase 3
  if (moduleId === 'module-3-1') return stateManagementLessons;
  if (moduleId === 'module-3-2') return typescriptReactLessons;
  if (moduleId === 'module-3-3') return testingLessons;
  if (moduleId === 'module-3-4') return productionPatternsLessons;

  return [];
}

/**
 * Get a specific lesson by ID
 */
export function getLessonById(lessonId: string): InteractiveLesson | undefined {
  return allReactLessons.find(lesson => lesson.id === lessonId);
}

/**
 * Get lessons by difficulty
 */
export function getLessonsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): InteractiveLesson[] {
  return allReactLessons.filter(lesson => lesson.difficulty === difficulty);
}

/**
 * Get lessons by phase
 */
export function getLessonsByPhase(phase: 1 | 2 | 3): InteractiveLesson[] {
  if (phase === 1) {
    return [
      ...reactFundamentalsLessons,
      ...stateBasicsLessons,
      ...eventHandlingLessons,
      ...conditionalRenderingLessons,
      ...listsAndKeysLessons,
    ];
  }

  if (phase === 2) {
    return [
      ...advancedHooksLessons,
      ...componentPatternsLessons,
      ...performanceOptimizationLessons,
      ...routingLessons,
    ];
  }

  if (phase === 3) {
    return [
      ...stateManagementLessons,
      ...typescriptReactLessons,
      ...testingLessons,
      ...productionPatternsLessons,
    ];
  }

  return [];
}

// Export individual modules for direct access
export {
  // Phase 1
  reactFundamentalsLessons,
  stateBasicsLessons,
  eventHandlingLessons,
  conditionalRenderingLessons,
  listsAndKeysLessons,

  // Phase 2
  advancedHooksLessons,
  componentPatternsLessons,
  performanceOptimizationLessons,
  routingLessons,

  // Phase 3
  stateManagementLessons,
  typescriptReactLessons,
  testingLessons,
  productionPatternsLessons,
};

