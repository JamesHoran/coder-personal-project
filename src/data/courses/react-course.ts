/**
 * React Course - Wrapper for Courses Listing Page
 *
 * This file provides course metadata for the /courses page listing.
 * The actual course data is in react-unified/.
 *
 * NOTE: This is a THIN WRAPPER to maintain backward compatibility
 * with the courses listing page. All course logic uses react-unified.
 */

import type { GamifiedCourse } from "@/types";
import { COURSE_INFO, allPhases } from "./react-unified/course-metadata";
import { allLessons } from "./react-unified";
import { levelThresholds, badges } from "./react-unified/gamification";

// Calculate total XP from all phases
const totalXP = allPhases.reduce((sum, phase) =>
  sum + phase.modules.reduce((mSum, module) =>
    mSum + module.projects.reduce((pSum, p) => pSum + p.xp, 0) +
    module.challenges.reduce((cSum, c) => cSum + c.xp, 0), 0), 0);

// Calculate total duration in minutes (for courses page compatibility)
const estimatedHoursMatch = COURSE_INFO.estimatedHours.match(/(\d+)-(\d+)/);
const avgHours = estimatedHoursMatch
  ? (parseInt(estimatedHoursMatch[1]) + parseInt(estimatedHoursMatch[2])) / 2
  : 70;
const durationInMinutes = avgHours * 60;

/**
 * React course metadata for courses listing page
 * Uses unified data source from react-unified/
 */
const reactCourse: GamifiedCourse = {
  // Core identifiers
  id: COURSE_INFO.id,
  title: COURSE_INFO.title,
  description: COURSE_INFO.description,
  category: COURSE_INFO.category,
  level: "beginner",
  duration: durationInMinutes,
  thumbnail: "/images/courses/react-course.jpg",

  // Required Course fields
  instructor: {
    id: "instructor-react",
    userId: "user-react",
    name: "React Expert Team",
    bio: "Expert React developers specializing in modern React patterns and production applications",
    expertise: ["React", "TypeScript", "Performance Optimization", "Testing"],
    coursesCount: 1,
    studentsCount: 10000,
    rating: 4.9,
  },
  price: 0,
  enrollmentCount: 0,
  rating: 4.9,
  lessons: [], // Gamified course uses phases/modules instead
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  // Gamified Course fields
  type: "gamified",
  totalXP,
  levelThresholds,

  // Phases (from unified structure)
  phases: allPhases.map(phase => ({
    id: phase.id,
    courseId: COURSE_INFO.id,
    number: phase.number,
    title: phase.title,
    description: phase.description,
    level: phase.level,
    duration: phase.duration,
    modules: phase.modules
  }))
};

export default reactCourse;
