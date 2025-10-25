import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/projects/complete - Mark project as completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, projectId, xp } = body

    if (!userId || !projectId) {
      return errorResponse('userId and projectId are required', 400)
    }

    // Get XP reward from request or use default
    const xpReward = xp || 100

    // Create or update progress
    const progress = await prisma.projectProgress.upsert({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
      create: {
        userId,
        projectId,
        completed: true,
        xpEarned: xpReward,
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
    if (newLevel > user.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel },
      })
    }

    return successResponse({
      ...progress,
      xpEarned: xpReward,
      newLevel,
      totalXP: user.totalXP,
    })
  } catch (error) {
    console.error('Error completing project:', error)
    return errorResponse('Failed to complete project')
  }
}
