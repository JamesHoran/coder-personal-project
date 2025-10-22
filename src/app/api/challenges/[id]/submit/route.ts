import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// POST /api/challenges/[id]/submit - Submit challenge solution
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, code, completionTime } = body

    if (!userId || !code) {
      return errorResponse('userId and code are required', 400)
    }

    // Get challenge details
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    })

    if (!challenge) {
      return errorResponse('Challenge not found', 404)
    }

    // Simple validation: check if code compiles (in real app, run tests)
    // For now, just check if code is not empty
    const passed = code.trim().length > 20 // Basic validation

    // Create submission
    const submission = await prisma.challengeSubmission.create({
      data: {
        userId,
        challengeId: id,
        code,
        passed,
        xpEarned: passed ? challenge.xpReward : 0,
        completionTime,
      },
    })

    // If passed, update user XP
    if (passed) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalXP: {
            increment: challenge.xpReward,
          },
        },
      })

      // Update level
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
    }

    return successResponse({
      submission,
      passed,
      xpEarned: passed ? challenge.xpReward : 0,
    })
  } catch (error) {
    console.error('Error submitting challenge:', error)
    return errorResponse('Failed to submit challenge')
  }
}
