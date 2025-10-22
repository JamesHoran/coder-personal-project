import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/courses - Get all published courses
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const level = searchParams.get('level')

    const where: { isPublished: boolean; category?: string; level?: string } = {
      isPublished: true,
    }

    if (category) {
      where.category = category
    }

    if (level) {
      where.level = level
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return successResponse(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return errorResponse('Failed to fetch courses')
  }
}
