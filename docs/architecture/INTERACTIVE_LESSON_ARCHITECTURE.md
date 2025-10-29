# Interactive Lesson System - Technical Architecture

**Purpose:** Define a reusable framework for creating interactive coding lessons across all courses
**Version:** 1.0
**Date:** 2025-10-29
**Status:** Production-Ready Blueprint

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Core Architecture](#core-architecture)
3. [Database Schema](#database-schema)
4. [Component Architecture](#component-architecture)
5. [Test Runner System](#test-runner-system)
6. [API Endpoints](#api-endpoints)
7. [State Management](#state-management)
8. [Code Editor Integration](#code-editor-integration)
9. [Progress Tracking](#progress-tracking)
10. [Deployment Architecture](#deployment-architecture)

---

## System Overview

### Design Goals

1. **Framework Agnostic:** Support lessons for any language/framework (React, TypeScript, Python, SQL, etc.)
2. **Reusable Components:** One lesson player component works for all lesson types
3. **Extensible Testing:** Plugin-based test runners for different languages
4. **Real-time Feedback:** Instant test results as users code
5. **Progressive Disclosure:** Hints and help available when needed
6. **Offline Capable:** Code runs in browser when possible
7. **Scalable:** Handle thousands of concurrent users

### High-Level Flow

```
User navigates to lesson
    ↓
System loads lesson metadata + seed code
    ↓
User writes/modifies code in editor
    ↓
User clicks "Run Tests" (or auto-runs)
    ↓
Test runner executes all tests
    ↓
Results displayed with pass/fail indicators
    ↓
If all pass: Award XP, unlock next lesson
    ↓
Progress saved to database
```

---

## Core Architecture

### Technology Stack

```typescript
// Frontend
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- TailwindCSS
- Zustand (state management)

// Code Editor
- Monaco Editor (VS Code editor in browser)
  OR
- CodeMirror 6 (lightweight alternative)

// Test Runners
- Jest (JavaScript/React)
- Vitest (faster alternative)
- Python: Pyodide (Python in browser)
- SQL: sql.js (SQLite in browser)

// Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Redis (caching, rate limiting)

// Testing Infrastructure
- React Testing Library
- @testing-library/user-event
- DOM Testing Library

// Code Execution
- WebContainers (Sandboxed Node.js in browser) - StackBlitz
  OR
- Web Workers (for isolated execution)
  OR
- Server-side execution with Docker containers
```

---

## Database Schema

### Complete Prisma Schema for Lessons

```prisma
// ============================================
// LESSON SYSTEM SCHEMA
// ============================================

model Course {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  description String?
  thumbnail   String?
  difficulty  String   // beginner, intermediate, advanced
  totalXP     Int      @default(0)
  totalLessons Int     @default(0)
  estimatedHours Float

  phases      Phase[]
  enrollments Enrollment[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
}

model Phase {
  id          String   @id @default(uuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  title       String
  description String?
  order       Int      // 1, 2, 3 for Novice, Practitioner, Expert
  level       String   // novice, practitioner, expert

  modules     Module[]

  @@unique([courseId, order])
  @@index([courseId])
}

model Module {
  id          String   @id @default(uuid())
  phaseId     String
  phase       Phase    @relation(fields: [phaseId], references: [id], onDelete: Cascade)

  slug        String
  title       String
  description String?
  order       Int
  xpReward    Int

  lessons     Lesson[]
  projects    Project[]
  challenges  Challenge[]

  @@unique([phaseId, order])
  @@index([phaseId])
  @@index([slug])
}

// ============================================
// INTERACTIVE LESSON MODEL
// ============================================

model Lesson {
  id              String   @id @default(uuid())
  moduleId        String
  module          Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  // Metadata
  slug            String   @unique
  title           String
  description     String   @db.Text
  instructions    String   @db.Text

  // Difficulty & Rewards
  difficulty      String   // beginner, intermediate, advanced
  xpReward        Int
  estimatedMinutes Int     @default(5)

  // Lesson Content
  lessonType      String   // interactive, video, reading, quiz
  language        String   // react, typescript, python, sql, bash

  // Code Content (stored as JSON)
  seedCode        Json     // { "App.jsx": "code here", "styles.css": "..." }
  solutionCode    Json     // Same structure as seedCode
  starterFiles    Json?    // Additional files needed (readonly)

  // Tests (stored as JSON array)
  tests           Json     // Array of test objects

  // Learning Aids
  hints           Json?    // Array of hint strings
  resources       Json?    // Array of { title, url, type }
  prerequisites   String[] // Array of lesson IDs
  tags            String[] // For search/filtering

  // Ordering
  order           Int

  // Tracking
  completions     LessonProgress[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([moduleId, order])
  @@index([moduleId])
  @@index([slug])
  @@index([language])
  @@index([difficulty])
}

// ============================================
// TEST SCHEMA
// ============================================

// Tests are stored as JSON in Lesson.tests
// Structure:
// {
//   "tests": [
//     {
//       "id": "test-1",
//       "text": "The component should render",
//       "testString": "assert(component.exists())",
//       "testType": "assertion | regex | dom-query | custom",
//       "points": 20,  // Partial credit
//       "required": true,  // Must pass to complete lesson
//       "hint": "Optional hint for this specific test"
//     }
//   ]
// }

// ============================================
// PROGRESS TRACKING
// ============================================

model LessonProgress {
  id              String   @id @default(uuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId        String
  lesson          Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  // Progress Data
  status          String   // not_started, in_progress, completed
  completed       Boolean  @default(false)

  // Attempt Tracking
  attempts        Int      @default(0)
  hintsUsed       Int      @default(0)
  testsPassedCount Int     @default(0)
  totalTests      Int

  // Code Submission
  submittedCode   Json?    // The code that passed all tests

  // Time Tracking
  timeSpentSeconds Int     @default(0)
  startedAt       DateTime @default(now())
  completedAt     DateTime?
  lastAttemptAt   DateTime @default(now())

  // Rewards
  xpEarned        Int      @default(0)
  badgesUnlocked  String[] // Badge IDs unlocked by this lesson

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([userId, lessonId])
  @@index([userId])
  @@index([lessonId])
  @@index([status])
}

// ============================================
// CHALLENGE & PROJECT MODELS (Similar structure)
// ============================================

model Challenge {
  id              String   @id @default(uuid())
  moduleId        String
  module          Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  title           String
  description     String   @db.Text
  difficulty      String
  xpReward        Int

  // Same lesson structure
  language        String
  seedCode        Json
  solutionCode    Json
  tests           Json
  hints           Json?

  order           Int

  completions     ChallengeProgress[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([moduleId])
}

model Project {
  id              String   @id @default(uuid())
  moduleId        String
  module          Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)

  title           String
  description     String   @db.Text
  requirements    Json     // Array of deliverables
  xpReward        Int

  // Projects are more open-ended
  seedCode        Json?
  starterFiles    Json?
  rubric          Json?    // Grading criteria

  order           Int

  submissions     ProjectSubmission[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([moduleId])
}

// ============================================
// SUPPORTING MODELS
// ============================================

model ChallengeProgress {
  id              String   @id @default(uuid())
  userId          String
  challengeId     String
  challenge       Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)

  completed       Boolean  @default(false)
  attempts        Int      @default(0)
  submittedCode   Json?
  xpEarned        Int      @default(0)

  completedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([userId, challengeId])
}

model ProjectSubmission {
  id              String   @id @default(uuid())
  userId          String
  projectId       String
  project         Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  submittedFiles  Json     // All files submitted
  description     String?  @db.Text

  status          String   // submitted, in_review, approved, changes_requested
  grade           Float?   // 0-100
  feedback        String?  @db.Text

  xpEarned        Int      @default(0)

  submittedAt     DateTime @default(now())
  reviewedAt      DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId])
  @@index([projectId])
  @@index([status])
}
```

---

## Component Architecture

### Component Hierarchy

```
<InteractiveLessonPage>                  // Route: /lessons/[lessonId]
  ├─ <LessonHeader>                      // Title, XP, difficulty
  │   ├─ <ProgressIndicator>             // X of Y tests passing
  │   ├─ <TimerDisplay>                  // Time spent
  │   └─ <HintButton>                    // Reveal hints
  │
  ├─ <LessonLayout>                      // Split pane layout
  │   │
  │   ├─ <LeftPane>                      // Instructions
  │   │   ├─ <LessonDescription>         // Markdown content
  │   │   ├─ <InstructionsPanel>         // What to do
  │   │   ├─ <TestChecklist>             // List of tests
  │   │   │   └─ <TestItem>              // Individual test
  │   │   ├─ <HintsPanel>                // Collapsible hints
  │   │   └─ <ResourcesPanel>            // Links to docs
  │   │
  │   └─ <RightPane>                     // Code editor
  │       ├─ <CodeEditorTabs>            // File tabs
  │       ├─ <MonacoEditor>              // The editor
  │       ├─ <EditorToolbar>             // Reset, format, etc.
  │       └─ <TestOutputPanel>           // Test results
  │
  └─ <LessonFooter>                      // Actions
      ├─ <RunTestsButton>                // Primary action
      ├─ <ResetCodeButton>               // Restore seed code
      ├─ <PreviousLessonButton>          // Navigation
      └─ <NextLessonButton>              // Navigation
```

### Core Components

#### 1. InteractiveLessonPage (Main Container)

```typescript
// src/app/lessons/[lessonId]/page.tsx
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLessonStore } from '@/stores/lessonStore';
import { LessonLayout } from '@/components/lessons/LessonLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function InteractiveLessonPage() {
  const params = useParams();
  const { lesson, loadLesson, isLoading } = useLessonStore();

  useEffect(() => {
    loadLesson(params.lessonId as string);
  }, [params.lessonId, loadLesson]);

  if (isLoading) return <LoadingSpinner />;
  if (!lesson) return <div>Lesson not found</div>;

  return <LessonLayout lesson={lesson} />;
}
```

#### 2. LessonLayout (Split Pane)

```typescript
// src/components/lessons/LessonLayout.tsx
'use client';

import { useState } from 'react';
import { ResizablePanels } from '@/components/ui/ResizablePanels';
import { InstructionsPane } from './InstructionsPane';
import { EditorPane } from './EditorPane';
import { LessonHeader } from './LessonHeader';
import { LessonFooter } from './LessonFooter';

interface LessonLayoutProps {
  lesson: Lesson;
}

export function LessonLayout({ lesson }: LessonLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(40); // 40% initial

  return (
    <div className="flex flex-col h-screen">
      <LessonHeader lesson={lesson} />

      <ResizablePanels
        leftWidth={leftWidth}
        onResize={setLeftWidth}
        leftPane={<InstructionsPane lesson={lesson} />}
        rightPane={<EditorPane lesson={lesson} />}
      />

      <LessonFooter lesson={lesson} />
    </div>
  );
}
```

#### 3. MonacoEditor Wrapper

```typescript
// src/components/lessons/CodeEditor.tsx
'use client';

import { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { useLessonStore } from '@/stores/lessonStore';

interface CodeEditorProps {
  file: string;  // Current file being edited
  language: string;  // jsx, typescript, python, sql
  theme?: string;
}

export function CodeEditor({ file, language, theme = 'vs-dark' }: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const { currentCode, updateCode } = useLessonStore();

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 2,
    });

    // Add custom keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Run tests on Cmd+Enter
      runTests();
    });
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      updateCode(file, value);
    }
  }

  return (
    <Editor
      height="100%"
      language={language}
      theme={theme}
      value={currentCode[file] || ''}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      options={{
        automaticLayout: true,
      }}
    />
  );
}
```

#### 4. TestRunner Component

```typescript
// src/components/lessons/TestRunner.tsx
'use client';

import { useState } from 'react';
import { useLessonStore } from '@/stores/lessonStore';
import { runTests } from '@/lib/testRunners';
import { Button } from '@/components/ui/button';
import { TestResults } from './TestResults';

export function TestRunner() {
  const { lesson, currentCode, tests, updateTestResults } = useLessonStore();
  const [isRunning, setIsRunning] = useState(false);

  async function handleRunTests() {
    setIsRunning(true);

    try {
      // Run tests based on lesson language
      const results = await runTests({
        language: lesson.language,
        code: currentCode,
        tests: lesson.tests,
        solutionCode: lesson.solutionCode,
      });

      updateTestResults(results);

      // Check if all tests passed
      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        // Award XP and mark complete
        await completeLesson(lesson.id, lesson.xpReward);
      }
    } catch (error) {
      console.error('Test execution error:', error);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleRunTests}
        disabled={isRunning}
        className="w-full"
      >
        {isRunning ? 'Running Tests...' : 'Run Tests'}
      </Button>

      {tests && <TestResults results={tests} />}
    </div>
  );
}
```

#### 5. TestResults Display

```typescript
// src/components/lessons/TestResults.tsx
'use client';

import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface TestResult {
  id: string;
  text: string;
  passed: boolean;
  message?: string;
  executionTime?: number;
}

interface TestResultsProps {
  results: TestResult[];
}

export function TestResults({ results }: TestResultsProps) {
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Test Results</h3>
        <span className={allPassed ? 'text-green-600' : 'text-yellow-600'}>
          {passedCount} / {totalCount} passing
        </span>
      </div>

      <div className="space-y-2">
        {results.map((result) => (
          <div
            key={result.id}
            className={`p-3 rounded-lg border ${
              result.passed
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-2">
              {result.passed ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}

              <div className="flex-1">
                <p className="font-medium">{result.text}</p>

                {result.message && (
                  <p className="text-sm text-gray-600 mt-1">
                    {result.message}
                  </p>
                )}

                {result.executionTime && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{result.executionTime}ms</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-800 font-semibold">
            🎉 All tests passed! Great job!
          </p>
        </div>
      )}
    </div>
  );
}
```

---

## Test Runner System

### Plugin Architecture

```typescript
// src/lib/testRunners/index.ts

import { ReactTestRunner } from './reactTestRunner';
import { TypeScriptTestRunner } from './typescriptTestRunner';
import { PythonTestRunner } from './pythonTestRunner';
import { SQLTestRunner } from './sqlTestRunner';

export interface TestRunnerOptions {
  language: string;
  code: Record<string, string>;  // File map
  tests: Test[];
  solutionCode?: Record<string, string>;
}

export interface TestResult {
  id: string;
  text: string;
  passed: boolean;
  message?: string;
  executionTime?: number;
  error?: string;
}

const runners = {
  react: ReactTestRunner,
  typescript: TypeScriptTestRunner,
  javascript: TypeScriptTestRunner,
  python: PythonTestRunner,
  sql: SQLTestRunner,
};

export async function runTests(options: TestRunnerOptions): Promise<TestResult[]> {
  const runner = runners[options.language];

  if (!runner) {
    throw new Error(`No test runner found for language: ${options.language}`);
  }

  return runner.run(options);
}
```

### React Test Runner

```typescript
// src/lib/testRunners/reactTestRunner.ts

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createElement } from 'react';
import * as Babel from '@babel/standalone';

export class ReactTestRunner {
  static async run(options: TestRunnerOptions): Promise<TestResult[]> {
    const results: TestResult[] = [];

    // Transpile JSX to JavaScript
    const transpiledCode = Babel.transform(options.code['App.jsx'], {
      presets: ['react', 'typescript'],
    }).code;

    // Create component from code string
    const Component = this.createComponentFromCode(transpiledCode);

    // Run each test
    for (const test of options.tests) {
      const startTime = Date.now();

      try {
        // Render component for testing
        const { container, ...utils } = render(createElement(Component));

        // Execute test
        const passed = await this.executeTest(test, {
          container,
          ...utils,
          code: options.code['App.jsx'],
        });

        results.push({
          id: test.id,
          text: test.text,
          passed,
          executionTime: Date.now() - startTime,
        });
      } catch (error) {
        results.push({
          id: test.id,
          text: test.text,
          passed: false,
          message: error.message,
          executionTime: Date.now() - startTime,
          error: error.stack,
        });
      }
    }

    return results;
  }

  private static createComponentFromCode(code: string): React.ComponentType {
    // Create a function from code string
    // This is a simplified version - production would use WebContainers
    const componentFunction = new Function(
      'React',
      'useState',
      'useEffect',
      `
        ${code}
        return App;
      `
    );

    return componentFunction(
      React,
      React.useState,
      React.useEffect
    );
  }

  private static async executeTest(
    test: Test,
    context: any
  ): Promise<boolean> {
    // Create test execution context
    const testFunction = new Function(
      'assert',
      'screen',
      'fireEvent',
      'waitFor',
      'container',
      'code',
      test.testString
    );

    // Execute test
    const assert = (condition: boolean, message?: string) => {
      if (!condition) throw new Error(message || 'Assertion failed');
    };

    try {
      await testFunction(
        assert,
        screen,
        fireEvent,
        waitFor,
        context.container,
        context.code
      );
      return true;
    } catch {
      return false;
    }
  }
}
```

### Python Test Runner (using Pyodide)

```typescript
// src/lib/testRunners/pythonTestRunner.ts

import { loadPyodide, PyodideInterface } from 'pyodide';

export class PythonTestRunner {
  private static pyodide: PyodideInterface | null = null;

  static async initialize() {
    if (!this.pyodide) {
      this.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
    }
  }

  static async run(options: TestRunnerOptions): Promise<TestResult[]> {
    await this.initialize();

    const results: TestResult[] = [];
    const pyodide = this.pyodide!;

    // Load user code into Python environment
    pyodide.runPython(options.code['main.py']);

    // Run each test
    for (const test of options.tests) {
      const startTime = Date.now();

      try {
        // Execute test code
        const result = pyodide.runPython(test.testString);

        results.push({
          id: test.id,
          text: test.text,
          passed: Boolean(result),
          executionTime: Date.now() - startTime,
        });
      } catch (error) {
        results.push({
          id: test.id,
          text: test.text,
          passed: false,
          message: error.message,
          executionTime: Date.now() - startTime,
        });
      }
    }

    return results;
  }
}
```

---

## API Endpoints

### Lesson Management

```typescript
// GET /api/lessons/[lessonId]
// Returns lesson data with seed code and tests

// POST /api/lessons/[lessonId]/submit
// Submits code and runs tests server-side (if needed)

// POST /api/lessons/[lessonId]/complete
// Marks lesson as complete, awards XP

// GET /api/lessons/[lessonId]/progress
// Gets user's progress on this lesson

// POST /api/lessons/[lessonId]/hint
// Unlocks a hint (tracks hint usage)
```

### Implementation Examples

```typescript
// src/app/api/lessons/[lessonId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.lessonId },
      include: {
        module: {
          include: {
            phase: {
              include: {
                course: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Get user progress if authenticated
    const session = await getServerSession();
    let progress = null;

    if (session?.user?.id) {
      progress = await prisma.lessonProgress.findUnique({
        where: {
          userId_lessonId: {
            userId: session.user.id,
            lessonId: lesson.id,
          },
        },
      });
    }

    return NextResponse.json({
      lesson,
      progress,
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```typescript
// src/app/api/lessons/[lessonId]/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { submittedCode, testsPassedCount, totalTests, timeSpentSeconds } = body;

  try {
    // Get lesson details
    const lesson = await prisma.lesson.findUnique({
      where: { id: params.lessonId },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Update or create progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lesson.id,
        },
      },
      update: {
        completed: true,
        status: 'completed',
        submittedCode,
        testsPassedCount,
        totalTests,
        timeSpentSeconds,
        xpEarned: lesson.xpReward,
        completedAt: new Date(),
        lastAttemptAt: new Date(),
        attempts: {
          increment: 1,
        },
      },
      create: {
        userId: session.user.id,
        lessonId: lesson.id,
        completed: true,
        status: 'completed',
        submittedCode,
        testsPassedCount,
        totalTests,
        timeSpentSeconds,
        xpEarned: lesson.xpReward,
        completedAt: new Date(),
        attempts: 1,
      },
    });

    // Update user's total XP
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalXP: {
          increment: lesson.xpReward,
        },
      },
    });

    // Check for achievements/badges
    const unlockedBadges = await checkForUnlockedBadges(
      session.user.id,
      lesson.id
    );

    return NextResponse.json({
      success: true,
      progress,
      xpEarned: lesson.xpReward,
      unlockedBadges,
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## State Management

### Zustand Store for Lessons

```typescript
// src/stores/lessonStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonStore {
  // Current lesson
  lesson: Lesson | null;
  isLoading: boolean;

  // Code state
  currentCode: Record<string, string>;  // File map
  originalSeedCode: Record<string, string>;

  // Test state
  tests: TestResult[] | null;
  allTestsPassed: boolean;

  // UI state
  activeFile: string;
  hintsRevealed: number;
  showHints: boolean;

  // Timer
  startTime: number | null;
  elapsedSeconds: number;

  // Actions
  loadLesson: (lessonId: string) => Promise<void>;
  updateCode: (file: string, code: string) => void;
  resetCode: () => void;
  runTests: () => Promise<void>;
  updateTestResults: (results: TestResult[]) => void;
  revealHint: () => void;
  setActiveFile: (file: string) => void;
  completeLesson: () => Promise<void>;
  reset: () => void;
}

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      lesson: null,
      isLoading: false,
      currentCode: {},
      originalSeedCode: {},
      tests: null,
      allTestsPassed: false,
      activeFile: 'App.jsx',
      hintsRevealed: 0,
      showHints: false,
      startTime: null,
      elapsedSeconds: 0,

      loadLesson: async (lessonId: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(`/api/lessons/${lessonId}`);
          const data = await response.json();

          const seedCode = data.lesson.seedCode as Record<string, string>;

          set({
            lesson: data.lesson,
            currentCode: { ...seedCode },
            originalSeedCode: { ...seedCode },
            activeFile: Object.keys(seedCode)[0],
            startTime: Date.now(),
            isLoading: false,
          });
        } catch (error) {
          console.error('Error loading lesson:', error);
          set({ isLoading: false });
        }
      },

      updateCode: (file: string, code: string) => {
        set((state) => ({
          currentCode: {
            ...state.currentCode,
            [file]: code,
          },
        }));
      },

      resetCode: () => {
        set((state) => ({
          currentCode: { ...state.originalSeedCode },
          tests: null,
          allTestsPassed: false,
        }));
      },

      runTests: async () => {
        const { lesson, currentCode } = get();
        if (!lesson) return;

        try {
          const results = await runTests({
            language: lesson.language,
            code: currentCode,
            tests: lesson.tests as Test[],
          });

          const allPassed = results.every(r => r.passed);

          set({
            tests: results,
            allTestsPassed: allPassed,
          });

          if (allPassed) {
            await get().completeLesson();
          }
        } catch (error) {
          console.error('Error running tests:', error);
        }
      },

      updateTestResults: (results: TestResult[]) => {
        const allPassed = results.every(r => r.passed);
        set({ tests: results, allTestsPassed: allPassed });
      },

      revealHint: () => {
        set((state) => ({
          hintsRevealed: state.hintsRevealed + 1,
          showHints: true,
        }));
      },

      setActiveFile: (file: string) => {
        set({ activeFile: file });
      },

      completeLesson: async () => {
        const { lesson, currentCode, tests, startTime, hintsRevealed } = get();
        if (!lesson) return;

        const timeSpentSeconds = startTime
          ? Math.floor((Date.now() - startTime) / 1000)
          : 0;

        try {
          await fetch(`/api/lessons/${lesson.id}/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              submittedCode: currentCode,
              testsPassedCount: tests?.length || 0,
              totalTests: tests?.length || 0,
              timeSpentSeconds,
              hintsUsed: hintsRevealed,
            }),
          });
        } catch (error) {
          console.error('Error completing lesson:', error);
        }
      },

      reset: () => {
        set({
          lesson: null,
          currentCode: {},
          originalSeedCode: {},
          tests: null,
          allTestsPassed: false,
          hintsRevealed: 0,
          showHints: false,
          startTime: null,
        });
      },
    }),
    {
      name: 'lesson-storage',
      partialize: (state) => ({
        currentCode: state.currentCode,
        hintsRevealed: state.hintsRevealed,
      }),
    }
  )
);
```

---

## Code Editor Integration

### Monaco Editor Setup

```typescript
// src/lib/monaco-config.ts
import { Monaco } from '@monaco-editor/react';

export function configureMonaco(monaco: Monaco) {
  // Add React snippets
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: () => ({
      suggestions: [
        {
          label: 'useState',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialValue});',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'React useState hook',
        },
        {
          label: 'useEffect',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'useEffect(() => {\n\t${1}\n}, [${2}]);',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'React useEffect hook',
        },
        // Add more snippets
      ],
    }),
  });

  // Configure TypeScript/JavaScript defaults
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: 'React',
    allowJs: true,
    typeRoots: ['node_modules/@types'],
  });

  // Add React type definitions
  monaco.languages.typescript.javascriptDefaults.addExtraLib(
    `
    declare module 'react' {
      export function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
      export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
      // Add more React types
    }
    `,
    'file:///node_modules/@types/react/index.d.ts'
  );
}
```

---

## Progress Tracking

### Analytics Events

```typescript
// src/lib/analytics/lessonEvents.ts

export const LessonEvents = {
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  TEST_RUN: 'test_run',
  HINT_REVEALED: 'hint_revealed',
  CODE_RESET: 'code_reset',
  LESSON_ABANDONED: 'lesson_abandoned',
};

export function trackLessonEvent(
  event: string,
  properties: Record<string, any>
) {
  // Integration with analytics service
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track(event, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}

// Usage:
trackLessonEvent(LessonEvents.LESSON_COMPLETED, {
  lessonId: lesson.id,
  timeSpent: elapsedSeconds,
  hintsUsed: hintsRevealed,
  attempts: attemptCount,
});
```

---

## Deployment Architecture

### Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Monaco Editor│  │  Test Runner │  │ Progress UI  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│                       (Vercel/AWS)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  API Routes  │  │  SSR Pages   │  │   Static     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
         ┌──────────────────┐  ┌──────────────────┐
         │   PostgreSQL     │  │   Redis Cache    │
         │   (Supabase)     │  │   (Upstash)      │
         └──────────────────┘  └──────────────────┘
```

### Performance Optimizations

1. **Code Splitting**: Load Monaco Editor only on lesson pages
2. **Caching**: Cache lesson data in Redis (5 min TTL)
3. **CDN**: Serve static assets from CDN
4. **Progressive Loading**: Load test runners on-demand
5. **Service Worker**: Cache lessons for offline use

---

## Security Considerations

### Code Execution Safety

```typescript
// 1. Client-side: Use Web Workers for isolation
const worker = new Worker('/workers/test-runner.js');
worker.postMessage({ code, tests });

// 2. Server-side: Use Docker containers
// Each test run in isolated container with:
// - Limited CPU (0.5 CPU)
// - Limited memory (256MB)
// - Time limit (5 seconds)
// - No network access
// - Read-only filesystem

// 3. Input validation
function sanitizeCode(code: string): string {
  // Remove potentially dangerous code
  const blacklist = ['eval', 'Function', '__proto__', 'constructor'];
  // Add sanitization logic
  return code;
}
```

---

## Next Steps

1. **Build Lesson Generator**: AI tool to create lessons from templates
2. **Admin Dashboard**: UI for creating/editing lessons
3. **Analytics Dashboard**: Track lesson completion rates
4. **A/B Testing**: Test different instruction formats
5. **Accessibility**: Screen reader support, keyboard shortcuts
6. **Mobile App**: React Native app using same lesson data

---

**Last Updated:** 2025-10-29
**Version:** 1.0
**Status:** Production-Ready Architecture
