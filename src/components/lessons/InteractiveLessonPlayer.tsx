"use client";

import { useState, useEffect } from "react";
import { InteractiveLesson, LessonStep, TestResult } from "@/types";
import { runTests } from "@/lib/test-runner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { useAuthStore } from "@/stores/authStore";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface InteractiveLessonPlayerProps {
  lesson: InteractiveLesson;
  onComplete?: (xpEarned: number) => void;
  onStepComplete?: (stepId: string) => void;
}

export function InteractiveLessonPlayer({
  lesson,
  onComplete,
  onStepComplete,
}: InteractiveLessonPlayerProps) {
  const { user } = useAuthStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState<Record<string, string>>({});
  const [testResults, setTestResults] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const currentStep = lesson.steps[currentStepIndex];

  // Initialize code for current step
  useEffect(() => {
    if (currentStep && !code[currentStep.id]) {
      setCode((prev) => ({
        ...prev,
        [currentStep.id]: currentStep.starterCode,
      }));
    }
    setTestResults(null);
    setShowHint(false);
  }, [currentStep, code]);

  const handleCodeChange = (value: string) => {
    setCode((prev) => ({
      ...prev,
      [currentStep.id]: value,
    }));
  };

  const handleRunTests = async () => {
    if (!currentStep) return;

    setIsRunning(true);
    setTestResults(null);

    try {
      const userCode = code[currentStep.id] || currentStep.starterCode;

      // Select appropriate test runner based on lesson language
      let results;
      if (currentStep.language === 'jsx' || currentStep.language === 'tsx') {
        // Dynamically import React test runner only when needed (client-side only)
        const { runAllTests: runReactTests } = await import('@/lib/react-lesson-test-runner');
        results = await runReactTests(userCode, currentStep.testCases, currentStep.id);
      } else {
        // Use generic test runner for TypeScript/JavaScript
        results = await runTests(userCode, currentStep.testCases, currentStep.id);
      }

      setTestResults(results);

      // Submit answer to backend for tracking
      try {
        // Get user ID from auth store, fallback to anonymous
        const userId = user?.id || 'anonymous';

        console.log('Submitting answer:', { userId, lessonId: lesson.id, stepId: currentStep.id, passed: results.passed });

        const response = await fetch('/api/lessons/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            lessonId: lesson.id,
            stepId: currentStep.id,
            code: userCode,
            passed: results.passed,
            testResults: results,
            xpEarned: results.passed && currentStepIndex === lesson.steps.length - 1 ? lesson.xpReward : 0,
            language: currentStep.language,
          }),
        });

        const data = await response.json();
        console.log('Submission response:', data);

        if (!data.success) {
          console.error('Submission failed:', data.error);
        } else {
          console.log('Submission saved successfully!', data.data);
        }
      } catch (submitError) {
        // Don't fail the lesson if submission fails, just log it
        console.error('Failed to submit answer:', submitError);
      }

      if (results.passed) {
        setCompletedSteps((prev) => new Set([...prev, currentStep.id]));
        onStepComplete?.(currentStep.id);

        // Check if this is the last step
        if (currentStepIndex === lesson.steps.length - 1) {
          setLessonCompleted(true);
          onComplete?.(lesson.xpReward);
        }
      }
    } catch (error) {
      console.error("Error running tests:", error);
      setTestResults({
        stepId: currentStep.id,
        passed: false,
        results: [
          {
            testId: "error",
            description: "Test execution error",
            passed: false,
            errorMessage:
              error instanceof Error ? error.message : "Unknown error occurred",
          },
        ],
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCode((prev) => ({
      ...prev,
      [currentStep.id]: currentStep.starterCode,
    }));
    setTestResults(null);
  };

  const currentCode = code[currentStep.id] || currentStep.starterCode;
  const isStepCompleted = completedSteps.has(currentStep.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Left Panel: Instructions */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{lesson.title}</CardTitle>
              <Badge variant="outline" className="ml-2">
                {lesson.xpReward} XP
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Step {currentStepIndex + 1} of {lesson.steps.length}
              </span>
              {isStepCompleted && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Instruction */}
            <MarkdownRenderer content={currentStep.instruction} />

            {/* Hint */}
            {currentStep.hint && (
              <div
                className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950 p-4 rounded"
                role="region"
                aria-label="Hint section"
              >
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 font-medium text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded"
                  aria-expanded={showHint}
                  aria-controls="hint-content"
                >
                  <Lightbulb className="h-4 w-4" aria-hidden="true" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                {showHint && (
                  <p
                    id="hint-content"
                    className="mt-2 text-sm text-yellow-800 dark:text-yellow-300"
                  >
                    {currentStep.hint}
                  </p>
                )}
              </div>
            )}

            {/* Test Results */}
            {testResults && (
              <div
                className={`p-4 rounded-lg ${
                  testResults.passed
                    ? "bg-green-50 dark:bg-green-950 border-l-4 border-green-500"
                    : "bg-red-50 dark:bg-red-950 border-l-4 border-red-500"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {testResults.passed ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        All tests passed!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        Some tests failed
                      </span>
                    </>
                  )}
                </div>
                <ul className="space-y-1 text-sm">
                  {testResults.results.map((result) => (
                    <li
                      key={result.testId}
                      className="flex items-start gap-2"
                    >
                      {result.passed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <span
                          className={
                            result.passed
                              ? "text-green-700 dark:text-green-400"
                              : "text-red-700 dark:text-red-400"
                          }
                        >
                          {result.description}
                        </span>
                        {result.errorMessage && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            {result.errorMessage}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lesson Completed */}
            {lessonCompleted && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-1">
                  Lesson Complete!
                </h3>
                <p className="text-purple-600 dark:text-purple-300 mb-2">
                  You earned {lesson.xpReward} XP
                </p>
                <Badge variant="secondary" className="text-sm">
                  {completedSteps.size} / {lesson.steps.length} steps completed
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            aria-label="Go to previous step"
            aria-disabled={currentStepIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
            Previous
          </Button>
          <div
            className="text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
            aria-label={`Progress: ${completedSteps.size} of ${lesson.steps.length} steps completed`}
          >
            {completedSteps.size} / {lesson.steps.length} completed
          </div>
          <Button
            variant="outline"
            onClick={handleNextStep}
            disabled={
              currentStepIndex === lesson.steps.length - 1 || !isStepCompleted
            }
            aria-label={
              !isStepCompleted
                ? "Complete current step to proceed"
                : "Go to next step"
            }
            aria-disabled={
              currentStepIndex === lesson.steps.length - 1 || !isStepCompleted
            }
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="space-y-4">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <Badge variant="outline">{currentStep.language}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-[400px] font-mono text-sm p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 dark:bg-slate-950"
              spellCheck={false}
              aria-label="Code editor"
              aria-describedby="editor-instructions"
            />
            <p id="editor-instructions" className="sr-only">
              Write your code in this editor. Use Tab to indent. Press the Run Tests button to check your solution.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={handleRunTests}
                disabled={isRunning}
                className="flex-1"
                aria-busy={isRunning}
                aria-label={isRunning ? "Running tests, please wait" : "Run tests to check your solution"}
              >
                {isRunning ? "Running Tests..." : "Run Tests"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                aria-label="Reset code to starter template"
              >
                Reset
              </Button>
            </div>

            {/* Test Cases Preview */}
            <div className="text-sm">
              <p className="font-medium mb-2">Test Cases:</p>
              <ul className="space-y-1 text-muted-foreground">
                {currentStep.testCases.map((test) => (
                  <li key={test.id} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {test.description}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
