# PRP: Fix React Course Test Case Bugs

**Priority:** CRITICAL (Priority 1)
**Estimated Time:** 12 hours
**Agent:** code-validator + test-generator
**Audit Finding:** Issue #2 - Test case bugs will fail correct code

---

## Context

The React course interactive lessons use string matching and brittle tests that will mark CORRECT student code as wrong. This is the #1 reason students abandon courses.

**Files Affected:**
- `/src/data/courses/react-course-interactive/phase-1/module-1-2-state-basics.ts`
- `/src/data/courses/react-course-interactive/phase-2/module-2-1-advanced-hooks.ts`
- `/src/data/courses/react-course-interactive/phase-2/module-2-3-performance-optimization.ts`

---

## Requirements

### Functional Requirements

1. **Fix Currency Formatting Inconsistencies**
   - Decide on standard: Either `Price: $999` OR `Price: 999`
   - Update ALL solutions to match standard
   - Update ALL tests to match standard
   - Update ALL instructions to match standard

2. **Replace String Matching with Proper Tests**
   - Remove: `code.includes('setLikes')` brittle checks
   - Add: Actual code execution or AST parsing
   - Verify student code structure, not exact syntax

3. **Fix Regex Test Bugs**
   - Make tests forgiving of whitespace
   - Accept both `const` and `let`
   - Don't fail on stylistic differences

4. **Test the Tests**
   - Run ALL solution code through test cases
   - Verify 100% of solutions pass their tests
   - Create test verification script

### Technical Requirements

- Use existing test infrastructure
- Maintain backwards compatibility with lesson format
- Don't break existing passing tests
- Document test writing standards

---

## Implementation Plan

### Step 1: Audit All Test Cases (2 hours)
1. Grep for all `testFunction:` in react-course-interactive
2. List every test case with file:line
3. Categorize: String matching, Regex, Code execution
4. Identify all broken tests

### Step 2: Fix Currency Formatting (3 hours)
**Standard Decision: Use `Price: $999` format**

Files to fix:
1. `module-1-2-state-basics.ts` Line 399-401
   - Solution: Change `<p>Price: {price}</p>` → `<p>Price: ${price}</p>`
   - Test: Already expects `Price: $999` ✅
   - Instruction: Update to clarify $ is part of format

2. `module-2-3-performance-optimization.ts` Line 229
   - Solution: Change `<p>Price: {product.price}</p>` → `<p>Price: ${product.price}</p>`
   - Test Line 267-270: Already expects `Price: $999` ✅

3. `module-2-3-performance-optimization.ts` Line 396
   - Solution: Change `<p>Subtotal: {subtotal}</p>` → `<p>Subtotal: ${subtotal}</p>`
   - Test Line 418-423: Already expects `Subtotal: $60` ✅

### Step 3: Fix String Matching Tests (4 hours)

**Test Type 1: State Update Detection**
```typescript
// BAD - Line 380-382 in module-1-2-state-basics.ts
testFunction: `code.includes('setLikes') && (code.includes('likes + 1') || code.includes('likes+1'))`

// GOOD - Check structure
testFunction: `
  // Verify setLikes is called
  const hasSetLikes = code.includes('setLikes');
  // Verify it's incrementing (functional or direct)
  const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
  return hasSetLikes && hasIncrement !== null;
`
```

**Test Type 2: Cleanup Detection**
```typescript
// BAD - Line 397-399 in module-2-1-advanced-hooks.ts
const match = code.match(/const\\s+(\\w+)\\s*=\\s*setInterval/);
match !== null && code.includes(`clearInterval(${match[1]})`)

// GOOD - Check pattern
testFunction: `
  const hasSetInterval = code.includes('setInterval');
  const hasClearInterval = code.includes('clearInterval');
  const hasReturn = code.match(/return\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*clearInterval/);
  return hasSetInterval && hasClearInterval && hasReturn !== null;
`
```

**Test Type 3: Spread Operator**
```typescript
// BAD - Line 1881
testFunction: `code.includes('...state')`

// GOOD - Verify correct usage
testFunction: `
  const hasSpread = code.match(/\\{\\s*\\.\\.\\.state/);
  const isInReturn = code.match(/return\\s*\\{[\\s\\S]*\\.\\.\\.state/);
  return hasSpread !== null && isInReturn !== null;
`
```

### Step 4: Create Test Verification Script (2 hours)

Create `/scripts/verify-lesson-tests.ts`:
```typescript
/**
 * Verifies all interactive lesson solutions pass their test cases
 */
import { readFileSync } from 'fs';
import { glob } from 'glob';

async function verifyTests() {
  const files = await glob('src/data/courses/react-course-interactive/**/*.ts');

  let totalTests = 0;
  let failedTests = 0;

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const lessons = extractLessons(content);

    for (const lesson of lessons) {
      if (lesson.solution && lesson.testFunction) {
        totalTests++;

        // Run solution through test
        const passed = runTest(lesson.solution, lesson.testFunction);

        if (!passed) {
          console.error(`❌ FAIL: ${file} - Lesson ${lesson.order}`);
          console.error(`   Solution doesn't pass its own test!`);
          failedTests++;
        }
      }
    }
  }

  console.log(`\\n📊 Results: ${totalTests - failedTests}/${totalTests} passing`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

verifyTests();
```

### Step 5: Document Test Standards (1 hour)

Create `/docs/INTERACTIVE_LESSON_TEST_STANDARDS.md`:
```markdown
# Interactive Lesson Test Standards

## Principles
1. Tests should accept any correct solution
2. Tests should reject incorrect solutions
3. Tests should not fail on stylistic differences

## Allowed Test Types

### 1. Code Execution Tests (BEST)
```typescript
testFunction: `
  const { getByText } = render(<Component {...props} />);
  return getByText('Expected Text') !== null;
`
```

### 2. AST Pattern Tests (GOOD)
```typescript
testFunction: `
  const hasCorrectPattern = code.match(/setCount\\s*\\(\\s*prev\\s*=>\\s*prev\\s*\\+\\s*1/);
  return hasCorrectPattern !== null;
`
```

### 3. String Inclusion (AVOID)
Only for checking imports or very specific patterns.

## Anti-Patterns

❌ Exact string matching
❌ Whitespace-sensitive tests
❌ Tests that assume variable names
❌ Tests that require specific formatting
```

---

## Examples

### Before: Broken Test
```typescript
{
  order: 3,
  title: "Updating State",
  instruction: "Increment the likes count when button is clicked",
  starterCode: `...`,
  solution: `setLikes(likes + 1);`,
  testFunction: `code.includes('setLikes') && code.includes('likes + 1')`,
  //  ❌ FAILS if student writes setLikes(likes+1) (no space)
}
```

### After: Fixed Test
```typescript
{
  order: 3,
  title: "Updating State",
  instruction: "Increment the likes count when button is clicked. Use setLikes to update the state.",
  starterCode: `...`,
  solution: `setLikes(likes + 1);`,
  testFunction: `
    // Accept both direct update and functional update
    const hasSetLikes = code.includes('setLikes');
    const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
    return hasSetLikes && hasIncrement !== null;
  `,
  // ✅ PASSES: setLikes(likes + 1), setLikes(likes+1), setLikes(prev => prev + 1)
}
```

---

## Validation Checklist

- [ ] All currency formatting uses `Price: $999` format
- [ ] All solutions updated to match format
- [ ] All instructions clarify $ is required
- [ ] All string matching tests replaced
- [ ] All regex tests are whitespace-tolerant
- [ ] Test verification script passes 100%
- [ ] Test standards documented
- [ ] No breaking changes to working tests

---

## Success Criteria

1. **100% of solutions pass their own tests**
2. **Zero brittle string matching tests**
3. **Consistent currency formatting across all lessons**
4. **Test verification script in CI/CD**
5. **Documentation for future test writing**

---

## Files to Modify

```
src/data/courses/react-course-interactive/
├── phase-1/
│   ├── module-1-2-state-basics.ts (Lines 380-382, 399-401)
├── phase-2/
│   ├── module-2-1-advanced-hooks.ts (Lines 397-399, 500-509)
│   └── module-2-3-performance-optimization.ts (Lines 229, 267-270, 396, 418-423)
scripts/
└── verify-lesson-tests.ts (NEW)
docs/
└── INTERACTIVE_LESSON_TEST_STANDARDS.md (NEW)
```

---

**This PRP is ready for execution by code-validator and test-generator agents.**
