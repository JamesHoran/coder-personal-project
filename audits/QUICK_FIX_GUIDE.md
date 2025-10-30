# Quick Fix Guide: React Lesson Testing System

**Status:** CRITICAL BUG - System is broken  
**Time to Fix:** 10 minutes  
**Files to Modify:** 1 file, 3 lines

---

## The Bug

**SyntaxError: Unexpected token '<'** occurs when transpilation fails silently.

**Root Cause:** Line 41 in `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts` does not validate `result.success`.

---

## The Fix

### File: `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`

**Current Code (lines 35-42):**
```typescript
async function transpileJSX(code: string): Promise<string> {
  const response = await fetch('/api/transpile-jsx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Transpilation failed: ${error.details || error.error}`);
  }

  const result = await response.json();
  return result.data.code;  // ❌ BUG HERE
}
```

**Fixed Code:**
```typescript
async function transpileJSX(code: string): Promise<string> {
  const response = await fetch('/api/transpile-jsx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Transpilation failed: ${error.details || error.error}`);
  }

  const result = await response.json();
  
  // ✅ ADD THESE 3 LINES
  if (!result.success) {
    throw new Error(`Transpilation failed: ${result.details || result.error || 'Unknown error'}`);
  }
  
  return result.data.code;
}
```

---

## Testing the Fix

1. Make the change above
2. Start dev server: `pnpm dev`
3. Navigate to a React lesson
4. Write some JSX code
5. Click "Run Tests"
6. Should work now!

---

## Next Steps (After Fix)

**Priority 1 - HIGH (Next Sprint):**
- Fix BUG-002: Return error details to UI (better UX)
- Fix BUG-003: Add code safety validation (prevent infinite loops)

**Priority 2 - MEDIUM (Future):**
- Wire up or remove `validateCode()` function
- Standardize error handling
- Add transpilation caching

**Priority 3 - LOW (Nice to Have):**
- Move execution to Web Workers
- Add source maps
- Add telemetry

---

## Full Details

See: `/home/coder/coder-personal-project/audits/REACT_LESSON_TEST_SYSTEM_CRITICAL_AUDIT.md`

---

**Last Updated:** 2025-10-30  
**Severity:** CRITICAL  
**Fix Time:** 10 minutes  
**Test Time:** 5 minutes  
