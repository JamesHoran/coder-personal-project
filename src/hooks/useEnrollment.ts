import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export interface EnrollmentResult {
  success: boolean
  message: string
  enrollment?: {
    id: string
    courseId: string
    userId: string
  }
}

export function useEnrollment() {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  const enroll = async (courseId: string): Promise<EnrollmentResult> => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login')
      return {
        success: false,
        message: 'Please login to enroll in courses',
      }
    }

    setIsEnrolling(true)
    setError(null)

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          courseId,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        const errorMessage = data.message || 'Failed to enroll in course'
        setError(errorMessage)
        return {
          success: false,
          message: errorMessage,
        }
      }

      setIsEnrolling(false)
      return {
        success: true,
        message: 'Successfully enrolled in course!',
        enrollment: data.data,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      setIsEnrolling(false)
      return {
        success: false,
        message: errorMessage,
      }
    }
  }

  const checkEnrollment = async (courseId: string): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      return false
    }

    try {
      const response = await fetch(`/api/enrollments?userId=${user.id}`)
      const data = await response.json()

      if (data.success && Array.isArray(data.data)) {
        return data.data.some((enrollment: { courseId: string }) => enrollment.courseId === courseId)
      }

      return false
    } catch (err) {
      console.error('Error checking enrollment:', err)
      return false
    }
  }

  return {
    enroll,
    checkEnrollment,
    isEnrolling,
    error,
  }
}
