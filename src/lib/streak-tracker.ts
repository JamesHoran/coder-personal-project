import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

/**
 * Check if a user's streak should be updated and update it if necessary
 */
export async function updateUserStreak(userId: string): Promise<{
  streak: number
  longestStreak: number
  isNewStreak: boolean
}> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      streak: true,
      longestStreak: true,
      lastActivity: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const now = new Date()
  const lastActivity = new Date(user.lastActivity)

  // Reset time to start of day for both dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const lastActivityDay = new Date(
    lastActivity.getFullYear(),
    lastActivity.getMonth(),
    lastActivity.getDate()
  )

  // Calculate difference in days
  const daysDiff = Math.floor(
    (today.getTime() - lastActivityDay.getTime()) / (1000 * 60 * 60 * 24)
  )

  let newStreak = user.streak
  let newLongestStreak = user.longestStreak
  let isNewStreak = false

  if (daysDiff === 0) {
    // Same day - no change to streak
    return {
      streak: newStreak,
      longestStreak: newLongestStreak,
      isNewStreak: false,
    }
  } else if (daysDiff === 1) {
    // Consecutive day - increment streak
    newStreak += 1
    isNewStreak = true

    if (newStreak > newLongestStreak) {
      newLongestStreak = newStreak
    }
  } else {
    // Streak broken - reset to 1
    newStreak = 1
    isNewStreak = false
  }

  // Update user in database
  await prisma.user.update({
    where: { id: userId },
    data: {
      streak: newStreak,
      longestStreak: newLongestStreak,
      lastActivity: now,
      updatedAt: now,
    },
  })

  return {
    streak: newStreak,
    longestStreak: newLongestStreak,
    isNewStreak,
  }
}

/**
 * Get user's current streak information
 */
export async function getUserStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      streak: true,
      longestStreak: true,
      lastActivity: true,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

/**
 * Check if streak achievements should be awarded
 */
export function checkStreakAchievements(streak: number): string[] {
  const achievements: string[] = []

  if (streak === 7) achievements.push('7-Day Streak')
  if (streak === 14) achievements.push('14-Day Streak')
  if (streak === 30) achievements.push('30-Day Streak')
  if (streak === 60) achievements.push('60-Day Streak')
  if (streak === 100) achievements.push('100-Day Streak')
  if (streak === 365) achievements.push('1-Year Streak')

  return achievements
}
