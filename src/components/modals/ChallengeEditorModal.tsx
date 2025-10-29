'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Play, CheckCircle2, XCircle, Award, Lightbulb, Code, RotateCcw } from 'lucide-react'
import { Challenge } from '@/types'

// Dynamically import Monaco editor (client-side only)
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface TestCase {
  id: string
  description: string
  testFunction: string
  errorMessage?: string
}

interface ChallengeEditorModalProps {
  isOpen: boolean
  onClose: () => void
  challenge: Challenge & {
    instructions?: string
    starterCode?: string
    testCases?: TestCase[]
    language?: 'javascript' | 'typescript' | 'python' | 'sql'
    hints?: string[]
    solution?: string
  }
  onComplete: (code: string, xpEarned: number) => Promise<void>
  isCompleted?: boolean
}

interface TestResult {
  testId: string
  description: string
  passed: boolean
  errorMessage?: string
}

export function ChallengeEditorModal({
  isOpen,
  onClose,
  challenge,
  onComplete,
  isCompleted = false
}: ChallengeEditorModalProps) {
  const [code, setCode] = useState(challenge.starterCode || '// Write your code here\n')
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [allTestsPassed, setAllTestsPassed] = useState(false)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setCode(challenge.starterCode || '// Write your code here\n')
      setTestResults([])
      setShowHint(false)
      setCurrentHintIndex(0)
      setAllTestsPassed(false)
    }
  }, [isOpen, challenge.starterCode])

  if (!isOpen) return null

  const handleReset = () => {
    setCode(challenge.starterCode || '// Write your code here\n')
    setTestResults([])
    setAllTestsPassed(false)
  }

  const runTests = async () => {
    setIsRunning(true)
    setAttempts(prev => prev + 1)

    try {
      const testCases = challenge.testCases || []
      const results: TestResult[] = []

      // Run each test case
      for (const testCase of testCases) {
        try {
          // Create a sandboxed function to evaluate the test
          // This is a simplified version - in production, run tests on the server
          const testFunction = new Function(
            'code',
            `
            try {
              ${code}

              // Run the test function
              const testFn = ${testCase.testFunction};
              return testFn();
            } catch (error) {
              throw new Error(error.message || "Runtime error in code");
            }
          `
          )

          const passed = testFunction(code)

          results.push({
            testId: testCase.id,
            description: testCase.description,
            passed: Boolean(passed),
            errorMessage: passed ? undefined : testCase.errorMessage
          })
        } catch (error) {
          results.push({
            testId: testCase.id,
            description: testCase.description,
            passed: false,
            errorMessage: error instanceof Error ? error.message : testCase.errorMessage || 'Test failed'
          })
        }
      }

      setTestResults(results)
      setAllTestsPassed(results.length > 0 && results.every(r => r.passed))
    } catch (error) {
      console.error('Error running tests:', error)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!allTestsPassed) {
      alert('All tests must pass before submitting!')
      return
    }

    setIsSubmitting(true)
    try {
      await onComplete(code, challenge.xp)
      onClose()
    } catch (error) {
      console.error('Error submitting challenge:', error)
      alert('Failed to submit challenge. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const showNextHint = () => {
    if (challenge.hints && currentHintIndex < challenge.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
    }
    setShowHint(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-7xl max-h-[95vh] overflow-hidden bg-background rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-background border-b p-6 flex items-start justify-between shrink-0">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{challenge.name}</h2>
              {isCompleted && (
                <Badge className="bg-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Badge variant="outline">
                {challenge.difficulty}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3">{challenge.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{challenge.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span>{challenge.language || 'javascript'}</span>
              </div>
              {attempts > 0 && (
                <div className="text-sm text-muted-foreground">
                  Attempts: {attempts}
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Instructions */}
          {challenge.instructions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none text-sm">
                  {challenge.instructions.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Code Editor</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <Editor
                height="400px"
                language={challenge.language || 'javascript'}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={runTests}
              disabled={isRunning || isCompleted}
              variant="default"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </Button>
            {challenge.hints && challenge.hints.length > 0 && (
              <Button
                variant="outline"
                onClick={showNextHint}
                disabled={isCompleted}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {showHint ? 'Next Hint' : 'Show Hint'}
                {showHint && ` (${currentHintIndex + 1}/${challenge.hints.length})`}
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!allTestsPassed || isSubmitting || isCompleted}
              variant="default"
              className="ml-auto bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : `Submit & Earn ${challenge.xp} XP`}
            </Button>
          </div>

          {/* Hint Display */}
          {showHint && challenge.hints && challenge.hints[currentHintIndex] && (
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4">
                <div className="flex gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Hint {currentHintIndex + 1}:
                    </p>
                    <p className="text-blue-800 dark:text-blue-200">
                      {challenge.hints[currentHintIndex]}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Test Results
                  {allTestsPassed && (
                    <Badge className="bg-green-600">All Passed!</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {testResults.map((result) => (
                  <div
                    key={result.testId}
                    className={`p-3 rounded-md border ${
                      result.passed
                        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {result.passed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${
                          result.passed ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                        }`}>
                          {result.description}
                        </p>
                        {!result.passed && result.errorMessage && (
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            {result.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
