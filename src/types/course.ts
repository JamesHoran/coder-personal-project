/**
 * Unified Course Type Definitions
 * Combines interactive lessons with gamification elements
 */

// ==================== Interactive Lesson Types ====================

export interface TestCase {
  id: string;
  description: string;
  testFunction: string;
}

export interface LessonStep {
  id: string;
  order: number;
  instruction: string;
  hint?: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  language: 'jsx' | 'tsx' | 'javascript' | 'typescript';
}

export interface InteractiveLesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  xpReward: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: LessonStep[];
}

// ==================== Project Types ====================

export interface CapstonProject {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  xp: number;
  timeEstimate: string;
  successCriteria: string[];
  starterRepoUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ProjectSubmission {
  id: string;
  userId: string;
  projectId: string;
  githubUrl?: string;
  demoUrl?: string;
  submittedAt: Date;
  status: 'submitted' | 'approved' | 'rejected' | 'pending_review';
  feedback?: string;
  xpAwarded: number;
}

// ==================== Challenge Types ====================

export interface BonusChallenge {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  xp: number;
  difficulty: 'intermediate' | 'advanced' | 'expert';
  type: 'completion' | 'boss' | 'speed' | 'perfect';
}

// ==================== Module Types ====================

export interface UnifiedModule {
  id: string;
  phaseId: string;
  phase: 1 | 2 | 3;
  number: string;
  title: string;
  questName: string;
  description: string;
  learningObjectives: string[];

  // Interactive lessons (10-15 per module)
  lessons: InteractiveLesson[];
  totalLessonXP: number;

  // Capstone project (1 per module, large XP reward)
  capstoneProject: CapstonProject;

  // Bonus challenges (optional, 3-5 per module)
  bonusChallenges?: BonusChallenge[];

  // Computed totals
  totalXP: number;
  totalContent: number; // lessons + project + challenges
  estimatedHours: string;
}

// ==================== Phase Types ====================

export interface CoursePhase {
  id: string;
  number: 1 | 2 | 3;
  title: string;
  description: string;
  level: 'Novice' | 'Practitioner' | 'Expert';
  modules: UnifiedModule[];
  totalLessons: number;
  totalProjects: number;
  totalXP: number;
  estimatedHours: string;
}

// ==================== Course Types ====================

export interface ReactCourse {
  id: string;
  title: string;
  description: string;
  tagline: string;
  phases: CoursePhase[];

  // Statistics
  stats: {
    totalLessons: number;
    totalProjects: number;
    totalChallenges: number;
    totalXP: number;
    estimatedHoursMin: number;
    estimatedHoursMax: number;
  };

  // Progression
  levelThresholds: LevelThreshold[];
  badges: BadgeDefinition[];
}

// ==================== Progression Types ====================

export interface LevelThreshold {
  level: number;
  minXP: number;
  title: string;
  icon?: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'module' | 'project' | 'achievement' | 'special';
  criteria: {
    type: 'lessons_completed' | 'module_completed' | 'project_completed' | 'xp_earned' | 'streak' | 'speed' | 'perfect_score';
    value: string | number;
  };
  xpBonus?: number;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
  badgeData: BadgeDefinition;
}

// ==================== Progress Types ====================

export interface UserProgress {
  userId: string;
  courseId: string;

  // XP and Level
  totalXP: number;
  currentLevel: number;
  levelProgress: number; // percentage to next level

  // Completion tracking
  completedLessons: string[]; // lesson IDs
  completedProjects: string[]; // project IDs
  completedChallenges: string[]; // challenge IDs

  // Badges
  earnedBadges: string[]; // badge IDs

  // Stats
  totalLessonsCompleted: number;
  totalProjectsCompleted: number;
  overallProgress: number; // percentage of course completed

  // Timestamps
  startedAt: Date;
  lastActivityAt: Date;
  completedAt?: Date;
}

// ==================== Lesson Progress ====================

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  moduleId: string;

  status: 'not_started' | 'in_progress' | 'completed';
  currentStepIndex: number;
  completedSteps: string[];

  attempts: number;
  bestScore: number; // percentage of tests passed
  xpEarned: number;

  startedAt: Date;
  completedAt?: Date;
  lastAttemptAt: Date;
}

// ==================== Lesson Submission ====================

export interface LessonSubmission {
  id: string;
  userId: string;
  lessonId: string;
  stepId: string;

  submittedCode: string;
  testResults: {
    passed: number;
    failed: number;
    total: number;
    details: {
      testId: string;
      description: string;
      passed: boolean;
      error?: string;
    }[];
  };

  xpAwarded: number;
  submittedAt: Date;
}

// ==================== Helper Types ====================

export interface ModuleSummary {
  moduleId: string;
  lessonsCompleted: number;
  totalLessons: number;
  projectCompleted: boolean;
  xpEarned: number;
  totalXP: number;
  progress: number; // percentage
}

export interface PhaseSummary {
  phaseId: string;
  modulesCompleted: number;
  totalModules: number;
  lessonsCompleted: number;
  totalLessons: number;
  projectsCompleted: number;
  totalProjects: number;
  xpEarned: number;
  totalXP: number;
  progress: number; // percentage
}

// ==================== Component Props Types ====================

export interface LessonPlayerProps {
  lesson: InteractiveLesson;
  userProgress?: LessonProgress;
  onComplete?: (xp: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface ProjectCardProps {
  project: CapstonProject;
  userSubmission?: ProjectSubmission;
  onSubmit?: (submission: Partial<ProjectSubmission>) => void;
}

export interface ProgressDashboardProps {
  userProgress: UserProgress;
  course: ReactCourse;
  phaseSummaries: PhaseSummary[];
  moduleSummaries: ModuleSummary[];
}

// ==================== API Response Types ====================

export interface LessonCompletionResponse {
  success: boolean;
  xpAwarded: number;
  newLevel?: number;
  badgesEarned?: BadgeDefinition[];
  progress: {
    lessonsCompleted: number;
    totalLessons: number;
    xpEarned: number;
    currentLevel: number;
  };
}

export interface ProjectSubmissionResponse {
  success: boolean;
  submissionId: string;
  status: ProjectSubmission['status'];
  message: string;
}
