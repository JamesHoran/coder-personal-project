# React Lesson Submission System - Complete Fix Plan

**Created:** 2025-10-30
**Status:** Ready for Execution
**Estimated Time:** 16-20 hours total
**Priority:** CRITICAL - Production Blocker

---

## Overview

This plan addresses the critical bug where React lessons fail with "Cannot use import statement outside a module" and includes comprehensive improvements to the editor experience, testing framework, and data integrity.

**Related Documents:**
- [Bug Report](./REACT_LESSON_SUBMISSION_BUG_REPORT.md)
- [Critical Audit](./REACT_CONSOLIDATION_AUDIT_REPORT.md)

---

## Phase 1: Emergency Critical Fixes (4 hours)

### 1.1: Fix Test Runner Selection (2 hours)

**File:** `/src/components/lessons/InteractiveLessonPlayer.tsx`

**Changes Required:**

```typescript
// BEFORE (Lines 1-10):
import { runTests } from "@/lib/test-runner";

// AFTER:
import { runTests } from "@/lib/test-runner";
import { runReactTests } from "@/lib/react-lesson-test-runner";

// Helper function to select appropriate test runner
function selectTestRunner(language: string) {
  switch(language) {
    case 'jsx':
    case 'tsx':
      return runReactTests;
    case 'typescript':
    case 'javascript':
      return runTests;
    default:
      return runTests;
  }
}
```

**Change in handleRunTests function (Lines 61-80):**

```typescript
// BEFORE:
const results = await runTests(
  userCode,
  currentStep.testCases,
  currentStep.id
);

// AFTER:
const testRunner = selectTestRunner(currentStep.language);
const results = await testRunner(
  userCode,
  currentStep.testCases,
  currentStep.id
);
```

**Testing:**
1. Test react-basics-01 manually
2. Verify TypeScript lessons still work
3. Check 5 random React lessons

**Success Criteria:**
- [ ] React lessons pass with correct code
- [ ] TypeScript lessons unchanged
- [ ] No "Cannot use import statement" errors
- [ ] Database records show passed=1, xpEarned=50

---

### 1.2: Add Server-Side Validation (1.5 hours)

**File:** `/src/app/api/lessons/submit/route.ts`

**Problem:** API blindly trusts client-provided `passed` and `xpEarned` values

**Solution:** Re-run tests server-side before saving

```typescript
// Add to imports
import { runTests } from "@/lib/test-runner";
import { runReactTests } from "@/lib/react-lesson-test-runner";

// Update POST handler (around line 70):
export async function POST(req: Request) {
  const {
    userId,
    lessonId,
    stepId,
    code,
    passed: clientPassed,    // Don't trust this
    testResults: clientTestResults,  // Don't trust this
    xpEarned: clientXpEarned,  // Don't trust this
    attempts,
    language,
  } = await req.json();

  // Get lesson definition to verify XP
  const lesson = getLessonById(lessonId);
  const step = lesson?.steps.find(s => s.id === stepId);

  if (!step) {
    return NextResponse.json(
      { error: "Lesson step not found" },
      { status: 404 }
    );
  }

  // SERVER-SIDE VALIDATION: Re-run tests
  const testRunner = language === 'jsx' || language === 'tsx'
    ? runReactTests
    : runTests;

  const serverTestResults = await testRunner(
    code,
    step.testCases,
    stepId
  );

  // Use server results, not client results
  const actualPassed = serverTestResults.passed;
  const actualXpEarned = actualPassed ? lesson.xpReward : 0;

  // Log discrepancies for security monitoring
  if (clientPassed !== actualPassed) {
    console.warn('[SECURITY] Client/server test mismatch:', {
      userId,
      lessonId,
      clientPassed,
      serverPassed: actualPassed,
      timestamp: new Date().toISOString()
    });
  }

  // Save to database with VALIDATED results
  const submission = await prisma.lessonSubmission.create({
    data: {
      userId: actualUserId,
      lessonId,
      stepId,
      code,
      passed: actualPassed,  // Server-validated
      testResults: JSON.stringify(serverTestResults),  // Server results
      attempts,
      xpEarned: actualXpEarned,  // Server-calculated
      language: language ?? 'typescript',
    },
  });

  return NextResponse.json({
    success: true,
    submission,
    serverValidated: true,
  });
}
```

**Testing:**
1. Submit valid code → should pass
2. Submit invalid code → should fail
3. Try to fake passed=true with bad code → should fail
4. Verify database has correct values

**Success Criteria:**
- [ ] Server re-validates all test results
- [ ] XP cannot be faked
- [ ] Security warnings log discrepancies
- [ ] API returns server-validated results

---

### 1.3: Clean Corrupted Database Records (30 min)

**File:** `prisma/migrations/[timestamp]_mark_corrupted_submissions.sql`

```sql
-- Add validation column
ALTER TABLE LessonSubmission ADD COLUMN isValid BOOLEAN DEFAULT true;
ALTER TABLE LessonSubmission ADD COLUMN invalidReason TEXT;

-- Mark corrupted submissions
UPDATE LessonSubmission
SET
  isValid = false,
  invalidReason = 'Test runner bug: Cannot use import statement outside a module'
WHERE
  testResults LIKE '%Cannot use import statement%'
  AND passed = 0;

-- Create view for analytics (excludes invalid data)
CREATE VIEW ValidLessonSubmissions AS
SELECT * FROM LessonSubmission
WHERE isValid = true;

-- Count affected records
SELECT
  COUNT(*) as total_corrupted,
  COUNT(DISTINCT userId) as affected_users,
  COUNT(DISTINCT lessonId) as affected_lessons
FROM LessonSubmission
WHERE isValid = false;
```

**Run migration:**
```bash
# Apply schema changes
npx prisma migrate dev --name mark_corrupted_submissions

# Verify
sqlite3 prisma/dev.db "SELECT COUNT(*) FROM LessonSubmission WHERE isValid = false;"
# Expected: 9

# List affected users for communication
sqlite3 prisma/dev.db "
  SELECT DISTINCT
    u.email,
    u.name,
    COUNT(ls.id) as corrupted_submissions,
    SUM(CASE WHEN l.xpReward IS NOT NULL THEN l.xpReward ELSE 50 END) as xp_to_restore
  FROM LessonSubmission ls
  JOIN User u ON u.id = ls.userId
  LEFT JOIN (
    -- Get XP from lesson definitions
    SELECT id, 50 as xpReward FROM lessons
  ) l ON l.id = ls.lessonId
  WHERE ls.isValid = false
  GROUP BY u.id;
"
```

**Testing:**
1. Verify 9 records marked invalid
2. Confirm affected users list is correct
3. Calculate XP restoration amounts
4. Test that analytics queries exclude invalid records

**Success Criteria:**
- [ ] Corrupted records marked as invalid
- [ ] Affected users identified
- [ ] XP restoration calculated
- [ ] Analytics exclude bad data

---

## Phase 2: High Priority Improvements (6 hours)

### 2.1: Improve Error Messages (1.5 hours)

**File:** `/src/components/lessons/InteractiveLessonPlayer.tsx`

**Current Error Display (Lines 252-261):**
```tsx
{testResults && !testResults.passed && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Tests Failed</AlertTitle>
    <AlertDescription>
      Please review the test results below and fix your code.
    </AlertDescription>
  </Alert>
)}
```

**Improved Error Display:**
```tsx
{testResults && !testResults.passed && (
  <Alert variant="destructive" className="mb-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Some Tests Didn't Pass</AlertTitle>
    <AlertDescription className="space-y-3">
      <p>Don't worry! Debugging is part of learning. Here's what happened:</p>

      {/* Show specific errors */}
      {testResults.results.map((result, idx) => (
        !result.passed && (
          <div key={idx} className="mt-2 p-3 bg-red-50 dark:bg-red-950/30 rounded">
            <p className="font-semibold text-sm">
              ❌ Test {idx + 1}: {result.description}
            </p>
            {result.errorMessage && (
              <p className="text-xs mt-1 font-mono">
                {formatErrorMessage(result.errorMessage)}
              </p>
            )}
            {result.hint && (
              <p className="text-xs mt-2 text-muted-foreground">
                💡 Hint: {result.hint}
              </p>
            )}
          </div>
        )
      ))}

      {/* Helpful tips */}
      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
        <p className="text-sm font-semibold">Common Fixes:</p>
        <ul className="text-xs mt-1 space-y-1">
          <li>• Check your spelling and capitalization</li>
          <li>• Make sure you're returning the right value</li>
          <li>• Compare your code with the example above</li>
          <li>• Use the hint button if you're stuck</li>
        </ul>
      </div>
    </AlertDescription>
  </Alert>
)}
```

**Add Error Formatter:**
```typescript
function formatErrorMessage(error: string): string {
  // Make common errors more beginner-friendly
  const errorMappings: Record<string, string> = {
    "Cannot use import statement outside a module":
      "There's a problem with our test system (we're fixing it!). Your code might actually be correct.",
    "is not defined":
      "You're using a variable or function that hasn't been created yet. Check for typos!",
    "Unexpected token":
      "There's a syntax error in your code. Check for missing brackets, quotes, or semicolons.",
    "Cannot read property":
      "You're trying to access something that doesn't exist. Make sure the variable is defined first.",
  };

  for (const [pattern, friendly] of Object.entries(errorMappings)) {
    if (error.includes(pattern)) {
      return friendly;
    }
  }

  return error; // Return original if no mapping found
}
```

**Testing:**
1. Submit code with syntax error → see friendly message
2. Submit code with undefined variable → see helpful tip
3. Submit code with logic error → see specific test failure
4. Verify hints display when available

**Success Criteria:**
- [ ] Error messages are beginner-friendly
- [ ] Specific test failures highlighted
- [ ] Helpful tips provided
- [ ] Technical errors translated to plain English

---

### 2.2: Add Loading States & Progress (1.5 hours)

**File:** `/src/components/lessons/InteractiveLessonPlayer.tsx`

**Add State:**
```typescript
const [isRunning, setIsRunning] = useState(false);
const [testProgress, setTestProgress] = useState<{
  current: number;
  total: number;
  currentTest: string;
} | null>(null);
```

**Update handleRunTests:**
```typescript
const handleRunTests = async () => {
  if (!currentStep) return;

  setIsRunning(true);
  setTestResults(null);
  setTestProgress({
    current: 0,
    total: currentStep.testCases.length,
    currentTest: 'Preparing tests...'
  });

  try {
    const userCode = code[currentStep.id] || currentStep.starterCode;
    const testRunner = selectTestRunner(currentStep.language);

    // Run tests with progress updates
    const results = await testRunner(
      userCode,
      currentStep.testCases,
      currentStep.id,
      // Progress callback
      (current: number, testDescription: string) => {
        setTestProgress({
          current,
          total: currentStep.testCases.length,
          currentTest: testDescription
        });
      }
    );

    setTestResults(results);

    // Submit to API
    if (results.passed) {
      setTestProgress({
        current: currentStep.testCases.length,
        total: currentStep.testCases.length,
        currentTest: 'Saving your progress...'
      });

      await fetch('/api/lessons/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'current-user-id',
          lessonId: lesson.id,
          stepId: currentStep.id,
          code: userCode,
          passed: results.passed,
          testResults: results,
          xpEarned: results.passed ? lesson.xpReward : 0,
          attempts: 1,
          language: currentStep.language,
        }),
      });
    }
  } catch (error) {
    console.error('Test execution failed:', error);
    setTestResults({
      passed: false,
      results: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  } finally {
    setIsRunning(false);
    setTestProgress(null);
  }
};
```

**Progress Display:**
```tsx
{isRunning && testProgress && (
  <Card className="mb-4 bg-blue-50 dark:bg-blue-950/30">
    <CardContent className="pt-4">
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Running Tests...</p>
          <p className="text-xs text-muted-foreground">
            {testProgress.currentTest}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono">
            {testProgress.current}/{testProgress.total}
          </p>
        </div>
      </div>
      <Progress
        value={(testProgress.current / testProgress.total) * 100}
        className="mt-2"
      />
    </CardContent>
  </Card>
)}
```

**Testing:**
1. Click "Run Tests" → see progress bar
2. Watch progress update as tests run
3. Verify final state shows completion
4. Test with slow network (should show "Saving...")

**Success Criteria:**
- [ ] Progress bar animates during test execution
- [ ] Current test name displayed
- [ ] Count shows X/Y format
- [ ] "Saving progress" shown after tests pass

---

### 2.3: Add Client-Side Code Validation (1.5 hours)

**File:** `/src/components/lessons/InteractiveLessonPlayer.tsx`

**Add Validation Function:**
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

function validateCode(code: string, language: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if code is empty
  if (!code || code.trim().length === 0) {
    errors.push("Code cannot be empty");
    return { isValid: false, errors, warnings };
  }

  // Language-specific validation
  if (language === 'jsx' || language === 'tsx') {
    // Check for React import
    if (!code.includes('import React')) {
      warnings.push("Missing 'import React from \"react\"' - this might cause issues");
    }

    // Check for export
    if (!code.includes('export default') && !code.includes('export {')) {
      errors.push("Missing export statement - components must be exported");
    }

    // Check for dangerous patterns
    if (code.includes('eval(') || code.includes('Function(')) {
      errors.push("Code contains potentially dangerous functions (eval, Function)");
    }

    // Check for common mistakes
    if (code.includes('class ') && !code.includes('extends')) {
      warnings.push("Using class syntax without extending React.Component - did you mean to use a function?");
    }
  }

  // Check code length
  if (code.length > 50000) {
    errors.push("Code is too long (max 50,000 characters)");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
```

**Update handleRunTests:**
```typescript
const handleRunTests = async () => {
  if (!currentStep) return;

  const userCode = code[currentStep.id] || currentStep.starterCode;

  // Validate before running tests
  const validation = validateCode(userCode, currentStep.language);

  if (!validation.isValid) {
    setTestResults({
      passed: false,
      results: [{
        testId: 'validation',
        description: 'Code Validation',
        passed: false,
        errorMessage: validation.errors.join('\n')
      }]
    });
    return;
  }

  // Show warnings (non-blocking)
  if (validation.warnings.length > 0) {
    setValidationWarnings(validation.warnings);
  }

  // Continue with test execution...
};
```

**Display Warnings:**
```tsx
{validationWarnings.length > 0 && (
  <Alert className="mb-4">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Suggestions</AlertTitle>
    <AlertDescription>
      <ul className="text-sm space-y-1">
        {validationWarnings.map((warning, idx) => (
          <li key={idx}>⚠️ {warning}</li>
        ))}
      </ul>
      <p className="text-xs mt-2 text-muted-foreground">
        These are just suggestions - you can still run tests.
      </p>
    </AlertDescription>
  </Alert>
)}
```

**Testing:**
1. Submit empty code → see validation error
2. Submit code without export → see error
3. Submit code without import → see warning (can still run)
4. Submit valid code → no validation messages

**Success Criteria:**
- [ ] Empty code blocked
- [ ] Missing exports caught
- [ ] Dangerous patterns prevented
- [ ] Warnings shown but non-blocking

---

### 2.4: Track Lesson Completion (1 hour)

**File:** `prisma/schema.prisma`

**Add Model:**
```prisma
model LessonCompletion {
  id          String   @id @default(uuid())
  userId      String
  lessonId    String
  completedAt DateTime @default(now())
  xpEarned    Int
  attempts    Int      @default(1)

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
}
```

**Update API Route:** `/src/app/api/lessons/submit/route.ts`

```typescript
// After successful test validation
if (actualPassed) {
  // Create or update completion record
  await prisma.lessonCompletion.upsert({
    where: {
      userId_lessonId: {
        userId: actualUserId,
        lessonId,
      }
    },
    create: {
      userId: actualUserId,
      lessonId,
      xpEarned: actualXpEarned,
      attempts,
    },
    update: {
      completedAt: new Date(),
      attempts,
    }
  });

  // Update user total XP
  await prisma.user.update({
    where: { id: actualUserId },
    data: {
      totalXP: {
        increment: actualXpEarned
      }
    }
  });
}
```

**Update Lesson Player:** `/src/app/courses/react/lessons/[lessonId]/page.tsx`

```typescript
<InteractiveLessonPlayer
  lesson={lesson}
  onComplete={(xpEarned) => {
    // Show success message
    toast({
      title: "Lesson Complete! 🎉",
      description: `You earned ${xpEarned} XP`,
    });

    // Navigate back after delay
    setTimeout(() => {
      router.push('/courses/react');
    }, 2000);
  }}
/>
```

**Testing:**
1. Complete a lesson → verify LessonCompletion record created
2. Complete same lesson again → verify record updated (not duplicated)
3. Check user totalXP incremented
4. Verify toast notification appears

**Success Criteria:**
- [ ] Completion tracked in database
- [ ] User XP updated correctly
- [ ] No duplicate completion records
- [ ] Success notification displayed

---

### 2.5: Add Timeout Protection (30 min)

**File:** `/src/lib/test-runner.ts` and `/src/lib/react-lesson-test-runner.ts`

**Wrapper Function:**
```typescript
export async function runTestsWithTimeout<T>(
  testFunction: () => Promise<T>,
  timeoutMs: number = 10000
): Promise<T> {
  return Promise.race([
    testFunction(),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Tests took too long to execute (>10s). Check for infinite loops.')), timeoutMs)
    )
  ]);
}
```

**Update Test Runners:**
```typescript
// In test-runner.ts and react-lesson-test-runner.ts
export async function runTests(
  userCode: string,
  testCases: TestCase[],
  stepId: string
): Promise<TestResults> {
  return runTestsWithTimeout(async () => {
    // Existing test execution logic...
  }, 10000); // 10 second timeout
}
```

**Testing:**
1. Submit code with infinite loop → timeout after 10s
2. Submit normal code → no timeout
3. Verify error message is clear

**Success Criteria:**
- [ ] Tests timeout after 10 seconds
- [ ] Clear error message about infinite loops
- [ ] Normal code execution unaffected

---

## Phase 3: Editor Experience Upgrade (4 hours)

### 3.1: Integrate Monaco Editor (2 hours)

**Install Dependencies:**
```bash
pnpm add @monaco-editor/react monaco-editor
```

**Create Monaco Wrapper:** `/src/components/lessons/MonacoCodeEditor.tsx`

```tsx
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  height?: string;
  readOnly?: boolean;
}

export function MonacoCodeEditor({
  value,
  onChange,
  language,
  height = '400px',
  readOnly = false
}: MonacoCodeEditorProps) {
  const { theme } = useTheme();

  // Map our language types to Monaco language IDs
  const monacoLanguage = {
    'jsx': 'javascript',
    'tsx': 'typescript',
    'typescript': 'typescript',
    'javascript': 'javascript',
    'python': 'python',
    'sql': 'sql',
  }[language] || 'javascript';

  return (
    <Editor
      height={height}
      language={monacoLanguage}
      value={value}
      onChange={onChange}
      theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        formatOnPaste: true,
        formatOnType: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        wordWrap: 'on',
      }}
    />
  );
}
```

**Update InteractiveLessonPlayer:**
```tsx
// Replace textarea with Monaco
<MonacoCodeEditor
  value={currentCode}
  onChange={(value) => handleCodeChange(value || '')}
  language={currentStep.language}
  height="500px"
/>
```

**Testing:**
1. Verify syntax highlighting works for JSX
2. Test auto-complete suggestions
3. Check line numbers display
4. Verify dark/light theme switching

**Success Criteria:**
- [ ] Monaco editor loads correctly
- [ ] Syntax highlighting active
- [ ] Auto-complete works
- [ ] Themes switch properly

---

### 3.2: Add Real-Time Syntax Checking (1 hour)

**Update Monaco Configuration:**
```typescript
import { editor } from 'monaco-editor';

// Configure TypeScript compiler for Monaco
editor.setModelLanguage(model, 'typescript');
editor.setModelOptions(model, {
  jsx: editor.JsxEmit.React,
  target: editor.ScriptTarget.ES2020,
  module: editor.ModuleKind.ESNext,
  lib: ['es2020', 'dom'],
  strict: true,
});

// Add React type definitions
fetch('https://unpkg.com/@types/react/index.d.ts')
  .then(res => res.text())
  .then(types => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      types,
      'file:///node_modules/@types/react/index.d.ts'
    );
  });
```

**Add Markers for Errors:**
```typescript
// In MonacoCodeEditor component
useEffect(() => {
  if (!editorRef.current) return;

  const model = editorRef.current.getModel();
  if (!model) return;

  // Listen for validation errors
  const disposable = monaco.editor.onDidChangeMarkers((uris) => {
    const markers = monaco.editor.getModelMarkers({ resource: model.uri });

    // Extract syntax errors
    const syntaxErrors = markers
      .filter(m => m.severity === monaco.MarkerSeverity.Error)
      .map(m => ({
        line: m.startLineNumber,
        message: m.message
      }));

    onSyntaxErrors?.(syntaxErrors);
  });

  return () => disposable.dispose();
}, []);
```

**Display Errors:**
```tsx
{syntaxErrors.length > 0 && (
  <Alert variant="destructive" className="mt-2">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Syntax Errors Detected</AlertTitle>
    <AlertDescription>
      <ul className="text-sm space-y-1">
        {syntaxErrors.map((error, idx) => (
          <li key={idx}>
            Line {error.line}: {error.message}
          </li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
)}
```

**Testing:**
1. Type incomplete code → see red squiggles
2. Hover over error → see error message
3. Fix error → see squiggles disappear
4. Verify doesn't interfere with test execution

**Success Criteria:**
- [ ] Syntax errors highlighted in real-time
- [ ] Error messages displayed on hover
- [ ] Suggestions provided for fixes
- [ ] Doesn't block test execution

---

### 3.3: Add Code Formatting (30 min)

**Install Prettier:**
```bash
pnpm add prettier
```

**Add Format Button:**
```tsx
<Button
  variant="outline"
  size="sm"
  onClick={handleFormatCode}
  disabled={isRunning}
>
  <FileCode className="h-4 w-4 mr-2" />
  Format Code
</Button>
```

**Format Handler:**
```typescript
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserTypescript from 'prettier/parser-typescript';

const handleFormatCode = async () => {
  if (!currentStep) return;

  const userCode = code[currentStep.id] || currentStep.starterCode;

  try {
    const formatted = prettier.format(userCode, {
      parser: currentStep.language === 'tsx' ? 'typescript' : 'babel',
      plugins: [currentStep.language === 'tsx' ? parserTypescript : parserBabel],
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
    });

    handleCodeChange(formatted);

    toast({
      title: "Code Formatted",
      description: "Your code has been automatically formatted",
    });
  } catch (error) {
    toast({
      title: "Format Failed",
      description: "Unable to format code - check for syntax errors",
      variant: "destructive",
    });
  }
};
```

**Testing:**
1. Write messy code → click format → see clean code
2. Write invalid syntax → format fails gracefully
3. Verify formatting preserves functionality

**Success Criteria:**
- [ ] Code formats on button click
- [ ] Formatting uses consistent style
- [ ] Invalid code shows error, doesn't crash
- [ ] Toast notification appears

---

### 3.4: Progressive Hints System (30 min)

**Update Lesson Player State:**
```typescript
const [hintsRevealed, setHintsRevealed] = useState(0);
const [hintPenalty, setHintPenalty] = useState(0);
```

**Hints Display:**
```tsx
{currentStep.hints && currentStep.hints.length > 0 && (
  <Card className="bg-yellow-50 dark:bg-yellow-950/30">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5" />
        Hints Available ({currentStep.hints.length})
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {currentStep.hints.slice(0, hintsRevealed).map((hint, idx) => (
        <div key={idx} className="p-3 bg-white dark:bg-slate-900 rounded">
          <p className="text-sm font-semibold">Hint {idx + 1}:</p>
          <p className="text-sm mt-1">{hint}</p>
        </div>
      ))}

      {hintsRevealed < currentStep.hints.length && (
        <Button
          variant="outline"
          onClick={() => {
            setHintsRevealed(prev => prev + 1);
            setHintPenalty(prev => prev + 5); // -5 XP per hint
          }}
        >
          Reveal Next Hint (-5 XP)
        </Button>
      )}

      {hintPenalty > 0 && (
        <p className="text-xs text-muted-foreground">
          XP Penalty for using hints: -{hintPenalty}
        </p>
      )}
    </CardContent>
  </Card>
)}
```

**Apply Penalty on Submission:**
```typescript
const finalXpEarned = actualPassed
  ? Math.max(0, lesson.xpReward - hintPenalty)
  : 0;
```

**Testing:**
1. Reveal first hint → see hint, see penalty
2. Reveal all hints → can't reveal more
3. Complete lesson with hints → XP reduced
4. Complete without hints → full XP

**Success Criteria:**
- [ ] Hints revealed progressively
- [ ] XP penalty applied per hint
- [ ] Can't reveal more hints than available
- [ ] Database records hint usage

---

## Phase 4: Testing Framework (4 hours)

### 4.1: Create Lesson Smoke Test Suite (2 hours)

**File:** `/tests/lessons/smoke-test.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

// Sample lessons to test (one per module)
const SMOKE_TEST_LESSONS = [
  {
    id: 'react-basics-01',
    language: 'jsx',
    correctCode: `import React from 'react';

function Greeting() {
  return <h1>Welcome to React!</h1>;
}

export default Greeting;`,
    expectedXP: 50,
  },
  {
    id: 'ts-basics-01',
    language: 'typescript',
    correctCode: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

export default greet;`,
    expectedXP: 50,
  },
  // Add more sample lessons...
];

for (const lesson of SMOKE_TEST_LESSONS) {
  test(`Smoke test: ${lesson.id} (${lesson.language})`, async ({ page }) => {
    // Navigate to lesson
    await page.goto(`/courses/react/lessons/${lesson.id}`);

    // Wait for editor to load
    await page.waitForSelector('[data-testid="code-editor"]');

    // Clear starter code and input correct solution
    await page.fill('[data-testid="code-editor"]', lesson.correctCode);

    // Run tests
    await page.click('button:has-text("Run Tests")');

    // Wait for results
    await page.waitForSelector('[data-testid="test-results"]', {
      timeout: 15000,
    });

    // Verify all tests passed
    const passedText = await page.textContent('[data-testid="test-results"]');
    expect(passedText).toContain('All tests passed');

    // Verify XP awarded
    const xpText = await page.textContent('[data-testid="xp-earned"]');
    expect(xpText).toContain(lesson.expectedXP.toString());

    // Check database
    // ... (add database verification)
  });
}
```

**Run Smoke Tests:**
```bash
# Run all smoke tests
pnpm test:smoke

# Run specific language
pnpm test:smoke --grep "jsx"
```

**Success Criteria:**
- [ ] All smoke tests pass
- [ ] React lessons work
- [ ] TypeScript lessons work
- [ ] Database records correct
- [ ] Tests run in < 2 min total

---

### 4.2: Add Integration Test for Submission Flow (1 hour)

**File:** `/tests/lessons/submission-flow.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import { openDatabase } from '../helpers/db';

test.describe('Lesson Submission Flow', () => {
  test('Complete submission flow for React lesson', async ({ page }) => {
    const lessonId = 'react-basics-01';

    // Step 1: Navigate to lesson
    await page.goto(`/courses/react/lessons/${lessonId}`);

    // Step 2: Submit correct code
    const correctCode = `import React from 'react';

function Greeting() {
  return <h1>Welcome to React!</h1>;
}

export default Greeting;`;

    await page.fill('[data-testid="code-editor"]', correctCode);
    await page.click('button:has-text("Run Tests")');

    // Step 3: Verify UI shows success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="xp-earned"]')).toContainText('50');

    // Step 4: Verify database record
    const db = await openDatabase();
    const submission = await db.get(`
      SELECT * FROM LessonSubmission
      WHERE lessonId = ?
      ORDER BY submittedAt DESC
      LIMIT 1
    `, lessonId);

    expect(submission.passed).toBe(1);
    expect(submission.xpEarned).toBe(50);
    expect(submission.code).toContain('function Greeting');

    const testResults = JSON.parse(submission.testResults);
    expect(testResults.passed).toBe(true);
    expect(testResults.results.every(r => r.passed)).toBe(true);

    // Step 5: Verify lesson completion
    const completion = await db.get(`
      SELECT * FROM LessonCompletion
      WHERE lessonId = ? AND userId = ?
    `, lessonId, submission.userId);

    expect(completion).toBeTruthy();
    expect(completion.xpEarned).toBe(50);
  });

  test('Failed submission flow', async ({ page }) => {
    // Test with incorrect code
    // Verify failed state
    // Check database shows passed=false
  });

  test('Multiple attempts tracking', async ({ page }) => {
    // Submit wrong code 3 times
    // Verify attempts increment
    // Submit correct code
    // Verify attempt count is correct
  });
});
```

**Success Criteria:**
- [ ] Full flow test passes
- [ ] Database integration works
- [ ] Multiple attempts tracked
- [ ] Failed submissions handled

---

### 4.3: Add Automated Test for All 164 Lessons (1 hour)

**File:** `/scripts/test-all-lessons.ts`

```typescript
import { getLessonById, allLessons } from '../src/data/courses/react-unified';
import { runReactTests } from '../src/lib/react-lesson-test-runner';
import { runTests } from '../src/lib/test-runner';

async function testAllLessons() {
  console.log(`Testing ${allLessons.length} lessons...\n`);

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    errors: [] as any[],
  };

  for (const lesson of allLessons) {
    for (const step of lesson.steps) {
      results.total++;

      try {
        // Use correct test runner
        const testRunner = step.language === 'jsx' || step.language === 'tsx'
          ? runReactTests
          : runTests;

        // Test with solution code
        const testResults = await testRunner(
          step.solution,
          step.testCases,
          step.id
        );

        if (testResults.passed) {
          results.passed++;
          console.log(`✅ ${lesson.id} - ${step.id}`);
        } else {
          results.failed++;
          results.errors.push({
            lesson: lesson.id,
            step: step.id,
            error: 'Tests failed with solution code',
            details: testResults,
          });
          console.log(`❌ ${lesson.id} - ${step.id}`);
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          lesson: lesson.id,
          step: step.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        console.log(`❌ ${lesson.id} - ${step.id} - ERROR`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`Total Steps: ${results.total}`);
  console.log(`Passed: ${results.passed} (${((results.passed / results.total) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${results.failed} (${((results.failed / results.total) * 100).toFixed(1)}%)`);

  if (results.errors.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.errors.forEach((err, idx) => {
      console.log(`\n${idx + 1}. ${err.lesson} - ${err.step}`);
      console.log(`   ${err.error}`);
    });
  }

  // Exit with error if any failed
  process.exit(results.failed > 0 ? 1 : 0);
}

testAllLessons();
```

**Run Script:**
```bash
# Test all lessons
npx ts-node scripts/test-all-lessons.ts

# Add to package.json
{
  "scripts": {
    "test:lessons": "ts-node scripts/test-all-lessons.ts"
  }
}
```

**Success Criteria:**
- [ ] Script tests all 164 lessons
- [ ] Pass rate > 95%
- [ ] Failed tests reported with details
- [ ] Script exits with error code if failures

---

## Phase 5: Documentation & Communication (2 hours)

### 5.1: Create Fix Documentation (30 min)

✅ Already created:
- `REACT_LESSON_SUBMISSION_BUG_REPORT.md`
- `REACT_LESSON_FIX_PLAN.md` (this file)

**Additional docs needed:**
- Migration guide for affected users
- Developer guide for adding new lessons
- Testing checklist

---

### 5.2: Draft User Communication (30 min)

**File:** `/communications/bug-fix-announcement.md`

```markdown
# React Lessons Now Working!

Hi everyone,

We've fixed a critical bug in our React lesson testing system. Some of you may have experienced issues where your correct code was marked as failed with the error "Cannot use import statement outside a module."

## What Happened

Our lesson player was using the wrong test runner for React lessons, causing all JSX-based lessons to fail regardless of whether your code was correct.

## What We Fixed

- ✅ React lessons now use the correct test runner
- ✅ Import statements work properly
- ✅ Server-side validation prevents cheating
- ✅ Better error messages guide you when stuck
- ✅ Improved code editor with syntax highlighting

## Your XP Has Been Restored

If you were affected by this bug, we've:
- Reviewed your submissions
- Restored XP for correctly solved lessons
- Marked invalid test results in our database

Check your profile to see your updated XP!

## Try It Now

Head over to the React course and give it another try. We're confident you'll have a much better experience!

[Start Learning →](/courses/react)

---

Questions? Reach out to support@example.com

Thank you for your patience!
- The Team
```

---

### 5.3: Create Developer Guide (30 min)

**File:** `/docs/LESSON_DEVELOPMENT_GUIDE.md`

```markdown
# Lesson Development Guide

## Adding a New Lesson

### Step 1: Create Lesson Definition

```typescript
// In appropriate module file
{
  id: "react-basics-XX",
  moduleId: "module-1-1",
  title: "Your Lesson Title",
  order: XX,
  xpReward: 50,
  difficulty: "beginner",
  steps: [
    {
      id: "react-basics-XX-step-1",
      order: 1,
      instruction: `
# Lesson Title

Your instruction here in Markdown...
      `,
      hint: "Helpful hint for stuck students",
      starterCode: `import React from 'react';

// TODO: Your task here
`,
      solution: `import React from 'react';

// Correct solution
`,
      testCases: [
        {
          id: "test-1",
          description: "What this test checks",
          testFunction: `
            const { container } = render(<Component />);
            container.querySelector('h1') !== null
          `,
        },
      ],
      language: "jsx", // or "tsx", "typescript", "javascript"
    }
  ]
}
```

### Step 2: Test Your Lesson

```bash
# Test with solution code
npx ts-node scripts/test-single-lesson.ts react-basics-XX

# Manual test
pnpm dev
# Navigate to /courses/react/lessons/react-basics-XX
# Submit solution code
# Verify all tests pass
```

### Step 3: Add to Test Suite

```typescript
// In tests/lessons/smoke-test.spec.ts
const SMOKE_TEST_LESSONS = [
  // ... existing lessons
  {
    id: 'react-basics-XX',
    language: 'jsx',
    correctCode: `...your solution...`,
    expectedXP: 50,
  },
];
```

## Test Runner Selection

The system automatically selects the correct test runner based on language:

- `jsx` / `tsx` → React Test Runner (handles JSX, imports, React Testing Library)
- `typescript` / `javascript` → Generic Test Runner (no imports, pure functions)
- `python` → Python Test Runner (not implemented)

## Best Practices

1. **Always test with solution code first** - Your solution should pass 100% of tests
2. **Use clear test descriptions** - Students see these messages
3. **Provide progressive hints** - Start vague, get more specific
4. **Keep XP consistent** - Most lessons: 50 XP, Capstones: 300-600 XP
5. **Add helpful error messages** - Transform technical errors into learning opportunities

## Common Pitfalls

❌ **Don't:** Use `new Function()` for React tests
✅ **Do:** Use the React test runner with Testing Library

❌ **Don't:** Assume imports work in all test runners
✅ **Do:** Check language and use appropriate runner

❌ **Don't:** Trust client-side test results
✅ **Do:** Re-validate server-side before awarding XP
```

---

### 5.4: Update Status Page (30 min)

**File:** `/public/status.json`

```json
{
  "status": "operational",
  "incidents": [],
  "resolved": [
    {
      "id": "react-lesson-bug-2025-10-30",
      "title": "React Lesson Submission Issue",
      "severity": "critical",
      "status": "resolved",
      "created": "2025-10-30T00:00:00Z",
      "resolved": "2025-10-30T06:00:00Z",
      "description": "React lessons were failing due to test runner bug. All lessons now working correctly.",
      "affectedServices": ["React Course", "Lesson Submissions"],
      "updates": [
        {
          "time": "2025-10-30T06:00:00Z",
          "status": "resolved",
          "message": "Fix deployed. All React lessons operational. User XP restored."
        },
        {
          "time": "2025-10-30T04:00:00Z",
          "status": "investigating",
          "message": "Identified root cause: wrong test runner being used for React lessons"
        },
        {
          "time": "2025-10-30T00:00:00Z",
          "status": "investigating",
          "message": "Investigating reports of React lesson test failures"
        }
      ]
    }
  ]
}
```

---

## Verification Checklist

### Pre-Deployment
- [ ] All critical fixes merged
- [ ] TypeScript compilation successful
- [ ] All smoke tests passing
- [ ] Integration tests passing
- [ ] Manual testing of 10 random lessons
- [ ] Database migration scripts tested
- [ ] Rollback plan documented

### Post-Deployment (Day 1)
- [ ] Monitor error logs for 2 hours
- [ ] Check submission success rate (should be >70%)
- [ ] Verify no "Cannot use import statement" errors
- [ ] Confirm XP being awarded correctly
- [ ] Check database for new corrupted records (should be 0)

### Post-Deployment (Week 1)
- [ ] User feedback collected
- [ ] Support ticket volume decreased
- [ ] Lesson completion rate improved
- [ ] No regression in TypeScript lessons
- [ ] Analytics show healthy engagement

---

## Rollback Plan

If critical issues arise after deployment:

1. **Immediate Rollback:**
   ```bash
   git revert HEAD
   git push origin main
   pnpm build && pm2 restart all
   ```

2. **Database Rollback:**
   ```bash
   npx prisma migrate reset --to [previous-migration-timestamp]
   ```

3. **Communication:**
   - Update status page to "investigating"
   - Post in community: "Temporary issue, rolling back"
   - Email affected users within 1 hour

4. **Post-Mortem:**
   - Document what went wrong
   - Update testing procedures
   - Add additional safeguards

---

## Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Emergency Fixes | 4 hours | Pending |
| Phase 2: High Priority | 6 hours | Pending |
| Phase 3: Editor Upgrade | 4 hours | Pending |
| Phase 4: Testing Framework | 4 hours | Pending |
| Phase 5: Documentation | 2 hours | In Progress |
| **TOTAL** | **20 hours** | **Not Started** |

---

## Success Metrics

### Technical Metrics
- React lesson pass rate: >70% (currently 0%)
- Test execution time: <5 seconds per lesson
- Server validation: 100% of submissions
- Code editor load time: <2 seconds

### User Metrics
- Lesson completion rate: >60%
- Time to complete first lesson: <10 minutes
- Support tickets about "tests not working": 0
- User satisfaction score: >4.5/5

### Business Metrics
- Student retention week-over-week: +20%
- Course completion rate: +15%
- Referrals from happy students: +25%
- Revenue from React course: Trackable

---

**Plan Created:** 2025-10-30
**Plan Status:** Ready for Execution
**Estimated Completion:** 2-3 days with focused effort
**Priority:** CRITICAL

**Next Step:** Begin Phase 1 - Emergency Critical Fixes

---

This plan can be executed in phases or all at once depending on urgency. The critical fixes (Phase 1) should be deployed immediately, while other improvements can follow in subsequent releases.

Ready to fix? Let's ship it! 🚀
