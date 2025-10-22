import { GamifiedCourse, Phase, Module } from "@/types";

// Phase 1: Foundations
const phase1Modules: Module[] = [
  {
    id: "typescript-1.1",
    phaseId: "typescript-phase-1",
    number: "1.1",
    title: "TypeScript Fundamentals",
    questName: "The Type Journey Begins",
    description:
      "Master the fundamentals of TypeScript, understand why it exists, and learn basic type annotations and primitive types.",
    learningObjectives: [
      "Understand what TypeScript is and why it exists",
      "Set up TypeScript development environment",
      "Learn basic type annotations",
      "Understand type inference",
      "Master primitive types (string, number, boolean, null, undefined, symbol, bigint)",
    ],
    projects: [
      {
        id: "typescript-1.1-p1",
        name: "Personal Profile Builder",
        description:
          "Create a typed personal profile system with input validation using types",
        xp: 100,
        successCriteria: [
          "Zero compilation errors",
          "All types explicitly defined",
          "Input validation using types",
          "Practice with primitive types",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-1.1-c1",
        name: "Type Conversion Speed Challenge",
        description: "Convert 10 JavaScript functions to TypeScript in under 15 minutes",
        xp: 50,
        difficulty: "beginner",
        type: "speed",
      },
      {
        id: "typescript-1.1-c2",
        name: "No Any Allowed",
        description: "Write type-safe code without using `any`",
        xp: 75,
        difficulty: "beginner",
        type: "accuracy",
      },
      {
        id: "typescript-1.1-c3",
        name: "Boss Challenge: Debug Type Errors",
        description: "Debug 20 type errors in provided code",
        xp: 150,
        difficulty: "intermediate",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-1.2",
    phaseId: "typescript-phase-1",
    number: "1.2",
    title: "Complex Types & Interfaces",
    questName: "Mastering Object Shapes",
    description:
      "Learn to define and use interfaces, create type aliases, and master object type annotations.",
    learningObjectives: [
      "Define and use interfaces",
      "Create and work with type aliases",
      "Understand when to use interface vs type",
      "Master object type annotations",
      "Learn optional and readonly properties",
      "Understand index signatures",
    ],
    projects: [
      {
        id: "typescript-1.2-p1",
        name: "E-Commerce Product Catalog",
        description:
          "Design type-safe product interfaces, implement shopping cart with proper typing, and create inventory management system",
        xp: 200,
        successCriteria: [
          "Fully typed system with zero `any`",
          "Compile-time error prevention",
          "Product interfaces designed",
          "Shopping cart implemented",
        ],
        timeEstimate: "4-5 hours",
      },
      {
        id: "typescript-1.2-p2",
        name: "API Response Mapper",
        description:
          "Define interfaces for real API responses and handle optional/required fields",
        xp: 150,
        successCriteria: [
          "API response interfaces defined",
          "Optional and required fields handled",
          "Type-safe data transformations",
        ],
        timeEstimate: "2-3 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-1.2-c1",
        name: "Design Pattern Challenge",
        description: "Create 5 reusable interface patterns",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-1.2-c2",
        name: "Refactoring Challenge",
        description: "Convert poorly typed code to well-structured types",
        xp: 125,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-1.2-c3",
        name: "Boss Challenge: Form Validation",
        description: "Build a type-safe form validation system",
        xp: 200,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-1.3",
    phaseId: "typescript-phase-1",
    number: "1.3",
    title: "Functions & Methods",
    questName: "The Function Master",
    description:
      "Master function typing including parameters, return types, function overloading, and callbacks.",
    learningObjectives: [
      "Type function parameters and return values",
      "Understand void and never return types",
      "Master optional and default parameters",
      "Learn rest parameters with types",
      "Understand function overloading",
      "Work with arrow functions and callbacks",
    ],
    projects: [
      {
        id: "typescript-1.3-p1",
        name: "Calculator Library",
        description:
          "Build type-safe mathematical operations with function overloading and typed errors",
        xp: 175,
        successCriteria: [
          "Type-safe operations",
          "Function overloading implemented",
          "Utility functions with proper typing",
          "Error handling with typed errors",
        ],
        timeEstimate: "3-4 hours",
      },
      {
        id: "typescript-1.3-p2",
        name: "Event Handler System",
        description:
          "Design callback system with proper types and handle asynchronous callbacks",
        xp: 200,
        successCriteria: [
          "Callback system with proper types",
          "Event emitter pattern implemented",
          "Asynchronous callbacks handled",
        ],
        timeEstimate: "4-5 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-1.3-c1",
        name: "Precision Challenge",
        description: "Write 10 perfectly typed functions",
        xp: 75,
        difficulty: "beginner",
        type: "accuracy",
      },
      {
        id: "typescript-1.3-c2",
        name: "Overload Challenge",
        description: "Create complex function overloads",
        xp: 100,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-1.3-c3",
        name: "Boss Challenge: Middleware System",
        description: "Build a type-safe middleware system",
        xp: 250,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 2: Intermediate Mastery
const phase2Modules: Module[] = [
  {
    id: "typescript-2.1",
    phaseId: "typescript-phase-2",
    number: "2.1",
    title: "Generics - The Power Tool",
    questName: "Unlock Reusability",
    description:
      "Master generic programming to create reusable, type-safe components and functions.",
    learningObjectives: [
      "Understand generic concepts and motivation",
      "Create generic functions and classes",
      "Use generic constraints",
      "Master multiple type parameters",
      "Understand generic default types",
      "Work with generic utility types",
    ],
    projects: [
      {
        id: "typescript-2.1-p1",
        name: "Generic Data Structure Library",
        description:
          "Build Stack, Queue, and LinkedList with generics including type-safe collection methods",
        xp: 300,
        successCriteria: [
          "Generic data structures implemented",
          "Type-safe collection methods",
          "Custom iterators with proper typing",
          "Advanced operations (map, filter, reduce)",
        ],
        timeEstimate: "6-8 hours",
      },
      {
        id: "typescript-2.1-p2",
        name: "API Client Builder",
        description:
          "Create reusable HTTP client with generics for type-safe request/response handling",
        xp: 350,
        successCriteria: [
          "Reusable HTTP client with generics",
          "Type-safe request/response handling",
          "Middleware support with generic types",
          "Query builder with type inference",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-2.1-c1",
        name: "Generic Challenge",
        description: "Solve 15 generic puzzles",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.1-c2",
        name: "Constraint Challenge",
        description: "Implement 10 constrained generics",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.1-c3",
        name: "Boss Challenge: ORM Query Builder",
        description: "Build a type-safe ORM query builder",
        xp: 400,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-2.2",
    phaseId: "typescript-phase-2",
    number: "2.2",
    title: "Advanced Types & Type Manipulation",
    questName: "Type System Mastery",
    description:
      "Master advanced type features including unions, intersections, type guards, discriminated unions, and mapped types.",
    learningObjectives: [
      "Master union and intersection types",
      "Understand literal types",
      "Learn type guards and narrowing",
      "Master discriminated unions",
      "Use type predicates effectively",
      "Understand mapped types",
      "Work with conditional types",
      "Master template literal types",
    ],
    projects: [
      {
        id: "typescript-2.2-p1",
        name: "State Machine Implementation",
        description:
          "Build type-safe FSM using discriminated unions with state transitions and validators",
        xp: 400,
        successCriteria: [
          "Type-safe FSM using discriminated unions",
          "State transitions with type checking",
          "Action creators with proper typing",
          "State validators added",
        ],
        timeEstimate: "8-10 hours",
      },
      {
        id: "typescript-2.2-p2",
        name: "Advanced Form Builder",
        description:
          "Create dynamic form types based on schema with conditional fields and validation",
        xp: 350,
        successCriteria: [
          "Dynamic form types based on schema",
          "Conditional field types",
          "Type-safe validation rules",
          "Computed field support",
        ],
        timeEstimate: "6-8 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-2.2-c1",
        name: "Union Challenge",
        description: "Master 20 union type scenarios",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.2-c2",
        name: "Guard Challenge",
        description: "Write 15 type guard functions",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.2-c3",
        name: "Mapped Type Challenge",
        description: "Create custom mapped utilities",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-2.2-c4",
        name: "Boss Challenge: GraphQL Query Builder",
        description: "Build a type-safe GraphQL query builder",
        xp: 500,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-2.3",
    phaseId: "typescript-phase-2",
    number: "2.3",
    title: "Classes & OOP in TypeScript",
    questName: "Object-Oriented Excellence",
    description:
      "Master class-based programming with proper typing, access modifiers, abstract classes, and inheritance.",
    learningObjectives: [
      "Create and type classes properly",
      "Understand access modifiers (public, private, protected)",
      "Master abstract classes and methods",
      "Implement interfaces with classes",
      "Use getters and setters effectively",
      "Understand static members",
      "Learn about parameter properties",
      "Work with inheritance and polymorphism",
    ],
    projects: [
      {
        id: "typescript-2.3-p1",
        name: "Game Entity System",
        description:
          "Design character class hierarchy with inventory management and combat system",
        xp: 300,
        successCriteria: [
          "Character class hierarchy designed",
          "Inventory management implemented",
          "Combat system with proper typing",
          "Status effects and modifiers",
        ],
        timeEstimate: "6-8 hours",
      },
      {
        id: "typescript-2.3-p2",
        name: "Plugin Architecture System",
        description:
          "Build extensible plugin framework with lifecycle hooks and dependency injection",
        xp: 350,
        successCriteria: [
          "Extensible plugin framework",
          "Lifecycle hooks implemented",
          "Type-safe event system",
          "Dependency injection added",
        ],
        timeEstimate: "8-10 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-2.3-c1",
        name: "Inheritance Challenge",
        description: "Design complex class hierarchies",
        xp: 150,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.3-c2",
        name: "Abstraction Challenge",
        description: "Create reusable abstract patterns",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.3-c3",
        name: "Boss Challenge: Game Engine",
        description: "Build a complete game engine framework",
        xp: 450,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-2.4",
    phaseId: "typescript-phase-2",
    number: "2.4",
    title: "Enums, Modules & Namespaces",
    questName: "Organization Master",
    description:
      "Learn to organize code effectively using enums, ES6 modules, namespaces, and declaration files.",
    learningObjectives: [
      "Understand and use enums effectively",
      "Learn const enums for optimization",
      "Master ES6 modules in TypeScript",
      "Organize code with namespaces",
      "Understand module resolution",
      "Work with ambient modules",
      "Handle declaration files",
    ],
    projects: [
      {
        id: "typescript-2.4-p1",
        name: "Configuration Management System",
        description:
          "Use enums for configuration options with module-based architecture and type-safe config loader",
        xp: 250,
        successCriteria: [
          "Enums for configuration options",
          "Module-based architecture",
          "Type-safe config loader",
          "Environment-specific settings",
        ],
        timeEstimate: "4-6 hours",
      },
      {
        id: "typescript-2.4-p2",
        name: "Multi-Package Library",
        description:
          "Structure monorepo with proper modules and create declaration files",
        xp: 300,
        successCriteria: [
          "Monorepo structured with proper modules",
          "Internal and external APIs",
          "Declaration files written",
          "Proper exports implemented",
        ],
        timeEstimate: "6-8 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-2.4-c1",
        name: "Organization Challenge",
        description: "Refactor messy codebase",
        xp: 175,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.4-c2",
        name: "Module Challenge",
        description: "Design scalable module structure",
        xp: 200,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-2.4-c3",
        name: "Boss Challenge: NPM Package",
        description: "Create publishable npm package with perfect types",
        xp: 350,
        difficulty: "advanced",
        type: "boss",
      },
    ],
  },
];

// Phase 3: Advanced & Production-Ready
const phase3Modules: Module[] = [
  {
    id: "typescript-3.1",
    phaseId: "typescript-phase-3",
    number: "3.1",
    title: "Utility Types & Type Magic",
    questName: "The Type Wizard's Arsenal",
    description:
      "Master built-in utility types and create custom utility types using advanced TypeScript features.",
    learningObjectives: [
      "Master built-in utility types (Partial, Required, Readonly, Record, Pick, Omit, Exclude, Extract, NonNullable, ReturnType, Parameters, InstanceType, ThisType)",
      "Create custom utility types",
      "Understand infer keyword",
      "Master recursive types",
      "Learn variadic tuple types",
      "Work with template literal types at advanced level",
    ],
    projects: [
      {
        id: "typescript-3.1-p1",
        name: "Type-Safe Form Library",
        description:
          "Build form system using advanced utilities with nested form typing and validation",
        xp: 450,
        successCriteria: [
          "Form system using advanced utilities",
          "Nested form typing",
          "Validation with type inference",
          "Dynamic field generation",
        ],
        timeEstimate: "10-12 hours",
      },
      {
        id: "typescript-3.1-p2",
        name: "Database Query Builder (Advanced)",
        description:
          "Create SQL-like queries with type safety including joins, aggregations, and subqueries",
        xp: 500,
        successCriteria: [
          "SQL-like queries with type safety",
          "Join operations with proper typing",
          "Aggregation functions",
          "Subquery support",
        ],
        timeEstimate: "12-15 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-3.1-c1",
        name: "Utility Challenge",
        description: "Solve 25 utility type puzzles",
        xp: 250,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.1-c2",
        name: "Infer Challenge",
        description: "Master 15 infer keyword scenarios",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.1-c3",
        name: "Recursive Challenge",
        description: "Build recursive type structures",
        xp: 350,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.1-c4",
        name: "Boss Challenge: Routing System",
        description: "Create a complete type-safe routing system",
        xp: 600,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-3.2",
    phaseId: "typescript-phase-3",
    number: "3.2",
    title: "TypeScript in React",
    questName: "Modern Frontend Excellence",
    description:
      "Master TypeScript in React applications including components, hooks, context, and advanced patterns.",
    learningObjectives: [
      "Type React components (FC, props, state)",
      "Master hooks with TypeScript",
      "Type context API properly",
      "Handle events with proper typing",
      "Work with refs and TypeScript",
      "Type HOCs and render props",
      "Master generic components",
      "Use forwardRef with types",
    ],
    projects: [
      {
        id: "typescript-3.2-p1",
        name: "Component Library",
        description:
          "Build reusable typed components with compound components and polymorphic patterns",
        xp: 500,
        successCriteria: [
          "Reusable typed components",
          "Compound components implemented",
          "Polymorphic components",
          "Comprehensive prop types",
        ],
        timeEstimate: "12-15 hours",
      },
      {
        id: "typescript-3.2-p2",
        name: "State Management Solution",
        description:
          "Build Redux-like library with type-safe actions, reducers, selectors, and middleware",
        xp: 450,
        successCriteria: [
          "Redux-like library with types",
          "Type-safe actions and reducers",
          "Selector system",
          "Middleware support",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-3.2-c1",
        name: "Component Challenge",
        description: "Type 20 complex React patterns",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.2-c2",
        name: "Hook Challenge",
        description: "Create 10 custom typed hooks",
        xp: 250,
        difficulty: "intermediate",
        type: "completion",
      },
      {
        id: "typescript-3.2-c3",
        name: "Boss Challenge: Dashboard",
        description: "Build complete dashboard with perfect types",
        xp: 700,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-3.3",
    phaseId: "typescript-phase-3",
    number: "3.3",
    title: "Advanced Patterns & Best Practices",
    questName: "Production Excellence",
    description:
      "Learn production-ready patterns, error handling, performance optimization, and enterprise coding standards.",
    learningObjectives: [
      "Master error handling patterns",
      "Implement design patterns with types",
      "Understand performance implications",
      "Learn build optimization techniques",
      "Master strict mode configurations",
      "Handle third-party type issues",
      "Write maintainable type definitions",
      "Follow enterprise coding standards",
    ],
    projects: [
      {
        id: "typescript-3.3-p1",
        name: "Enterprise Application Template",
        description:
          "Create production-ready boilerplate with authentication, error boundaries, and monitoring",
        xp: 600,
        successCriteria: [
          "Production-ready boilerplate",
          "Authentication system",
          "Error boundary patterns",
          "Logging and monitoring",
        ],
        timeEstimate: "15-20 hours",
      },
      {
        id: "typescript-3.3-p2",
        name: "TypeScript Migration Tool",
        description:
          "Build tool to assist JS to TS migration with automatic type inference and reports",
        xp: 500,
        successCriteria: [
          "Migration assistance tool",
          "Automatic type inference",
          "Migration reports",
          "Safe migration strategies",
        ],
        timeEstimate: "12-15 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-3.3-c1",
        name: "Refactoring Challenge",
        description: "Modernize legacy codebase",
        xp: 400,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.3-c2",
        name: "Performance Challenge",
        description: "Optimize compile times",
        xp: 350,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.3-c3",
        name: "Boss Challenge: Enterprise Audit",
        description: "Conduct full enterprise app audit",
        xp: 800,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-3.4",
    phaseId: "typescript-phase-3",
    number: "3.4",
    title: "Testing & Type Safety",
    questName: "Quality Assurance Master",
    description:
      "Master testing with types including unit tests, integration tests, and type-only tests.",
    learningObjectives: [
      "Type tests with Jest/Vitest",
      "Master type-only tests",
      "Use testing library with types",
      "Implement test utilities",
      "Create mock types",
      "Handle async testing",
      "Write integration tests with types",
    ],
    projects: [
      {
        id: "typescript-3.4-p1",
        name: "Comprehensive Test Suite",
        description:
          "Write unit tests with perfect types, integration tests, and test utilities library",
        xp: 400,
        successCriteria: [
          "Unit tests with perfect types",
          "Integration tests",
          "Test utilities library",
          "Snapshot testing",
        ],
        timeEstimate: "8-10 hours",
      },
      {
        id: "typescript-3.4-p2",
        name: "Type Testing Framework",
        description:
          "Build compile-time test assertions and type compatibility tests",
        xp: 450,
        successCriteria: [
          "Compile-time test assertions",
          "Type compatibility tests",
          "Regression testing for types",
        ],
        timeEstimate: "10-12 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-3.4-c1",
        name: "Coverage Challenge",
        description: "Achieve 100% type coverage",
        xp: 300,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.4-c2",
        name: "Quality Challenge",
        description: "Write bulletproof test types",
        xp: 350,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.4-c3",
        name: "Boss Challenge: CI/CD Pipeline",
        description: "Build CI/CD type checking pipeline",
        xp: 600,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
  {
    id: "typescript-3.5",
    phaseId: "typescript-phase-3",
    number: "3.5",
    title: "Real-World Integration",
    questName: "Industry Professional",
    description:
      "Integrate TypeScript with Node.js, Express, databases, GraphQL, and microservices for production applications.",
    learningObjectives: [
      "Integrate TypeScript with Node.js",
      "Work with Express/Fastify types",
      "Type database queries (Prisma, TypeORM)",
      "Handle GraphQL with types",
      "Master API development with TypeScript",
      "Work with WebSockets and types",
      "Implement microservices patterns",
      "Handle deployment and build processes",
    ],
    projects: [
      {
        id: "typescript-3.5-p1",
        name: "Full-Stack E-Commerce Platform",
        description:
          "Build complete REST API with authentication, database, payments, admin dashboard, and real-time features",
        xp: 1000,
        successCriteria: [
          "Complete REST API with types",
          "Authentication & authorization",
          "Database layer with full typing",
          "Payment processing",
          "Admin dashboard",
          "Real-time features",
        ],
        timeEstimate: "25-30 hours",
      },
      {
        id: "typescript-3.5-p2",
        name: "Microservices Architecture",
        description:
          "Design service communication with types, implement event-driven architecture, and add service discovery",
        xp: 800,
        successCriteria: [
          "Service communication with types",
          "Event-driven architecture",
          "Shared type packages",
          "Service discovery",
        ],
        timeEstimate: "20-25 hours",
      },
    ],
    challenges: [
      {
        id: "typescript-3.5-c1",
        name: "Integration Challenge",
        description: "Connect 5 different services",
        xp: 400,
        difficulty: "advanced",
        type: "completion",
      },
      {
        id: "typescript-3.5-c2",
        name: "Architecture Challenge",
        description: "Design scalable system",
        xp: 500,
        difficulty: "expert",
        type: "completion",
      },
      {
        id: "typescript-3.5-c3",
        name: "Final Boss Challenge",
        description: "Deploy production application",
        xp: 1000,
        difficulty: "expert",
        type: "boss",
      },
    ],
  },
];

// Phase definitions
const phases: Phase[] = [
  {
    id: "typescript-phase-1",
    courseId: "typescript-complete",
    number: 1,
    title: "Foundations",
    description:
      "Master TypeScript fundamentals, complex types, interfaces, and functions.",
    level: "TypeScript Explorer",
    duration: "15-20 hours",
    modules: phase1Modules,
  },
  {
    id: "typescript-phase-2",
    courseId: "typescript-complete",
    number: 2,
    title: "Intermediate Mastery",
    description:
      "Learn generics, advanced types, classes, and code organization with TypeScript.",
    level: "Type Craftsman",
    duration: "20-25 hours",
    modules: phase2Modules,
  },
  {
    id: "typescript-phase-3",
    courseId: "typescript-complete",
    number: 3,
    title: "Advanced & Production-Ready",
    description:
      "Master advanced patterns, React integration, testing, and real-world production applications.",
    level: "TypeScript Architect",
    duration: "25-30 hours",
    modules: phase3Modules,
  },
];

// Level thresholds for TypeScript mastery
const levelThresholds = [
  { level: 1, minXP: 0, title: "TypeScript Explorer" },
  { level: 2, minXP: 200, title: "TypeScript Explorer" },
  { level: 3, minXP: 500, title: "TypeScript Explorer" },
  { level: 4, minXP: 800, title: "TypeScript Explorer" },
  { level: 5, minXP: 1000, title: "TypeScript Explorer" },
  { level: 6, minXP: 1001, title: "Type Apprentice" },
  { level: 7, minXP: 1500, title: "Type Apprentice" },
  { level: 8, minXP: 2000, title: "Type Apprentice" },
  { level: 9, minXP: 2500, title: "Type Apprentice" },
  { level: 10, minXP: 3000, title: "Type Apprentice" },
  { level: 11, minXP: 3001, title: "Type Craftsman" },
  { level: 12, minXP: 3800, title: "Type Craftsman" },
  { level: 13, minXP: 4500, title: "Type Craftsman" },
  { level: 14, minXP: 5200, title: "Type Craftsman" },
  { level: 15, minXP: 6000, title: "Type Craftsman" },
  { level: 16, minXP: 6001, title: "Type Expert" },
  { level: 17, minXP: 7000, title: "Type Expert" },
  { level: 18, minXP: 8000, title: "Type Expert" },
  { level: 19, minXP: 9000, title: "Type Expert" },
  { level: 20, minXP: 10000, title: "Type Expert" },
  { level: 21, minXP: 10001, title: "TypeScript Architect" },
  { level: 22, minXP: 11500, title: "TypeScript Architect" },
  { level: 23, minXP: 13000, title: "TypeScript Architect" },
  { level: 24, minXP: 14500, title: "TypeScript Architect" },
  { level: 25, minXP: 15000, title: "TypeScript Architect" },
  { level: 26, minXP: 15001, title: "TypeScript Master" },
];

// Calculate total XP
const calculateTotalXP = (phases: Phase[]): number => {
  let total = 0;
  phases.forEach((phase) => {
    phase.modules.forEach((module) => {
      module.projects.forEach((project) => {
        total += project.xp;
      });
      module.challenges.forEach((challenge) => {
        total += challenge.xp;
      });
    });
  });
  return total;
};

// Main course definition
export const typescriptCourse: GamifiedCourse = {
  id: "typescript-complete",
  type: "gamified",
  title: "TypeScript Complete Course",
  description:
    "Master TypeScript from zero to interview-ready professional. Build production-grade applications with confidence through gamified learning and real-world projects.",
  instructor: {
    id: "instructor-ts",
    userId: "user-instructor-ts",
    name: "TypeScript Pro Team",
    bio: "Expert TypeScript developers with extensive experience in enterprise application development and type system design",
    expertise: ["TypeScript", "JavaScript", "React", "Node.js", "Type Systems"],
    coursesCount: 4,
    studentsCount: 35000,
    rating: 4.9,
  },
  thumbnail: "/courses/typescript-course.jpg",
  price: 0, // Per user requirement: no pricing
  enrollmentCount: 12500,
  rating: 4.9,
  duration: 4200, // 70 hours in minutes (average of 60-80)
  level: "beginner",
  category: "Programming Languages",
  lessons: [], // Gamified courses use modules instead
  phases: phases,
  totalXP: calculateTotalXP(phases),
  levelThresholds,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
