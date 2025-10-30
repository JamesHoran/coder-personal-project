# Interactive Lesson Test Standards

**Version:** 1.0
**Last Updated:** 2025-10-30
**Purpose:** Guidelines for writing robust, forgiving test cases in the React course interactive lessons

---

## Core Principles

### 1. Tests Should Accept Any Correct Solution
- Students may solve problems in different valid ways
- Don't enforce stylistic preferences (spaces, formatting, variable names)
- Accept both modern and older valid patterns

### 2. Tests Should Reject Incorrect Solutions
- Verify correct behavior, not specific implementation
- Check for required functionality
- Ensure critical patterns are present

### 3. Tests Should Not Fail on Stylistic Differences
- Whitespace-tolerant regex patterns
- Accept both `const` and `let` where appropriate
- Don't require specific variable names unless pedagogically important

---

## Allowed Test Types

### 1. Code Execution Tests (BEST)

**When to use:** When you need to verify component behavior and output.

**Pros:**
- Tests actual functionality
- Catches real bugs
- Most robust against stylistic variations

**Example:**
```typescript
testFunction: `
  const { getByText } = render(<Component {...props} />);
  return getByText('Expected Text') !== null;
`
```

### 2. Pattern Matching Tests (GOOD)

**When to use:** When you need to verify structural patterns in code.

**Pros:**
- Can check for required patterns
- More flexible than string matching
- Can verify code structure

**Requirements:**
- Use whitespace-tolerant regex: `\\s*` for optional spaces
- Accept multiple valid patterns
- Use non-greedy matching: `[\\s\\S]*?`

**Example:**
```typescript
testFunction: `
  // Accept both direct update and functional update patterns
  const hasSetLikes = code.includes('setLikes');
  const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
  return hasSetLikes && hasIncrement !== null;
`
```

### 3. String Inclusion Tests (USE SPARINGLY)

**When to use:** Only for checking imports or very specific required syntax.

**Cons:**
- Brittle
- Fails on stylistic differences
- Hard to maintain

**When acceptable:**
- Checking for imports: `code.includes('import { useState }')`
- Checking for required hooks: `code.includes('useEffect')`
- Checking for specific prop names: `code.includes('onClick=')`

**When NOT acceptable:**
- Checking whitespace-sensitive patterns
- Requiring specific variable names
- Checking exact formatting

---

## Common Patterns

### Currency Formatting

**Standard:** Always use `Price: $999` format (dollar sign included in JSX)

**Solution:**
```jsx
<p>Price: ${product.price}</p>
```

**Test:**
```typescript
testFunction: `
  const { getByText } = render(<Component product={{ price: 999 }} />);
  getByText('Price: $999') !== null
`
```

**Instructions:**
```markdown
Display the price in a <p> with text "Price: $" followed by the price (use \`Price: ${product.price}\` format)
```

### State Updates

**Accept multiple valid patterns:**
- Direct update: `setCount(count + 1)`
- Functional update: `setCount(prev => prev + 1)`
- With/without spaces: `likes+1` or `likes + 1`

**Bad Test:**
```typescript
// ❌ Fails if student uses different spacing
testFunction: `code.includes('likes + 1')`
```

**Good Test:**
```typescript
// ✅ Accepts multiple valid patterns
testFunction: `
  const hasSetLikes = code.includes('setLikes');
  const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
  return hasSetLikes && hasIncrement !== null;
`
```

### Cleanup Functions

**Accept any valid cleanup pattern:**
- Arrow function: `return () => clearInterval(id)`
- Named function: `return function() { clearInterval(id) }`
- Any variable name for the interval ID

**Bad Test:**
```typescript
// ❌ Requires specific variable name
testFunction: `
  const match = code.match(/const\\s+(\\w+)\\s*=\\s*setInterval/);
  match !== null && code.includes(\`clearInterval(\${match[1]})\`)
`
```

**Good Test:**
```typescript
// ✅ Checks structure, not variable names
testFunction: `
  const hasSetInterval = code.includes('setInterval');
  const hasClearInterval = code.includes('clearInterval');
  const hasCleanup = code.match(/return\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*?clearInterval/) ||
                     code.match(/return\\s*function\\s*\\(\\s*\\)[\\s\\S]*?clearInterval/);
  return hasSetInterval && hasClearInterval && hasCleanup !== null;
`
```

### Array Operations

**Accept both bracket notation and template literals:**

```typescript
// All valid:
const items = ["React", "JavaScript"]
const items = ['React', 'JavaScript']
const items = [\`React\`, \`JavaScript\`]
```

**Test:**
```typescript
testFunction: `
  code.includes('React') && code.includes('JavaScript') && code.includes('[')
`
```

---

## Anti-Patterns to Avoid

### ❌ Exact String Matching

```typescript
// Bad: Requires exact spacing
testFunction: `code.includes('setCount(count + 1)')`

// Good: Pattern matching with flexibility
testFunction: `code.match(/setCount\\s*\\(\\s*count\\s*\\+\\s*1/)`
```

### ❌ Whitespace-Sensitive Tests

```typescript
// Bad: Fails on formatting differences
testFunction: `code.includes('{ name: "Alice" }')`

// Good: Checks for presence of key components
testFunction: `code.includes('name:') && code.includes('"Alice"')`
```

### ❌ Variable Name Requirements (Unless Pedagogically Important)

```typescript
// Bad: Requires specific variable name
testFunction: `code.includes('const interval =')`

// Good: Checks pattern exists
testFunction: `code.match(/const\\s+\\w+\\s*=\\s*setInterval/)`
```

### ❌ Format-Specific Tests

```typescript
// Bad: Requires specific quote style
testFunction: `code.includes('"React"')`

// Good: Accepts any quote style
testFunction: `code.includes('React')`
```

---

## Regex Patterns Reference

### Whitespace Tolerance

- `\\s*` - Zero or more whitespace characters
- `\\s+` - One or more whitespace characters
- `[\\s\\S]*?` - Any characters (including newlines), non-greedy

### Common Patterns

**Function call with optional spacing:**
```regex
functionName\\s*\\(\\s*arg1\\s*,\\s*arg2\\s*\\)
```

**Variable declaration (const or let):**
```regex
(const|let)\\s+variableName\\s*=
```

**Arrow function:**
```regex
\\(\\s*param\\s*\\)\\s*=>\\s*
```

**JSX element:**
```regex
<\\s*ElementName[\\s\\S]*?>
```

---

## Test Writing Checklist

Before committing a new test, verify:

- [ ] Does it pass with the provided solution?
- [ ] Does it pass with common valid alternatives?
  - [ ] Functional vs. direct state updates?
  - [ ] Single vs. double quotes?
  - [ ] `const` vs. `let` (where appropriate)?
  - [ ] Different spacing/formatting?
- [ ] Does it fail on incorrect solutions?
- [ ] Is the test description clear and accurate?
- [ ] Are regex patterns properly escaped?
- [ ] Is this the simplest test that could work?

---

## Migration Guide

### Updating Existing Brittle Tests

1. **Identify the test pattern:**
   - String matching: `code.includes('exact string')`
   - Variable name matching: `code.includes('const interval =')`

2. **Determine what behavior to verify:**
   - What is the student actually supposed to learn?
   - What patterns demonstrate understanding?

3. **Rewrite with flexibility:**
   - Use regex for structural matching
   - Accept multiple valid patterns
   - Focus on required behavior, not style

4. **Test the test:**
   - Run solution through test
   - Try valid alternatives
   - Verify failures on wrong code

### Example Migration

**Before:**
```typescript
{
  id: "test-6",
  description: "Should update likes",
  testFunction: `code.includes('setLikes(likes + 1)')`,
}
```

**After:**
```typescript
{
  id: "test-6",
  description: "Should update likes state using setLikes",
  testFunction: `
    // Accept both direct and functional updates
    const hasSetLikes = code.includes('setLikes');
    const hasIncrement = code.match(/setLikes\\s*\\(\\s*(likes\\s*\\+\\s*1|prev\\s*=>\\s*prev\\s*\\+\\s*1)/);
    return hasSetLikes && hasIncrement !== null;
  `,
}
```

---

## Testing Best Practices

### 1. Layer Your Tests

Don't try to check everything in one test. Use multiple focused tests:

```typescript
// Test 1: Check hook is used
testFunction: `code.includes('useEffect')`

// Test 2: Check dependency array
testFunction: `code.includes('[]')`

// Test 3: Check cleanup exists
testFunction: `code.includes('return') && code.includes('clearInterval')`

// Test 4: Verify behavior
testFunction: `
  const { getByText } = render(<Timer />);
  getByText('Timer: 0s') !== null
`
```

### 2. Provide Helpful Error Messages

Test descriptions should help students understand what's wrong:

```typescript
// Bad: Vague
description: "Should work correctly"

// Good: Specific
description: "Should store interval ID in a variable and cleanup properly"
```

### 3. Comment Your Tests

Complex tests should include comments explaining the logic:

```typescript
testFunction: `
  // Check that setInterval is assigned to a variable
  const hasSetInterval = code.includes('setInterval');
  const hasClearInterval = code.includes('clearInterval');

  // Check that cleanup function exists with clearInterval
  const hasCleanup = code.match(/return\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*?clearInterval/);

  return hasSetInterval && hasClearInterval && hasCleanup !== null;
`
```

---

## FAQ

### Q: When should I use code execution tests vs. pattern matching?

**A:** Use code execution tests when possible. They're more robust and test actual functionality. Use pattern matching only when:
- You need to verify code structure (not just output)
- The behavior can't be tested in isolation
- You're checking for required patterns (like cleanup functions)

### Q: How strict should I be about student code?

**A:** Be strict about correctness, lenient about style. If multiple approaches are equally valid, accept them all.

### Q: What if students use advanced patterns we haven't taught yet?

**A:** Accept them! If a student uses `useMemo` before we teach it, that's great. Don't restrict creativity.

### Q: Should I test for edge cases?

**A:** Not in basic lessons. Focus on the primary learning objective. Edge case handling can be taught in advanced lessons.

---

## Conclusion

Good tests are:
1. **Forgiving** - Accept valid alternatives
2. **Clear** - Students understand what's expected
3. **Focused** - Test one thing at a time
4. **Robust** - Don't break on style changes

Remember: The goal is to verify understanding, not enforce a specific coding style.

---

**Questions or Issues?**

If you find a test that seems too brittle or encounters edge cases, document it and create a fix following these guidelines.
