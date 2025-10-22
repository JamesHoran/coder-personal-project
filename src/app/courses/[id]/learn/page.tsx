'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import LessonContent from '@/components/lessons/LessonContent'
import NotificationSystem, { useNotifications } from '@/components/gamification/NotificationSystem'
import { useAuthStore } from '@/stores/authStore'
import { ChevronLeft, Loader2 } from 'lucide-react'

interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  xpReward: number
  type: string
  order: number
  moduleId: string
}

export default function LearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const lessonId = searchParams.get('lesson')
  const { user, login } = useAuthStore()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Auto-login demo user if not authenticated
  useEffect(() => {
    if (!user) {
      login('demo@example.com', 'demo123')
    }
  }, [user, login])

  const {
    notifications,
    dismissNotification,
    addXPNotification,
    addLevelNotification,
    addStreakNotification,
    addAchievementNotification,
  } = useNotifications()

  useEffect(() => {
    if (lessonId) {
      fetchLesson()
    }
  }, [lessonId])

  const fetchLesson = async () => {
    try {
      setLoading(true)

      // Fetch lesson details from database
      // For now, we'll construct a lesson based on the lessonId
      // In production, you'd have an API endpoint: /api/lessons/[id]

      // Temporary: fetch module data which includes lessons
      const response = await fetch(`/api/courses/${params.id}`)
      const data = await response.json()

      if (data.success) {
        // Find the lesson in the course structure
        let foundLesson: Lesson | null = null

        for (const phase of data.data.phases || []) {
          for (const courseModule of phase.modules || []) {
            const lesson = courseModule.lessons?.find((l: Lesson) => l.id === lessonId)
            if (lesson) {
              foundLesson = lesson
              break
            }
          }
          if (foundLesson) break
        }

        setLesson(foundLesson)
      }
    } catch (error) {
      console.error('Error fetching lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!lesson || submitting) return

    setSubmitting(true)

    try {
      // Mark lesson as completed via API
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'be3d97ac-e48a-4c37-8c2b-5cff1710d785',
          lessonId: lesson.id,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCompleted(true)

        // Show notifications
        addXPNotification(lesson.xpReward)

        if (data.data.newLevel && data.data.newLevel > data.data.level) {
          addLevelNotification(data.data.newLevel)
        }

        if (data.data.streak?.isNewStreak) {
          addStreakNotification(data.data.streak.streak)
        }

        if (data.data.newAchievements && data.data.newAchievements.length > 0) {
          data.data.newAchievements.forEach((achievement: string) => {
            addAchievementNotification(achievement)
          })
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Lesson not found</h2>
          <button
            onClick={() => router.push(`/courses/${params.id}`)}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Back to Course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Top Navigation */}
      <div className="sticky top-0 z-10 border-b bg-card shadow-sm">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.push(`/courses/${params.id}`)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Course
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <LessonContent
          title={lesson.title}
          content={lesson.content}
          duration={lesson.duration}
          xpReward={lesson.xpReward}
          isCompleted={completed}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
