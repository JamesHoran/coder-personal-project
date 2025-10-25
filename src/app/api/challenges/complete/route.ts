import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/challenges/complete - Mark challenge as completed
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, challengeId, xp } = body

    if (!userId || !challengeId) {
      return errorResponse('userId and challengeId are required', 400)
    }

    // Check if already completed
    const existing = await prisma.challengeSubmission.findFirst({
      where: {
        userId,
        challengeId,
        passed: true,
      },
    })

    if (existing) {
      return successResponse({
        message: 'Challenge already completed',
        submission: existing,
        alreadyCompleted: true,
      })
    }

    // Get XP reward from request or use default
    const xpReward = xp || 50

    // Create submission
    const submission = await prisma.challengeSubmission.create({
      data: {
        userId,
        challengeId,
        code: '', // Will be filled in when user actually submits code
        passed: true,
        xpEarned: xpReward,
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
      submission,
      xpEarned: xpReward,
      newLevel,
      totalXP: user.totalXP,
    })
  } catch (error) {
    console.error('Error completing challenge:', error)
    return errorResponse('Failed to complete challenge')
  }
}
