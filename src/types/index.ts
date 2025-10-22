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
