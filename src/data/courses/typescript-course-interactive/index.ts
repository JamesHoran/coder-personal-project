/**
 * TypeScript Interactive Course - Central Index
 *
 * This file exports all TypeScript interactive lessons and provides
 * utility functions to retrieve lessons by ID or module.
 */

import { InteractiveLesson } from "@/types";

// Phase 1: Foundations
import { typescriptFundamentalsLessons } from "./phase-1/module-1-1-typescript-fundamentals";

// Combine all lessons
export const allTypeScriptLessons: InteractiveLesson[] = [
  ...typescriptFundamentalsLessons,
  // Add more modules as they are created
];

/**
 * Get a lesson by its ID
 */
export function getLessonById(lessonId: string): InteractiveLesson | undefined {
  return allTypeScriptLessons.find((lesson) => lesson.id === lessonId);
}

/**
 * Get all lessons for a specific module
 */
export function getLessonsByModule(moduleId: string): InteractiveLesson[] {
  return allTypeScriptLessons.filter((lesson) => lesson.moduleId === moduleId);
}

/**
 * Get lessons by difficulty
 */
export function getLessonsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): InteractiveLesson[] {
  return allTypeScriptLessons.filter((lesson) => lesson.difficulty === difficulty);
}

/**
 * Get total XP for all TypeScript lessons
 */
export function getTotalXP(): number {
  return allTypeScriptLessons.reduce((total, lesson) => total + lesson.xpReward, 0);
}

/**
 * Get lesson statistics
 */
export function getLessonStats() {
  return {
    total: allTypeScriptLessons.length,
    beginner: allTypeScriptLessons.filter((l) => l.difficulty === "beginner").length,
    intermediate: allTypeScriptLessons.filter((l) => l.difficulty === "intermediate").length,
    advanced: allTypeScriptLessons.filter((l) => l.difficulty === "advanced").length,
    totalXP: getTotalXP(),
    totalSteps: allTypeScriptLessons.reduce((total, lesson) => total + lesson.steps.length, 0),
  };
}

// Export lesson arrays by module
export { typescriptFundamentalsLessons };
