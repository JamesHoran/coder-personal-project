'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { Play, RotateCcw, Check, X, Loader2 } from 'lucide-react'

interface TestCase {
  input: any[]
  expected: any
  description?: string
}

interface CodeEditorProps {
  challengeId: string
  title: string
  description: string
  starterCode?: string
  testCases?: TestCase[]
  language?: 'javascript' | 'typescript' | 'python' | 'sql'
  xpReward: number
  onSuccess?: (xpEarned: number) => void
}

export default function CodeEditor({
  challengeId,
  title,
  description,
  starterCode = '// Write your code here',
  testCases = [],
  language = 'javascript',
  xpReward,
  onSuccess,
}: CodeEditorProps) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState<string[]>([])
  const [testResults, setTestResults] = useState<{
    passed: boolean
    message: string
  }[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasPassedAll, setHasPassedAll] = useState(false)
  const { user, login } = useAuthStore()

  // Auto-login demo user if not authenticated
  useEffect(() => {
    if (!user) {
      login('demo@example.com', 'demo123')
    }
  }, [user, login])

  const handleReset = () => {
    setCode(starterCode)
    setOutput([])
    setTestResults([])
    setHasPassedAll(false)
  }

  const handleRun = async () => {
    setIsRunning(true)
    setOutput([])
    setTestResults([])

    try {
      // Simulate code execution
      // In production, this would call a secure sandbox API
      const results: { passed: boolean; message: string }[] = []

      for (const testCase of testCases) {
        // Basic validation - in production, use actual code execution
        const passed = code.trim().length > 20 // Placeholder logic
        results.push({
          passed,
          message: passed
            ? `✓ Test passed: ${testCase.description || 'Test case'}`
            : `✗ Test failed: ${testCase.description || 'Test case'}`,
        })
      }

      setTestResults(results)
      setHasPassedAll(results.every((r) => r.passed))

      // Add execution output
      setOutput([
        'Code execution started...',
        ...results.map((r) => r.message),
        results.every((r) => r.passed)
          ? '✓ All tests passed!'
          : '✗ Some tests failed. Keep trying!',
      ])
    } catch (error) {
      setOutput([
        '✗ Execution error:',
        error instanceof Error ? error.message : 'Unknown error',
      ])
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!hasPassedAll) {
      setOutput((prev) => [
        ...prev,
        '⚠️  All tests must pass before submitting',
      ])
      return
    }

    if (!user?.id) {
      setOutput((prev) => [
        ...prev,
        '⚠️  You must be logged in to submit',
      ])
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          userId: user.id,
        }),
      })

      const data = await response.json()

      if (data.success && data.data.passed) {
        setOutput((prev) => [
          ...prev,
          `🎉 Challenge completed! +${xpReward} XP`,
        ])
        onSuccess?.(xpReward)
      } else {
        setOutput((prev) => [
          ...prev,
          '✗ Submission failed. Please try again.',
        ])
      }
    } catch (error) {
      setOutput((prev) => [...prev, '✗ Submission error. Please try again.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
            {xpReward} XP
          </span>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600">
            {language}
          </span>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Your Code</label>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[300px] w-full rounded-md border bg-slate-950 p-4 font-mono text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Run Tests
        </button>
        <button
          onClick={handleSubmit}
          disabled={!hasPassedAll || isSubmitting}
          className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Submit Solution
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Test Results</label>
          <div className="rounded-md border bg-slate-50 p-4 dark:bg-slate-900">
            {testResults.map((result, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1 font-mono text-sm"
              >
                {result.passed ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={
                    result.passed ? 'text-emerald-600' : 'text-red-600'
                  }
                >
                  {result.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Console */}
      {output.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Console Output</label>
          <div className="rounded-md border bg-slate-950 p-4">
            {output.map((line, index) => (
              <div
                key={index}
                className="py-1 font-mono text-sm text-slate-100"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
