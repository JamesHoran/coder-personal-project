import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/leaderboard - Get leaderboard
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const type = searchParams.get('type') || 'total' // total, weekly (future feature)
    const limit = parseInt(searchParams.get('limit') || '10')

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        totalXP: true,
        level: true,
      },
      orderBy: {
        totalXP: 'desc',
      },
      take: limit,
    })

    const leaderboard = users.map((user, index) => ({
      ...user,
      rank: index + 1,
    }))

    return successResponse(leaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return errorResponse('Failed to fetch leaderboard')
  }
}
