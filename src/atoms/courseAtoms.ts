import { atom } from "jotai";
import type { Course, Enrollment, UserProgress, Badge, Achievement } from "@/types";

// Selected course atom
export const selectedCourseAtom = atom<Course | null>(null);

// User enrollments atom
export const enrollmentsAtom = atom<Enrollment[]>([]);

// Current lesson index atom
export const currentLessonIndexAtom = atom(0);

// Video player state atom
export const videoPlayerStateAtom = atom({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
});

// Derived atom for checking if course is enrolled
export const isCourseEnrolledAtom = atom((get) => {
  const course = get(selectedCourseAtom);
  const enrollments = get(enrollmentsAtom);

  if (!course) return false;
  return enrollments.some((e) => e.courseId === course.id);
});

// Derived atom for current course progress
export const courseProgressAtom = atom((get) => {
  const course = get(selectedCourseAtom);
  const enrollments = get(enrollmentsAtom);

  if (!course) return 0;

  const enrollment = enrollments.find((e) => e.courseId === course.id);
  return enrollment?.progress || 0;
});

// Gamification atoms
export const userProgressAtom = atom<UserProgress | null>(null);

export const userBadgesAtom = atom<Badge[]>([]);

export const userAchievementsAtom = atom<Achievement[]>([]);

// Derived atom for current level
export const currentLevelAtom = atom((get) => {
  const progress = get(userProgressAtom);
  return progress?.level || 1;
});

// Derived atom for current XP
export const currentXPAtom = atom((get) => {
  const progress = get(userProgressAtom);
  return progress?.currentXP || 0;
});

// Derived atom for earned badges
export const earnedBadgesAtom = atom((get) => {
  const badges = get(userBadgesAtom);
  return badges.filter(b => b.earned);
});

// Derived atom for unlocked achievements
export const unlockedAchievementsAtom = atom((get) => {
  const achievements = get(userAchievementsAtom);
  return achievements.filter(a => a.unlocked);
});

// Derived atom for XP to next level
export const xpToNextLevelAtom = atom((get) => {
  const progress = get(userProgressAtom);
  if (!progress) return 100;

  // Simple calculation - can be enhanced with level thresholds
  const currentLevel = progress.level;
  const nextLevelXP = currentLevel * 100; // 100 XP per level
  const currentXP = progress.currentXP % (currentLevel * 100);

  return nextLevelXP - currentXP;
});

// Module/Phase navigation atoms
export const selectedPhaseIdAtom = atom<string | null>(null);
export const selectedModuleIdAtom = atom<string | null>(null);
