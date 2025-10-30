# React Unified Course

**Status:** ✅ Production Ready
**Quality:** 9.5/10 (Interactive Lessons)
**Total Lessons:** 155
**Total Modules:** 13
**Total Phases:** 3
**Estimated Time:** 60-75 hours

---

## Overview

The React Unified Course consolidates three separate React courses into one comprehensive learning path, combining:

1. **155 Interactive Lessons** - High-quality, production-ready lessons from `react-course-interactive`
2. **Gamification System** - Quest names, badges, levels, and XP tracking
3. **Metadata Structure** - Module descriptions, learning objectives, and phase organization
4. **Capstone Projects** - Two major boss battle projects

---

## Architecture

```
react-unified/
├── index.ts                          # Main entry point - single import for everything
├── course-metadata.ts                # Quest names, module descriptions, phase info
├── gamification.ts                   # Levels, badges, XP system
├── projects/
│   └── capstone-definitions.ts       # Capstone project specifications
└── README.md                         # This file

External Dependencies:
└── ../react-course-interactive/      # 155 lessons (DO NOT MODIFY)
    ├── phase-1/                      # 68 lessons across 6 modules
    ├── phase-2/                      # 50 lessons across 5 modules
    └── phase-3/                      # 37 lessons across 4 modules
```

---

## Usage

### Import Everything

```typescript
import {
  allLessons,           // All 155 lessons in order
  courseMetadata,       // Quest names, module info
  gamification,         // Levels, badges, XP
  projects,             // Capstone definitions
  courseStats           // Statistics
} from '@/data/courses/react-unified';
```

### Get Specific Data

```typescript
// Get lessons for a module
import { getLessonsByModule } from '@/data/courses/react-unified';
const module1Lessons = getLessonsByModule('module-1-1');

// Get a specific lesson
import { getLessonById } from '@/data/courses/react-unified';
const lesson = getLessonById('lesson-1-1-1');

// Calculate user level from XP
import { gamification } from '@/data/courses/react-unified';
const userLevel = gamification.calculateLevel(3500);
// { level: 10, title: 'Component Creator', nextLevelXP: 4000, progress: 100 }

// Get module metadata with quest name
import { courseMetadata } from '@/data/courses/react-unified';
const module = courseMetadata.getModule('module-1-1');
// { title: 'React Fundamentals', questName: 'The Component Journey', ... }
```

---

## Course Structure

### Phase 1: React Foundations (6 modules, 68 lessons)
**Level:** React Apprentice
**Duration:** 15-20 hours
**XP Available:** ~4,800 XP

| Module | Title | Quest Name | Lessons | Capstone |
|--------|-------|------------|---------|----------|
| 1.1 | React Fundamentals | The Component Journey | 15 | - |
| 1.2 | State & Lifecycle | Making Components Alive | 12 | - |
| 1.3 | Event Handling | Interactive Master | 10 | - |
| 1.4 | Conditional Rendering | The Logic Weaver | 10 | - |
| 1.5 | Lists & Keys | Array Architect | 11 | - |
| 1.6 | **Capstone** | Foundation Boss Battle | 10 | **Meme Generator** (500 XP) |

### Phase 2: Intermediate React (5 modules, 50 lessons)
**Level:** React Developer
**Duration:** 20-25 hours
**XP Available:** ~5,750 XP

| Module | Title | Quest Name | Lessons | Capstone |
|--------|-------|------------|---------|----------|
| 2.1 | Advanced Hooks | Hook Sorcerer | 14 | - |
| 2.2 | Component Patterns | Pattern Master | 10 | - |
| 2.3 | Performance Optimization | Speed Demon | 10 | - |
| 2.4 | React Router | Navigation Navigator | 8 | - |
| 2.5 | **Capstone** | Intermediate Boss Battle | 8 | **Recipe App** (600 XP) |

### Phase 3: Advanced React (4 modules, 37 lessons)
**Level:** React Expert
**Duration:** 25-30 hours
**XP Available:** ~5,500 XP

| Module | Title | Quest Name | Lessons |
|--------|-------|------------|---------|
| 3.1 | State Management at Scale | State Architect | 10 |
| 3.2 | React & TypeScript | Type-Safe Master | 10 |
| 3.3 | Testing React Apps | Quality Guardian | 9 |
| 3.4 | Production Patterns & React 19 | Production Hero | 8 |

---

## Gamification System

### Levels (26 levels)

| Level Range | Title | XP Range |
|-------------|-------|----------|
| 1-5 | React Apprentice | 0 - 1,000 XP |
| 6-10 | Component Creator | 1,500 - 3,500 XP |
| 11-15 | React Developer | 4,000 - 6,500 XP |
| 16-20 | React Expert | 7,500 - 11,500 XP |
| 21-25 | React Architect | 12,500 - 17,500 XP |
| 26+ | React Master | 19,000+ XP |

### Badges (18 badges)

**Foundational Badges** (Phase 1)
- Component Creator
- State Manager
- Event Handler
- Logic Weaver
- List Master
- Foundation Complete (Capstone)

**Mastery Badges** (Phase 2 & 3)
- Hook Sorcerer
- Pattern Master
- Speed Demon
- Navigation Pro
- Intermediate Complete (Capstone)
- State Architect
- Type-Safe Master
- Quality Guardian
- Production Hero

**Special Achievement Badges**
- React Master (complete all + level 20)
- Speed Runner (complete module < 2 hours)
- Perfectionist (10 perfect scores in a row)
- Project Master (complete all capstones)

### XP Breakdown

| Source | XP per Item | Total Available |
|--------|-------------|-----------------|
| Lessons (155) | 50-100 XP | ~10,850 XP |
| Module Projects (11) | 150-250 XP | ~2,200 XP |
| Capstone Projects (2) | 500-600 XP | ~1,100 XP |
| Module Challenges (11) | 100-200 XP | ~1,375 XP |
| Badge Bonuses (18) | 50-500 XP | ~1,530 XP |
| **TOTAL** | | **~17,055 XP** |

*Enough to reach Level 25-26 (React Architect/Master)*

---

## Capstone Projects

### Phase 1 Capstone: Meme Generator
**Module 1.6** | **500 XP** | **4-6 hours**

Build a complete meme generator with:
- API integration (Imgflip)
- Image selection gallery
- Text overlay system
- Download/share functionality
- Meme history

**Technologies:** React, useState, useEffect, Fetch API, Canvas API

---

### Phase 2 Capstone: Recipe Discovery App
**Module 2.5** | **600 XP** | **6-8 hours**

Build a full-featured recipe app with:
- Advanced search and filtering
- Multi-page routing
- Favorites system with persistence
- Shopping list generation
- Recipe detail pages

**Technologies:** React, React Router, Custom Hooks, Context API, Local Storage

---

## Key Features

### For Learners
✅ **Progressive Learning** - Build from basics to advanced systematically
✅ **Hands-On Practice** - 155 interactive lessons with instant feedback
✅ **Real Projects** - 2 capstone projects + 11 module projects
✅ **Gamification** - Track progress with XP, levels, and badges
✅ **Interview Ready** - Covers all React concepts asked in interviews

### For Developers
✅ **Single Import** - One import point for entire course
✅ **Type Safe** - Full TypeScript support
✅ **Well Organized** - Clear separation of concerns
✅ **Helper Functions** - Utilities for common operations
✅ **Production Ready** - 9.5/10 quality lessons

---

## API Reference

### Main Exports

```typescript
// Lessons
export const allLessons: InteractiveLesson[];         // All 155 lessons
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
```

### Helper Functions

```typescript
// Lesson queries
getLessonById(lessonId: string): InteractiveLesson | undefined
getLessonsByModule(moduleId: string): InteractiveLesson[]
getLessonsByDifficulty(difficulty: Difficulty): InteractiveLesson[]
getLessonsByPhase(phase: 1 | 2 | 3): InteractiveLesson[]

// Navigation
getNextLesson(currentLessonId: string): InteractiveLesson | undefined
getPreviousLesson(currentLessonId: string): InteractiveLesson | undefined

// Progress tracking
getModuleProgress(moduleId: string, completedIds: string[]): Progress
getPhaseProgress(phase: number, completedIds: string[]): Progress
calculateEarnedXP(completedIds: string[]): number
```

---

## Important Notes

### DO NOT MODIFY
The interactive lessons in `/react-course-interactive/` are **production-ready at 9.5/10 quality**.
They should **NOT** be modified or copied - only imported and re-exported.

### Lessons Include Capstones
- Module 1.6 lessons ARE the Meme Generator capstone
- Module 2.5 lessons ARE the Recipe App capstone
- The `capstone-definitions.ts` file provides detailed project specs

### Module IDs
- Format: `module-{phase}-{number}` (e.g., `module-1-1`, `module-2-3`)
- Lesson IDs include module prefix (e.g., `module-1-1-lesson-1`)

---

## Migration from Old Structure

If you were using the old separate course files:

```typescript
// OLD WAY (3 separate imports)
import { reactCourse } from '@/data/courses/react-course';
import { allReactLessons } from '@/data/courses/react-course-interactive';
import { reactCourseGamification } from '@/data/courses/react-gamification';

// NEW WAY (single import)
import { allLessons, courseMetadata, gamification } from '@/data/courses/react-unified';
```

---

## Statistics

- **Total Lines of Code:** ~30,000+ (including lessons)
- **Interactive Lessons:** 155
- **Code Examples:** ~300+
- **Test Cases:** ~1,500+
- **Learning Paths:** 3 phases
- **Progression Options:** Multiple paths through content
- **Skill Coverage:** Beginner to Expert

---

## Maintenance

**Last Updated:** 2025-10-30
**Version:** 1.0.0
**Status:** Production Ready
**Quality:** 9.5/10

**Maintainers:**
- Lesson content: react-course-interactive team (DO NOT MODIFY)
- Metadata: react-unified structure
- Gamification: Balance updates as needed

**Update Frequency:**
- Lessons: Stable, minimal updates
- Metadata: As new quests/modules added
- Gamification: Balance adjustments quarterly

---

## Contributing

### Adding New Modules
1. Create lessons in `react-course-interactive/`
2. Add module metadata to `course-metadata.ts`
3. Update gamification in `gamification.ts`
4. Add to `index.ts` imports
5. Update this README

### Adding New Badges
1. Add badge definition to `gamification.ts`
2. Add earning logic to `checkSpecialBadges()` or `getBadgesForModule()`
3. Create badge icon at `/public/badges/{badge-id}.svg`
4. Update this README

### Modifying Gamification
1. Update XP values in `gamification.ts`
2. Adjust level thresholds if needed
3. Test progression balance
4. Update documentation

---

## License

Part of the Developer Training Curriculum Platform.
See main project LICENSE for details.
