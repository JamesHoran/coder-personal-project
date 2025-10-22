import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create TypeScript Course
  const tsCourse = await prisma.course.create({
    data: {
      title: 'TypeScript Complete Course',
      slug: 'typescript-complete',
      description:
        'From Zero to Interview Ready & Production Confident. Master TypeScript with hands-on projects, gamification, and real-world scenarios.',
      level: 'beginner',
      category: 'Programming',
      thumbnail: '/courses/typescript.jpg',
      duration: 70,
      totalXP: 15000,
      price: 0,
      isPublished: true,
      instructorId: 'instructor-1',
      instructorName: 'TypeScript Master',
      rating: 4.9,
      studentCount: 0,
    },
  })

  console.log('✅ Created course:', tsCourse.title)

  // Phase 1: Foundations
  const phase1 = await prisma.phase.create({
    data: {
      courseId: tsCourse.id,
      title: 'Phase 1: Foundations',
      description: 'Master the fundamentals of TypeScript',
      order: 1,
      level: 'TypeScript Explorer',
      duration: '15-20 hours',
      totalXP: 3000,
    },
  })

  // Module 1.1: TypeScript Fundamentals
  const module1_1 = await prisma.module.create({
    data: {
      phaseId: phase1.id,
      title: 'TypeScript Fundamentals',
      quest: 'The Type Journey Begins',
      description: 'Learn the basics of TypeScript and type annotations',
      order: 1,
      totalXP: 500,
    },
  })

  // Lessons for Module 1.1
  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module1_1.id,
        title: 'What is TypeScript?',
        content: `# What is TypeScript?

TypeScript is a **strongly typed programming language** that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: Amazing autocomplete and refactoring
3. **Self-Documenting**: Types serve as inline documentation
4. **Scales**: Perfect for large codebases

## TypeScript vs JavaScript

\`\`\`typescript
// JavaScript
function greet(name) {
  return "Hello, " + name;
}

greet(123); // No error! But wrong...

// TypeScript
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

greet(123); // ERROR: Argument of type 'number' is not assignable to parameter of type 'string'
\`\`\`

TypeScript is a **superset** of JavaScript, meaning all valid JavaScript is valid TypeScript.`,
        duration: 15,
        order: 1,
        xpReward: 10,
        type: 'lesson',
      },
      {
        moduleId: module1_1.id,
        title: 'Setting Up TypeScript',
        content: `# Setting Up TypeScript

Let's get your development environment ready!

## Installation

\`\`\`bash
# Install TypeScript globally
npm install -g typescript

# Check installation
tsc --version
\`\`\`

## Your First TypeScript File

Create a file called \`hello.ts\`:

\`\`\`typescript
const message: string = "Hello, TypeScript!";
console.log(message);
\`\`\`

## Compile and Run

\`\`\`bash
# Compile TypeScript to JavaScript
tsc hello.ts

# This creates hello.js
# Run it
node hello.js
\`\`\`

## tsconfig.json

For projects, create a \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
\`\`\``,
        duration: 20,
        order: 2,
        xpReward: 15,
        type: 'lesson',
      },
      {
        moduleId: module1_1.id,
        title: 'Type Annotations',
        content: `# Type Annotations

Type annotations explicitly tell TypeScript what type a variable should be.

## Basic Syntax

\`\`\`typescript
let variableName: type = value;
\`\`\`

## Primitive Types

\`\`\`typescript
// String
let name: string = "John";
let greeting: string = \`Hello, \${name}\`;

// Number
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;

// Boolean
let isActive: boolean = true;
let hasPermission: boolean = false;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;
\`\`\`

## Type Inference

TypeScript can often infer types:

\`\`\`typescript
// Type is inferred as string
let city = "New York";

// Error: Type 'number' is not assignable to type 'string'
city = 123;
\`\`\`

## Best Practice

Use type annotations when:
- The type isn't obvious
- You want to enforce a specific type
- You're declaring without initializing

\`\`\`typescript
// Good: explicit when not obvious
let userId: string;
userId = getUserId();

// Good: inference is clear
let count = 0;
let message = "Hello";
\`\`\``,
        duration: 25,
        order: 3,
        xpReward: 20,
        type: 'lesson',
      },
      {
        moduleId: module1_1.id,
        title: 'Primitive Types Deep Dive',
        content: `# Primitive Types Deep Dive

Let's explore all primitive types in TypeScript.

## String

\`\`\`typescript
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = \`\${firstName} \${lastName}\`;

// Multi-line strings
let poem: string = \`
  Roses are red,
  Violets are blue,
  TypeScript is awesome,
  And so are you!
\`;
\`\`\`

## Number

\`\`\`typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: number = 1_000_000; // Numeric separators!
\`\`\`

## Boolean

\`\`\`typescript
let isComplete: boolean = false;
let hasError: boolean = true;

// Common pattern
let isValid: boolean = age >= 18 && hasLicense;
\`\`\`

## Symbol

\`\`\`typescript
let sym1: symbol = Symbol("key");
let sym2: symbol = Symbol("key");

console.log(sym1 === sym2); // false - symbols are unique
\`\`\`

## BigInt

\`\`\`typescript
let big1: bigint = 100n;
let big2: bigint = BigInt(100);

// For very large numbers
let huge: bigint = 9007199254740991n;
\`\`\`

## Null and Undefined

\`\`\`typescript
let n: null = null;
let u: undefined = undefined;

// With strictNullChecks
let name: string = null; // Error!
let age: number = undefined; // Error!

// Allow null/undefined
let name: string | null = null; // OK
let age: number | undefined = undefined; // OK
\`\`\``,
        duration: 30,
        order: 4,
        xpReward: 25,
        type: 'lesson',
      },
    ],
  })

  // Add a project for Module 1.1
  await prisma.project.create({
    data: {
      moduleId: module1_1.id,
      title: 'Personal Profile Builder',
      description: `Create a type-safe personal profile system with proper validation.

## Requirements:
- Use primitive types for all properties
- No \`any\` types allowed
- Implement input validation
- Handle optional fields properly

## Success Criteria:
- Zero compilation errors
- All types explicitly defined
- Proper error handling`,
      xpReward: 100,
      requirements: JSON.stringify([
        'Create a Person interface with name, age, email, bio (optional)',
        'Implement validation functions for each field',
        'Create a profile display function',
        'Handle edge cases (null, undefined, invalid data)',
      ]),
      starterCode: `// TODO: Define your Person interface

// TODO: Implement validation functions

// TODO: Create profile display function

// Test your implementation
const person = {
  name: "John Doe",
  age: 25,
  email: "john@example.com"
};`,
      solution: `interface Person {
  name: string;
  age: number;
  email: string;
  bio?: string;
}

function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 50;
}

function validateAge(age: number): boolean {
  return age >= 0 && age <= 120;
}

function validateEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function displayProfile(person: Person): string {
  return \`
Name: \${person.name}
Age: \${person.age}
Email: \${person.email}
\${person.bio ? \`Bio: \${person.bio}\` : ''}
  \`.trim();
}`,
      order: 1,
    },
  })

  // Add challenges for Module 1.1
  await prisma.challenge.createMany({
    data: [
      {
        moduleId: module1_1.id,
        title: 'Speed Challenge: Type Conversion',
        description: 'Convert 10 JavaScript functions to TypeScript in under 15 minutes',
        type: 'speed',
        xpReward: 50,
        difficulty: 'green',
        starterCode: `// Convert these JavaScript functions to TypeScript

function add(a, b) {
  return a + b;
}

function greet(name) {
  return \`Hello, \${name}!\`;
}

// ... 8 more functions`,
        testCases: JSON.stringify([
          { input: [1, 2], expected: 3 },
          { input: ['World'], expected: 'Hello, World!' },
        ]),
        timeLimit: 15,
        order: 1,
      },
      {
        moduleId: module1_1.id,
        title: 'Accuracy Challenge: No Any Allowed',
        description: 'Write type-safe code without using the `any` type',
        type: 'accuracy',
        xpReward: 75,
        difficulty: 'yellow',
        starterCode: `// Create type-safe versions of these functions
// NO 'any' types allowed!

function processData(data) {
  // Handle strings, numbers, or arrays
  return data;
}`,
        testCases: JSON.stringify([]),
        order: 2,
      },
      {
        moduleId: module1_1.id,
        title: 'Boss Challenge: Debug Type Errors',
        description: 'Find and fix 20 type errors in the provided code',
        type: 'boss',
        xpReward: 150,
        difficulty: 'red',
        starterCode: `// Find and fix all type errors!

let name: string = 123;
let age: number = "25";
// ... 18 more errors`,
        testCases: JSON.stringify([]),
        order: 3,
      },
    ],
  })

  console.log('✅ Created Module 1.1 with lessons, project, and challenges')

  // Module 1.2: Complex Types & Interfaces
  const module1_2 = await prisma.module.create({
    data: {
      phaseId: phase1.id,
      title: 'Complex Types & Interfaces',
      quest: 'Mastering Object Shapes',
      description: 'Learn interfaces, type aliases, and object typing',
      order: 2,
      totalXP: 700,
    },
  })

  await prisma.lesson.createMany({
    data: [
      {
        moduleId: module1_2.id,
        title: 'Introduction to Interfaces',
        content: `# Introduction to Interfaces

Interfaces define the shape of objects in TypeScript.

## Basic Interface

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com"
};
\`\`\`

## Optional Properties

\`\`\`typescript
interface Product {
  id: number;
  name: string;
  description?: string; // Optional
  price: number;
}

// Valid - description is optional
const product: Product = {
  id: 1,
  name: "Laptop",
  price: 999
};
\`\`\`

## Readonly Properties

\`\`\`typescript
interface Config {
  readonly apiKey: string;
  readonly endpoint: string;
  timeout?: number;
}

const config: Config = {
  apiKey: "abc123",
  endpoint: "https://api.example.com"
};

config.apiKey = "new key"; // Error: Cannot assign to 'apiKey' because it is a read-only property
\`\`\``,
        duration: 25,
        order: 1,
        xpReward: 30,
        type: 'lesson',
      },
      {
        moduleId: module1_2.id,
        title: 'Type Aliases',
        content: `# Type Aliases

Type aliases create a new name for a type.

## Basic Type Alias

\`\`\`typescript
type ID = string | number;
type Username = string;

let userId: ID = 123;
userId = "abc-123"; // Also valid

let user: Username = "john_doe";
\`\`\`

## Object Type Aliases

\`\`\`typescript
type Point = {
  x: number;
  y: number;
};

type Circle = {
  center: Point;
  radius: number;
};

const circle: Circle = {
  center: { x: 0, y: 0 },
  radius: 10
};
\`\`\`

## Interface vs Type

\`\`\`typescript
// Interface
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type
type Animal = {
  name: string;
};

type Dog = Animal & {
  breed: string;
};
\`\`\`

## When to Use Which?

- **Use Interface** when defining object shapes, especially for classes
- **Use Type** for unions, intersections, primitives, tuples
- Both can often be used interchangeably for objects`,
        duration: 30,
        order: 2,
        xpReward: 35,
        type: 'lesson',
      },
    ],
  })

  console.log('✅ Created Module 1.2 with lessons')

  // Create Phase 2: Intermediate Mastery
  const phase2 = await prisma.phase.create({
    data: {
      courseId: tsCourse.id,
      title: 'Phase 2: Intermediate Mastery',
      description: 'Dive into advanced TypeScript features',
      order: 2,
      level: 'Type Craftsman',
      duration: '20-25 hours',
      totalXP: 5000,
    },
  })

  // Module 2.1: Generics
  const module2_1 = await prisma.module.create({
    data: {
      phaseId: phase2.id,
      title: 'Generics - The Power Tool',
      quest: 'Unlock Reusability',
      description: 'Master generic programming in TypeScript',
      order: 1,
      totalXP: 900,
    },
  })

  await prisma.lesson.create({
    data: {
      moduleId: module2_1.id,
      title: 'Introduction to Generics',
      content: `# Introduction to Generics

Generics allow you to write reusable code that works with multiple types.

## The Problem

\`\`\`typescript
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

// We need a function for every type! 😫
\`\`\`

## The Solution: Generics

\`\`\`typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirst([1, 2, 3]); // T is number
const firstString = getFirst(["a", "b", "c"]); // T is string
\`\`\`

## Generic Interfaces

\`\`\`typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
\`\`\`

## Multiple Type Parameters

\`\`\`typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("age", 25); // [string, number]
\`\`\``,
      duration: 35,
      order: 1,
      xpReward: 50,
      type: 'lesson',
    },
  })

  console.log('✅ Created Module 2.1 with lesson')

  // Create Phase 3: Advanced
  const phase3 = await prisma.phase.create({
    data: {
      courseId: tsCourse.id,
      title: 'Phase 3: Advanced & Production-Ready',
      description: 'Master advanced patterns and production best practices',
      order: 3,
      level: 'TypeScript Architect',
      duration: '25-30 hours',
      totalXP: 7000,
    },
  })

  console.log('✅ Created Phase 3')

  // Create Achievements
  await prisma.achievement.createMany({
    data: [
      {
        name: 'First Types',
        description: 'Complete Module 1.1: TypeScript Fundamentals',
        icon: '🎯',
        category: 'foundational',
        xpReward: 50,
      },
      {
        name: 'Interface Architect',
        description: 'Master interfaces and types',
        icon: '🏗️',
        category: 'foundational',
        xpReward: 75,
      },
      {
        name: 'Generic Wizard',
        description: 'Master generic programming',
        icon: '🧙',
        category: 'advanced',
        xpReward: 100,
      },
      {
        name: 'Zero Any Hero',
        description: 'Complete 10 challenges without using `any`',
        icon: '🦸',
        category: 'special',
        xpReward: 200,
      },
    ],
  })

  // Create Badges
  await prisma.badge.createMany({
    data: [
      {
        name: 'TypeScript Explorer',
        description: 'Started your TypeScript journey',
        icon: '🗺️',
        requirement: 'Complete first lesson',
        xpReward: 25,
      },
      {
        name: 'Function Master',
        description: 'Completed all function challenges',
        icon: '⚡',
        requirement: 'Complete Module 1.3',
        xpReward: 100,
      },
      {
        name: 'Type Alchemist',
        description: 'Master advanced type manipulation',
        icon: '🔮',
        requirement: 'Complete Module 2.2',
        xpReward: 150,
      },
    ],
  })

  console.log('✅ Created achievements and badges')

  // Create a demo user
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo123', // In production, hash this!
      role: 'student',
      totalXP: 0,
      level: 1,
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
