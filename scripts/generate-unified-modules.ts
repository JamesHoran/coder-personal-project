/**
 * Script to generate unified module files
 * Combines interactive lessons with capstone projects and challenges
 */

import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

// Module definitions with capstone project info from gamified course
const moduleDefinitions = [
  // Phase 1
  {
    id: 'module-1-2',
    phase: 1,
    number: '1.2',
    title: 'State Basics',
    questName: 'Making Components Come Alive',
    description: 'Master state management with useState and understand component lifecycles.',
    lessonsImport: 'stateBasicsLessons',
    capstone: {
      name: 'Interactive Todo Application',
      description: 'Build a full-featured todo app with add, edit, delete, filter, and local storage persistence. Master useState and basic state management.',
      xp: 600,
      timeEstimate: '8-10 hours',
      difficulty: 'beginner' as const,
    },
  },
  {
    id: 'module-1-3',
    phase: 1,
    number: '1.3',
    title: 'Event Handling',
    questName: 'Master of Interactions',
    description: 'Master event handling, forms, and user input in React applications.',
    lessonsImport: 'eventHandlingLessons',
    capstone: {
      name: 'Multi-Step Registration Form',
      description: 'Create a complex registration form wizard with validation, error handling, and progress tracking.',
      xp: 700,
      timeEstimate: '10-12 hours',
      difficulty: 'intermediate' as const,
    },
  },
  {
    id: 'module-1-4',
    phase: 1,
    number: '1.4',
    title: 'Conditional Rendering',
    questName: 'The Logic Master',
    description: 'Learn to render UI conditionally based on state, props, and user actions.',
    lessonsImport: 'conditionalRenderingLessons',
    capstone: {
      name: 'Dynamic Dashboard with Widgets',
      description: 'Build a customizable dashboard where users can show/hide widgets, change themes, and personalize their view.',
      xp: 650,
      timeEstimate: '8-10 hours',
      difficulty: 'intermediate' as const,
    },
  },
  {
    id: 'module-1-5',
    phase: 1,
    number: '1.5',
    title: 'Lists and Keys',
    questName: 'The Array Architect',
    description: 'Master rendering lists, using keys correctly, and manipulating arrays in React.',
    lessonsImport: 'listsAndKeysLessons',
    capstone: {
      name: 'Filterable Product Catalog',
      description: 'Create a product catalog with search, filtering, sorting, and pagination.',
      xp: 700,
      timeEstimate: '10-12 hours',
      difficulty: 'intermediate' as const,
    },
  },

  // Phase 2
  {
    id: 'module-2-1',
    phase: 2,
    number: '2.1',
    title: 'Advanced Hooks',
    questName: 'Hook Sorcerer',
    description: 'Master useEffect, useContext, useReducer, useMemo, useCallback, and custom hooks.',
    lessonsImport: 'advancedHooksLessons',
    capstone: {
      name: 'E-Commerce Shopping Cart',
      description: 'Build a complete shopping cart with global state, optimizations, and persistent storage.',
      xp: 900,
      timeEstimate: '12-15 hours',
      difficulty: 'advanced' as const,
    },
  },
  {
    id: 'module-2-2',
    phase: 2,
    number: '2.2',
    title: 'Component Patterns',
    questName: 'Pattern Master',
    description: 'Learn advanced component patterns: HOCs, render props, compound components, and more.',
    lessonsImport: 'componentPatternsLessons',
    capstone: {
      name: 'Reusable Component Library',
      description: 'Create a published npm package with 15+ reusable components following best patterns.',
      xp: 850,
      timeEstimate: '12-14 hours',
      difficulty: 'advanced' as const,
    },
  },
  {
    id: 'module-2-3',
    phase: 2,
    number: '2.3',
    title: 'Performance Optimization',
    questName: 'Speed Demon',
    description: 'Master React.memo, useMemo, useCallback, code splitting, and lazy loading.',
    lessonsImport: 'performanceOptimizationLessons',
    capstone: {
      name: 'High-Performance Data Grid',
      description: 'Build a data grid that handles 10,000+ rows efficiently with virtualization.',
      xp: 1000,
      timeEstimate: '14-16 hours',
      difficulty: 'advanced' as const,
    },
  },
  {
    id: 'module-2-4',
    phase: 2,
    number: '2.4',
    title: 'Routing',
    questName: 'Navigation Navigator',
    description: 'Master React Router with dynamic routes, nested routing, and protected routes.',
    lessonsImport: 'routingLessons',
    capstone: {
      name: 'Multi-Page Blog Platform',
      description: 'Create a blog with routing, authentication, protected routes, and deep linking.',
      xp: 850,
      timeEstimate: '12-14 hours',
      difficulty: 'advanced' as const,
    },
  },

  // Phase 3
  {
    id: 'module-3-1',
    phase: 3,
    number: '3.1',
    title: 'State Management',
    questName: 'State Architect',
    description: 'Master Redux Toolkit, Zustand, and advanced state management patterns.',
    lessonsImport: 'stateManagementLessons',
    capstone: {
      name: 'Social Media Dashboard',
      description: 'Build a complex dashboard with global state, real-time updates, and offline support.',
      xp: 1200,
      timeEstimate: '16-20 hours',
      difficulty: 'expert' as const,
    },
  },
  {
    id: 'module-3-2',
    phase: 3,
    number: '3.2',
    title: 'TypeScript with React',
    questName: 'Type Safety Guardian',
    description: 'Master TypeScript in React: typing components, props, hooks, and context.',
    lessonsImport: 'typescriptReactLessons',
    capstone: {
      name: 'Type-Safe Component Library',
      description: 'Build a fully typed component library with generics, strict typing, and excellent DX.',
      xp: 1000,
      timeEstimate: '14-16 hours',
      difficulty: 'expert' as const,
    },
  },
  {
    id: 'module-3-3',
    phase: 3,
    number: '3.3',
    title: 'Testing',
    questName: 'Quality Assurance Master',
    description: 'Master React Testing Library, Jest, and E2E testing with Playwright.',
    lessonsImport: 'testingLessons',
    capstone: {
      name: 'Fully Tested Application',
      description: 'Take an existing app and achieve 90%+ test coverage with unit, integration, and E2E tests.',
      xp: 1100,
      timeEstimate: '15-18 hours',
      difficulty: 'expert' as const,
    },
  },
  {
    id: 'module-3-4',
    phase: 3,
    number: '3.4',
    title: 'Production Patterns',
    questName: 'Production Hero',
    description: 'Master authentication, API integration, error boundaries, accessibility, and deployment.',
    lessonsImport: 'productionPatternsLessons',
    capstone: {
      name: 'Production-Ready SaaS Application',
      description: 'Build a complete SaaS app with auth, payments, admin panel, and deployment pipeline.',
      xp: 1500,
      timeEstimate: '20-25 hours',
      difficulty: 'expert' as const,
    },
  },
];

// Generate module file content
function generateModuleFile(def: typeof moduleDefinitions[0]): string {
  const phaseNum = def.phase;
  const moduleIdDashed = def.id.replace(/\./g, '-');
  const moduleIdUnderscored = def.id.replace(/\./g, '_').replace(/-/g, '_');
  const importPath = `@/data/courses/react-course-interactive/phase-${phaseNum}/${moduleIdDashed}`;

  return `/**
 * React Course - Phase ${phaseNum}
 * Module ${def.number}: ${def.title}
 *
 * UNIFIED MODULE - Combines:
 * - Interactive lessons (from react-course-interactive)
 * - Capstone project (from gamified course)
 * - Bonus challenges
 */

import { UnifiedModule, CapstonProject, BonusChallenge } from '@/types/course';
import { ${def.lessonsImport} } from '${importPath}';

// =================================================================
// CAPSTONE PROJECT
// =================================================================

const capstoneProject: CapstonProject = {
  id: '${def.id}-capstone',
  moduleId: '${def.id}',
  name: '${def.capstone.name}',
  description: \`${def.capstone.description}\`,
  xp: ${def.capstone.xp},
  timeEstimate: '${def.capstone.timeEstimate}',
  difficulty: '${def.capstone.difficulty}',
  successCriteria: [
    'Application runs without errors',
    'All core features implemented',
    'Code follows React best practices',
    'Clean, maintainable code structure',
    'Responsive design',
    'No console errors or warnings',
  ],
};

// =================================================================
// BONUS CHALLENGES (Optional)
// =================================================================

const bonusChallenges: BonusChallenge[] = [
  {
    id: '${def.id}-bonus-1',
    moduleId: '${def.id}',
    name: 'Speed Demon',
    description: 'Complete this module in under 8 hours',
    xp: 100,
    difficulty: 'advanced',
    type: 'speed',
  },
  {
    id: '${def.id}-bonus-2',
    moduleId: '${def.id}',
    name: 'Perfectionist',
    description: 'Get 100% on all lesson tests on first try',
    xp: 150,
    difficulty: 'expert',
    type: 'perfect',
  },
];

// =================================================================
// UNIFIED MODULE
// =================================================================

export const ${moduleIdUnderscored}: UnifiedModule = {
  id: '${def.id}',
  phaseId: 'phase-${phaseNum}',
  phase: ${phaseNum},
  number: '${def.number}',
  title: '${def.title}',
  questName: '${def.questName}',
  description: '${def.description}',

  learningObjectives: [],

  lessons: ${def.lessonsImport},
  totalLessonXP: ${def.lessonsImport}.reduce((sum, lesson) => sum + lesson.xpReward, 0),

  capstoneProject,
  bonusChallenges,

  totalXP:
    ${def.lessonsImport}.reduce((sum, lesson) => sum + lesson.xpReward, 0) +
    capstoneProject.xp +
    (bonusChallenges?.reduce((sum, challenge) => sum + challenge.xp, 0) || 0),

  totalContent: ${def.lessonsImport}.length + 1 + (bonusChallenges?.length || 0),

  estimatedHours: '${def.capstone.timeEstimate}',
};
`;
}

// Generate all module files
console.log('Generating unified module files...\n');

moduleDefinitions.forEach((def) => {
  const content = generateModuleFile(def);
  const phaseNum = def.phase;
  const moduleIdDashed = def.id.replace(/\./g, '-');
  const filePath = `./src/data/courses/react/modules/phase-${phaseNum}/${moduleIdDashed}.ts`;

  try {
    // Create directory if it doesn't exist
    mkdirSync(`./src/data/courses/react/modules/phase-${phaseNum}`, { recursive: true });

    // Write file
    writeFileSync(filePath, content);
    console.log(`✅ Generated: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error generating ${filePath}:`, error);
  }
});

console.log('\n✅ All unified module files generated!');
