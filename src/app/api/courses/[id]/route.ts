import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

// GET /api/courses/[id] - Get course with all phases, modules, and lessons
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        phases: {
          orderBy: { order: 'asc' },
          include: {
            modules: {
              orderBy: { order: 'asc' },
              include: {
                lessons: {
                  orderBy: { order: 'asc' },
                },
                projects: {
                  orderBy: { order: 'asc' },
                },
                challenges: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
      },
    })

    if (!course) {
      return errorResponse('Course not found', 404)
    }

    return successResponse(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return errorResponse('Failed to fetch course')
  }
}
