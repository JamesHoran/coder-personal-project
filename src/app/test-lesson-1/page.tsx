'use client';

import { useState } from 'react';
import { getLessonById } from '@/data/courses/react-course-interactive';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TestLesson1Page() {
  const lesson = getLessonById('react-basics-01');
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState<any>(null);

  if (!lesson) {
    return <div className="p-8">Lesson not found!</div>;
  }

  const step = lesson.steps[0];

  const runTests = () => {
    // Simple test simulation for demo
    const results = {
      passed: userCode.includes('function Greeting') &&
              userCode.includes('return') &&
              userCode.includes('Welcome to React'),
      tests: [
        {
          name: 'Component exists',
          passed: userCode.includes('function Greeting'),
        },
        {
          name: 'Returns JSX',
          passed: userCode.includes('return'),
        },
        {
          name: 'Displays correct text',
          passed: userCode.includes('Welcome to React'),
        },
        {
          name: 'Has export',
          passed: userCode.includes('export'),
        },
      ],
    };
    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Test React Course - Lesson 1</h1>
          <div className="flex gap-2 items-center">
            <Badge>{lesson.difficulty}</Badge>
            <Badge variant="outline">{lesson.xpReward} XP</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <h3>Instructions</h3>
                <p>Create a functional component named <code>Greeting</code> that returns an <code>&lt;h1&gt;</code> element containing the text <strong>&ldquo;Welcome to React!&rdquo;</strong>.</p>

                <h4>Requirements:</h4>
                <ul>
                  <li>The component must be named <code>Greeting</code></li>
                  <li>It must return an h1 element</li>
                  <li>The text must be exactly &ldquo;Welcome to React!&rdquo;</li>
                  <li>Export the component as default</li>
                </ul>

                <h4>Hint:</h4>
                <p className="text-sm text-muted-foreground">
                  Remember that function names in React must start with a capital letter.
                </p>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className="mt-6 p-4 rounded-lg border">
                  <h4 className="font-bold mb-3">
                    {testResults.passed ? '✅ All tests passed!' : '❌ Some tests failed'}
                  </h4>
                  <ul className="space-y-2">
                    {testResults.tests.map((test: any, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        {test.passed ? '✅' : '❌'}
                        <span className={test.passed ? 'text-green-600' : 'text-red-600'}>
                          {test.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {testResults.passed && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded">
                      <p className="font-bold text-green-700 dark:text-green-400">
                        🎉 Lesson Complete! You earned {lesson.xpReward} XP!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel: Code Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder={step.starterCode}
                  className="w-full h-[400px] font-mono text-sm p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-slate-900"
                  spellCheck={false}
                />

                <div className="flex gap-2">
                  <Button onClick={runTests} className="flex-1">
                    Run Tests
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setUserCode(step.starterCode)}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setUserCode(step.solution)}
                  >
                    Show Solution
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Starter Code:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-3 rounded text-xs overflow-x-auto">
                    {step.starterCode}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" disabled>
            ← Previous Lesson
          </Button>
          <Button
            disabled={!testResults?.passed}
            onClick={() => alert('Next lesson would load here!')}
          >
            Next Lesson →
          </Button>
        </div>
      </div>
    </div>
  );
}
