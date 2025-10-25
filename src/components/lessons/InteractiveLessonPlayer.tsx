"use client";

import { useState, useEffect } from "react";
import { InteractiveLesson, LessonStep, TestResult } from "@/types";
import { runTests } from "@/lib/test-runner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      const results = await runTests(
        code[currentStep.id] || currentStep.starterCode,
        currentStep.testCases,
        currentStep.id
      );

      setTestResults(results);

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
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(currentStep.instruction),
                }}
              />
            </div>

            {/* Hint */}
            {currentStep.hint && (
              <div className="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950 p-4 rounded">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-2 font-medium text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                {showHint && (
                  <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-300">
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
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            {completedSteps.size} / {lesson.steps.length} completed
          </div>
          <Button
            variant="outline"
            onClick={handleNextStep}
            disabled={
              currentStepIndex === lesson.steps.length - 1 || !isStepCompleted
            }
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
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
            />

            <div className="flex gap-2">
              <Button
                onClick={handleRunTests}
                disabled={isRunning}
                className="flex-1"
              >
                {isRunning ? "Running Tests..." : "Run Tests"}
              </Button>
              <Button variant="outline" onClick={handleReset}>
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

// Simple markdown to HTML converter (basic implementation)
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks
  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre><code class="language-$1">$2</code></pre>'
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Lists
  html = html.replace(/^\- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = `<p>${html}</p>`;

  return html;
}
