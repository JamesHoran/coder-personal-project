# Product Requirements Plan: React Lesson Test Runner Bug Fix

**Document Type:** Product Requirements Plan (PRP)  
**Date Created:** 2025-10-30  
**Priority:** CRITICAL (P0)  
**Estimated Effort:** 8-12 hours  
**Target Completion:** Within 1 sprint  

---

## Executive Summary

The React lesson testing system has a **critical bug** causing `SyntaxError: Unexpected token '<'` when users submit JSX code for testing. The root cause is **missing validation** in the `transpileJSX()` function that allows untranspiled JSX code to reach the `new Function()` constructor.

**Impact:**
- 🚨 **100% of React lessons are broken** - Users cannot complete any interactive React lessons
- 📉 **Poor user experience** - Cryptic error messages instead of helpful feedback
- 🔒 **Security concerns** - Unsafe code execution without proper validation

**Root Cause:** The transpilation API can return `{ success: false }` with HTTP 200 status, but `transpileJSX()` blindly returns the response data without checking the `success` field.

---

## Problem Analysis

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│ User writes JSX in InteractiveLessonPlayer                              │
│   Example: <h1>Welcome to React!</h1>                                   │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ handleRunTests() → runAllTests() → compileUserCode()                    │
│   Location: InteractiveLessonPlayer.tsx:74                              │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ transpileJSX(code) → POST /api/transpile-jsx                            │
│   Location: react-lesson-test-runner.ts:28                              │
│   ❌ BUG HERE: Missing success validation (line 41)                     │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ SWC transformSync() → Returns transpiled CommonJS code                  │
│   Location: /api/transpile-jsx/route.ts:21                              │
│   Returns: { success: true/false, data: { code: "..." } }               │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ transpileJSX returns result.data.code (NO VALIDATION)                   │
│   ❌ If success: false, returns ORIGINAL JSX with < tokens              │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ compileUserCode wraps code and calls new Function()                     │
│   Location: react-lesson-test-runner.ts:71                              │
│   💥 CRASH: SyntaxError: Unexpected token '<'                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Failure Scenario

**When transpilation fails:**
1. User submits JSX: `<h1>Welcome to React!</h1>`
2. SWC transpilation fails (syntax error, unsupported feature, etc.)
3. API returns: `{ success: false, error: "...", data: { code: "<h1>..." } }`
4. `transpileJSX()` at line 41 returns `result.data.code` **WITHOUT checking `result.success`**
5. Original JSX (with `<` tokens) reaches `new Function()` at line 71
6. JavaScript engine crashes: **SyntaxError: Unexpected token '<'**
7. User sees cryptic error instead of helpful transpilation error message

---

## Existing Audit Findings

Reference: `/home/coder/coder-personal-project/audits/REACT_LESSON_TEST_SYSTEM_CRITICAL_AUDIT.md`

### Critical Issues

#### BUG-001: Missing Transpilation Success Validation (CRITICAL)
- **Location:** `/src/lib/react-lesson-test-runner.ts:28-48`
- **Line:** 41
- **Severity:** CRITICAL
- **Priority:** P0

#### BUG-002: Silent Error Swallowing (HIGH)
- **Location:** `/src/lib/react-lesson-test-runner.ts:92-96`
- **Line:** 93-94
- **Severity:** HIGH
- **Priority:** P1

#### BUG-003: Unsafe Code Execution (HIGH)
- **Location:** `/src/lib/react-lesson-test-runner.ts:71`
- **Severity:** HIGH (Security)
- **Priority:** P1

#### BUG-004: No Input Validation (MEDIUM)
- **Location:** `/src/lib/react-lesson-test-runner.ts:54`
- **Severity:** MEDIUM
- **Priority:** P2

#### BUG-005: validateCode() Never Used (MEDIUM)
- **Location:** `/src/lib/react-lesson-test-runner.ts:280-318`
- **Severity:** MEDIUM
- **Priority:** P2

#### BUG-006: Inconsistent Error Handling (MEDIUM)
- **Location:** Multiple locations
- **Severity:** MEDIUM
- **Priority:** P2

---

## Implementation Plan

### Phase 1: Critical Fixes (P0) - MUST DO IMMEDIATELY

**Estimated Time:** 2-3 hours

#### Fix 1.1: Add Transpilation Success Validation

**File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`  
**Lines:** 28-48  
**Function:** `transpileJSX()`

**Current Code (BROKEN):**
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
  return result.data.code;  // ❌ NO VALIDATION!
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
  
  // ✅ ADD: Validate transpilation success
  if (!result.success) {
    throw new Error(`Transpilation failed: ${result.details || result.error || 'Unknown error'}`);
  }
  
  return result.data.code;
}
```

**Changes:**
- Add 3 lines after line 40 (after `const result = await response.json();`)
- Validate `result.success` field
- Throw descriptive error if `success: false`

**Validation:**
```bash
# Test with invalid JSX
curl -X POST http://localhost:3000/api/transpile-jsx \
  -H "Content-Type: application/json" \
  -d '{"code": "<<<invalid>>>"}'
  
# Should return error with details, not crash with SyntaxError
```

---

### Phase 2: High Priority Fixes (P1) - MUST DO THIS SPRINT

**Estimated Time:** 4-6 hours

#### Fix 2.1: Return Error Details to User

**File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`  
**Lines:** 54-97  
**Function:** `compileUserCode()`

**Current Code (POOR UX):**
```typescript
export async function compileUserCode(code: string): Promise<React.ComponentType<any> | null> {
  try {
    const transpiledCode = await transpileJSX(code);
    // ... compilation logic ...
    return component;
  } catch (error) {
    console.error('Code compilation error:', error);
    return null;  // ❌ Error details lost!
  }
}
```

**Fixed Code:**
```typescript
// New return type with error details
export async function compileUserCode(code: string): Promise<{
  component: React.ComponentType<any> | null;
  error?: string;
}> {
  try {
    const transpiledCode = await transpileJSX(code);
    
    // Step 2: Create safe evaluation context
    const wrappedCode = `
      ${transpiledCode}

      // Return the default export or the last declared component
      if (typeof module !== 'undefined' && module.exports) {
        return module.exports.default || module.exports;
      }
    `;

    // Step 3: Execute transpiled code with React context
    const compiledFunction = new Function('React', 'require', 'exports', 'module', wrappedCode);

    // Mock module system
    const mockModule = { exports: {} };
    const mockExports = mockModule.exports;
    const mockRequire = (name: string) => {
      if (name === 'react') return React;
      throw new Error(`Cannot require '${name}' in sandbox`);
    };

    // Execute the compiled code
    const result = compiledFunction(React, mockRequire, mockExports, mockModule);

    // Extract the component
    const component = result || (mockModule.exports as any).default || mockExports;

    if (typeof component === 'function') {
      return { component };
    }

    return { 
      component: null, 
      error: 'Code did not export a valid React component. Make sure you have "export default ComponentName" in your code.' 
    };
  } catch (error) {
    console.error('Code compilation error:', error);
    
    // ✅ Return error details to user
    return {
      component: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
```

**Impact on Callers:**

This requires updating the following locations:

1. **File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`
   **Function:** `runAllTests()` (lines 232-275)
   
   **Current:**
   ```typescript
   let component: React.ComponentType<any> | null = null;
   let compilationError: string | null = null;

   try {
     component = await compileUserCode(userCode);
   } catch (error) {
     compilationError = error instanceof Error ? error.message : String(error);
   }
   ```
   
   **Fixed:**
   ```typescript
   let component: React.ComponentType<any> | null = null;
   let compilationError: string | null = null;

   // compileUserCode now returns { component, error? }
   const compilationResult = await compileUserCode(userCode);
   component = compilationResult.component;
   compilationError = compilationResult.error || null;
   ```

2. **File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`
   **Function:** `executeTestCase()` (lines 102-147)
   
   **Current:**
   ```typescript
   if (!component) {
     component = await compileUserCode(userCode);
   }
   ```
   
   **Fixed:**
   ```typescript
   if (!component) {
     const result = await compileUserCode(userCode);
     component = result.component;
     
     // If compilation failed, return error immediately
     if (!component && result.error) {
       return {
         testId: testCase.id,
         description: testCase.description,
         passed: false,
         errorMessage: result.error,
       };
     }
   }
   ```

#### Fix 2.2: Add Code Safety Validation

**File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`  
**Location:** Add before `compileUserCode()` function  

**New Function:**
```typescript
/**
 * Validate code for safety and security issues
 */
function validateCodeSafety(code: string): { safe: boolean; reason?: string } {
  // Size limit (prevent memory exhaustion)
  if (code.length > 50000) {
    return { safe: false, reason: 'Code exceeds maximum size (50KB). Please write more concise code.' };
  }
  
  // Minimum size check
  if (!code || code.trim().length < 10) {
    return { safe: false, reason: 'Code is too short. Write a complete React component.' };
  }
  
  // Detect obvious infinite loops
  if (/while\s*\(\s*true\s*\)/.test(code)) {
    return { safe: false, reason: 'Infinite loops (while(true)) are not allowed.' };
  }
  
  if (/for\s*\(\s*;\s*;\s*\)/.test(code)) {
    return { safe: false, reason: 'Infinite loops (for(;;)) are not allowed.' };
  }
  
  // Detect dangerous patterns
  const dangerousPatterns = [
    { pattern: /\beval\s*\(/, message: 'eval() is not allowed for security reasons' },
    { pattern: /\bFunction\s*\(/, message: 'Function() constructor is not allowed for security reasons' },
    { pattern: /\bsetTimeout|setInterval\b/, message: 'setTimeout/setInterval are not allowed in lessons' },
    { pattern: /\bfetch|XMLHttpRequest\b/, message: 'Network requests are not allowed in lessons' },
    { pattern: /\blocalStorage|sessionStorage\b/, message: 'Web Storage APIs are not allowed in lessons' },
  ];
  
  for (const { pattern, message } of dangerousPatterns) {
    if (pattern.test(code)) {
      return { safe: false, reason: message };
    }
  }
  
  return { safe: true };
}
```

**Integration in compileUserCode():**
```typescript
export async function compileUserCode(code: string): Promise<{
  component: React.ComponentType<any> | null;
  error?: string;
}> {
  // ✅ ADD: Validate safety FIRST
  const safetyCheck = validateCodeSafety(code);
  if (!safetyCheck.safe) {
    return { 
      component: null, 
      error: safetyCheck.reason 
    };
  }
  
  try {
    const transpiledCode = await transpileJSX(code);
    // ... rest of compilation
  } catch (error) {
    // ... error handling
  }
}
```

---

### Phase 3: Medium Priority Improvements (P2) - NICE TO HAVE

**Estimated Time:** 2-4 hours

#### Fix 3.1: Use or Remove validateCode() Function

**File:** `/home/coder/coder-personal-project/src/lib/react-lesson-test-runner.ts`  
**Lines:** 280-318

**Option A: Use It (Recommended)**
```typescript
export async function compileUserCode(code: string): Promise<{
  component: React.ComponentType<any> | null;
  error?: string;
}> {
  // Safety check
  const safetyCheck = validateCodeSafety(code);
  if (!safetyCheck.safe) {
    return { component: null, error: safetyCheck.reason };
  }
  
  // ✅ USE: Pre-transpilation validation
  const validation = validateCode(code);
  if (!validation.valid) {
    return { 
      component: null, 
      error: `Validation errors: ${validation.errors.join('; ')}` 
    };
  }
  
  // Show warnings but don't block
  if (validation.warnings.length > 0) {
    console.warn('Code validation warnings:', validation.warnings);
  }
  
  try {
    const transpiledCode = await transpileJSX(code);
    // ... rest
  }
}
```

**Option B: Remove It (If Not Needed)**
```typescript
// Delete lines 280-318 entirely
```

#### Fix 3.2: Standardize Error Handling

**Goal:** Use consistent Result pattern across all functions

**New Type:**
```typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

**Apply to all async functions:**
- `transpileJSX()` → `Promise<Result<string>>`
- `compileUserCode()` → `Promise<Result<React.ComponentType<any>>>`
- `executeTestCase()` → `Promise<Result<TestCaseResult>>`

**Priority:** P2 (refactoring, not critical)

---

### Phase 4: Testing & Validation

**Estimated Time:** 2-3 hours

#### Test Plan

1. **Unit Tests for transpileJSX()**
   ```typescript
   describe('transpileJSX', () => {
     it('should throw error if API returns success:false', async () => {
       global.fetch = jest.fn().mockResolvedValue({
         ok: true,
         json: async () => ({
           success: false,
           error: 'Syntax error at line 5',
         }),
       });

       await expect(transpileJSX('invalid code')).rejects.toThrow(
         'Transpilation failed: Syntax error at line 5'
       );
     });

     it('should return transpiled code on success', async () => {
       global.fetch = jest.fn().mockResolvedValue({
         ok: true,
         json: async () => ({
           success: true,
           data: { code: 'var x = 1;' },
         }),
       });

       const result = await transpileJSX('const x = 1;');
       expect(result).toBe('var x = 1;');
     });
   });
   ```

2. **Unit Tests for compileUserCode()**
   ```typescript
   describe('compileUserCode', () => {
     it('should reject code exceeding size limit', async () => {
       const hugeCode = 'x'.repeat(60000);
       const result = await compileUserCode(hugeCode);
       
       expect(result.component).toBeNull();
       expect(result.error).toContain('exceeds maximum size');
     });

     it('should reject dangerous patterns', async () => {
       const dangerousCode = 'eval("alert(1)")';
       const result = await compileUserCode(dangerousCode);
       
       expect(result.component).toBeNull();
       expect(result.error).toContain('eval() is not allowed');
     });

     it('should compile valid React component', async () => {
       const validCode = `
         import React from 'react';
         function Greeting() { return <h1>Hello</h1>; }
         export default Greeting;
       `;
       
       const result = await compileUserCode(validCode);
       expect(result.component).toBeDefined();
       expect(result.error).toBeUndefined();
     });
   });
   ```

3. **Integration Test: Full Flow**
   ```typescript
   describe('React Lesson Test Runner - E2E', () => {
     it('should successfully test valid React component', async () => {
       const userCode = `
         import React from 'react';
         function Greeting() { return <h1>Welcome to React!</h1>; }
         export default Greeting;
       `;
       
       const testCases = [
         {
           id: 'test-1',
           description: 'Component should render h1',
           testFunction: `
             const { container } = render(<Component />);
             container.querySelector('h1') !== null
           `
         }
       ];
       
       const result = await runAllTests(userCode, testCases, 'test-step');
       
       expect(result.passed).toBe(true);
       expect(result.results[0].passed).toBe(true);
     });

     it('should show helpful error for invalid JSX', async () => {
       const invalidCode = '<h1>Unclosed tag';
       
       const result = await runAllTests(invalidCode, [], 'test-step');
       
       expect(result.passed).toBe(false);
       expect(result.results[0].errorMessage).toContain('Transpilation failed');
     });
   });
   ```

4. **Manual Testing Checklist**
   - [ ] Open React lesson in browser
   - [ ] Submit valid JSX → Tests pass ✅
   - [ ] Submit JSX with syntax error → Clear error message ✅
   - [ ] Submit code with infinite loop → Rejected with clear message ✅
   - [ ] Submit code with eval() → Rejected with clear message ✅
   - [ ] Submit empty code → Clear error message ✅
   - [ ] Complete full lesson → XP awarded ✅

---

## File Modification Summary

### Files to Modify

| File | Lines | Changes | Priority |
|------|-------|---------|----------|
| `/src/lib/react-lesson-test-runner.ts` | 28-48 | Add success validation in `transpileJSX()` | P0 |
| `/src/lib/react-lesson-test-runner.ts` | 54-97 | Change return type, return error details | P1 |
| `/src/lib/react-lesson-test-runner.ts` | 102-147 | Update `executeTestCase()` to handle new return type | P1 |
| `/src/lib/react-lesson-test-runner.ts` | 232-275 | Update `runAllTests()` to handle new return type | P1 |
| `/src/lib/react-lesson-test-runner.ts` | Before line 54 | Add `validateCodeSafety()` function | P1 |
| `/src/lib/react-lesson-test-runner.ts` | 280-318 | Wire up or remove `validateCode()` | P2 |

### Test Files to Create

| File | Purpose | Priority |
|------|---------|----------|
| `/src/lib/__tests__/react-lesson-test-runner.test.ts` | Unit tests | P0 |
| `/src/lib/__tests__/transpileJSX.test.ts` | Transpilation tests | P1 |
| `/src/__tests__/e2e/react-lesson-flow.test.tsx` | E2E tests | P2 |

---

## Success Criteria

### Phase 1 (P0) - CRITICAL
✅ **Definition of Done:**
- [ ] `transpileJSX()` validates `result.success` field
- [ ] Invalid JSX throws descriptive error (not `SyntaxError: Unexpected token '<'`)
- [ ] At least 1 React lesson works end-to-end in browser
- [ ] Unit test for BUG-001 passes

**Validation Command:**
```bash
npm run test -- react-lesson-test-runner
# All tests should pass
```

### Phase 2 (P1) - HIGH PRIORITY
✅ **Definition of Done:**
- [ ] `compileUserCode()` returns `{ component, error? }` type
- [ ] Error messages shown to users in UI (not just console)
- [ ] Code safety validation rejects dangerous patterns
- [ ] Size limits enforced (50KB max)
- [ ] All callers updated to handle new return type
- [ ] Integration tests pass

**Validation Command:**
```bash
# Test in browser
1. Open http://localhost:3000/courses/react/projects/react-basics-01
2. Submit code with eval() → Should show error in UI
3. Submit huge code → Should show size limit error
4. Submit invalid JSX → Should show transpilation error details
```

### Phase 3 (P2) - NICE TO HAVE
✅ **Definition of Done:**
- [ ] `validateCode()` either used or removed
- [ ] Error handling patterns consistent across codebase
- [ ] Code quality improved (fewer `any` types)
- [ ] E2E tests cover full lesson flow

---

## Rollback Plan

If fixes cause regressions:

1. **Immediate Rollback (< 5 minutes):**
   ```bash
   git revert HEAD
   git push origin react-course-consolidation
   ```

2. **Partial Rollback:**
   - Revert only Phase 2 changes (error handling)
   - Keep Phase 1 critical fix (success validation)

3. **Emergency Hotfix:**
   - If production is broken, deploy minimal fix:
   ```typescript
   // Quick fix: Just add success validation
   if (!result.success) {
     throw new Error(result.error || 'Transpilation failed');
   }
   ```

---

## Risk Assessment

### High Risks

**Risk 1: Breaking Existing Tests**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Run full test suite before deployment
- **Contingency:** Fix tests or rollback

**Risk 2: Performance Regression**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:** Add validation is fast (<1ms overhead)
- **Contingency:** Profile and optimize

**Risk 3: Unforeseen Edge Cases**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Comprehensive test suite, gradual rollout
- **Contingency:** Add more specific validations

### Low Risks

**Risk 4: Type Changes Breaking Other Code**
- **Probability:** Low (TypeScript will catch)
- **Impact:** Low
- **Mitigation:** TypeScript compiler errors
- **Contingency:** Fix compilation errors

---

## Dependencies

### Required Before Starting
- [ ] Access to codebase
- [ ] Node.js environment (v18+)
- [ ] pnpm installed
- [ ] SWC installed (`@swc/core` in package.json)
- [ ] React Testing Library installed

### Blocks
- None (can start immediately)

### Blocked By
- None

---

## Timeline Estimate

| Phase | Tasks | Time | Owner |
|-------|-------|------|-------|
| **Phase 1 (P0)** | Fix transpilation validation | 2-3 hours | Developer |
| **Phase 2 (P1)** | Error handling + safety validation | 4-6 hours | Developer |
| **Phase 3 (P2)** | Code cleanup + consistency | 2-4 hours | Developer |
| **Testing** | Write and run tests | 2-3 hours | Developer |
| **Code Review** | Review + feedback | 1-2 hours | Team |
| **Deployment** | Deploy to staging/production | 1 hour | DevOps |
| **Total** | | **12-19 hours** | ~2 days |

---

## Monitoring & Verification

After deployment, monitor:

1. **Error Rates**
   - Track `transpilation_error` events
   - Track `code_compilation_error` events
   - Alert if error rate > 5%

2. **Performance Metrics**
   - Transpilation API latency (<200ms)
   - Code compilation time (<50ms)
   - Full test execution (<500ms)

3. **User Experience**
   - Lesson completion rate
   - Time to complete lessons
   - User feedback/bug reports

4. **Logs to Add**
   ```typescript
   // In transpileJSX()
   if (!result.success) {
     console.error('Transpilation failed:', {
       codeLength: code.length,
       error: result.error,
       timestamp: Date.now()
     });
   }

   // In validateCodeSafety()
   if (!safe) {
     console.warn('Code validation failed:', {
       reason,
       codeLength: code.length,
       timestamp: Date.now()
     });
   }
   ```

---

## Additional Notes

### Why This Matters

- **User Impact:** ~100+ React lessons currently broken
- **Business Impact:** Users cannot complete React course → poor retention
- **Technical Debt:** Security issues (unsafe code execution) must be addressed

### Related Issues

- See audit: `/audits/REACT_LESSON_TEST_SYSTEM_CRITICAL_AUDIT.md`
- See test evidence: `test-transpile-failure.mjs`
- See bug reproduction: `comprehensive-bug-test.mjs`

### Future Enhancements (Out of Scope)

- Move code execution to Web Workers (true sandboxing)
- Add source maps for debugging
- Add AI-powered error suggestions
- Add transpilation caching
- Add execution timeout enforcement

---

## Approval

**Reviewed By:**  
- [ ] Engineering Lead
- [ ] Product Manager
- [ ] QA Lead

**Approved By:**  
- [ ] CTO / Engineering Director

**Deployment Approval:**  
- [ ] Staging: ______________ (Date)
- [ ] Production: ______________ (Date)

---

**Document End**

*This PRP is a living document. Update as implementation progresses.*
