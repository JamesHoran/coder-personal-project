# TypeScript Course - Interactive Lessons Requirements

## Overview

This document specifies the requirements for creating interactive, gamified lessons for the TypeScript course. These lessons follow the same architectural pattern as the React course and integrate with the existing TypeScript course structure defined in `src/data/courses/typescript-course.ts`.

---

## Architecture Requirements

### 1. File Structure

All lesson files must be created in the following structure:

```
src/data/courses/typescript-course/
├── phase-1/
│   ├── module-1-1-typescript-fundamentals.ts
│   ├── module-1-2-complex-types-interfaces.ts
│   └── module-1-3-functions-methods.ts
├── phase-2/
│   ├── module-2-1-generics.ts
│   ├── module-2-2-advanced-types.ts
│   ├── module-2-3-classes-oop.ts
│   └── module-2-4-enums-modules.ts
└── phase-3/
    ├── module-3-1-utility-types.ts
    ├── module-3-2-typescript-react.ts
    ├── module-3-3-advanced-patterns.ts
    ├── module-3-4-testing-type-safety.ts
    └── module-3-5-real-world-integration.ts
```

### 2. Lesson Data Type

Each lesson file must export an array of `InteractiveLesson` objects:

```typescript
import { InteractiveLesson } from "@/types";

export const typescriptFundamentalsLessons: InteractiveLesson[] = [
  // Lessons here
];
```

### 3. Lesson Object Structure

Each lesson must include:

```typescript
{
  id: string;              // Format: "ts-{topic}-{number}" (e.g., "ts-basics-01")
  moduleId: string;        // Module ID from typescript-course.ts (e.g., "typescript-1.1")
  title: string;           // Clear, descriptive title
  order: number;           // Sequential order within module (1, 2, 3...)
  xpReward: number;        // XP earned for completion (50-200 per lesson)
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  steps: Step[];           // Array of step objects
}
```

### 4. Step Object Structure

Each step must include:

```typescript
{
  id: string;                    // Format: "{lessonId}-step-{number}"
  order: number;                 // Step sequence number
  instruction: string;           // Markdown-formatted teaching content
  hint: string;                  // Helpful hint for the learner
  starterCode: string;           // Pre-filled code template
  solution: string;              // Complete working solution
  testCases: TestCase[];         // Array of test case objects
  language: "typescript" | "tsx"; // Code language for syntax highlighting
}
```

### 5. Test Case Structure

Each test case must include:

```typescript
{
  id: string;                    // Format: "test-{number}"
  description: string;           // What this test validates
  testFunction: string;          // JavaScript test expression
}
```

---

## Content Requirements

### Phase 1: Foundations (3 Modules, ~10 Lessons Each)

#### Module 1.1: TypeScript Fundamentals
**Topics to Cover (10 lessons):**
1. Your First TypeScript File
2. Basic Type Annotations (string, number, boolean)
3. Type Inference - Let TypeScript Work for You
4. Arrays with Types
5. Tuple Types
6. Any vs Unknown vs Never
7. Union Types Basics
8. Literal Types
9. Type Aliases Introduction
10. Compiling TypeScript to JavaScript

**Learning Objectives:**
- Set up and compile TypeScript
- Annotate variables with primitive types
- Understand when TypeScript infers types
- Use arrays and tuples with proper types
- Choose between any, unknown, and never
- Create simple type aliases
- Understand the compilation process

**XP Distribution:** 50-100 XP per lesson (total ~700-800 XP)

#### Module 1.2: Complex Types & Interfaces
**Topics to Cover (10 lessons):**
1. Object Type Annotations
2. Creating Your First Interface
3. Optional Properties with ?
4. Readonly Properties
5. Interface vs Type Alias
6. Extending Interfaces
7. Index Signatures
8. Function Type Expressions
9. Intersection Types with &
10. Type Assertions

**Learning Objectives:**
- Define object shapes with interfaces
- Use optional and readonly modifiers
- Extend and compose interfaces
- Create flexible types with index signatures
- Combine types with intersection
- Safely assert types when necessary

**XP Distribution:** 75-150 XP per lesson (total ~1000-1200 XP)

#### Module 1.3: Functions & Methods
**Topics to Cover (10 lessons):**
1. Typing Function Parameters
2. Function Return Types
3. Arrow Functions with Types
4. Optional Parameters
5. Default Parameters
6. Rest Parameters with Types
7. Function Overloads - Part 1
8. Function Overloads - Part 2
9. Void and Never Return Types
10. This Parameter Type

**Learning Objectives:**
- Type function signatures completely
- Handle optional and default parameters
- Master rest parameters
- Create function overloads
- Understand void and never
- Control this context with types

**XP Distribution:** 75-150 XP per lesson (total ~1000-1200 XP)

---

### Phase 2: Intermediate Mastery (4 Modules, ~8-10 Lessons Each)

#### Module 2.1: Generics - The Power Tool
**Topics to Cover (10 lessons):**
1. Why Generics? The Motivation
2. Generic Functions - Part 1
3. Generic Functions - Part 2
4. Generic Constraints with Extends
5. Using Multiple Type Parameters
6. Generic Interfaces
7. Generic Classes
8. Generic Type Aliases
9. Default Generic Types
10. Generic Array Operations

**Learning Objectives:**
- Understand the need for generics
- Create reusable generic functions
- Apply constraints to generics
- Build generic data structures
- Use multiple type parameters
- Set sensible defaults

**XP Distribution:** 100-200 XP per lesson (total ~1200-1500 XP)

#### Module 2.2: Advanced Types & Type Manipulation
**Topics to Cover (10 lessons):**
1. Union Types Deep Dive
2. Discriminated Unions
3. Type Guards with typeof
4. Type Guards with instanceof
5. Custom Type Predicates
6. Type Narrowing Techniques
7. Mapped Types Introduction
8. Conditional Types Basics
9. Template Literal Types
10. Indexed Access Types

**Learning Objectives:**
- Master union types and narrowing
- Create discriminated unions
- Write effective type guards
- Transform types with mapped types
- Use conditional type logic
- Build string types dynamically

**XP Distribution:** 125-200 XP per lesson (total ~1400-1800 XP)

#### Module 2.3: Classes & OOP in TypeScript
**Topics to Cover (10 lessons):**
1. Creating Typed Classes
2. Constructor with Types
3. Public, Private, and Protected
4. Readonly Class Properties
5. Getters and Setters
6. Static Members
7. Abstract Classes
8. Implementing Interfaces
9. Parameter Properties Shorthand
10. Class Inheritance with Types

**Learning Objectives:**
- Define classes with proper types
- Use access modifiers effectively
- Create abstract base classes
- Implement interface contracts
- Master inheritance patterns
- Optimize with parameter properties

**XP Distribution:** 100-175 XP per lesson (total ~1200-1500 XP)

#### Module 2.4: Enums, Modules & Namespaces
**Topics to Cover (8 lessons):**
1. Numeric Enums
2. String Enums
3. Const Enums for Performance
4. When to Use Enums
5. ES6 Modules in TypeScript
6. Import and Export Patterns
7. Module Resolution
8. Declaration Files (.d.ts)

**Learning Objectives:**
- Choose appropriate enum types
- Organize code with modules
- Handle imports and exports
- Understand module resolution
- Work with declaration files
- Optimize with const enums

**XP Distribution:** 100-150 XP per lesson (total ~800-1100 XP)

---

### Phase 3: Advanced & Production-Ready (5 Modules, ~8-10 Lessons Each)

#### Module 3.1: Utility Types & Type Magic
**Topics to Cover (10 lessons):**
1. Partial<T> - Make All Properties Optional
2. Required<T> - Make All Properties Required
3. Readonly<T> - Immutable Objects
4. Record<K, T> - Key-Value Pairs
5. Pick<T, K> and Omit<T, K>
6. Exclude<T, U> and Extract<T, U>
7. ReturnType<T> and Parameters<T>
8. The Infer Keyword
9. Creating Custom Utility Types
10. Recursive Types

**Learning Objectives:**
- Master all built-in utility types
- Understand the infer keyword
- Create custom type utilities
- Build recursive type structures
- Transform types programmatically

**XP Distribution:** 150-250 XP per lesson (total ~1800-2200 XP)

#### Module 3.2: TypeScript in React
**Topics to Cover (10 lessons):**
1. Typing Functional Components
2. Props Interface Design
3. Children Prop Types
4. Event Handlers with Types
5. useState with TypeScript
6. useEffect Type Patterns
7. useRef and DOM References
8. Custom Hooks with Types
9. Context API with TypeScript
10. Generic Components

**Learning Objectives:**
- Type React components properly
- Handle all hook types correctly
- Type event handlers accurately
- Create generic reusable components
- Master context with types
- Build type-safe custom hooks

**XP Distribution:** 150-250 XP per lesson (total ~1800-2200 XP)

#### Module 3.3: Advanced Patterns & Best Practices
**Topics to Cover (8 lessons):**
1. Error Handling Patterns
2. Builder Pattern with Types
3. Factory Pattern with Types
4. Strict Mode Configuration
5. Performance and Compilation
6. Type-Safe Configuration
7. Handling Third-Party Types
8. Enterprise Coding Standards

**Learning Objectives:**
- Implement design patterns with types
- Configure strict mode properly
- Optimize compilation performance
- Handle missing type definitions
- Follow enterprise standards
- Write maintainable code

**XP Distribution:** 150-250 XP per lesson (total ~1400-1800 XP)

#### Module 3.4: Testing & Type Safety
**Topics to Cover (8 lessons):**
1. Setting Up Jest with TypeScript
2. Typing Test Cases
3. Mocking with Types
4. Testing Async Code
5. Type-Only Tests
6. Testing React Components
7. Creating Test Utilities
8. Snapshot Testing with Types

**Learning Objectives:**
- Set up typed test environment
- Write tests with proper types
- Mock dependencies safely
- Test types themselves
- Create reusable test utilities

**XP Distribution:** 150-200 XP per lesson (total ~1200-1600 XP)

#### Module 3.5: Real-World Integration
**Topics to Cover (10 lessons):**
1. TypeScript with Node.js
2. Express with TypeScript
3. Typing Route Handlers
4. Database Types with Prisma
5. TypeORM Basics
6. GraphQL with TypeScript
7. WebSocket Types
8. Environment Variables with Types
9. API Client with Types
10. Microservices Communication

**Learning Objectives:**
- Integrate TypeScript in backend
- Type API routes and handlers
- Work with ORMs and types
- Handle GraphQL types
- Type real-time communication
- Build type-safe services

**XP Distribution:** 150-250 XP per lesson (total ~1800-2200 XP)

---

## Writing Style Requirements

### Instruction Format
Each instruction should follow this structure:

```markdown
# [Clear Lesson Title]

[Brief introduction explaining the concept]

[Code example showing the concept]

**Key Points:**
- Point 1
- Point 2
- Point 3

## Your Task

[Clear numbered steps of what the learner should do]
```

### Code Examples
- Always use proper TypeScript syntax
- Show both correct and incorrect examples when helpful
- Include comments explaining complex parts
- Use realistic variable names
- Keep examples focused and concise

### Hints
- Should guide without giving away the solution
- Reference specific concepts or syntax
- Can include partial code snippets
- Should encourage problem-solving

### Test Cases
- Minimum 4 test cases per lesson
- Test different aspects of the solution
- Include both positive and negative tests
- Use descriptive test descriptions
- Test actual TypeScript compilation when possible

---

## Progressive Difficulty Guidelines

### Beginner Lessons (Phase 1)
- **Complexity:** Single concept per lesson
- **Code Length:** 5-15 lines of code
- **Instructions:** Very detailed with examples
- **XP:** 50-150 per lesson
- **Test Cases:** 4-5 tests focusing on basics

### Intermediate Lessons (Phase 2)
- **Complexity:** Multiple related concepts
- **Code Length:** 15-30 lines of code
- **Instructions:** Moderate detail, expect some exploration
- **XP:** 100-200 per lesson
- **Test Cases:** 5-6 tests with edge cases

### Advanced Lessons (Phase 3)
- **Complexity:** Complex patterns and real-world scenarios
- **Code Length:** 30-60 lines of code
- **Instructions:** High-level guidance, self-discovery encouraged
- **XP:** 150-250 per lesson
- **Test Cases:** 6-8 tests including advanced scenarios

---

## Test Case Implementation Notes

### Test Function Format
Test functions are evaluated as JavaScript expressions. Common patterns:

**Type Checking:**
```typescript
code.includes('interface User')
code.includes(': string')
typeof MyFunction === 'function'
```

**Compilation Testing:**
```typescript
// Check for TypeScript errors
try {
  eval(code);
  true; // No errors
} catch {
  false; // Has errors
}
```

**Functionality Testing:**
```typescript
// Test actual function behavior
const result = myFunction(testInput);
result === expectedOutput
```

---

## Example Lesson Template

Here's a complete example lesson following all requirements:

```typescript
{
  id: "ts-types-01",
  moduleId: "typescript-1.1",
  title: "Your First Type Annotation",
  order: 1,
  xpReward: 50,
  difficulty: "beginner",
  steps: [
    {
      id: "ts-types-01-step-1",
      order: 1,
      instruction: `
# Your First Type Annotation

TypeScript adds **type annotations** to JavaScript. Type annotations explicitly tell TypeScript what type a variable should be.

\`\`\`typescript
let userName: string = "Alice";
let age: number = 25;
let isActive: boolean = true;
\`\`\`

**Key Points:**
- Use \`: type\` after the variable name
- TypeScript will give an error if you try to assign the wrong type
- Three primitive types: \`string\`, \`number\`, \`boolean\`

## Your Task

Create three variables with explicit type annotations:
1. A \`name\` variable of type \`string\` with value "TypeScript"
2. A \`version\` variable of type \`number\` with value 5
3. A \`isAwesome\` variable of type \`boolean\` with value true
      `,
      hint: "Remember the syntax: let variableName: type = value;",
      starterCode: `// Create your variables here




export { name, version, isAwesome };`,
      solution: `let name: string = "TypeScript";
let version: number = 5;
let isAwesome: boolean = true;

export { name, version, isAwesome };`,
      testCases: [
        {
          id: "test-1",
          description: "Should declare a name variable with type string",
          testFunction: `code.includes('name') && code.includes(': string')`,
        },
        {
          id: "test-2",
          description: "name should equal 'TypeScript'",
          testFunction: `name === 'TypeScript'`,
        },
        {
          id: "test-3",
          description: "Should declare a version variable with type number",
          testFunction: `code.includes('version') && code.includes(': number')`,
        },
        {
          id: "test-4",
          description: "version should equal 5",
          testFunction: `version === 5`,
        },
        {
          id: "test-5",
          description: "Should declare isAwesome with type boolean",
          testFunction: `code.includes('isAwesome') && code.includes(': boolean')`,
        },
        {
          id: "test-6",
          description: "isAwesome should be true",
          testFunction: `isAwesome === true`,
        },
      ],
      language: "typescript",
    },
  ],
},
```

---

## Integration Requirements

### Module Updates
Each module in `typescript-course.ts` must be updated to include a `lessons` array:

```typescript
{
  id: "typescript-1.1",
  // ... other properties
  lessons: typescriptFundamentalsLessons,
}
```

### Total XP Calculation
Lessons XP should be **additional** to project and challenge XP. Update the total XP calculation to include lessons:

```typescript
const totalXP = phases.reduce((sum, phase) => {
  return sum + phase.modules.reduce((modSum, module) => {
    const projectXP = module.projects.reduce((p, proj) => p + proj.xp, 0);
    const challengeXP = module.challenges.reduce((c, chal) => c + chal.xp, 0);
    const lessonXP = module.lessons?.reduce((l, lesson) => l + lesson.xpReward, 0) || 0;
    return modSum + projectXP + challengeXP + lessonXP;
  }, 0);
}, 0);
```

---

## Quality Standards

### Must Have
✅ Clear, accurate technical content
✅ Working code examples that compile
✅ Progressive difficulty
✅ Realistic use cases
✅ Comprehensive test coverage
✅ Helpful hints
✅ Proper TypeScript syntax

### Must Avoid
❌ Outdated TypeScript syntax
❌ Confusing or ambiguous instructions
❌ Code that doesn't compile
❌ Trivial or unrealistic examples
❌ Missing test cases
❌ Skipping important concepts

---

## Estimated Effort

**Total Lessons Required:** ~120 lessons
- Phase 1: 30 lessons
- Phase 2: 38 lessons
- Phase 3: 46 lessons

**Average Time per Lesson:** 45-60 minutes
- Writing instruction: 15-20 min
- Creating starter/solution code: 10-15 min
- Writing test cases: 15-20 min
- Testing and refinement: 5-10 min

**Total Estimated Time:** 90-120 hours for complete lesson creation

---

## Priorities for Implementation

### Priority 1: Foundation (Module 1.1)
Build the first 10 lessons to establish the pattern and validate the approach.

### Priority 2: Core Concepts (Modules 1.2, 1.3, 2.1)
Complete fundamental and generic programming lessons.

### Priority 3: Advanced Features (Modules 2.2, 2.3, 2.4)
Implement intermediate-level type system features.

### Priority 4: Production Skills (Phase 3)
Complete advanced patterns and real-world integration.

---

## Success Metrics

A successfully implemented lesson should:
1. ✅ Teach one clear concept
2. ✅ Have 100% accurate code
3. ✅ Include 4+ meaningful tests
4. ✅ Provide helpful hints
5. ✅ Match the difficulty level
6. ✅ Award appropriate XP
7. ✅ Follow the architectural pattern exactly

---

## Next Steps

1. Create Phase 1, Module 1.1 (10 lessons) as proof of concept
2. Review and validate with actual implementation
3. Iterate on the pattern based on feedback
4. Build remaining modules systematically
5. Test entire course flow
6. Gather user feedback and refine

---

*This specification follows the exact architecture pattern established by the React course while tailoring content specifically for TypeScript learning objectives.*
