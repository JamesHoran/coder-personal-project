# Index Key Fixes Required - Quick Reference

**Status:** 4 occurrences need fixing
**Priority:** MUST FIX before shipping
**Estimated Time:** 30 minutes

---

## Files to Fix

### 1. Module 2-1: Advanced Hooks
**File:** `/home/coder/coder-personal-project/src/data/courses/react-course-interactive/phase-2/module-2-1-advanced-hooks.ts`

**Location:** Line 970 (Lesson 6: useEffect Best Practices - SearchBox component)

**Current Code:**
```typescript
<ul>
  {results.map((result, index) => (
    <li key={index}>{result}</li>
  ))}
</ul>
```

**Fix Option 1 (Recommended):** Use stable IDs
```typescript
// In useEffect, when setting results:
setResults([`result-${searchTerm}-0`, `result-${searchTerm}-1`, ...]);

// In render:
<ul>
  {results.map((result) => (
    <li key={result}>{result}</li>  // Use result string itself as key
  ))}
</ul>
```

**Fix Option 2:** Add exception comment
```typescript
<ul>
  {results.map((result, index) => (
    // Exception: Index key acceptable here because results reset completely
    // on each search, never reorder, and have no stateful children
    <li key={index}>{result}</li>
  ))}
</ul>
```

---

### 2. Module 2-3: Performance Optimization (Two occurrences)

**File:** `/home/coder/coder-personal-project/src/data/courses/react-course-interactive/phase-2/module-2-3-performance-optimization.ts`

#### Occurrence 1: Line 996

**Context:** Example showing inefficient rendering

**Current Code:**
```typescript
<ul>
  {items.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
```

**Fix:** Change to use item itself as key (if unique strings) or add IDs
```typescript
<ul>
  {items.map((item) => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

#### Occurrence 2: Line 2364

**Context:** Performance anti-pattern example

**Current Code:**
```typescript
{items.map((item, index) => <Item key={index} data={item} />)}
```

**Fix:** If this is showing WRONG code, add clear comment:
```typescript
// ❌ Anti-pattern: Using index as key causes performance issues
{items.map((item, index) => <Item key={index} data={item} />)}

// ✅ Correct: Use stable IDs
{items.map((item) => <Item key={item.id} data={item} />)}
```

---

### 3. Module 3-2: TypeScript with React (Two occurrences)

**File:** `/home/coder/coder-personal-project/src/data/courses/react-course-interactive/phase-3/module-3-2-typescript-react.ts`

#### Occurrence 1: Line 844

**Context:** Generic list rendering

**Current Code:**
```typescript
<li key={index}>{renderItem(item)}</li>
```

**Fix:**
```typescript
// If items have IDs:
<li key={item.id}>{renderItem(item)}</li>

// If generic with no IDs, use constraint:
interface ListItem {
  id: string | number;
  // ...other props
}

<li key={item.id}>{renderItem(item)}</li>
```

#### Occurrence 2: Line 939

**Context:** Table column headers

**Current Code:**
```typescript
<th key={index}>{column.label}</th>
```

**Fix:** Add id to column type
```typescript
interface Column {
  id: string;
  label: string;
  // ...
}

<th key={column.id}>{column.label}</th>
```

---

## Exception Case (No Fix Needed)

### Module 1-2: State Basics - Lesson 10
**File:** `/home/coder/coder-personal-project/src/data/courses/react-course-interactive/phase-1/module-1-2-state-basics.ts`

**Location:** Line 1373

**Current Code:**
```typescript
{counters.map((count, index) => (
  <li key={index}>
    Counter: {count}
    <button onClick={() => incrementCounter(index)}>+</button>
  </li>
))}
```

**Status:** ✅ ACCEPTABLE (with warning comment added)

**Reason:**
- Counters are identical primitives (no unique ID possible)
- List never reorders
- Teaching state updates, not list management

**Required Fix:** Add clear warning comment
```typescript
{counters.map((count, index) => (
  // Exception: Index key acceptable here because:
  // - Counters are identical values (no unique IDs)
  // - List never reorders
  // - Focus is on state updates, not list operations
  <li key={index}>
    Counter: {count}
    <button onClick={() => incrementCounter(index)}>+</button>
  </li>
))}
```

---

## Verification After Fixes

Run this grep command to verify all fixed:

```bash
grep -rn "key={index}" src/data/courses/react-course-interactive/ \
  | grep -v "// Exception:" \
  | grep -v "❌" \
  | grep -v "test-" \
  | grep -v ".backup"
```

**Expected output:** Only these acceptable cases:
1. Module 1-2, Lesson 10 (with exception comment)
2. Module 1-5 examples showing WRONG code (with ❌ markers)
3. Test functions checking `!code.includes('key={index}')`

---

## Quick Fix Script

```bash
# Navigate to repo root
cd /home/coder/coder-personal-project

# Create backup of current state
cp src/data/courses/react-course-interactive/phase-2/module-2-1-advanced-hooks.ts \
   src/data/courses/react-course-interactive/phase-2/module-2-1-advanced-hooks.ts.pre-fix

# Apply fixes manually (use your editor)
# Then verify:
npm run lint
npm test
```

---

## Summary

**Total Occurrences:** 4 in production code + 1 needs comment
**Blocking Ship:** YES
**Time to Fix:** 30 minutes
**Difficulty:** LOW (straightforward refactor)

**After fixing:** Run Round 3 audit to verify clean.
