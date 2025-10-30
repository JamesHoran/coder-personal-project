# TypeScript Lesson Testing Framework

## Overview

This document describes the comprehensive testing framework for TypeScript interactive lessons. The framework ensures that all lessons work correctly when students provide the correct answer.

## Architecture

### Components

1. **Test Runner** (`src/lib/typescript-lesson-test-runner.ts`)
   - Compiles TypeScript code
   - Executes test cases
   - Validates code quality
   - Provides helpful error messages

2. **Validation Scripts**
   - `scripts/test-ts-lessons.js` - Quick structural validation
   - `scripts/validate-typescript-lessons.ts` - Full test execution (requires TypeScript)

3. **Interactive Lessons**
   - Located in: `src/data/courses/typescript-course-interactive/`
   - Organized by phase and module
   - Each lesson contains steps with tests

## Lesson Structure

Each interactive lesson follows this structure:

```typescript
{
  id: string;              // Unique identifier (e.g., "ts-basics-01")
  moduleId: string;        // Module ID from main course
  title: string;           // Descriptive title
  order: number;           // Sequential order
  xpReward: number;        // XP earned for completion
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: LessonStep[];     // Array of lesson steps
}
```

### Lesson Step Structure

```typescript
{
  id: string;              // Unique step identifier
  order: number;           // Step sequence
  instruction: string;     // Markdown teaching content
  hint: string;            // Helpful hint
  starterCode: string;     // Initial code template
  solution: string;        // CORRECT ANSWER - must pass all tests
  testCases: TestCase[];   // Array of test cases
  language: "typescript";  // Language for syntax highlighting
}
```

### Test Case Structure

```typescript
{
  id: string;              // Test identifier
  description: string;     // What this test validates
  testFunction: string;    // JavaScript test expression
  errorMessage?: string;   // Optional custom error message
}
```

## Test Functions

Test functions have access to these variables:

- `code` - The user's code as a string
- `compiledJS` - Compiled JavaScript output
- `diagnostics` - TypeScript compiler diagnostics
- `hasTypeErrors` - Boolean indicating type errors
- `ts` - TypeScript compiler API

### Helper Functions in Tests

- `includes(str, substr)` - Check if string contains substring
- `matches(str, regex)` - Test string against regex
- `hasType(code, typeName)` - Check if code contains type annotation
- `assert(condition, message)` - Assert with custom message

### Example Test Cases

```typescript
testCases: [
  {
    id: "test-1",
    description: "Variable 'greeting' should be declared",
    testFunction: `return code.includes('greeting');`,
  },
  {
    id: "test-2",
    description: "Variable should have string type annotation",
    testFunction: `return code.includes('greeting: string');`,
  },
  {
    id: "test-3",
    description: "Code should not have TypeScript errors",
    testFunction: `return !hasTypeErrors;`,
  },
]
```

## Running Tests

### Quick Structural Validation

Validates lesson structure and required fields:

```bash
node scripts/test-ts-lessons.js
```

**Output:**
- ✅ Checks for required fields
- ✅ Counts test cases
- ✅ Verifies lesson structure
- ❌ Does NOT execute actual tests

### Full Test Execution

Runs actual TypeScript compilation and test execution:

```bash
npx tsx scripts/validate-typescript-lessons.ts
```

**Output:**
- ✅ Compiles solution code
- ✅ Runs all test cases
- ✅ Validates TypeScript types
- ✅ Generates JSON report
- ✅ Exits with error code if tests fail

## Current Status

### Module 1.1: TypeScript Fundamentals ✅

**10 lessons created and validated:**

1. ✅ Your First TypeScript Variable (50 XP)
2. ✅ Working with Number Types (50 XP)
3. ✅ Boolean Types (50 XP)
4. ✅ Type Inference (75 XP)
5. ✅ Typing Arrays (75 XP)
6. ✅ Union Types (100 XP)
7. ✅ Literal Types (100 XP)
8. ✅ Type Aliases (100 XP)
9. ✅ Typing Function Parameters (100 XP)
10. ✅ Function Return Types (100 XP)

**Total XP:** 800 XP
**All tests pass:** ✅ YES

## Creating New Lessons

### Step 1: Create Lesson File

Create a new file in the appropriate phase directory:

```
src/data/courses/typescript-course-interactive/
  └── phase-1/
      └── module-1-2-complex-types-interfaces.ts
```

### Step 2: Define Lessons

```typescript
import { InteractiveLesson } from "@/types";

export const complexTypesLessons: InteractiveLesson[] = [
  {
    id: "ts-interfaces-01",
    moduleId: "typescript-1.2",
    title: "Your First Interface",
    order: 1,
    xpReward: 100,
    difficulty: "beginner",
    steps: [
      {
        id: "ts-interfaces-01-step-1",
        order: 1,
        instruction: `# Markdown instruction here`,
        hint: "Helpful hint",
        starterCode: "// Starting code",
        solution: "// WORKING SOLUTION",
        testCases: [
          {
            id: "test-1",
            description: "Test description",
            testFunction: `return code.includes('interface');`,
          },
        ],
        language: "typescript",
      },
    ],
  },
];
```

### Step 3: Export in Index

Update `src/data/courses/typescript-course-interactive/index.ts`:

```typescript
import { complexTypesLessons } from "./phase-1/module-1-2-complex-types-interfaces";

export const allTypeScriptLessons: InteractiveLesson[] = [
  ...typescriptFundamentalsLessons,
  ...complexTypesLessons, // Add new module
];
```

### Step 4: Validate

Run the validation scripts:

```bash
# Quick structural check
node scripts/test-ts-lessons.js

# Full test execution (when TypeScript is set up)
npx tsx scripts/validate-typescript-lessons.ts
```

## Best Practices

### Writing Solutions

1. **Always test your solution** - Run it through the test cases
2. **Keep it simple** - Solutions should demonstrate one concept at a time
3. **Use clear variable names** - Students will copy your style
4. **Include type annotations** - Even when optional, for learning purposes

### Writing Test Cases

1. **Start simple** - First test: does the code exist?
2. **Test specific requirements** - Each test should check one thing
3. **Include type checking** - Use `!hasTypeErrors` as final test
4. **Provide helpful descriptions** - Students see these when tests fail

### Good Test Progression

```typescript
testCases: [
  // 1. Does code exist?
  {
    id: "test-1",
    description: "Variable should be declared",
    testFunction: `return code.includes('myVariable');`,
  },
  // 2. Does it have the right type?
  {
    id: "test-2",
    description: "Should have string type annotation",
    testFunction: `return code.includes(': string');`,
  },
  // 3. Does it have the right value?
  {
    id: "test-3",
    description: "Should be assigned correct value",
    testFunction: `return code.includes('"Hello"');`,
  },
  // 4. Does TypeScript accept it?
  {
    id: "test-4",
    description: "Code should compile without errors",
    testFunction: `return !hasTypeErrors;`,
  },
]
```

## Common Issues and Solutions

### Issue: Tests pass but solution is wrong

**Problem:** Tests are too lenient
**Solution:** Add more specific test cases

```typescript
// Bad - too generic
testFunction: `return code.includes('function');`

// Good - specific check
testFunction: `return code.includes('function add(a: number, b: number)');`
```

### Issue: Solution works but tests fail

**Problem:** Test is checking wrong thing
**Solution:** Review test logic

```typescript
// Bad - checks for exact spacing
testFunction: `return code.includes('age: number');`

// Good - allows for spacing variations
testFunction: `return code.includes('age') && code.includes(': number');`
```

### Issue: TypeScript errors in solution

**Problem:** Solution code has type errors
**Solution:** Use TypeScript compiler to check

```bash
# Check your solution
echo "let greeting: string = 'Hello';" > temp.ts
npx tsc --noEmit temp.ts
rm temp.ts
```

## Testing Checklist

Before submitting new lessons, verify:

- [ ] All required fields present (id, title, steps, etc.)
- [ ] Solution code is correct and complete
- [ ] Solution passes all test cases
- [ ] Test cases are specific and clear
- [ ] Instructions are clear and helpful
- [ ] Hints provide guidance without giving away answer
- [ ] Starter code is appropriate
- [ ] XP rewards are balanced
- [ ] Difficulty level is accurate
- [ ] No TypeScript errors in solution
- [ ] Runs through validation script successfully

## Integration with UI

The lessons integrate with the InteractiveLessonPlayer component:

```typescript
import { getLessonById } from '@/data/courses/typescript-course-interactive';
import { InteractiveLessonPlayer } from '@/components/lessons/InteractiveLessonPlayer';

// Get lesson
const lesson = getLessonById('ts-basics-01');

// Render player
<InteractiveLessonPlayer
  lesson={lesson}
  onComplete={(xp) => console.log(`Earned ${xp} XP!`)}
  onStepComplete={(stepId) => console.log(`Completed ${stepId}`)}
/>
```

## Future Enhancements

### Planned Features

1. **Real-time TypeScript compilation** in browser
2. **Incremental testing** - see which tests pass as you type
3. **Auto-save progress** - preserve user code between sessions
4. **Hint system** - progressive hints based on failures
5. **Code replay** - show how to write the solution step-by-step
6. **Peer solutions** - see how others solved the problem

### Additional Modules Needed

- Module 1.2: Complex Types & Interfaces (10 lessons)
- Module 1.3: Functions & Methods (10 lessons)
- Module 2.1: Generics (10 lessons)
- Module 2.2: Advanced Types (10 lessons)
- Module 2.3: Classes & OOP (10 lessons)
- Module 2.4: Enums & Modules (8 lessons)
- Module 3.1: Utility Types (10 lessons)
- Module 3.2: TypeScript in React (10 lessons)
- Module 3.3: Advanced Patterns (10 lessons)
- Module 3.4: Testing & Type Safety (8 lessons)
- Module 3.5: Real-World Integration (10 lessons)

**Total Needed:** ~106 lessons across all modules

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## Support

If you encounter issues:

1. Check the lesson structure matches the type definitions
2. Run validation scripts to identify problems
3. Review test function syntax and available variables
4. Verify solution code compiles without errors
5. Check TypeScript version compatibility

---

**Last Updated:** 2025-10-29
**Version:** 1.0
**Status:** ✅ Framework Complete, 10 lessons validated
