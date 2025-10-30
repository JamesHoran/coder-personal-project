# PRP: Add Cleanup Patterns to React Course

**Priority:** CRITICAL (Priority 1)
**Estimated Time:** 8 hours
**Agent:** course-content-creator
**Audit Finding:** Issue #5 - Missing cleanup in async effects teaches buggy patterns

---

## Context

The React course data fetching examples are missing critical cleanup patterns. This teaches students to ship code with:
1. Memory leaks (timeouts not cleared)
2. Race conditions (old requests completing after new ones)
3. Setting state on unmounted components

This is a **COMMON real-world bug** that causes production issues.

**File Affected:**
- `/src/data/courses/react-course-interactive/phase-2/module-2-1-advanced-hooks.ts`

---

## Requirements

### Functional Requirements

1. **Add Cleanup to Data Fetching Lesson (Lesson 4)**
   - Show the bug first (no cleanup)
   - Explain what goes wrong
   - Show the fix (cancellation flag)
   - Test correct cleanup implementation

2. **Add New Lesson: Race Conditions in useEffect**
   - Demonstrate the race condition bug
   - Show real-world impact
   - Teach cleanup pattern
   - Add interactive exercise

3. **Update Existing Cleanup Lesson**
   - Add section on stale closures
   - Explain why `prev => prev + 1` is needed
   - Show the bug with `setSeconds(seconds + 1)`

### Technical Requirements

- Follow existing lesson format
- Add proper test cases
- Include visual explanations
- Show before/after code examples
- Must be beginner-friendly

---

## Implementation Plan

### Step 1: Fix Data Fetching Lesson (Lines 500-509) - 2 hours

**Current Code (BUGGY):**
```javascript
useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setUser({
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    });
    setLoading(false);
  }, 500);
}, [userId]);
```

**Issues:**
1. No cleanup when userId changes mid-fetch
2. Sets state after unmount
3. Old request might complete after new one

**Fixed Code:**
```javascript
useEffect(() => {
  let cancelled = false;
  setLoading(true);

  setTimeout(() => {
    if (!cancelled) {
      setUser({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      });
      setLoading(false);
    }
  }, 500);

  return () => {
    cancelled = true;
  };
}, [userId]);
```

**Instruction to Add:**
```markdown
### Why Cleanup Matters

Without cleanup, if `userId` changes before the timeout completes:
1. ❌ Old timeout still runs (memory leak)
2. ❌ Sets state for wrong user (race condition)
3. ❌ May set state after component unmounts (React warning)

The cleanup function prevents these bugs by cancelling the pending operation.
```

### Step 2: Add New Lesson - Race Conditions (4 hours)

Insert after current Lesson 4 (becomes new Lesson 5):

```typescript
{
  order: 5,
  title: "Preventing Race Conditions",
  description: "Learn how to handle race conditions in async effects",
  concepts: ["Race conditions", "Cleanup functions", "Async operations"],
  difficulty: "intermediate" as const,
  estimatedTime: 15,
  xp: 200,

  instruction: `
# Race Conditions in useEffect

A **race condition** occurs when the order of async operations affects the final result incorrectly.

## The Problem

\`\`\`jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Simulate API call
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);

  return <div>{results.map(r => <p key={r.id}>{r.title}</p>)}</div>;
}
\`\`\`

**What goes wrong:**
1. User types "react" → Request A starts
2. User types "redux" → Request B starts
3. Request B completes → Shows Redux results ✅
4. Request A completes → Shows React results ❌

**Result:** UI shows results for "react" but search box says "redux"!

## The Solution

Use a cleanup function to ignore outdated results:

\`\`\`jsx
useEffect(() => {
  let cancelled = false;

  fetch(\`/api/search?q=\${query}\`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {  // Only update if still relevant
        setResults(data);
      }
    });

  return () => {
    cancelled = true;  // Mark as cancelled
  };
}, [query]);
\`\`\`

Now old requests are ignored!

## Your Task

Fix the \`ProductFetcher\` component to prevent race conditions when \`productId\` changes rapidly.

**Requirements:**
1. Add a \`cancelled\` flag
2. Only set state if not cancelled
3. Return cleanup function that sets \`cancelled = true\`
  `,

  starterCode: `
import { useState, useEffect } from 'react';

function ProductFetcher({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Simulate API call (500ms delay)
    setTimeout(() => {
      setProduct({
        id: productId,
        name: \`Product \${productId}\`,
        price: productId * 10
      });
      setLoading(false);
    }, 500);
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: \${product.price}</p>
    </div>
  );
}

export default ProductFetcher;
  `,

  solution: `
import { useState, useEffect } from 'react';

function ProductFetcher({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;  // Cleanup flag
    setLoading(true);

    setTimeout(() => {
      if (!cancelled) {  // Only update if not cancelled
        setProduct({
          id: productId,
          name: \`Product \${productId}\`,
          price: productId * 10
        });
        setLoading(false);
      }
    }, 500);

    return () => {
      cancelled = true;  // Cancel on cleanup
    };
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: \${product.price}</p>
    </div>
  );
}

export default ProductFetcher;
  `,

  testFunction: `
    // Check for cancelled flag
    const hasCancelledFlag = code.match(/let\\s+cancelled\\s*=\\s*false/);
    // Check for conditional state update
    const hasConditionalUpdate = code.match(/if\\s*\\(\\s*!cancelled\\s*\\)/);
    // Check for cleanup return
    const hasCleanup = code.match(/return\\s*\\(\\s*\\)\\s*=>\\s*\\{[\\s\\S]*cancelled\\s*=\\s*true/);

    return hasCancelledFlag && hasConditionalUpdate && hasCleanup;
  `,

  hints: [
    "Add a let cancelled = false before the timeout",
    "Wrap setState calls in if (!cancelled) { ... }",
    "Return a cleanup function that sets cancelled = true"
  ]
}
```

### Step 3: Update Cleanup Lesson - Add Stale Closure Warning (2 hours)

In existing Lesson 3 (Cleanup Functions), add after line 293:

```typescript
instruction: `
# Cleanup Functions in useEffect

... [existing content] ...

## ⚠️ Warning: Stale Closures

When using state in setInterval, you might encounter stale closures:

\`\`\`jsx
// ❌ WRONG - Stale closure bug
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(seconds + 1);  // 'seconds' is always 0!
  }, 1000);

  return () => clearInterval(interval);
}, []);
\`\`\`

**Why it breaks:**
- \`seconds\` is captured from initial render (0)
- setInterval keeps referencing that old value
- Timer increments 0 + 1 = 1 forever

**Solution: Functional Updates**

\`\`\`jsx
// ✅ CORRECT - Use functional update
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);  // Uses current value!
  }, 1000);

  return () => clearInterval(interval);
}, []);
\`\`\`

Now \`prev\` is always the current state value.

**Rule of thumb:**
- Timers/intervals: Use functional updates (\`prev => prev + 1\`)
- Event handlers: Either works (handlers re-create each render)
- Effects with dependencies: Add to dependency array OR use functional updates
`
```

---

## Examples

### Example 1: Race Condition Demo

```jsx
// Before: Buggy code
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);

// After: With cleanup
useEffect(() => {
  let cancelled = false;

  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) setUser(data);
    });

  return () => { cancelled = true; };
}, [userId]);
```

### Example 2: AbortController (Advanced Pattern)

Add as bonus content in hints:

```jsx
// Modern approach with AbortController
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, {
    signal: controller.signal
  })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => {
      if (err.name === 'AbortError') {
        // Request was cancelled, ignore
      } else {
        console.error(err);
      }
    });

  return () => {
    controller.abort();
  };
}, [userId]);
```

---

## Validation Checklist

- [ ] Data fetching lesson updated with cleanup
- [ ] New race condition lesson added
- [ ] Stale closure warning added to cleanup lesson
- [ ] All code examples tested
- [ ] Test functions verify correct patterns
- [ ] Hints are helpful but not giving away answer
- [ ] Instructions are beginner-friendly
- [ ] XP values appropriate (150-200 per lesson)

---

## Success Criteria

1. **Students learn to prevent race conditions**
2. **All async examples include cleanup**
3. **Stale closure bug explained clearly**
4. **Interactive exercises reinforce learning**
5. **Test cases verify correct cleanup**

---

## Files to Modify

```
src/data/courses/react-course-interactive/phase-2/
└── module-2-1-advanced-hooks.ts
    ├── Lesson 3 (Lines 280-405) - Add stale closure warning
    ├── Lesson 4 (Lines 500-509) - Fix data fetching cleanup
    └── NEW Lesson 5 - Race conditions (insert after current Lesson 4)
```

---

**This PRP is ready for execution by the course-content-creator agent.**
