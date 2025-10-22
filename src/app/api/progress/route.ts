import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/progress - Mark lesson as completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, lessonId } = body

    if (!userId || !lessonId) {
      return errorResponse('userId and lessonId are required', 400)
    }

    // Get lesson details
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    })

    if (!lesson) {
      return errorResponse('Lesson not found', 404)
    }

    // Create or update progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        completed: true,
        xpEarned: lesson.xpReward,
        completedAt: new Date(),
      },
    })

    // Update user's total XP
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: {
          increment: lesson.xpReward,
        },
      },
    })

    // Calculate new level (100 XP per level)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (user) {
      const newLevel = Math.floor(user.totalXP / 100) + 1
      if (newLevel > user.level) {
        await prisma.user.update({
          where: { id: userId },
          data: { level: newLevel },
        })
      }
    }

    return successResponse(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return errorResponse('Failed to update progress')
  }
}

// GET /api/progress - Get user progress
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const courseId = searchParams.get('courseId')

    if (!userId) {
      return errorResponse('userId is required', 400)
    }

    if (courseId) {
      // Get progress for a specific course
      const progress = await prisma.lessonProgress.findMany({
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
        include: {
          lesson: true,
        },
      })

      return successResponse(progress)
    } else {
      // Get all progress
      const progress = await prisma.lessonProgress.findMany({
        where: { userId },
        include: {
          lesson: true,
        },
      })

      return successResponse(progress)
    }
  } catch (error) {
    console.error('Error fetching progress:', error)
    return errorResponse('Failed to fetch progress')
  }
}
