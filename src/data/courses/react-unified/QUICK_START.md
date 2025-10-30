# React Unified Course - Quick Start Guide

**⚡ Get started in 2 minutes**

---

## Installation

The unified course is already available in your project:

```typescript
import { allLessons, courseMetadata, gamification } from '@/data/courses/react-unified';
```

---

## Basic Usage

### 1. Get All Lessons

```typescript
import { allLessons } from '@/data/courses/react-unified';

console.log(`Total lessons: ${allLessons.length}`); // 155

// Use in component
<LessonList lessons={allLessons} />
```

### 2. Get Lessons by Module

```typescript
import { getLessonsByModule } from '@/data/courses/react-unified';

const reactFundamentals = getLessonsByModule('module-1-1');
console.log(`Module 1.1: ${reactFundamentals.length} lessons`);
```

### 3. Get Module Metadata (Quest Names)

```typescript
import { courseMetadata } from '@/data/courses/react-unified';

const module = courseMetadata.getModule('module-1-1');
console.log(module.questName);  // "The Component Journey"
console.log(module.title);      // "React Fundamentals"
```

### 4. Calculate User Level

```typescript
import { gamification } from '@/data/courses/react-unified';

const xp = 3500;
const level = gamification.calculateLevel(xp);

console.log(`Level ${level.level}: ${level.title}`);
// "Level 10: Component Creator"
```

### 5. Track Progress

```typescript
import { getModuleProgress, calculateEarnedXP } from '@/data/courses/react-unified';

const completed = ['module-1-1-lesson-1', 'module-1-1-lesson-2'];

// Module progress
const progress = getModuleProgress('module-1-1', completed);
console.log(`${progress.completed}/${progress.total} (${progress.percentage}%)`);

// Total XP earned
const xp = calculateEarnedXP(completed);
console.log(`Earned: ${xp} XP`);
```

---

## Common Patterns

### Display Course Structure

```typescript
import { courseMetadata } from '@/data/courses/react-unified';

function CourseOverview() {
  return (
    <div>
      {courseMetadata.phases.map(phase => (
        <div key={phase.id}>
          <h2>{phase.title}</h2>
          {phase.modules.map(module => (
            <div key={module.id}>
              <h3>🎯 {module.questName}</h3>
              <p>{module.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Lesson Player with Navigation

```typescript
import { getLessonById, getNextLesson, getPreviousLesson } from '@/data/courses/react-unified';

function LessonPlayer({ lessonId }: { lessonId: string }) {
  const lesson = getLessonById(lessonId);
  const next = getNextLesson(lessonId);
  const prev = getPreviousLesson(lessonId);

  return (
    <div>
      <h1>{lesson?.title}</h1>
      {/* Lesson content */}
      <nav>
        {prev && <button>← Previous</button>}
        {next && <button>Next →</button>}
      </nav>
    </div>
  );
}
```

### Progress Dashboard

```typescript
import {
  calculateEarnedXP,
  gamification,
  getPhaseProgress
} from '@/data/courses/react-unified';

function ProgressDashboard({ completedIds }: { completedIds: string[] }) {
  const xp = calculateEarnedXP(completedIds);
  const level = gamification.calculateLevel(xp);
  const phase1 = getPhaseProgress(1, completedIds);

  return (
    <div>
      <h2>Level {level.level}: {level.title}</h2>
      <ProgressBar value={level.progress} />
      <p>{xp} / {level.nextLevelXP} XP</p>

      <h3>Phase 1: React Foundations</h3>
      <ProgressBar value={phase1.percentage} />
      <p>{phase1.completed} / {phase1.total} lessons</p>
    </div>
  );
}
```

### Badge Display

```typescript
import { gamification } from '@/data/courses/react-unified';

function BadgeCollection({ earnedBadgeIds }: { earnedBadgeIds: string[] }) {
  const badges = gamification.badges;

  return (
    <div className="badge-grid">
      {badges.map(badge => (
        <div
          key={badge.id}
          className={earnedBadgeIds.includes(badge.id) ? 'earned' : 'locked'}
        >
          <img src={badge.iconUrl} alt={badge.name} />
          <h3>{badge.name}</h3>
          <p>{badge.description}</p>
          {earnedBadgeIds.includes(badge.id) && (
            <span>+{badge.xpBonus} XP</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## All Available Exports

```typescript
// Main arrays
export const allLessons: InteractiveLesson[];
export const lessonsByModule: Record<string, InteractiveLesson[]>;

// Metadata
export const courseMetadata: {
  info: CourseInfo;
  phases: Phase[];
  modules: Module[];
  getModule: (id: string) => Module | undefined;
  getPhase: (id: string) => Phase | undefined;
};

// Gamification
export const gamification: {
  levels: LevelThreshold[];
  badges: Badge[];
  xpBreakdown: XPBreakdown;
  calculateLevel: (xp: number) => LevelInfo;
  calculateLessonXP: (difficulty: Difficulty) => number;
  calculateTotalXP: () => number;
  getBadgesForModule: (moduleId: string) => Badge[];
  checkSpecialBadges: (stats: UserStats) => string[];
};

// Projects
export const projects: {
  all: CapstonProjectDefinition[];
  phase1: CapstonProjectDefinition;
  phase2: CapstonProjectDefinition;
  getByModuleId: (id: string) => CapstonProjectDefinition | undefined;
  getByPhase: (phase: number) => CapstonProjectDefinition[];
  getTotalXP: () => number;
};

// Statistics
export const courseStats: CourseStatistics;

// Helper functions
export function getLessonById(id: string): InteractiveLesson | undefined;
export function getLessonsByModule(moduleId: string): InteractiveLesson[];
export function getLessonsByDifficulty(difficulty: Difficulty): InteractiveLesson[];
export function getLessonsByPhase(phase: 1|2|3): InteractiveLesson[];
export function getNextLesson(currentId: string): InteractiveLesson | undefined;
export function getPreviousLesson(currentId: string): InteractiveLesson | undefined;
export function getModuleProgress(moduleId: string, completed: string[]): Progress;
export function getPhaseProgress(phase: number, completed: string[]): Progress;
export function calculateEarnedXP(completed: string[]): number;
```

---

## Module IDs

Use these IDs for module operations:

```typescript
// Phase 1
'module-1-1'  // React Fundamentals
'module-1-2'  // State & Lifecycle
'module-1-3'  // Event Handling
'module-1-4'  // Conditional Rendering
'module-1-5'  // Lists & Keys
'module-1-6'  // Capstone: Meme Generator

// Phase 2
'module-2-1'  // Advanced Hooks
'module-2-2'  // Component Patterns
'module-2-3'  // Performance Optimization
'module-2-4'  // React Router
'module-2-5'  // Capstone: Recipe App

// Phase 3
'module-3-1'  // State Management at Scale
'module-3-2'  // React & TypeScript
'module-3-3'  // Testing React Apps
'module-3-4'  // Production Patterns
```

---

## Quick Reference

### Course Stats
- **Total Lessons:** 155
- **Total Modules:** 13
- **Total Phases:** 3
- **Total XP:** ~17,055
- **Total Badges:** 18
- **Total Levels:** 26

### XP by Phase
- **Phase 1:** ~4,800 XP (Foundation)
- **Phase 2:** ~5,750 XP (Intermediate)
- **Phase 3:** ~5,500 XP (Advanced)

### Time Estimates
- **Phase 1:** 15-20 hours
- **Phase 2:** 20-25 hours
- **Phase 3:** 25-30 hours
- **Total:** 60-75 hours

---

## TypeScript Types

```typescript
import type {
  InteractiveLesson,
  Phase,
  Module,
  Badge,
  LevelThreshold,
  CapstonProjectDefinition
} from '@/data/courses/react-unified';
```

---

## Need More Info?

- **Full Documentation:** [README.md](./README.md)
- **API Reference:** See README.md > API Reference
- **Migration Guide:** See README.md > Migration section
- **Testing:** [VERIFICATION.md](./VERIFICATION.md)
- **Detailed Report:** [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)

---

**⚡ That's it! You're ready to use the unified React course.**

```typescript
import { allLessons } from '@/data/courses/react-unified';
// Start building! 🚀
```
