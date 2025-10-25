import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/progress/course/[courseId] - Get comprehensive course progress
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return errorResponse('userId is required', 400)
    }

    // Get all progress for the course
    const [lessonProgress, projectProgress, challengeSubmissions, user] = await Promise.all([
      // Lesson progress
      prisma.lessonProgress.findMany({
        where: {
          userId,
          lesson: {
            module: {
              phase: {
                courseId,
              },
            },
          },
        },
      }),
      // Project progress
      prisma.projectProgress.findMany({
        where: {
          userId,
        },
      }),
      // Challenge submissions
      prisma.challengeSubmission.findMany({
        where: {
          userId,
          passed: true,
        },
      }),
      // User data
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          totalXP: true,
          level: true,
          streak: true,
        },
      }),
    ])

    // Create lookup maps for quick access
    const completedProjects = new Set(
      projectProgress.filter(p => p.completed).map(p => p.projectId)
    )
    const completedChallenges = new Set(
      challengeSubmissions.map(s => s.challengeId)
    )
    const completedLessons = new Set(
      lessonProgress.filter(l => l.completed).map(l => l.lessonId)
    )

    return successResponse({
      completedProjects: Array.from(completedProjects),
      completedChallenges: Array.from(completedChallenges),
      completedLessons: Array.from(completedLessons),
      user: user || { totalXP: 0, level: 1, streak: 0 },
      totalXPEarned: projectProgress.reduce((sum, p) => sum + p.xpEarned, 0) +
                    challengeSubmissions.reduce((sum, s) => sum + s.xpEarned, 0) +
                    lessonProgress.reduce((sum, l) => sum + l.xpEarned, 0),
    })
  } catch (error) {
    console.error('Error fetching course progress:', error)
    return errorResponse('Failed to fetch course progress')
  }
}
