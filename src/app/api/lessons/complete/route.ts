import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/lessons/complete - Mark lesson as completed and award XP
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, lessonId, xp } = body

    if (!userId || !lessonId) {
      return errorResponse('userId and lessonId are required', 400)
    }

    // Get XP reward from request or use default
    const xpReward = xp || 50

    // Check if lesson already completed
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    })

    if (existing?.completed) {
      return successResponse({
        message: 'Lesson already completed',
        alreadyCompleted: true,
        xpEarned: 0,
      })
    }

    // Create or update lesson progress
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
        completedAt: new Date(),
      },
    })

    // Update user's total XP
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXP: {
          increment: xpReward,
        },
        lastActivity: new Date(),
      },
    })

    // Calculate new level (100 XP per level)
    const newLevel = Math.floor(user.totalXP / 100) + 1
    let leveledUp = false

    if (newLevel > user.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel },
      })
      leveledUp = true
    }

    // Check for badge/achievement unlocks
    // This is a simplified version - in production, check specific badge criteria
    const achievements = []

    // Example: Award badge for completing 10 lessons
    const completedLessonsCount = await prisma.lessonProgress.count({
      where: {
        userId,
        completed: true,
      },
    })

    if (completedLessonsCount === 10) {
      achievements.push({
        id: 'lesson-master',
        name: 'Lesson Master',
        description: 'Completed 10 lessons',
      })
    }

    return successResponse({
      progress,
      xpEarned: xpReward,
      totalXP: user.totalXP,
      newLevel,
      leveledUp,
      achievements,
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    return errorResponse('Failed to complete lesson')
  }
}
