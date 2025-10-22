// User types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = "student" | "instructor" | "admin";

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  thumbnail?: string;
  price: number;
  enrollmentCount: number;
  rating: number;
  duration: number; // in minutes
  level: CourseLevel;
  category: string;
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";

// Lesson types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isPublished: boolean;
}

// Instructor types
export interface Instructor {
  id: string;
  userId: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  expertise: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

// Enrollment types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number; // percentage
  completedLessons: string[]; // lesson IDs
  enrolledAt: string;
  lastAccessedAt: string;
}

// Progress types
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  timeSpent: number; // in seconds
  lastPosition?: number; // for video progress
}

// Quiz types
export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  passed: boolean;
  attemptedAt: string;
}

// Gamification types
export interface Challenge {
  id: string;
  name: string;
  description: string;
  xp: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  type: "speed" | "accuracy" | "completion" | "boss";
  completed?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  xp: number;
  successCriteria: string[];
  timeEstimate: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  phaseId: string;
  number: string;
  title: string;
  questName: string;
  description: string;
  learningObjectives: string[];
  projects: Project[];
  challenges: Challenge[];
  commandsMastered?: string[];
  gamificationElements?: string[];
  realWorldScenarios?: string[];
}

export interface Phase {
  id: string;
  courseId: string;
  number: number;
  title: string;
  level: string;
  duration: string;
  modules: Module[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: "foundational" | "collaboration" | "mastery" | "special";
  iconUrl?: string;
  earned: boolean;
  earnedAt?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xp: number;
  badgeId?: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  currentXP: number;
  level: number;
  completedModules: string[];
  completedChallenges: string[];
  completedProjects: string[];
  badges: Badge[];
  achievements: Achievement[];
  dailyStreak: number;
  lastActivityAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  rank: number;
}

// Extended Course type for gamified courses
export interface GamifiedCourse extends Course {
  type: "gamified";
  phases: Phase[];
  totalXP: number;
  levelThresholds: { level: number; minXP: number; title: string }[];
}
