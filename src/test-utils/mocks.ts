import { faker } from "@faker-js/faker";

/**
 * Mock user data generator
 */
export const mockUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  level: faker.number.int({ min: 1, max: 10 }),
  totalXP: faker.number.int({ min: 0, max: 10000 }),
  currentStreak: faker.number.int({ min: 0, max: 100 }),
  longestStreak: faker.number.int({ min: 0, max: 200 }),
  createdAt: faker.date.past(),
  ...overrides,
});

/**
 * Mock course data generator
 */
export const mockCourse = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  slug: faker.lorem.slug(),
  difficulty: faker.helpers.arrayElement(["beginner", "intermediate", "advanced"]),
  totalXP: faker.number.int({ min: 1000, max: 10000 }),
  estimatedHours: faker.number.int({ min: 5, max: 50 }),
  published: true,
  createdAt: faker.date.past(),
  ...overrides,
});

/**
 * Mock module data generator
 */
export const mockModule = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(4),
  description: faker.lorem.sentence(),
  courseId: faker.string.uuid(),
  xpReward: faker.number.int({ min: 50, max: 500 }),
  order: faker.number.int({ min: 1, max: 20 }),
  ...overrides,
});

/**
 * Mock lesson data generator
 */
export const mockLesson = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  content: faker.lorem.paragraphs(3),
  moduleId: faker.string.uuid(),
  xpReward: faker.number.int({ min: 10, max: 100 }),
  order: faker.number.int({ min: 1, max: 50 }),
  ...overrides,
});

/**
 * Mock enrollment data generator
 */
export const mockEnrollment = (overrides = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  courseId: faker.string.uuid(),
  enrolledAt: faker.date.past(),
  progress: faker.number.int({ min: 0, max: 100 }),
  ...overrides,
});

/**
 * Mock progress data generator
 */
export const mockProgress = (overrides = {}) => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  lessonId: faker.string.uuid(),
  completed: faker.datatype.boolean(),
  completedAt: faker.date.recent(),
  xpEarned: faker.number.int({ min: 10, max: 100 }),
  ...overrides,
});

/**
 * Mock challenge data generator
 */
export const mockChallenge = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(4),
  description: faker.lorem.sentence(),
  difficulty: faker.helpers.arrayElement(["easy", "medium", "hard"]),
  xpReward: faker.number.int({ min: 100, max: 500 }),
  testCases: [],
  ...overrides,
});

/**
 * Mock badge data generator
 */
export const mockBadge = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  icon: faker.helpers.arrayElement(["🏆", "⭐", "🎖️", "💎"]),
  xpBonus: faker.number.int({ min: 50, max: 200 }),
  ...overrides,
});

/**
 * Mock project data generator
 */
export const mockProject = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  difficulty: faker.helpers.arrayElement(["beginner", "intermediate", "advanced"]),
  xpReward: faker.number.int({ min: 300, max: 1000 }),
  estimatedHours: faker.number.int({ min: 2, max: 20 }),
  ...overrides,
});

/**
 * Create an array of mock data
 */
export const createMockArray = <T>(
  generator: (overrides?: any) => T,
  count: number,
  overrides?: any
): T[] => {
  return Array.from({ length: count }, () => generator(overrides));
};
