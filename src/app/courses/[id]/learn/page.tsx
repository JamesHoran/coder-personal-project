'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Trophy,
  BookOpen,
  Code,
  Play,
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  xpReward: number
  type: string
}

export default function LearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const lessonId = searchParams.get('lesson')

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId])

  const fetchLesson = async () => {
    // For demo, we'll create a mock lesson
    // In production, fetch from API
    setLoading(false)
    setLesson({
      id: lessonId || '',
      title: 'What is TypeScript?',
      content: `# What is TypeScript?

TypeScript is a **strongly typed programming language** that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: Amazing autocomplete and refactoring
3. **Self-Documenting**: Types serve as inline documentation
4. **Scales**: Perfect for large codebases

## TypeScript vs JavaScript

\`\`\`typescript
// JavaScript
function greet(name) {
  return "Hello, " + name;
}

greet(123); // No error! But wrong...

// TypeScript
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

greet(123); // ERROR: Argument of type 'number' is not assignable to parameter of type 'string'
\`\`\`

TypeScript is a **superset** of JavaScript, meaning all valid JavaScript is valid TypeScript.

## Key Features

- **Static Type Checking**: Find bugs before runtime
- **Modern JavaScript Support**: Use latest ES features
- **Gradual Adoption**: Add types incrementally
- **Rich IDE Support**: IntelliSense, refactoring, navigation
- **Large Community**: Extensive ecosystem and libraries

## Who Uses TypeScript?

- Microsoft (creator)
- Google (Angular)
- Facebook (portions of React)
- Airbnb
- Slack
- And thousands more companies!

## Getting Started

In the next lesson, we'll set up your development environment and write your first TypeScript code.`,
      duration: 15,
      xpReward: 10,
      type: 'lesson',
    })
  }

  const handleComplete = async () => {
    // Mark lesson as complete
    // In production, call API to update progress
    setCompleted(true)
    setShowCelebration(true)

    setTimeout(() => {
      setShowCelebration(false)
    }, 3000)
  }

  const handleNext = () => {
    // Navigate to next lesson
    router.push(`/courses/${params.id}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson not found</h2>
          <Button onClick={() => router.push(`/courses/${params.id}`)}>Back to Course</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" onClick={() => router.push(`/courses/${params.id}`)}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                <Trophy className="w-5 h-5" />
                <span>+{lesson.xpReward} XP</span>
              </div>

              {!completed ? (
                <Button onClick={handleComplete}>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              ) : (
                <Button onClick={handleNext} variant="default">
                  Next Lesson
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Lesson Complete!</h2>
            <p className="text-xl text-gray-600 mb-4">You earned {lesson.xpReward} XP!</p>
            <div className="flex items-center justify-center gap-2 text-yellow-600">
              <Trophy className="w-6 h-6" />
              <span className="text-2xl font-bold">+{lesson.xpReward}</span>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Content */}
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Lesson</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{lesson.duration} minutes</span>
            {completed && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: lesson.content
                  .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-3">$1</h2>')
                  .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-2">$1</h3>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-blue-600">$1</strong>')
                  .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>')
                  .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 list-decimal">$2</li>')
                  .replace(/```typescript\n([\s\S]+?)\n```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
                  .replace(/```(\w+)\n([\s\S]+?)\n```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
                  .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm">$1</code>')
                  .replace(/\n\n/g, '</p><p class="mb-4">'),
              }}
            />
          </CardContent>
        </Card>

        {/* Interactive Code Exercise */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Try It Yourself
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-lg p-4">
              <textarea
                className="w-full bg-gray-800 text-gray-100 font-mono text-sm p-4 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                placeholder="// Write your TypeScript code here..."
                defaultValue={`// Try the example from the lesson
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

console.log(greet("TypeScript"));`}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button variant="outline">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Ready to continue?</h3>
                <p className="text-gray-600">Complete this lesson to unlock the next one.</p>
              </div>
              {!completed ? (
                <Button size="lg" onClick={handleComplete}>
                  Complete Lesson
                </Button>
              ) : (
                <Button size="lg" onClick={handleNext}>
                  Next Lesson
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
