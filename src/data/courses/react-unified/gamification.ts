/**
 * React Unified Course - Gamification System
 *
 * Extracted from react-course.ts - Level thresholds, badges, and XP system
 * for the unified React course.
 *
 * Total XP Available: ~20,000 XP across 155 lessons + projects + challenges
 * Levels: 26 levels from React Apprentice to React Master
 */

/**
 * Level Thresholds & Titles
 *
 * Progression:
 * - Levels 1-5: React Apprentice (0-1000 XP)
 * - Levels 6-10: Component Creator (1500-3500 XP)
 * - Levels 11-15: React Developer (4000-6500 XP)
 * - Levels 16-20: React Expert (7500-11500 XP)
 * - Levels 21-25: React Architect (12500-17500 XP)
 * - Level 26+: React Master (19000+ XP)
 */
export const levelThresholds = [
  { level: 1, minXP: 0, title: 'React Apprentice' },
  { level: 2, minXP: 200, title: 'React Apprentice' },
  { level: 3, minXP: 400, title: 'React Apprentice' },
  { level: 4, minXP: 650, title: 'React Apprentice' },
  { level: 5, minXP: 1000, title: 'React Apprentice' },
  { level: 6, minXP: 1500, title: 'Component Creator' },
  { level: 7, minXP: 2000, title: 'Component Creator' },
  { level: 8, minXP: 2500, title: 'Component Creator' },
  { level: 9, minXP: 3000, title: 'Component Creator' },
  { level: 10, minXP: 3500, title: 'Component Creator' },
  { level: 11, minXP: 4000, title: 'React Developer' },
  { level: 12, minXP: 4500, title: 'React Developer' },
  { level: 13, minXP: 5000, title: 'React Developer' },
  { level: 14, minXP: 5750, title: 'React Developer' },
  { level: 15, minXP: 6500, title: 'React Developer' },
  { level: 16, minXP: 7500, title: 'React Expert' },
  { level: 17, minXP: 8500, title: 'React Expert' },
  { level: 18, minXP: 9500, title: 'React Expert' },
  { level: 19, minXP: 10500, title: 'React Expert' },
  { level: 20, minXP: 11500, title: 'React Expert' },
  { level: 21, minXP: 12500, title: 'React Architect' },
  { level: 22, minXP: 13500, title: 'React Architect' },
  { level: 23, minXP: 15000, title: 'React Architect' },
  { level: 24, minXP: 16500, title: 'React Architect' },
  { level: 25, minXP: 17500, title: 'React Architect' },
  { level: 26, minXP: 19000, title: 'React Master' },
];

/**
 * Badge Definitions
 *
 * Categories:
 * - foundational: Core React concepts
 * - mastery: Advanced patterns and techniques
 * - special: Capstones and achievements
 * - collaboration: Team and community badges (future)
 */
export const badges = [
  // Phase 1 - Foundational Badges
  {
    id: 'badge-component-creator',
    name: 'Component Creator',
    description: 'Build your first React component',
    category: 'foundational' as const,
    xpBonus: 50,
    iconUrl: '/badges/component-creator.svg',
    requirement: 'Complete Module 1.1'
  },
  {
    id: 'badge-state-manager',
    name: 'State Manager',
    description: 'Master useState and component state',
    category: 'foundational' as const,
    xpBonus: 50,
    iconUrl: '/badges/state-manager.svg',
    requirement: 'Complete Module 1.2'
  },
  {
    id: 'badge-event-handler',
    name: 'Event Handler',
    description: 'Handle events like a pro',
    category: 'foundational' as const,
    xpBonus: 50,
    iconUrl: '/badges/event-handler.svg',
    requirement: 'Complete Module 1.3'
  },
  {
    id: 'badge-logic-weaver',
    name: 'Logic Weaver',
    description: 'Master conditional rendering',
    category: 'foundational' as const,
    xpBonus: 50,
    iconUrl: '/badges/logic-weaver.svg',
    requirement: 'Complete Module 1.4'
  },
  {
    id: 'badge-list-master',
    name: 'List Master',
    description: 'Render lists with proper keys',
    category: 'foundational' as const,
    xpBonus: 50,
    iconUrl: '/badges/list-master.svg',
    requirement: 'Complete Module 1.5'
  },
  {
    id: 'badge-foundation-complete',
    name: 'Foundation Complete',
    description: 'Complete Phase 1 Capstone Project',
    category: 'special' as const,
    xpBonus: 100,
    iconUrl: '/badges/foundation-complete.svg',
    requirement: 'Complete Meme Generator Capstone'
  },

  // Phase 2 - Mastery Badges
  {
    id: 'badge-hook-sorcerer',
    name: 'Hook Sorcerer',
    description: 'Master all React hooks',
    category: 'mastery' as const,
    xpBonus: 75,
    iconUrl: '/badges/hook-sorcerer.svg',
    requirement: 'Complete Module 2.1'
  },
  {
    id: 'badge-pattern-master',
    name: 'Pattern Master',
    description: 'Implement advanced component patterns',
    category: 'mastery' as const,
    xpBonus: 75,
    iconUrl: '/badges/pattern-master.svg',
    requirement: 'Complete Module 2.2'
  },
  {
    id: 'badge-speed-demon',
    name: 'Speed Demon',
    description: 'Optimize React performance',
    category: 'mastery' as const,
    xpBonus: 75,
    iconUrl: '/badges/speed-demon.svg',
    requirement: 'Complete Module 2.3'
  },
  {
    id: 'badge-navigation-pro',
    name: 'Navigation Pro',
    description: 'Master React Router',
    category: 'mastery' as const,
    xpBonus: 75,
    iconUrl: '/badges/navigation-pro.svg',
    requirement: 'Complete Module 2.4'
  },
  {
    id: 'badge-intermediate-complete',
    name: 'Intermediate Complete',
    description: 'Complete Phase 2 Capstone Project',
    category: 'special' as const,
    xpBonus: 150,
    iconUrl: '/badges/intermediate-complete.svg',
    requirement: 'Complete Recipe App Capstone'
  },

  // Phase 3 - Expert Badges
  {
    id: 'badge-state-architect',
    name: 'State Architect',
    description: 'Master enterprise state management',
    category: 'mastery' as const,
    xpBonus: 100,
    iconUrl: '/badges/state-architect.svg',
    requirement: 'Complete Module 3.1'
  },
  {
    id: 'badge-type-safe-master',
    name: 'Type-Safe Master',
    description: 'Master TypeScript with React',
    category: 'mastery' as const,
    xpBonus: 100,
    iconUrl: '/badges/type-safe-master.svg',
    requirement: 'Complete Module 3.2'
  },
  {
    id: 'badge-quality-guardian',
    name: 'Quality Guardian',
    description: 'Master React testing',
    category: 'mastery' as const,
    xpBonus: 100,
    iconUrl: '/badges/quality-guardian.svg',
    requirement: 'Complete Module 3.3'
  },
  {
    id: 'badge-production-hero',
    name: 'Production Hero',
    description: 'Build production-ready applications',
    category: 'mastery' as const,
    xpBonus: 100,
    iconUrl: '/badges/production-hero.svg',
    requirement: 'Complete Module 3.4'
  },

  // Ultimate Achievement
  {
    id: 'badge-react-master',
    name: 'React Master',
    description: 'Complete all React modules and reach level 20',
    category: 'special' as const,
    xpBonus: 500,
    iconUrl: '/badges/react-master.svg',
    requirement: 'Complete all modules + reach level 20'
  },

  // Special Achievement Badges
  {
    id: 'badge-speed-runner',
    name: 'Speed Runner',
    description: 'Complete a module in under 2 hours',
    category: 'special' as const,
    xpBonus: 100,
    iconUrl: '/badges/speed-runner.svg',
    requirement: 'Complete any module quickly'
  },
  {
    id: 'badge-perfectionist',
    name: 'Perfectionist',
    description: 'Get perfect scores on 10 lessons in a row',
    category: 'special' as const,
    xpBonus: 150,
    iconUrl: '/badges/perfectionist.svg',
    requirement: 'Perfect streak of 10'
  },
  {
    id: 'badge-project-master',
    name: 'Project Master',
    description: 'Complete all capstone projects',
    category: 'special' as const,
    xpBonus: 200,
    iconUrl: '/badges/project-master.svg',
    requirement: 'Complete all 2 capstones'
  }
];

/**
 * Calculate user level from XP
 */
export function calculateLevel(xp: number): { level: number; title: string; nextLevelXP: number; progress: number } {
  let currentLevel = levelThresholds[0];
  let nextLevel = levelThresholds[1];

  for (let i = 0; i < levelThresholds.length; i++) {
    if (xp >= levelThresholds[i].minXP) {
      currentLevel = levelThresholds[i];
      nextLevel = levelThresholds[i + 1] || {
        level: currentLevel.level + 1,
        minXP: currentLevel.minXP + 2000,
        title: 'React Master'
      };
    } else {
      break;
    }
  }

  const xpIntoLevel = xp - currentLevel.minXP;
  const xpForNextLevel = nextLevel.minXP - currentLevel.minXP;
  const progress = Math.min(100, (xpIntoLevel / xpForNextLevel) * 100);

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelXP: nextLevel.minXP,
    progress: Math.round(progress)
  };
}

/**
 * Calculate XP for a lesson based on difficulty
 */
export function calculateLessonXP(difficulty: 'beginner' | 'intermediate' | 'advanced'): number {
  const xpMap = {
    beginner: 50,
    intermediate: 75,
    advanced: 100
  };
  return xpMap[difficulty];
}

/**
 * Calculate total XP available in the course
 */
export function calculateTotalXP(): number {
  // Approximate based on:
  // - 155 lessons × average 70 XP = 10,850 XP
  // - 13 module projects × average 200 XP = 2,600 XP
  // - 2 capstone projects × 550 XP = 1,100 XP
  // - 11 module challenges × average 125 XP = 1,375 XP
  // - 18 badges × average 85 XP bonus = 1,530 XP
  // Total: ~17,455 XP (enough to reach level 25-26)
  return 17455;
}

/**
 * Get badge requirements for a module
 */
export function getBadgesForModule(moduleId: string) {
  const badgeMap: Record<string, string[]> = {
    'module-1-1': ['badge-component-creator'],
    'module-1-2': ['badge-state-manager'],
    'module-1-3': ['badge-event-handler'],
    'module-1-4': ['badge-logic-weaver'],
    'module-1-5': ['badge-list-master'],
    'module-1-6': ['badge-foundation-complete'],
    'module-2-1': ['badge-hook-sorcerer'],
    'module-2-2': ['badge-pattern-master'],
    'module-2-3': ['badge-speed-demon'],
    'module-2-4': ['badge-navigation-pro'],
    'module-2-5': ['badge-intermediate-complete'],
    'module-3-1': ['badge-state-architect'],
    'module-3-2': ['badge-type-safe-master'],
    'module-3-3': ['badge-quality-guardian'],
    'module-3-4': ['badge-production-hero']
  };

  const badgeIds = badgeMap[moduleId] || [];
  return badges.filter(badge => badgeIds.includes(badge.id));
}

/**
 * Check if user earned a special badge
 */
export function checkSpecialBadges(userStats: {
  completedModules: string[];
  perfectStreakCount: number;
  level: number;
  capstoneCount: number;
}): string[] {
  const earnedBadges: string[] = [];

  // React Master - complete all + level 20
  if (userStats.completedModules.length >= 13 && userStats.level >= 20) {
    earnedBadges.push('badge-react-master');
  }

  // Perfectionist - 10 perfect in a row
  if (userStats.perfectStreakCount >= 10) {
    earnedBadges.push('badge-perfectionist');
  }

  // Project Master - all capstones
  if (userStats.capstoneCount >= 2) {
    earnedBadges.push('badge-project-master');
  }

  return earnedBadges;
}

/**
 * XP Breakdown by Phase
 */
export const xpBreakdown = {
  phase1: {
    lessons: 3400, // ~68 lessons × 50 XP
    projects: 900, // 5 projects × 150 + 1 capstone × 500
    challenges: 500, // 5 challenges × 100
    total: 4800
  },
  phase2: {
    lessons: 3750, // ~50 lessons × 75 XP
    projects: 1400, // 4 projects × 200 + 1 capstone × 600
    challenges: 600, // 4 challenges × 150
    total: 5750
  },
  phase3: {
    lessons: 3700, // ~37 lessons × 100 XP
    projects: 1000, // 4 projects × 250
    challenges: 800, // 4 challenges × 200
    total: 5500
  }
};
