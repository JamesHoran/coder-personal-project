import { GamifiedCourse, Phase, Module } from "@/types";

// Phase 1: Jest Fundamentals
const phase1Modules: Module[] = [
  {
    id: "jest-1.1",
    phaseId: "jest-phase-1",
    number: "1.1",
    title: "Basic Test Structure & Assertions",
    questName: "The Testing Awakening",
    description:
      "Master the fundamentals of Jest testing including test structure, common matchers, and setup/teardown patterns.",
    learningObjectives: [
      "Understand describe and it/test blocks",
      "Master common Jest matchers (toBe, toEqual, etc.)",
      "Learn setup and teardown hooks",
      "Understand test grouping and organization",
      "Master truthiness matchers",
      "Learn to test exceptions",
      "Understand test skipping and focusing",
      "Learn best practices for test structure",
    ],
    projects: [
      {
        id: "jest-1.1-p1",
        name: "Calculator Test Suite",
        description:
          "Build a comprehensive test suite for a calculator with various operations and edge cases",
        xp: 75,
        successCriteria: [
          "Test all basic operations (add, subtract, multiply, divide)",
          "Handle edge cases (division by zero, negative numbers)",
          "Use appropriate matchers",
          "Organize tests with describe blocks",
        ],
        timeEstimate: "2-3 hours",
      },
      {
        id: "jest-1.1-p2",
        name: "String Utils Testing",
        description:
          "Create tests for string manipulation functions using various Jest matchers",
        xp: 50,
        successCriteria: [
          "Test string transformations",
          "Use string matchers (toMatch, toContain)",
          "Test array methods",
          "Implement proper test structure",
        ],
        timeEstimate: "1-2 hours",
      },
    ],
    challenges: [
      {
        id: "jest-1.1-c1",
        name: "Matcher Master",
        description: "Use 15 different Jest matchers correctly",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "jest-1.1-c2",
        name: "Setup Expert",
        description: "Implement beforeEach/afterEach in 5 test suites",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "jest-1.1-c3",
        name: "Interview Questions",
        description: "Answer 5 fundamental Jest interview questions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
    ],
  },
  {
    id: "jest-1.2",
    phaseId: "jest-phase-1",
    number: "1.2",
    title: "Testing Functions & Logic",
    questName: "The Logic Tester",
    description:
      "Master testing pure functions, parameterized tests, edge cases, and object transformations.",
    learningObjectives: [
      "Test pure functions effectively",
      "Master parameterized tests with it.each",
      "Learn to identify and test edge cases",
      "Test object transformations",
      "Understand test-driven development basics",
      "Learn to write maintainable tests",
      "Master array and object testing",
      "Understand test coverage importance",
    ],
    projects: [
      {
        id: "jest-1.2-p1",
        name: "Data Transformation Suite",
        description:
          "Build tests for a data transformation library with various input scenarios",
        xp: 100,
        successCriteria: [
          "Test object transformations",
          "Use parameterized tests",
          "Cover all edge cases",
          "Test array operations",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "jest-1.2-p2",
        name: "Validation Library Tests",
        description:
          "Create comprehensive tests for input validation functions",
        xp: 75,
        successCriteria: [
          "Test email validation",
          "Test password strength",
          "Test edge cases (null, undefined, empty)",
          "Use appropriate matchers",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "jest-1.2-c1",
        name: "Edge Case Hunter",
        description: "Identify and test 20 edge cases",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-1.2-c2",
        name: "Parameterized Pro",
        description: "Write 10 parameterized tests using it.each",
        xp: 50,
        difficulty: "beginner",
        type: "completion",
      },
      {
        id: "jest-1.2-c3",
        name: "Boss Challenge",
        description: "Build complete test suite for utility library",
        xp: 150,
        difficulty: "intermediate",
        type: "boss",
      },
    ],
  },
];

// Phase 2: React Component Testing
const phase2Modules: Module[] = [
  {
    id: "jest-2.1",
    phaseId: "jest-phase-2",
    number: "2.1",
    title: "Testing React Components",
    questName: "Component Testing Quest",
    description:
      "Master React component testing with React Testing Library, including rendering, querying, and user interactions.",
    learningObjectives: [
      "Setup React Testing Library",
      "Master render and screen utilities",
      "Learn query methods (getBy, queryBy, findBy)",
      "Test user interactions with userEvent",
      "Understand query priority (accessibility-first)",
      "Test conditional rendering",
      "Test props and state changes",
      "Master form testing",
    ],
    projects: [
      {
        id: "jest-2.1-p1",
        name: "Button Component Test Suite",
        description:
          "Create comprehensive tests for a button component with various states and interactions",
        xp: 100,
        successCriteria: [
          "Test rendering with different props",
          "Test click interactions",
          "Test disabled state",
          "Test loading state",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "jest-2.1-p2",
        name: "Form Testing Suite",
        description:
          "Build tests for a complete form with validation and submission",
        xp: 150,
        successCriteria: [
          "Test input interactions",
          "Test form validation",
          "Test form submission",
          "Test error messages",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "jest-2.1-p3",
        name: "List Component Tests",
        description:
          "Test a dynamic list component with filtering and sorting",
        xp: 125,
        successCriteria: [
          "Test list rendering",
          "Test filtering functionality",
          "Test sorting functionality",
          "Test empty state",
        ],
        timeEstimate: "3-4 hours",
      },
    ],
    challenges: [
      {
        id: "jest-2.1-c1",
        name: "Query Master",
        description: "Master all query methods (getBy, queryBy, findBy)",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-2.1-c2",
        name: "Interaction Expert",
        description: "Test 15 different user interactions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-2.1-c3",
        name: "Interview Questions",
        description: "Answer 5 React Testing Library interview questions",
        xp: 250,
        difficulty: "intermediate",
        type: "completion",
      },
    ],
  },
  {
    id: "jest-2.2",
    phaseId: "jest-phase-2",
    number: "2.2",
    title: "Testing Hooks",
    questName: "The Hook Tester",
    description:
      "Master testing custom React hooks using renderHook and understanding hook lifecycle.",
    learningObjectives: [
      "Use renderHook from React Testing Library",
      "Test hook state changes with act",
      "Test hooks with parameters",
      "Test hooks with dependencies",
      "Test useEffect behavior",
      "Test custom hooks with async operations",
      "Understand hook testing patterns",
      "Test hook rerendering",
    ],
    projects: [
      {
        id: "jest-2.2-p1",
        name: "Counter Hook Tests",
        description:
          "Build comprehensive tests for a useCounter custom hook",
        xp: 75,
        successCriteria: [
          "Test increment/decrement",
          "Test reset functionality",
          "Test initial value",
          "Use act properly",
        ],
        timeEstimate: "2-3 hours",
      },
      {
        id: "jest-2.2-p2",
        name: "Fetch Hook Testing",
        description:
          "Create tests for a useFetch hook with loading and error states",
        xp: 125,
        successCriteria: [
          "Test loading state",
          "Test success state",
          "Test error state",
          "Test refetch functionality",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "jest-2.2-p3",
        name: "Form Hook Suite",
        description:
          "Test a useForm hook with validation and submission",
        xp: 150,
        successCriteria: [
          "Test form state management",
          "Test validation logic",
          "Test submission handling",
          "Test field updates",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "jest-2.2-c1",
        name: "Hook Master",
        description: "Test 10 different custom hooks",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-2.2-c2",
        name: "Act Expert",
        description: "Properly use act in 15 test scenarios",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-2.2-c3",
        name: "Boss Challenge",
        description: "Build complete test suite for complex hook library",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 3: Mocking
const phase3Modules: Module[] = [
  {
    id: "jest-3.1",
    phaseId: "jest-phase-3",
    number: "3.1",
    title: "Mock Functions & Modules",
    questName: "The Mocking Master",
    description:
      "Master mock functions, module mocking, and testing with mocked dependencies including API calls.",
    learningObjectives: [
      "Create and use jest.fn()",
      "Mock return values and implementations",
      "Track function calls and arguments",
      "Mock entire modules with jest.mock()",
      "Create partial mocks",
      "Mock axios and fetch",
      "Mock third-party libraries",
      "Test with mocked dependencies",
    ],
    projects: [
      {
        id: "jest-3.1-p1",
        name: "API Client Tests",
        description:
          "Build tests for an API client with mocked HTTP requests",
        xp: 150,
        successCriteria: [
          "Mock axios/fetch",
          "Test successful requests",
          "Test error handling",
          "Test request parameters",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "jest-3.1-p2",
        name: "Service Layer Testing",
        description:
          "Create tests for a service layer with mocked database calls",
        xp: 175,
        successCriteria: [
          "Mock database module",
          "Test CRUD operations",
          "Test error scenarios",
          "Verify mock calls",
        ],
        timeEstimate: "5-6 hours",
      },
    ],
    challenges: [
      {
        id: "jest-3.1-c1",
        name: "Mock Function Master",
        description: "Create and test 20 mock functions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-3.1-c2",
        name: "Module Mocker",
        description: "Mock 10 different modules",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-3.1-c3",
        name: "Interview Questions",
        description: "Answer 5 mocking interview questions",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
    ],
  },
  {
    id: "jest-3.2",
    phaseId: "jest-phase-3",
    number: "3.2",
    title: "Mocking Timers",
    questName: "Time Controller",
    description:
      "Master mocking timers, testing setTimeout/setInterval, and testing time-dependent code.",
    learningObjectives: [
      "Use jest.useFakeTimers()",
      "Master jest.advanceTimersByTime()",
      "Test setTimeout and setInterval",
      "Test debounce functions",
      "Test throttle functions",
      "Use jest.runAllTimers()",
      "Test time-based animations",
      "Handle async timers",
    ],
    projects: [
      {
        id: "jest-3.2-p1",
        name: "Debounce/Throttle Tests",
        description:
          "Create comprehensive tests for debounce and throttle utilities",
        xp: 125,
        successCriteria: [
          "Test debounce timing",
          "Test throttle timing",
          "Test with multiple calls",
          "Test cancellation",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "jest-3.2-p2",
        name: "Timer-Based Component Tests",
        description:
          "Test components with auto-save, countdowns, and polling",
        xp: 150,
        successCriteria: [
          "Test auto-save functionality",
          "Test countdown timer",
          "Test polling behavior",
          "Use fake timers properly",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "jest-3.2-c1",
        name: "Timer Master",
        description: "Test 15 timer-based functions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-3.2-c2",
        name: "Timing Expert",
        description: "Master all timer manipulation methods",
        xp: 75,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-3.2-c3",
        name: "Boss Challenge",
        description: "Build test suite for complex time-based system",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 4: Async Testing
const phase4Modules: Module[] = [
  {
    id: "jest-4.1",
    phaseId: "jest-phase-4",
    number: "4.1",
    title: "Async Testing Patterns",
    questName: "Async Testing Master",
    description:
      "Master testing asynchronous code including promises, async/await, and async component behavior.",
    learningObjectives: [
      "Test async functions with async/await",
      "Use resolves and rejects matchers",
      "Test async component updates",
      "Use waitFor and findBy queries",
      "Test loading states",
      "Test error states",
      "Handle async timing in tests",
      "Test race conditions",
    ],
    projects: [
      {
        id: "jest-4.1-p1",
        name: "Async API Component Tests",
        description:
          "Test a component that fetches data with loading and error states",
        xp: 150,
        successCriteria: [
          "Test loading state",
          "Test successful data display",
          "Test error handling",
          "Use findBy queries",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "jest-4.1-p2",
        name: "Promise-Based Tests",
        description:
          "Create tests for promise-based utilities and functions",
        xp: 100,
        successCriteria: [
          "Test promise resolution",
          "Test promise rejection",
          "Use resolves/rejects",
          "Test promise chaining",
        ],
        timeEstimate: "3-4 hours",
      },
    ],
    challenges: [
      {
        id: "jest-4.1-c1",
        name: "Async Master",
        description: "Test 20 async functions",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-4.1-c2",
        name: "State Tester",
        description: "Test loading/success/error states in 10 components",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-4.1-c3",
        name: "Boss Challenge",
        description: "Build complete async test suite",
        xp: 250,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 5: Advanced Topics
const phase5Modules: Module[] = [
  {
    id: "jest-5.1",
    phaseId: "jest-phase-5",
    number: "5.1",
    title: "Snapshot Testing & Coverage",
    questName: "Quality Guardian",
    description:
      "Master snapshot testing, understand code coverage metrics, and learn to achieve comprehensive test coverage.",
    learningObjectives: [
      "Understand snapshot testing",
      "Create and update snapshots",
      "Use inline snapshots",
      "Handle dynamic values in snapshots",
      "Understand coverage metrics",
      "Configure coverage thresholds",
      "Identify untested code",
      "Balance coverage with quality",
    ],
    projects: [
      {
        id: "jest-5.1-p1",
        name: "Component Snapshot Suite",
        description:
          "Create snapshot tests for a component library",
        xp: 100,
        successCriteria: [
          "Create snapshots for 10+ components",
          "Handle dynamic data",
          "Use inline snapshots appropriately",
          "Keep snapshots maintainable",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "jest-5.1-p2",
        name: "Coverage Achievement Project",
        description:
          "Achieve 80%+ coverage on an existing codebase",
        xp: 200,
        successCriteria: [
          "Reach 80% statement coverage",
          "Reach 80% branch coverage",
          "Reach 80% function coverage",
          "Document uncovered code",
        ],
        timeEstimate: "6-8 hours",
      },
    ],
    challenges: [
      {
        id: "jest-5.1-c1",
        name: "Snapshot Master",
        description: "Create and maintain 50 snapshots",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-5.1-c2",
        name: "Coverage Champion",
        description: "Achieve 90%+ coverage on a project",
        xp: 150,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "jest-5.1-c3",
        name: "Boss Challenge",
        description: "Complete coverage report analysis",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "jest-5.2",
    phaseId: "jest-phase-5",
    number: "5.2",
    title: "Testing Best Practices",
    questName: "Testing Craftsman",
    description:
      "Master testing best practices, writing maintainable tests, and understanding testing anti-patterns.",
    learningObjectives: [
      "Test behavior, not implementation",
      "Write descriptive test names",
      "Use Arrange-Act-Assert pattern",
      "Keep tests isolated and independent",
      "Test edge cases thoroughly",
      "Avoid common anti-patterns",
      "Write maintainable tests",
      "Understand when to use different test types",
    ],
    projects: [
      {
        id: "jest-5.2-p1",
        name: "Test Refactoring Project",
        description:
          "Refactor a poorly written test suite following best practices",
        xp: 175,
        successCriteria: [
          "Improve test readability",
          "Remove implementation details",
          "Add missing edge cases",
          "Make tests independent",
        ],
        timeEstimate: "5-6 hours",
      },
    ],
    challenges: [
      {
        id: "jest-5.2-c1",
        name: "Best Practice Master",
        description: "Apply 20 best practices in tests",
        xp: 150,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "jest-5.2-c2",
        name: "Anti-Pattern Hunter",
        description: "Identify and fix 15 anti-patterns",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "jest-5.2-c3",
        name: "Boss Challenge",
        description: "Complete best practices final exam",
        xp: 300,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Define phases
const phases: Phase[] = [
  {
    id: "jest-phase-1",
    courseId: "jest-course",
    number: 1,
    title: "Jest Fundamentals",
    level: "Testing Novice",
    duration: "3-4 hours",
    modules: phase1Modules,
  },
  {
    id: "jest-phase-2",
    courseId: "jest-course",
    number: 2,
    title: "React Component Testing",
    level: "Component Tester",
    duration: "4-5 hours",
    modules: phase2Modules,
  },
  {
    id: "jest-phase-3",
    courseId: "jest-course",
    number: 3,
    title: "Mocking",
    level: "Mocking Master",
    duration: "3-4 hours",
    modules: phase3Modules,
  },
  {
    id: "jest-phase-4",
    courseId: "jest-course",
    number: 4,
    title: "Async Testing",
    level: "Async Expert",
    duration: "2-3 hours",
    modules: phase4Modules,
  },
  {
    id: "jest-phase-5",
    courseId: "jest-course",
    number: 5,
    title: "Advanced Topics",
    level: "Testing Pro",
    duration: "2-3 hours",
    modules: phase5Modules,
  },
];

// Level thresholds
const levelThresholds = [
  { level: 1, minXP: 0, title: "Testing Novice" },
  { level: 2, minXP: 150, title: "Testing Novice" },
  { level: 3, minXP: 350, title: "Testing Novice" },
  { level: 4, minXP: 600, title: "Test Writer" },
  { level: 5, minXP: 900, title: "Test Writer" },
  { level: 6, minXP: 1300, title: "Component Tester" },
  { level: 7, minXP: 1800, title: "Component Tester" },
  { level: 8, minXP: 2400, title: "Component Tester" },
  { level: 9, minXP: 3000, title: "Mocking Master" },
  { level: 10, minXP: 3600, title: "Mocking Master" },
  { level: 11, minXP: 4200, title: "Async Expert" },
  { level: 12, minXP: 4800, title: "Async Expert" },
  { level: 13, minXP: 5400, title: "Testing Pro" },
  { level: 14, minXP: 6000, title: "Testing Pro" },
  { level: 15, minXP: 6700, title: "Testing Pro" },
  { level: 16, minXP: 7500, title: "Test Architect" },
  { level: 17, minXP: 8400, title: "Test Architect" },
  { level: 18, minXP: 9400, title: "Testing Master" },
  { level: 19, minXP: 10500, title: "Testing Master" },
  { level: 20, minXP: 11700, title: "Testing Guru" },
];

// Calculate total XP
const totalXP = phases.reduce((phaseSum, phase) => {
  return (
    phaseSum +
    phase.modules.reduce((moduleSum, module) => {
      const projectXP = module.projects.reduce((sum, p) => sum + p.xp, 0);
      const challengeXP = module.challenges.reduce((sum, c) => sum + c.xp, 0);
      return moduleSum + projectXP + challengeXP;
    }, 0)
  );
}, 0);

// Jest Testing Essentials course definition
export const jestCourse: GamifiedCourse = {
  id: "jest-course",
  title: "Jest Testing Essentials for Interviews & Work",
  description:
    "Master Testing for React & JavaScript Development. Learn to write comprehensive tests, achieve high coverage, and pass technical interviews.",
  instructor: {
    id: "instructor-3",
    userId: "user-3",
    name: "Testing Expert Team",
    bio: "Professional developers specializing in testing, TDD, and React development",
    expertise: [
      "Jest",
      "React Testing Library",
      "Test-Driven Development",
      "Quality Assurance",
    ],
    coursesCount: 3,
    studentsCount: 12000,
    rating: 4.9,
  },
  thumbnail: "/images/courses/jest-course.jpg",
  price: 0,
  enrollmentCount: 0,
  rating: 4.9,
  duration: 900, // 15 hours in minutes
  level: "beginner",
  category: "Testing",
  lessons: [],
  type: "gamified",
  phases,
  totalXP,
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default jestCourse;
