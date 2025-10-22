import { atom } from "jotai";
import type { Course, Enrollment } from "@/types";

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
